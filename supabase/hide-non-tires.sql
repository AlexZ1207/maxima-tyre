-- Hide tubes and accessories from the public catalog.

update public.products
set is_published = false
where category <> 'tire';
