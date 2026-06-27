import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface LeaderboardErrorProps {
  message?: string;
  onRetry: () => void;
}

export default function LeaderboardError({ message = 'Failed to load leaderboard data', onRetry }: LeaderboardErrorProps) {
  return (
    <div role="alert" className="flex flex-col items-center justify-center p-8 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 rounded-2xl text-center mt-8">
      <AlertCircle className="w-10 h-10 text-red-500 mb-4" aria-hidden="true" />
      <h3 className="text-lg font-bold text-red-900 dark:text-red-400 mb-2">Something went wrong</h3>
      <p className="text-sm text-red-700 dark:text-red-300 max-w-md mb-6">
        {message}. Please try again.
      </p>
      
      <button
        onClick={onRetry}
        className="inline-flex items-center gap-2 px-5 py-2 bg-red-100 dark:bg-red-900/40 hover:bg-red-200 dark:hover:bg-red-900/60 text-red-700 dark:text-red-300 rounded-xl text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
      >
        <RefreshCw className="w-4 h-4" aria-hidden="true" />
        Retry
      </button>
    </div>
  );
}
