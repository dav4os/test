import { useCallback, useRef, useEffect, useState } from 'react';

interface RenderOptimizationOptions {
  debounceMs?: number;
  throttleMs?: number;
  useRequestIdleCallback?: boolean;
  priority?: 'high' | 'low' | 'background';
}

export const useOptimizedRender = (options: RenderOptimizationOptions = {}) => {
  const {
    debounceMs = 16, // ~60fps
    throttleMs = 100,
    useRequestIdleCallback = true,
    priority = 'high'
  } = options;

  const renderTimeoutRef = useRef<number>();
  const lastRenderTimeRef = useRef<number>(0);
  const isRenderingRef = useRef(false);

  // Debounced render function
  const debouncedRender = useCallback((callback: () => void) => {
    if (renderTimeoutRef.current) {
      clearTimeout(renderTimeoutRef.current);
    }

    renderTimeoutRef.current = setTimeout(() => {
      if (!isRenderingRef.current) {
        isRenderingRef.current = true;
        callback();
        isRenderingRef.current = false;
      }
    }, debounceMs);
  }, [debounceMs]);

  // Throttled render function
  const throttledRender = useCallback((callback: () => void) => {
    const now = Date.now();
    if (now - lastRenderTimeRef.current >= throttleMs) {
      lastRenderTimeRef.current = now;
      if (!isRenderingRef.current) {
        isRenderingRef.current = true;
        callback();
        isRenderingRef.current = false;
      }
    }
  }, [throttleMs]);

  // Idle callback render function
  const idleRender = useCallback((callback: () => void) => {
    if ('requestIdleCallback' in window && useRequestIdleCallback) {
      requestIdleCallback(() => {
        if (!isRenderingRef.current) {
          isRenderingRef.current = true;
          callback();
          isRenderingRef.current = false;
        }
      }, { timeout: 1000 });
    } else {
      // Fallback to setTimeout
      setTimeout(() => {
        if (!isRenderingRef.current) {
          isRenderingRef.current = true;
          callback();
          isRenderingRef.current = false;
        }
      }, 100);
    }
  }, [useRequestIdleCallback]);

  // Priority-based render function
  const optimizedRender = useCallback((callback: () => void) => {
    switch (priority) {
      case 'high':
        // Render immediately for high priority
        if (!isRenderingRef.current) {
          isRenderingRef.current = true;
          callback();
          isRenderingRef.current = false;
        }
        break;
      case 'low':
        // Use debounced render for low priority
        debouncedRender(callback);
        break;
      case 'background':
        // Use idle callback for background tasks
        idleRender(callback);
        break;
      default:
        // Use throttled render as default
        throttledRender(callback);
    }
  }, [priority, debouncedRender, throttledRender, idleRender]);

  // Cleanup function
  useEffect(() => {
    return () => {
      if (renderTimeoutRef.current) {
        clearTimeout(renderTimeoutRef.current);
      }
      isRenderingRef.current = false;
    };
  }, []);

  return {
    optimizedRender,
    debouncedRender,
    throttledRender,
    idleRender,
    isRendering: isRenderingRef.current
  };
};

// Hook for optimizing list rendering
export const useListOptimization = <T>(
  items: T[],
  options: {
    batchSize?: number;
    delayMs?: number;
    useVirtualization?: boolean;
  } = {}
) => {
  const {
    batchSize = 10,
    delayMs = 16,
    useVirtualization = true
  } = options;

  const [visibleItems, setVisibleItems] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const currentIndexRef = useRef(0);

  // Progressive loading for large lists
  const loadMoreItems = useCallback(() => {
    if (currentIndexRef.current >= items.length) {
      setIsLoading(false);
      return;
    }

    const nextBatch = items.slice(
      currentIndexRef.current,
      currentIndexRef.current + batchSize
    );

    setVisibleItems((prev: T[]) => [...prev, ...nextBatch]);
    currentIndexRef.current += batchSize;

    if (currentIndexRef.current < items.length) {
      setTimeout(loadMoreItems, delayMs);
    } else {
      setIsLoading(false);
    }
  }, [items, batchSize, delayMs]);

  // Initialize loading
  useEffect(() => {
    if (useVirtualization && items.length > batchSize) {
      setVisibleItems(items.slice(0, batchSize));
      currentIndexRef.current = batchSize;
      if (items.length > batchSize) {
        setTimeout(loadMoreItems, delayMs);
      } else {
        setIsLoading(false);
      }
    } else {
      setVisibleItems(items);
      setIsLoading(false);
    }
  }, [items, batchSize, delayMs, useVirtualization, loadMoreItems]);

  return {
    visibleItems,
    isLoading,
    totalItems: items.length,
    loadMoreItems
  };
};

// Hook for optimizing image loading
export const useImageOptimization = (src: string, options: {
  preload?: boolean;
  priority?: 'high' | 'low';
  placeholder?: string;
} = {}) => {
  const { preload = false, priority = 'low', placeholder } = options;
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  const imgRef = useRef<HTMLImageElement>();

  useEffect(() => {
    if (!src) return;

    const img = new Image();
    imgRef.current = img;

    if (preload && priority === 'high') {
      // High priority preload
      img.fetchPriority = 'high';
    }

    img.onload = () => {
      setIsLoaded(true);
      setError(false);
    };

    img.onerror = () => {
      setError(true);
      setIsLoaded(false);
    };

    img.src = src;

    return () => {
      if (imgRef.current) {
        imgRef.current.onload = null;
        imgRef.current.onerror = null;
      }
    };
  }, [src, preload, priority]);

  return {
    isLoaded,
    error,
    placeholder: placeholder || src
  };
}; 