import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface ContactErrorProps {
  error?: string;
  onRetry?: () => void;
}

export default function ContactError({ 
  error = "An error occurred while loading the contact page.", 
  onRetry 
}: ContactErrorProps) {
  return (
    <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/50 rounded-2xl p-8 flex flex-col items-center text-center">
      <AlertCircle className="w-12 h-12 text-red-500 mb-4" aria-hidden="true" />
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Something went wrong</h3>
      <p className="text-red-700 dark:text-red-400 mb-6 max-w-md">{error}</p>
      
      {onRetry && (
        <button
          onClick={onRetry}
          className="flex items-center px-4 py-2 bg-white dark:bg-gray-800 border border-red-200 dark:border-red-800 rounded-xl text-sm font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
        >
          <RefreshCw className="w-4 h-4 mr-2" aria-hidden="true" />
          Try Again
        </button>
      )}
    </div>
  );
}
