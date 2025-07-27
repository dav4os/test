# Исправление ошибки "column email does not exist"

## Проблема
В таблице `leads` отсутствует колонка `email`, которая нужна для работы приложения.

## Решение

### 1. Откройте Supabase Dashboard
Перейдите в ваш проект Supabase: https://supabase.com/dashboard/project/xjhudvscvrpufkurnfcn

### 2. Перейдите в SQL Editor
В левом меню выберите "SQL Editor"

### 3. Добавьте колонку email
Выполните эту команду:

```sql
ALTER TABLE leads ADD COLUMN email TEXT;
```

### 4. Проверьте структуру таблицы
Выполните эту команду, чтобы увидеть все колонки:

```sql
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'leads';
```

### 5. Если нужно пересоздать таблицу
Если возникнут проблемы, можно пересоздать таблицу с правильной структурой:

```sql
-- Удалить старую таблицу (осторожно!)
DROP TABLE IF EXISTS leads;

-- Создать новую таблицу с правильной структурой
CREATE TABLE leads (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  type TEXT,
  message TEXT,
  status TEXT DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 6. Настройте RLS политики (если еще не настроены)
После создания таблицы настройте политики:

```sql
-- Включите RLS
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Политика для вставки
CREATE POLICY "Enable insert for all users" ON leads
FOR INSERT WITH CHECK (true);

-- Политика для чтения
CREATE POLICY "Enable read access for all users" ON leads
FOR SELECT USING (true);

-- Политика для обновления
CREATE POLICY "Enable update for all users" ON leads
FOR UPDATE USING (true) WITH CHECK (true);

-- Политика для удаления
CREATE POLICY "Enable delete for all users" ON leads
FOR DELETE USING (true);
```

### 7. Проверьте результат
После выполнения команд:
1. Перейдите на страницу `/supabase-diagnostic` в вашем приложении
2. Проверьте, что все тесты проходят успешно
3. Попробуйте отправить тестовую заявку через форму контактов

## Примечание
- Выполняйте команды по одной
- После каждой команды нажимайте "Run" в SQL Editor
- Убедитесь, что команды выполнились без ошибок 