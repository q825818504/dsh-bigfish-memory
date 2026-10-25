import { DatabaseSync, backup } from 'node:sqlite';
import { mkdirSync, existsSync } from 'node:fs';
import { dirname } from 'node:path';
import { createHash } from 'node:crypto';

const DAY = 86400000;
const HALF = { fleeting: 7, episodic: 30, durable: 180 };
const STOP = new Set(['的','了','吗','呢','我','你','他','它','是','在','和','有','就','啊','the','a','is','and']);
export function terms(text) {
  const result = [];
  for (const run of text.toLowerCase().match(/[\p{Script=Han}]+|[a-z0-9_]+/gu) ?? []) {
    if (/\p{Script=Han}/u.test(run)) {
      const chars = [...run];
      for (let i = 0; i < chars.length; i++) {
        if (!STOP.has(chars[i])) result.push(chars[i]);
        if (i + 1 < chars.length) result.push(chars[i] + chars[i+1]);
      }
    } else if (!STOP.has(run)) result.push(run);
  }
  return [...new Set(result)];
}
export function textOf(content) {
  if (typeof content === 'string') return content;
  return Array.isArray(content) ? content.filter(b => b.type === 'text' && typeof b.text === 'string').map(b => b.text).join('\n') : '';
}
function integer(n, min, max) {
  if (!Number.isSafeInteger(n) || n < min || n > max) throw new Error(`Expected integer ${min}..${max}`);
  return n;
}
function digest(s) { return createHash('sha256').update(s).digest('hex'); }

