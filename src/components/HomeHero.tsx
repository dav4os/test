import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { Compass, Menu, X } from 'lucide-react';
import OptimizedImage from './OptimizedImage';

interface HomeHeroProps {
  isMobileMenuOpen?: boolean;
  setIsMobileMenuOpen?: (open: boolean) => void;
  navigationLinks?: Array<{
    label: string;
    href: string;
    active: boolean;
  }>;
}

const HomeHero: React.FC<HomeHeroProps> = memo(({
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  navigationLinks
}) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center">
      {/* Hero Background */}
      <div className="absolute inset-0 z-0">
        <OptimizedImage
          src="/optimized/pexels-pixabay-162031.webp"
          alt="Дубай - современный город будущего"
          className="w-full h-full object-cover"
          priority={true}
          loading="eager"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Header with Navigation */}
      <header className="absolute top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 relative">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3" aria-label="Explore IT - Главная страница">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl shadow-lg">
                <Compass size={24} className="text-white" />
              </div>
                              <div>
                  <h1 className="text-2xl font-bold text-white">Explore IT</h1>
                  <p className="text-amber-300 text-sm">Travel & Technology</p>
                </div>
            </Link>
            
            {/* Desktop Navigation - Centered */}
            <nav className="hidden lg:flex items-center gap-6 absolute left-1/2 transform -translate-x-1/2 top-1/2 -translate-y-1/2 whitespace-nowrap" role="navigation" aria-label="Основная навигация">
              {navigationLinks?.map((link, index) => (
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

            {/* Contact Info & Mobile Menu Button */}
            <div className="flex items-center gap-4">
              {/* Contact Info - Desktop */}
              <div className="hidden md:flex items-center gap-6 text-white/90">
                <div className="text-right">
                  <p className="text-sm">Свяжитесь с нами</p>
                  <a href="tel:+79166508005" className="font-semibold text-amber-300 hover:text-amber-200 transition-colors">
                    +7 916 650 80 05
                  </a>
                </div>
              </div>

              {/* Mobile Menu Button */}
                              <button
                  onClick={() => setIsMobileMenuOpen?.(!isMobileMenuOpen)}
                  className="lg:hidden flex items-center justify-center w-10 h-10 bg-white/20 rounded-lg text-white hover:bg-white/30 transition-all duration-300"
                  aria-label="Открыть меню"
                >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden mt-4 bg-black/40 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-lg">
              <nav className="flex flex-col gap-4" role="navigation" aria-label="Мобильная навигация">
                {navigationLinks?.map((link, index) => (
                  <div key={index}>
                    {link.href.startsWith('/') ? (
                                              <Link
                          to={link.href}
                          onClick={() => setIsMobileMenuOpen?.(false)}
                          className={`block text-white hover:text-amber-300 transition-colors duration-300 font-medium py-2 px-4 rounded-lg hover:bg-white/10 ${
                            link.active ? 'text-amber-300 bg-white/10' : ''
                          }`}
                        >
                          {link.label}
                        </Link>
                      ) : (
                        <a
                          href={link.href}
                          onClick={() => setIsMobileMenuOpen?.(false)}
                          className={`block text-white hover:text-amber-300 transition-colors duration-300 font-medium py-2 px-4 rounded-lg hover:bg-white/10 ${
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
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          Откройте для себя
          <span className="block text-amber-400">удивительный Дубай</span>
        </h2>
        <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-2xl mx-auto">
          Эксклюзивные экскурсии, аренда авто и незабываемые впечатления в самом современном городе мира
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/tours"
            className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-amber-600 hover:to-orange-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Выбрать экскурсию
          </Link>
          <Link
            to="/rental"
            className="bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/30 transition-all duration-300 border border-white/30"
          >
            Арендовать авто
          </Link>
        </div>
      </div>
    </section>
  );
});

HomeHero.displayName = 'HomeHero';

export default HomeHero; 