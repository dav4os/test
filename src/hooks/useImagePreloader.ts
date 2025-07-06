import { useState, useEffect } from 'react';

interface PreloadOptions {
  priority?: 'high' | 'low';
  timeout?: number;
}

function useImagePreloader(urls: string[], options: PreloadOptions = {}) {
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(false);

  const { priority = 'low', timeout = 10000 } = options;

  useEffect(() => {
    if (urls.length === 0) return;

    setIsLoading(true);
    const promises = urls.map(url => preloadImage(url, timeout));

    Promise.allSettled(promises).then(results => {
      const loaded = new Set<string>();
      const failed = new Set<string>();

      results.forEach((result, index) => {
        if (result.status === 'fulfilled') {
          loaded.add(urls[index]);
        } else {
          failed.add(urls[index]);
          console.warn(`Failed to preload image: ${urls[index]}`);
        }
      });

      setLoadedImages(loaded);
      setFailedImages(failed);
      setIsLoading(false);
    });
  }, [urls, timeout]);

  return { loadedImages, failedImages, isLoading };
}

function preloadImage(url: string, timeout: number): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    
    const timeoutId = setTimeout(() => {
      img.onload = null;
      img.onerror = null;
      reject(new Error(`Image load timeout: ${url}`));
    }, timeout);

    img.onload = () => {
      clearTimeout(timeoutId);
      resolve(url);
    };

    img.onerror = () => {
      clearTimeout(timeoutId);
      reject(new Error(`Failed to load image: ${url}`));
    };

    img.src = url;
  });
}

export default useImagePreloader;