import { useState, useEffect } from 'react';

interface PerformanceMetrics {
  fcp?: number;
  lcp?: number;
  cls?: number;
  fid?: number;
  ttfb?: number;
  loadTime?: number;
  domContentLoaded?: number;
}

function usePerformanceMetrics() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Basic navigation timing
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    
    if (navigation) {
      setMetrics(prev => ({
        ...prev,
        loadTime: navigation.loadEventEnd - navigation.fetchStart,
        domContentLoaded: navigation.domContentLoadedEventEnd - navigation.fetchStart,
        ttfb: navigation.responseStart - navigation.requestStart
      }));
    }

    // Web Vitals (if available)
    if (typeof window !== 'undefined') {
      import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
        getCLS((metric) => {
          setMetrics(prev => ({ ...prev, cls: metric.value }));
        });
        
        getFID((metric) => {
          setMetrics(prev => ({ ...prev, fid: metric.value }));
        });
        
        getFCP((metric) => {
          setMetrics(prev => ({ ...prev, fcp: metric.value }));
        });
        
        getLCP((metric) => {
          setMetrics(prev => ({ ...prev, lcp: metric.value }));
        });
        
        getTTFB((metric) => {
          setMetrics(prev => ({ ...prev, ttfb: metric.value }));
        });
        
        setIsLoading(false);
      }).catch(() => {
        setIsLoading(false);
      });
    }
  }, []);

  const getScoreRating = (metric: keyof PerformanceMetrics, value: number) => {
    const thresholds = {
      fcp: [1800, 3000],
      lcp: [2500, 4000],
      cls: [0.1, 0.25],
      fid: [100, 300],
      ttfb: [800, 1800],
      loadTime: [3000, 5000],
      domContentLoaded: [1500, 3000]
    };

    const [good, poor] = thresholds[metric] || [0, 0];
    
    if (value <= good) return 'good';
    if (value <= poor) return 'needs-improvement';
    return 'poor';
  };

  return {
    metrics,
    isLoading,
    getScoreRating
  };
}

export default usePerformanceMetrics;