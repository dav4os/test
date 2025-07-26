// Performance monitoring utilities

export const measurePerformance = (name: string, fn: () => void) => {
  const start = performance.now();
  fn();
  const end = performance.now();
  console.log(`${name} took ${end - start} milliseconds`);
};

export const reportWebVitals = (onPerfEntry?: (metric: any) => void) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

// Image optimization helper
export const getOptimizedImageUrl = (url: string, width?: number, height?: number, quality = 80) => {
  if (url.includes('pexels.com')) {
    const params = new URLSearchParams();
    if (width) params.append('w', width.toString());
    if (height) params.append('h', height.toString());
    params.append('auto', 'compress');
    params.append('cs', 'tinysrgb');
    params.append('q', quality.toString());
    
    return `${url}?${params.toString()}`;
  }
  return url;
};

// Lazy loading intersection observer
export const createLazyLoadObserver = (callback: (entries: IntersectionObserverEntry[]) => void) => {
  return new IntersectionObserver(callback, {
    root: null,
    rootMargin: '50px',
    threshold: 0.1
  });
};

// Bundle size analyzer
export const analyzeBundleSize = () => {
  if (typeof window !== 'undefined' && 'performance' in window) {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
    
    console.group('📊 Bundle Analysis');
    console.log('🌐 Page Load Time:', `${navigation.loadEventEnd - navigation.fetchStart}ms`);
    console.log('📦 Total Resources:', resources.length);
    
    const jsResources = resources.filter(r => r.name.includes('.js'));
    const cssResources = resources.filter(r => r.name.includes('.css'));
    const imageResources = resources.filter(r => r.name.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i));
    
    console.log('📜 JS Files:', jsResources.length);
    console.log('🎨 CSS Files:', cssResources.length);
    console.log('🖼️ Images:', imageResources.length);
    
    // Largest resources
    const largestResources = resources
      .sort((a, b) => (b.transferSize || 0) - (a.transferSize || 0))
      .slice(0, 5);
    
    console.log('🔍 Largest Resources:');
    largestResources.forEach(resource => {
      console.log(`  ${resource.name.split('/').pop()}: ${Math.round((resource.transferSize || 0) / 1024)}KB`);
    });
    
    console.groupEnd();
  }
};

// Memory usage monitoring
export const monitorMemoryUsage = () => {
  if ('memory' in performance) {
    const memory = (performance as any).memory;
    console.group('🧠 Memory Usage');
    console.log('Used:', `${Math.round(memory.usedJSHeapSize / 1024 / 1024)}MB`);
    console.log('Total:', `${Math.round(memory.totalJSHeapSize / 1024 / 1024)}MB`);
    console.log('Limit:', `${Math.round(memory.jsHeapSizeLimit / 1024 / 1024)}MB`);
    console.groupEnd();
  }
};

// Network quality detection
export const detectNetworkQuality = () => {
  if ('connection' in navigator) {
    const connection = (navigator as any).connection;
    console.group('🌐 Network Quality');
    console.log('Type:', connection.effectiveType);
    console.log('Downlink:', `${connection.downlink}Mbps`);
    console.log('RTT:', `${connection.rtt}ms`);
    console.groupEnd();
    
    return {
      type: connection.effectiveType,
      downlink: connection.downlink,
      rtt: connection.rtt
    };
  }
  return null;
};

// Performance observer for monitoring
export const setupPerformanceObserver = () => {
  if ('PerformanceObserver' in window) {
    // Monitor Long Tasks (> 50ms)
    const longTaskObserver = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (entry.duration > 50) {
          console.warn('⚠️ Long Task detected:', `${entry.duration}ms`, entry);
          
          // Analyze long task attribution
          const longTaskEntry = entry as any;
          if (longTaskEntry.attribution && longTaskEntry.attribution.length > 0) {
            const attribution = longTaskEntry.attribution[0];
            console.warn('🔍 Long Task Attribution:', {
              name: attribution.name,
              entryType: attribution.entryType,
              startTime: attribution.startTime,
              duration: attribution.duration
            });
          }
          
          // Suggest optimizations for long tasks
          if (entry.duration > 100) {
            console.warn('💡 Consider: Code splitting, lazy loading, or moving heavy operations to Web Workers');
          }
          
          if (entry.duration > 200) {
            console.warn('🚨 Critical: This long task significantly impacts user experience');
          }
        }
      });
    });
    
    try {
      longTaskObserver.observe({ entryTypes: ['longtask'] });
    } catch (e) {
      console.log('Long Task API not supported');
    }
    
    // Monitor Layout Shifts
    const clsObserver = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if ((entry as any).value > 0.1) {
          console.warn('⚠️ Layout Shift detected:', (entry as any).value, entry);
        }
      });
    });
    
    try {
      clsObserver.observe({ entryTypes: ['layout-shift'] });
    } catch (e) {
      console.log('Layout Shift API not supported');
    }

    // Monitor First Input Delay
    const fidObserver = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        const fidEntry = entry as any;
        if (fidEntry.processingStart && fidEntry.startTime && fidEntry.processingStart - fidEntry.startTime > 100) {
          console.warn('⚠️ Slow First Input:', `${fidEntry.processingStart - fidEntry.startTime}ms`);
        }
      });
    });

    try {
      fidObserver.observe({ entryTypes: ['first-input'] });
    } catch (e) {
      console.log('First Input API not supported');
    }
  }
};

// Component render time measurement
export const measureComponentRender = (componentName: string) => {
  return {
    start: () => performance.mark(`${componentName}-start`),
    end: () => {
      performance.mark(`${componentName}-end`);
      performance.measure(componentName, `${componentName}-start`, `${componentName}-end`);
      const measure = performance.getEntriesByName(componentName)[0];
      console.log(`🔧 ${componentName} render time:`, `${measure.duration.toFixed(2)}ms`);
    }
  };
};

// Debounce function for performance optimization
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: number;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Throttle function for performance optimization
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// Performance budget checker
export const checkPerformanceBudget = () => {
  const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
  const loadTime = navigation.loadEventEnd - navigation.fetchStart;
  
  const budget = {
    loadTime: 2000, // 2 seconds
    jsSize: 500 * 1024, // 500KB
    cssSize: 100 * 1024, // 100KB
    imageCount: 10
  };
  
  const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
  const jsSize = resources
    .filter(r => r.name.includes('.js'))
    .reduce((sum, r) => sum + (r.transferSize || 0), 0);
  
  const cssSize = resources
    .filter(r => r.name.includes('.css'))
    .reduce((sum, r) => sum + (r.transferSize || 0), 0);
  
  const imageCount = resources.filter(r => r.name.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i)).length;
  
  console.group('💰 Performance Budget Check');
  console.log(`📊 Load Time: ${loadTime}ms / ${budget.loadTime}ms (${loadTime <= budget.loadTime ? '✅' : '❌'})`);
  console.log(`📦 JS Size: ${Math.round(jsSize / 1024)}KB / ${Math.round(budget.jsSize / 1024)}KB (${jsSize <= budget.jsSize ? '✅' : '❌'})`);
  console.log(`🎨 CSS Size: ${Math.round(cssSize / 1024)}KB / ${Math.round(budget.cssSize / 1024)}KB (${cssSize <= budget.cssSize ? '✅' : '❌'})`);
  console.log(`🖼️ Image Count: ${imageCount} / ${budget.imageCount} (${imageCount <= budget.imageCount ? '✅' : '❌'})`);
  console.groupEnd();
};