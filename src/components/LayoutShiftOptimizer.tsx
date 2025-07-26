import React, { useEffect, useRef } from 'react';

const LayoutShiftOptimizer: React.FC = () => {
  const observerRef = useRef<PerformanceObserver | null>(null);
  const layoutShiftScore = useRef<number>(0);

  useEffect(() => {
    // Minimal layout shift monitoring only
    const setupMinimalMonitoring = () => {
      if ('PerformanceObserver' in window) {
        observerRef.current = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry) => {
            const layoutShiftEntry = entry as any;
            layoutShiftScore.current += layoutShiftEntry.value;

            // Only log critical layout shifts
            if (layoutShiftScore.current > 0.25) {
              setTimeout(() => {
                console.error('🚨 CRITICAL: Cumulative Layout Shift Score:', layoutShiftScore.current);
              }, 0);
            }
          });
        });

        try {
          observerRef.current.observe({ entryTypes: ['layout-shift'] });
        } catch (e) {
          console.log('Layout Shift API not supported');
        }
      }
    };

    // Initialize minimal monitoring only
    setupMinimalMonitoring();

    // Cleanup
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return null;
};

export default LayoutShiftOptimizer; 