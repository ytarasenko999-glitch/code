/* CODE · AI tarot reader (Vercel serverless function)
   - requires a signed-in CODE account (Supabase session token)
   - per-user daily limit, counted in the ai_usage table (RLS: each user sees/inserts only own rows)
   - the Anthropic key lives only in the ANTHROPIC_API_KEY environment variable */

const SB_URL = process.env.SUPABASE_URL || 'https://blwyzqxhzvjzhqkabesi.supabase.co';
const SB_KEY = process.env.SUPABASE_ANON_KEY || 'sb_publishable_v2wRmfGkiVW7fF6wIkPZBg_fjeS3wBu';
const MODEL = process.env.AI_MODEL || 'claude-sonnet-5-5';
const DAILY_CAP = parseInt(process.env.AI_DAILY_CAP || '60', 10);   // safety cap per user per day, any plan
const QUOTA = { plus: parseInt(process.env.AI_PLUS || '100', 10), pro: parseInt(process.env.AI_PRO || '300', 10) }; // per 30 days
const DEEP = { report: { plus: 1, pro: 10 }, year: { plus: 1, pro: 10 } }; // personal readings / 12-month forecasts per 30 days
const POOL = 'kind=not.in.(report,year,photo,cont,tr)'; // «cont» = free continuation of a cut-off paid reading
const PRICE_IN = parseFloat(process.env.AI_PRICE_IN || '2'), PRICE_OUT = parseFloat(process.env.AI_PRICE_OUT || '10'); // $ per million tokens (Sonnet 5.5)
const costOf = (i, o) => Math.round(((i || 0) * PRICE_IN + (o || 0) * PRICE_OUT) / 1e6 * 1e6) / 1e6;
const PHOTO_DAY = parseInt(process.env.AI_PHOTO_DAY || '20', 10); // photo recognition is free (part of the reading) but capped per day // tarot + ask-your-matrix share one request pool
const FREE_START = parseInt(process.env.AI_FREE_START || '3', 10), FREE_WEEK = parseInt(process.env.AI_FREE_WEEK || '1', 10);
const ORIGINS = (process.env.ALLOWED_ORIGINS || 'https://code-matrix.space,https://www.code-matrix.space,https://code-matrix-test.vercel.app').split(',').map(s => s.trim());

const KB = require('./_kb.js');
const fail = (res, status, code, extra) => { res.statusCode = status; res.setHeader('content-type', 'application/json'); res.end(JSON.stringify({ code, ...(extra || {}) })); };

async function sbUser(token) {
  const r = await fetch(`${SB_URL}/auth/v1/user`, { headers: { apikey: SB_KEY, Authorization: `Bearer ${token}` } });
  if (!r.ok) return null;
  const u = await r.json();
  return u && u.id ? u : null;
}
const H = token => ({ apikey: SB_KEY, Authorization: `Bearer ${token}` });
async function countUse(token, uid, { since, source, kind, pool } = {}) {
  let q = `${SB_URL}/rest/v1/ai_usage?select=id&user_id=eq.${uid}`;
  if (kind) q += `&kind=eq.${kind}`;
  if (pool) q += `&${POOL}`;
  if (since) q += `&created_at=gte.${encodeURIComponent(since.toISOString())}`;
  if (source) q += `&source=eq.${source}`;
  const r = await fetch(q, { headers: { ...H(token), Prefer: 'count=exact', Range: '0-0' } });
  if (!r.ok) throw new Error('usage_read_' + r.status);
  const cr = r.headers.get('content-range') || '';
  return parseInt(cr.split('/')[1] || '0', 10) || 0;
}
async function getSub(token, uid) {
  const r = await fetch(`${SB_URL}/rest/v1/subscriptions?select=*&user_id=eq.${uid}`, { headers: H(token) });
  if (!r.ok) return null;
  const a = await r.json(); return a && a[0] ? a[0] : null;
}
/* decides which allowance pays for this request.
   tarot / chat: plan → free → pack requests.  report / year: plan's monthly deep quota → pack readings (report only). */
