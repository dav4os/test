# Исправление ошибки 401 в Supabase

## Проблема
Ошибка 401 означает, что Row Level Security (RLS) политики блокируют вставку данных в таблицу `leads`.

## Решение

### 1. Откройте Supabase Dashboard
Перейдите в ваш проект Supabase: https://supabase.com/dashboard/project/xjhudvscvrpufkurnfcn

### 2. Перейдите в SQL Editor
В левом меню выберите "SQL Editor"

### 3. Выполните следующие команды по очереди:

#### Шаг 1: Включите RLS для таблицы leads
```sql
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
```

#### Шаг 2: Создайте политику для вставки данных (INSERT)
```sql
CREATE POLICY "Enable insert for all users" ON leads
FOR INSERT WITH CHECK (true);
```

#### Шаг 3: Создайте политику для чтения данных (SELECT)
```sql
CREATE POLICY "Enable read access for all users" ON leads
FOR SELECT USING (true);
```

#### Шаг 4: Создайте политику для обновления данных (UPDATE)
```sql
CREATE POLICY "Enable update for all users" ON leads
FOR UPDATE USING (true) WITH CHECK (true);
```

#### Шаг 5: Создайте политику для удаления данных (DELETE)
```sql
CREATE POLICY "Enable delete for all users" ON leads
FOR DELETE USING (true);
```

### 4. Проверьте таблицу blog_articles
Убедитесь, что для таблицы `blog_articles` тоже настроены политики:

```sql
-- Включите RLS
ALTER TABLE blog_articles ENABLE ROW LEVEL SECURITY;

-- Политика для чтения
CREATE POLICY "Enable read access for all users" ON blog_articles
FOR SELECT USING (true);

-- Политика для вставки
CREATE POLICY "Enable insert for all users" ON blog_articles
FOR INSERT WITH CHECK (true);

-- Политика для обновления
CREATE POLICY "Enable update for all users" ON blog_articles
FOR UPDATE USING (true) WITH CHECK (true);

-- Политика для удаления
CREATE POLICY "Enable delete for all users" ON blog_articles
FOR DELETE USING (true);
```

### 5. Проверьте результат
После выполнения всех команд:
1. Перейдите на страницу `/supabase-diagnostic` в вашем приложении
2. Проверьте, что все тесты проходят успешно
3. Попробуйте отправить тестовую заявку через форму контактов

## Альтернативное решение (если политики не нужны)

Если вы хотите отключить RLS полностью (не рекомендуется для продакшена):

```sql
ALTER TABLE leads DISABLE ROW LEVEL SECURITY;
ALTER TABLE blog_articles DISABLE ROW LEVEL SECURITY;
```

## Примечание
- Выполняйте команды по одной
- После каждой команды нажимайте "Run" в SQL Editor
- Убедитесь, что команды выполнились без ошибок 