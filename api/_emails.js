/* CODE · email templates (defaults) + branded HTML renderer.
   Templates are edited in the admin (/studio → «Email-розсилки») and saved to admin_settings.emails;
   these defaults are used for anything not customised yet. */
const SITE = process.env.SITE_URL || 'https://code-matrix-test.vercel.app';
const SUPPORT = 'code.matrix.support@gmail.com';

const VARS = {
  name: 'Ім’я людини (або «друже»)',
  email: 'Email отримувача',
  plan: 'Тариф: Plus / Pro',
  period: 'Період: місяць / рік',
  amount: 'Сума оплати, грн',
  paid_until: 'Дата, до якої діє доступ',
  days_left: 'Скільки днів лишилося',
  pack: 'Що входить у пакет',
  cabinet_url: 'Посилання на кабінет → Підписка',
  plans_url: 'Посилання на тарифи',
  site_url: 'Посилання на сайт',
  action_url: 'Посилання з листа Supabase (підтвердження / скидання пароля)'
};
const SAMPLE = { name: 'Юлія', email: 'yulia@example.com', plan: 'Plus', period: 'місяць', amount: '199', paid_until: '16 листопада 2026', days_left: '3', pack: '10 запитів до ШІ + 1 персональний розбір матриці', cabinet_url: SITE + '/?go=acct', plans_url: SITE + '/?go=acct', site_url: SITE, action_url: SITE + '/#confirm' };

/* group: auth — sent by Supabase itself (copy HTML into Supabase → Authentication → Emails)
          auto — sent by our server automatically */
