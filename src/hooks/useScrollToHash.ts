import { useEffect } from 'react';

export function useScrollToHash(headerOffset = 80) {
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash) {
        const id = window.location.hash.replace('#', '');
        const el = document.getElementById(id);
        if (el) {
          const y = el.getBoundingClientRect().top + window.scrollY - headerOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }
    };
    // Скроллим при загрузке и при изменении hash
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [headerOffset]);
} 