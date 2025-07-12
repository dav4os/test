import React, { useState, useRef, useEffect } from 'react';

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

// Simple image optimization for Pexels URLs
const optimizeImageUrl = (url: string, width?: number, height?: number, quality = 85): string => {
  if (!url) return '';

  if (url.includes('pexels.com')) {
    const params = new URLSearchParams();
    if (width) params.append('w', width.toString());
    if (height) params.append('h', height.toString());
    params.append('auto', 'compress');
    params.append('cs', 'tinysrgb');
    
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}${params.toString()}`;
  }

  return url;
};

// Simple intersection observer hook
const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const elementRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
        ...options
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  return [elementRef, isIntersecting] as const;
};

// Create placeholder data URL
const createPlaceholderDataUrl = (width: number, height: number, color = '#f3f4f6'): string => {
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="${color}"/>
      <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="14" fill="#9ca3af" text-anchor="middle" dy=".3em">
        Loading...
      </text>
    </svg>
  `;
  
  return `data:image/svg+xml;base64,${btoa(svg)}`;
};

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
  
  const [intersectionRef, isIntersecting] = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '50px'
  });

  // Optimize the image URL
  const optimizedSrc = optimizeImageUrl(src, width, height, quality);

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
    if (retryCount < 2) {
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
      // Show error placeholder
      setHasError(true);
      setImageSrc(createPlaceholderDataUrl(width || 300, height || 200, '#ef4444'));
    }
    onError?.();
  };

  return (
    <img
      ref={intersectionRef}
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