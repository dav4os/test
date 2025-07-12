import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Compass, 
  Car, 
  Calendar, 
  Users, 
  Gauge, 
  Fuel, 
  Settings, 
  Clock, 
  Phone, 
  Mail,
  Star,
  Shield,
  CheckCircle,
  MapPin,
  Menu,
  X
} from 'lucide-react';
import SEOHead from './SEOHead';

function CarRentalPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('day');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationLinks = [
    { label: 'Главная', href: '/' },
    { label: 'Экскурсии', href: '/#tours' },
    { label: 'Аренда авто', href: '/rental', active: true },
    { label: 'О нас', href: '/about' },
    { label: 'Блог', href: '/blog' },
    { label: 'Контакты', href: '#contacts' }
  ];

  const cars = [
    {
      id: 1,
      name: 'Dodge Challenger',
      image: '/pexels-04iraq-1272398525-29098431.jpg',
      description: 'Одного взгляда на Dodge Challenger GT достаточно, чтобы понять его характер. Огромный, массивный, тяжёлый капот скрывает мощнейший двигатель – сердце этого маслкара. Стильный дизайн сочетает аэродинамичность и агрессивность – автомобиль уверенно бросает вызовы, зная, что выиграет любые из них.',
      specs: {
        year: '2022',
        color: 'Синий',
        seats: '5 мест',
        doors: '2 двери',
        maxSpeed: '317 км/ч',
        power: '707 л/с',
        drive: 'Задний',
        acceleration: '0-100 км/ч - 3,8 с.',
        engine: '6.2 л.'
      },
      pricing: {
        day: { aed: 400, usd: 110 },
        week: { aed: 2300, usd: 634 },
        month: { aed: 6400, usd: 1763 }
      }
    },
    {
      id: 2,
      name: 'Ford Mustang Cabriolet',
      image: '/pexels-avinashpatel-544542.jpg',
      description: 'Ford Mustang — культовое авто с внушительной историей и безупречной репутацией. С момента своего появления он был обречён на успех, а эволюция, пройденная им за полвека, отражает самые прогрессивные достижения конструкторской мысли.',
      specs: {
        year: '2021',
        color: 'Желтый',
        seats: '4 места',
        doors: '2 двери',
        maxSpeed: '250 км/ч',
        power: '310 л/с',
        drive: 'Задний',
        acceleration: '0-100 км/ч - 5.5 с.',
        engine: '2.3 л.'
      },
      pricing: {
        day: { aed: 400, usd: 110 },
        week: { aed: 2300, usd: 634 },
        month: { aed: 6400, usd: 1763 }
      }
    },
    {
      id: 3,
      name: 'Nissan Patrol Titanium',
      image: '/transportnoe-sredstvo-v-dvizenii.jpg',
      description: 'Предлагаем в аренду брутальный Nissan Patrol! Patrol поражает своей величественностью. Харизматичный и брутальный, рамный монстр.',
      specs: {
        year: '2021',
        color: 'Черный',
        seats: '7 мест',
        doors: '5 дверей',
        maxSpeed: '210 км/ч',
        power: '400 л/с',
        drive: 'AWD',
        acceleration: '0-100 км/ч - 6.6 с.',
        engine: '5.6 л.'
      },
      pricing: {
        day: { aed: 450, usd: 124 },
        week: { aed: 2800, usd: 772 },
        month: { aed: 9500, usd: 2617 }
      }
    },
    {
      id: 4,
      name: 'Mercedes Benz C300',
      image: '/pexels-egeardaphotos-2148533277-30313376.jpg',
      description: 'Mercedes-Benz C-Класс может похвастаться первоклассным оснащением. Его электронные системы работают согласно концепции Intelligent Drive, ее суть в том, чтобы максимально снять с водителя нагрузку.',
      specs: {
        year: '2021',
        color: 'Белый',
        seats: '5 мест',
        doors: '4 двери',
        maxSpeed: '241 км/ч',
        power: '241 л/с',
        drive: 'Задний',
        acceleration: '0-100 км/ч - 6.4 с.',
        engine: '2,0 л.'
      },
      pricing: {
        day: { aed: 400, usd: 110 },
        week: { aed: 2450, usd: 675 },
        month: { aed: 7000, usd: 1918 }
      }
    }
  ];

  const features = [
    {
      icon: Shield,
      title: 'Полная страховка',
      description: 'Все автомобили застрахованы по полному каско'
    },
    {
      icon: CheckCircle,
      title: 'Техосмотр',
      description: 'Регулярное техническое обслуживание всех автомобилей'
    },
    {
      icon: MapPin,
      title: 'Доставка',
      description: 'Бесплатная доставка автомобиля в любую точку Дубая'
    },
    {
      icon: Clock,
      title: '24/7 Поддержка',
      description: 'Круглосуточная техническая поддержка'
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

  return (
    <>
      <SEOHead 
        title="Аренда Авто в Дубае - Explore IT | Премиальные автомобили"
        description="Аренда премиальных автомобилей в Дубае: Dodge Challenger, Ford Mustang, Nissan Patrol, Mercedes Benz. Полная страховка, доставка, 24/7 поддержка."
        keywords="аренда авто дубай, аренда автомобилей оаэ, dodge challenger дубай, ford mustang аренда, nissan patrol дубай, mercedes benz аренда"
        url="https://exploreit.ae/rental"
        type="website"
      />
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg">
                <Compass size={20} className="text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Explore IT</h1>
                <p className="text-amber-200 text-xs">Travel & Technology</p>
              </div>
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8" role="navigation" aria-label="Основная навигация">
              {navigationLinks.map((link, index) => (
                <div key={index}>
                  {link.href.startsWith('/') ? (
                    <Link
                      to={link.href}
                      className={`text-white/90 hover:text-amber-300 transition-colors duration-300 font-medium ${
                        link.active ? 'text-amber-300 border-b-2 border-amber-300 pb-1' : ''
                      }`}
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      className={`text-white/90 hover:text-amber-300 transition-colors duration-300 font-medium ${
                        link.active ? 'text-amber-300 border-b-2 border-amber-300 pb-1' : ''
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

              {/* Mobile Menu Button */}
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

      {/* Hero Section with Background */}
      <section 
        className="relative h-screen bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.3)), url("/photo_2025-07-12_18-52-35.jpg")'
        }}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 pt-20">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight">
            Аренда
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-400">
              автомобилей
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
            Премиальные автомобили для незабываемых путешествий по Дубаю и ОАЭ
          </p>
          
          {/* CTA Button */}
          <button className="group relative px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-lg rounded-full shadow-2xl hover:shadow-amber-500/25 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1">
            <span className="flex items-center gap-2">
              <Calendar size={20} />
              Забронировать автомобиль
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
          </button>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Pricing Period Selector */}
      <section className="px-4 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center gap-4 mb-16">
            {['day', 'week', 'month'].map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedPeriod === period
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg transform scale-105'
                    : 'bg-white text-gray-600 hover:bg-amber-50 hover:text-amber-600 shadow-sm hover:shadow-md'
                }`}
              >
                {getPeriodLabel(period)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Cars Grid */}
      <section className="px-4 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {cars.map((car) => (
              <div
                key={car.id}
                className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden group"
              >
                {/* Car Image */}
                <div className="relative overflow-hidden h-80">
                  <img
                    src={car.image}
                    alt={car.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-6 left-6">
                    <h3 className="text-3xl font-bold text-white mb-2">{car.name}</h3>
                    <div className="flex items-center gap-2 text-amber-300">
                      <Star size={20} fill="currentColor" />
                      <Star size={20} fill="currentColor" />
                      <Star size={20} fill="currentColor" />
                      <Star size={20} fill="currentColor" />
                      <Star size={20} fill="currentColor" />
                    </div>
                  </div>
                </div>

                <div className="p-8">
                  {/* Description */}
                  <p className="text-gray-700 leading-relaxed mb-6">
                    {car.description}
                  </p>

                  {/* Specifications */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar size={16} className="text-amber-500" />
                        <span className="text-gray-600">Год: <strong>{car.specs.year}</strong></span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-4 h-4 rounded-full bg-amber-500"></div>
                        <span className="text-gray-600">Цвет: <strong>{car.specs.color}</strong></span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Users size={16} className="text-amber-500" />
                        <span className="text-gray-600">Места: <strong>{car.specs.seats}</strong></span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Car size={16} className="text-amber-500" />
                        <span className="text-gray-600">Двери: <strong>{car.specs.doors}</strong></span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm">
                        <Gauge size={16} className="text-amber-500" />
                        <span className="text-gray-600">Макс. скорость: <strong>{car.specs.maxSpeed}</strong></span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Settings size={16} className="text-amber-500" />
                        <span className="text-gray-600">Мощность: <strong>{car.specs.power}</strong></span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Car size={16} className="text-amber-500" />
                        <span className="text-gray-600">Привод: <strong>{car.specs.drive}</strong></span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock size={16} className="text-amber-500" />
                        <span className="text-gray-600">Разгон: <strong>{car.specs.acceleration}</strong></span>
                      </div>
                    </div>
                  </div>

                  {/* Engine Info */}
                  <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-4 mb-6">
                    <div className="flex items-center gap-2 text-sm">
                      <Fuel size={16} className="text-amber-500" />
                      <span className="text-gray-700">Двигатель: <strong>{car.specs.engine}</strong></span>
                    </div>
                  </div>

                  {/* Pricing */}
                  <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-6 text-white">
                    <div className="text-center">
                      <p className="text-sm opacity-90 mb-2">Стоимость аренды ({getPeriodLabel(selectedPeriod)})</p>
                      <div className="text-3xl font-bold mb-2">
                        {car.pricing[selectedPeriod as keyof typeof car.pricing].aed} AED
                      </div>
                      <div className="text-lg opacity-90">
                        ${car.pricing[selectedPeriod as keyof typeof car.pricing].usd} USD
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <button className="w-full mt-6 px-6 py-4 bg-gray-800 text-white font-bold rounded-xl hover:bg-gray-700 transition-all duration-300 transform hover:scale-105">
                    Забронировать сейчас
                  </button>
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
            {features.map((feature, index) => {
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

      {/* Rental Terms */}
      <section className="py-20 bg-gradient-to-r from-amber-100 to-orange-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">
            Условия аренды
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-800 mb-4">📆 Краткосрочная и долгосрочная аренда</h3>
              <p className="text-gray-600">Гибкие условия аренды от одного дня до нескольких месяцев</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-800 mb-4">📌 Цены зависят от срока аренды</h3>
              <p className="text-gray-600">Чем дольше срок аренды, тем выгоднее цена за день</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">
            Готовы арендовать автомобиль?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Свяжитесь с нами для бронирования или получения дополнительной информации
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <Phone size={20} />
              +7 916 650 80 05
            </button>
            <button className="flex items-center justify-center gap-2 px-8 py-4 bg-white border-2 border-amber-500 text-amber-600 font-bold rounded-lg hover:bg-amber-50 transition-all duration-300 transform hover:scale-105">
              <Mail size={20} />
              info@exploreit.ae
            </button>
          </div>
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
          <div className="flex justify-center gap-6">
            <Link to="/" className="text-gray-300 hover:text-amber-400 transition-colors duration-300">
              Главная
            </Link>
            <Link to="/blog" className="text-gray-300 hover:text-amber-400 transition-colors duration-300">
              Блог
            </Link>
            <Link to="/about" className="text-gray-300 hover:text-amber-400 transition-colors duration-300">
              О нас
            </Link>
            <button className="text-gray-300 hover:text-amber-400 transition-colors duration-300">
              Контакты
            </button>
          </div>
        </div>
      </footer>
    </div>
    </>
  );
}

export default CarRentalPage;