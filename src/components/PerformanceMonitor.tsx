import React, { useEffect, useState } from 'react';
import { AlertTriangle, Zap, Clock, Wifi } from 'lucide-react';

interface PerformanceMetrics {
  fcp?: number;
  lcp?: number;
  cls?: number;
  fid?: number;
  ttfb?: number;
}

interface NetworkInfo {
  type?: string;
  downlink?: number;
  rtt?: number;
}

function PerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({});
  const [networkInfo, setNetworkInfo] = useState<NetworkInfo>({});
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show in development
    if (process.env.NODE_ENV !== 'development') return;

    // Web Vitals monitoring
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS((metric) => setMetrics(prev => ({ ...prev, cls: metric.value })));
      getFID((metric) => setMetrics(prev => ({ ...prev, fid: metric.value })));
      getFCP((metric) => setMetrics(prev => ({ ...prev, fcp: metric.value })));
      getLCP((metric) => setMetrics(prev => ({ ...prev, lcp: metric.value })));
      getTTFB((metric) => setMetrics(prev => ({ ...prev, ttfb: metric.value })));
    });

    // Network information
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      setNetworkInfo({
        type: connection.effectiveType,
        downlink: connection.downlink,
        rtt: connection.rtt
      });
    }

    // Show/hide with keyboard shortcut
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'P') {
        setIsVisible(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  if (process.env.NODE_ENV !== 'development' || !isVisible) {
    return null;
  }

  const getScoreColor = (value: number, thresholds: [number, number]) => {
    if (value <= thresholds[0]) return 'text-green-600';
    if (value <= thresholds[1]) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="fixed bottom-4 right-4 bg-black/90 text-white p-4 rounded-lg shadow-2xl z-50 max-w-sm">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-bold flex items-center gap-2">
          <Zap size={16} />
          Performance Monitor
        </h3>
        <button
          onClick={() => setIsVisible(false)}
          className="text-gray-400 hover:text-white"
        >
          ×
        </button>
      </div>

      <div className="space-y-2 text-xs">
        {/* Web Vitals */}
        <div>
          <h4 className="font-semibold mb-1">Core Web Vitals</h4>
          <div className="grid grid-cols-2 gap-2">
            {metrics.fcp && (
              <div className={`${getScoreColor(metrics.fcp, [1800, 3000])}`}>
                FCP: {Math.round(metrics.fcp)}ms
              </div>
            )}
            {metrics.lcp && (
              <div className={`${getScoreColor(metrics.lcp, [2500, 4000])}`}>
                LCP: {Math.round(metrics.lcp)}ms
              </div>
            )}
            {metrics.cls && (
              <div className={`${getScoreColor(metrics.cls, [0.1, 0.25])}`}>
                CLS: {metrics.cls.toFixed(3)}
              </div>
            )}
            {metrics.fid && (
              <div className={`${getScoreColor(metrics.fid, [100, 300])}`}>
                FID: {Math.round(metrics.fid)}ms
              </div>
            )}
          </div>
        </div>

        {/* Network Info */}
        {networkInfo.type && (
          <div>
            <h4 className="font-semibold mb-1 flex items-center gap-1">
              <Wifi size={12} />
              Network
            </h4>
            <div className="text-gray-300">
              {networkInfo.type} • {networkInfo.downlink}Mbps • {networkInfo.rtt}ms RTT
            </div>
          </div>
        )}

        {/* Memory Usage */}
        <div>
          <h4 className="font-semibold mb-1">Memory</h4>
          <div className="text-gray-300">
            {(performance as any).memory ? 
              `${Math.round((performance as any).memory.usedJSHeapSize / 1024 / 1024)}MB used` :
              'Not available'
            }
          </div>
        </div>
      </div>

      <div className="mt-3 pt-2 border-t border-gray-700 text-xs text-gray-400">
        Press Ctrl+Shift+P to toggle
      </div>
    </div>
  );
}

export default PerformanceMonitor;