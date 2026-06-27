import React from 'react';

export default function HelpSkeleton() {
  return (
    <main className="min-h-screen bg-[#f8fafc] dark:bg-[#020817] pt-24 pb-20 animate-pulse">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-2/3"></div>
        </div>
        
        <div className="mb-12">
          <div className="h-14 bg-gray-200 dark:bg-gray-800 rounded-2xl w-full max-w-2xl"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-40 bg-gray-200 dark:bg-gray-800 rounded-2xl"></div>
          ))}
        </div>

        <div className="mb-12">
          <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-48 mb-6"></div>
          <div className="flex flex-wrap gap-3">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="h-10 w-32 bg-gray-200 dark:bg-gray-800 rounded-xl"></div>
            ))}
          </div>
        </div>
        
        <div className="mb-12">
          <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-32 mb-6"></div>
          <div className="bg-gray-200 dark:bg-gray-800 h-64 rounded-2xl"></div>
        </div>
      </div>
    </main>
  );
}
