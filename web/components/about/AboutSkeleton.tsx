import React from 'react';

export default function AboutSkeleton() {
  return (
    <main className="min-h-screen bg-[#f8fafc] dark:bg-[#020817] animate-pulse">
      {/* Hero Skeleton */}
      <div className="pt-32 pb-28 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center">
          <div className="w-14 h-14 bg-gray-200 dark:bg-gray-800 rounded-2xl mb-8"></div>
          <div className="h-12 bg-gray-200 dark:bg-gray-800 rounded w-1/2 mb-6"></div>
          <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-3/4 mb-10"></div>
          <div className="flex gap-4">
            <div className="h-12 w-40 bg-gray-200 dark:bg-gray-800 rounded-xl"></div>
            <div className="h-12 w-40 bg-gray-200 dark:bg-gray-800 rounded-xl"></div>
          </div>
        </div>
      </div>
      
      {/* Mission Skeleton */}
      <div className="py-20">
        <div className="max-w-4xl mx-auto px-4 flex flex-col items-center">
          <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded w-48 mb-8"></div>
          <div className="h-24 bg-gray-200 dark:bg-gray-800 rounded w-full mb-12"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
            <div className="h-48 bg-gray-200 dark:bg-gray-800 rounded-2xl w-full"></div>
            <div className="h-48 bg-gray-200 dark:bg-gray-800 rounded-2xl w-full"></div>
          </div>
        </div>
      </div>
    </main>
  );
}
