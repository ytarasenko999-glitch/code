/* CODE · daily email job (Vercel Cron, 10:00 Kyiv):
   - 3 days before a paid plan ends → «закінчується» (two versions: auto-renew on / off)
   - the day after it ended without renewal → «підписка закінчилася»
   Each email goes once per subscription period (email_log). Needs SUPABASE_SERVICE_ROLE_KEY and RESEND_API_KEY. */
const { render, merge, unsubLink } = require('./_emails.js');
const { sendMail } = require('./email.js');
const SB_URL = process.env.SUPABASE_URL || 'https://blwyzqxhzvjzhqkabesi.supabase.co';
const SERVICE = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const SITE = process.env.SITE_URL || 'https://code-matrix.space';
const PRICE = { plus: { m: 199, y: 1790 }, pro: { m: 549, y: 4990 } };
/* new Supabase secret keys (sb_secret_…) go only in the apikey header; legacy service_role JWTs also as Bearer */
const HS = () => (/^sb_secret_/.test(SERVICE) ? { apikey: SERVICE, 'content-type': 'application/json' } : { apikey: SERVICE, Authorization: `Bearer ${SERVICE}`, 'content-type': 'application/json' });
const get = async path => { const r = await fetch(`${SB_URL}/rest/v1/${path}`, { headers: HS() }); if (!r.ok) throw new Error(path.split('?')[0] + ' ' + r.status); return r.json(); };
const fmt = d => new Date(d).toLocaleDateString('uk-UA', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Europe/Kyiv' });

module.exports = async (req, res) => {
  const out = { checked: 0, sent: [], skipped: [], errors: [] };
  const done = code => { res.statusCode = code; res.setHeader('content-type', 'application/json'); res.end(JSON.stringify(out)); };
  if (process.env.CRON_SECRET && req.headers.authorization !== `Bearer ${process.env.CRON_SECRET}`) { out.errors.push('unauthorized'); return done(401); }
  if (!SERVICE || !process.env.RESEND_API_KEY) { out.errors.push('not_configured: потрібні SUPABASE_SERVICE_ROLE_KEY і RESEND_API_KEY'); return done(200); }
  try {
    const tpls = merge(((await get('admin_settings?select=value&key=eq.emails'))[0] || {}).value || []);
    const T = id => tpls.find(t => t.id === id && t.on !== false);
    const now = Date.now(), day = 864e5;
    const subs = await get(`subscriptions?select=*&plan=in.(plus,pro)&paid_until=gte.${new Date(now - 2 * day).toISOString()}&paid_until=lte.${new Date(now + 4 * day).toISOString()}`);
    out.checked = subs.length;
    for (const s of subs) {
      const left = (new Date(s.paid_until) - now) / day, ref = String(s.paid_until).slice(0, 10);
      let kind = null;
      if (left > 2 && left <= 3.5) kind = s.auto_renew ? 'expiring_auto' : 'expiring_manual';
      else if (left <= 0 && left > -2) kind = 'expired';
      if (!kind) continue;
      const tpl = T(kind); if (!tpl) { out.skipped.push(`${s.user_id}:${kind}:off`); continue; }
      const seen = await get(`email_log?select=id&user_id=eq.${s.user_id}&kind=eq.${kind}&ref=eq.${ref}`); if (seen.length) { out.skipped.push(`${s.user_id}:${kind}:sent`); continue; }
      const ud = (await get(`user_data?select=email,profile&id=eq.${s.user_id}`))[0] || {};
      const to = s.email || ud.email; if (!to) { out.skipped.push(`${s.user_id}:no_email`); continue; }
      if (ud.profile && ud.profile.consent && ud.profile.consent.service === false) { out.skipped.push(`${s.user_id}:${kind}:optout`); continue; }
      const vars = { name: (ud.profile && ud.profile.name) || 'друже', email: to, plan: s.plan === 'pro' ? 'Pro' : 'Plus', period: s.period === 'y' ? 'рік' : 'місяць', amount: String((PRICE[s.plan] || {})[s.period === 'y' ? 'y' : 'm'] || ''), paid_until: fmt(s.paid_until), days_left: String(Math.max(1, Math.ceil(left))), cabinet_url: SITE + '/?go=acct', plans_url: SITE + '/?go=acct', site_url: SITE };
      try {
        await sendMail(to, render(tpl, { ...vars, unsub_url: unsubLink(s.user_id, 'service'), unsub_kind: 'service' }));
        await fetch(`${SB_URL}/rest/v1/email_log`, { method: 'POST', headers: { ...HS(), Prefer: 'return=minimal' }, body: JSON.stringify({ user_id: s.user_id, email: to, kind, ref }) });
        out.sent.push(`${to}:${kind}`);
      } catch (e) { out.errors.push(`${to}:${kind}:${String(e.message || e).slice(0, 120)}`); }
    }
  } catch (e) { out.errors.push(String(e.message || e)); }
  done(200);
};
