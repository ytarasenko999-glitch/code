/* CODE · public blog, rendered on the server so search engines get full HTML
   /blog            → list of published posts
   /blog/<slug>     → one post
   /sitemap.xml     → home + blog for search engines */
const { md, esc, plain } = require('./_md.js');
const SB_URL = process.env.SUPABASE_URL || 'https://blwyzqxhzvjzhqkabesi.supabase.co';
const SB_KEY = process.env.SUPABASE_ANON_KEY || 'sb_publishable_v2wRmfGkiVW7fF6wIkPZBg_fjeS3wBu';
const FIELDS = 'slug,h1,h2,title,description,cover,cover_alt,body,published_at,updated_at';

async function posts(q) {
  const r = await fetch(`${SB_URL}/rest/v1/posts?select=${FIELDS}&status=eq.published${q || ''}&order=published_at.desc`, { headers: { apikey: SB_KEY, Authorization: `Bearer ${SB_KEY}` } });
  if (!r.ok) throw new Error('db ' + r.status);
  return r.json();
}
const fmtDate = d => d ? new Date(d).toLocaleDateString('uk-UA', { day: 'numeric', month: 'long', year: 'numeric' }) : '';
const readMin = body => Math.max(2, Math.round(plain(body).split(' ').length / 180));
const abs = (base, u) => !u ? '' : /^https?:/i.test(u) ? u : base + (u.startsWith('/') ? u : '/' + u);

