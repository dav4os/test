// Утилиты для работы с Google Sheets API

export interface LeadData {
  name: string;
  phone: string;
  email: string;
  type: string;
  message: string;
}

export interface GoogleSheetsResponse {
  success: boolean;
  message?: string;
  error?: string;
}

// Конфигурация Google Sheets
const GOOGLE_SHEETS_CONFIG = {
  // URL вашего Google Apps Script (обновите если изменился)
  WEBAPP_URL: 'https://script.google.com/macros/s/AKfycbz-m7nEcW0EVE2KMDSIbiefpWk_ZxM9LveF3SVkQhCWdQB7G-WVgaL2f_C01Cy6VlF2nA/exec',
  
  // Таймаут для запросов (в миллисекундах)
  TIMEOUT: 10000,
  
  // Максимальное количество попыток
  MAX_RETRIES: 3
};

/**
 * Отправляет данные заявки в Google Sheets через JSONP (обход CORS)
 */
export const submitLeadWithJSONP = (leadData: LeadData): Promise<GoogleSheetsResponse> => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    const callbackName = 'jsonpCallback_' + Date.now();
    
    // Создаем глобальную функцию для callback
    (window as any)[callbackName] = (response: any) => {
      document.body.removeChild(script);
      delete (window as any)[callbackName];
      
      if (response && response.success) {
        resolve({
          success: true,
          message: response.message || 'Заявка успешно отправлена'
        });
      } else {
        resolve({
          success: false,
          error: response?.error || 'Неизвестная ошибка'
        });
      }
    };
    
    // Подготавливаем параметры
    const params = new URLSearchParams({
      name: leadData.name,
      phone: leadData.phone,
      email: leadData.email,
      type: leadData.type,
      message: leadData.message,
      callback: callbackName
    });
    
    // Создаем URL с параметрами
    script.src = `${GOOGLE_SHEETS_CONFIG.WEBAPP_URL}?${params.toString()}`;
    
    // Добавляем обработчик ошибок
    script.onerror = () => {
      document.body.removeChild(script);
      delete (window as any)[callbackName];
      reject(new Error('Ошибка загрузки скрипта'));
    };
    
    // Добавляем скрипт на страницу
    document.body.appendChild(script);
    
    // Таймаут
    setTimeout(() => {
      if ((window as any)[callbackName]) {
        document.body.removeChild(script);
        delete (window as any)[callbackName];
        reject(new Error('Таймаут запроса'));
      }
    }, GOOGLE_SHEETS_CONFIG.TIMEOUT);
  });
};

/**
 * Отправляет данные заявки в Google Sheets
 */
export const submitLeadToGoogleSheets = async (leadData: LeadData): Promise<GoogleSheetsResponse> => {
  let retries = 0;
  
  while (retries < GOOGLE_SHEETS_CONFIG.MAX_RETRIES) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), GOOGLE_SHEETS_CONFIG.TIMEOUT);
      
      const response = await fetch(GOOGLE_SHEETS_CONFIG.WEBAPP_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(leadData),
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      
      if (result.success) {
        return {
          success: true,
          message: result.message || 'Заявка успешно отправлена'
        };
      } else {
        throw new Error(result.error || 'Неизвестная ошибка');
      }
      
    } catch (error) {
      retries++;
      console.error(`Attempt ${retries} failed:`, error);
      
      if (retries >= GOOGLE_SHEETS_CONFIG.MAX_RETRIES) {
        // Если все попытки fetch не удались, пробуем JSONP
        console.log('Trying JSONP as fallback...');
        try {
          return await submitLeadWithJSONP(leadData);
        } catch (jsonpError) {
          return {
            success: false,
            error: error instanceof Error ? error.message : 'Произошла ошибка при отправке заявки'
          };
        }
      }
      
      // Ждем перед следующей попыткой (экспоненциальная задержка)
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, retries) * 1000));
    }
  }
  
  return {
    success: false,
    error: 'Превышено максимальное количество попыток'
  };
};

/**
 * Валидирует данные заявки
 */
export const validateLeadData = (data: LeadData): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  // Проверка имени
  if (!data.name || data.name.trim().length < 2) {
    errors.push('Имя должно содержать минимум 2 символа');
  }
  
  // Проверка телефона
  const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
  if (!data.phone || !phoneRegex.test(data.phone.replace(/\s/g, ''))) {
    errors.push('Введите корректный номер телефона');
  }
  
  // Проверка email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !emailRegex.test(data.email)) {
    errors.push('Введите корректный email адрес');
  }
  
  // Проверка типа заявки
  if (!data.type || data.type.trim().length === 0) {
    errors.push('Выберите тип заявки');
  }
  
  // Проверка сообщения
  if (!data.message || data.message.trim().length < 10) {
    errors.push('Сообщение должно содержать минимум 10 символов');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Форматирует данные для отправки
 */
export const formatLeadData = (data: LeadData): LeadData => {
  return {
    name: data.name.trim(),
    phone: data.phone.trim(),
    email: data.email.trim().toLowerCase(),
    type: data.type.trim(),
    message: data.message.trim()
  };
};

/**
 * Тестирует подключение к Google Sheets
 */
export const testGoogleSheetsConnection = async (): Promise<boolean> => {
  try {
    const response = await fetch(GOOGLE_SHEETS_CONFIG.WEBAPP_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    return response.ok;
  } catch (error) {
    console.error('Google Sheets connection test failed:', error);
    return false;
  }
};

/**
 * Получает статистику заявок (если API поддерживает)
 */
export const getLeadsStatistics = async (): Promise<any> => {
  try {
    const response = await fetch(`${GOOGLE_SHEETS_CONFIG.WEBAPP_URL}?action=stats`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    if (response.ok) {
      return await response.json();
    }
    
    return null;
  } catch (error) {
    console.error('Failed to get leads statistics:', error);
    return null;
  }
};

// Дополнительные функции для расширенного Google Apps Script

/**
 * Отправляет заявку с дополнительными метаданными
 */
export const submitLeadWithMetadata = async (
  leadData: LeadData, 
  metadata: {
    source: string;
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
    userAgent?: string;
    referrer?: string;
  }
): Promise<GoogleSheetsResponse> => {
  const enrichedData = {
    ...leadData,
    ...metadata,
    timestamp: new Date().toISOString(),
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
  };
  
  return submitLeadToGoogleSheets(enrichedData);
};

/**
 * Отправляет заявку с файлами (если поддерживается)
 */
export const submitLeadWithFiles = async (
  leadData: LeadData,
  files: File[]
): Promise<GoogleSheetsResponse> => {
  try {
    const formData = new FormData();
    
    // Добавляем данные заявки
    formData.append('data', JSON.stringify(leadData));
    
    // Добавляем файлы
    files.forEach((file, index) => {
      formData.append(`file${index}`, file);
    });
    
    const response = await fetch(`${GOOGLE_SHEETS_CONFIG.WEBAPP_URL}?action=withFiles`, {
      method: 'POST',
      body: formData
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    
    return {
      success: result.success,
      message: result.message,
      error: result.error
    };
    
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Ошибка при отправке файлов'
    };
  }
}; 