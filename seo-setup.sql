-- CODE · SEO сторінок сайту
-- Запустити один раз у Supabase → SQL Editor → Run. Безпечно запускати повторно.
-- Сайт читає SEO-налаштування сторінок (заголовки й описи для Google, адреси) — лише запис із ключем «seo».
-- Змінювати їх може тільки адмін (це вже дозволяє політика «settings admin»).
drop policy if exists "seo public read" on public.admin_settings;
create policy "seo public read" on public.admin_settings for select using (key = 'seo');
