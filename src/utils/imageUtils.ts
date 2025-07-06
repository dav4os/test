// Утилиты для работы с изображениями

export interface ImageConfig {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'webp' | 'jpg' | 'png';
  fit?: 'cover' | 'contain' | 'fill';
}

// Оптимизация URL изображений
export const optimizeImageUrl = (url: string, config: ImageConfig = {}): string => {
  if (!url) return '';

  const { width, height, quality = 85, format, fit = 'cover' } = config;

  // Для Pexels изображений
  if (url.includes('pexels.com')) {
    const params = new URLSearchParams();
    
    if (width) params.append('w', width.toString());
    if (height) params.append('h', height.toString());
    
    params.append('auto', 'compress');
    params.append('cs', 'tinysrgb');
    params.append('q', quality.toString());
    params.append('fit', fit);
    
    if (format) params.append('fm', format);
    
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}${params.toString()}`;
  }

  // Для других сервисов можно добавить аналогичную логику
  return url;
};

// Генерация srcSet для responsive изображений
export const generateSrcSet = (baseUrl: string, sizes: number[]): string => {
  return sizes
    .map(size => `${optimizeImageUrl(baseUrl, { width: size })} ${size}w`)
    .join(', ');
};

// Определение оптимального размера изображения на основе viewport
export const getOptimalImageSize = (containerWidth: number, devicePixelRatio: number = 1): number => {
  const targetWidth = containerWidth * devicePixelRatio;
  
  // Стандартные размеры для оптимизации
  const standardSizes = [320, 480, 640, 800, 1024, 1280, 1600, 1920];
  
  // Находим ближайший больший размер
  return standardSizes.find(size => size >= targetWidth) || standardSizes[standardSizes.length - 1];
};

// Проверка поддержки WebP
export const supportsWebP = (): Promise<boolean> => {
  return new Promise((resolve) => {
    const webP = new Image();
    webP.onload = webP.onerror = () => {
      resolve(webP.height === 2);
    };
    webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
  });
};

// Создание placeholder изображения
export const createPlaceholderDataUrl = (width: number, height: number, color: string = '#f3f4f6'): string => {
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="${color}"/>
      <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="14" fill="#9ca3af" text-anchor="middle" dy=".3em">
        ${width}×${height}
      </text>
    </svg>
  `;
  
  return `data:image/svg+xml;base64,${btoa(svg)}`;
};

// Обработка ошибок загрузки изображений
export const handleImageError = (
  img: HTMLImageElement, 
  fallbackUrl?: string,
  retryCount: number = 0,
  maxRetries: number = 3
): void => {
  if (retryCount < maxRetries) {
    // Повторная попытка с задержкой
    setTimeout(() => {
      const newUrl = `${img.src}${img.src.includes('?') ? '&' : '?'}retry=${retryCount + 1}&t=${Date.now()}`;
      img.src = newUrl;
    }, 1000 * (retryCount + 1));
  } else if (fallbackUrl) {
    img.src = fallbackUrl;
  } else {
    // Заменяем на placeholder
    img.src = createPlaceholderDataUrl(img.width || 300, img.height || 200);
  }
};

// Предзагрузка критических изображений
export const preloadCriticalImages = (urls: string[]): Promise<void[]> => {
  const promises = urls.map(url => {
    return new Promise<void>((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve();
      img.onerror = () => reject(new Error(`Failed to preload: ${url}`));
      img.src = url;
    });
  });

  return Promise.allSettled(promises) as Promise<void[]>;
};

// Lazy loading с Intersection Observer
export const createImageObserver = (
  callback: (entries: IntersectionObserverEntry[]) => void,
  options: IntersectionObserverInit = {}
): IntersectionObserver => {
  const defaultOptions: IntersectionObserverInit = {
    root: null,
    rootMargin: '50px',
    threshold: 0.1,
    ...options
  };

  return new IntersectionObserver(callback, defaultOptions);
};

// Определение качества сети для адаптивной загрузки
export const getNetworkQuality = (): 'slow' | 'fast' | 'unknown' => {
  if ('connection' in navigator) {
    const connection = (navigator as any).connection;
    const effectiveType = connection.effectiveType;
    
    if (effectiveType === 'slow-2g' || effectiveType === '2g') {
      return 'slow';
    } else if (effectiveType === '3g' || effectiveType === '4g') {
      return 'fast';
    }
  }
  
  return 'unknown';
};

// Адаптивное качество изображений на основе сети
export const getAdaptiveQuality = (): number => {
  const networkQuality = getNetworkQuality();
  
  switch (networkQuality) {
    case 'slow':
      return 60; // Низкое качество для медленных соединений
    case 'fast':
      return 90; // Высокое качество для быстрых соединений
    default:
      return 75; // Среднее качество по умолчанию
  }
};