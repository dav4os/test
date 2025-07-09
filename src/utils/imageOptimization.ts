// Утилиты для оптимизации изображений

export interface ImageOptimizationConfig {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'webp' | 'jpg' | 'png' | 'auto';
  fit?: 'crop' | 'cover' | 'contain' | 'fill';
  blur?: number;
  sharpen?: boolean;
}

// Определение оптимального размера на основе viewport и device pixel ratio
export const getOptimalImageSize = (
  containerWidth: number,
  containerHeight?: number,
  devicePixelRatio: number = window.devicePixelRatio || 1
) => {
  // Стандартные размеры для оптимизации
  const standardWidths = [320, 480, 640, 800, 1024, 1280, 1600, 1920, 2560];
  const standardHeights = [240, 360, 480, 600, 768, 960, 1200, 1440, 1920];

  const targetWidth = Math.ceil(containerWidth * devicePixelRatio);
  const targetHeight = containerHeight ? Math.ceil(containerHeight * devicePixelRatio) : undefined;

  const optimalWidth = standardWidths.find(w => w >= targetWidth) || standardWidths[standardWidths.length - 1];
  const optimalHeight = targetHeight 
    ? standardHeights.find(h => h >= targetHeight) || standardHeights[standardHeights.length - 1]
    : undefined;

  return { width: optimalWidth, height: optimalHeight };
};

// Оптимизация URL для различных сервисов
export const optimizeImageUrl = (url: string, config: ImageOptimizationConfig = {}): string => {
  if (!url) return '';

  const {
    width,
    height,
    quality = 85,
    format = 'auto',
    fit = 'crop',
    blur,
    sharpen
  } = config;

  // Pexels оптимизация
  if (url.includes('pexels.com')) {
    const params = new URLSearchParams();
    
    if (width) params.append('w', width.toString());
    if (height) params.append('h', height.toString());
    
    params.append('auto', 'compress');
    params.append('cs', 'tinysrgb');
    params.append('q', Math.min(Math.max(quality, 1), 100).toString());
    params.append('fit', fit);
    
    if (format !== 'auto') params.append('fm', format);
    if (blur) params.append('blur', blur.toString());
    if (sharpen) params.append('sharp', '1');
    
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}${params.toString()}`;
  }

  // Unsplash оптимизация
  if (url.includes('unsplash.com')) {
    const params = new URLSearchParams();
    
    if (width) params.append('w', width.toString());
    if (height) params.append('h', height.toString());
    params.append('q', quality.toString());
    params.append('fit', fit);
    
    if (format !== 'auto') params.append('fm', format);
    
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}${params.toString()}`;
  }

  return url;
};

// Генерация srcSet для responsive изображений
export const generateSrcSet = (baseUrl: string, sizes: number[]): string => {
  return sizes
    .map(size => `${optimizeImageUrl(baseUrl, { width: size })} ${size}w`)
    .join(', ');
};

// Генерация sizes атрибута
export const generateSizes = (breakpoints: Array<{ minWidth?: number; size: string }>): string => {
  return breakpoints
    .map(bp => bp.minWidth ? `(min-width: ${bp.minWidth}px) ${bp.size}` : bp.size)
    .join(', ');
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

// Проверка поддержки AVIF
export const supportsAVIF = (): Promise<boolean> => {
  return new Promise((resolve) => {
    const avif = new Image();
    avif.onload = avif.onerror = () => {
      resolve(avif.height === 2);
    };
    avif.src = 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgABogQEAwgMg8f8D///8WfhwB8+ErK42A=';
  });
};

// Определение лучшего формата изображения
export const getBestImageFormat = async (): Promise<'avif' | 'webp' | 'jpg'> => {
  if (await supportsAVIF()) return 'avif';
  if (await supportsWebP()) return 'webp';
  return 'jpg';
};

// Создание placeholder изображения
export const createPlaceholder = (
  width: number,
  height: number,
  color: string = '#f3f4f6',
  textColor: string = '#9ca3af'
): string => {
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${color};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${adjustBrightness(color, -10)};stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#grad)"/>
      <text x="50%" y="50%" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="500" fill="${textColor}" text-anchor="middle" dy=".3em">
        ${width}×${height}
      </text>
    </svg>
  `;
  
  return `data:image/svg+xml;base64,${btoa(svg)}`;
};

// Создание blur placeholder
export const createBlurPlaceholder = (
  width: number,
  height: number,
  colors: string[] = ['#f59e0b', '#f97316', '#ef4444']
): string => {
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="blur">
          <feGaussianBlur stdDeviation="8"/>
        </filter>
        <radialGradient id="grad" cx="50%" cy="50%" r="50%">
          ${colors.map((color, i) => 
            `<stop offset="${(i / (colors.length - 1)) * 100}%" style="stop-color:${color};stop-opacity:0.8" />`
          ).join('')}
        </radialGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#grad)" filter="url(#blur)"/>
    </svg>
  `;
  
  return `data:image/svg+xml;base64,${btoa(svg)}`;
};

// Вспомогательная функция для изменения яркости цвета
function adjustBrightness(hex: string, percent: number): string {
  const num = parseInt(hex.replace('#', ''), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) + amt;
  const G = (num >> 8 & 0x00FF) + amt;
  const B = (num & 0x0000FF) + amt;
  
  return '#' + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
    (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
    (B < 255 ? B < 1 ? 0 : B : 255))
    .toString(16).slice(1);
}

// Предзагрузка критических изображений
export const preloadImages = (urls: string[], priority: 'high' | 'low' = 'low'): Promise<void[]> => {
  const promises = urls.map(url => {
    return new Promise<void>((resolve, reject) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = url;
      
      if (priority === 'high') {
        link.setAttribute('fetchpriority', 'high');
      }
      
      link.onload = () => resolve();
      link.onerror = () => reject(new Error(`Failed to preload: ${url}`));
      
      document.head.appendChild(link);
    });
  });

  return Promise.allSettled(promises) as Promise<void[]>;
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

// Адаптивное качество на основе сети
export const getAdaptiveQuality = (): number => {
  const networkQuality = getNetworkQuality();
  
  switch (networkQuality) {
    case 'slow':
      return 60;
    case 'fast':
      return 90;
    default:
      return 75;
  }
};

// Batch загрузка изображений
export class ImageLoader {
  private queue: Array<{ url: string; resolve: Function; reject: Function }> = [];
  private loading = new Set<string>();
  private maxConcurrent = 3;
  private currentLoading = 0;

  load(url: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.loading.has(url)) {
        // Если уже загружается, ждем результат
        const existingPromise = Array.from(this.loading.values()).find(item => item === url);
        if (existingPromise) return;
      }

      this.queue.push({ url, resolve, reject });
      this.processQueue();
    });
  }

  private processQueue() {
    if (this.currentLoading >= this.maxConcurrent || this.queue.length === 0) {
      return;
    }

    const { url, resolve, reject } = this.queue.shift()!;
    this.currentLoading++;
    this.loading.add(url);

    const img = new Image();
    
    img.onload = () => {
      this.loading.delete(url);
      this.currentLoading--;
      resolve();
      this.processQueue();
    };

    img.onerror = () => {
      this.loading.delete(url);
      this.currentLoading--;
      reject(new Error(`Failed to load: ${url}`));
      this.processQueue();
    };

    img.src = url;
  }
}

// Singleton instance
export const imageLoader = new ImageLoader();