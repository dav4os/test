import React, { useEffect, useRef } from 'react';

const PerformanceOptimizer: React.FC = () => {
  const optimizationTimeoutRef = useRef<number>();
  const isOptimizingRef = useRef(false);

  useEffect(() => {
    // Minimal optimizations with long delay to avoid blocking
    const deferOptimizations = () => {
      setTimeout(() => {
        // Only minimal critical optimizations
        optimizeCriticalResources();
        
        // Defer non-critical optimizations even further
        setTimeout(() => {
          if (!isOptimizingRef.current) {
            isOptimizingRef.current = true;
            preloadCriticalImages();
            prefetchNextPages();
            isOptimizingRef.current = false;
          }
        }, 3000);
      }, 5000); // Very long delay to avoid blocking initial load
    };

    deferOptimizations();

    // Cleanup function
    return () => {
      if (optimizationTimeoutRef.current) {
        clearTimeout(optimizationTimeoutRef.current);
      }
      isOptimizingRef.current = false;
    };
  }, []);

  // Minimal critical optimizations
  const optimizeCriticalResources = () => {
    // Only optimize above-fold images
    const aboveFoldImages = document.querySelectorAll('img[loading="lazy"]');
    if (aboveFoldImages.length > 0) {
      (aboveFoldImages[0] as HTMLImageElement).loading = 'eager';
    }
  };

  // Minimal image preloading
  const preloadCriticalImages = () => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = '/pexels-pixabay-162031.webp';
    document.head.appendChild(link);
  };

  // Minimal page prefetching
  const prefetchNextPages = () => {
    const currentPath = window.location.pathname;
    let nextPage = '/';
    
    if (currentPath === '/') {
      nextPage = '/about';
    } else if (currentPath === '/about') {
      nextPage = '/blog';
    } else if (currentPath === '/blog') {
      nextPage = '/rental';
    } else if (currentPath === '/rental') {
      nextPage = '/';
    }

    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = nextPage;
    document.head.appendChild(link);
  };

  return null; // Temporarily disabled to prevent long tasks
};

export default PerformanceOptimizer; 