const DEFAULTS = [
  { id: 'welcome', group: 'auto', name: 'Вітання після реєстрації', when: 'Одразу після створення акаунта (email або Google).', on: true,
    subject: 'Ласкаво просимо до CODE, {{name}}', preheader: 'Ваша матриця долі вже чекає на вас',
    heading: 'Вітаємо в CODE, {{name}}!',
    body: 'Дякуємо, що приєдналися. Тепер ваші розрахунки, збережені коди й розклади зберігаються в акаунті і доступні з будь-якого пристрою.\n\nЗ чого почати:\n- **Розрахуйте свою матрицю долі** — особистість, таланти, гроші, стосунки, кармічний хвіст і програми років.\n- **Подивіться прогноз по роках** — що несе вам поточний рік.\n- **Поставте питання Таро-трактувальнику** — 3 перші трактування безкоштовні.',
    button: 'Розрахувати мою матрицю', url: '{{site_url}}' },
  { id: 'confirm', group: 'auth', name: 'Підтвердження email', when: 'Після реєстрації через email і пароль. Надсилає Supabase.', on: true,
    subject: 'Підтвердіть email для CODE', preheader: 'Один клік — і акаунт готовий',
    heading: 'Підтвердіть свою пошту',
    body: 'Ви зареєструвалися в CODE з цією адресою. Натисніть кнопку нижче, щоб підтвердити email і увійти в акаунт.\n\nЯкщо це були не ви — просто проігноруйте цей лист.',
    button: 'Підтвердити email', url: '{{action_url}}' },
  { id: 'reset', group: 'auth', name: 'Скидання пароля', when: 'Коли людина натискає «Забули пароль?». Надсилає Supabase.', on: true,
    subject: 'Скидання пароля в CODE', preheader: 'Посилання діє обмежений час',
    heading: 'Новий пароль',
    body: 'Ми отримали запит на скидання пароля для вашого акаунта CODE. Натисніть кнопку, щоб задати новий пароль.\n\nЯкщо ви не надсилали запит — нічого робити не потрібно, ваш пароль залишиться без змін.',
    button: 'Задати новий пароль', url: '{{action_url}}' },
  { id: 'paid_plan', group: 'auto', name: 'Оплата тарифу успішна', when: 'Після успішної оплати Plus або Pro.', on: true,
    subject: 'Тариф {{plan}} активовано', preheader: 'Доступ діє до {{paid_until}}',
    heading: 'Дякуємо! Тариф {{plan}} активний',
    body: 'Оплату {{amount}} грн отримано. Ваш тариф **{{plan}}** ({{period}}) діє до **{{paid_until}}**.\n\nУсі ліміти й залишок запитів видно в кабінеті → «Підписка». Там же можна увімкнути або вимкнути автопродовження — за замовчуванням воно вимкнене, тож без вашої згоди нічого не списується.',
    button: 'Відкрити кабінет', url: '{{cabinet_url}}' },
  { id: 'paid_pack', group: 'auto', name: 'Оплата пакета успішна', when: 'Після успішної оплати пакета послуг.', on: true,
    subject: 'Пакет додано до вашого акаунта', preheader: '{{pack}}',
    heading: 'Пакет уже у вас',
    body: 'Оплату {{amount}} грн отримано. До акаунта додано: **{{pack}}**.\n\nПакет не згорає — використовуйте, коли зручно. Залишок видно в кабінеті → «Підписка».',
    button: 'Перейти до CODE', url: '{{site_url}}' },
  { id: 'expiring_manual', group: 'auto', name: 'Підписка закінчується (автопродовження вимкнене)', when: 'За 3 дні до кінця підписки, якщо автопродовження вимкнене.', on: true,
    subject: 'Тариф {{plan}} закінчується через {{days_left}} дні', preheader: 'Можна поновити за хвилину — або нічого не робити',
    heading: 'Ваш тариф {{plan}} діє до {{paid_until}}',
    body: 'Нагадуємо: доступ до тарифу **{{plan}}** закінчується **{{paid_until}}**.\n\nЯкщо хочете й далі користуватися всіма можливостями — поновіть підписку в кабінеті.\n\n**Не хочете продовжувати? Нічого робити не потрібно.** Автопродовження вимкнене, тож гроші не спишуться: після {{paid_until}} акаунт просто повернеться до безкоштовного тарифу, а всі ваші матриці й розклади збережуться.',
    button: 'Поновити підписку', url: '{{cabinet_url}}' },
  { id: 'expiring_auto', group: 'auto', name: 'Підписка закінчується (автопродовження увімкнене)', when: 'За 3 дні до кінця підписки, якщо автопродовження увімкнене.', on: true,
    subject: 'Тариф {{plan}} продовжиться автоматично {{paid_until}}', preheader: 'Спишемо {{amount}} грн — або вимкніть автопродовження',
    heading: 'Скоро автоматичне продовження',
    body: 'У вас увімкнене автопродовження тарифу **{{plan}}**. **{{paid_until}}** ми спишемо **{{amount}} грн** і продовжимо доступ ще на {{period}}.\n\n**Не хочете продовжувати?** Вимкніть автопродовження в кабінеті → «Підписка» до {{paid_until}}. Тоді нічого не спишеться, а після цієї дати акаунт повернеться до безкоштовного тарифу.',
    button: 'Керувати підпискою', url: '{{cabinet_url}}' },
  { id: 'renewed', group: 'auto', name: 'Підписку продовжено автоматично', when: 'Після успішного автоматичного списання.', on: true,
    subject: 'Тариф {{plan}} продовжено до {{paid_until}}', preheader: 'Списано {{amount}} грн',
    heading: 'Підписку продовжено',
    body: 'Ми списали {{amount}} грн і продовжили тариф **{{plan}}** до **{{paid_until}}**.\n\nВимкнути автопродовження можна будь-коли в кабінеті → «Підписка».',
    button: 'Відкрити кабінет', url: '{{cabinet_url}}' },
  { id: 'renew_failed', group: 'auto', name: 'Не вдалося продовжити автоматично', when: 'Якщо автоматичне списання не пройшло.', on: true,
    subject: 'Не вдалося продовжити тариф {{plan}}', preheader: 'Поновіть вручну, щоб не втратити доступ',
    heading: 'Оплата не пройшла',
    body: 'Ми спробували продовжити тариф **{{plan}}**, але платіж не пройшов — наприклад, через ліміт або термін дії картки.\n\nЩоб не втратити доступ, поновіть підписку вручну в кабінеті. Якщо нічого не робити, акаунт повернеться до безкоштовного тарифу — дані збережуться.',
    button: 'Поновити вручну', url: '{{cabinet_url}}' },
  { id: 'expired', group: 'auto', name: 'Підписка закінчилася', when: 'Наступного дня після завершення підписки без продовження.', on: true,
    subject: 'Тариф {{plan}} завершився', preheader: 'Ваші дані збережено — повернутися можна будь-коли',
    heading: 'Ваш тариф {{plan}} завершився',
    body: 'Доступ до тарифу **{{plan}}** закінчився {{paid_until}}. Акаунт перейшов на безкоштовний тариф: усі матриці, збережені коди й розклади на місці.\n\nКоли захочете повернутися до розборів від ШІ та прогнозів — тарифи чекають у кабінеті.',
    button: 'Обрати тариф', url: '{{plans_url}}' }
];

