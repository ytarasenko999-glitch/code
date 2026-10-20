/* CODE · real Claude API spend for «Баланс ШІ» in the admin panel (admins only), from Anthropic's Cost API.
   Needs an Admin API key (sk-ant-admin…, Claude Console → Settings → Admin keys; organizations only) in Vercel as ANTHROPIC_ADMIN_KEY.
   Anthropic doesn't expose the credit balance or top-ups through an API — those stay manual; this gives the exact spend per day.
   POST { from: 'YYYY-MM-DD' } with the admin's Supabase token → { configured, days: { 'YYYY-MM-DD': usd }, total } */
const SB_URL = process.env.SUPABASE_URL || 'https://blwyzqxhzvjzhqkabesi.supabase.co';
const SB_KEY = process.env.SUPABASE_ANON_KEY || 'sb_publishable_v2wRmfGkiVW7fF6wIkPZBg_fjeS3wBu';

module.exports = async (req, res) => {
  const done = (c, o) => { res.statusCode = c; res.setHeader('content-type', 'application/json'); res.setHeader('cache-control', 'no-store'); res.end(JSON.stringify(o || {})); };
  try {
    if (req.method !== 'POST') return done(405, { code: 'method' });
    const tk = (req.headers.authorization || '').replace(/^Bearer\s+/i, '');
    if (!tk) return done(401, { code: 'login' });
    const ok = await fetch(`${SB_URL}/rest/v1/rpc/is_admin`, { method: 'POST', headers: { apikey: SB_KEY, Authorization: `Bearer ${tk}`, 'content-type': 'application/json' }, body: '{}' }).then(r => r.ok ? r.json() : false).catch(() => false);
    if (ok !== true) return done(403, { code: 'admin_only' });
    const key = String(process.env.ANTHROPIC_ADMIN_KEY || '').trim().replace(/^['"]|['"]$/g, '');
    if (!key) return done(200, { configured: false });
    if (!/^sk-ant-admin/.test(key)) return done(200, { configured: false, wrongKey: true });

    let b = req.body || {}; if (typeof b === 'string') { try { b = JSON.parse(b); } catch (_) { b = {}; } }
    const minFrom = Date.now() - 400 * 864e5;
    let from = /^\d{4}-\d{2}-\d{2}$/.test(b.from || '') ? Date.parse(b.from + 'T00:00:00Z') : Date.now() - 30 * 864e5;
    if (!(from > minFrom)) from = minFrom;
    const days = {}; let page = null, n = 0;
    do {
      const q = new URLSearchParams({ starting_at: new Date(from).toISOString().slice(0, 10) + 'T00:00:00Z', bucket_width: '1d', limit: '31' });
      if (page) q.set('page', page);
      const r = await fetch('https://api.anthropic.com/v1/organizations/cost_report?' + q, { headers: { 'x-api-key': key, 'anthropic-version': '2023-06-01' } });
      const j = await r.json().catch(() => ({}));
      if (!r.ok) return done(200, { configured: true, error: (j.error && j.error.message) || ('HTTP ' + r.status), status: r.status });
      (j.data || []).forEach(bk => {
        const d = String(bk.starting_at || '').slice(0, 10);
        /* amounts are decimal strings in cents (USD) */
        const usd = (bk.results || []).reduce((a, x) => a + (String(x.currency || 'USD') === 'USD' ? (parseFloat(x.amount) || 0) / 100 : 0), 0);
        if (d) days[d] = Math.round(((days[d] || 0) + usd) * 10000) / 10000;
      });
      page = j.has_more ? j.next_page : null;
    } while (page && ++n < 20);
    const total = Object.values(days).reduce((a, v) => a + v, 0);
    return done(200, { configured: true, days, total: Math.round(total * 10000) / 10000, at: new Date().toISOString() });
  } catch (e) {
    return done(200, { configured: true, error: e.message });
  }
};
