import React from 'react';

export default function ReputationSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 animate-pulse">
      <div className="h-10 w-64 bg-gray-200 dark:bg-gray-700 rounded-lg mb-8"></div>

      <div className="h-40 bg-gray-200 dark:bg-gray-700 rounded-2xl mb-8"></div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-24 bg-gray-200 dark:bg-gray-700 rounded-2xl"></div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-2xl"></div>
          <div className="h-80 bg-gray-200 dark:bg-gray-700 rounded-2xl"></div>
        </div>
        <div className="lg:col-span-1 space-y-6">
          <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-2xl"></div>
          <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-2xl"></div>
        </div>
      </div>
    </div>
  );
}
