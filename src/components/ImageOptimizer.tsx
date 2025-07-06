import React, { useState, useRef, useEffect } from 'react';

interface ImageOptimizerProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  quality?: number;
  placeholder?: string;
  lazy?: boolean;
}

function ImageOptimizer({ 
  src, 
  alt, 
  className = '', 
  width, 
  height, 
  quality = 80,
  placeholder,
  lazy = true 
}: ImageOptimizerProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(!lazy);
  const [error, setError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Optimize image URL
  const getOptimizedUrl = (originalUrl: string) => {
    if (originalUrl.includes('pexels.com')) {
      const params = new URLSearchParams();
      if (width) params.append('w', width.toString());
      if (height) params.append('h', height.toString());
      params.append('auto', 'compress');
      params.append('cs', 'tinysrgb');
      params.append('q', quality.toString());
      
      return `${originalUrl}?${params.toString()}`;
    }
    return originalUrl;
  };

  // Generate WebP alternative
  const getWebPUrl = (originalUrl: string) => {
    if (originalUrl.includes('pexels.com')) {
      const optimizedUrl = getOptimizedUrl(originalUrl);
      return optimizedUrl.replace(/\.(jpg|jpeg|png)/, '.webp');
    }
    return null;
  };

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!lazy) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { 
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [lazy]);

  const optimizedSrc = getOptimizedUrl(src);
  const webpSrc = getWebPUrl(src);

  return (
    <div ref={imgRef} className={`relative overflow-hidden ${className}`}>
      {/* Loading placeholder */}
      {!isLoaded && !error && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
          {placeholder ? (
            <span className="text-gray-400 text-sm">{placeholder}</span>
          ) : (
            <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
          )}
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <span className="text-gray-500 text-sm">Failed to load image</span>
        </div>
      )}

      {/* Actual image */}
      {isInView && (
        <picture>
          {webpSrc && (
            <source srcSet={webpSrc} type="image/webp" />
          )}
          <img
            src={optimizedSrc}
            alt={alt}
            className={`${className} transition-opacity duration-300 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setIsLoaded(true)}
            onError={() => setError(true)}
            loading={lazy ? 'lazy' : 'eager'}
            width={width}
            height={height}
            decoding="async"
          />
        </picture>
      )}
    </div>
  );
}

export default ImageOptimizer;