const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const fill = (t, v) => String(t || '').replace(/\{\{\s*(\w+)\s*\}\}/g, (m, k) => v && v[k] != null ? String(v[k]) : m);
const A = 'color:#4F5BF2;text-decoration:underline';
function inline(t) {
  return esc(t).replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (m, a, h) => `<a href="${h}" style="${A}">${a}</a>`).replace(/\*\*(.+?)\*\*/g, '<strong style="color:#14162B">$1</strong>');
}
function bodyHtml(src) {
  const blocks = String(src || '').replace(/\r/g, '').split(/\n{2,}/), out = [];
  for (const b of blocks) {
    const lines = b.split('\n').filter(Boolean); if (!lines.length) continue;
    if (lines.every(l => /^[-*]\s+/.test(l))) { out.push(`<ul style="margin:0 0 18px;padding-left:20px">${lines.map(l => `<li style="margin:0 0 8px">${inline(l.replace(/^[-*]\s+/, ''))}</li>`).join('')}</ul>`); continue; }
    const first = lines.findIndex(l => /^[-*]\s+/.test(l));
    if (first > 0) { out.push(`<p style="margin:0 0 10px">${inline(lines.slice(0, first).join(' '))}</p>`); out.push(`<ul style="margin:0 0 18px;padding-left:20px">${lines.slice(first).map(l => `<li style="margin:0 0 8px">${inline(l.replace(/^[-*]\s+/, ''))}</li>`).join('')}</ul>`); continue; }
    out.push(`<p style="margin:0 0 18px">${inline(lines.join(' '))}</p>`);
  }
  return out.join('');
}
/* returns {subject, html, text} with variables filled */
function render(tpl, vars) {
  const v = { ...SAMPLE, ...(vars || {}) }, f = s => fill(s, v);
  const subject = f(tpl.subject), pre = f(tpl.preheader || ''), url = f(tpl.url || '{{site_url}}');
  const html = `<!doctype html><html lang="uk"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light"><title>${esc(subject)}</title></head>
<body style="margin:0;padding:0;background:#ECEFFA">
<div style="display:none;max-height:0;overflow:hidden;opacity:0">${esc(pre)}&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#ECEFFA"><tr><td align="center" style="padding:32px 14px">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px">
<tr><td style="padding:0 6px 18px;font-family:Arial,Helvetica,sans-serif;font-size:24px;font-weight:bold;letter-spacing:-1px;color:#14162B">CODE<sup style="font-size:10px;color:#4F5BF2">©</sup></td></tr>
<tr><td style="background:#FFFFFF;border-radius:24px;padding:34px 32px 30px;font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:1.65;color:#3B3F5C">
<div style="height:6px;width:56px;border-radius:6px;background:#4F5BF2;background-image:linear-gradient(90deg,#4F5BF2,#8A5CF6,#2BBBE6);margin:0 0 22px"></div>
<h1 style="margin:0 0 18px;font-family:Arial,Helvetica,sans-serif;font-size:24px;line-height:1.25;font-weight:bold;color:#14162B">${esc(f(tpl.heading))}</h1>
${bodyHtml(f(tpl.body))}
${tpl.button ? `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:8px 0 6px"><tr><td style="border-radius:999px;background:#4F5BF2"><a href="${esc(url)}" style="display:inline-block;padding:15px 30px;font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:bold;letter-spacing:.5px;color:#FFFFFF;text-decoration:none;border-radius:999px">${esc(f(tpl.button))}</a></td></tr></table>
<p style="margin:14px 0 0;font-size:12px;line-height:1.5;color:#8A8FAD">Кнопка не працює? Скопіюйте посилання: <a href="${esc(url)}" style="color:#8A8FAD">${esc(url)}</a></p>` : ''}
</td></tr>
<tr><td style="padding:20px 10px 0;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.6;color:#8A8FAD;text-align:center">
Питання? Просто відповідайте на цей лист або пишіть на <a href="mailto:${SUPPORT}" style="color:#8A8FAD">${SUPPORT}</a><br>
CODE · матриця долі за методом Наталії Ладіні · <a href="${esc(v.site_url || SITE)}" style="color:#8A8FAD">${esc(String(v.site_url || SITE).replace(/^https?:\/\//, ''))}</a><br>
Ви отримали цей лист, бо маєте акаунт у CODE.
</td></tr></table></td></tr></table></body></html>`;
  const text = [f(tpl.heading), '', f(tpl.body).replace(/\*\*/g, '').replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1 ($2)'), '', tpl.button ? `${f(tpl.button)}: ${url}` : '', '', `CODE · ${SUPPORT}`].join('\n');
  return { subject, html, text };
}
/* Supabase auth emails use Go-template variables instead of ours */
function forSupabase(tpl) {
  const t = { ...tpl, url: '{{ .ConfirmationURL }}' };
  const r = render(t, { name: 'друже', action_url: '{{ .ConfirmationURL }}', site_url: '{{ .SiteURL }}' });
  return { subject: r.subject, html: r.html.replace(/\{\{name\}\}/g, '') };
}
const merge = saved => DEFAULTS.map(d => ({ ...d, ...((saved || []).find(s => s.id === d.id) || {}) }));
module.exports = { DEFAULTS, VARS, SAMPLE, render, forSupabase, merge, SITE, SUPPORT };
