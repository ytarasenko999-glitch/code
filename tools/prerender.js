/* CODE · snapshot of the start screen («Розрахуй свій код» + form) for the first paint.
   api/page.js puts it into <section id="home"> on the home page, so phones see the hero at once while app.js loads;
   the app then draws the same screen over it (no jump). Re-run after changing the start screen:
     NODE_PATH=$(npm root -g) node tools/prerender.js        → prerender/home-uk.html, prerender/home-en.html */
const http = require('http'), fs = require('fs'), path = require('path');
const { chromium } = require('playwright');
const ROOT = path.join(__dirname, '..');
const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.png': 'image/png', '.json': 'application/json', '.ico': 'image/x-icon' };
const srv = http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]); if (p === '/' || p === '/en') p = '/app.html';
  const f = path.join(ROOT, p);
  if (!f.startsWith(ROOT) || !fs.existsSync(f) || !fs.statSync(f).isFile()) { res.statusCode = 404; return res.end(); }
  res.setHeader('content-type', TYPES[path.extname(f)] || 'text/plain'); res.end(fs.readFileSync(f));
}).listen(0, async () => {
  const port = srv.address().port, b = await chromium.launch();
  for (const lang of ['uk', 'en']) {
    const ctx = await b.newContext({ viewport: { width: 412, height: 823 } });
    await ctx.route(/^https?:\/\/(?!127\.0\.0\.1)/, r => r.abort());   /* fonts, analytics, auth: not needed for markup */
    const p = await ctx.newPage();
    await p.goto(`http://127.0.0.1:${port}/${lang === 'en' ? '?lang=en' : ''}`); await p.waitForTimeout(1500);
    const html = await p.evaluate(() => {
      const h = document.getElementById('home').cloneNode(true);
      h.querySelectorAll('canvas').forEach(c => { c.removeAttribute('width'); c.removeAttribute('height'); });
      h.querySelectorAll('#qp,.rec-pop,.cs-pop,[hidden]').forEach(e => e.remove());
      h.querySelectorAll('select').forEach(s => { [...s.options].slice(1).forEach(o => o.remove()); });
      /* ids stay on containers (the CSS styles #q, #startForm…); fields lose theirs so nothing duplicates the real form */
      h.querySelectorAll('input,select,textarea,button,label,[for],[name],[aria-controls]').forEach(e => ['id', 'for', 'name', 'aria-controls', 'aria-labelledby', 'aria-describedby'].forEach(a => e.removeAttribute(a)));
      h.querySelectorAll('form,button,input,select,textarea,a').forEach(e => e.setAttribute('tabindex', '-1'));
      [...h.children].forEach(c => { c.classList.remove('fade'); c.setAttribute('inert', ''); });
      return h.innerHTML.replace(/\s+/g, ' ');
    });
    fs.writeFileSync(path.join(ROOT, 'prerender', `home-${lang}.html`), html);
    console.log(lang, html.length, 'chars');
    await ctx.close();
  }
  await b.close(); srv.close();
});
