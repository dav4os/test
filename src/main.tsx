import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.tsx';
import './index.css';
import { reportWebVitals, setupPerformanceObserver, analyzeBundleSize, checkPerformanceBudget } from './utils/performance';

// Initialize app
const initApp = () => {
  const root = createRoot(document.getElementById('root')!);
  
  root.render(
    <HelmetProvider>
      <BrowserRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true
        }}
      >
        <App />
      </BrowserRouter>
    </HelmetProvider>
  );
  
  // Performance monitoring
  reportWebVitals((metric) => {
    console.log(metric);
  });
  
  setupPerformanceObserver();
};

// Start app with performance optimizations
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initApp();
  });
} else {
  initApp();
}

// Analyze bundle size and performance in development
if (import.meta.env.DEV) {
  window.addEventListener('load', () => {
    setTimeout(() => {
      analyzeBundleSize();
      checkPerformanceBudget();
    }, 2000);
  });
}