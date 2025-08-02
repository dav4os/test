import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useContactModal } from '../hooks/useContactModal';
import ContactModal from './ContactModal';
import OptimizedImage from './OptimizedImage';
import { 
  ArrowLeft, 
  Compass, 
  Anchor, 
  Calendar, 
  Users, 
  Gauge, 
  MapPin, 
  Settings, 
  Clock, 
  Phone, 
  Mail,
  Star,
  Shield,
  CheckCircle,
  Menu,
  X,
  Waves,
  Sailboat,
  Ship,
  Anchor as AnchorIcon,
  Wind,
  Navigation,
  LifeBuoy
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';

function YachtRentalPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('day');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isModalOpen, openModal, closeModal } = useContactModal();

  const navigationLinks = [
    { label: 'Главная', href: '/' },
    { label: 'Экскурсии', href: '/tours' },
    { label: 'Аренда авто', href: '/rental' },
    { label: 'Аренда яхт', href: '/yacht-rental', active: true },
    { label: 'О нас', href: '/about' },
    { label: 'Блог', href: '/blog' },
    { label: 'Контакты', href: '#contacts' }
  ];

  const yachts = [
    {
      id: 1,
      name: 'Luxury Motor Yacht',
      image: '/pexels-diego-f-parra-33199-843633.jpg',
      description: 'Роскошная моторная яхта для незабываемого отдыха на воде. Идеально подходит для корпоративных мероприятий, свадеб и частных вечеринок. Включает в себя все необходимые удобства для комфортного пребывания на борту.',
      specs: {
        length: '24 метра',
        capacity: '12 гостей',
        cabins: '4 каюты',
        crew: '3 члена экипажа',
        maxSpeed: '25 узлов',
        year: '2023',
        type: 'Моторная яхта'
      },
      features: [
        'Панорамные окна',
        'Солнечная палуба',
        'Джакузи',
        'Бар и кухня',
        'Wi-Fi на борту',
        'Система кондиционирования'
      ],
      pricing: {
        day: { aed: 2500, usd: 680 },
        week: { aed: 15000, usd: 4080 },
        month: { aed: 50000, usd: 13600 }
      }
    },
    {
      id: 2,
      name: 'Sailing Catamaran',
      image: '/pexels-pixabay-163236.jpg',
      description: 'Элегантный парусный катамаран для истинных ценителей морских путешествий. Стабильная конструкция обеспечивает комфортное плавание даже в открытом море. Идеален для семейного отдыха и романтических круизов.',
      specs: {
        length: '18 метров',
        capacity: '8 гостей',
        cabins: '3 каюты',
        crew: '2 члена экипажа',
        maxSpeed: '12 узлов',
        year: '2022',
        type: 'Парусный катамаран'
      },
      features: [
        'Парусное вооружение',
        'Тендер',
        'Рыболовное снаряжение',
        'Снаряжение для дайвинга',
        'Генератор',
        'Система навигации'
      ],
      pricing: {
        day: { aed: 1800, usd: 490 },
        week: { aed: 11000, usd: 2990 },
        month: { aed: 35000, usd: 9520 }
      }
    },
    {
      id: 3,
      name: 'Sport Fishing Yacht',
      image: '/pexels-pixabay-271681.jpg',
      description: 'Специализированная яхта для спортивной рыбалки. Оснащена современным рыболовным оборудованием и навигационными системами. Идеальна для любителей морской рыбалки и приключений.',
      specs: {
        length: '16 метров',
        capacity: '6 гостей',
        cabins: '2 каюты',
        crew: '2 члена экипажа',
        maxSpeed: '30 узлов',
        year: '2021',
        type: 'Рыболовная яхта'
      },
      features: [
        'Рыболовные снасти',
        'Эхолот',
        'Холодильные камеры',
        'Солнечная палуба',
        'Мощные двигатели',
        'Система стабилизации'
      ],
      pricing: {
        day: { aed: 1200, usd: 327 },
        week: { aed: 7000, usd: 1905 },
        month: { aed: 22000, usd: 5984 }
      }
    }
  ];

  const getPeriodLabel = (period: string) => {
    switch (period) {
      case 'day': return 'День';
      case 'week': return 'Неделя';
      case 'month': return 'Месяц';
      default: return 'День';
    }
  };

  const getPrice = (yacht: any, period: string) => {
    return yacht.pricing[period as keyof typeof yacht.pricing];
  };

  return (
    <>
      <Helmet>
        <title>Аренда яхт в Дубае — Explore IT Dubai</title>
        <meta name="description" content="Аренда роскошных яхт в Дубае. Моторные яхты, парусные катамараны, рыболовные яхты. Круизы по Персидскому заливу с профессиональным экипажем." />
        <meta name="keywords" content="аренда яхт Дубай, яхты Персидский залив, круизы Дубай, моторные яхты, парусные катамараны" />
        <link rel="canonical" href="https://exploreitdubai.ru/yacht-rental" />
      </Helmet>

      {/* Hero Section */}
      <section className="relative min-h-screen overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <OptimizedImage
            src="/pexels-diego-f-parra-33199-843633.jpg"
            alt="Роскошные яхты в Дубае"
            className="w-full h-full object-cover"
            priority={true}
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>
        </div>


        {/* Header with Navigation */}
        <header className="absolute top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <Link to="/" className="flex items-center gap-3">
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl shadow-lg">
                  <Compass size={24} className="text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">Explore IT</h1>
                  <p className="text-amber-200 text-sm">Travel & Technology</p>
                </div>
              </Link>

              {/* Desktop Navigation - Centered */}
              <nav className="hidden lg:flex items-center gap-6 absolute left-1/2 transform -translate-x-1/2 top-1/2 -translate-y-1/2 whitespace-nowrap" role="navigation" aria-label="Основная навигация">
                {navigationLinks.map((link, index) => (
                  <div key={index}>
                    {link.href.startsWith('/') ? (
                      <Link
                        to={link.href}
                        className={`text-white/90 hover:text-amber-300 transition-colors duration-300 font-medium ${
                          link.active ? 'text-amber-300' : ''
                        }`}
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        className={`text-white/90 hover:text-amber-300 transition-colors duration-300 font-medium ${
                          link.active ? 'text-amber-300' : ''
                        }`}
                      >
                        {link.label}
                      </a>
                    )}
                  </div>
                ))}
              </nav>

              {/* Mobile Menu Button & Back Button */}
              <div className="flex items-center gap-4">
                <Link 
                  to="/" 
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  <ArrowLeft size={16} />
                  <span className="hidden sm:inline">На главную</span>
                </Link>

                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="lg:hidden flex items-center justify-center w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg text-white hover:bg-white/30 transition-all duration-300"
                  aria-label="Открыть меню"
                >
                  {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
              </div>
            </div>

            {/* Mobile Navigation Menu */}
            {isMobileMenuOpen && (
              <div className="lg:hidden mt-4 bg-black/40 backdrop-blur-md rounded-2xl p-6 border border-white/10">
                <nav className="flex flex-col gap-4" role="navigation" aria-label="Мобильная навигация">
                  {navigationLinks.map((link, index) => (
                    <div key={index}>
                      {link.href.startsWith('/') ? (
                        <Link
                          to={link.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={`block text-white/90 hover:text-amber-300 transition-colors duration-300 font-medium py-2 px-4 rounded-lg hover:bg-white/10 ${
                            link.active ? 'text-amber-300 bg-white/10' : ''
                          }`}
                        >
                          {link.label}
                        </Link>
                      ) : (
                        <a
                          href={link.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={`block text-white/90 hover:text-amber-300 transition-colors duration-300 font-medium py-2 px-4 rounded-lg hover:bg-white/10 ${
                            link.active ? 'text-amber-300 bg-white/10' : ''
                          }`}
                        >
                          {link.label}
                        </a>
                      )}
                    </div>
                  ))}
                </nav>
              </div>
            )}
          </div>
        </header>

        {/* Hero Content */}
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto mt-32">

          {/* Main Title */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Аренда яхт в
            <span className="block text-amber-400">Дубае</span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto leading-relaxed">
            Откройте для себя роскошь морских путешествий с нашим флотом премиальных яхт. 
            От уютных катамаранов до роскошных моторных яхт - каждый корабль создан для незабываемых впечатлений.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 max-w-2xl mx-auto">
            <div className="text-center flex flex-col items-center">
              <div className="text-3xl font-bold text-amber-400 mb-2">15+</div>
              <div className="text-white/80">Яхт в флоте</div>
            </div>
            <div className="text-center flex flex-col items-center">
              <div className="text-3xl font-bold text-amber-400 mb-2">1000+</div>
              <div className="text-white/80">Довольных клиентов</div>
            </div>
            <div className="text-center flex flex-col items-center">
              <div className="text-3xl font-bold text-amber-400 mb-2">5.0</div>
              <div className="text-white/80">Средний рейтинг</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#yachts"
              className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-amber-600 hover:to-orange-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Выбрать яхту
            </a>
            <button
              onClick={openModal}
              className="bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/30 transition-all duration-300 border border-white/30"
            >
              Получить консультацию
            </button>
          </div>
        </div>
      </section>

      {/* Yachts Section */}
      <section id="yachts" className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Наш флот яхт
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Выберите идеальную яхту для вашего морского приключения. От роскошных моторных яхт до элегантных парусных катамаранов.
            </p>
          </div>

          <div className="space-y-16">
            {yachts.map((yacht) => (
              <div key={yacht.id} className="bg-white rounded-3xl shadow-xl overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                  {/* Image */}
                  <div className="relative h-96 lg:h-full">
                    <OptimizedImage
                      src={yacht.image}
                      alt={yacht.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute bottom-6 left-6">
                      <h3 className="text-3xl font-bold text-white mb-2">{yacht.name}</h3>
                      <div className="flex items-center gap-2 text-amber-300">
                        <Star size={20} fill="currentColor" />
                        <span className="text-white font-semibold">5.0</span>
                        <span className="text-white/80">(отзывов)</span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8 lg:p-12">
                    <div className="mb-6">
                      <p className="text-gray-700 leading-relaxed mb-6">
                        {yacht.description}
                      </p>
                    </div>

                    {/* Specifications */}
                    <div className="grid grid-cols-2 gap-4 mb-8">
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-sm">
                          <Anchor size={16} className="text-blue-500" />
                          <span className="text-gray-600">Длина: <strong>{yacht.specs.length}</strong></span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Users size={16} className="text-blue-500" />
                          <span className="text-gray-600">Вместимость: <strong>{yacht.specs.capacity}</strong></span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Ship size={16} className="text-blue-500" />
                          <span className="text-gray-600">Каюты: <strong>{yacht.specs.cabins}</strong></span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <LifeBuoy size={16} className="text-blue-500" />
                          <span className="text-gray-600">Экипаж: <strong>{yacht.specs.crew}</strong></span>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-sm">
                          <Gauge size={16} className="text-blue-500" />
                          <span className="text-gray-600">Макс. скорость: <strong>{yacht.specs.maxSpeed}</strong></span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar size={16} className="text-blue-500" />
                          <span className="text-gray-600">Год: <strong>{yacht.specs.year}</strong></span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Sailboat size={16} className="text-blue-500" />
                          <span className="text-gray-600">Тип: <strong>{yacht.specs.type}</strong></span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Shield size={16} className="text-blue-500" />
                          <span className="text-gray-600">Страховка: <strong>Включена</strong></span>
                        </div>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="mb-8">
                      <h4 className="text-lg font-semibold text-gray-800 mb-4">Особенности яхты</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {yacht.features.map((feature, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm">
                            <CheckCircle size={16} className="text-green-500" />
                            <span className="text-gray-600">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Pricing */}
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-gray-800 mb-4">Стоимость аренды</h4>
                      <div className="flex gap-2 mb-4">
                        {['day', 'week', 'month'].map((period) => (
                          <button
                            key={period}
                            onClick={() => setSelectedPeriod(period)}
                            className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                              selectedPeriod === period
                                ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                          >
                            {getPeriodLabel(period)}
                          </button>
                        ))}
                      </div>
                      <div className="text-2xl font-bold text-gray-800">
                        {getPrice(yacht, selectedPeriod)?.aed} AED
                        <span className="text-lg text-gray-500 font-normal ml-2">
                          / {getPeriodLabel(selectedPeriod).toLowerCase()}
                        </span>
                      </div>
                    </div>

                    {/* CTA Button */}
                    <button
                      onClick={openModal}
                      className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-4 rounded-xl font-semibold text-lg hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                      Забронировать яхту
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Почему выбирают нас
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Профессиональный подход к организации морских путешествий
            </p>
          </div>
            
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Shield,
                title: 'Безопасность',
                description: 'Все яхты застрахованы и соответствуют международным стандартам безопасности'
              },
              {
                icon: Navigation,
                title: 'Профессиональный экипаж',
                description: 'Опытные капитаны и матросы с лицензиями'
              },
              {
                icon: Waves,
                title: 'Гибкие маршруты',
                description: 'Индивидуальное планирование маршрутов по вашему желанию'
              },
              {
                icon: Star,
                title: 'Премиум сервис',
                description: 'Высокий уровень обслуживания и внимание к деталям'
              }
            ].map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={index}
                  className="text-center group bg-white rounded-2xl p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl shadow-lg mb-4 group-hover:shadow-2xl transition-all duration-300 transform group-hover:scale-110">
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
      <section className="py-20 px-4 bg-gradient-to-r from-blue-100 to-cyan-100">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">
            Готовы к морскому приключению?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Свяжитесь с нами для бронирования яхты или получения консультации
          </p>
          <button
            onClick={openModal}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
          >
            <Anchor size={20} />
            Забронировать яхту
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg">
              <Compass size={20} className="text-white" />
            </div>
            <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-400">
              Explore IT
            </h3>
          </div>
          <p className="text-gray-300 mb-6">Откройте для себя магию морских путешествий в Дубае</p>
          <nav className="flex justify-center gap-6" role="navigation" aria-label="Футер навигация">
            <Link to="/" className="text-gray-300 hover:text-blue-400 transition-colors duration-300">
              Главная
            </Link>
            <Link to="/tours" className="text-gray-300 hover:text-blue-400 transition-colors duration-300">
              Экскурсии
            </Link>
            <Link to="/rental" className="text-gray-300 hover:text-blue-400 transition-colors duration-300">
              Аренда авто
            </Link>
            <Link to="/about" className="text-gray-300 hover:text-blue-400 transition-colors duration-300">
              О нас
            </Link>
            <Link to="/blog" className="text-gray-300 hover:text-blue-400 transition-colors duration-300">
              Блог
            </Link>
            <a href="tel:+79166508005" className="text-gray-300 hover:text-blue-400 transition-colors duration-300">
              Контакты
            </a>
          </nav>
        </div>
      </footer>

      {/* Contact Modal */}
      <ContactModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
}

export default YachtRentalPage; 