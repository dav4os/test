import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.tsx';
import './index.css';
import { reportWebVitals, setupPerformanceObserver, analyzeBundleSize } from './utils/performance';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>
);

// Performance monitoring
reportWebVitals((metric) => {
  console.log(metric);
  // Here you would send metrics to your analytics service
});

// Setup performance observers
setupPerformanceObserver();

// Analyze bundle size in development
if (process.env.NODE_ENV === 'development') {
  window.addEventListener('load', () => {
    setTimeout(() => {
      analyzeBundleSize();
    }, 2000);
  });
}