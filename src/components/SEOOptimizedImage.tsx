import React from 'react';

interface SEOOptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  loading?: 'lazy' | 'eager';
  sizes?: string;
  srcSet?: string;
  title?: string;
  caption?: string;
  structuredData?: boolean;
}

const SEOOptimizedImage: React.FC<SEOOptimizedImageProps> = ({
  src,
  alt,
  className = '',
  width,
  height,
  priority = false,
  loading = 'lazy',
  sizes,
  srcSet,
  title,
  caption,
  structuredData = false
}) => {
  // Structured Data для изображения
  const imageStructuredData = structuredData ? {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    "contentUrl": src,
    "name": title || alt,
    "description": caption || alt,
    "width": width,
    "height": height
  } : null;

  return (
    <figure className="relative">
      {/* Structured Data */}
      {structuredData && imageStructuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(imageStructuredData) }}
        />
      )}
      
      {/* Image */}
      <img
        src={src}
        alt={alt}
        className={className}
        width={width}
        height={height}
        loading={priority ? 'eager' : loading}
        fetchPriority={priority ? 'high' : 'auto'}
        sizes={sizes}
        srcSet={srcSet}
        title={title}
      />
      
      {/* Caption */}
      {caption && (
        <figcaption className="text-sm text-gray-600 mt-2 text-center">
          {caption}
        </figcaption>
      )}
    </figure>
  );
};

export default SEOOptimizedImage; 