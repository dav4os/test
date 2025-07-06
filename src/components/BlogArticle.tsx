import React, { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Calendar, 
  User, 
  Clock, 
  Eye, 
  Heart, 
  Share2, 
  Compass,
  Menu,
  X,
  Facebook,
  Twitter,
  Linkedin,
  MessageCircle,
  BookOpen,
  Tag
} from 'lucide-react';
import { getBlogArticleBySlug, getRelatedArticles } from '../data/blogArticles';
import SEOHead from './SEOHead';

function BlogArticle() {
  const { slug } = useParams<{ slug: string }>();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  
  if (!slug) {
    return <Navigate to="/blog" replace />;
  }

  const article = getBlogArticleBySlug(slug);
  
  if (!article) {
    return <Navigate to="/blog" replace />;
  }

  const relatedArticles = getRelatedArticles(slug, article.category);

  const navigationLinks = [
    { label: 'Главная', href: '/' },
    { label: 'Экскурсии', href: '/#tours' },
    { label: 'Аренда авто', href: '/rental' },
    { label: 'О нас', href: '/about' },
    { label: 'Блог', href: '/blog' },
    { label: 'Контакты', href: '#contacts' }
  ];

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const shareUrl = `${window.location.origin}/blog/${slug}`;
  
  const handleShare = (platform: string) => {
    const text = `${article.title} - ${article.excerpt}`;
    let url = '';
    
    switch (platform) {
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        break;
      case 'twitter':
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`;
        break;
      case 'linkedin':
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
        break;
      case 'whatsapp':
        url = `https://wa.me/?text=${encodeURIComponent(text + ' ' + shareUrl)}`;
        break;
    }
    
    if (url) {
      window.open(url, '_blank', 'width=600,height=400');
    }
  };

  // Convert markdown-like content to HTML
  const formatContent = (content: string) => {
    return content
      .split('\n')
      .map((line, index) => {
        // Headers
        if (line.startsWith('# ')) {
          return <h1 key={index} className="text-4xl font-bold text-gray-800 mb-6 mt-8">{line.substring(2)}</h1>;
        }
        if (line.startsWith('## ')) {
          return <h2 key={index} className="text-3xl font-bold text-gray-800 mb-4 mt-8">{line.substring(3)}</h2>;
        }
        if (line.startsWith('### ')) {
          return <h3 key={index} className="text-2xl font-bold text-gray-800 mb-4 mt-6">{line.substring(4)}</h3>;
        }
        if (line.startsWith('#### ')) {
          return <h4 key={index} className="text-xl font-bold text-gray-800 mb-3 mt-4">{line.substring(5)}</h4>;
        }
        
        // Bold text
        if (line.startsWith('**') && line.endsWith('**')) {
          return <p key={index} className="font-bold text-gray-800 mb-3">{line.slice(2, -2)}</p>;
        }
        
        // Lists
        if (line.startsWith('- **')) {
          const match = line.match(/- \*\*(.*?)\*\*(.*)/);
          if (match) {
            return (
              <li key={index} className="mb-2">
                <strong className="text-amber-600">{match[1]}</strong>
                {match[2]}
              </li>
            );
          }
        }
        if (line.startsWith('- ')) {
          return <li key={index} className="mb-2 text-gray-700">{line.substring(2)}</li>;
        }
        
        // Italic text (tips)
        if (line.startsWith('*') && line.endsWith('*')) {
          return <p key={index} className="italic text-amber-700 bg-amber-50 p-4 rounded-lg mb-4 border-l-4 border-amber-500">{line.slice(1, -1)}</p>;
        }
        
        // Empty lines
        if (line.trim() === '') {
          return <br key={index} />;
        }
        
        // Regular paragraphs
        if (line.trim()) {
          // Handle bold text within paragraphs
          const formattedLine = line.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-800">$1</strong>');
          return (
            <p 
              key={index} 
              className="text-gray-700 leading-relaxed mb-4"
              dangerouslySetInnerHTML={{ __html: formattedLine }}
            />
          );
        }
        
        return null;
      })
      .filter(Boolean);
  };

  return (
    <>
      <SEOHead 
        title={article.seo.metaTitle}
        description={article.seo.metaDescription}
        keywords={article.seo.keywords}
        url={shareUrl}
        type="article"
      />
      
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
                        className="text-gray-700 hover:text-amber-600 transition-colors duration-300 font-medium"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        className="text-gray-700 hover:text-amber-600 transition-colors duration-300 font-medium"
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
                  to="/blog" 
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  <ArrowLeft size={16} />
                  <span className="hidden sm:inline">К блогу</span>
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
                          className="block text-gray-700 hover:text-amber-600 transition-colors duration-300 font-medium py-2 px-4 rounded-lg hover:bg-amber-50"
                        >
                          {link.label}
                        </Link>
                      ) : (
                        <a
                          href={link.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block text-gray-700 hover:text-amber-600 transition-colors duration-300 font-medium py-2 px-4 rounded-lg hover:bg-amber-50"
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

        {/* Article Hero */}
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 text-sm text-gray-600 mb-6">
              <Link to="/" className="hover:text-amber-600 transition-colors">Главная</Link>
              <span>/</span>
              <Link to="/blog" className="hover:text-amber-600 transition-colors">Блог</Link>
              <span>/</span>
              <span className="text-amber-600">{article.title}</span>
            </nav>

            {/* Article Header */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
              <div className="relative">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {article.category}
                    </span>
                    <div className="flex items-center gap-4 text-white/90 text-sm">
                      <div className="flex items-center gap-1">
                        <Eye size={14} />
                        <span>{article.views}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Heart size={14} />
                        <span>{article.likes}</span>
                      </div>
                    </div>
                  </div>
                  <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                    {article.title}
                  </h1>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                  <div className="flex items-center gap-6 text-gray-600">
                    <div className="flex items-center gap-2">
                      <User size={16} />
                      <span>{article.author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar size={16} />
                      <span>{article.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={16} />
                      <span>{article.readTime}</span>
                    </div>
                  </div>
                  
                  {/* Share Buttons */}
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600 text-sm mr-2">Поделиться:</span>
                    <button
                      onClick={() => handleShare('facebook')}
                      className="flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
                      aria-label="Поделиться в Facebook"
                    >
                      <Facebook size={14} />
                    </button>
                    <button
                      onClick={() => handleShare('twitter')}
                      className="flex items-center justify-center w-8 h-8 bg-blue-400 text-white rounded-full hover:bg-blue-500 transition-colors"
                      aria-label="Поделиться в Twitter"
                    >
                      <Twitter size={14} />
                    </button>
                    <button
                      onClick={() => handleShare('linkedin')}
                      className="flex items-center justify-center w-8 h-8 bg-blue-800 text-white rounded-full hover:bg-blue-900 transition-colors"
                      aria-label="Поделиться в LinkedIn"
                    >
                      <Linkedin size={14} />
                    </button>
                    <button
                      onClick={() => handleShare('whatsapp')}
                      className="flex items-center justify-center w-8 h-8 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors"
                      aria-label="Поделиться в WhatsApp"
                    >
                      <MessageCircle size={14} />
                    </button>
                  </div>
                </div>
                
                <p className="text-xl text-gray-700 leading-relaxed">
                  {article.excerpt}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Article Content */}
        <section className="px-4 pb-12">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="prose prose-lg max-w-none">
                {formatContent(article.content)}
              </div>
              
              {/* Tags */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <div className="flex items-center gap-2 mb-4">
                  <Tag size={18} className="text-amber-600" />
                  <span className="font-semibold text-gray-800">Теги:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-medium hover:bg-amber-200 transition-colors cursor-pointer"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <section className="px-4 pb-20">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  Похожие статьи
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-orange-500 mx-auto rounded-full"></div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedArticles.map((relatedArticle) => (
                  <article
                    key={relatedArticle.id}
                    className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2"
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={relatedArticle.image}
                        alt={relatedArticle.title}
                        className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute top-4 left-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        {relatedArticle.category}
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-amber-600 transition-colors duration-300">
                        {relatedArticle.title}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {relatedArticle.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Clock size={14} />
                          <span>{relatedArticle.readTime}</span>
                        </div>
                        <Link 
                          to={`/blog/${relatedArticle.slug}`}
                          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                        >
                          <BookOpen size={14} />
                          Читать
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-amber-100 to-orange-100">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Готовы отправиться в путешествие?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Свяжитесь с нами для организации незабываемого тура по ОАЭ
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+79166508005"
                className="flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                <MessageCircle size={20} />
                +7 916 650 80 05
              </a>
              <a
                href="mailto:info@exploreit.ae"
                className="flex items-center justify-center gap-2 px-8 py-4 bg-white border-2 border-amber-500 text-amber-600 font-bold rounded-lg hover:bg-amber-50 transition-all duration-300 transform hover:scale-105"
              >
                info@exploreit.ae
              </a>
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
              <Link to="/rental" className="text-gray-300 hover:text-amber-400 transition-colors duration-300">
                Аренда авто
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

export default BlogArticle;