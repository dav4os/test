import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Compass, 
  Users, 
  Award, 
  Globe, 
  Heart, 
  Star, 
  MapPin, 
  Phone, 
  Mail, 
  Clock,
  Shield,
  Car,
  Plane,
  Camera,
  Target,
  CheckCircle,
  Menu,
  X
} from 'lucide-react';

function AboutPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const navigationLinks = [
    { label: 'Главная', href: '/' },
    { label: 'Экскурсии', href: '/#tours' },
    { label: 'Аренда авто', href: '/rental' },
    { label: 'О нас', href: '/about', active: true },
    { label: 'Блог', href: '/blog' },
    { label: 'Контакты', href: '#contacts' }
  ];

  const stats = [
    { number: '5000+', label: 'Довольных клиентов', icon: Users },
    { number: '500+', label: 'Проведенных туров', icon: MapPin },
    { number: '7', label: 'Лет опыта', icon: Award },
    { number: '24/7', label: 'Поддержка клиентов', icon: Clock }
  ];

  const team = [
    {
      name: 'Александр Петров',
      position: 'Основатель и CEO',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Более 10 лет в туристической индустрии ОАЭ'
    },
    {
      name: 'Мария Соколова',
      position: 'Главный гид',
      image: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Эксперт по культуре и истории Эмиратов'
    },
    {
      name: 'Дмитрий Волков',
      position: 'Менеджер по турам',
      image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Специалист по индивидуальным маршрутам'
    }
  ];

  const values = [
    {
      icon: Heart,
      title: 'Страсть к путешествиям',
      description: 'Мы искренне любим то, что делаем, и делимся этой страстью с каждым клиентом'
    },
    {
      icon: Shield,
      title: 'Безопасность превыше всего',
      description: 'Ваша безопасность и комфорт - наш главный приоритет в каждом туре'
    },
    {
      icon: Star,
      title: 'Качество сервиса',
      description: 'Мы стремимся превзойти ваши ожидания на каждом этапе путешествия'
    },
    {
      icon: Globe,
      title: 'Местная экспертиза',
      description: 'Глубокие знания региона позволяют нам показать скрытые жемчужины ОАЭ'
    }
  ];

  const services = [
    {
      icon: Car,
      title: 'Трансфер и транспорт',
      description: 'Комфортабельные автомобили премиум-класса для всех видов поездок'
    },
    {
      icon: MapPin,
      title: 'Экскурсионные туры',
      description: 'Авторские маршруты по самым интересным местам ОАЭ'
    },
    {
      icon: Plane,
      title: 'VIP сопровождение',
      description: 'Персональный сервис для особых случаев и деловых поездок'
    },
    {
      icon: Camera,
      title: 'Фото-туры',
      description: 'Специальные маршруты для создания незабываемых снимков'
    }
  ];

  const achievements = [
    'Лучшее туристическое агентство Дубая 2023',
    'Сертификат качества Dubai Tourism',
    'Партнер ведущих отелей ОАЭ',
    'Член Ассоциации туроператоров ОАЭ'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg">
                <Compass size={20} className="text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">Explore IT</h1>
                <p className="text-amber-600 text-xs">Travel & Technology</p>
              </div>
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8" role="navigation" aria-label="Основная навигация">
              {navigationLinks.map((link, index) => (
                <div key={index}>
                  {link.href.startsWith('/') ? (
                    <Link
                      to={link.href}
                      className={`text-gray-700 hover:text-amber-600 transition-colors duration-300 font-medium ${
                        link.active ? 'text-amber-600 border-b-2 border-amber-600 pb-1' : ''
                      }`}
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      className={`text-gray-700 hover:text-amber-600 transition-colors duration-300 font-medium ${
                        link.active ? 'text-amber-600 border-b-2 border-amber-600 pb-1' : ''
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
                className="lg:hidden flex items-center justify-center w-10 h-10 bg-amber-100 rounded-lg text-amber-600 hover:bg-amber-200 transition-all duration-300"
                aria-label="Открыть меню"
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden mt-4 bg-white/95 backdrop-blur-md rounded-2xl p-6 border border-amber-200 shadow-lg">
              <nav className="flex flex-col gap-4" role="navigation" aria-label="Мобильная навигация">
                {navigationLinks.map((link, index) => (
                  <div key={index}>
                    {link.href.startsWith('/') ? (
                      <Link
                        to={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`block text-gray-700 hover:text-amber-600 transition-colors duration-300 font-medium py-2 px-4 rounded-lg hover:bg-amber-50 ${
                          link.active ? 'text-amber-600 bg-amber-50' : ''
                        }`}
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`block text-gray-700 hover:text-amber-600 transition-colors duration-300 font-medium py-2 px-4 rounded-lg hover:bg-amber-50 ${
                          link.active ? 'text-amber-600 bg-amber-50' : ''
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

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
            О нас
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Мы - команда профессионалов, влюбленных в Объединенные Арабские Эмираты и готовых поделиться этой любовью с вами
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-orange-500 mx-auto rounded-full"></div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div
                  key={index}
                  className="text-center group"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl shadow-lg mb-4 group-hover:shadow-2xl transition-all duration-300 transform group-hover:scale-110">
                    <IconComponent size={28} className="text-white" />
                  </div>
                  <div className="text-3xl font-bold text-gray-800 mb-2">{stat.number}</div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-gray-800 mb-6">
                Наша история
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Explore IT была основана в 2017 году группой энтузиастов, которые влюбились в красоту и культуру Объединенных Арабских Эмиратов. Начав с небольших экскурсий для друзей и знакомых, мы постепенно выросли в одно из ведущих туристических агентств Дубая.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                За годы работы мы провели тысячи туров, помогли десяткам тысяч путешественников открыть для себя магию Эмиратов и создали незабываемые воспоминания для людей со всего мира.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Сегодня Explore IT - это команда профессионалов, объединенных общей целью: показать вам самые красивые места ОАЭ и создать путешествие вашей мечты.
              </p>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/3894157/pexels-photo-3894157.jpeg?auto=compress&cs=tinysrgb&w=800&fm=webp"
                alt="Desert Safari"
                className="rounded-2xl shadow-2xl w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 px-4 bg-gradient-to-r from-amber-100 to-orange-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl">
                  <Target size={24} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">Наша миссия</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Сделать путешествия по ОАЭ доступными, безопасными и незабываемыми для каждого. Мы стремимся показать истинную красоту Эмиратов, их богатую культуру и гостеприимство местных жителей, создавая уникальные впечатления для каждого путешественника.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl">
                  <Globe size={24} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">Наше видение</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Стать ведущим туристическим агентством в регионе, известным своим профессионализмом, инновационным подходом и исключительным качеством сервиса. Мы хотим, чтобы каждый турист, побывавший с нами, стал нашим амбассадором и рекомендовал нас своим друзьям.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Наши ценности
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-orange-500 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div
                  key={index}
                  className="text-center group bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 hover:shadow-lg transition-all duration-300"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl shadow-lg mb-4 group-hover:shadow-2xl transition-all duration-300 transform group-hover:scale-110">
                    <IconComponent size={28} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-20 px-4 bg-gradient-to-r from-amber-100 to-orange-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Наша команда
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Профессионалы, которые сделают ваше путешествие незабываемым
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-orange-500 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{member.name}</h3>
                  <p className="text-amber-600 font-semibold mb-3">{member.position}</p>
                  <p className="text-gray-600">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Services */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Наши услуги
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-orange-500 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <div
                  key={index}
                  className="text-center group bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl shadow-lg mb-4 group-hover:shadow-2xl transition-all duration-300 transform group-hover:scale-110">
                    <IconComponent size={28} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{service.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{service.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-20 px-4 bg-gradient-to-r from-amber-100 to-orange-100">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-8">
            Наши достижения
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className="flex items-center gap-4 bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex-shrink-0">
                  <CheckCircle size={24} className="text-white" />
                </div>
                <p className="text-gray-800 font-semibold text-left">{achievement}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">
            Готовы начать путешествие?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Свяжитесь с нами сегодня и позвольте нам создать незабываемое приключение специально для вас
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
            <button className="text-gray-300 hover:text-amber-400 transition-colors duration-300">
              Контакты
            </button>
            <button className="text-gray-300 hover:text-amber-400 transition-colors duration-300">
              Поддержка
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default AboutPage;