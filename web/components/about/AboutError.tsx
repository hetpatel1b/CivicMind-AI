import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface AboutErrorProps {
  error?: string;
  onRetry?: () => void;
}

export default function AboutError({ 
  error = "An error occurred while loading the mission page.", 
  onRetry 
}: AboutErrorProps) {
  return (
    <div className="bg-rose-50 dark:bg-rose-900/10 backdrop-blur-xl border border-rose-200 dark:border-rose-900/30 rounded-[2rem] p-12 flex flex-col items-center text-center shadow-sm">
      <div className="w-20 h-20 bg-white dark:bg-rose-900/40 rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-rose-100 dark:border-rose-800/50">
        <AlertCircle className="w-10 h-10 text-rose-500 dark:text-rose-400" />
      </div>
      <h3 className="text-xl font-bold text-rose-900 dark:text-rose-100 mb-3">Unable to Load About Page</h3>
      <p className="text-base font-medium text-rose-700 dark:text-rose-300 max-w-md mb-8 leading-relaxed">{error}</p>
      
      {onRetry && (
        <button
          onClick={onRetry}
          className="flex items-center px-6 py-3 bg-white dark:bg-rose-900/50 hover:bg-rose-100 dark:hover:bg-rose-800 border border-rose-200 dark:border-rose-700 rounded-xl text-rose-700 dark:text-rose-300 font-bold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 shadow-sm"
        >
          <RefreshCw className="w-5 h-5 mr-2" />
          Try Again
        </button>
      )}
    </div>
  );
}
