/* CODE · emails: preview & test from the admin, welcome email after sign-up.
   Sending works once RESEND_API_KEY (and later EMAIL_FROM on your own domain) is set in Vercel. */
const { DEFAULTS, VARS, SAMPLE, render, forSupabase, merge, SUPPORT } = require('./_emails.js');
const SB_URL = process.env.SUPABASE_URL || 'https://blwyzqxhzvjzhqkabesi.supabase.co';
const SB_KEY = process.env.SUPABASE_ANON_KEY || 'sb_publishable_v2wRmfGkiVW7fF6wIkPZBg_fjeS3wBu';
const SERVICE = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const FROM = process.env.EMAIL_FROM || 'CODE <onboarding@resend.dev>';

const json = (res, code, obj) => { res.statusCode = code; res.setHeader('content-type', 'application/json'); res.setHeader('cache-control', 'no-store'); res.end(JSON.stringify(obj)); };
const H = t => ({ apikey: SB_KEY, Authorization: `Bearer ${t}`, 'content-type': 'application/json' });
/* new Supabase secret keys (sb_secret_…) go only in the apikey header; legacy service_role JWTs also as Bearer */
const HS = () => (/^sb_secret_/.test(SERVICE) ? { apikey: SERVICE, 'content-type': 'application/json' } : { apikey: SERVICE, Authorization: `Bearer ${SERVICE}`, 'content-type': 'application/json' });

async function user(token) { const r = await fetch(`${SB_URL}/auth/v1/user`, { headers: { apikey: SB_KEY, Authorization: `Bearer ${token}` } }); return r.ok ? r.json() : null; }
async function isAdmin(token) { const r = await fetch(`${SB_URL}/rest/v1/rpc/is_admin`, { method: 'POST', headers: H(token), body: '{}' }); return r.ok && (await r.json()) === true; }
async function templates(headers) {
  try { const r = await fetch(`${SB_URL}/rest/v1/admin_settings?select=value&key=eq.emails`, { headers }); const a = r.ok ? await r.json() : []; return merge(a[0] && Array.isArray(a[0].value) ? a[0].value : []); }
  catch (_) { return merge([]); }
}
async function sendMail(to, msg) {
  const KEY = process.env.RESEND_API_KEY; if (!KEY) { const e = new Error('not_configured'); e.code = 'not_configured'; throw e; }
  const r = await fetch('https://api.resend.com/emails', { method: 'POST', headers: { Authorization: `Bearer ${KEY}`, 'content-type': 'application/json' }, body: JSON.stringify({ from: FROM, to: [to], subject: msg.subject, html: msg.html, text: msg.text, reply_to: SUPPORT }) });
  const t = await r.text(); if (!r.ok) { const e = new Error(t.slice(0, 300)); e.code = 'send_failed'; throw e; }
  return JSON.parse(t || '{}');
}
async function logged(uid, kind, ref) {
  const r = await fetch(`${SB_URL}/rest/v1/email_log?select=id&user_id=eq.${uid}&kind=eq.${kind}&ref=eq.${encodeURIComponent(ref)}`, { headers: HS() }); return r.ok && (await r.json()).length > 0;
}
async function logSent(row) { await fetch(`${SB_URL}/rest/v1/email_log`, { method: 'POST', headers: { ...HS(), Prefer: 'return=minimal' }, body: JSON.stringify(row) }); }

