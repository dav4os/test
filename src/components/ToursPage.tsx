import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useContactModal } from '../hooks/useContactModal';
import ContactModal from './ContactModal';
import { 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  Users, 
  Clock, 
  Star, 
  Shield, 
  Route, 
  Plane, 
  Compass, 
  Heart, 
  Menu, 
  X,
  Car,
  Camera,
  Globe,
  Award,
  CheckCircle
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';

function ToursPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { isModalOpen, openModal, closeModal } = useContactModal();

  const navigationLinks = [
    { label: 'Главная', href: '/' },
    { label: 'Экскурсии', href: '/tours', active: true },
    { label: 'Аренда авто', href: '/rental' },
    { label: 'О нас', href: '/about' },
    { label: 'Блог', href: '/blog' },
    { label: 'Контакты', href: '#contacts' }
  ];

  const categories = [
    { id: 'all', label: 'Все экскурсии', icon: Globe },
    { id: 'city', label: 'Городские', icon: MapPin },
    { id: 'desert', label: 'Пустыня', icon: Route },
    { id: 'premium', label: 'Премиум', icon: Star },
    { id: 'cultural', label: 'Культурные', icon: Award }
  ];

  const tours = [
    {
      id: 1,
      title: 'Дубай Премиум',
      category: 'premium',
      image: '/pexels-apasaric-2044434.webp',
      price: '2,500 AED',
      duration: '3 дня',
      groupSize: '2-6 человек',
      rating: 4.9,
      reviews: 127,
      description: 'Эксклюзивный тур по самым знаковым достопримечательностям Дубая с профессиональным гидом и VIP-обслуживанием.',
      highlights: [
        'Бурдж-Халифа с пропуском очереди',
        'Пальма Джумейра и Атлантис',
        'Музей будущего',
        'Фонтан Дубай',
        'Молл Дубай',
        'Круиз по заливу'
      ],
      included: [
        'Трансфер из отеля',
        'Профессиональный гид',
        'Входные билеты',
        'Обед в ресторане',
        'Фотосессия',
        'Страховка'
      ],
      schedule: [
        { day: 'День 1', activities: ['Встреча в отеле', 'Бурдж-Халифа', 'Музей будущего', 'Обед', 'Фонтан Дубай'] },
        { day: 'День 2', activities: ['Пальма Джумейра', 'Атлантис', 'Молл Дубай', 'Шоппинг', 'Ужин'] },
        { day: 'День 3', activities: ['Круиз по заливу', 'Фотосессия', 'Свободное время', 'Трансфер в отель'] }
      ]
    },
    {
      id: 2,
      title: 'Пустынное сафари',
      category: 'desert',
      image: '/pexels-bubi-2867769.webp',
      price: '450 AED',
      duration: '1 день',
      groupSize: '4-8 человек',
      rating: 4.8,
      reviews: 89,
      description: 'Захватывающее приключение в пустыне с джип-сафари, катанием на верблюдах и традиционным ужином.',
      highlights: [
        'Джип-сафари по дюнам',
        'Катание на верблюдах',
        'Санбординг',
        'Традиционный ужин',
        'Танцы живота',
        'Фотосессия на закате'
      ],
      included: [
        'Трансфер из отеля',
        'Джип-сафари',
        'Ужин в пустыне',
        'Развлечения',
        'Фотосессия',
        'Страховка'
      ],
      schedule: [
        { day: 'Вечер', activities: ['Встреча в отеле', 'Джип-сафари', 'Катание на верблюдах', 'Ужин', 'Развлечения', 'Возвращение'] }
      ]
    },
    {
      id: 3,
      title: 'Абу-Даби Тур',
      category: 'cultural',
      image: '/pexels-lina-12238221.webp',
      price: '800 AED',
      duration: '2 дня',
      groupSize: '2-6 человек',
      rating: 4.7,
      reviews: 64,
      description: 'Погружение в культуру и историю столицы ОАЭ с посещением мечети Шейха Зайда и других достопримечательностей.',
      highlights: [
        'Мечеть Шейха Зайда',
        'Лувр Абу-Даби',
        'Дворец Эмиратов',
        'Корниш',
        'Яс Марина',
        'Феррари Уорлд'
      ],
      included: [
        'Трансфер из Дубая',
        'Профессиональный гид',
        'Входные билеты',
        'Обеды',
        'Размещение в отеле',
        'Страховка'
      ],
      schedule: [
        { day: 'День 1', activities: ['Выезд из Дубая', 'Мечеть Шейха Зайда', 'Лувр Абу-Даби', 'Обед', 'Корниш', 'Размещение'] },
        { day: 'День 2', activities: ['Завтрак', 'Дворец Эмиратов', 'Яс Марина', 'Феррари Уорлд', 'Возвращение в Дубай'] }
      ]
    },
    {
      id: 4,
      title: 'Дубай Классик',
      category: 'city',
      image: '/pexels-pixabay-162031.webp',
      price: '350 AED',
      duration: '1 день',
      groupSize: '6-12 человек',
      rating: 4.6,
      reviews: 156,
      description: 'Классический тур по основным достопримечательностям Дубая для знакомства с городом.',
      highlights: [
        'Бурдж-Халифа',
        'Дубай Молл',
        'Фонтан Дубай',
        'Музей Дубая',
        'Бастакия',
        'Круиз по заливу'
      ],
      included: [
        'Трансфер из отеля',
        'Гид',
        'Входные билеты',
        'Обед',
        'Круиз',
        'Страховка'
      ],
      schedule: [
        { day: 'День', activities: ['Встреча в отеле', 'Бурдж-Халифа', 'Дубай Молл', 'Обед', 'Музей Дубая', 'Круиз', 'Возвращение'] }
      ]
    },
    {
      id: 5,
      title: 'Шарджа Культурная',
      category: 'cultural',
      image: '/pexels-04iraq-1272398525-29098431.webp',
      price: '280 AED',
      duration: '1 день',
      groupSize: '4-8 человек',
      rating: 4.5,
      reviews: 42,
      description: 'Культурное путешествие в Шарджу - культурную столицу ОАЭ с посещением музеев и исторических мест.',
      highlights: [
        'Музей исламской цивилизации',
        'Художественная галерея',
        'Рынок Аль-Арса',
        'Мечеть Аль-Нур',
        'Набережная Аль-Маджаз',
        'Традиционный обед'
      ],
      included: [
        'Трансфер из Дубая',
        'Гид',
        'Входные билеты',
        'Обед',
        'Страховка'
      ],
      schedule: [
        { day: 'День', activities: ['Выезд из Дубая', 'Музей исламской цивилизации', 'Художественная галерея', 'Обед', 'Рынок', 'Возвращение'] }
      ]
    },
    {
      id: 6,
      title: 'Яхта Премиум',
      category: 'premium',
      image: '/pexels-egeardaphotos-2148533277-30313376.webp',
      price: '1,200 AED',
      duration: '1 день',
      groupSize: '2-8 человек',
      rating: 4.9,
      reviews: 73,
      description: 'Роскошный круиз на частной яхте по Персидскому заливу с обедом и развлечениями.',
      highlights: [
        'Частная яхта',
        'Круиз по заливу',
        'Обед на борту',
        'Купание в море',
        'Фотосессия',
        'Закат на яхте'
      ],
      included: [
        'Трансфер к причалу',
        'Частная яхта',
        'Обед и напитки',
        'Экипаж',
        'Снаряжение для купания',
        'Страховка'
      ],
      schedule: [
        { day: 'День', activities: ['Встреча у причала', 'Выход в море', 'Купание', 'Обед', 'Фотосессия', 'Закат', 'Возвращение'] }
      ]
    }
  ];

  const filteredTours = selectedCategory === 'all' 
    ? tours 
    : tours.filter(tour => tour.category === selectedCategory);

  return (
    <>
      <Helmet>
        <title>Экскурсии в Дубае — Explore IT Dubai</title>
        <meta name="description" content="Забронируйте эксклюзивные экскурсии в Дубае и ОАЭ. Индивидуальные туры, групповые экскурсии, пустынное сафари и круизы на яхтах." />
        <meta name="keywords" content="экскурсии Дубай, туры ОАЭ, пустынное сафари, Бурдж-Халифа, яхта Дубай, индивидуальные туры" />
        <link rel="canonical" href="https://exploreitdubai.ru/tours" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
        {/* Navigation */}
        <nav className="bg-white/95 backdrop-blur-sm shadow-lg sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <Link to="/" className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg">
                  <Compass size={20} className="text-white" />
                </div>
                <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">
                  Explore IT
                </h1>
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center gap-8">
                {navigationLinks.map((link) => (
                  <Link
                    key={link.label}
                    to={link.href}
                    className={`font-medium transition-colors duration-300 ${
                      link.active 
                        ? 'text-amber-600' 
                        : 'text-gray-600 hover:text-amber-600'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-amber-50 transition-colors duration-300"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

            {/* Mobile Navigation */}
            {isMobileMenuOpen && (
              <div className="md:hidden py-4 border-t border-gray-200">
                <div className="flex flex-col gap-4">
                  {navigationLinks.map((link) => (
                    <Link
                      key={link.label}
                      to={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`font-medium transition-colors duration-300 ${
                        link.active 
                          ? 'text-amber-600' 
                          : 'text-gray-600 hover:text-amber-600'
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Hero Section */}
        <section className="relative py-20 px-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white">
          <div className="max-w-7xl mx-auto text-center">
            <div className="mb-8">
              <Link 
                to="/" 
                className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors duration-300 mb-4"
              >
                <ArrowLeft size={20} />
                Вернуться на главную
              </Link>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Экскурсии в Дубае
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
              Откройте для себя магию Объединенных Арабских Эмиратов с нашими эксклюзивными турами
            </p>
            
            {/* CTA Button */}
            <button
              onClick={openModal}
              className="group relative px-8 py-4 bg-white text-amber-600 font-bold text-lg rounded-full shadow-2xl hover:shadow-white/25 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 inline-flex items-center gap-2"
            >
              <Calendar size={20} />
              Забронировать экскурсию
              <div className="absolute inset-0 bg-gradient-to-r from-amber-50 to-orange-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
            </button>
          </div>
        </section>

        {/* Categories Filter */}
        <section className="py-12 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                      selectedCategory === category.id
                        ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg transform scale-105'
                        : 'bg-white text-gray-600 hover:bg-amber-50 hover:text-amber-600 shadow-sm hover:shadow-md'
                    }`}
                  >
                    <IconComponent size={18} />
                    {category.label}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Tours Grid */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {filteredTours.map((tour) => (
                <div
                  key={tour.id}
                  className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden group"
                >
                  {/* Tour Image */}
                  <div className="relative overflow-hidden h-80">
                    <img
                      src={tour.image}
                      alt={tour.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-semibold text-amber-600">
                      {tour.duration}
                    </div>
                    <div className="absolute bottom-6 left-6">
                      <h3 className="text-3xl font-bold text-white mb-2">{tour.title}</h3>
                      <div className="flex items-center gap-2 text-amber-300">
                        <Star size={20} fill="currentColor" />
                        <span className="text-white font-semibold">{tour.rating}</span>
                        <span className="text-white/80">({tour.reviews} отзывов)</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-8">
                    {/* Description */}
                    <p className="text-gray-700 leading-relaxed mb-6">
                      {tour.description}
                    </p>

                    {/* Tour Details */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar size={16} className="text-amber-500" />
                          <span className="text-gray-600">Длительность: <strong>{tour.duration}</strong></span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Users size={16} className="text-amber-500" />
                          <span className="text-gray-600">Группа: <strong>{tour.groupSize}</strong></span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin size={16} className="text-amber-500" />
                          <span className="text-gray-600">Категория: <strong>{categories.find(c => c.id === tour.category)?.label}</strong></span>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-sm">
                          <Shield size={16} className="text-amber-500" />
                          <span className="text-gray-600">Страховка: <strong>Включена</strong></span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Car size={16} className="text-amber-500" />
                          <span className="text-gray-600">Трансфер: <strong>Включен</strong></span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Camera size={16} className="text-amber-500" />
                          <span className="text-gray-600">Фото: <strong>Включено</strong></span>
                        </div>
                      </div>
                    </div>

                    {/* Highlights */}
                    <div className="mb-6">
                      <h4 className="text-lg font-bold text-gray-800 mb-3">Основные достопримечательности:</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {tour.highlights.map((highlight, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm">
                            <CheckCircle size={14} className="text-green-500 flex-shrink-0" />
                            <span className="text-gray-600">{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Price and Action */}
                    <div className="flex items-center justify-between">
                      <div className="text-3xl font-bold text-amber-600">
                        {tour.price}
                      </div>
                      <button
                        onClick={openModal}
                        className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                      >
                        Забронировать
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                Почему выбирают нас
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-orange-500 mx-auto rounded-full"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: Shield,
                  title: 'Без предоплат*',
                  description: 'Оплачивайте только после получения услуги. Индивидуальные экскурсии оплачиваются заранее*.'
                },
                {
                  icon: Route,
                  title: 'Авторские маршруты',
                  description: 'Уникальные программы от местных экспертов'
                },
                {
                  icon: Plane,
                  title: 'Трансфер включен',
                  description: 'Комфортная доставка до места назначения'
                },
                {
                  icon: Award,
                  title: 'Гарантия качества',
                  description: 'Профессиональные гиды и лучшие условия'
                }
              ].map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <div
                    key={index}
                    className="text-center group bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2"
                  >
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl shadow-lg mb-4 group-hover:shadow-2xl transition-all duration-300 transform group-hover:scale-110">
                      <IconComponent size={28} className="text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-20 px-4 bg-gradient-to-r from-amber-100 to-orange-100">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              Готовы к приключениям?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Свяжитесь с нами для бронирования экскурсии или получения консультации
            </p>
            <button
              onClick={openModal}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              <Calendar size={20} />
              Забронировать экскурсию
            </button>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-800 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg">
                <Compass size={20} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-400">
                Explore IT
              </h3>
            </div>
            <p className="text-gray-300 mb-6">Откройте для себя магию Объединенных Арабских Эмиратов</p>
            <nav className="flex justify-center gap-6" role="navigation" aria-label="Футер навигация">
              <Link to="/" className="text-gray-300 hover:text-amber-400 transition-colors duration-300">
                Главная
              </Link>
              <Link to="/blog" className="text-gray-300 hover:text-amber-400 transition-colors duration-300">
                Блог
              </Link>
              <Link to="/about" className="text-gray-300 hover:text-amber-400 transition-colors duration-300">
                О нас
              </Link>
              <Link to="/rental" className="text-gray-300 hover:text-amber-400 transition-colors duration-300">
                Аренда авто
              </Link>
              <a href="tel:+79166508005" className="text-gray-300 hover:text-amber-400 transition-colors duration-300">
                Контакты
              </a>
            </nav>
          </div>
        </footer>
      </div>

      {/* Contact Modal */}
      <ContactModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
}

export default ToursPage; 