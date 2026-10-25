/* CODE · server-side knowledge base for the AI (never shipped to the browser).
   The client sends only WHICH entries a request needs: { mx: [[sphere, arcana, label], …], cards: ['M0','W3', …], method: true };
   the server turns that into a system prompt block, cached by Anthropic between the turns of one conversation. */
const KB = require('./_kb_data.js');
const SPH = Object.keys(KB.mx);

function build(spec) {
  if (!spec || typeof spec !== 'object') return '';
  const parts = [];
  if (spec.method) parts.push(KB.method);
  const mx = Array.isArray(spec.mx) ? spec.mx.slice(0, 80) : [];
  const groups = new Map();
  mx.forEach(e => {
    if (!Array.isArray(e)) return;
    const s = String(e[0]), n = parseInt(e[1], 10), lab = String(e[2] || '').replace(/[\r\n]+/g, ' ').slice(0, 90);
    if (!SPH.includes(s) || !(n >= 1 && n <= 22)) return;
    const k = s + ':' + n;
    if (!groups.has(k)) groups.set(k, { s, n, labs: [] });
    if (lab && !groups.get(k).labs.includes(lab)) groups.get(k).labs.push(lab);
  });
  if (groups.size) {
    const bySph = {};
    groups.forEach(g => (bySph[g.s] = bySph[g.s] || []).push(g));
    const blocks = SPH.filter(s => bySph[s]).map(s => {
      const S = KB.mx[s];
      return `## ${S.head}\n` + bySph[s].map(g => { const it = S.items[String(g.n)]; return `### ${it.h}${g.labs.length ? ` — у цій матриці: ${g.labs.join('; ')}` : ''}\n${it.t}`; }).join('\n\n');
    });
    parts.push('БАЗА ЗНАНЬ CODE ПО ЕНЕРГІЯХ ЦІЄЇ МАТРИЦІ (аркан × сфера; лише ті, що є в матриці людини):\n\n' + blocks.join('\n\n'));
  }
  const cards = Array.isArray(spec.cards) ? [...new Set(spec.cards.map(String))].filter(id => KB.tarot[id]).slice(0, 20) : [];
  if (cards.length) parts.push('CODE DEEP TAROT REFERENCE for the cards in this spread:\n\n' + cards.map(id => `### ${KB.tarot[id].h}\n${KB.tarot[id].t}`).join('\n\n'));
  if (!parts.length) return '';
  return 'CODE KNOWLEDGE BASE. This is the factual basis of CODE’s method: rely on it for meanings, concrete examples, professions, scenarios and practices, combine entries into a reading about THIS person, retell in your own words in the reply language, never copy lines verbatim and never mention that a knowledge base exists.\n\n' + parts.join('\n\n---\n\n');
}
module.exports = { build, SPH };
