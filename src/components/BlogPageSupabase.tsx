import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useContactModal } from '../hooks/useContactModal';
import ContactModal from './ContactModal';
import { ArrowLeft, Calendar, User, Clock, Tag, Eye, Heart, Share2, Compass, Menu, X } from 'lucide-react';
import { blogService } from '../services/blogService';
import ReliableImage from './ReliableImage';
import { Helmet } from 'react-helmet-async';

// Используем тип из blogService
type BlogArticle = Awaited<ReturnType<typeof blogService.getAllArticles>>[0];

function BlogPageSupabase() {
  const [articles, setArticles] = useState<BlogArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isModalOpen, openModal, closeModal } = useContactModal();

  const navigationLinks = [
    { label: 'Главная', href: '/' },
    { label: 'Экскурсии', href: '/tours' },
    { label: 'Аренда авто', href: '/rental' },
    { label: 'О нас', href: '/about' },
    { label: 'Блог', href: '/blog', active: true },
    { label: 'Контакты', href: '#contacts' }
  ];

  const categories = ['Все', 'Экскурсии', 'Аренда авто', 'Достопримечательности', 'Советы', 'Общее'];
  const [selectedCategory, setSelectedCategory] = useState('Все');

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    try {
      setLoading(true);
      const data = await blogService.getAllArticles();
      setArticles(data);
    } catch (error) {
      console.error('Error loading articles:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredPosts = selectedCategory === 'Все' 
    ? articles 
    : articles.filter(post => post.category === selectedCategory);

  const handleLike = async (articleId: number) => {
    try {
      await blogService.incrementLikes(articleId);
      await loadArticles(); // Перезагружаем данные
    } catch (error) {
      console.error('Error incrementing likes:', error);
    }
  };

  const handleView = async (articleId: number) => {
    try {
      await blogService.incrementViews(articleId);
      await loadArticles(); // Перезагружаем данные
    } catch (error) {
      console.error('Error incrementing views:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <div className="flex items-center justify-center mb-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600"></div>
          </div>
          <p className="text-center text-gray-600">Загрузка статей...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Блог — Explore IT Dubai</title>
        <meta name="description" content="Читайте полезные статьи о путешествиях, экскурсиях и жизни в Дубае." />
        <meta name="keywords" content="блог, статьи, Дубай, путешествия, экскурсии, советы путешественникам" />
        <link rel="canonical" href="https://exploreitdubai.ru/blog" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://exploreitdubai.ru/blog" />
        <meta property="og:title" content="Блог — Explore IT Dubai" />
        <meta property="og:description" content="Читайте полезные статьи о путешествиях, экскурсиях и жизни в Дубае." />
        <meta property="og:image" content="https://exploreitdubai.ru/og-image.jpg" />
        <meta property="og:locale" content="ru_RU" />
      </Helmet>
      
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

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
              <nav className="lg:hidden mt-4 pb-4 border-t border-gray-200" role="navigation" aria-label="Мобильная навигация">
                <div className="flex flex-col space-y-2 pt-4">
                  {navigationLinks.map((link, index) => (
                    <div key={index}>
                      {link.href.startsWith('/') ? (
                        <Link
                          to={link.href}
                          className={`block px-4 py-2 rounded-lg transition-colors duration-300 ${
                            link.active 
                              ? 'bg-amber-100 text-amber-600 font-medium' 
                              : 'text-gray-700 hover:bg-amber-50'
                          }`}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {link.label}
                        </Link>
                      ) : (
                        <a
                          href={link.href}
                          className={`block px-4 py-2 rounded-lg transition-colors duration-300 ${
                            link.active 
                              ? 'bg-amber-100 text-amber-600 font-medium' 
                              : 'text-gray-700 hover:bg-amber-50'
                          }`}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {link.label}
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </nav>
            )}
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 py-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-4">
              Блог Explore IT Dubai
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Полезные статьи о путешествиях, экскурсиях и жизни в Дубае. 
              Откройте для себя лучшие места и получите ценные советы от наших экспертов.
            </p>
          </div>

          {/* Category Filter */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-amber-500 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-amber-50 border border-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Articles Grid */}
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <div className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto">
                <div className="text-amber-500 mb-4">
                  <Compass size={48} className="mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Статьи не найдены</h3>
                <p className="text-gray-600">
                  {selectedCategory === 'Все' 
                    ? 'В блоге пока нет статей. Загляните позже!' 
                    : `В категории "${selectedCategory}" пока нет статей.`
                  }
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((article) => (
                <article
                  key={article.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  {/* Article Image */}
                  <div className="relative h-48 overflow-hidden">
                                         <ReliableImage
                       src={article.image || '/pexels-pixabay-162031.jpg'}
                       alt={article.title}
                       className="w-full h-full object-cover"
                       fallbackSrc="/pexels-pixabay-162031.jpg"
                     />
                    <div className="absolute top-4 right-4 flex space-x-2">
                      <button
                        onClick={() => handleView(article.id)}
                        className="flex items-center gap-1 px-2 py-1 bg-white/80 backdrop-blur-sm rounded-full text-xs text-gray-700 hover:bg-white transition-colors"
                      >
                        <Eye size={12} />
                        {article.views}
                      </button>
                      <button
                        onClick={() => handleLike(article.id)}
                        className="flex items-center gap-1 px-2 py-1 bg-white/80 backdrop-blur-sm rounded-full text-xs text-gray-700 hover:bg-white transition-colors"
                      >
                        <Heart size={12} />
                        {article.likes}
                      </button>
                    </div>
                  </div>

                  {/* Article Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                      <span className="flex items-center gap-1">
                        <User size={12} />
                        {article.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar size={12} />
                        {new Date(article.date).toLocaleDateString('ru-RU')}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                      {article.title}
                    </h3>

                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {article.excerpt}
                    </p>

                    <div className="flex items-center justify-between">
                      <Link
                        to={`/blog/${article.id}`}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                      >
                        Читать далее
                        <ArrowLeft size={16} className="rotate-180" />
                      </Link>

                      <button className="p-2 text-gray-400 hover:text-amber-500 transition-colors">
                        <Share2 size={16} />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* Admin Link (only in development) */}
          {import.meta.env.DEV && (
            <div className="mt-12 text-center">
              <Link
                to="/blog-manager"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                <Compass size={16} />
                Управление блогом
              </Link>
            </div>
          )}
        </main>
      </div>

      {/* Contact Modal */}
      <ContactModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
}

export default BlogPageSupabase; 