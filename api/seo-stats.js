/* CODE · Google Search Console data for «SEO» in the admin panel (admins only).
   Needs a Google service account with access to the site's Search Console property, set in Vercel → Environment Variables:
     GSC_CLIENT_EMAIL  — the service account email (…@….iam.gserviceaccount.com)
     GSC_PRIVATE_KEY   — its private key (the "private_key" value from the JSON key file)
     GSC_SITE          — optional: the property, e.g. sc-domain:code-matrix.space (found automatically otherwise)
   POST { mode: 'status' | 'perf' | 'inspect' | 'sitemaps' | 'submit', days?, urls? } with the admin's Supabase token. */
const crypto = require('crypto');
const SB_URL = process.env.SUPABASE_URL || 'https://blwyzqxhzvjzhqkabesi.supabase.co';
const SB_KEY = process.env.SUPABASE_ANON_KEY || 'sb_publishable_v2wRmfGkiVW7fF6wIkPZBg_fjeS3wBu';
const ORIGIN = 'https://code-matrix.space';
const WM = 'https://www.googleapis.com/webmasters/v3';

const b64u = b => Buffer.from(b).toString('base64').replace(/=+$/, '').replace(/\+/g, '-').replace(/\//g, '_');
function creds() {
  let email = process.env.GSC_CLIENT_EMAIL || '', key = process.env.GSC_PRIVATE_KEY || '';
  if ((!email || !key) && process.env.GSC_SA_JSON) { try { const j = JSON.parse(process.env.GSC_SA_JSON); email = email || j.client_email; key = key || j.private_key; } catch (_) {} }
  key = key.replace(/\\n/g, '\n').replace(/^"|"$/g, '').trim();
  return email && /BEGIN [A-Z ]*PRIVATE KEY/.test(key) ? { email: email.trim(), key } : null;
}
let TOK = null;
async function token(c) {
  if (TOK && TOK.exp > Date.now() + 60000) return TOK.t;
  const now = Math.floor(Date.now() / 1000);
  const unsigned = b64u(JSON.stringify({ alg: 'RS256', typ: 'JWT' })) + '.' + b64u(JSON.stringify({ iss: c.email, scope: 'https://www.googleapis.com/auth/webmasters', aud: 'https://oauth2.googleapis.com/token', iat: now, exp: now + 3600 }));
  const sig = crypto.createSign('RSA-SHA256').update(unsigned).sign(c.key);
  const r = await fetch('https://oauth2.googleapis.com/token', { method: 'POST', headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer', assertion: unsigned + '.' + b64u(sig) }) });
  const j = await r.json().catch(() => ({}));
  if (!r.ok || !j.access_token) { const e = new Error(j.error_description || j.error || ('token ' + r.status)); e.code = 'google_auth'; throw e; }
  TOK = { t: j.access_token, exp: Date.now() + (j.expires_in || 3600) * 1000 };
  return TOK.t;
}
async function g(t, url, body, method) {
  const r = await fetch(url, { method: method || (body ? 'POST' : 'GET'), headers: { Authorization: 'Bearer ' + t, 'content-type': 'application/json' }, body: body ? JSON.stringify(body) : undefined });
  const j = await r.json().catch(() => ({}));
  if (!r.ok) { const e = new Error((j.error && j.error.message) || ('google ' + r.status)); e.status = r.status; throw e; }
  return j;
}
/* the Search Console property for code-matrix.space the service account can see */
let SITE = null;
async function site(t) {
  if (process.env.GSC_SITE) return process.env.GSC_SITE.trim();
  if (SITE) return SITE;
  const j = await g(t, WM + '/sites');
  const list = (j.siteEntry || []).filter(s => /code-matrix\.space/.test(s.siteUrl) && s.permissionLevel !== 'siteUnverifiedUser');
  const pick = list.find(s => s.siteUrl.startsWith('sc-domain:')) || list[0];
  if (!pick) { const e = new Error('no_property'); e.code = 'no_property'; e.sites = (j.siteEntry || []).map(s => s.siteUrl); throw e; }
  SITE = pick.siteUrl;
  return SITE;
}
const day = d => new Date(d).toISOString().slice(0, 10);

module.exports = async (req, res) => {
  const done = (c, o) => { res.statusCode = c; res.setHeader('content-type', 'application/json'); res.setHeader('cache-control', 'no-store'); res.end(JSON.stringify(o || {})); };
  try {
    if (req.method !== 'POST') return done(405, { code: 'method' });
    const tk = (req.headers.authorization || '').replace(/^Bearer\s+/i, '');
    if (!tk) return done(401, { code: 'login' });
    const H = { apikey: SB_KEY, Authorization: `Bearer ${tk}`, 'content-type': 'application/json' };
    const ok = await fetch(`${SB_URL}/rest/v1/rpc/is_admin`, { method: 'POST', headers: H, body: '{}' }).then(r => r.ok ? r.json() : false).catch(() => false);
    if (ok !== true) return done(403, { code: 'admin_only' });
    let b = req.body || {}; if (typeof b === 'string') { try { b = JSON.parse(b); } catch (_) { b = {}; } }

    const c = creds();
    if (!c) return done(200, { configured: false });
    const t = await token(c);
    const s = await site(t);
    const enc = encodeURIComponent(s);

    if (b.mode === 'status') return done(200, { configured: true, site: s, account: c.email });

    if (b.mode === 'sitemaps') {
      const j = await g(t, `${WM}/sites/${enc}/sitemaps`);
      return done(200, { configured: true, site: s, sitemaps: j.sitemap || [] });
    }
    if (b.mode === 'submit') {
      await g(t, `${WM}/sites/${enc}/sitemaps/${encodeURIComponent(ORIGIN + '/sitemap.xml')}`, null, 'PUT');
      return done(200, { configured: true, ok: true });
    }
    if (b.mode === 'inspect') {
      const urls = (Array.isArray(b.urls) ? b.urls : []).filter(u => typeof u === 'string' && u.startsWith(ORIGIN)).slice(0, 30);
      const out = [];
      for (let i = 0; i < urls.length; i += 5) {
        const part = await Promise.all(urls.slice(i, i + 5).map(u => g(t, 'https://searchconsole.googleapis.com/v1/urlInspection/index:inspect', { inspectionUrl: u, siteUrl: s, languageCode: 'uk' })
          .then(j => { const r = (j.inspectionResult || {}).indexStatusResult || {}; const m = (j.inspectionResult || {}).mobileUsabilityResult || {};
            return { url: u, verdict: r.verdict, coverage: r.coverageState, indexing: r.indexingState, robots: r.robotsTxtState, fetch: r.pageFetchState, lastCrawl: r.lastCrawlTime, googleCanonical: r.googleCanonical, userCanonical: r.userCanonical, crawledAs: r.crawledAs, mobile: m.verdict, link: (j.inspectionResult || {}).inspectionResultLink }; })
          .catch(e => ({ url: u, error: e.message }))));
        out.push(...part);
      }
      return done(200, { configured: true, site: s, results: out });
    }

    /* performance: Google's numbers lag ~2 days, so the window ends two days ago */
    const days = [7, 28, 90].includes(+b.days) ? +b.days : 28;
    const end = Date.now() - 2 * 864e5, start = end - (days - 1) * 864e5, pEnd = start - 864e5, pStart = pEnd - (days - 1) * 864e5;
    const q = (dims, extra, a, z) => g(t, `${WM}/sites/${enc}/searchAnalytics/query`, Object.assign({ startDate: day(a || start), endDate: day(z || end), dimensions: dims, rowLimit: 250, dataState: 'all' }, extra || {})).then(j => j.rows || []).catch(() => []);
    const [tot, prev, byDate, byPage, byQuery, byCountry, byDevice, pageQuery] = await Promise.all([
      q([]), q([], null, pStart, pEnd), q(['date']), q(['page']), q(['query'], { rowLimit: 100 }), q(['country'], { rowLimit: 15 }), q(['device']), q(['page', 'query'], { rowLimit: 500 })
    ]);
    const pack = r => ({ k: r.keys ? r.keys.join(' | ') : '', clicks: r.clicks || 0, impr: r.impressions || 0, ctr: r.ctr || 0, pos: r.position || 0 });
    return done(200, { configured: true, site: s, days, from: day(start), to: day(end),
      total: tot[0] ? pack(tot[0]) : pack({}), prev: prev[0] ? pack(prev[0]) : pack({}),
      byDate: byDate.map(pack), byPage: byPage.map(pack), byQuery: byQuery.map(pack), byCountry: byCountry.map(pack), byDevice: byDevice.map(pack),
      pageQuery: pageQuery.map(r => ({ page: r.keys[0], query: r.keys[1], clicks: r.clicks, impr: r.impressions, pos: r.position })) });
  } catch (e) {
    return done(200, { configured: true, error: e.message, code: e.code || (e.status === 403 ? 'forbidden' : 'error'), sites: e.sites });
  }
};
