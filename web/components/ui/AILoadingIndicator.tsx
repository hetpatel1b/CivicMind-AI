import React from 'react';
import { Sparkles, Loader2 } from 'lucide-react';

interface AILoadingIndicatorProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  inline?: boolean;
}

export default function AILoadingIndicator({ 
  message = "AI is thinking...", 
  size = 'md',
  className = '',
  inline = false
}: AILoadingIndicatorProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  const textClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };

  if (inline) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <div className="relative flex items-center justify-center">
          <Loader2 className={`${sizeClasses[size]} text-blue-600 dark:text-blue-500 animate-spin opacity-50`} />
          <Sparkles className={`w-3 h-3 text-indigo-500 dark:text-indigo-400 absolute animate-pulse`} />
        </div>
        <span className={`${textClasses[size]} text-gray-500 dark:text-gray-400 animate-pulse`}>
          {message}
        </span>
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center justify-center space-y-3 ${className}`}>
      <div className="relative flex items-center justify-center p-2">
        <div className="absolute inset-0 bg-blue-500/10 blur-xl rounded-full animate-pulse"></div>
        <div className="relative flex items-center justify-center">
          <Loader2 className={`${sizeClasses[size]} text-blue-600 dark:text-blue-500 animate-spin`} />
          <Sparkles className={`absolute w-1/2 h-1/2 text-indigo-500 dark:text-indigo-400 animate-pulse`} />
        </div>
      </div>
      {message && (
        <p className={`${textClasses[size]} text-gray-500 dark:text-gray-400 font-medium animate-pulse tracking-wide`}>
          {message}
        </p>
      )}
    </div>
  );
}