const TR_DAY = parseInt(process.env.AI_TR_DAY || '80', 10);   // translation chunks per user per day
const TR_LANGS = { en: 'English', uk: 'Ukrainian', de: 'German', fr: 'French', es: 'Spanish', it: 'Italian' };
async function allowance(token, uid, task) {
  const day = new Date(); day.setUTCHours(0, 0, 0, 0);
  if (task === 'tr') {
    /* translating a reading the person already has (a paid report / forecast): free, but only for people who have one, with a daily cap */
    const owned = (await countUse(token, uid, { kind: 'report' })) + (await countUse(token, uid, { kind: 'year' }));
    if (!owned) return { ok: false, code: 'need_plan', plan: 'free' };
    if (await countUse(token, uid, { since: day, kind: 'tr' }) >= TR_DAY) return { ok: false, code: 'daily_limit' };
    return { ok: true, source: 'tr', left: 0, plan: 'free' };
  }
  if (await countUse(token, uid, { since: day }) >= DAILY_CAP) return { ok: false, code: 'daily_limit' };
  const sub = (await getSub(token, uid)) || { plan: 'free', packs: 0 };
  const paid = (sub.plan === 'plus' || sub.plan === 'pro') && sub.paid_until && new Date(sub.paid_until) > new Date();
  const month = new Date(Date.now() - 30 * 864e5);
  if (task === 'cont') {
    /* continuing a long paid reading that was cut off: allowed only right after a paid report/forecast, not counted */
    const recent = new Date(Date.now() - 45 * 60 * 1000);
    const deep = (await countUse(token, uid, { since: recent, kind: 'report' })) + (await countUse(token, uid, { since: recent, kind: 'year' }));
    const conts = await countUse(token, uid, { since: recent, kind: 'cont' });
    if (deep > 0 && conts < deep * 3) return { ok: true, source: 'cont', left: 0, plan: sub.plan || 'free' };
    return { ok: false, code: 'need_plan', plan: paid ? sub.plan : 'free' };
  }
  if (task === 'report' || task === 'year') {
    if (paid) {
      const q = DEEP[task][sub.plan] || 0, used = await countUse(token, uid, { since: month, source: 'plan', kind: task });
      if (used < q) return { ok: true, source: 'plan', left: q - used - 1, plan: sub.plan };
    }
    if (task === 'report' && (sub.pack_reports || 0) > 0) {
      const usedP = await countUse(token, uid, { source: 'pack', kind: 'report' });
      if (usedP < sub.pack_reports) return { ok: true, source: 'pack', left: sub.pack_reports - usedP - 1, plan: sub.plan || 'free' };
    }
    return { ok: false, code: paid ? 'report_quota' : 'need_plan', plan: paid ? sub.plan : 'free' };
  }
  if (paid) {
    const used = await countUse(token, uid, { since: month, source: 'plan', pool: true });
    if (used < QUOTA[sub.plan]) return { ok: true, source: 'plan', left: QUOTA[sub.plan] - used - 1, plan: sub.plan };
  } else {
    const all = await countUse(token, uid, { source: 'free', pool: true });
    if (all < FREE_START) return { ok: true, source: 'free', left: FREE_START - all - 1, plan: 'free' };
    const week = await countUse(token, uid, { since: new Date(Date.now() - 7 * 864e5), source: 'free', pool: true });
    if (week < FREE_WEEK) return { ok: true, source: 'free', left: 0, plan: 'free' };
  }
  const packs = sub.packs || 0;
  if (packs > 0) { const usedP = await countUse(token, uid, { source: 'pack', pool: true }); if (usedP < packs) return { ok: true, source: 'pack', left: packs - usedP - 1, plan: sub.plan || 'free' }; }
  return { ok: false, code: paid ? 'plan_quota' : 'free_quota', plan: paid ? sub.plan : 'free' };
}
/* oldest usage inside a rolling window → when the next unit comes back */
async function oldest(token, uid, { since, source, kind, pool }) {
  let q = `${SB_URL}/rest/v1/ai_usage?select=created_at&user_id=eq.${uid}&order=created_at.asc&limit=1`;
  if (since) q += `&created_at=gte.${encodeURIComponent(since.toISOString())}`;
  if (source) q += `&source=eq.${source}`;
  if (kind) q += `&kind=eq.${kind}`;
  if (pool) q += `&${POOL}`;
  const r = await fetch(q, { headers: H(token) }); if (!r.ok) return null;
  const a = await r.json(); return a && a[0] ? new Date(a[0].created_at) : null;
}
const plusDays = (d, n) => d ? new Date(d.getTime() + n * 864e5).toISOString() : null;
/* what the person has left right now — same rules as allowance() */
async function balance(token, uid) {
  const sub = (await getSub(token, uid)) || { plan: 'free', packs: 0, pack_reports: 0 };
  const paid = (sub.plan === 'plus' || sub.plan === 'pro') && sub.paid_until && new Date(sub.paid_until) > new Date();
  const month = new Date(Date.now() - 30 * 864e5), week = new Date(Date.now() - 7 * 864e5);
  const out = { plan: paid ? sub.plan : 'free', paid_until: paid ? sub.paid_until : null, photo_day: PHOTO_DAY };
  if (paid) {
    const used = await countUse(token, uid, { since: month, source: 'plan', pool: true }), total = QUOTA[sub.plan];
    out.ai = { kind: 'month', left: Math.max(0, total - used), total, next: used >= total ? plusDays(await oldest(token, uid, { since: month, source: 'plan', pool: true }), 30) : null };
    for (const t of ['report', 'year']) {
      const u = await countUse(token, uid, { since: month, source: 'plan', kind: t }), tt = DEEP[t][sub.plan] || 0;
      out[t] = { left: Math.max(0, tt - u), total: tt, next: u >= tt ? plusDays(await oldest(token, uid, { since: month, source: 'plan', kind: t }), 30) : null };
    }
  } else {
    const all = await countUse(token, uid, { source: 'free', pool: true });
    if (all < FREE_START) out.ai = { kind: 'start', left: FREE_START - all, total: FREE_START, next: null };
    else {
      const w = await countUse(token, uid, { since: week, source: 'free', pool: true });
      out.ai = { kind: 'week', left: Math.max(0, FREE_WEEK - w), total: FREE_WEEK, next: w >= FREE_WEEK ? plusDays(await oldest(token, uid, { since: week, source: 'free', pool: true }), 7) : null };
    }
    out.report = null; out.year = null;
  }
  const pA = sub.packs || 0, pR = sub.pack_reports || 0;
  out.pack = {
    ai: pA ? Math.max(0, pA - await countUse(token, uid, { source: 'pack', pool: true })) : 0,
    report: pR ? Math.max(0, pR - await countUse(token, uid, { source: 'pack', kind: 'report' })) : 0
  };
  return out;
}
async function logUse(token, uid, kind, source, tin, tout) {
  const row = { user_id: uid, kind, source };
  if (tin != null || tout != null) Object.assign(row, { tokens_in: tin || 0, tokens_out: tout || 0, cost: costOf(tin, tout) });
  let r = await fetch(`${SB_URL}/rest/v1/ai_usage`, { method: 'POST', headers: { ...H(token), 'content-type': 'application/json', Prefer: 'return=minimal' }, body: JSON.stringify(row) });
  if (!r.ok && row.cost != null) { delete row.tokens_in; delete row.tokens_out; delete row.cost; r = await fetch(`${SB_URL}/rest/v1/ai_usage`, { method: 'POST', headers: { ...H(token), 'content-type': 'application/json', Prefer: 'return=minimal' }, body: JSON.stringify(row) }); }
}

