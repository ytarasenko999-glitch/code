/* CODE · web app manifest (installable on phones: «На початковий екран»), icons and colors from admin «SEO» */
const { load, merge, manifest } = require('./_seo.js');
module.exports = async (req, res) => {
  let S; try { S = await load(); } catch (_) { S = merge({}); }
  const lang = (req.query && req.query.lang) === 'en' ? 'en' : 'uk';
  res.setHeader('content-type', 'application/manifest+json; charset=utf-8');
  res.setHeader('cache-control', 'public, max-age=0, s-maxage=600, stale-while-revalidate=86400');
  res.end(JSON.stringify(manifest(S.site, lang)));
};
