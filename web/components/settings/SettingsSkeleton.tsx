import React from 'react';

export default function SettingsSkeleton() {
  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#020817] pt-24 pb-12 animate-pulse">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Skeleton */}
        <div className="mb-8 border-b border-gray-200 dark:border-gray-800 pb-6">
          <div className="h-10 bg-gray-200 dark:bg-gray-800 rounded-lg w-48 mb-4"></div>
          <div className="h-5 bg-gray-200 dark:bg-gray-800 rounded-lg w-96"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Sidebar Skeleton */}
          <div className="col-span-1 space-y-2">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-11 bg-gray-200 dark:bg-gray-800 rounded-xl w-full"></div>
            ))}
          </div>
          
          {/* Content Skeleton */}
          <div className="col-span-1 md:col-span-3 space-y-8">
            <div className="space-y-4">
              <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded-lg w-64 mb-2"></div>
              <div className="h-5 bg-gray-200 dark:bg-gray-800 rounded-lg w-1/2 mb-6"></div>
              <div className="h-72 bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 w-full"></div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}
