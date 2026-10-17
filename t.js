/* CODE · lightweight visit counter: one anonymous record per page load (source, page, device). No personal data. */
(function () {
  try {
    if (navigator.webdriver || /bot|crawl|spider|preview|lighthouse|headless/i.test(navigator.userAgent)) return;
    var ls = null; try { ls = window.localStorage; } catch (_) {}
    var only = ls && ls.getItem('code-cookies') === 'min'; // «Лише необхідні» → id lives only for this tab session
    var store = only ? window.sessionStorage : ls;
    var sid = null, first = false;
    try { sid = store && store.getItem('code-vid'); } catch (_) {}
    if (!sid) { sid = Math.random().toString(36).slice(2) + Date.now().toString(36); first = true; try { store && store.setItem('code-vid', sid); } catch (_) {} }
    var q = new URLSearchParams(location.search), ref = '';
    try { ref = document.referrer && new URL(document.referrer).host !== location.host ? document.referrer : ''; } catch (_) {}
    var body = JSON.stringify({ sid: sid, first: first, path: location.pathname + (q.get('go') ? '?go=' + q.get('go') : ''), ref: ref,
      us: q.get('utm_source') || q.get('ref') || '', um: q.get('utm_medium') || '', uc: q.get('utm_campaign') || '',
      fb: q.has('fbclid') ? 1 : 0, gc: q.has('gclid') ? 1 : 0, tt: q.has('ttclid') ? 1 : 0, lang: (navigator.language || '').slice(0, 8) });
    var send = function () { if (navigator.sendBeacon && navigator.sendBeacon('/api/track', new Blob([body], { type: 'application/json' }))) return; fetch('/api/track', { method: 'POST', headers: { 'content-type': 'application/json' }, body: body, keepalive: true }).catch(function () {}); };
    if (document.readyState === 'complete') setTimeout(send, 300); else addEventListener('load', function () { setTimeout(send, 300); });
  } catch (_) {}
})();
