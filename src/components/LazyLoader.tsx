import React, { Suspense } from 'react';
import LoadingSpinner from './LoadingSpinner';

interface LazyLoaderProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

const LazyLoader: React.FC<LazyLoaderProps> = ({ 
  children, 
  fallback = <LoadingSpinner /> 
}) => {
  return (
    <Suspense fallback={fallback}>
      {children}
    </Suspense>
  );
};

export default LazyLoader; 