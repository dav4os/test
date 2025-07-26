import { useState, useEffect } from 'react';

interface UseImagePreloaderOptions {
  priority?: 'high' | 'medium' | 'low';
  onLoad?: () => void;
  onError?: () => void;
}

export const useImagePreloader = (
  imageUrls: string[],
  options: UseImagePreloaderOptions = {}
) => {
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!imageUrls.length) {
      setLoading(false);
      return;
    }

    let mounted = true;
    const newLoadedImages = new Set<string>();
    let loadedCount = 0;
    const totalImages = imageUrls.length;

    const loadImage = (url: string, priority: 'high' | 'medium' | 'low' = 'medium') => {
      return new Promise<void>((resolve, reject) => {
        const img = new Image();
        
        img.onload = () => {
          if (mounted) {
            newLoadedImages.add(url);
            loadedCount++;
            setLoadedImages(new Set(newLoadedImages));
            
            if (loadedCount === totalImages) {
              setLoading(false);
              options.onLoad?.();
            }
          }
          resolve();
        };
        
        img.onerror = () => {
          if (mounted) {
            setError(`Failed to load image: ${url}`);
            options.onError?.();
          }
          reject(new Error(`Failed to load image: ${url}`));
        };

        // Set priority based on importance
        if (priority === 'high') {
          img.fetchPriority = 'high';
        }
        
        img.src = url;
      });
    };

    // Load images with priority
    const loadImagesWithPriority = async () => {
      try {
        // Load high priority images first
        const highPriorityImages = imageUrls.slice(0, 3);
        const mediumPriorityImages = imageUrls.slice(3, 10);
        const lowPriorityImages = imageUrls.slice(10);

        // Load high priority images immediately
        await Promise.all(highPriorityImages.map(url => loadImage(url, 'high')));
        
        // Load medium priority images with small delay
        if (mediumPriorityImages.length > 0) {
          setTimeout(() => {
            mediumPriorityImages.forEach(url => loadImage(url, 'medium'));
          }, 100);
        }
        
        // Load low priority images with larger delay
        if (lowPriorityImages.length > 0) {
          setTimeout(() => {
            lowPriorityImages.forEach(url => loadImage(url, 'low'));
          }, 500);
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err.message : 'Unknown error');
        }
      }
    };

    loadImagesWithPriority();

    return () => {
      mounted = false;
    };
  }, [imageUrls, options.onLoad, options.onError]);

  return {
    loadedImages,
    loading,
    error,
    progress: loadedImages.size / imageUrls.length
  };
};

export default useImagePreloader;