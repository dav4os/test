# Explore IT - Туристическое агентство в Дубае

Современный веб-сайт туристического агентства с экскурсиями по ОАЭ и арендой автомобилей.

## 🚀 Технологии

- **React 18** с TypeScript
- **Vite** для быстрой разработки
- **Tailwind CSS** для стилизации
- **React Router** для навигации
- **Lucide React** для иконок
- **React Helmet Async** для SEO

## 📦 Установка

1. Клонируйте репозиторий:
```bash
git clone https://github.com/your-username/explore-it-website.git
cd explore-it-website
```

2. Установите зависимости:
```bash
npm install
```

3. Настройте переменные окружения:
```bash
cp .env.example .env
```

4. Отредактируйте файл `.env` и заполните необходимые значения:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_GA_TRACKING_ID=G-XXXXXXXXXX
```

5. Запустите проект в режиме разработки:
```bash
npm run dev
```

## 🛠️ Команды

- `npm run dev` - Запуск в режиме разработки
- `npm run build` - Сборка для продакшена
- `npm run preview` - Предварительный просмотр сборки
- `npm run lint` - Проверка кода ESLint

## 📁 Структура проекта

```
src/
├── components/          # React компоненты
│   ├── HomePage.tsx     # Главная страница
│   ├── BlogPage.tsx     # Страница блога
│   ├── AboutPage.tsx    # О нас
│   └── ...
├── data/               # Данные приложения
├── hooks/              # Пользовательские хуки
├── utils/              # Утилиты
└── types/              # TypeScript типы
```

## 🔧 Настройка переменных окружения

Создайте файл `.env` на основе `.env.example`:

### Обязательные переменные:
- `VITE_SUPABASE_URL` - URL вашего Supabase проекта
- `VITE_SUPABASE_ANON_KEY` - Публичный ключ Supabase

### Опциональные переменные:
- `VITE_GA_TRACKING_ID` - Google Analytics ID
- `VITE_CONTACT_PHONE` - Контактный телефон
- `VITE_CONTACT_EMAIL` - Контактный email

## 🌐 Деплой

### Netlify
1. Подключите репозиторий к Netlify
2. Настройте переменные окружения в панели Netlify
3. Команда сборки: `npm run build`
4. Папка публикации: `dist`

### Vercel
1. Подключите репозиторий к Vercel
2. Настройте переменные окружения
3. Деплой произойдет автоматически

## 📱 Функциональность

- ✅ Адаптивный дизайн
- ✅ SEO оптимизация
- ✅ Быстрая загрузка
- ✅ Современный UI/UX
- ✅ Блог система
- ✅ Форма обратной связи
- ✅ Каталог экскурсий
- ✅ Аренда автомобилей

## 🔍 SEO

Проект включает:
- Meta теги для всех страниц
- Open Graph разметку
- Структурированные данные (JSON-LD)
- Sitemap.xml
- Robots.txt
- Семантическую HTML разметку

## 📊 Аналитика

Интегрирована поддержка:
- Google Analytics 4
- Отслеживание конверсий
- Метрики производительности

## 🤝 Вклад в проект

1. Форкните репозиторий
2. Создайте ветку для новой функции
3. Внесите изменения
4. Создайте Pull Request

## 📄 Лицензия

MIT License

## 📞 Контакты

- **Телефон**: +971 50 123 4567
- **Email**: info@exploreit.ae
- **Сайт**: https://exploreit.ae

---

Сделано с ❤️ для путешественников в ОАЭ