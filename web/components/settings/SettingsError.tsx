import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface SettingsErrorProps {
  error: string;
  onRetry?: () => void;
}

export default function SettingsError({ error, onRetry }: SettingsErrorProps) {
  return (
    <div className="p-8 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/30 rounded-3xl flex flex-col items-center text-center shadow-sm">
      <div className="bg-red-100 dark:bg-red-900/40 p-4 rounded-full mb-5">
        <AlertCircle className="w-10 h-10 text-red-600 dark:text-red-500" />
      </div>
      <h3 className="text-xl font-bold tracking-tight text-red-900 dark:text-red-400 mb-2">
        Failed to Load Settings
      </h3>
      <p className="text-base text-red-700 dark:text-red-300 mb-8 max-w-md leading-relaxed">
        {error}
      </p>
      {onRetry && (
        <button 
          onClick={onRetry}
          className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-bold rounded-xl shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors active:scale-95"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Try Again
        </button>
      )}
    </div>
  );
}
