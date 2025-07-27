# Исправление RLS политик для таблицы leads

## Проблема
Ошибка 401 и сообщение "new row violates row-level security policy for table leads" означает, что RLS политики блокируют вставку данных.

## Решение

### 1. Откройте Supabase Dashboard
Перейдите в ваш проект Supabase: https://supabase.com/dashboard/project/xjhudvscvrpufkurnfcn

### 2. Перейдите в SQL Editor
В левом меню выберите "SQL Editor"

### 3. Проверьте текущие политики
Выполните эту команду, чтобы увидеть существующие политики:

```sql
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check 
FROM pg_policies 
WHERE tablename = 'leads';
```

### 4. Удалите старые политики (если есть)
Если есть старые политики, удалите их:

```sql
DROP POLICY IF EXISTS "Enable insert for all users" ON leads;
DROP POLICY IF EXISTS "Enable read access for all users" ON leads;
DROP POLICY IF EXISTS "Enable update for all users" ON leads;
DROP POLICY IF EXISTS "Enable delete for all users" ON leads;
```

### 5. Создайте новые политики
Выполните эти команды по очереди:

```sql
-- Включите RLS для таблицы leads
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
```

```sql
-- Политика для вставки данных (INSERT)
CREATE POLICY "leads_insert_policy" ON leads
FOR INSERT WITH CHECK (true);
```

```sql
-- Политика для чтения данных (SELECT)
CREATE POLICY "leads_select_policy" ON leads
FOR SELECT USING (true);
```

```sql
-- Политика для обновления данных (UPDATE)
CREATE POLICY "leads_update_policy" ON leads
FOR UPDATE USING (true) WITH CHECK (true);
```

```sql
-- Политика для удаления данных (DELETE)
CREATE POLICY "leads_delete_policy" ON leads
FOR DELETE USING (true);
```

### 6. Проверьте структуру таблицы leads
Убедитесь, что таблица имеет правильную структуру:

```sql
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'leads';
```

### 7. Если таблица leads не существует, создайте её
```sql
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

### 8. Альтернативное решение - отключить RLS
Если политики не нужны (только для разработки):

```sql
ALTER TABLE leads DISABLE ROW LEVEL SECURITY;
```

### 9. Проверьте результат
После выполнения команд:
1. Перейдите на страницу `/supabase-diagnostic` в вашем приложении
2. Проверьте, что все тесты проходят успешно
3. Попробуйте отправить тестовую заявку через форму контактов

## Примечание
- Выполняйте команды по одной
- После каждой команды нажимайте "Run" в SQL Editor
- Убедитесь, что команды выполнились без ошибок
- Если политики не работают, попробуйте отключить RLS полностью 