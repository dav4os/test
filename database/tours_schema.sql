-- Создание таблицы категорий туров
CREATE TABLE IF NOT EXISTS tour_categories (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    icon VARCHAR(50) DEFAULT 'Globe',
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Создание таблицы туров
CREATE TABLE IF NOT EXISTS tours (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    category VARCHAR(50) NOT NULL REFERENCES tour_categories(id),
    image_url TEXT,
    price VARCHAR(50) NOT NULL,
    duration VARCHAR(50) NOT NULL,
    group_size VARCHAR(50) NOT NULL,
    rating DECIMAL(3,2) DEFAULT 0,
    reviews_count INTEGER DEFAULT 0,
    description TEXT NOT NULL,
    highlights TEXT[] DEFAULT '{}',
    included TEXT[] DEFAULT '{}',
    schedule JSONB DEFAULT '[]',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Создание индексов для оптимизации
CREATE INDEX IF NOT EXISTS idx_tours_category ON tours(category);
CREATE INDEX IF NOT EXISTS idx_tours_active ON tours(is_active);
CREATE INDEX IF NOT EXISTS idx_tours_rating ON tours(rating);
CREATE INDEX IF NOT EXISTS idx_tours_created_at ON tours(created_at);

-- Вставка базовых категорий
INSERT INTO tour_categories (id, name, icon, sort_order) VALUES
('all', 'Все экскурсии', 'Globe', 0),
('city', 'Городские', 'MapPin', 1),
('desert', 'Пустыня', 'Route', 2),
('premium', 'Премиум', 'Star', 3),
('cultural', 'Культурные', 'Award', 4)
ON CONFLICT (id) DO NOTHING;

-- Вставка тестовых туров
INSERT INTO tours (title, category, image_url, price, duration, group_size, rating, reviews_count, description, highlights, included, schedule) VALUES
(
    'Дубай Премиум',
    'premium',
    '/optimized/pexels-apasaric-2044434.webp',
    '2,500 AED',
    '3 дня',
    '2-6 человек',
    4.9,
    127,
    'Эксклюзивный тур по самым знаковым достопримечательностям Дубая с профессиональным гидом и VIP-обслуживанием.',
    ARRAY['Бурдж-Халифа с пропуском очереди', 'Пальма Джумейра и Атлантис', 'Музей будущего', 'Фонтан Дубай', 'Молл Дубай', 'Круиз по заливу'],
    ARRAY['Трансфер из отеля', 'Профессиональный гид', 'Входные билеты', 'Обед в ресторане', 'Фотосессия', 'Страховка'],
    '[{"day": "День 1", "activities": ["Встреча в отеле", "Бурдж-Халифа", "Музей будущего", "Обед", "Фонтан Дубай"]}, {"day": "День 2", "activities": ["Пальма Джумейра", "Атлантис", "Молл Дубай", "Шоппинг", "Ужин"]}, {"day": "День 3", "activities": ["Круиз по заливу", "Фотосессия", "Свободное время", "Трансфер в отель"]}]'
),
(
    'Пустынное сафари',
    'desert',
    '/optimized/pexels-bubi-2867769.webp',
    '450 AED',
    '1 день',
    '4-8 человек',
    4.8,
    89,
    'Захватывающее приключение в пустыне с джип-сафари, катанием на верблюдах и традиционным ужином.',
    ARRAY['Джип-сафари по дюнам', 'Катание на верблюдах', 'Санбординг', 'Традиционный ужин', 'Танцы живота', 'Фотосессия на закате'],
    ARRAY['Трансфер из отеля', 'Джип-сафари', 'Ужин в пустыне', 'Развлечения', 'Фотосессия', 'Страховка'],
    '[{"day": "Вечер", "activities": ["Встреча в отеле", "Джип-сафари", "Катание на верблюдах", "Ужин", "Развлечения", "Возвращение"]}]'
),
(
    'Абу-Даби Тур',
    'cultural',
    '/optimized/pexels-lina-12238221.webp',
    '800 AED',
    '2 дня',
    '2-6 человек',
    4.7,
    64,
    'Погружение в культуру и историю столицы ОАЭ с посещением мечети Шейха Зайда и других достопримечательностей.',
    ARRAY['Мечеть Шейха Зайда', 'Лувр Абу-Даби', 'Дворец Эмиратов', 'Корниш', 'Яс Марина', 'Феррари Уорлд'],
    ARRAY['Трансфер из Дубая', 'Профессиональный гид', 'Входные билеты', 'Обеды', 'Размещение в отеле', 'Страховка'],
    '[{"day": "День 1", "activities": ["Выезд из Дубая", "Мечеть Шейха Зайда", "Лувр Абу-Даби", "Обед", "Корниш", "Размещение"]}, {"day": "День 2", "activities": ["Завтрак", "Дворец Эмиратов", "Яс Марина", "Феррари Уорлд", "Возвращение в Дубай"]}]'
),
(
    'Дубай Классик',
    'city',
    '/optimized/pexels-pixabay-162031.webp',
    '350 AED',
    '1 день',
    '6-12 человек',
    4.6,
    156,
    'Классический тур по основным достопримечательностям Дубая для знакомства с городом.',
    ARRAY['Бурдж-Халифа', 'Дубай Молл', 'Фонтан Дубай', 'Музей Дубая', 'Бастакия', 'Круиз по заливу'],
    ARRAY['Трансфер из отеля', 'Гид', 'Входные билеты', 'Обед', 'Круиз', 'Страховка'],
    '[{"day": "День", "activities": ["Встреча в отеле", "Бурдж-Халифа", "Дубай Молл", "Обед", "Музей Дубая", "Круиз", "Возвращение"]}]'
),
(
    'Шарджа Культурная',
    'cultural',
    '/optimized/pexels-04iraq-1272398525-29098431.webp',
    '280 AED',
    '1 день',
    '4-8 человек',
    4.5,
    42,
    'Культурное путешествие в Шарджу - культурную столицу ОАЭ с посещением музеев и исторических мест.',
    ARRAY['Музей исламской цивилизации', 'Художественная галерея', 'Рынок Аль-Арса', 'Мечеть Аль-Нур', 'Набережная Аль-Маджаз', 'Традиционный обед'],
    ARRAY['Трансфер из Дубая', 'Гид', 'Входные билеты', 'Обед', 'Страховка'],
    '[{"day": "День", "activities": ["Выезд из Дубая", "Музей исламской цивилизации", "Художественная галерея", "Обед", "Рынок", "Возвращение"]}]'
),
(
    'Яхта Премиум',
    'premium',
    '/optimized/pexels-egeardaphotos-2148533277-30313376.webp',
    '1,200 AED',
    '1 день',
    '2-8 человек',
    4.9,
    73,
    'Роскошный круиз на частной яхте по Персидскому заливу с обедом и развлечениями.',
    ARRAY['Частная яхта', 'Круиз по заливу', 'Обед на борту', 'Купание в море', 'Фотосессия', 'Закат на яхте'],
    ARRAY['Трансфер к причалу', 'Частная яхта', 'Обед и напитки', 'Экипаж', 'Снаряжение для купания', 'Страховка'],
    '[{"day": "День", "activities": ["Встреча у причала", "Выход в море", "Купание", "Обед", "Фотосессия", "Закат", "Возвращение"]}]'
)
ON CONFLICT DO NOTHING;

-- Создание RLS политик для безопасности
ALTER TABLE tours ENABLE ROW LEVEL SECURITY;
ALTER TABLE tour_categories ENABLE ROW LEVEL SECURITY;

-- Политика для чтения туров (публичный доступ)
CREATE POLICY "Allow public read access to tours" ON tours
    FOR SELECT USING (is_active = true);

-- Политика для чтения категорий (публичный доступ)
CREATE POLICY "Allow public read access to tour_categories" ON tour_categories
    FOR SELECT USING (true); 