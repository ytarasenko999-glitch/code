/* CODE · tiny, safe Markdown for blog posts (also copied into /studio for the live preview)
   ## H2   ### H3   **bold**   *italic*   [text](/link)   - list   1. list   > quote
   [[cta: Button text | /link]]  — a call-to-action button
   [[note: text]]                — a highlighted note */
const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const safeUrl = u => { u = String(u || '').trim(); return /^(https?:\/\/|\/|#|mailto:)/i.test(u) ? u : '#'; };
function inline(t) {
  let s = esc(t);
  s = s.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (m, a, h) => { const u = safeUrl(h.replace(/&amp;/g, '&')); const ext = /^https?:/i.test(u) && !/code-matrix|codematrix/i.test(u); return `<a href="${esc(u)}"${ext ? ' target="_blank" rel="noopener"' : ''}>${a}</a>`; });
  s = s.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/(^|[^*])\*([^*\n]+)\*/g, '$1<em>$2</em>');
  return s;
}
function md(src) {
  const lines = String(src || '').replace(/\r/g, '').split('\n'), out = [];
  let para = [], list = null;
  const flushP = () => { if (para.length) { out.push(`<p>${inline(para.join(' '))}</p>`); para = []; } };
  const flushL = () => { if (list) { out.push(`<${list.t}>${list.items.map(i => `<li>${inline(i)}</li>`).join('')}</${list.t}>`); list = null; } };
  for (const raw of lines) {
    const l = raw.trim();
    if (!l) { flushP(); flushL(); continue; }
    let m;
    if ((m = l.match(/^\[\[cta:\s*(.+?)\s*\|\s*(\S+?)\s*\]\]$/i))) { flushP(); flushL(); out.push(`<p class="cta"><a class="cta-b" href="${esc(safeUrl(m[2]))}">${esc(m[1])}</a></p>`); continue; }
    if ((m = l.match(/^\[\[note:\s*(.+?)\s*\]\]$/i))) { flushP(); flushL(); out.push(`<div class="note">${inline(m[1])}</div>`); continue; }
    if ((m = l.match(/^(#{2,4})\s+(.+)$/))) { flushP(); flushL(); const n = m[1].length; out.push(`<h${n}>${inline(m[2])}</h${n}>`); continue; }
    if ((m = l.match(/^>\s?(.*)$/))) { flushP(); flushL(); out.push(`<blockquote>${inline(m[1])}</blockquote>`); continue; }
    if ((m = l.match(/^[-*]\s+(.+)$/))) { flushP(); if (!list || list.t !== 'ul') { flushL(); list = { t: 'ul', items: [] }; } list.items.push(m[1]); continue; }
    if ((m = l.match(/^\d+[.)]\s+(.+)$/))) { flushP(); if (!list || list.t !== 'ol') { flushL(); list = { t: 'ol', items: [] }; } list.items.push(m[1]); continue; }
    flushL(); para.push(l);
  }
  flushP(); flushL();
  return out.join('\n');
}
const plain = src => String(src || '').replace(/\[\[(cta|note):\s*([^|\]]+).*?\]\]/gi, '$2').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/[#>*_`-]/g, ' ').replace(/\s+/g, ' ').trim();
module.exports = { md, esc, plain };
