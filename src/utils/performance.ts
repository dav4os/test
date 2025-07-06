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
        console.warn('⚠️ Long Task detected:', `${entry.duration}ms`, entry);
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