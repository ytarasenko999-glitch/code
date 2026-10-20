/* CODE · every page of the app (/, /taro, /sumisnist, /en/tarot …) is the same single-page app (app.html),
   served with its own title, description, canonical link, language alternates and structured data from «SEO» in the admin panel.
   Slugs are editable there; an old slug answers with a permanent redirect to the new one. */
const fs = require('fs');
const path = require('path');
const { load, pathOf, ORIGIN, iconTags } = require('./_seo.js');

let APP = null;
async function appHtml(host) {
  if (APP) return APP;
  for (const f of [path.join(process.cwd(), 'app.html'), path.join(__dirname, '..', 'app.html')]) {
    try { APP = fs.readFileSync(f, 'utf8'); return APP; } catch (_) {}
  }
  const r = await fetch(`https://${host || 'code-matrix.space'}/app.html`);
  if (!r.ok) throw new Error('app ' + r.status);
  APP = await r.text();
  return APP;
}
const esc = s => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const json = o => JSON.stringify(o).replace(/</g, '\\u003c');

module.exports = async (req, res) => {
  const q = req.query || {};
  /* built-in defaults for the admin panel's «SEO» editor */
  if (q.defaults) { const M = require('./_seo.js'); res.setHeader('content-type', 'application/json'); res.setHeader('cache-control', 'no-store'); return res.end(JSON.stringify({ pages: M.PAGES, reserved: M.RESERVED.source })); }
  const lang = q.pl === 'en' ? 'en' : 'uk';           /* language of the address itself (/en/… or not) */
  const slug = String(q.slug || '').toLowerCase();
  let S;
  try { S = await load(); } catch (_) { S = require('./_seo.js').merge({}); }
  const pages = S.pages.filter(p => p.k !== 'blog');
  let page = slug ? pages.find(p => p.k !== 'home' && p[lang].slug === slug) : pages.find(p => p.k === 'home');

  /* old-style links (/?go=tarot&lang=en from articles, emails, bookmarks) → the clean address; other parameters (ref, utm…) are kept */
  const wantLang = q.lang === 'en' || q.lang === 'uk' ? q.lang : lang;
  const goTo = q.go && pages.find(p => p.k === q.go && p.k !== 'home');
  if (page && (wantLang !== lang || goTo)) {
    const target = goTo || page, keep = new URLSearchParams();
    Object.keys(q).forEach(k => { if (!['pl', 'slug', 'lang', 'go'].includes(k)) [].concat(q[k]).forEach(v => keep.append(k, v)); });
    const qs = keep.toString();
    res.statusCode = 301; res.setHeader('location', pathOf(target, wantLang) + (qs ? '?' + qs : '')); res.setHeader('cache-control', 'public, s-maxage=300');
    return res.end();
  }

  if (!page && slug) {
    /* renamed page → its new address; a slug from the other language → the right language version */
    const moved = pages.find(p => p[lang].old.includes(slug));
    const other = lang === 'uk' ? 'en' : 'uk';
    const cross = pages.find(p => p.k !== 'home' && p[other].slug === slug);
    const to = moved ? pathOf(moved, lang) : cross ? pathOf(cross, lang) : null;
    if (to) { res.statusCode = 301; res.setHeader('location', to); res.setHeader('cache-control', 'public, s-maxage=300'); return res.end(); }
    res.statusCode = 404; res.setHeader('content-type', 'text/html; charset=utf-8'); res.setHeader('cache-control', 'public, s-maxage=60');
    try { return res.end(fs.readFileSync(path.join(process.cwd(), '404.html'), 'utf8')); } catch (_) { return res.end('<!doctype html><title>404</title><p>Not found. <a href="/">CODE</a></p>'); }
  }

  let html;
  try { html = await appHtml(req.headers.host); } catch (e) { res.statusCode = 500; return res.end('Temporarily unavailable'); }

  const L = page[lang], url = ORIGIN + pathOf(page, lang);
  const ogImg = L.ogImage || S.site.ogImage || ORIGIN + (lang === 'en' ? '/og-en.png?v=2' : '/og.png?v=2');
  const home = pages.find(p => p.k === 'home');
  const nav = pages.filter(p => p.k !== 'home' && !p.noindex);
  const ld = page.k === 'home'
    ? { '@context': 'https://schema.org', '@graph': [
        { '@type': 'WebSite', '@id': ORIGIN + '/#website', url, name: S.site.name || 'CODE', alternateName: lang === 'en' ? 'CODE — Destiny Matrix' : 'CODE — матриця долі', description: L.desc, inLanguage: lang },
        { '@type': 'Organization', '@id': ORIGIN + '/#org', name: S.site.name || 'CODE', url: ORIGIN + '/', logo: ORIGIN + '/favicon-192.png' },
        { '@type': 'ItemList', name: lang === 'en' ? 'Main sections' : 'Основні розділи', itemListElement: nav.map((p, i) => ({ '@type': 'SiteNavigationElement', position: i + 1, name: p[lang].name, description: p[lang].desc, url: ORIGIN + (p.k === 'blog' ? (lang === 'en' ? '/en/blog' : '/blog') : pathOf(p, lang)) })) }
      ] }
    : { '@context': 'https://schema.org', '@graph': [
        { '@type': 'WebPage', '@id': url + '#page', url, name: L.title, description: L.desc, inLanguage: lang, isPartOf: { '@id': ORIGIN + '/#website' } },
        { '@type': 'BreadcrumbList', itemListElement: [
          { '@type': 'ListItem', position: 1, name: home[lang].name, item: ORIGIN + pathOf(home, lang) },
          { '@type': 'ListItem', position: 2, name: L.name, item: url }] }
      ] };
  const boot = { k: page.k, lang, p: S.pages.map(p => ({ k: p.k, uk: { s: p.uk.slug, n: p.uk.name, t: p.uk.title, d: p.uk.desc }, en: { s: p.en.slug, n: p.en.name, t: p.en.title, d: p.en.desc } })) };
  const head = [
    `<script>window.__SEO=${json(boot)}</script>`,
    `<link rel="canonical" href="${esc(url)}">`,
    `<link rel="alternate" hreflang="uk" href="${esc(ORIGIN + pathOf(page, 'uk'))}">`,
    `<link rel="alternate" hreflang="en" href="${esc(ORIGIN + pathOf(page, 'en'))}">`,
    `<link rel="alternate" hreflang="x-default" href="${esc(ORIGIN + pathOf(page, 'uk'))}">`,
    page.noindex ? '<meta name="robots" content="noindex, follow">' : '<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1">',
    `<meta property="og:url" content="${esc(url)}">`,
    `<meta property="og:site_name" content="${esc(S.site.name || 'CODE')}">`,
    `<meta property="og:locale" content="${lang === 'en' ? 'en_GB' : 'uk_UA'}">`,
    `<meta property="og:image" content="${esc(ogImg)}">`,
    '<meta property="og:image:width" content="1200"><meta property="og:image:height" content="630">',
    `<meta property="og:image:alt" content="${esc(lang === 'en' ? 'CODE — Destiny Matrix, compatibility and AI Tarot' : 'CODE — матриця долі, сумісність і Таро з ШІ')}">`,
    '<meta name="twitter:card" content="summary_large_image">',
    `<script type="application/ld+json">${json(ld)}</script>`,
    iconTags(S.site)
  ].join('\n');

  /* home page: the start screen goes into the HTML itself, so it paints before app.js has loaded */
  let pre = '';
  if (page.k === 'home') { try { pre = fs.readFileSync(path.join(process.cwd(), 'prerender', `home-${lang}.html`), 'utf8'); } catch (_) {} }
  html = html
    .replace(/<html lang="[^"]*">/, () => `<html lang="${lang}"${pre ? ' class="pre"' : ''}>`)
    .replace('<section class="hero home" id="home"></section>', () => pre ? `<section class="hero home is-start" id="home">${pre}</section>` : '<section class="hero home" id="home"></section>')
    .replace(/<body([^>]*)>/, (m, a) => pre ? (/class="/.test(a) ? m.replace('class="', 'class="on-start ') : `<body${a} class="on-start">`) : m)
    .replace(/<title>[\s\S]*?<\/title>/, () => `<title>${esc(L.title)}</title>`)
    .replace(/<link rel="icon"[^>]*>/g, () => '').replace(/<meta name="theme-color"[^>]*>/, () => '')
    .replace(/<meta name="description" content="[^"]*">/, () => `<meta name="description" content="${esc(L.desc)}">`)
    .replace(/<meta property="og:title" content="[^"]*">/, () => `<meta property="og:title" content="${esc(L.ogTitle || L.title)}">`)
    .replace(/<meta property="og:description" content="[^"]*">/, () => `<meta property="og:description" content="${esc(L.ogDesc || L.desc)}">`)
    .replace('<meta charset="utf-8">', () => '<meta charset="utf-8">\n' + head)
    /* footer links to every section, with this language's addresses and names — the internal links search engines follow */
    .replace(/<a class="flink" data-pg="(\w+)" href="[^"]*">[^<]*<\/a>/g, (m, k) => { const p = S.pages.find(x => x.k === k); return p ? `<a class="flink" data-pg="${k}" href="${esc(pathOf(p, lang))}">${esc(p[lang].name)}</a>` : m; })
    .replace('<a class="flink ft-blog" href="/blog" data-blog>Блог</a>', () => `<a class="flink ft-blog" href="${lang === 'en' ? '/en/blog' : '/blog'}" data-blog>${esc((S.pages.find(x => x.k === 'blog') || {})[lang] ? S.pages.find(x => x.k === 'blog')[lang].name : 'Blog')}</a>`);

  res.statusCode = 200;
  res.setHeader('content-type', 'text/html; charset=utf-8');
  res.setHeader('cache-control', 'public, max-age=0, s-maxage=300, stale-while-revalidate=86400');
  res.setHeader('content-language', lang);
  res.end(html);
};
