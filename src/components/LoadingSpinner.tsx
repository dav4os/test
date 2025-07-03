import React from 'react';
import { Compass } from 'lucide-react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  fullScreen?: boolean;
}

function LoadingSpinner({ 
  size = 'md', 
  text = 'Загрузка...', 
  fullScreen = false 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };

  const content = (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="relative">
        <div className={`${sizeClasses[size]} bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl flex items-center justify-center animate-pulse`}>
          <Compass size={size === 'sm' ? 16 : size === 'md' ? 24 : 32} className="text-white animate-spin" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-400 rounded-xl opacity-50 animate-ping"></div>
      </div>
      
      {text && (
        <p className={`${textSizeClasses[size]} text-gray-600 font-medium animate-pulse`}>
          {text}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center z-50">
        {content}
      </div>
    );
  }

  return content;
}

export default LoadingSpinner;