module.exports = async (req, res) => {
  const b = req.body || {}, mode = (req.query && req.query.mode) || b.mode;
  try {
    if (mode === 'defaults') return json(res, 200, { templates: DEFAULTS, vars: VARS, sample: SAMPLE });
    if (req.method !== 'POST') return json(res, 405, { code: 'method' });
    if (mode === 'preview') { const t = b.tpl || DEFAULTS[0]; const r = render(t, b.vars); return json(res, 200, r); }
    if (mode === 'supabase') return json(res, 200, forSupabase(b.tpl || DEFAULTS[1]));

    const token = (req.headers.authorization || '').replace(/^Bearer\s+/i, '');
    if (!token) return json(res, 401, { code: 'login' });
    const u = await user(token); if (!u) return json(res, 401, { code: 'login' });

    if (mode === 'welcome') {
      if (!process.env.RESEND_API_KEY || !SERVICE) return json(res, 200, { skipped: 'not_configured' });
      if (Date.now() - new Date(u.created_at).getTime() > 3 * 864e5) return json(res, 200, { skipped: 'old_account' });
      if (await logged(u.id, 'welcome', 'once')) return json(res, 200, { skipped: 'already_sent' });
      const tpl = (await templates(HS())).find(t => t.id === 'welcome');
      if (!tpl || tpl.on === false) return json(res, 200, { skipped: 'off' });
      const name = (u.user_metadata && (u.user_metadata.given_name || u.user_metadata.name || u.user_metadata.full_name)) || 'друже';
      await sendMail(u.email, render(tpl, { name: String(name).split(' ')[0], email: u.email }));
      await logSent({ user_id: u.id, email: u.email, kind: 'welcome', ref: 'once' });
      return json(res, 200, { sent: true });
    }

    if (!(await isAdmin(token))) return json(res, 403, { code: 'admin_only' });
    if (mode === 'status') {
      let service_ok = null; if (SERVICE) { try { const r = await fetch(`${SB_URL}/rest/v1/email_log?select=id&limit=1`, { headers: HS() }); service_ok = r.status; } catch (_) { service_ok = 'network'; } }
      const kind = !SERVICE ? '' : /^sb_secret_/.test(SERVICE) ? 'secret' : /^sb_publishable_/.test(SERVICE) ? 'publishable' : /^eyJ/.test(SERVICE) ? 'jwt' : 'other';
      return json(res, 200, { resend: !!process.env.RESEND_API_KEY, from: FROM, own_domain: !/resend\.dev/.test(FROM), service: !!SERVICE && service_ok === 200, service_kind: kind, service_len: SERVICE.length, service_trim: SERVICE !== SERVICE.trim(), service_ok, cron: !!process.env.CRON_SECRET });
    }
    if (mode === 'domain') {
      const KEY = process.env.RESEND_API_KEY; if (!KEY) return json(res, 503, { code: 'not_configured' });
      const H2 = { Authorization: `Bearer ${KEY}`, 'content-type': 'application/json' };
      const l = await fetch('https://api.resend.com/domains', { headers: H2 }); const lt = await l.json().catch(() => ({}));
      if (!l.ok) return json(res, 200, { ok: false, status: l.status, detail: lt });
      const out = [];
      for (const d of (lt.data || [])) {
        if (b.verify && d.status !== 'verified') await fetch(`https://api.resend.com/domains/${d.id}/verify`, { method: 'POST', headers: H2 }).catch(() => {});
        const g = await fetch(`https://api.resend.com/domains/${d.id}`, { headers: H2 }); out.push(g.ok ? await g.json() : d);
      }
      return json(res, 200, { ok: true, domains: out });
    }
    if (mode === 'test') {
      const all = await templates(H(token)), tpl = b.tpl || all.find(t => t.id === b.id); if (!tpl) return json(res, 400, { code: 'no_template' });
      const to = String(b.to || u.email).trim(); if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(to)) return json(res, 400, { code: 'bad_email' });
      const msg = render(tpl, { name: 'Тест', email: to }); msg.subject = '[Тест] ' + msg.subject;
      const r = await sendMail(to, msg); return json(res, 200, { sent: true, id: r.id || null });
    }
    return json(res, 400, { code: 'bad_mode' });
  } catch (e) {
    return json(res, e.code === 'not_configured' ? 503 : 500, { code: e.code || 'error', detail: String(e.message || e).slice(0, 300) });
  }
};
module.exports.sendMail = sendMail;
