/* CODE · visit counter endpoint: classifies the traffic source and stores one anonymous row in `visits` (service key). */
const SB_URL = process.env.SUPABASE_URL || 'https://blwyzqxhzvjzhqkabesi.supabase.co';
const SERVICE = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const HS = () => (/^sb_secret_/.test(SERVICE) ? { apikey: SERVICE, 'content-type': 'application/json' } : { apikey: SERVICE, Authorization: `Bearer ${SERVICE}`, 'content-type': 'application/json' });
const cut = (v, n) => String(v == null ? '' : v).slice(0, n);
const HOSTS = [
  [/(^|\.)google\./, 'google'], [/(^|\.)bing\.com$/, 'bing'], [/(^|\.)duckduckgo\.com$/, 'duckduckgo'], [/(^|\.)yahoo\./, 'yahoo'], [/(^|\.)ecosia\.org$/, 'ecosia'],
  [/(^|\.)tiktok\.com$/, 'tiktok'], [/(^|\.)instagram\.com$/, 'instagram'], [/(^|\.)(facebook\.com|fb\.com|fb\.me)$/, 'facebook'], [/(^|\.)threads\.(net|com)$/, 'threads'],
  [/(^|\.)(t\.me|telegram\.org|telegram\.me)$/, 'telegram'], [/(^|\.)(youtube\.com|youtu\.be)$/, 'youtube'], [/(^|\.)pinterest\./, 'pinterest'],
  [/(^|\.)(twitter\.com|x\.com|t\.co)$/, 'x'], [/(^|\.)viber\.com$/, 'viber'], [/(^|\.)whatsapp\.(com|net)$/, 'whatsapp'], [/(^|\.)linkedin\.com$/, 'linkedin'],
  [/(^|\.)(chatgpt\.com|openai\.com|perplexity\.ai|claude\.ai|gemini\.google\.com)$/, 'ai'], [/(^|\.)mail\.google\.com$/, 'email'],
];
const ALIAS = { ig: 'instagram', insta: 'instagram', tt: 'tiktok', fb: 'facebook', tg: 'telegram', yt: 'youtube', twitter: 'x', gmail: 'email', newsletter: 'email', mail: 'email' };
const OWN = /(^|\.)(code-matrix\.space|code-matrix-test\.vercel\.app)$/;

module.exports = async (req, res) => {
  res.statusCode = 204; res.setHeader('cache-control', 'no-store');
  try {
    if (req.method !== 'POST' || !SERVICE) return res.end();
    const ua = String(req.headers['user-agent'] || '');
    if (/bot|crawl|spider|preview|lighthouse|headless|vercel/i.test(ua)) return res.end();
    let b = req.body || {}; if (typeof b === 'string') { try { b = JSON.parse(b); } catch (_) { b = {}; } }
    if (Buffer.isBuffer(b)) { try { b = JSON.parse(b.toString()); } catch (_) { b = {}; } }
    let refHost = ''; try { refHost = b.ref ? new URL(b.ref).host.replace(/^www\./, '').toLowerCase() : ''; } catch (_) {}
    if (OWN.test(refHost)) refHost = '';
    let src = cut(b.us, 40).toLowerCase().trim(), medium = cut(b.um, 40).toLowerCase().trim();
    src = ALIAS[src] || src;
    if (!src) {
      const h = HOSTS.find(([re]) => re.test(refHost));
      if (h) src = h[1];
      else if (refHost) src = 'ref:' + refHost;
      else if (b.tt || /musical_ly|bytedance|tiktok/i.test(ua)) src = 'tiktok';
      else if (/instagram/i.test(ua)) src = 'instagram';
      else if (b.fb || /FBAN|FBAV|FB_IAB/i.test(ua)) src = 'facebook';
      else if (/telegram/i.test(ua)) src = 'telegram';
      else if (b.gc) src = 'google';
      else src = 'direct';
    }
    if (!medium) medium = b.gc ? 'cpc' : /^(google|bing|duckduckgo|yahoo|ecosia)$/.test(src) && refHost ? 'organic' : src === 'direct' ? '' : refHost || /^(tiktok|instagram|facebook|telegram|threads|x|youtube|pinterest)$/.test(src) ? 'social' : '';
    const device = /ipad|tablet/i.test(ua) ? 'tablet' : /mobi|android|iphone/i.test(ua) ? 'mobile' : 'desktop';
    const row = { sid: cut(b.sid, 40), first: !!b.first, path: cut(b.path, 120) || '/', ref: refHost ? cut(refHost, 120) : null, src: cut(src, 80), medium: cut(medium, 40) || null,
      campaign: cut(b.uc, 80) || null, device, country: cut(req.headers['x-vercel-ip-country'], 4) || null, lang: cut(b.lang, 8) || null };
    await fetch(`${SB_URL}/rest/v1/visits`, { method: 'POST', headers: { ...HS(), Prefer: 'return=minimal' }, body: JSON.stringify(row) });
  } catch (_) {}
  res.end();
};
