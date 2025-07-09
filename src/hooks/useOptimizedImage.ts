import { useState, useEffect, useRef } from 'react';
import { optimizeImageUrl, getOptimalImageSize, getAdaptiveQuality } from '../utils/imageOptimization';

interface UseOptimizedImageOptions {
  width?: number;
  height?: number;
  quality?: number;
  lazy?: boolean;
  retryCount?: number;
  fallbackSrc?: string;
}

interface UseOptimizedImageReturn {
  src: string;
  isLoaded: boolean;
  isLoading: boolean;
  hasError: boolean;
  isInView: boolean;
  retry: () => void;
  elementRef: React.RefObject<HTMLElement>;
}

export function useOptimizedImage(
  originalSrc: string,
  options: UseOptimizedImageOptions = {}
): UseOptimizedImageReturn {
  const {
    width,
    height,
    quality,
    lazy = true,
    retryCount = 3,
    fallbackSrc
  } = options;

  const [src, setSrc] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(!lazy);
  const [attempts, setAttempts] = useState(0);
  
  const elementRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  // Intersection Observer для lazy loading
  useEffect(() => {
    if (!lazy || isInView) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '100px'
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [lazy, isInView]);

  // Оптимизация и загрузка изображения
  useEffect(() => {
    if (!isInView || !originalSrc) return;

    const loadImage = async () => {
      setIsLoading(true);
      setHasError(false);

      try {
        // Определяем оптимальные размеры
        const optimalSize = width && height 
          ? { width, height }
          : getOptimalImageSize(width || 800, height);

        // Определяем качество на основе сети
        const adaptiveQuality = quality || getAdaptiveQuality();

        // Оптимизируем URL
        const optimizedUrl = optimizeImageUrl(originalSrc, {
          ...optimalSize,
          quality: adaptiveQuality
        });

        setSrc(optimizedUrl);

        // Загружаем изображение
        const img = new Image();
        imgRef.current = img;

        await new Promise<void>((resolve, reject) => {
          img.onload = () => {
            setIsLoaded(true);
            setIsLoading(false);
            resolve();
          };

          img.onerror = () => {
            reject(new Error(`Failed to load image: ${optimizedUrl}`));
          };

          img.src = optimizedUrl;
        });

      } catch (error) {
        console.warn(`Image load failed (attempt ${attempts + 1}):`, error);

        if (attempts < retryCount) {
          // Повторная попытка с задержкой
          setTimeout(() => {
            setAttempts(prev => prev + 1);
          }, 1000 * (attempts + 1));
        } else if (fallbackSrc && src !== fallbackSrc) {
          // Используем fallback
          setSrc(fallbackSrc);
          setAttempts(0);
        } else {
          // Показываем ошибку
          setHasError(true);
          setIsLoading(false);
        }
      }
    };

    loadImage();

    return () => {
      if (imgRef.current) {
        imgRef.current.onload = null;
        imgRef.current.onerror = null;
      }
    };
  }, [originalSrc, isInView, attempts, width, height, quality, retryCount, fallbackSrc]);

  // Сброс состояния при изменении src
  useEffect(() => {
    setIsLoaded(false);
    setHasError(false);
    setAttempts(0);
    setSrc('');
  }, [originalSrc]);

  const retry = () => {
    setAttempts(0);
    setHasError(false);
    setIsLoaded(false);
  };

  return {
    src,
    isLoaded,
    isLoading,
    hasError,
    isInView,
    retry,
    elementRef
  };
}