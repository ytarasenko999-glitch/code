/* CODE · AI tarot reader (Vercel serverless function)
   - requires a signed-in CODE account (Supabase session token)
   - per-user daily limit, counted in the ai_usage table (RLS: each user sees/inserts only own rows)
   - the Anthropic key lives only in the ANTHROPIC_API_KEY environment variable */

const SB_URL = process.env.SUPABASE_URL || 'https://blwyzqxhzvjzhqkabesi.supabase.co';
const SB_KEY = process.env.SUPABASE_ANON_KEY || 'sb_publishable_v2wRmfGkiVW7fF6wIkPZBg_fjeS3wBu';
const MODEL = process.env.AI_MODEL || 'claude-sonnet-5-5';
const DAILY_CAP = parseInt(process.env.AI_DAILY_CAP || '60', 10);   // safety cap per user per day, any plan
const QUOTA = { plus: parseInt(process.env.AI_PLUS || '100', 10), pro: parseInt(process.env.AI_PRO || '300', 10) }; // per 30 days
const FREE_START = parseInt(process.env.AI_FREE_START || '3', 10), FREE_WEEK = parseInt(process.env.AI_FREE_WEEK || '1', 10);
const ORIGINS = (process.env.ALLOWED_ORIGINS || 'https://code-matrix-test.vercel.app').split(',').map(s => s.trim());

const fail = (res, status, code, extra) => { res.statusCode = status; res.setHeader('content-type', 'application/json'); res.end(JSON.stringify({ code, ...(extra || {}) })); };

async function sbUser(token) {
  const r = await fetch(`${SB_URL}/auth/v1/user`, { headers: { apikey: SB_KEY, Authorization: `Bearer ${token}` } });
  if (!r.ok) return null;
  const u = await r.json();
  return u && u.id ? u : null;
}
const H = token => ({ apikey: SB_KEY, Authorization: `Bearer ${token}` });
async function countUse(token, uid, { since, source } = {}) {
  let q = `${SB_URL}/rest/v1/ai_usage?select=id&user_id=eq.${uid}`;
  if (since) q += `&created_at=gte.${encodeURIComponent(since.toISOString())}`;
  if (source) q += `&source=eq.${source}`;
  const r = await fetch(q, { headers: { ...H(token), Prefer: 'count=exact', Range: '0-0' } });
  if (!r.ok) throw new Error('usage_read_' + r.status);
  const cr = r.headers.get('content-range') || '';
  return parseInt(cr.split('/')[1] || '0', 10) || 0;
}
async function getSub(token, uid) {
  const r = await fetch(`${SB_URL}/rest/v1/subscriptions?select=plan,paid_until,packs&user_id=eq.${uid}`, { headers: H(token) });
  if (!r.ok) return null;
  const a = await r.json(); return a && a[0] ? a[0] : null;
}
/* decides which allowance pays for this request: plan → free → pack */
async function allowance(token, uid) {
  const day = new Date(); day.setUTCHours(0, 0, 0, 0);
  if (await countUse(token, uid, { since: day }) >= DAILY_CAP) return { ok: false, code: 'daily_limit' };
  const sub = (await getSub(token, uid)) || { plan: 'free', packs: 0 };
  const paid = (sub.plan === 'plus' || sub.plan === 'pro') && sub.paid_until && new Date(sub.paid_until) > new Date();
  if (paid) {
    const used = await countUse(token, uid, { since: new Date(Date.now() - 30 * 864e5), source: 'plan' });
    if (used < QUOTA[sub.plan]) return { ok: true, source: 'plan', left: QUOTA[sub.plan] - used - 1, plan: sub.plan };
  } else {
    const all = await countUse(token, uid, { source: 'free' });
    if (all < FREE_START) return { ok: true, source: 'free', left: FREE_START - all - 1, plan: 'free' };
    const week = await countUse(token, uid, { since: new Date(Date.now() - 7 * 864e5), source: 'free' });
    if (week < FREE_WEEK) return { ok: true, source: 'free', left: 0, plan: 'free' };
  }
  const packs = sub.packs || 0;
  if (packs > 0) { const usedP = await countUse(token, uid, { source: 'pack' }); if (usedP < packs) return { ok: true, source: 'pack', left: packs - usedP - 1, plan: sub.plan || 'free' }; }
  return { ok: false, code: paid ? 'plan_quota' : 'free_quota', plan: paid ? sub.plan : 'free' };
}
async function logUse(token, uid, kind, source) {
  await fetch(`${SB_URL}/rest/v1/ai_usage`, { method: 'POST', headers: { ...H(token), 'content-type': 'application/json', Prefer: 'return=minimal' }, body: JSON.stringify({ user_id: uid, kind, source }) });
}

