import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useContactModal } from '../hooks/useContactModal';
import { useTours } from '../hooks/useTours';
import ContactModal from './ContactModal';
import ToursHero from './ToursHero';
import TourCard from './TourCard';
import TourFilters from './TourFilters';
import CustomerReviews from './CustomerReviews';
import FAQ from './FAQ';
import { TourFilters as TourFiltersType } from '../types/tour';
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
  CheckCircle,
  Loader2
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';

function ToursPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<TourFiltersType>({});
  const { isModalOpen, openModal, closeModal } = useContactModal();

  // Используем хук для работы с турами
  const { 
    tours, 
    loading, 
    error, 
    total, 
    hasMore, 
    loadTours, 
    loadMore 
  } = useTours();

  const navigationLinks = [
    { label: 'Главная', href: '/', active: false },
    { label: 'Экскурсии', href: '/tours', active: true },
    { label: 'Аренда авто', href: '/rental', active: false },
    { label: 'Аренда яхт', href: '/yacht-rental', active: false },
    { label: 'О нас', href: '/about', active: false },
    { label: 'Блог', href: '/blog', active: false },
    { label: 'Контакты', href: '#contacts', active: false }
  ];

  // Обработчики для фильтрации
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    const newFilters = { ...filters, category: category === 'all' ? undefined : category };
    loadTours(newFilters, 1);
  };

  const handleFiltersChange = (newFilters: TourFiltersType) => {
    setFilters(newFilters);
    const combinedFilters = { ...newFilters, category: selectedCategory === 'all' ? undefined : selectedCategory };
    loadTours(combinedFilters, 1);
  };

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
    const newFilters = { ...filters, search: term || undefined };
    loadTours(newFilters, 1);
  };

  return (
    <>
      <Helmet>
        <title>Экскурсии в Дубае - Туры по ОАЭ 2025 | Explore IT Dubai</title>
        <meta name="description" content="Экскурсии в Дубае и ОАЭ 2025. Пустынное сафари, туры в Абу-Даби, Фуджейру. Индивидуальные и групповые туры. Бронирование онлайн." />
        <meta name="keywords" content="экскурсии дубай, экскурсии в дубае 2025, туры оаэ, пустынное сафари дубай, туры в абу даби, экскурсии по эмиратам, индивидуальные туры дубай, групповые экскурсии, бурдж халифа, пальма джумейра" />
        <link rel="canonical" href="https://exploreitdubai.ru/tours" />
        <meta property="og:title" content="Экскурсии в Дубае - Туры по ОАЭ 2025" />
        <meta property="og:description" content="Экскурсии в Дубае и ОАЭ 2025. Пустынное сафари, туры в Абу-Даби, Фуджейру. Индивидуальные и групповые туры." />
        <meta property="og:url" content="https://exploreitdubai.ru/tours" />
        <meta property="og:type" content="website" />
      </Helmet>

                

        {/* Hero Section */}
        <ToursHero
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
          navigationLinks={navigationLinks}
          onOpenContactModal={openModal}
        />

        {/* Filters and Search */}
        <TourFilters
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
          onFiltersChange={handleFiltersChange}
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
        />

        {/* Tours Grid */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            {/* Loading State */}
            {loading && (
              <div className="flex justify-center items-center py-20">
                <div className="flex items-center gap-3">
                  <Loader2 className="animate-spin text-amber-500" size={24} />
                  <span className="text-gray-600">Загрузка экскурсий...</span>
                      </div>
                    </div>
            )}

            {/* Error State */}
            {error && (
              <div className="text-center py-20">
                <div className="text-red-500 mb-4 text-lg font-semibold">Ошибка загрузки: {error}</div>
                <div className="text-gray-600 mb-6 max-w-2xl mx-auto">
                  {error.includes('Supabase не настроен') ? (
                      <div className="space-y-3">
                      <p>Для работы с турами необходимо настроить базу данных Supabase:</p>
                      <ol className="list-decimal list-inside space-y-1 text-left">
                        <li>Создайте файл <code className="bg-gray-100 px-1 rounded">.env</code> в корне проекта</li>
                        <li>Добавьте переменные окружения (см. файл <code className="bg-gray-100 px-1 rounded">env.example</code>)</li>
                        <li>Получите данные из Supabase Dashboard → Settings → API</li>
                        <li>Перезапустите сервер разработки</li>
                      </ol>
                      <div className="mt-4">
                        <a 
                          href="/supabase-connection-debug" 
                          className="text-amber-600 hover:text-amber-700 underline"
                        >
                          Отладка подключения к Supabase
                        </a>
                      </div>
                    </div>
                  ) : (
                    <p>Попробуйте обновить страницу или обратитесь к администратору.</p>
                  )}
                </div>
                <button
                  onClick={() => loadTours()}
                  className="px-6 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
                >
                  Попробовать снова
                </button>
                          </div>
            )}

            {/* Tours Grid */}
            {!loading && !error && tours.length > 0 && (
              <>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  {tours.map((tour) => (
                    <TourCard
                      key={tour.id}
                      tour={tour}
                      onBook={openModal}
                      categoryLabel={tour.category}
                    />
                  ))}
                    </div>

                {/* Load More Button */}
                {hasMore && (
                  <div className="text-center mt-12">
                      <button
                      onClick={loadMore}
                      className="px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                      >
                      Загрузить еще
                      </button>
                  </div>
                )}

                {/* Results Count */}
                <div className="text-center mt-8 text-gray-600">
                  Показано {tours.length} из {total} экскурсий
                </div>
              </>
            )}

            {/* Empty State */}
            {!loading && !error && tours.length === 0 && (
              <div className="text-center py-20">
                <div className="text-gray-500 mb-4">Экскурсии не найдены</div>
                <button
                  onClick={() => loadTours()}
                  className="px-6 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
                >
                  Сбросить фильтры
                </button>
            </div>
            )}
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

        {/* Customer Reviews Section */}
        <CustomerReviews 
          reviews={[
            {
              id: '1',
              author: 'Анна Петрова',
              rating: 5,
              text: 'Отличная экскурсия в Дубае! Гид был очень знающим и дружелюбным. Увидели все главные достопримечательности. Рекомендую!',
              date: '2025-01-15',
              service: 'Экскурсия в Дубае'
            },
            {
              id: '2',
              author: 'Михаил Иванов',
              rating: 5,
              text: 'Пустынное сафари превзошло все ожидания! Невероятные эмоции и красивые фото. Спасибо за незабываемый опыт!',
              date: '2025-01-10',
              service: 'Пустынное сафари'
            },
            {
              id: '3',
              author: 'Елена Сидорова',
              rating: 5,
              text: 'Тур в Абу-Даби был потрясающим! Мечеть шейха Зайда просто великолепна. Гид рассказал много интересного об истории ОАЭ.',
              date: '2025-01-08',
              service: 'Тур в Абу-Даби'
            }
          ]}
          title="Отзывы о наших экскурсиях"
          subtitle="Реальные отзывы от довольных клиентов о наших экскурсиях"
        />

        {/* FAQ Section */}
        <FAQ 
          items={[
            {
              id: '1',
              question: 'Как забронировать экскурсию?',
              answer: 'Вы можете забронировать экскурсию через наш сайт, позвонив по телефону +79166508005 или написав в WhatsApp. Мы ответим в течение 15 минут.'
            },
            {
              id: '2',
              question: 'Включен ли трансфер в стоимость экскурсии?',
              answer: 'Да, трансфер из отеля и обратно включен в стоимость всех наших экскурсий. Мы заберем вас из любого отеля в Дубае.'
            },
            {
              id: '3',
              question: 'Можно ли изменить дату экскурсии?',
              answer: 'Да, вы можете изменить дату экскурсии бесплатно за 24 часа до начала. При отмене менее чем за 24 часа возврат не производится.'
            },
            {
              id: '4',
              question: 'Какие документы нужны для экскурсии?',
              answer: 'Для участия в экскурсии нужен только паспорт или его копия. Для некоторых экскурсий может потребоваться виза, но для граждан России виза в ОАЭ не нужна.'
            },
            {
              id: '5',
              question: 'Есть ли групповые экскурсии?',
              answer: 'Да, мы предлагаем как индивидуальные, так и групповые экскурсии. Групповые экскурсии дешевле, но индивидуальные дают больше гибкости.'
            }
          ]}
          title="Часто задаваемые вопросы об экскурсиях"
          subtitle="Ответы на популярные вопросы о наших экскурсиях"
        />

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

      {/* Contact Modal */}
      <ContactModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
}

export default ToursPage; 