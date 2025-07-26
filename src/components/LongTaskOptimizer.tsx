import React, { useEffect, useRef, useCallback } from 'react';

const LongTaskOptimizer: React.FC = () => {
  const taskQueue = useRef<Array<() => void>>([]);
  const isProcessing = useRef<boolean>(false);
  const observerRef = useRef<PerformanceObserver | null>(null);
  const longTaskCount = useRef<number>(0);

  // Process tasks in chunks to avoid long tasks
  const processTaskQueue = useCallback(() => {
    if (isProcessing.current || taskQueue.current.length === 0) return;

    isProcessing.current = true;
    const startTime = performance.now();
    const maxChunkTime = 16; // 60fps = 16ms per frame

    while (taskQueue.current.length > 0 && (performance.now() - startTime) < maxChunkTime) {
      const task = taskQueue.current.shift();
      if (task) {
        try {
          task();
        } catch (error) {
          console.error('Task execution error:', error);
        }
      }
    }

    isProcessing.current = false;

    // Schedule next chunk if there are more tasks
    if (taskQueue.current.length > 0) {
      requestIdleCallback(() => processTaskQueue(), { timeout: 100 });
    }
  }, []);

  // Add task to queue
  const addTask = useCallback((task: () => void) => {
    taskQueue.current.push(task);
    if (!isProcessing.current) {
      requestIdleCallback(() => processTaskQueue(), { timeout: 100 });
    }
  }, [processTaskQueue]);

  useEffect(() => {
    // Minimal long task monitoring only
    const setupMinimalMonitoring = () => {
      if ('PerformanceObserver' in window) {
        observerRef.current = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry) => {
            longTaskCount.current++;
            
            if (entry.duration > 200) {
              // Only log critical long tasks
              setTimeout(() => {
                console.error('🚨 CRITICAL: Long task detected:', {
                  duration: `${entry.duration}ms`,
                  count: longTaskCount.current
                });
              }, 0);
            }
          });
        });

        try {
          observerRef.current.observe({ entryTypes: ['longtask'] });
        } catch (e) {
          console.log('Long Task API not supported');
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

  // Expose task queue for external use
  const ref = React.useRef<{ addTask: (task: () => void) => void; processQueue: () => void } | null>(null);
  React.useImperativeHandle(ref, () => ({
    addTask,
    processQueue: processTaskQueue
  }));

  return null;
};

export default LongTaskOptimizer; 