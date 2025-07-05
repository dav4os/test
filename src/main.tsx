import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.tsx';
import './index.css';
import { reportWebVitals } from './utils/performance';
import { validateEnv } from './config/env';
import { initAnalytics } from './utils/analytics';

// Валидируем переменные окружения
validateEnv();

// Инициализируем аналитику
initAnalytics();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>
);

// Measure performance
reportWebVitals((metric) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(metric);
  }
  // Here you would send metrics to your analytics service
});