import z from '@deepseek-ai/schemastery';
import { defineTool } from '@deepseek-ai/dsh-tools';
import { join, resolve } from 'node:path';
import { homedir } from 'node:os';
import { MemoryStore } from './lib/store.js';
import { attach } from './lib/adapter.js';

export const name='dafeiyu-memory';
export const inject=['sessions','sessionQuery','agents','systemPrompt','tools'];
export const Config=z.object({
  database:z.string(),bank:z.string().default('dafeiyu'),preset:z.string().default(''),autoRecall:z.boolean().default(true),
  recallChars:z.number().default(2400),toolChars:z.number().default(6000),
  maintenanceMinutes:z.number().default(30),includeSubagents:z.boolean().default(false),
});
function expandHome(path){
  if(path==='~')return homedir();
  if(path.startsWith('~/')||path.startsWith('~\\'))return join(homedir(),path.slice(2));
  return path;
}
export function options(config={}){
  const value={bank:'dafeiyu',preset:'',autoRecall:true,recallChars:2400,toolChars:6000,maintenanceMinutes:30,includeSubagents:false};
  for(const [key,setting] of Object.entries(config??{}))if(setting!==undefined)value[key]=setting;
  for(const [key,min,max] of [['recallChars',800,12000],['toolChars',800,20000],['maintenanceMinutes',0,1440]]){
    if(!Number.isSafeInteger(value[key])||value[key]<min||value[key]>max)throw new Error(`dafeiyu-memory: invalid ${key}`);
  }
  const dshHome=expandHome(process.env.DSH_HOME?.trim()||join(homedir(),'.dsh'));
  value.database=resolve(expandHome(value.database??join(dshHome,'dafeiyu-memory','memory.sqlite3')));
  return value;
}
export function apply(ctx,config){
  const value=options(config);
  ctx.effect(()=>{
    const store=new MemoryStore(value.database,value.bank);
    let controller;
    try{controller=attach(ctx,store,value,defineTool);}catch(error){store.close();throw error;}
    console.info(`[dafeiyu-memory] 1.0.0 已启用；bank=${value.bank}；数据库=${value.database}`);
    return ()=>controller.close();
  });
}