function cleanTurns(turns, prefill) {
  if (!Array.isArray(turns) || !turns.length || turns.length > 40) return null;
  const out = [];
  for (const t of turns) {
    if (!t || (t.role !== 'user' && t.role !== 'assistant') || typeof t.content !== 'string') return null;
    if (t.content.length > (t.role === 'assistant' ? 90000 : 30000)) return null;
    out.push({ role: t.role, content: t.content });
  }
  const last = out[out.length - 1];
  if (last.role === 'assistant') { if (!prefill) return null; last.content = last.content.replace(/\s+$/, ''); }
  return out;
}

module.exports = async (req, res) => {
  const origin = req.headers.origin || '';
  if (ORIGINS.includes(origin) || /^https:\/\/code-[a-z0-9-]+\.vercel\.app$/.test(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
  }
  res.setHeader('Access-Control-Allow-Headers', 'authorization, content-type');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  if (req.method === 'OPTIONS') { res.statusCode = 204; return res.end(); }
  if (req.method !== 'POST') return fail(res, 405, 'method');

  const token = (req.headers.authorization || '').replace(/^Bearer\s+/i, '');
  if (!token) return fail(res, 401, 'login');
  let user;
  try { user = await sbUser(token); } catch (_) { return fail(res, 502, 'network'); }
  if (!user) return fail(res, 401, 'login');

  if ((req.body || {}).mode === 'balance') {
    try { const b = await balance(token, user.id); res.statusCode = 200; res.setHeader('content-type', 'application/json'); res.setHeader('cache-control', 'no-store'); return res.end(JSON.stringify(b)); }
    catch (e) { const m = String(e.message || e); return fail(res, /usage_read_4\d\d/.test(m) ? 503 : 500, /usage_read_4\d\d/.test(m) ? 'setup' : 'usage', { detail: m }); }
  }

  const KEY = process.env.ANTHROPIC_API_KEY;
  if (!KEY) return fail(res, 503, 'not_configured');

  let al;
  const body0 = req.body || {}, task = ['tarot', 'chat', 'report', 'year', 'cont', 'tr'].includes(body0.task) ? body0.task : 'tarot';
  try { al = await allowance(token, user.id, task); } catch (e) { return fail(res, 500, 'usage', { detail: String(e.message || e) }); }
  if (!al.ok) return fail(res, al.code === 'daily_limit' ? 429 : al.code === 'need_plan' ? 403 : 402, al.code, { plan: al.plan });

  const body = req.body || {};
  const json = body.mode === 'json';
  /* photo recognition does not spend a request: it only needs one left for the reading itself, plus a daily cap */
  if (json) {
    const day = new Date(); day.setUTCHours(0, 0, 0, 0);
    let photos = 0; try { photos = await countUse(token, user.id, { since: day, kind: 'photo' }); } catch (_) {}
    if (photos >= PHOTO_DAY) return fail(res, 429, 'photo_limit');
    al = { ...al, source: 'photo', left: al.left + 1 };
  }
  let messages;
  if (json) {
    const imgs = Array.isArray(body.images) ? body.images.slice(0, 2) : [];
    if (typeof body.prompt !== 'string' || body.prompt.length > 20000) return fail(res, 400, 'bad_request');
    const content = imgs.filter(i => i && /^image\/(jpeg|png|webp|gif)$/.test(i.type) && typeof i.data === 'string')
      .map(i => ({ type: 'image', source: { type: 'base64', media_type: i.type, data: i.data } }));
    content.push({ type: 'text', text: body.prompt + '\n\nReturn ONLY valid JSON, no prose, no code fences.' });
    messages = [{ role: 'user', content }];
  } else if (task === 'tr') {
    /* the server writes the instruction itself, so this free task can only translate */
    const t = Array.isArray(body.turns) && body.turns.length ? body.turns[body.turns.length - 1] : null;
    const text = t && typeof t.content === 'string' ? t.content : '';
    const to = TR_LANGS[body.lang] || 'English';
    if (!text.trim() || text.length > 14000) return fail(res, 400, 'bad_request');
    messages = [{ role: 'user', content: `Translate the text below into ${to}. It is part of a personal Destiny Matrix reading (Natalia Ladini method; numbers are Major Arcana). Keep the Markdown structure exactly (headings, bold, lists, numbering), keep all numbers and position letters (A, B, C, D, E, A1, C2…) unchanged, use the standard ${to} names of the Tarot arcana, address the reader as “you”. Output ONLY the translation — no notes, no preface.

TEXT:
${text}` }];
  } else {
    messages = cleanTurns(body.turns, task === 'cont');
    if (!messages) return fail(res, 400, 'bad_request');
  }

  /* the knowledge base entries this request needs (chosen by the client, written by the server); cached between turns */
  let sys = '';
  if (!json && task !== 'tr') { try { sys = KB.build(body.kb); } catch (_) { sys = ''; } }

  const upstream = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'x-api-key': KEY, 'anthropic-version': '2023-06-01', 'content-type': 'application/json' },
    body: JSON.stringify(Object.assign({ model: MODEL, max_tokens: json ? 1200 : (task === 'report' || task === 'year' || task === 'cont') ? 16000 : task === 'tr' ? 8000 : task === 'chat' ? 5000 : 6000, messages, stream: !json }, sys ? { system: [{ type: 'text', text: sys, cache_control: { type: 'ephemeral' } }] } : {}))
  }).catch(() => null);
  if (!upstream) return fail(res, 502, 'network');
  if (!upstream.ok) {
    const t = await upstream.text().catch(() => '');
    const code = upstream.status === 429 || upstream.status === 529 ? 'rate_limited'
      : /too long|too large|exceed/i.test(t) ? 'prompt_too_large'
      : upstream.status === 401 || upstream.status === 403 ? 'not_configured'
      : /credit|balance|billing/i.test(t) ? 'no_credit' : 'upstream';
    let detail = ''; try { const j = JSON.parse(t); detail = `${upstream.status} ${j.error && j.error.type || ''}: ${(j.error && j.error.message || '').slice(0, 200)}`; } catch (_) { detail = `${upstream.status}`; }
    console.error('anthropic error', detail);
    return fail(res, upstream.status === 429 ? 429 : 502, code, { detail });
  }

  const kindLog = json ? 'photo' : task === 'tarot' ? (messages.length > 1 ? 'follow' : 'reading') : task;
  res.setHeader('X-Ai-Left', String(Math.max(0, al.left)));
  res.setHeader('X-Ai-Plan', al.plan);

  if (json) {
    const data = await upstream.json();
    const u = data.usage || {};
    await logUse(token, user.id, kindLog, al.source, (u.input_tokens || 0) + Math.round((u.cache_creation_input_tokens || 0) * 1.25 + (u.cache_read_input_tokens || 0) * 0.1), u.output_tokens).catch(() => {});
    const text = (data.content || []).filter(b => b.type === 'text').map(b => b.text).join('');
    res.setHeader('content-type', 'application/json');
    return res.end(JSON.stringify({ text, stop: data.stop_reason }));
  }

  res.statusCode = 200;
  res.setHeader('content-type', 'text/event-stream; charset=utf-8');
  res.setHeader('cache-control', 'no-cache, no-transform');
  const reader = upstream.body.getReader(), dec = new TextDecoder();
  let tin = 0, tout = 0, tcw = 0, tcr = 0, tail = '';
  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      const chunk = tail + dec.decode(value, { stream: true });
      for (const m of chunk.matchAll(/"input_tokens":(\d+)/g)) tin = Math.max(tin, +m[1]);
      for (const m of chunk.matchAll(/"output_tokens":(\d+)/g)) tout = Math.max(tout, +m[1]);
      for (const m of chunk.matchAll(/"cache_creation_input_tokens":(\d+)/g)) tcw = Math.max(tcw, +m[1]);
      for (const m of chunk.matchAll(/"cache_read_input_tokens":(\d+)/g)) tcr = Math.max(tcr, +m[1]);
      tail = chunk.slice(-60);
      try { res.write(Buffer.from(value)); } catch (_) {}
    }
  } catch (_) { /* client went away */ }
  /* cached knowledge base: writing costs 1.25×, reading 0.1× of normal input */
  await logUse(token, user.id, kindLog, al.source, tin + Math.round(tcw * 1.25 + tcr * 0.1), tout).catch(() => {});
  res.end();
};
