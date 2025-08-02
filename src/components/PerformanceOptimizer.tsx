import React, { useEffect, useRef } from 'react';

const PerformanceOptimizer: React.FC = () => {
  const optimizationTimeoutRef = useRef<number>();
  const isOptimizingRef = useRef(false);

  useEffect(() => {
    // Быстрые критические оптимизации
    const runCriticalOptimizations = () => {
      // Оптимизация критических изображений
      optimizeCriticalImages();
      
      // Предзагрузка следующих страниц
      prefetchNextPages();
      
      // Оптимизация шрифтов
      optimizeFonts();
    };

    // Отложенные не-критические оптимизации
    const runNonCriticalOptimizations = () => {
      if (!isOptimizingRef.current) {
        isOptimizingRef.current = true;
        
        // Предзагрузка изображений
        preloadNonCriticalImages();
        
        // Оптимизация кэша
        optimizeCache();
        
        isOptimizingRef.current = false;
      }
    };

    // Запускаем критические оптимизации сразу
    runCriticalOptimizations();
    
    // Отложенные оптимизации через 100мс
    optimizationTimeoutRef.current = window.setTimeout(() => {
      runNonCriticalOptimizations();
    }, 100);

    // Cleanup function
    return () => {
      if (optimizationTimeoutRef.current) {
        clearTimeout(optimizationTimeoutRef.current);
      }
      isOptimizingRef.current = false;
    };
  }, []);

  // Оптимизация критических изображений
  const optimizeCriticalImages = () => {
    // Находим изображения выше fold и устанавливаем eager loading
    const aboveFoldImages = document.querySelectorAll('img[loading="lazy"]');
    aboveFoldImages.forEach((img, index) => {
      if (index < 3) { // Только первые 3 изображения
        (img as HTMLImageElement).loading = 'eager';
        (img as HTMLImageElement).fetchPriority = 'high';
      }
    });
  };

  // Предзагрузка критических изображений
  const preloadCriticalImages = () => {
    const criticalImages = [
      '/optimized/pexels-pixabay-162031.webp',
      '/optimized/pexels-apasaric-2044434.webp',
      '/optimized/pexels-bubi-2867769.webp'
    ];

    criticalImages.forEach(src => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
    });
  };

  // Предзагрузка не-критических изображений
  const preloadNonCriticalImages = () => {
    const nonCriticalImages = [
      '/optimized/pexels-lina-12238221.webp',
      '/optimized/pexels-avinashpatel-544542.webp',
      '/optimized/transportnoe-sredstvo-v-dvizenii.webp'
    ];

    nonCriticalImages.forEach(src => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
    });
  };

  // Предзагрузка следующих страниц
  const prefetchNextPages = () => {
    const currentPath = window.location.pathname;
    let nextPages = ['/tours', '/about', '/blog'];
    
    if (currentPath === '/') {
      nextPages = ['/tours', '/about'];
    } else if (currentPath === '/tours') {
      nextPages = ['/rental', '/about'];
    } else if (currentPath === '/about') {
      nextPages = ['/blog', '/rental'];
    } else if (currentPath === '/blog') {
      nextPages = ['/rental', '/'];
    } else if (currentPath === '/rental') {
      nextPages = ['/', '/tours'];
    }

    nextPages.forEach(page => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = page;
      document.head.appendChild(link);
    });
  };

  // Оптимизация шрифтов
  const optimizeFonts = () => {
    // Предзагрузка критических шрифтов
    const fontLinks = document.querySelectorAll('link[rel="preload"][as="font"]');
    if (fontLinks.length === 0) {
      // Добавляем preload для системных шрифтов
      const systemFonts = [
        'system-ui',
        '-apple-system',
        'BlinkMacSystemFont',
        'Segoe UI',
        'Roboto'
      ];
      
      // Устанавливаем font-display: swap для быстрой отрисовки
      const style = document.createElement('style');
      style.textContent = `
        @font-face {
          font-family: 'System Font';
          font-display: swap;
          src: local('${systemFonts.join("'), local('")}');
        }
      `;
      document.head.appendChild(style);
    }
  };

  // Оптимизация кэша
  const optimizeCache = () => {
    // Очистка старых кэшированных ресурсов
    if ('caches' in window) {
      caches.keys().then(cacheNames => {
        cacheNames.forEach(cacheName => {
          if (cacheName.includes('vite') || cacheName.includes('static')) {
            caches.delete(cacheName);
          }
        });
      });
    }
  };

  return null;
};

export default PerformanceOptimizer; 