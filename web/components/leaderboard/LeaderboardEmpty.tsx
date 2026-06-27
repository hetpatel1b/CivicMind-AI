import React from 'react';
import { Trophy, Home, PlusCircle } from 'lucide-react';
import Link from 'next/link';

export default function LeaderboardEmpty() {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm mt-8">
      <div className="w-20 h-20 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center text-gray-400 mb-6 border border-gray-100 dark:border-gray-700">
        <Trophy className="w-10 h-10" aria-hidden="true" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No rankings available yet</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm mb-8">
        Be the first to climb the ranks! Start participating in the community by reporting or supporting issues.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-3">
        <Link 
          href="/feed"
          className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 shadow-sm"
        >
          Explore Feed
        </Link>
        <Link 
          href="/report"
          className="inline-flex justify-center items-center gap-2 px-6 py-2.5 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 shadow-sm"
        >
          <PlusCircle className="w-4 h-4" aria-hidden="true" />
          Report Issue
        </Link>
        <Link 
          href="/"
          className="inline-flex justify-center items-center gap-2 px-6 py-2.5 bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        >
          <Home className="w-4 h-4" aria-hidden="true" />
          Return Home
        </Link>
      </div>
    </div>
  );
}
