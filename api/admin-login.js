/* CODE · records every admin-panel sign-in (who, when, device, browser, IP, country) for the «Налаштування» section */
const SB_URL = process.env.SUPABASE_URL || 'https://blwyzqxhzvjzhqkabesi.supabase.co';
const SB_KEY = process.env.SUPABASE_ANON_KEY || 'sb_publishable_v2wRmfGkiVW7fF6wIkPZBg_fjeS3wBu';
const SERVICE = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const HS = () => (/^sb_secret_/.test(SERVICE) ? { apikey: SERVICE, 'content-type': 'application/json' } : { apikey: SERVICE, Authorization: `Bearer ${SERVICE}`, 'content-type': 'application/json' });
const cut = (v, n) => String(v == null ? '' : v).slice(0, n);
function parseUA(ua) {
  const os = /Windows NT 10/.test(ua) ? 'Windows 10/11' : /Windows/.test(ua) ? 'Windows' : /iPhone/.test(ua) ? 'iPhone (iOS)' : /iPad/.test(ua) ? 'iPad' : /Android/.test(ua) ? 'Android' : /Mac OS X/.test(ua) ? 'macOS' : /Linux/.test(ua) ? 'Linux' : 'інша ОС';
  const browser = /Edg\//.test(ua) ? 'Edge' : /OPR\/|Opera/.test(ua) ? 'Opera' : /YaBrowser/.test(ua) ? 'Yandex' : /SamsungBrowser/.test(ua) ? 'Samsung Internet' : /Firefox\//.test(ua) ? 'Firefox' : /CriOS|Chrome\//.test(ua) ? 'Chrome' : /Safari\//.test(ua) ? 'Safari' : 'інший браузер';
  const device = /iPad|Tablet/.test(ua) ? 'tablet' : /Mobi|iPhone|Android/.test(ua) ? 'mobile' : 'desktop';
  return { os, browser, device };
}
module.exports = async (req, res) => {
  const done = (c, o) => { res.statusCode = c; res.setHeader('content-type', 'application/json'); res.setHeader('cache-control', 'no-store'); res.end(JSON.stringify(o || {})); };
  try {
    if (req.method !== 'POST') return done(405, { code: 'method' });
    const token = (req.headers.authorization || '').replace(/^Bearer\s+/i, '');
    if (!token || !SERVICE) return done(200, { skipped: true });
    const H = { apikey: SB_KEY, Authorization: `Bearer ${token}`, 'content-type': 'application/json' };
    const u = await fetch(`${SB_URL}/auth/v1/user`, { headers: H }).then(r => r.ok ? r.json() : null);
    if (!u || !u.email) return done(401, { code: 'login' });
    const ok = await fetch(`${SB_URL}/rest/v1/rpc/is_admin`, { method: 'POST', headers: H, body: '{}' }).then(r => r.ok ? r.json() : false);
    if (ok !== true) return done(403, { code: 'admin_only' });
    let b = req.body || {}; if (typeof b === 'string') { try { b = JSON.parse(b); } catch (_) { b = {}; } }
    const ua = cut(req.headers['user-agent'], 400), p = parseUA(ua);
    const ip = cut(String(req.headers['x-forwarded-for'] || '').split(',')[0].trim() || req.headers['x-real-ip'], 60);
    const city = (() => { try { return decodeURIComponent(req.headers['x-vercel-ip-city'] || ''); } catch (_) { return ''; } })();
    const row = { email: cut(u.email, 120), user_id: u.id, ip, country: cut(req.headers['x-vercel-ip-country'], 4) || null, city: cut(city, 60) || null,
      device: p.device, os: p.os, browser: p.browser, ua, method: cut(b.method, 20) || null, screen: cut(b.screen, 20) || null, host: cut(req.headers.host, 60) };
    row.created_at = new Date().toISOString(); delete row.ua;
    /* kept as the last 300 entries in admin_settings (key «logins») — readable only by admins */
    const cur = await fetch(`${SB_URL}/rest/v1/admin_settings?select=value&key=eq.logins`, { headers: HS() }).then(r => r.ok ? r.json() : []).catch(() => []);
    const list = [row, ...((cur[0] && Array.isArray(cur[0].value)) ? cur[0].value : [])].slice(0, 300);
    await fetch(`${SB_URL}/rest/v1/admin_settings`, { method: 'POST', headers: { ...HS(), Prefer: 'resolution=merge-duplicates,return=minimal' }, body: JSON.stringify({ key: 'logins', value: list, updated_at: row.created_at }) });
    return done(200, { ok: true });
  } catch (e) { return done(200, { ok: false }); }
};