const CSS = `
:root{--bg:#ECEFFA;--fg:#14162B;--muted:#6A6F8C;--hair:rgba(52,62,140,.10);--surface:rgba(255,255,255,.66);--surface-2:rgba(92,104,190,.075);--accent:#4F5BF2;--accent-2:#8A5CF6;--accent-3:#2BBBE6;--accent-soft:rgba(79,91,242,.09);--line:rgba(70,80,170,.20);--glow:rgba(110,118,255,.30);
--font:"Manrope",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;--font-display:"Archivo","Manrope",-apple-system,sans-serif;--font-mono:"JetBrains Mono",ui-monospace,Menlo,monospace}
@media (prefers-color-scheme:dark){:root:not([data-theme="light"]){--bg:#05050C;--fg:#EEF0FF;--muted:#9295B4;--hair:rgba(176,166,255,.11);--surface:rgba(16,15,32,.62);--surface-2:rgba(150,138,255,.075);--accent:#8C7DFF;--accent-2:#B47CFF;--accent-3:#4FD3F0;--accent-soft:rgba(140,125,255,.13);--line:rgba(176,166,255,.22);--glow:rgba(124,92,255,.42);color-scheme:dark}}
:root[data-theme="dark"]{--bg:#05050C;--fg:#EEF0FF;--muted:#9295B4;--hair:rgba(176,166,255,.11);--surface:rgba(16,15,32,.62);--surface-2:rgba(150,138,255,.075);--accent:#8C7DFF;--accent-2:#B47CFF;--accent-3:#4FD3F0;--accent-soft:rgba(140,125,255,.13);--line:rgba(176,166,255,.22);--glow:rgba(124,92,255,.42);color-scheme:dark}
*{box-sizing:border-box}html{-webkit-text-size-adjust:100%}
body{margin:0;background:var(--bg);color:var(--fg);font-family:var(--font);font-size:17px;line-height:1.7;-webkit-font-smoothing:antialiased}
body::before{content:"";position:fixed;inset:-20% -10% auto;height:70vh;background:radial-gradient(50% 60% at 30% 20%,var(--glow),transparent 70%),radial-gradient(40% 50% at 80% 10%,rgba(43,187,230,.14),transparent 70%);pointer-events:none;z-index:-1;filter:blur(20px)}
a{color:var(--accent)}
.wrap{max-width:1120px;margin:0 auto;padding:0 20px}
.top{display:flex;align-items:center;justify-content:space-between;gap:14px;padding:18px 0}
.logo{font-family:var(--font-display);font-weight:500;font-size:26px;letter-spacing:-.04em;color:var(--fg);text-decoration:none}
.logo sup{font-size:.4em;color:var(--accent)}
.nav{display:flex;align-items:center;gap:8px}
.nav a{font-family:var(--font-mono);font-size:11px;letter-spacing:.08em;text-transform:uppercase;text-decoration:none;color:var(--fg);padding:10px 14px;border-radius:999px;border:1px solid var(--line)}
.nav a.go{border:0;color:#fff;background:linear-gradient(110deg,var(--accent),var(--accent-2))}
.crumbs{font-family:var(--font-mono);font-size:11px;letter-spacing:.06em;text-transform:uppercase;color:var(--muted);margin:26px 0 18px}
.crumbs a{color:var(--muted);text-decoration:none}.crumbs a:hover{color:var(--accent)}
.art{max-width:760px;margin:0 auto 40px}
h1{font-family:var(--font-display);font-weight:400;font-size:clamp(32px,5vw,54px);line-height:1.06;letter-spacing:-.025em;text-transform:uppercase;margin:0 0 16px}
.lead{font-size:clamp(18px,2.2vw,21px);line-height:1.55;color:var(--muted);margin:0 0 18px;font-weight:500}
.meta{font-family:var(--font-mono);font-size:11px;letter-spacing:.06em;text-transform:uppercase;color:var(--muted);margin-bottom:24px}
.cover{width:100%;height:auto;aspect-ratio:1200/630;object-fit:cover;border-radius:26px;display:block;margin:0 0 34px;background:var(--surface-2)}
.body h2{font-family:var(--font-display);font-weight:500;font-size:clamp(24px,3vw,30px);line-height:1.2;letter-spacing:-.015em;margin:44px 0 14px}
.body h3{font-size:20px;line-height:1.35;margin:30px 0 10px}
.body p{margin:0 0 18px}.body ul,.body ol{margin:0 0 20px;padding-left:22px}.body li{margin:6px 0}
.body blockquote{margin:24px 0;padding:16px 22px;border-left:3px solid var(--accent);background:var(--surface-2);border-radius:0 18px 18px 0;font-size:18px}
.body .note{margin:24px 0;padding:18px 22px;border-radius:20px;background:var(--accent-soft);border:1px solid var(--line);font-size:16px}
.body .cta{margin:26px 0}
.cta-b{display:inline-flex;align-items:center;justify-content:center;min-height:52px;padding:0 26px;border-radius:999px;color:var(--fg)!important;border:1.5px solid var(--fg);text-decoration:none;font-family:var(--font-mono);font-size:12px;letter-spacing:.08em;text-transform:uppercase;box-shadow:0 18px 40px -22px var(--glow)}
.cta-b:hover{border-color:var(--accent);color:var(--accent)!important}
.endcta{margin:46px 0 10px;padding:30px;border-radius:28px;background:var(--surface);border:1px solid var(--hair);text-align:center;backdrop-filter:blur(20px)}
.endcta h2{font-family:var(--font-display);font-weight:400;text-transform:uppercase;font-size:clamp(22px,3vw,30px);margin:0 0 8px}
.endcta p{color:var(--muted);margin:0 0 18px}
.more{max-width:1120px;margin:30px auto 60px}
.more h2,.list-h{font-family:var(--font-mono);font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:var(--muted);font-weight:400;margin:0 0 16px}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:18px}
.card{display:flex;flex-direction:column;border-radius:26px;overflow:hidden;background:var(--surface);border:1px solid var(--hair);text-decoration:none;color:var(--fg);transition:transform .2s,border-color .2s;backdrop-filter:blur(20px)}
.card:hover{transform:translateY(-3px);border-color:var(--line)}
.card img{width:100%;height:auto;aspect-ratio:1200/630;object-fit:cover;display:block;background:var(--surface-2)}
.card div{padding:18px 20px 22px}
.card h3{font-family:var(--font-display);font-weight:500;font-size:20px;line-height:1.25;margin:0 0 8px}
.card p{margin:0;color:var(--muted);font-size:14.5px;line-height:1.55}
.card small{display:block;margin-top:12px;font-family:var(--font-mono);font-size:10.5px;letter-spacing:.06em;text-transform:uppercase;color:var(--muted)}
.hero{margin:30px 0 30px}.hero h1{margin-bottom:10px}.hero p{color:var(--muted);max-width:640px;margin:0}
.foot{border-top:1px solid var(--hair);padding:26px 0 40px;color:var(--muted);font-size:13px;display:flex;flex-wrap:wrap;gap:12px 24px;justify-content:space-between}
.foot a{color:var(--muted)}
@media (max-width:640px){body{font-size:16px}.nav a:not(.go){display:none}.cover{border-radius:20px}.endcta{padding:24px 18px}}
`;
const THEME = `<script>try{var t=JSON.parse(localStorage.getItem("code-theme")||"null");if(t==="light"||t==="dark")document.documentElement.setAttribute("data-theme",t)}catch(e){}</script>`;
const FONTS = `<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,100..700&family=Manrope:wght@400;500;600;700&family=JetBrains+Mono:wght@400&display=swap">`;
const head = (title, desc, url, img, extra) => `<!doctype html><html lang="uk"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)}</title><meta name="description" content="${esc(desc)}"><link rel="canonical" href="${esc(url)}"><meta name="robots" content="index,follow,max-image-preview:large">
<meta property="og:type" content="${extra && extra.article ? 'article' : 'website'}"><meta property="og:site_name" content="CODE"><meta property="og:locale" content="uk_UA"><meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(desc)}"><meta property="og:url" content="${esc(url)}">${img ? `<meta property="og:image" content="${esc(img)}"><meta name="twitter:image" content="${esc(img)}">` : ''}<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">${FONTS}${THEME}<style>${CSS}</style>${extra && extra.ld ? `<script type="application/ld+json">${JSON.stringify(extra.ld).replace(/</g, '\\u003c')}</script>` : ''}</head><body>`;
const top = `<div class="wrap"><header class="top"><a class="logo" href="/">CODE<sup>©</sup></a><nav class="nav"><a href="/blog">Блог</a><a href="/?go=tarot">Таро</a><a class="go" href="/">Розрахувати матрицю</a></nav></header>`;
const foot = `<footer class="foot"><span>© ${new Date().getFullYear()} CODE · матриця долі за методом Наталії Ладіні</span><span><a href="/">Розрахувати матрицю</a> · <a href="/blog">Блог</a> · <a href="/privacy.html">Конфіденційність</a></span></footer></div><script src="/t.js" defer></script></body></html>`;
const card = p => `<a class="card" href="/blog/${esc(p.slug)}">${p.cover ? `<img src="${esc(p.cover)}" alt="${esc(p.cover_alt || p.h1)}" loading="lazy" width="1200" height="630">` : ''}<div><h3>${esc(p.h1)}</h3><p>${esc(p.description || '')}</p><small>${fmtDate(p.published_at)} · ${readMin(p.body)} хв читання</small></div></a>`;
const endCta = `<section class="endcta"><h2>Розрахуйте свою матрицю долі</h2><p>Безкоштовно, за датою народження: особистість, таланти, гроші, стосунки, кармічний хвіст і програми років.</p><a class="cta-b" href="/">Розрахувати матрицю</a></section>`;

