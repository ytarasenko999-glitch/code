/* CODE · SEO settings for the site's pages: built-in defaults + what the admin set in «SEO» (admin_settings, key «seo»).
   Used by api/page.js (meta tags of every page), api/blog.js (blog list meta + sitemap) and the admin panel. */
const SB_URL = process.env.SUPABASE_URL || 'https://blwyzqxhzvjzhqkabesi.supabase.co';
const SB_KEY = process.env.SUPABASE_ANON_KEY || 'sb_publishable_v2wRmfGkiVW7fF6wIkPZBg_fjeS3wBu';
const SERVICE = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const ORIGIN = 'https://code-matrix.space';

/* order = the order of links in the footer and in the structured data — what we suggest to Google as the site's main sections */
const PAGES = [
  { k: 'home', fixed: true,
    uk: { slug: '', name: 'Головна', title: 'Матриця долі онлайн — розрахуй свій код безкоштовно | CODE', desc: 'Безкоштовний розрахунок матриці долі за датою народження за методом Наталії Ладіні: таланти, гроші, стосунки, кармічний хвіст, прогноз по роках і ШІ-розбір.' },
    en: { slug: '', name: 'Home', title: 'Destiny Matrix online — calculate your code for free | CODE', desc: 'Free Destiny Matrix calculation from your date of birth using Natalia Ladini’s method: talents, money, relationships, karmic tail, forecast by year and an AI reading.' } },
  { k: 'acct',
    uk: { slug: 'kabinet', name: 'Особистий кабінет', title: 'Особистий кабінет — ваші матриці, розбори й історія | CODE', desc: 'Увійдіть, щоб зберігати свою матрицю долі, матриці близьких, ШІ-розбори, розклади Таро й історію розрахунків в одному місці.' },
    en: { slug: 'account', name: 'Personal account', title: 'Personal account — your matrices, readings and history | CODE', desc: 'Sign in to keep your Destiny Matrix, the matrices of people close to you, AI readings, Tarot spreads and calculation history in one place.' } },
  { k: 'solo',
    uk: { slug: 'osobysta-matrytsia', name: 'Особиста матриця', title: 'Особиста матриця долі — розрахунок за датою народження | CODE', desc: 'Розрахуйте особисту матрицю долі: центр, таланти, грошовий канал, стосунки, карта здоров’я, програми й кармічний хвіст — з поясненнями простими словами.' },
    en: { slug: 'destiny-matrix', name: 'Personal matrix', title: 'Personal Destiny Matrix — calculation by date of birth | CODE', desc: 'Calculate your personal Destiny Matrix: center, talents, money channel, relationships, health map, programs and karmic tail — explained in plain words.' } },
  { k: 'pair',
    uk: { slug: 'sumisnist', name: 'Матриця сумісності', title: 'Матриця сумісності — сумісність пари за датами народження | CODE', desc: 'Сумісність за матрицею долі: енергія союзу, спільні таланти, кармічна задача пари, гроші й точки напруги. Безкоштовно, за двома датами народження.' },
    en: { slug: 'compatibility', name: 'Compatibility matrix', title: 'Compatibility matrix — couple compatibility by birth dates | CODE', desc: 'Destiny Matrix compatibility: the energy of the union, shared talents, the couple’s karmic task, money and points of tension. Free, from two dates of birth.' } },
  { k: 'today',
    uk: { slug: 'enerhiia-dnia', name: 'Енергія дня', title: 'Енергія дня за матрицею долі — ваш прогноз на сьогодні | CODE', desc: 'Персональна енергія дня за вашою матрицею долі: на що спертися сьогодні, чого уникати й які сфери життя в фокусі.' },
    en: { slug: 'energy-of-the-day', name: 'Energy of the day', title: 'Energy of the day by your Destiny Matrix — today’s forecast | CODE', desc: 'Your personal energy of the day from your Destiny Matrix: what to lean on today, what to avoid and which areas of life are in focus.' } },
  { k: 'cat',
    uk: { slug: 'arkany', name: 'Посібник по арканах', title: 'Довідник 22 арканів матриці долі — значення в плюсі й мінусі | CODE', desc: 'Усі 22 енергії матриці долі: значення кожного аркана в плюсі й мінусі, у грошах, стосунках, здоров’ї та призначенні.' },
    en: { slug: 'arcana', name: 'Arcana guide', title: 'Guide to the 22 Destiny Matrix arcana — plus and minus | CODE', desc: 'All 22 energies of the Destiny Matrix: the meaning of each arcanum in the plus and the minus, in money, relationships, health and purpose.' } },
  { k: 'tarot',
    uk: { slug: 'taro', name: 'Таро-трактувальник ШІ', title: 'Таро-трактувальник ШІ онлайн — розклад і тлумачення карт | CODE', desc: 'Поставте питання, розкладіть карти Таро й отримайте тлумачення від ШІ з урахуванням вашої матриці долі.' },
    en: { slug: 'tarot', name: 'AI Tarot reader', title: 'AI Tarot reader online — spreads and card meanings | CODE', desc: 'Ask a question, lay out Tarot cards and get an AI interpretation that takes your Destiny Matrix into account.' } },
  { k: 'years',
    uk: { slug: 'prohnoz-po-rokakh', name: 'Прогноз по роках', title: 'Прогноз по роках — програма року в матриці долі | CODE', desc: 'Програма кожного року від 0 до 80: що приносить ваш поточний рік, як прожити його в плюсі та до чого готуватися далі.' },
    en: { slug: 'forecast-by-year', name: 'Forecast by year', title: 'Forecast by year — the program of the year in the Destiny Matrix | CODE', desc: 'The program of every year from 0 to 80: what your current year brings, how to live it in the plus and what to prepare for next.' } },
  { k: 'guide',
    uk: { slug: 'pozytsii-matrytsi', name: 'Шпаргалка по позиціях', title: 'Шпаргалка по позиціях матриці долі — що означає кожна точка | CODE', desc: 'Коротко про кожну позицію матриці долі: центр, особистість, таланти, гроші, стосунки, рід, кармічний хвіст і лінії призначення.' },
    en: { slug: 'positions', name: 'Positions cheat sheet', title: 'Destiny Matrix positions cheat sheet — what each point means | CODE', desc: 'A short guide to every position of the Destiny Matrix: center, personality, talents, money, relationships, family, karmic tail and lines of purpose.' } },
  { k: 'blog', fixed: true,
    uk: { slug: 'blog', name: 'Блог', title: 'Блог про матрицю долі — CODE', desc: 'Статті про матрицю долі: як розшифрувати свою матрицю, програми років, кармічний хвіст, сумісність і саморозвиток за методом Наталії Ладіні.' },
    en: { slug: 'blog', name: 'Blog', title: 'Destiny Matrix blog — CODE', desc: 'Articles about the Destiny Matrix: how to read your matrix, programs of the years, the karmic tail, compatibility and self-knowledge with Natalia Ladini’s method.' } }
];
const LANGS = ['uk', 'en'];
const FIELDS = ['slug', 'name', 'title', 'desc', 'ogTitle', 'ogDesc', 'ogImage'];
/* slugs the site already uses for files and services */
const RESERVED = /^(api|studio|blog|en|img|tools|app|index|favicon|robots|sitemap|privacy|terms|404|t)$/;

