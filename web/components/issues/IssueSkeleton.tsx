import React from 'react';

export default function IssueSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 animate-pulse">
      <div className="mb-8">
        <div className="flex gap-2 mb-4">
          <div className="h-6 w-24 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
          <div className="h-6 w-32 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
        </div>
        <div className="h-10 md:h-12 w-3/4 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="w-full aspect-[16/9] md:aspect-[21/9] bg-gray-200 dark:bg-gray-700 rounded-2xl"></div>
          <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-2xl"></div>
          <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-2xl"></div>
        </div>
        <div className="lg:col-span-1 space-y-6">
          <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded-2xl"></div>
          <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-2xl"></div>
          <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-2xl"></div>
        </div>
      </div>
    </div>
  );
}
