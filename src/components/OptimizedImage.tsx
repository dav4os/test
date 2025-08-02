import React, { memo, useState, useEffect, useRef } from 'react';
import { getOptimalImagePath } from '../utils/imageUtils';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackSrc?: string;
  loading?: 'lazy' | 'eager';
  priority?: boolean;
  sizes?: string;
  onLoad?: () => void;
  onError?: () => void;
}

const OptimizedImage: React.FC<OptimizedImageProps> = memo(({
  src,
  alt,
  className = '',
  fallbackSrc,
  loading = 'lazy',
  priority = false,
  sizes = '100vw',
  onLoad,
  onError
}) => {
  const [currentSrc, setCurrentSrc] = useState<string>('');
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // Получаем оптимальный путь к изображению
    const optimalSrc = getOptimalImagePath(src);
    setCurrentSrc(optimalSrc);
    setHasError(false);
    setIsLoading(true);
    setIsLoaded(false);
  }, [src]);

  const handleLoad = () => {
    setIsLoading(false);
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    if (!hasError && currentSrc.endsWith('.webp')) {
      // Пробуем оригинальный формат если WebP не загрузился
      const originalSrc = currentSrc.replace('.webp', '.jpg');
      setCurrentSrc(originalSrc);
      setHasError(true);
    } else if (fallbackSrc && currentSrc !== fallbackSrc) {
      // Пробуем fallback если предоставлен
      setCurrentSrc(fallbackSrc);
      setHasError(true);
    } else {
      setIsLoading(false);
      onError?.();
    }
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Placeholder во время загрузки */}
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse rounded" />
      )}
      
      {/* Основное изображение */}
      <img
        ref={imgRef}
        src={currentSrc}
        alt={alt}
        className={`${className} transition-all duration-300 ${
          isLoading ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
        }`}
        loading={loading}
        fetchPriority={priority ? 'high' : 'auto'}
        sizes={sizes}
        onLoad={handleLoad}
        onError={handleError}
      />
      
      {/* Индикатор загрузки */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
});

OptimizedImage.displayName = 'OptimizedImage';

export default OptimizedImage; 