module.exports = async (req, res) => {
  /* canonical links, sitemap and OG always point to the main domain, so the old *.vercel.app copy is not indexed as a duplicate */
  const base = (process.env.SITE_URL || 'https://code-matrix.space').replace(/\/$/, '');
  const q = req.query || {};
  const send = (code, html, type) => { res.statusCode = code; res.setHeader('content-type', (type || 'text/html') + '; charset=utf-8'); res.setHeader('cache-control', code === 200 ? 'public, s-maxage=300, stale-while-revalidate=86400' : 'no-store'); res.end(html); };
  try {
    if (q.sitemap) {
      const list = await posts();
      const urls = [{ loc: base + '/', pr: '1.0' }, { loc: base + '/blog', pr: '0.8' }].concat(list.map(p => ({ loc: `${base}/blog/${p.slug}`, lm: (p.updated_at || p.published_at || '').slice(0, 10), pr: '0.7' })));
      return send(200, `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map(u => `<url><loc>${esc(u.loc)}</loc>${u.lm ? `<lastmod>${u.lm}</lastmod>` : ''}<priority>${u.pr}</priority></url>`).join('')}</urlset>`, 'application/xml');
    }
    const slug = String(q.slug || '').toLowerCase().replace(/[^a-z0-9-]/g, '');
    if (slug) {
      const list = await posts(`&slug=eq.${slug}`);
      const p = list[0];
      if (!p) return send(404, head('Статтю не знайдено — CODE', 'Такої статті немає.', base + '/blog') + top + `<main class="art"><p class="crumbs"><a href="/">Головна</a> / <a href="/blog">Блог</a></p><h1>Статтю не знайдено</h1><p class="lead">Можливо, її перейменували. Подивіться інші статті в <a href="/blog">блозі</a> або <a href="/">розрахуйте свою матрицю</a>.</p></main>` + foot);
      const url = `${base}/blog/${p.slug}`, img = abs(base, p.cover), title = p.title || p.h1;
      const ld = [{ '@context': 'https://schema.org', '@type': 'BlogPosting', headline: p.h1, description: p.description, image: img || undefined, datePublished: p.published_at, dateModified: p.updated_at || p.published_at, inLanguage: 'uk', mainEntityOfPage: url, author: { '@type': 'Organization', name: 'CODE' }, publisher: { '@type': 'Organization', name: 'CODE', url: base } },
        { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Головна', item: base + '/' }, { '@type': 'ListItem', position: 2, name: 'Блог', item: base + '/blog' }, { '@type': 'ListItem', position: 3, name: p.h1, item: url }] }];
      let others = []; try { others = (await posts(`&slug=neq.${slug}`)).slice(0, 3); } catch (_) {}
      return send(200, head(`${title} — CODE`, p.description || plain(p.body).slice(0, 155), url, img, { article: true, ld }) + top +
        `<main class="art"><p class="crumbs"><a href="/">Головна</a> / <a href="/blog">Блог</a></p><article><h1>${esc(p.h1)}</h1>${p.h2 ? `<p class="lead">${esc(p.h2)}</p>` : ''}<p class="meta">${fmtDate(p.published_at)} · ${readMin(p.body)} хв читання</p>${p.cover ? `<img class="cover" src="${esc(p.cover)}" alt="${esc(p.cover_alt || p.h1)}" width="1200" height="630">` : ''}<div class="body">${md(p.body)}</div></article>${endCta}</main>` +
        (others.length ? `<section class="more"><h2>[ Читайте також ]</h2><div class="grid">${others.map(card).join('')}</div></section>` : '') + foot);
    }
    const list = await posts();
    const ld = { '@context': 'https://schema.org', '@type': 'Blog', name: 'Блог CODE', url: base + '/blog', inLanguage: 'uk' };
    return send(200, head('Блог про матрицю долі — CODE', 'Статті про матрицю долі: як розшифрувати свою матрицю, програми років, кармічний хвіст, сумісність і самопізнання за методом Наталії Ладіні.', base + '/blog', list[0] && abs(base, list[0].cover), { ld }) + top +
      `<main><section class="hero"><p class="crumbs"><a href="/">Головна</a> / Блог</p><h1>Блог про матрицю долі</h1><p>Розбираємо, як читати свою матрицю: програми років, кармічні задачі, таланти, гроші та стосунки. Простими словами — і з посиланнями на безкоштовний розрахунок.</p></section>
      ${list.length ? `<div class="grid">${list.map(card).join('')}</div>` : '<p class="lead">Статті скоро з’являться.</p>'}</main>` + `<div style="max-width:760px;margin:0 auto">${endCta}</div>` + foot);
  } catch (e) {
    return send(503, head('Блог тимчасово недоступний — CODE', '', base + '/blog') + top + `<main class="art"><h1>Блог тимчасово недоступний</h1><p class="lead">Спробуйте оновити сторінку за хвилину. А поки — <a href="/">розрахуйте свою матрицю</a>.</p></main>` + foot);
  }
};
