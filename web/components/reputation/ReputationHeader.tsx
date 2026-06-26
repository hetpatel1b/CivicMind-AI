import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function ReputationHeader() {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <Link 
          href="/profile" 
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors mb-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Profile
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Reputation & Badges
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Track your civic impact and community achievements.
        </p>
      </div>
      <div className="flex items-center gap-3">
        <Link
          href="/report"
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
        >
          Report Issue
        </Link>
        <Link
          href="/dashboard"
          className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium transition-colors shadow-sm"
        >
          Dashboard
        </Link>
      </div>
    </div>
  );
}
