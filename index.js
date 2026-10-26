import z from '@deepseek-ai/schemastery';
import { defineTool } from '@deepseek-ai/dsh-tools';
import { clientRequestSchema } from '@deepseek-ai/dsh-client-connection';
import { randomUUID } from 'node:crypto';
import { lstatSync, realpathSync, renameSync, statSync, unlinkSync } from 'node:fs';
import { dirname, isAbsolute, join, resolve } from 'node:path';
import { homedir } from 'node:os';
import { MemoryStore } from './lib/store.js';
import { attach } from './lib/adapter.js';

export const name='dafeiyu-memory';
const CHANNEL='/api';
const ENDPOINT='dafeiyu-memory/status';
const SETTINGS_ENDPOINT='dafeiyu-memory/settings';
const SETTINGS_ENTRY_ID='include:dafeiyu-memory';
const PATCH_ID='dafeiyu-memory';
const SESSION_PAGE_SIZE=100;
export const inject=['sessions','sessionQuery','agents','systemPrompt','tools','connection','workspaceRegistry','settings'];
// Host `settings.update/mutate` only accepts fields beneath a declared volatile node
// (packages/config settings write() rejects every other path). The binding/migration
// fields below are therefore volatile so the panel can persist them without remounting
// the plugin; each one is read through `.get()` and defaults stay ordinary data.
export const Config=z.object({
  database:z.string().default('').volatile(),bank:z.string().default('dafeiyu'),
  bindingMode:z.string().default('session').volatile(),
  bindingSessionIds:z.array(z.string()).volatile(),bindingWorkspaceId:z.string().default('').volatile(),
  pendingMigrationFrom:z.string().volatile(),pendingMigrationTarget:z.string().volatile(),
  pendingMigrationId:z.string().volatile(),pendingMigrationSourceIdentity:z.string().volatile(),
  preset:z.string().default(''),autoRecall:z.boolean().default(true),
  recallChars:z.number().default(2400),toolChars:z.number().default(6000),
  maintenanceMinutes:z.number().default(30),includeSubagents:z.boolean().default(false),
});
// Volatile fields resolve to a stable reference; ordinary fields stay plain values.
function readConfig(raw,key){
  const field=raw?.[key];
  return field&&typeof field.get==='function'?field.get():field;
}
function plainConfig(raw){
  if(!raw||typeof raw!=='object')return{};
  const out={};
  for(const [key,value] of Object.entries(raw))out[key]=value&&typeof value.get==='function'?value.get():value;
  return out;
}
function expandHome(path){
  if(path==='~')return homedir();
  if(path.startsWith('~/')||path.startsWith('~\\'))return join(homedir(),path.slice(2));
  return path;
}
export function options(config={}){
  const value={bank:'dafeiyu',bindingMode:'session',bindingWorkspaceId:'',preset:'',autoRecall:true,
    recallChars:2400,toolChars:6000,maintenanceMinutes:30,includeSubagents:false};
  // `config` may be the resolved runtime Config (volatile references) or plain options (tests, CLI).
  for(const [key,setting] of Object.entries(plainConfig(config)))if(setting!==undefined)value[key]=setting;
  if(!['session','workspace'].includes(value.bindingMode))throw new Error('dafeiyu-memory: invalid bindingMode');
  if(value.bindingSessionIds!==undefined){
    if(!Array.isArray(value.bindingSessionIds)||value.bindingSessionIds.some(id=>typeof id!=='string'||!id))throw new Error('dafeiyu-memory: invalid bindingSessionIds');
    value.bindingSessionIds=[...new Set(value.bindingSessionIds)];
  }
  if(typeof value.bindingWorkspaceId!=='string')throw new Error('dafeiyu-memory: invalid bindingWorkspaceId');
  for(const key of ['pendingMigrationFrom','pendingMigrationTarget']){
    if(typeof value[key]==='string'&&isAbsolute(value[key]))value[key]=resolve(value[key]);
  }
  for(const [key,min,max] of [['recallChars',800,12000],['toolChars',800,20000],['maintenanceMinutes',0,1440]]){
    if(!Number.isSafeInteger(value[key])||value[key]<min||value[key]>max)throw new Error(`dafeiyu-memory: invalid ${key}`);
  }
  const dshHome=expandHome(process.env.DSH_HOME?.trim()||join(homedir(),'.dsh'));
  const configuredDatabase=typeof value.database==='string'?value.database.trim():'';
  value.database=resolve(expandHome(configuredDatabase||join(dshHome,'dafeiyu-memory','memory.sqlite3')));
  return value;
}
function onceAsync(dispose){
  let pending;
  return()=>pending??=(async()=>{await dispose();})();
}
function registerRpcRoute(ctx,endpoint,handler,errorCode){
  const dispose=ctx.connection.fetch.register({
    path:`${CHANNEL}/${endpoint}`,
    methods:['POST'],
    requestBody:'buffered',
    async fetch(request){
      if(request.headers.get('content-type')?.split(';',1)[0]?.trim().toLowerCase()!=='application/json'){
        return new Response('content type must be application/json',{status:415});
      }
      let rawMessage;
      try{rawMessage=await request.json();}
      catch{return new Response('body is not JSON',{status:400});}
      const parsed=clientRequestSchema.safeParse(rawMessage);
      if(!parsed.success){
        const rpcId=rawMessage?.rpcId;
        if(typeof rpcId!=='string'||!rpcId)return new Response('invalid RPC request envelope',{status:400});
        return Response.json({type:'server-response',rpcId,result:{ok:false,error:{
          code:'gateway/bad-request',message:'Invalid client-request message',details:{issues:parsed.error.issues},
        }}});
      }
      const message=parsed.data;
      const respond=result=>Response.json({type:'server-response',rpcId:message.rpcId,result});
      if(message.method!==endpoint){
        return respond({ok:false,error:{code:'gateway/bad-request',message:`method ${JSON.stringify(message.method)} does not match endpoint ${JSON.stringify(endpoint)}`,details:{issues:[]}}});
      }
      if(request.signal.aborted)return respond({ok:false,error:{code:'cancelled',message:'Request cancelled',details:{}}});
      try{return respond({ok:true,value:await handler(message.payload)});}
      catch(error){
        console.error(`[dafeiyu-memory] ${endpoint} failed`,error);
        return respond({ok:false,error:{code:errorCode,message:String(error?.message??'Memory request failed'),details:{}}});
      }
    },
  });
  return onceAsync(dispose);
}
function settingsEntry(ctx){
  const entry=ctx.settings.describe().find(item=>String(item.ns)===SETTINGS_ENTRY_ID);
  // Settings.describe() can omit a nested Include row even while the Host plugin is active.
  // The runtime contract allows an unversioned merge; keep the revision guard whenever one is published.
  return entry??{ns:SETTINGS_ENTRY_ID,revision:undefined};
}
// The owning Loader entry is the only reliably addressable target for a profile write:
// `settings.write()` looks entries up by `entry.options.id` (here `dafeiyu-memory`), while
// `settings.describe()` publishes the namespaced `include:dafeiyu-memory`, so the settings
// path cannot find this row. `configEditor.edit(entry, change)` takes the entry object itself.
function profileEntry(ctx){
  const direct=ctx.fiber?.entry;
  if(direct)return direct;
  const editor=ctx.get?.('configEditor');
  if(!editor||typeof editor.entries!=='function')return null;
  const rows=editor.entries();
  // Prefer the exact patch id, then fall back to the single entry whose id ends with it.
  return rows.find(row=>row.options?.id===PATCH_ID)
    ??rows.find(row=>String(row.options?.id??'').endsWith(`:${PATCH_ID}`))
    ??null;
}
async function writeConfig(ctx,patch,removeKeys=[]){
  const entry=profileEntry(ctx);
  const editor=ctx.get?.('configEditor');
  if(entry&&editor&&typeof editor.edit==='function'){
    await editor.edit(entry,current=>{
      const next={...current,...patch};
      for(const key of removeKeys)delete next[key];
      return next;
    });
    return true;
  }
  const settings=settingsEntry(ctx);
  if(removeKeys.length&&typeof ctx.settings.mutate==='function'){
    const operations=removeKeys.map(key=>({op:'unset',path:[key]}));
    if(settings.revision===undefined)await ctx.settings.mutate(settings.ns,operations);
    else await ctx.settings.mutate(settings.ns,operations,settings.revision);
  }
  if(Object.keys(patch).length){
    if(settings.revision===undefined)await ctx.settings.update(settings.ns,patch);
    else await ctx.settings.update(settings.ns,patch,settings.revision);
  }
  return false;
}
async function updateConfig(ctx,patch){return writeConfig(ctx,patch);}
async function unsetConfig(ctx,keys){return writeConfig(ctx,{},keys);}
function integrityOrThrow(store,label){
  const check=store.integrityCheck();
  if(!check.ok)throw new Error(`${label} SQLite integrity check failed: ${check.details.join('; ')}`);
  return check;
}
function fileInfo(path){
  try{
    const info=lstatSync(path,{bigint:true});
    if(!info.isFile()||info.isSymbolicLink())throw new Error(`Refusing to modify non-regular file: ${path}`);
    return info;
  }catch(error){
    if(error.code==='ENOENT')return null;
    throw error;
  }
}
function normalizedPath(path){
  let absolute=resolve(path);
  const extendedPrefix=String.fromCharCode(92,92,63,92);
  if(process.platform==='win32'&&absolute.startsWith(extendedPrefix))absolute=absolute.slice(extendedPrefix.length);
  return process.platform==='win32'?absolute.toLowerCase():absolute;
}
function samePath(left,right){return normalizedPath(left)===normalizedPath(right);}
function canonicalDatabasePath(path){
  const absolute=resolve(path),real=realpathSync(absolute);
  if(!samePath(absolute,real))throw new Error('Automatic migration refuses a symlink/reparse-point source database');
  return real;
}
function fileIdentity(path){
  const info=fileInfo(path);
  if(!info)return null;
  const identity={dev:String(info.dev),ino:String(info.ino)};
  if(identity.ino==='0'){
    identity.size=String(info.size);
    identity.mtimeMs=String(info.mtimeMs);
  }
  return identity;
}
function assertFileIdentity(path,expected){
  const actual=fileIdentity(path);
  if(!actual||expected.dev!==actual.dev||expected.ino!==actual.ino||(expected.ino==='0'&&(expected.size!==actual.size||expected.mtimeMs!==actual.mtimeMs)))throw new Error(`File identity changed; refusing cleanup: ${path}`);
}
function databaseFileIdentity(path){
  const main=fileIdentity(path);
  if(!main)throw new Error(`Source database is missing: ${path}`);
  return JSON.stringify({main,wal:fileIdentity(`${path}-wal`),shm:fileIdentity(`${path}-shm`)});
}
function validateMigrationId(id){
  if(typeof id!=='string'||!/^([0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12})$/i.test(id))throw new Error('Migration transaction id is invalid');
  return id;
}
function retiredPath(path,id){return `${path}.dfm-retired-${validateMigrationId(id)}`;}
function assertPendingSourceIdentity(sourcePath,migrationId,serialized){
  let expected;
  try{expected=JSON.parse(serialized);}catch{throw new Error('Stored source database identity is invalid');}
  if(!expected?.main||!expected.main.dev||!expected.main.ino)throw new Error('Stored source database identity is incomplete');
  const source=resolve(sourcePath),retiredMain=retiredPath(source,migrationId);
  const originalMainInfo=fileInfo(source),retiredMainInfo=fileInfo(retiredMain);
  if(originalMainInfo&&retiredMainInfo)throw new Error('Both original and quarantined source databases exist; refusing cleanup');
  const mainPath=originalMainInfo?source:retiredMainInfo?retiredMain:null;
  if(mainPath){
    canonicalDatabasePath(mainPath);
    assertFileIdentity(mainPath,expected.main);
  }
  for(const key of ['wal','shm']){
    const original=`${source}-${key}`,retired=retiredPath(original,migrationId);
    const originalInfo=fileInfo(original),retiredInfo=fileInfo(retired);
    if(originalInfo&&retiredInfo)throw new Error(`Both original and quarantined ${key.toUpperCase()} files exist; refusing cleanup`);
    const actualPath=originalInfo?original:retiredInfo?retired:null;
    if(!expected[key]&&actualPath)throw new Error(`Unrecorded source ${key.toUpperCase()} sidecar exists; refusing cleanup`);
    if(expected[key]&&actualPath)assertFileIdentity(actualPath,expected[key]);
    if(!mainPath&&actualPath)throw new Error('Source database is missing but sidecars remain; refusing cleanup');
  }
  return Boolean(mainPath);
}
function cleanupOwnedStage(path){
  for(const candidate of [path,`${path}-wal`,`${path}-shm`]){
    const info=fileInfo(candidate);
    if(info)unlinkSync(candidate);
  }
}
function retireDatabaseFiles(sourcePath,migrationId,sourceIdentity){
  const main=resolve(sourcePath),quarantinedMain=retiredPath(main,migrationId);
  const mainInfo=fileInfo(main),retiredMainInfo=fileInfo(quarantinedMain);
  if(mainInfo&&retiredMainInfo)throw new Error('Both original and quarantined source databases exist; refusing cleanup');
  assertPendingSourceIdentity(main,migrationId,sourceIdentity);
  const pairs=[
    [`${main}-wal`,retiredPath(`${main}-wal`,migrationId)],
    [`${main}-shm`,retiredPath(`${main}-shm`,migrationId)],
    [main,quarantinedMain],
  ];
  const sidecarsPresent=pairs.slice(0,2).filter(([original,retired])=>fileInfo(original)||fileInfo(retired)).length;
  if(!mainInfo&&!retiredMainInfo&&(fileInfo(pairs[0][0])||fileInfo(pairs[1][0])||fileInfo(pairs[0][1])||fileInfo(pairs[1][1])))throw new Error('Source database is missing but sidecars remain; refusing to remove unrelated files');
  const expected=JSON.parse(sourceIdentity);
  const identityFor=path=>path===main?'main':path===`${main}-wal`?'wal':'shm';
  const moved=[];
  try{
    for(const [original,retired] of pairs){
      const originalInfo=fileInfo(original),retiredInfo=fileInfo(retired),key=identityFor(original);
      if(originalInfo&&retiredInfo)throw new Error(`Both source and quarantine files exist: ${original}`);
      const existing=originalInfo?original:retiredInfo?retired:null;
      if(existing){
        if(!expected[key])throw new Error(`Unrecorded source ${key.toUpperCase()} file appeared; refusing cleanup`);
        assertFileIdentity(existing,expected[key]);
      }
      if(originalInfo){renameSync(original,retired);moved.push([original,retired]);}
    }
  }catch(error){
    for(const [original,retired] of moved.reverse()){
      try{if(fileInfo(retired)&&!fileInfo(original)){assertFileIdentity(retired,expected[identityFor(original)]);renameSync(retired,original);}}
      catch(restoreError){console.error('[dafeiyu-memory] Failed to restore a quarantined source file',restoreError);}
    }
    throw error;
  }
  for(const [original,retired] of pairs.slice(0,2)){
    if(fileInfo(retired)){assertFileIdentity(retired,expected[identityFor(original)]);unlinkSync(retired);}
  }
  if(fileInfo(quarantinedMain)){assertFileIdentity(quarantinedMain,expected.main);unlinkSync(quarantinedMain);}
  return {sourceRemoved:Boolean(mainInfo||retiredMainInfo),sidecarsRemoved:sidecarsPresent};
}
async function copyDatabaseToTarget(store,controller,sourcePath,targetPath,bank,replaceTarget){
  if(samePath(sourcePath,targetPath))throw new Error('Source and target database paths are identical');
  const targetInfo=fileInfo(targetPath);
  const sidecars=[`${targetPath}-wal`,`${targetPath}-shm`].map(fileInfo);
  if(sidecars.some(Boolean))throw new Error('The selected target has WAL/SHM sidecars; close its database and retry without replacing an active file');
  if(targetInfo&&!replaceTarget)throw new Error('A database already exists at the selected target; confirm the exact target path before replacing it');
  if(targetInfo){
    const inspection=MemoryStore.inspectDatabase(targetPath,bank);
    if(!inspection.ok)throw new Error(`Selected target is not a compatible ${bank} memory database; it was not replaced: ${inspection.details.join('; ')}`);
  }
  const backfill=await controller.backfill();
  integrityOrThrow(store,'Source after session backfill');
  const sourceIdentity=databaseFileIdentity(sourcePath);
  const stagePath=join(dirname(targetPath),`.dafeiyu-memory-${randomUUID()}.stage`);
  let stagedStore,targetStore,previousTargetPath,snapshotStats,targetInstalled=false;
  try{
    await store.backup(stagePath);
    stagedStore=new MemoryStore(stagePath,bank);
    integrityOrThrow(stagedStore,'Staged copy');
    snapshotStats=stagedStore.stats();
    stagedStore.close();
    stagedStore=null;
    if(targetInfo){
      previousTargetPath=`${targetPath}.dfm-previous-${randomUUID()}`;
      renameSync(targetPath,previousTargetPath);
    }
    renameSync(stagePath,targetPath);
    targetInstalled=true;
    targetStore=new MemoryStore(targetPath,bank);
    integrityOrThrow(targetStore,'Reopened target before switching');
    const reopenedStats=targetStore.stats();
    if(snapshotStats.messages!==reopenedStats.messages||snapshotStats.chunks!==reopenedStats.chunks)throw new Error('Reopened target statistics do not match the staged SQLite snapshot');
    targetStore.close();
    targetStore=null;
    return {previousTargetPath,sourceIdentity,backfilledSessions:backfill.sessions,snapshotStats};
  }catch(error){
    if(targetStore){try{targetStore.close();}catch{}}
    if(targetInstalled){try{cleanupOwnedStage(targetPath);}catch(cleanupError){console.error('[dafeiyu-memory] Could not remove an invalid target copy',cleanupError);}}
    if(previousTargetPath){
      try{if(!fileInfo(targetPath)&&fileInfo(previousTargetPath))renameSync(previousTargetPath,targetPath);}
      catch(restoreError){console.error('[dafeiyu-memory] Failed to restore the previous target copy',restoreError);}
    }
    throw error;
  }finally{
    if(stagedStore){try{stagedStore.close();}catch{}}
    try{cleanupOwnedStage(stagePath);}catch(cleanupError){console.error('[dafeiyu-memory] Failed to remove migration staging files',cleanupError);}
  }
}
async function sessionTargetPage(ctx,offset,selectedIds=[]){
  if(!Number.isSafeInteger(offset)||offset<0)throw new Error('Invalid session-list offset');
  const records=await ctx.sessionQuery.listSessions();
  const page=records.slice(offset,offset+SESSION_PAGE_SIZE);
  const pageIds=new Set(page.map(record=>record.header.id));
  const selected=new Set(selectedIds);
  const byId=new Map(records.map(record=>[record.header.id,record]));
  const selectedRecords=selectedIds.map(id=>byId.get(id)).filter(record=>record&&!pageIds.has(record.header.id));
  const visible=[...page,...selectedRecords];
  let titleResults=[];
  try{
    if(visible.length)titleResults=await ctx.sessionQuery.readTitleSnapshots(visible.map(record=>record.header.id));
  }catch{}
  const titles=new Map();
  for(const result of titleResults){
    if(result.status==='fulfilled')titles.set(result.sessionId,result.value?.title?.title||'');
  }
  const items=visible.map(record=>{
    const header=record.header;
    const id=header.id;
    const fallback=header.cwd?.split(/[\\/]/).filter(Boolean).at(-1)||`Session ${id.slice(0,8)}`;
    return {id,title:titles.get(id)||fallback,createdAt:header.createdAt,live:record.live===true,persisted:record.persisted===true,selected:selected.has(id)};
  });
  return {
    items,
    total:records.length,
    offset,
    nextOffset:offset+page.length<records.length?offset+page.length:null,
    missingSelectedIds:selectedIds.filter(id=>!byId.has(id)),
  };
}
function workspaceTargets(ctx){
  return ctx.workspaceRegistry.list().map(workspace=>({
    id:workspace.id,title:workspace.title,sessionCount:workspace.sessionIds.length,
  }));
}
export function apply(ctx,config){
  const value=options(config);
  ctx.effect(()=>{
    const store=new MemoryStore(value.database,value.bank);
    let controller;
    let migrationTask=null;
    let migrationStatus=value.pendingMigrationFrom?{state:'checking'}:null;
    const routeDisposers=[];
    async function verifyPendingMigration(){
      if(!value.pendingMigrationFrom)return;
      try{
        if(!value.pendingMigrationTarget||!samePath(value.pendingMigrationTarget,value.database))throw new Error('Migration target does not match the active database path');
        validateMigrationId(value.pendingMigrationId);
        if(!isAbsolute(value.pendingMigrationFrom)||!value.pendingMigrationSourceIdentity)throw new Error('Migration source identity is missing or invalid');
        assertPendingSourceIdentity(resolve(value.pendingMigrationFrom),value.pendingMigrationId,value.pendingMigrationSourceIdentity);
        integrityOrThrow(store,'Reopened target');
        const backfill=await controller.backfill();
        integrityOrThrow(store,'Reopened target after session backfill');
        migrationStatus={state:'ready',sessions:backfill.sessions,verifiedAt:Date.now()};
      }catch(error){
        migrationStatus={state:'blocked',error:String(error?.message??error)};
        console.error('[dafeiyu-memory] Migration verification blocked; old database retained',error);
      }
    }
    async function finalizeMigration(requestedId){
      if(!value.pendingMigrationFrom||!value.pendingMigrationTarget)throw new Error('No pending database migration is available');
      validateMigrationId(value.pendingMigrationId);
      if(requestedId!==value.pendingMigrationId)throw new Error('Migration confirmation is stale; refresh the settings panel');
      if(!value.pendingMigrationSourceIdentity||!isAbsolute(value.pendingMigrationFrom))throw new Error('Migration source identity is missing or invalid');
      if(!samePath(value.pendingMigrationTarget,value.database)||samePath(value.pendingMigrationFrom,value.database))throw new Error('Migration source/target paths are invalid');
      if(migrationTask)await migrationTask;
      if(!['ready','cleanup-pending'].includes(migrationStatus?.state))throw new Error(migrationStatus?.error||'The new database is not yet verified; the old database was retained');
      let backfill;
      try{
        integrityOrThrow(store,'Reopened target');
        backfill=await controller.backfill();
        integrityOrThrow(store,'Reopened target after session backfill');
        assertPendingSourceIdentity(resolve(value.pendingMigrationFrom),value.pendingMigrationId,value.pendingMigrationSourceIdentity);
      }catch(error){
        migrationStatus={state:'blocked',error:String(error?.message??error)};
        throw error;
      }
      try{
        const retirement=retireDatabaseFiles(value.pendingMigrationFrom,value.pendingMigrationId,value.pendingMigrationSourceIdentity);
        await unsetConfig(ctx,['pendingMigrationFrom','pendingMigrationTarget','pendingMigrationId','pendingMigrationSourceIdentity']);
        for(const key of ['pendingMigrationFrom','pendingMigrationTarget','pendingMigrationId','pendingMigrationSourceIdentity'])delete value[key];
        migrationStatus=null;
        return {...retirement,sessionsVerified:backfill.sessions};
      }catch(error){
        migrationStatus={...migrationStatus,state:'cleanup-pending',error:String(error?.message??error)};
        throw error;
      }
    }
    try{
      controller=attach(ctx,store,value,defineTool);
      routeDisposers.push(registerRpcRoute(ctx,ENDPOINT,()=>store.storageStats(),'storage_stats_failed'));
      routeDisposers.push(registerRpcRoute(ctx,SETTINGS_ENDPOINT,async payload=>{
        if(!payload||typeof payload!=='object'||Array.isArray(payload))throw new Error('Invalid settings request');
        if(payload.action==='read'){
          const sessions=await sessionTargetPage(ctx,0,value.bindingSessionIds??[]);
          return {
            bindingMode:value.bindingMode,databasePath:value.database,
            bindingSessionIds:value.bindingSessionIds??null,bindingWorkspaceId:value.bindingWorkspaceId||null,
            sessionPage:sessions,workspaces:workspaceTargets(ctx),
            revision:settingsEntry(ctx).revision,
            migration:value.pendingMigrationFrom?{
              id:value.pendingMigrationId||null,sourcePath:value.pendingMigrationFrom,targetPath:value.pendingMigrationTarget||null,
              state:migrationStatus?.state||'checking',error:migrationStatus?.error||null,
              sessions:migrationStatus?.sessions??null,
            }:null,
          };
        }
        if(payload.action==='list-sessions'){
          return sessionTargetPage(ctx,payload.offset??0,value.bindingSessionIds??[]);
        }
        if(payload.action==='set-binding-mode'){
          if(!['session','workspace'].includes(payload.bindingMode))throw new Error('Binding mode must be session or workspace');
          if(payload.bindingMode===value.bindingMode)return {bindingMode:value.bindingMode,changed:false};
          await updateConfig(ctx,{bindingMode:payload.bindingMode});
          value.bindingMode=payload.bindingMode;
          return {bindingMode:payload.bindingMode,changed:true};
        }
        if(payload.action==='set-session-targets'){
          if(payload.sessionIds===null){
            await unsetConfig(ctx,['bindingSessionIds']);
            delete value.bindingSessionIds;
            return {bindingSessionIds:null,changed:true};
          }
          if(!Array.isArray(payload.sessionIds)||payload.sessionIds.some(id=>typeof id!=='string'||!id))throw new Error('Session targets must be a list of session ids');
          const sessionIds=[...new Set(payload.sessionIds)];
          const known=new Set((await ctx.sessionQuery.listSessions()).map(record=>record.header.id));
          const previouslySelected=new Set(value.bindingSessionIds??[]);
          if(sessionIds.some(id=>!known.has(id)&&!previouslySelected.has(id)))throw new Error('One or more selected sessions are no longer available; refresh the list and try again');
          await updateConfig(ctx,{bindingSessionIds:sessionIds});
          value.bindingSessionIds=sessionIds;
          return {bindingSessionIds:sessionIds,changed:true};
        }
        if(payload.action==='set-workspace-target'){
          if(typeof payload.workspaceId!=='string')throw new Error('Workspace target must be an id or empty');
          if(payload.workspaceId&&!ctx.workspaceRegistry.get(payload.workspaceId))throw new Error('The selected workspace is no longer available; refresh the list and try again');
          await updateConfig(ctx,{bindingWorkspaceId:payload.workspaceId});
          value.bindingWorkspaceId=payload.workspaceId;
          return {bindingWorkspaceId:payload.workspaceId,changed:true};
        }
        if(payload.action==='change-database-directory'){
          if(typeof payload.directory!=='string'||!payload.directory.trim()||!isAbsolute(payload.directory))throw new Error('Choose an absolute directory path');
          const directory=resolve(payload.directory);
          if(!statSync(directory).isDirectory())throw new Error('Selected path is not a directory');
          const target=resolve(realpathSync(directory),'memory.sqlite3');
          const source=canonicalDatabasePath(value.database);
          if(samePath(target,source))return {databasePath:value.database,changed:false};
          const migrationId=randomUUID();
          const replaced=await copyDatabaseToTarget(store,controller,source,target,value.bank,payload.replaceTarget===true);
          let persistenceError;
          try{
            await updateConfig(ctx,{database:target,pendingMigrationFrom:source,pendingMigrationTarget:target,
              pendingMigrationId:migrationId,pendingMigrationSourceIdentity:replaced.sourceIdentity});
          }catch(error){persistenceError=error;}
          finally{
            if(replaced.previousTargetPath){try{unlinkSync(replaced.previousTargetPath);}catch(cleanupError){console.error('[dafeiyu-memory] Could not remove replaced target backup',cleanupError);}}
          }
          if(persistenceError)throw new Error(`The settings update response was interrupted or rejected. The verified target remains at ${target}; the original database and sidecars were preserved. Refresh before retrying: ${persistenceError?.message??'unknown error'}`);
          return {databasePath:target,changed:true,copied:true,migrationPending:true,migrationId,backfilledSessions:replaced.backfilledSessions};
        }
        if(payload.action==='retry-migration-verification'){
          if(!value.pendingMigrationFrom||payload.migrationId!==value.pendingMigrationId)throw new Error('Migration confirmation is stale; refresh the settings panel');
          migrationStatus={state:'checking'};
          migrationTask=Promise.resolve().then(verifyPendingMigration);
          await migrationTask;
          return {id:value.pendingMigrationId,state:migrationStatus?.state||'blocked',error:migrationStatus?.error||null,sessions:migrationStatus?.sessions??null};
        }
        if(payload.action==='finalize-migration')return finalizeMigration(payload.migrationId);
        throw new Error('Unsupported memory settings action');
      },'memory_settings_failed'));
      if(value.pendingMigrationFrom)migrationTask=Promise.resolve().then(verifyPendingMigration);
    }catch(error){
      for(const dispose of routeDisposers.reverse())void dispose();
      if(controller)void controller.close();
      else store.close();
      throw error;
    }
    console.info(`[dafeiyu-memory] 1.3.1 已启用；bank=${value.bank}；mode=${value.bindingMode}；数据库=${value.database}`);
    return async()=>{
      try{for(const dispose of routeDisposers.reverse())await dispose();}
      finally{
        try{if(migrationTask)await migrationTask;}
        finally{await controller.close();}
      }
    };
  });
}
