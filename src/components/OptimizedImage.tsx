import React, { useState, useEffect, useRef } from 'react';
import { getOptimalImagePath } from '../utils/imageUtils';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackSrc?: string;
  priority?: boolean;
  loading?: 'lazy' | 'eager';
  onLoad?: () => void;
  onError?: () => void;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  fallbackSrc,
  priority = false,
  loading = 'lazy',
  onLoad,
  onError
}) => {
  const [currentSrc, setCurrentSrc] = useState<string>('');
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const optimalSrc = getOptimalImagePath(src);
    setCurrentSrc(optimalSrc);
    setHasError(false);
    setIsLoading(true);
  }, [src]);

  const handleLoad = () => {
    setIsLoading(false);
    onLoad?.();
  };

  const handleError = () => {
    if (!hasError && currentSrc.endsWith('.webp')) {
      // Fallback to JPG if WebP fails
      const originalSrc = currentSrc.replace('.webp', '.jpg');
      setCurrentSrc(originalSrc);
      setHasError(true);
    } else if (fallbackSrc && currentSrc !== fallbackSrc) {
      // Use provided fallback
      setCurrentSrc(fallbackSrc);
      setHasError(true);
    } else {
      setIsLoading(false);
      onError?.();
    }
  };

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded" />
      )}
      <img
        ref={imgRef}
        src={currentSrc}
        alt={alt}
        className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        loading={loading}
        fetchPriority={priority ? 'high' : 'auto'}
        onLoad={handleLoad}
        onError={handleError}
      />
    </div>
  );
};

export default OptimizedImage; 