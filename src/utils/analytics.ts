import { config } from '../config/env';

// Google Analytics 4 setup
export const GA_TRACKING_ID = config.analytics.gaTrackingId;

// Проверяем, что gtag доступен
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

// Log page views
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag && GA_TRACKING_ID) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

// Log specific events
export const event = ({ action, category, label, value }: {
  action: string;
  category: string;
  label?: string;
  value?: number;
}) => {
  if (typeof window !== 'undefined' && window.gtag && GA_TRACKING_ID) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Track button clicks
export const trackButtonClick = (buttonName: string, location: string) => {
  event({
    action: 'click',
    category: 'Button',
    label: `${buttonName} - ${location}`,
  });
};

// Track form submissions
export const trackFormSubmission = (formName: string) => {
  event({
    action: 'submit',
    category: 'Form',
    label: formName,
  });
};

// Track phone calls
export const trackPhoneCall = () => {
  event({
    action: 'click',
    category: 'Contact',
    label: 'Phone Call',
  });
};

// Track email clicks
export const trackEmailClick = () => {
  event({
    action: 'click',
    category: 'Contact',
    label: 'Email',
  });
};

// Initialize analytics
export const initAnalytics = () => {
  if (!GA_TRACKING_ID) {
    console.warn('Google Analytics tracking ID не настроен');
    return;
  }

  // Загружаем Google Analytics скрипт
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
  document.head.appendChild(script);

  // Инициализируем gtag
  window.gtag = window.gtag || function() {
    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).dataLayer.push(arguments);
  };
  
  window.gtag('js', new Date());
  window.gtag('config', GA_TRACKING_ID, {
    page_title: document.title,
    page_location: window.location.href,
  });
};