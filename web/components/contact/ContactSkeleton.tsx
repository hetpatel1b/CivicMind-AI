import React from 'react';

export default function ContactSkeleton() {
  return (
    <main className="min-h-screen bg-[#f8fafc] dark:bg-[#020817] animate-pulse">
      {/* Header Skeleton */}
      <div className="pt-32 pb-24 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-[#020817]">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center">
          <div className="w-14 h-14 bg-gray-200 dark:bg-gray-800 rounded-2xl mb-8"></div>
          <div className="h-12 bg-gray-200 dark:bg-gray-800 rounded w-1/2 md:w-1/3 mb-6"></div>
          <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-3/4 md:w-1/2"></div>
        </div>
      </div>
      
      {/* Options Skeleton */}
      <div className="py-20 max-w-7xl mx-auto px-4">
        <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded w-64 mx-auto mb-16"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-48 bg-gray-200 dark:bg-gray-800 rounded-2xl"></div>
          ))}
        </div>
      </div>
    </main>
  );
}
