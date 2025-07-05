// Конфигурация переменных окружения
export const config = {
  // Supabase
  supabase: {
    url: import.meta.env.VITE_SUPABASE_URL || '',
    anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || '',
  },
  
  // Analytics
  analytics: {
    gaTrackingId: import.meta.env.VITE_GA_TRACKING_ID || '',
  },
  
  // Contact
  contact: {
    phone: import.meta.env.VITE_CONTACT_PHONE || '+971 50 123 4567',
    email: import.meta.env.VITE_CONTACT_EMAIL || 'info@exploreit.ae',
  },
  
  // Site
  site: {
    url: import.meta.env.VITE_SITE_URL || 'https://exploreit.ae',
    name: import.meta.env.VITE_SITE_NAME || 'Explore IT',
  },
  
  // Environment
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
};

// Валидация обязательных переменных
export const validateEnv = () => {
  const requiredVars = [
    'VITE_SUPABASE_URL',
    'VITE_SUPABASE_ANON_KEY',
  ];
  
  const missing = requiredVars.filter(
    varName => !import.meta.env[varName]
  );
  
  if (missing.length > 0 && config.isProduction) {
    console.error('Отсутствуют обязательные переменные окружения:', missing);
    throw new Error(`Отсутствуют переменные окружения: ${missing.join(', ')}`);
  }
  
  if (missing.length > 0 && config.isDevelopment) {
    console.warn('Отсутствуют переменные окружения:', missing);
    console.warn('Скопируйте .env.example в .env и заполните значения');
  }
};