import React, { useState, useRef, useEffect } from 'react';
import { optimizeImageUrl, handleImageError, createPlaceholderDataUrl } from '../utils/imageUtils';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

interface ReliableImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  lazy?: boolean;
  fallbackSrc?: string;
  quality?: number;
  onLoad?: () => void;
  onError?: () => void;
}

function ReliableImage({
  src,
  alt,
  className = '',
  width,
  height,
  lazy = true,
  fallbackSrc,
  quality = 85,
  onLoad,
  onError
}: ReliableImageProps) {
  const [imageSrc, setImageSrc] = useState<string>(
    lazy ? createPlaceholderDataUrl(width || 300, height || 200) : src
  );
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const imgRef = useRef<HTMLImageElement>(null);
  
  const [intersectionRef, isIntersecting] = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '50px',
    triggerOnce: true
  });

  // Optimize the image URL
  const optimizedSrc = optimizeImageUrl(src, {
    width,
    height,
    quality,
    format: 'webp'
  });

  // Load image when it comes into view (if lazy loading is enabled)
  useEffect(() => {
    if (lazy && isIntersecting && !isLoaded && !hasError) {
      setImageSrc(optimizedSrc);
    } else if (!lazy && !isLoaded) {
      setImageSrc(optimizedSrc);
    }
  }, [isIntersecting, lazy, optimizedSrc, isLoaded, hasError]);

  const handleImageLoad = () => {
    setIsLoaded(true);
    setHasError(false);
    onLoad?.();
  };

  const handleImageError = () => {
    if (retryCount < 3) {
      // Retry with a delay
      setTimeout(() => {
        setRetryCount(prev => prev + 1);
        setImageSrc(`${optimizedSrc}${optimizedSrc.includes('?') ? '&' : '?'}retry=${retryCount + 1}&t=${Date.now()}`);
      }, 1000 * (retryCount + 1));
    } else if (fallbackSrc && imageSrc !== fallbackSrc) {
      // Use fallback image
      setImageSrc(fallbackSrc);
      setRetryCount(0);
    } else {
      // Show placeholder
      setHasError(true);
      setImageSrc(createPlaceholderDataUrl(width || 300, height || 200, '#ef4444'));
    }
    onError?.();
  };

  return (
    <img
      ref={(el) => {
        imgRef.current = el;
        if (lazy) {
          (intersectionRef as React.MutableRefObject<HTMLImageElement | null>).current = el;
        }
      }}
      src={imageSrc}
      alt={alt}
      className={`transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-70'} ${className}`}
      width={width}
      height={height}
      onLoad={handleImageLoad}
      onError={handleImageError}
      loading={lazy ? 'lazy' : 'eager'}
      decoding="async"
    />
  );
}

export default ReliableImage;