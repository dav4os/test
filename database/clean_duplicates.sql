-- Очистка дублирующих категорий
-- Удаляем все записи категории 'all' из базы данных
DELETE FROM tour_categories WHERE id = 'all';

-- Проверяем, что дубликатов больше нет
SELECT id, name, icon, sort_order, COUNT(*) as count
FROM tour_categories 
GROUP BY id, name, icon, sort_order 
HAVING COUNT(*) > 1;

-- Показываем все категории после очистки
SELECT * FROM tour_categories ORDER BY sort_order; 