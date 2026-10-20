/* CODE · one-click unsubscribe from emails (link in every email + List-Unsubscribe header).
   GET shows a confirmation page (so link scanners in mail apps don't unsubscribe anyone by opening it); POST turns the emails off
   by setting profile.consent.<service|news> = false — the same switch as in the cabinet → «Особисті дані». */
const { unsubSig, SITE, SUPPORT } = require('./_emails.js');
const SB_URL = process.env.SUPABASE_URL || 'https://blwyzqxhzvjzhqkabesi.supabase.co';
const SERVICE = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const HS = () => (/^sb_secret_/.test(SERVICE) ? { apikey: SERVICE, 'content-type': 'application/json' } : { apikey: SERVICE, Authorization: `Bearer ${SERVICE}`, 'content-type': 'application/json' });
const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const page = (title, body) => `<!doctype html><html lang="uk"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>${esc(title)} · CODE</title>
<link rel="icon" href="/favicon.svg" type="image/svg+xml"><style>body{margin:0;min-height:100vh;display:grid;place-items:center;background:#05050C;color:#EEF0FF;font:16px/1.6 -apple-system,"Segoe UI",Roboto,sans-serif;padding:24px}
main{max-width:460px;text-align:center}.k{font:12px monospace;letter-spacing:.1em;opacity:.6;text-transform:uppercase}h1{font-weight:300;font-size:30px;margin:10px 0 12px}p{color:#A7AACB;margin:0 0 22px}
button,a.b{display:inline-block;height:50px;padding:0 28px;border:0;border-radius:999px;background:linear-gradient(120deg,#8C7DFF,#B47CFF);color:#fff;font:600 15px/50px inherit;cursor:pointer;text-decoration:none}a.l{color:#A7AACB}</style></head>
<body><main><p class="k">[ CODE ]</p>${body}</main></body></html>`;
const KIND = { service: { what: 'нагадування про підписку й оплату', done: 'Нагадувань про підписку більше не буде.' }, news: { what: 'новини й листи CODE', done: 'Листів із новинами CODE більше не буде.' } };

module.exports = async (req, res) => {
  const q = req.query || {};
  const u = String(q.u || ''), k = KIND[q.k] ? q.k : '', t = String(q.t || '');
  const send = (code, html) => { res.statusCode = code; res.setHeader('content-type', 'text/html; charset=utf-8'); res.setHeader('cache-control', 'no-store'); res.setHeader('x-robots-tag', 'noindex'); res.end(html); };
  if (!u || !k || t !== unsubSig(u, k)) return send(400, page('Посилання не дійсне', `<h1>Посилання не дійсне</h1><p>Можливо, воно скопійоване не повністю. Вимкнути листи можна в кабінеті → «Особисті дані» або написавши на ${esc(SUPPORT)}.</p><a class="b" href="${SITE}/kabinet">Відкрити кабінет</a>`));
  if (req.method !== 'POST') return send(200, page('Відписатися', `<h1>Відписатися?</h1><p>Ви більше не отримуватимете ${KIND[k].what}. Увімкнути знову можна будь-коли в кабінеті.</p><form method="post"><button type="submit">Відписатися</button></form><p style="margin-top:18px"><a class="l" href="${SITE}/">Повернутися на сайт</a></p>`));
  try {
    if (!SERVICE) throw new Error('not_configured');
    const r = await fetch(`${SB_URL}/rest/v1/user_data?select=profile&id=eq.${encodeURIComponent(u)}`, { headers: HS() });
    const row = r.ok ? (await r.json())[0] : null;
    const profile = Object.assign({}, (row && row.profile) || {});
    profile.consent = Object.assign({}, profile.consent || {}, { [k]: false, ts: new Date().toISOString() });
    const w = await fetch(`${SB_URL}/rest/v1/user_data?id=eq.${encodeURIComponent(u)}`, { method: 'PATCH', headers: { ...HS(), Prefer: 'return=minimal' }, body: JSON.stringify({ profile }) });
    if (!w.ok) throw new Error('db ' + w.status);
    return send(200, page('Ви відписалися', `<h1>Готово</h1><p>${KIND[k].done} Повернути листи можна в кабінеті → «Особисті дані».</p><a class="b" href="${SITE}/">На сайт CODE</a>`));
  } catch (e) {
    return send(500, page('Не вдалося', `<h1>Не вдалося відписатися</h1><p>Спробуйте ще раз за хвилину або напишіть на ${esc(SUPPORT)} — ми вимкнемо листи вручну.</p>`));
  }
};
