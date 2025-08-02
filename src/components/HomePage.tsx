import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Car, Users, BookOpen, Calendar, Shield, Route, Plane, Compass, Star, Award, Heart, Ship, Menu, X } from 'lucide-react';
import ContactSection from './ContactSection';
import HomeHero from './HomeHero';
import HomeOffers from './HomeOffers';
import CustomerReviews from './CustomerReviews';
import FAQ from './FAQ';
import CompanyStructuredData from './CompanyStructuredData';
import useImagePreloader from '../hooks/useImagePreloader';
import { Helmet } from 'react-helmet-async';

// Используем оптимизированные изображения из папки optimized для лучшей производительности
const bgImage = '/optimized/pexels-pixabay-162031.webp';
const dubaiPremiumImg = '/optimized/pexels-apasaric-2044434.webp';
const safariImg = '/optimized/pexels-bubi-2867769.webp';
const abuDhabiImg = '/optimized/pexels-lina-12238221.webp';

function HomePage() {
  const [activeNav, setActiveNav] = useState('tours');

  const navItems = [
    { id: 'tours', label: 'Экскурсии', icon: MapPin, link: '/tours' },
    { id: 'rental', label: 'Аренда авто', icon: Car, link: '/rental' },
    { id: 'yacht', label: 'Аренда яхт', icon: Ship, link: '/yacht-rental' },
    { id: 'about', label: 'О нас', icon: Users, link: '/about' },
    { id: 'blog', label: 'Блог', icon: BookOpen, link: '/blog' },
  ];

  const navigationLinks = [
    { label: 'Главная', href: '/', active: true },
    { label: 'Экскурсии', href: '/tours', active: false },
    { label: 'Аренда авто', href: '/rental', active: false },
    { label: 'Аренда яхт', href: '/yacht-rental', active: false },
    { label: 'О нас', href: '/about', active: false },
    { label: 'Блог', href: '/blog', active: false },
    { label: 'Контакты', href: '#contacts', active: false }
  ];

  const offers = [
    {
      id: 1,
      title: 'Дубай Премиум',
      image: dubaiPremiumImg,
      price: '2,500 AED',
      duration: '3 дня',
      alt: 'Экскурсия Дубай Премиум - Бурдж Халифа',
      rating: 4.9,
      location: 'Дубай'
    },
    {
      id: 2,
      title: 'Пустынное сафари',
      image: safariImg,
      price: '450 AED',
      duration: '1 день',
      alt: 'Пустынное сафари в ОАЭ',
      rating: 4.8,
      location: 'Пустыня'
    },
    {
      id: 3,
      title: 'Абу-Даби Тур',
      image: abuDhabiImg,
      price: '800 AED',
      duration: '2 дня',
      alt: 'Экскурсия в Абу-Даби',
      rating: 4.7,
      location: 'Абу-Даби'
    }
  ];

  const features = [
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
    }
  ];

  const exploreItFeatures = [
    {
      icon: Car,
      title: 'Автомобили, яхты, катера',
      description: 'Комфортабельные автомобили премиум-класса, яхты и катера для морских прогулок.'
    },
    {
      icon: Star,
      title: 'Профессиональной командой',
      description: 'Опытные водители, капитаны и эрудированные русскоязычные гиды, которые расскажут о культуре, истории и традициях ОАЭ.'
    },
    {
      icon: Heart,
      title: 'Индивидуальным подходом',
      description: 'Мы подберем тур, который идеально подойдет именно вам, будь то семейный отдых или экстремальное приключение.'
    }
  ];

  // Предзагрузка критических изображений
  const criticalImages = [
    'https://images.pexels.com/photos/162031/dubai-tower-arab-khalifa-162031.jpeg?auto=compress&cs=tinysrgb&w=1920',
    ...offers.map(offer => offer.image)
  ];
  
  // useImagePreloader(criticalImages, { priority: 'high' });

  return (
    <>
      <Helmet>
        <title>Главная — Explore IT Dubai</title>
        <meta name="description" content="Экскурсии, аренда авто и туры в Дубае. Более 5000 довольных клиентов." />
        <meta name="keywords" content="экскурсии Дубай, аренда авто ОАЭ, туры в Дубай, отдых в ОАЭ, сафари, трансфер, гид, достопримечательности, экскурсионные туры, семейный отдых, премиум туры, туроператор, путешествия, туризм, отдых на море, vip туры, экскурсии с гидом, экскурсии для детей, экскурсии для взрослых, экскурсии для всей семьи, экскурсии на вертолете, экскурсии на яхте, экскурсии в пустыню, экскурсии по эмиратам, экскурсии по Персидскому заливу" />
        <link rel="canonical" href="https://exploreitdubai.ru/" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://exploreitdubai.ru/" />
        <meta property="og:title" content="Главная — Explore IT Dubai" />
        <meta property="og:description" content="Экскурсии, аренда авто и туры в Дубае. Более 5000 довольных клиентов." />
        <meta property="og:image" content="https://exploreitdubai.ru/og-image.jpg" />
        <meta property="og:locale" content="ru_RU" />
      </Helmet>
      
      

      {/* Hero Section */}
      <HomeHero
        isMobileMenuOpen={activeNav === 'mobile'}
        setIsMobileMenuOpen={(open) => setActiveNav(open ? 'mobile' : '')}
        navigationLinks={navigationLinks}
      />

      {/* Offers Section */}
      <HomeOffers offers={offers} />

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Почему выбирают нас
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Мы предлагаем уникальные услуги, которые сделают ваше путешествие незабываемым
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 hover:shadow-lg transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Explore IT Features */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Explore IT - ваш надежный партнер
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Мы создаем незабываемые впечатления с помощью передовых технологий и индивидуального подхода
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {exploreItFeatures.map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center mb-6">
                  <feature.icon size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
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
              text: 'Арендовал машину через Explore IT Dubai. Все прошло идеально, машина была в отличном состоянии. Обязательно обращусь снова.',
              date: '2025-01-10',
              service: 'Аренда авто'
            },
            {
              id: '3',
              author: 'Елена Сидорова',
              rating: 5,
              text: 'Пустынное сафари превзошло все ожидания! Невероятные эмоции и красивые фото. Спасибо за незабываемый опыт!',
              date: '2025-01-08',
              service: 'Пустынное сафари'
            }
          ]}
        title="Отзывы наших клиентов"
        subtitle="Более 5000 довольных клиентов выбрали наши услуги"
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
            question: 'Нужна ли виза для поездки в ОАЭ?',
            answer: 'Для граждан России виза в ОАЭ не требуется при поездке до 90 дней. Паспорт должен быть действителен не менее 6 месяцев с даты въезда.'
          },
          {
            id: '3',
            question: 'Какие документы нужны для аренды авто?',
            answer: 'Для аренды автомобиля нужны: водительские права международного образца, паспорт, кредитная карта для депозита. Возраст водителя от 21 года.'
          },
          {
            id: '4',
            question: 'Включен ли трансфер в стоимость экскурсии?',
            answer: 'Да, трансфер из отеля и обратно включен в стоимость всех наших экскурсий. Мы заберем вас из любого отеля в Дубае.'
          },
          {
            id: '5',
            question: 'Можно ли изменить дату экскурсии?',
            answer: 'Да, вы можете изменить дату экскурсии бесплатно за 24 часа до начала. При отмене менее чем за 24 часа возврат не производится.'
          }
        ]}
        title="Часто задаваемые вопросы"
        subtitle="Ответы на популярные вопросы о наших услугах"
      />

      {/* Company Structured Data */}
      <CompanyStructuredData />

      {/* Contact Section */}
      <ContactSection />
    </>
  );
}

export default HomePage;