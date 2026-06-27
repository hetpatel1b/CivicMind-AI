import React from 'react';

export function ErrorSkeleton() {
  return (
    <main className="min-h-screen bg-[#f8fafc] dark:bg-[#020817] flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-8 md:p-12 shadow-sm w-full max-w-2xl text-center animate-pulse">
        
        {/* Header */}
        <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-24 mx-auto mb-4"></div>
        
        {/* Illustration */}
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-800"></div>
        </div>
        
        {/* Content */}
        <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded w-3/4 mx-auto mb-6"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-full mx-auto mb-3"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-5/6 mx-auto mb-8"></div>
        
        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <div className="h-12 bg-gray-200 dark:bg-gray-800 rounded-xl w-full sm:w-40"></div>
          <div className="h-12 bg-gray-200 dark:bg-gray-800 rounded-xl w-full sm:w-40"></div>
        </div>
        
        {/* Footer */}
        <div className="pt-8 border-t border-gray-100 dark:border-gray-800">
          <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-32 mx-auto mb-4"></div>
          <div className="flex justify-center gap-6">
            <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-20"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-20"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-20"></div>
          </div>
        </div>
      </div>
    </main>
  );
}