function cleanTurns(turns) {
  if (!Array.isArray(turns) || !turns.length || turns.length > 40) return null;
  const out = [];
  for (const t of turns) {
    if (!t || (t.role !== 'user' && t.role !== 'assistant') || typeof t.content !== 'string') return null;
    if (t.content.length > 30000) return null;
    out.push({ role: t.role, content: t.content });
  }
  return out[out.length - 1].role === 'user' ? out : null;
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

  const KEY = process.env.ANTHROPIC_API_KEY;
  if (!KEY) return fail(res, 503, 'not_configured');

  const token = (req.headers.authorization || '').replace(/^Bearer\s+/i, '');
  if (!token) return fail(res, 401, 'login');
  let user;
  try { user = await sbUser(token); } catch (_) { return fail(res, 502, 'network'); }
  if (!user) return fail(res, 401, 'login');

  let al;
  try { al = await allowance(token, user.id); } catch (e) { return fail(res, 500, 'usage', { detail: String(e.message || e) }); }
  if (!al.ok) return fail(res, al.code === 'daily_limit' ? 429 : 402, al.code, { plan: al.plan });

  const body = req.body || {};
  const json = body.mode === 'json';
  let messages;
  if (json) {
    const imgs = Array.isArray(body.images) ? body.images.slice(0, 2) : [];
    if (typeof body.prompt !== 'string' || body.prompt.length > 20000) return fail(res, 400, 'bad_request');
    const content = imgs.filter(i => i && /^image\/(jpeg|png|webp|gif)$/.test(i.type) && typeof i.data === 'string')
      .map(i => ({ type: 'image', source: { type: 'base64', media_type: i.type, data: i.data } }));
    content.push({ type: 'text', text: body.prompt + '\n\nReturn ONLY valid JSON, no prose, no code fences.' });
    messages = [{ role: 'user', content }];
  } else {
    messages = cleanTurns(body.turns);
    if (!messages) return fail(res, 400, 'bad_request');
  }

  const upstream = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'x-api-key': KEY, 'anthropic-version': '2023-06-01', 'content-type': 'application/json' },
    body: JSON.stringify({ model: MODEL, max_tokens: json ? 1200 : 2400, messages, stream: !json })
  }).catch(() => null);
  if (!upstream) return fail(res, 502, 'network');
  if (!upstream.ok) {
    const t = await upstream.text().catch(() => '');
    const code = upstream.status === 429 || upstream.status === 529 ? 'rate_limited'
      : /too long|too large|exceed/i.test(t) ? 'prompt_too_large'
      : upstream.status === 401 || upstream.status === 403 ? 'not_configured'
      : /credit|balance|billing/i.test(t) ? 'no_credit' : 'upstream';
    return fail(res, upstream.status === 429 ? 429 : 502, code);
  }

  await logUse(token, user.id, json ? 'photo' : (messages.length > 1 ? 'follow' : 'reading'), al.source).catch(() => {});
  res.setHeader('X-Ai-Left', String(Math.max(0, al.left)));
  res.setHeader('X-Ai-Plan', al.plan);

  if (json) {
    const data = await upstream.json();
    const text = (data.content || []).filter(b => b.type === 'text').map(b => b.text).join('');
    res.setHeader('content-type', 'application/json');
    return res.end(JSON.stringify({ text, stop: data.stop_reason }));
  }

  res.statusCode = 200;
  res.setHeader('content-type', 'text/event-stream; charset=utf-8');
  res.setHeader('cache-control', 'no-cache, no-transform');
  const reader = upstream.body.getReader();
  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      res.write(Buffer.from(value));
    }
  } catch (_) { /* client went away */ }
  res.end();
};