let CACHE = null, CACHE_AT = 0;
async function loadRaw() {
  if (CACHE && Date.now() - CACHE_AT < 60000) return CACHE;
  const key = SERVICE || SB_KEY;
  const h = /^sb_secret_/.test(key) ?{ apikey: key } : { apikey: key, Authorization: `Bearer ${key}` };
  let v = {};
  try {
    const r = await fetch(`${SB_URL}/rest/v1/admin_settings?select=value&key=eq.seo`, { headers: h });
    if (r.ok) { const j = await r.json(); v = (j[0] && j[0].value) || {}; }
  } catch (_) {}
  CACHE = v; CACHE_AT = Date.now();
  return v;
}

/* the admin's values over the defaults; empty fields fall back to the default */
function merge(raw) {
  const sp = (raw && raw.pages) || {};
  const order = Array.isArray(raw && raw.order) ? raw.order : [];
  const list = PAGES.map((d, i) => {
    const s = sp[d.k] || {};
    const p = { k: d.k, fixed: !!d.fixed, noindex: !!s.noindex, i: order.includes(d.k) ? order.indexOf(d.k) : 100 + i };
    LANGS.forEach(l => {
      const o = Object.assign({}, d[l]); const x = s[l] || {};
      FIELDS.forEach(f => { if (x[f] != null && String(x[f]).trim() !== '' && !(f === 'slug' && d.fixed)) o[f] = String(x[f]).trim(); });
      if (d.k !== 'home' && d.k !== 'blog' && (!/^[a-z0-9-]{1,60}$/.test(o.slug) || RESERVED.test(o.slug))) o.slug = d[l].slug;
      o.old = Array.isArray(x.old) ? x.old.filter(z => /^[a-z0-9-]{1,60}$/.test(z) && z !== o.slug) : [];
      p[l] = o;
    });
    return p;
  });
  list.sort((a, b) => (a.k === 'home' ? -1 : b.k === 'home' ? 1 : a.i - b.i));
  return { pages: list, site: Object.assign({ name: 'CODE', ogImage: '' }, (raw && raw.site) || {}) };
}
async function load() { return merge(await loadRaw()); }
const pathOf = (p, lang) => {
  const s = p[lang].slug;
  if (p.k === 'home') return lang === 'en' ? '/en' : '/';
  return (lang === 'en' ? '/en/' : '/') + s;
};
module.exports = { PAGES, LANGS, FIELDS, RESERVED, ORIGIN, load, merge, pathOf };
