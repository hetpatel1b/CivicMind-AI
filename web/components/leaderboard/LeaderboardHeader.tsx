import React from 'react';
import { Trophy, Info, RefreshCw } from 'lucide-react';

interface LeaderboardHeaderProps {
  onRefresh?: () => void;
  isRefreshing?: boolean;
}

export default function LeaderboardHeader({ onRefresh, isRefreshing }: LeaderboardHeaderProps) {
  return (
    <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-xl">
            <Trophy className="w-6 h-6 text-yellow-600 dark:text-yellow-500" aria-hidden="true" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Community Leaderboard</h1>
        </div>
        <p className="text-gray-500 dark:text-gray-400 max-w-2xl text-sm sm:text-base">
          Recognizing our most active citizens. Earn reputation points by reporting verified issues, supporting others, and driving real change in your neighborhood.
        </p>
      </div>
      
      <div className="flex items-center gap-3">
        <button className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 shadow-sm">
          <Info className="w-4 h-4" aria-hidden="true" />
          <span className="hidden sm:inline">How points work</span>
        </button>
        {onRefresh && (
          <button 
            onClick={onRefresh}
            disabled={isRefreshing}
            className="inline-flex items-center justify-center w-9 h-9 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 shadow-sm"
            aria-label="Refresh leaderboard"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} aria-hidden="true" />
          </button>
        )}
      </div>
    </header>
  );
}
