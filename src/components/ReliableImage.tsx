import React, { useState, useRef, useEffect } from 'react';
import { ImageIcon, AlertCircle } from 'lucide-react';

interface ReliableImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  fallbackSrc?: string;
  placeholder?: React.ReactNode;
  lazy?: boolean;
  retryCount?: number;
  onLoad?: () => void;
  onError?: () => void;
}

function ReliableImage({ 
  src, 
  alt, 
  className = '', 
  width, 
  height,
  fallbackSrc,
  placeholder,
  lazy = true,
  retryCount = 3,
  onLoad,
  onError
}: ReliableImageProps) {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(!lazy);
  const [hasError, setHasError] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

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
        rootMargin: '100px' // Загружаем изображения заранее
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [lazy, isInView]);

  // Функция для получения оптимизированного URL
  const getOptimizedUrl = (url: string, attempt: number = 0) => {
    if (!url) return '';
    
    // Для Pexels изображений добавляем параметры оптимизации
    if (url.includes('pexels.com')) {
      const params = new URLSearchParams();
      
      // Добавляем размеры если указаны
      if (width) params.append('w', width.toString());
      if (height) params.append('h', height.toString());
      
      // Параметры сжатия
      params.append('auto', 'compress');
      params.append('cs', 'tinysrgb');
      params.append('q', '85'); // Качество 85%
      
      // Добавляем случайный параметр для обхода кэша при повторных попытках
      if (attempt > 0) {
        params.append('retry', attempt.toString());
        params.append('t', Date.now().toString());
      }
      
      const separator = url.includes('?') ? '&' : '?';
      return `${url}${separator}${params.toString()}`;
    }
    
    // Для других изображений просто добавляем параметр для обхода кэша
    if (attempt > 0) {
      const separator = url.includes('?') ? '&' : '?';
      return `${url}${separator}t=${Date.now()}&retry=${attempt}`;
    }
    
    return url;
  };

  // Обработка загрузки изображения
  const handleLoad = () => {
    setIsLoaded(true);
    setHasError(false);
    onLoad?.();
  };

  // Обработка ошибки загрузки
  const handleError = () => {
    console.warn(`Failed to load image: ${currentSrc} (attempt ${attempts + 1})`);
    
    if (attempts < retryCount) {
      // Повторная попытка с задержкой
      setTimeout(() => {
        setAttempts(prev => prev + 1);
        setCurrentSrc(getOptimizedUrl(src, attempts + 1));
      }, 1000 * (attempts + 1)); // Увеличиваем задержку с каждой попыткой
    } else if (fallbackSrc && currentSrc !== fallbackSrc) {
      // Используем fallback изображение
      setCurrentSrc(fallbackSrc);
      setAttempts(0);
    } else {
      // Показываем ошибку
      setHasError(true);
      onError?.();
    }
  };

  // Сброс состояния при изменении src
  useEffect(() => {
    setCurrentSrc(getOptimizedUrl(src));
    setIsLoaded(false);
    setHasError(false);
    setAttempts(0);
  }, [src, width, height]);

  // Предзагрузка изображения
  useEffect(() => {
    if (!isInView || !currentSrc) return;

    const img = new Image();
    img.onload = handleLoad;
    img.onerror = handleError;
    img.src = currentSrc;

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [currentSrc, isInView]);

  const defaultPlaceholder = (
    <div className="flex flex-col items-center justify-center h-full bg-gray-100 text-gray-400">
      <ImageIcon size={32} className="mb-2" />
      <span className="text-sm">Загрузка...</span>
    </div>
  );

  const errorPlaceholder = (
    <div className="flex flex-col items-center justify-center h-full bg-gray-100 text-gray-500">
      <AlertCircle size={32} className="mb-2 text-red-400" />
      <span className="text-sm text-center px-2">
        Не удалось загрузить изображение
      </span>
      <button 
        onClick={() => {
          setAttempts(0);
          setHasError(false);
          setCurrentSrc(getOptimizedUrl(src));
        }}
        className="mt-2 px-3 py-1 bg-amber-500 text-white text-xs rounded hover:bg-amber-600 transition-colors"
      >
        Повторить
      </button>
    </div>
  );

  return (
    <div 
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      style={{ width, height }}
    >
      {/* Placeholder или ошибка */}
      {(!isLoaded || hasError) && (
        <div className="absolute inset-0">
          {hasError ? errorPlaceholder : (placeholder || defaultPlaceholder)}
        </div>
      )}

      {/* Индикатор загрузки */}
      {isInView && !isLoaded && !hasError && attempts > 0 && (
        <div className="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-xs">
          Попытка {attempts + 1}/{retryCount + 1}
        </div>
      )}

      {/* Основное изображение */}
      {isInView && currentSrc && !hasError && (
        <img
          ref={imgRef}
          src={currentSrc}
          alt={alt}
          className={`${className} transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ width, height }}
          loading={lazy ? 'lazy' : 'eager'}
          decoding="async"
          onLoad={handleLoad}
          onError={handleError}
        />
      )}
    </div>
  );
}

export default ReliableImage;