# 🗄️ Настройка Supabase для проекта

## 📋 Шаг 1: Создание проекта в Supabase

1. Перейдите на [supabase.com](https://supabase.com)
2. Создайте новый проект
3. Получите URL и API ключ из Settings → API

## 📋 Шаг 2: Создание файла .env

Создайте файл `.env` в корне проекта со следующим содержимым:

```bash
# Supabase Configuration
# Замените на ваши реальные данные из Supabase Dashboard
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here

# Google Sheets (оставляем для совместимости)
VITE_GOOGLE_SHEETS_URL=https://script.google.com/macros/s/AKfycbz-m7nEcW0EVE2KMDSIbiefpWk_ZxM9LveF3SVkQhCWdQB7G-WVgaL2f_C01Cy6VlF2nA/exec

# Contact Information
VITE_CONTACT_PHONE=+7 (999) 123-45-67
VITE_CONTACT_EMAIL=info@exploreitdubai.ru

# Development Settings
VITE_DEV_MODE=true
```

## 📋 Шаг 3: Создание таблиц в Supabase

### Таблица blog_articles

```sql
CREATE TABLE blog_articles (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT,
  image VARCHAR(500),
  author VARCHAR(100),
  date DATE DEFAULT CURRENT_DATE,
  read_time VARCHAR(50),
  category VARCHAR(100),
  tags TEXT[],
  views INTEGER DEFAULT 0,
  likes INTEGER DEFAULT 0,
  meta_title VARCHAR(255),
  meta_description TEXT,
  keywords TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Создание индексов для оптимизации
CREATE INDEX idx_blog_articles_slug ON blog_articles(slug);
CREATE INDEX idx_blog_articles_category ON blog_articles(category);
CREATE INDEX idx_blog_articles_created_at ON blog_articles(created_at DESC);
```

### Таблица leads

```sql
CREATE TABLE leads (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  phone VARCHAR(20),
  email VARCHAR(100),
  type VARCHAR(50),
  message TEXT,
  status VARCHAR(20) DEFAULT 'new',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Создание индексов для оптимизации
CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_leads_created_at ON leads(created_at DESC);
```

## 📋 Шаг 4: Настройка RLS (Row Level Security)

### Для таблицы blog_articles

```sql
-- Включаем RLS
ALTER TABLE blog_articles ENABLE ROW LEVEL SECURITY;

-- Политика для чтения (публичный доступ)
CREATE POLICY "Public read access" ON blog_articles
  FOR SELECT USING (true);

-- Политика для записи (только аутентифицированные пользователи)
CREATE POLICY "Authenticated users can insert" ON blog_articles
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Политика для обновления (только аутентифицированные пользователи)
CREATE POLICY "Authenticated users can update" ON blog_articles
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Политика для удаления (только аутентифицированные пользователи)
CREATE POLICY "Authenticated users can delete" ON blog_articles
  FOR DELETE USING (auth.role() = 'authenticated');
```

### Для таблицы leads

```sql
-- Включаем RLS
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Политика для записи (публичный доступ для заявок)
CREATE POLICY "Public insert access" ON leads
  FOR INSERT WITH CHECK (true);

-- Политика для чтения (только аутентифицированные пользователи)
CREATE POLICY "Authenticated users can read" ON leads
  FOR SELECT USING (auth.role() = 'authenticated');

-- Политика для обновления (только аутентифицированные пользователи)
CREATE POLICY "Authenticated users can update" ON leads
  FOR UPDATE USING (auth.role() = 'authenticated');
```

## 📋 Шаг 5: Тестирование подключения

Создайте компонент для тестирования подключения:

```typescript
// src/components/SupabaseTest.tsx
import React, { useEffect, useState } from 'react';
import { testSupabaseConnection, getSupabaseInfo } from '../utils/supabase';

export default function SupabaseTest() {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [info, setInfo] = useState<any>(null);

  useEffect(() => {
    const testConnection = async () => {
      const connected = await testSupabaseConnection();
      setIsConnected(connected);
      setInfo(getSupabaseInfo());
    };

    testConnection();
  }, []);

  if (isConnected === null) {
    return <div>Тестирование подключения...</div>;
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Тест подключения Supabase</h2>
      
      <div className="space-y-2">
        <div className={`p-2 rounded ${isConnected ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          Статус: {isConnected ? '✅ Подключено' : '❌ Ошибка подключения'}
        </div>
        
        {info && (
          <div className="text-sm text-gray-600">
            <div>URL: {info.url || 'Не настроен'}</div>
            <div>Ключ: {info.hasKey ? '✅ Настроен' : '❌ Не настроен'}</div>
            <div>Длина ключа: {info.keyLength}</div>
          </div>
        )}
      </div>
    </div>
  );
}
```

## 📋 Шаг 6: Добавление тестового маршрута

Добавьте в `src/App.tsx`:

```typescript
// Импорт
const SupabaseTest = lazy(() => import('./components/SupabaseTest'));

// В Routes добавьте:
{import.meta.env.DEV && (
  <>
    <Route path="/supabase-test" element={<SupabaseTest />} />
    <Route path="/admin" element={<AdminPanel />} />
    <Route path="/test-seo" element={<TestSEO />} />
    <Route path="/performance-monitor" element={<PerformanceMonitor />} />
    <Route path="/seo-analyzer" element={<SEOAnalyzer />} />
  </>
)}
```

## 📋 Шаг 7: Проверка работы

1. Запустите проект: `npm run dev`
2. Перейдите на: `http://localhost:5173/supabase-test`
3. Проверьте статус подключения

## 🔧 Устранение проблем

### Ошибка "VITE_SUPABASE_URL is not defined"
- Проверьте, что файл `.env` создан в корне проекта
- Убедитесь, что переменные начинаются с `VITE_`
- Перезапустите сервер разработки

### Ошибка "Invalid API key"
- Проверьте правильность API ключа
- Убедитесь, что используете `anon public`, а не `service_role`

### CORS ошибки
- В Supabase Dashboard: Settings → API → CORS
- Добавьте `http://localhost:5173` в список разрешенных доменов

## 📚 Дополнительные ресурсы

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security) 