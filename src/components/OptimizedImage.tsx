import React, { useState, useRef, useEffect } from 'react';
import { ImageIcon, AlertCircle, RefreshCw } from 'lucide-react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  quality?: number;
  lazy?: boolean;
  placeholder?: React.ReactNode;
  fallbackSrc?: string;
  onLoad?: () => void;
  onError?: () => void;
}

function OptimizedImage({
  src,
  alt,
  className = '',
  width,
  height,
  quality = 85,
  lazy = true,
  placeholder,
  fallbackSrc,
  onLoad,
  onError
}: OptimizedImageProps) {
  const [currentSrc, setCurrentSrc] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(!lazy);
  const [hasError, setHasError] = useState(false);
  const [isRetrying, setIsRetrying] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  // Оптимизация URL изображения
  const optimizeImageUrl = (url: string, attempt: number = 0) => {
    if (!url) return '';

    // Для Pexels изображений
    if (url.includes('pexels.com')) {
      const params = new URLSearchParams();
      
      if (width) params.append('w', Math.min(width * 2, 1920).toString()); // 2x для retina
      if (height) params.append('h', Math.min(height * 2, 1080).toString());
      
      params.append('auto', 'compress');
      params.append('cs', 'tinysrgb');
      params.append('q', quality.toString());
      params.append('fit', 'crop');
      
      // Добавляем параметры для повторных попыток
      if (attempt > 0) {
        params.append('retry', attempt.toString());
        params.append('cache', Date.now().toString());
      }
      
      const separator = url.includes('?') ? '&' : '?';
      return `${url}${separator}${params.toString()}`;
    }

    // Для других изображений
    if (attempt > 0) {
      const separator = url.includes('?') ? '&' : '?';
      return `${url}${separator}cache=${Date.now()}&retry=${attempt}`;
    }

    return url;
  };

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

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [lazy, isInView]);

  // Загрузка изображения
  useEffect(() => {
    if (!isInView || !src) return;

    const optimizedUrl = optimizeImageUrl(src, retryCount);
    setCurrentSrc(optimizedUrl);

    const img = new Image();
    
    img.onload = () => {
      setIsLoaded(true);
      setHasError(false);
      setIsRetrying(false);
      onLoad?.();
    };

    img.onerror = () => {
      console.warn(`Failed to load image: ${optimizedUrl} (attempt ${retryCount + 1})`);
      
      if (retryCount < 2) {
        // Повторная попытка
        setIsRetrying(true);
        setTimeout(() => {
          setRetryCount(prev => prev + 1);
        }, 1000 * (retryCount + 1));
      } else if (fallbackSrc && currentSrc !== fallbackSrc) {
        // Используем fallback
        setCurrentSrc(fallbackSrc);
        setRetryCount(0);
      } else {
        // Показываем ошибку
        setHasError(true);
        setIsRetrying(false);
        onError?.();
      }
    };

    img.src = optimizedUrl;

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src, isInView, retryCount, fallbackSrc, quality, width, height]);

  // Сброс состояния при изменении src
  useEffect(() => {
    setIsLoaded(false);
    setHasError(false);
    setRetryCount(0);
    setIsRetrying(false);
  }, [src]);

  const containerStyle = {
    width: width ? `${width}px` : undefined,
    height: height ? `${height}px` : undefined,
  };

  const defaultPlaceholder = (
    <div className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-gray-100 to-gray-200 text-gray-400">
      <ImageIcon size={Math.min(width || 48, height || 48, 48)} className="mb-2 opacity-50" />
      <span className="text-sm font-medium">
        {isRetrying ? 'Повторная попытка...' : 'Загрузка...'}
      </span>
      {isRetrying && (
        <RefreshCw size={16} className="mt-1 animate-spin" />
      )}
    </div>
  );

  const errorPlaceholder = (
    <div className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-red-50 to-red-100 text-red-400 p-4">
      <AlertCircle size={32} className="mb-2" />
      <span className="text-sm text-center font-medium mb-2">
        Не удалось загрузить изображение
      </span>
      <button
        onClick={() => {
          setRetryCount(0);
          setHasError(false);
          setIsRetrying(false);
        }}
        className="px-3 py-1 bg-red-500 text-white text-xs rounded-md hover:bg-red-600 transition-colors font-medium"
      >
        Повторить
      </button>
    </div>
  );

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      style={containerStyle}
    >
      {/* Placeholder или ошибка */}
      {(!isLoaded || hasError) && (
        <div className="absolute inset-0 flex items-center justify-center">
          {hasError ? errorPlaceholder : (placeholder || defaultPlaceholder)}
        </div>
      )}

      {/* Индикатор повторной попытки */}
      {isRetrying && !hasError && (
        <div className="absolute top-2 right-2 bg-amber-500 text-white px-2 py-1 rounded-md text-xs font-medium flex items-center gap-1">
          <RefreshCw size={12} className="animate-spin" />
          Попытка {retryCount + 1}
        </div>
      )}

      {/* Основное изображение */}
      {isInView && currentSrc && !hasError && (
        <img
          ref={imgRef}
          src={currentSrc}
          alt={alt}
          className={`${className} transition-all duration-500 ${
            isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          }`}
          style={containerStyle}
          loading={lazy ? 'lazy' : 'eager'}
          decoding="async"
        />
      )}

      {/* Прогресс загрузки */}
      {isInView && !isLoaded && !hasError && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
          <div className="h-full bg-gradient-to-r from-amber-500 to-orange-500 animate-pulse"></div>
        </div>
      )}
    </div>
  );
}

export default OptimizedImage;