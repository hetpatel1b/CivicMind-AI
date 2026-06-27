import React from 'react';

export default function LeaderboardSkeleton() {
  return (
    <div className="space-y-8 animate-pulse" aria-label="Loading leaderboard">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10 pb-6 max-w-4xl mx-auto items-start">
        <div className="h-64 bg-gray-200 dark:bg-gray-800 rounded-3xl md:mt-4"></div>
        <div className="h-72 bg-gray-200 dark:bg-gray-800 rounded-3xl md:-mt-8"></div>
        <div className="h-64 bg-gray-200 dark:bg-gray-800 rounded-3xl md:mt-4"></div>
      </div>

      <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl overflow-hidden shadow-sm">
        <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="h-10 w-full sm:w-64 bg-gray-200 dark:bg-gray-800 rounded-xl"></div>
          <div className="flex gap-3 w-full sm:w-auto">
            <div className="h-10 w-full sm:w-32 bg-gray-200 dark:bg-gray-800 rounded-xl"></div>
            <div className="h-10 w-full sm:w-32 bg-gray-200 dark:bg-gray-800 rounded-xl"></div>
          </div>
        </div>

        <div className="p-4 space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center gap-4 py-2 border-b border-gray-50 dark:border-gray-800/50 pb-4">
              <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-800 shrink-0 mx-2"></div>
              <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-800 shrink-0"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 w-32 bg-gray-200 dark:bg-gray-800 rounded"></div>
                <div className="h-3 w-20 bg-gray-200 dark:bg-gray-800 rounded"></div>
              </div>
              <div className="h-5 w-16 bg-gray-200 dark:bg-gray-800 rounded hidden sm:block"></div>
              <div className="h-5 w-16 bg-gray-200 dark:bg-gray-800 rounded hidden md:block"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