export class MemoryStore {
  constructor(path, bank = 'dafeiyu') {
    if (!bank || typeof bank !== 'string') throw new Error('bank is required');
    this.bank = bank;
    this.path = path;
    if (path !== ':memory:') mkdirSync(dirname(path), { recursive: true });
    this.db = new DatabaseSync(path);
    this.db.exec('PRAGMA foreign_keys=ON; PRAGMA busy_timeout=5000; PRAGMA journal_mode=WAL; PRAGMA synchronous=FULL;');
    const version = this.db.prepare('PRAGMA user_version').get().user_version;
    if (version > 1) { this.db.close(); throw new Error('Unsupported database version (use import-v02 for Python prototypes)'); }
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS messages (
        id INTEGER PRIMARY KEY, bank TEXT NOT NULL, session TEXT NOT NULL, event_key TEXT NOT NULL,
        role TEXT NOT NULL, text TEXT NOT NULL, content_json TEXT NOT NULL, source_message_id TEXT,
        recorded_at INTEGER NOT NULL, source_time INTEGER, interrupted INTEGER NOT NULL DEFAULT 0,
        UNIQUE(bank,session,event_key));
      CREATE INDEX IF NOT EXISTS messages_bank_session ON messages(bank,session,id);
      CREATE INDEX IF NOT EXISTS messages_bank_time ON messages(bank,source_time);
      CREATE TABLE IF NOT EXISTS chunks (
        id INTEGER PRIMARY KEY, message INTEGER NOT NULL REFERENCES messages(id), start INTEGER NOT NULL,
        end INTEGER NOT NULL, text TEXT NOT NULL, category TEXT NOT NULL DEFAULT 'episodic',
        importance REAL NOT NULL DEFAULT 0.5, activated INTEGER NOT NULL, boosts INTEGER NOT NULL DEFAULT 0,
        last_boost INTEGER, UNIQUE(message,start));
      CREATE VIRTUAL TABLE IF NOT EXISTS search_index USING fts5(terms, tokenize='unicode61');
      CREATE TABLE IF NOT EXISTS anchors (
        id INTEGER PRIMARY KEY, bank TEXT NOT NULL, name TEXT NOT NULL, UNIQUE(bank,name));
      CREATE TABLE IF NOT EXISTS aliases (anchor INTEGER REFERENCES anchors(id), alias TEXT NOT NULL, PRIMARY KEY(anchor,alias));
      CREATE TABLE IF NOT EXISTS anchor_sources (anchor INTEGER REFERENCES anchors(id), chunk INTEGER REFERENCES chunks(id), PRIMARY KEY(anchor,chunk));
      CREATE TABLE IF NOT EXISTS activations (bank TEXT NOT NULL, chunk INTEGER REFERENCES chunks(id), event_key TEXT NOT NULL,
        at INTEGER NOT NULL, PRIMARY KEY(bank,chunk,event_key));
      CREATE TABLE IF NOT EXISTS ledger (id INTEGER PRIMARY KEY, bank TEXT NOT NULL, at INTEGER NOT NULL,
        kind TEXT NOT NULL, chars INTEGER NOT NULL, sources TEXT NOT NULL);
      CREATE TABLE IF NOT EXISTS housekeeping (bank TEXT PRIMARY KEY, last_chunk INTEGER NOT NULL DEFAULT 0);
      CREATE TABLE IF NOT EXISTS groups (chunk INTEGER PRIMARY KEY REFERENCES chunks(id), bank TEXT NOT NULL, digest TEXT NOT NULL);
      CREATE TABLE IF NOT EXISTS replays (chunk INTEGER PRIMARY KEY REFERENCES chunks(id), at INTEGER NOT NULL);
      PRAGMA user_version=1;
    `);
  }
  close() { this.db.close(); }
  transaction(fn) {
    this.db.exec('BEGIN IMMEDIATE');
    try { const result = fn(); this.db.exec('COMMIT'); return result; }
    catch (error) { this.db.exec('ROLLBACK'); throw error; }
  }
  // Called only by the trusted DSH adapter/importer, never exposed as a model tool.
  capture({ session, eventKey, sourceMessageId = null, role, content, sourceTime = null, interrupted = false }) {
    if (!session || !eventKey || !['user','assistant'].includes(role)) throw new Error('Invalid capture');
    const text = textOf(content);
    if (!text && (!Array.isArray(content) || !content.length)) return null;
    if (sourceTime !== null && (!Number.isSafeInteger(sourceTime) || sourceTime < 0)) throw new Error('Invalid host event time');
    return this.transaction(() => {
      const now = Date.now();
      const saved = this.db.prepare(`INSERT OR IGNORE INTO messages(bank,session,event_key,role,text,content_json,source_message_id,recorded_at,source_time,interrupted)
        VALUES (?,?,?,?,?,?,?,?,?,?)`).run(this.bank, session, eventKey, role, text, JSON.stringify(content), sourceMessageId, now, sourceTime, Number(interrupted));
      if (!saved.changes) return null;
      const mid = Number(saved.lastInsertRowid);
      // Lossless full original on disk, small overlapping excerpts in the search index.
      for (let start = 0; start < text.length; start += 640) {
        const end = Math.min(text.length, start + 800);
        const part = text.slice(start, end);
        const row = this.db.prepare('INSERT INTO chunks(message,start,end,text,activated) VALUES (?,?,?,?,?)').run(mid,start,end,part,now);
        this.db.prepare('INSERT INTO search_index(rowid,terms) VALUES (?,?)').run(Number(row.lastInsertRowid),terms(part).join(' '));
        if (end === text.length) break;
      }
      return mid;
    });
  }
  chunk(id) {
    integer(id,1,Number.MAX_SAFE_INTEGER);
    const row = this.db.prepare(`SELECT c.*,m.bank,m.session,m.event_key,m.role,m.source_time,m.recorded_at,m.interrupted
      FROM chunks c JOIN messages m ON m.id=c.message WHERE c.id=? AND m.bank=?`).get(id,this.bank);
    if (!row) throw new Error('Memory not found in this bank');
    return row;
  }
  state(row) {
    const half = HALF[row.category] * (0.5 + row.importance * 1.5) * (1 + Math.min(row.boosts,8)*0.25);
    const strength = 2 ** (-Math.max(0,Date.now()-row.activated)/DAY/half);
    return { halfLifeDays: half, strength, layer: strength >= .5 ? 'active' : strength >= .1 ? 'warm' : 'cold' };
  }
  configure(id, {category='episodic',importance=.5}={}) {
    this.chunk(id);
    if (!Object.hasOwn(HALF,category) || !Number.isFinite(importance) || importance<0 || importance>1) throw new Error('Invalid importance/category');
    this.db.prepare('UPDATE chunks SET category=?,importance=? WHERE id=?').run(category,importance,id);
  }
  reinforce(id,eventKey) {
    if (!eventKey) throw new Error('Host event key required');
    return this.transaction(() => {
      const row=this.chunk(id), now=Date.now();
      const saved=this.db.prepare('INSERT OR IGNORE INTO activations VALUES (?,?,?,?)').run(this.bank,id,eventKey,now);
      if (!saved.changes) return false;
      const boost=row.last_boost===null || now-row.last_boost>=DAY;
      this.db.prepare('UPDATE chunks SET activated=?,boosts=MIN(8,boosts+?),last_boost=? WHERE id=?').run(now,Number(boost),boost?now:row.last_boost,id);
      return true;
    });
  }
  anchor(name,ids,aliases=[]) {
    if (!name?.trim() || !ids.length) throw new Error('Anchor name and source IDs required');
    for(const id of ids) this.chunk(id);
    const names=[...new Set([name,...aliases].map(s=>s.trim().toLowerCase()))];
    if(names.some(s=>s.length<2 || s.length>120)) throw new Error('Alias length must be 2..120');
    return this.transaction(()=>{
      this.db.prepare('INSERT OR IGNORE INTO anchors(bank,name) VALUES (?,?)').run(this.bank,name);
      const id=this.db.prepare('SELECT id FROM anchors WHERE bank=? AND name=?').get(this.bank,name).id;
      for(const alias of names) this.db.prepare('INSERT OR IGNORE INTO aliases VALUES (?,?)').run(id,alias);
      for(const source of ids) this.db.prepare('INSERT OR IGNORE INTO anchor_sources VALUES (?,?)').run(id,source);
      return id;
    });
  }
  search(query,{limit=5,archive=false,excludeSession=null,excludeSourceId=null,since=null,before=null}={}) {
    integer(limit,1,20);
    const wanted=terms(String(query)).filter(t=>t.length>1).slice(0,64);
    const fallback=terms(String(query)).slice(0,64);
    const selected=wanted.length?wanted:fallback;
    const scores=new Map(), reasons=new Map();
    if(selected.length){
      const match=selected.map(t=>'"'+t.replaceAll('"','""')+'"').join(' OR ');
      const rows=this.db.prepare(`SELECT c.id,bm25(search_index) rank FROM search_index JOIN chunks c ON c.id=search_index.rowid
        JOIN messages m ON m.id=c.message WHERE search_index MATCH ? AND m.bank=?
        AND (? IS NULL OR m.session<>?) AND (? IS NULL OR m.source_message_id<>?)
        AND (? IS NULL OR COALESCE(m.source_time,m.recorded_at)>=?)
        AND (? IS NULL OR COALESCE(m.source_time,m.recorded_at)<?) ORDER BY rank LIMIT 120`)
        .all(match,this.bank,excludeSession,excludeSession,excludeSourceId,excludeSourceId,since,since,before,before);
      rows.forEach((r,i)=>{scores.set(r.id,1/(60+i));reasons.set(r.id,['keyword']);});
    }
    const anchors=new Set();
    for(const a of this.db.prepare('SELECT a.id,x.alias FROM anchors a JOIN aliases x ON x.anchor=a.id WHERE a.bank=?').all(this.bank)){
      if(String(query).toLowerCase().includes(a.alias)) anchors.add(a.id);
    }
    for(const id of [...scores.keys()].slice(0,3)){
      for(const a of this.db.prepare('SELECT anchor FROM anchor_sources WHERE chunk=?').all(id)) anchors.add(a.anchor);
    }
    for(const aid of [...anchors].slice(0,10)){
      for(const r of this.db.prepare(`SELECT c.id FROM anchor_sources a JOIN chunks c ON c.id=a.chunk
        JOIN messages m ON m.id=c.message WHERE a.anchor=? AND m.bank=? AND (? IS NULL OR m.session<>?)
        AND (? IS NULL OR m.source_message_id<>?)
        AND (? IS NULL OR COALESCE(m.source_time,m.recorded_at)>=?)
        AND (? IS NULL OR COALESCE(m.source_time,m.recorded_at)<?) ORDER BY c.id DESC LIMIT 20`)
        .all(aid,this.bank,excludeSession,excludeSession,excludeSourceId,excludeSourceId,since,since,before,before)){
        scores.set(r.id,(scores.get(r.id)??0)+.01);
        reasons.set(r.id,[...(reasons.get(r.id)??[]),'anchor']);
      }
    }
    const hits=[...scores].map(([id,score])=>{
      const row=this.chunk(id), state=this.state(row);
      return {...row,state,score:score*(archive?1:.8+.2*state.strength),reasons:reasons.get(id)};
    }).sort((a,b)=>b.score-a.score||b.id-a.id);
    const seen=new Map(),out=[];
    for(const hit of hits){
      const ranges=seen.get(hit.message)??[];
      if(ranges.some(r=>hit.start<r.end && hit.end>r.start))continue;
      ranges.push(hit);seen.set(hit.message,ranges);out.push(hit);
      if(out.length===limit)break;
    }
    return out;
  }
  recall(query,{maxChars=2400,...options}={}) {
    integer(maxChars,200,20000);
    const hits=this.search(query,options), snippets=[];
    for(const hit of hits){
      const excerpt={id:hit.id,role:hit.role,time:hit.source_time??hit.recorded_at,
        source:{session:hit.session,event:hit.event_key},text:hit.text,interrupted:Boolean(hit.interrupted)};
      const candidate=JSON.stringify([...snippets,excerpt]);
      if(candidate.length<=maxChars)snippets.push(excerpt);
    }
    return {text:snippets.length?JSON.stringify(snippets):'',ids:snippets.map(s=>s.id)};
  }
  read(id,{offset=null,length=3000}={}) {
    integer(length,1,6000);
    const chunk=this.chunk(id);
    const row=this.db.prepare('SELECT * FROM messages WHERE id=? AND bank=?').get(chunk.message,this.bank);
    const start=offset===null?Math.max(0,chunk.start-200):integer(offset,0,row.text.length);
    return {id,role:row.role,time:row.source_time??row.recorded_at,source:{session:row.session,event:row.event_key},
      text:row.text.slice(start,start+length),
      offset:start,nextOffset:start+length<row.text.length?start+length:null,totalChars:row.text.length,
      interrupted:Boolean(row.interrupted)};
  }
  log(kind,text,ids=[]) {
    this.db.prepare('INSERT INTO ledger(bank,at,kind,chars,sources) VALUES (?,?,?,?,?)').run(this.bank,Date.now(),kind,text.length,JSON.stringify(ids));
  }
  sleep(limit=100) {
    integer(limit,1,1000);
    return this.transaction(()=>{
      const last=this.db.prepare('SELECT last_chunk FROM housekeeping WHERE bank=?').get(this.bank)?.last_chunk??0;
      const rows=this.db.prepare(`SELECT c.id,c.text,m.role FROM chunks c JOIN messages m ON m.id=c.message
        WHERE m.bank=? AND c.id>? ORDER BY c.id LIMIT ?`).all(this.bank,last,limit);
      for(const row of rows){
        this.db.prepare('INSERT OR REPLACE INTO groups VALUES (?,?,?)').run(row.id,this.bank,digest(row.role+'\0'+row.text));
        this.db.prepare('DELETE FROM search_index WHERE rowid=?').run(row.id);
        this.db.prepare('INSERT INTO search_index(rowid,terms) VALUES (?,?)').run(row.id,terms(row.text).join(' '));
      }
      this.db.prepare('INSERT OR REPLACE INTO housekeeping VALUES (?,?)').run(this.bank,rows.at(-1)?.id??last);
      return {processed:rows.length,lastChunk:rows.at(-1)?.id??last};
    });
  }
  replay(limit=10) {
    integer(limit,1,100);
    return this.transaction(()=>{
      const rows=this.db.prepare(`SELECT c.id FROM chunks c JOIN messages m ON m.id=c.message
        LEFT JOIN replays r ON r.chunk=c.id WHERE m.bank=? ORDER BY COALESCE(r.at,0),c.id LIMIT ?`).all(this.bank,limit);
      const result=rows.map(r=>this.read(r.id,{length:800}));
      for(const row of rows)this.db.prepare('INSERT OR REPLACE INTO replays VALUES (?,?)').run(row.id,Date.now());
      return result;
    });
  }
  stats() {
    return {bank:this.bank,messages:this.db.prepare('SELECT COUNT(*) n FROM messages WHERE bank=?').get(this.bank).n,
      chunks:this.db.prepare('SELECT COUNT(*) n FROM chunks c JOIN messages m ON m.id=c.message WHERE m.bank=?').get(this.bank).n,
      lastCapture:this.db.prepare('SELECT MAX(recorded_at) t FROM messages WHERE bank=?').get(this.bank).t,
      injectedChars:this.db.prepare("SELECT COALESCE(SUM(chars),0) n FROM ledger WHERE bank=? AND kind='injected'").get(this.bank).n};
  }
  async backup(path) {
    mkdirSync(dirname(path), { recursive: true });
    if(existsSync(path))throw new Error('Backup destination already exists');
    await backup(this.db,path);
  }
}
