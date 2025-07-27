# Исправление ошибки "column email does not exist" в blog_articles

## Проблема
В таблице `blog_articles` отсутствует колонка `email`, которая нужна для работы приложения.

## Решение

### 1. Откройте Supabase Dashboard
Перейдите в ваш проект Supabase: https://supabase.com/dashboard/project/xjhudvscvrpufkurnfcn

### 2. Перейдите в SQL Editor
В левом меню выберите "SQL Editor"

### 3. Проверьте текущую структуру таблицы blog_articles
Выполните эту команду, чтобы увидеть все колонки:

```sql
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'blog_articles';
```

### 4. Пересоздайте таблицу blog_articles с правильной структурой
Выполните эти команды по очереди:

```sql
-- Удалить старую таблицу
DROP TABLE IF EXISTS blog_articles;
```

```sql
-- Создать новую таблицу с правильной структурой
CREATE TABLE blog_articles (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT,
  author TEXT,
  date TEXT,
  image_url TEXT,
  views INTEGER DEFAULT 0,
  likes INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 5. Добавьте тестовые данные
```sql
-- Вставить тестовые статьи
INSERT INTO blog_articles (title, excerpt, content, author, date, image_url) VALUES
('Лучшие экскурсии в Дубае', 'Откройте для себя самые интересные места Дубая', 'Полный текст статьи о лучших экскурсиях в Дубае...', 'Команда Explore IT Dubai', '2024-01-15', '/pexels-avinashpatel-544542.jpg'),
('Аренда авто в ОАЭ: полное руководство', 'Все что нужно знать об аренде автомобиля в ОАЭ', 'Подробное руководство по аренде автомобиля в ОАЭ...', 'Команда Explore IT Dubai', '2024-01-20', '/pexels-bubi-2867769.jpg'),
('Топ-10 достопримечательностей Дубая', 'Самые популярные места для посещения', 'Обзор самых популярных достопримечательностей Дубая...', 'Команда Explore IT Dubai', '2024-01-25', '/pexels-pixabay-162031.jpg');
```

### 6. Настройте RLS политики для blog_articles
```sql
-- Включите RLS
ALTER TABLE blog_articles ENABLE ROW LEVEL SECURITY;
```

```sql
-- Политика для чтения (всем пользователям)
CREATE POLICY "Enable read access for all users" ON blog_articles
FOR SELECT USING (true);
```

```sql
-- Политика для вставки (для админов)
CREATE POLICY "Enable insert for all users" ON blog_articles
FOR INSERT WITH CHECK (true);
```

```sql
-- Политика для обновления (для админов)
CREATE POLICY "Enable update for all users" ON blog_articles
FOR UPDATE USING (true) WITH CHECK (true);
```

```sql
-- Политика для удаления (для админов)
CREATE POLICY "Enable delete for all users" ON blog_articles
FOR DELETE USING (true);
```

### 7. Проверьте результат
После выполнения команд:
1. Перейдите на страницу `/supabase-diagnostic` в вашем приложении
2. Проверьте, что все тесты проходят успешно
3. Попробуйте отправить тестовую заявку через форму контактов
4. Проверьте, что статьи отображаются на странице блога

## Примечание
- Выполняйте команды по одной
- После каждой команды нажимайте "Run" в SQL Editor
- Убедитесь, что команды выполнились без ошибок
- Если возникнут ошибки, проверьте, что таблица была удалена перед созданием новой 