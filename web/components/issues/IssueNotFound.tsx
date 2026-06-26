import React from 'react';
import Link from 'next/link';
import { AlertTriangle, ArrowLeft } from 'lucide-react';

export default function IssueNotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
      <div className="w-20 h-20 bg-red-100 dark:bg-red-900/30 text-red-500 rounded-full flex items-center justify-center mb-6">
        <AlertTriangle className="w-10 h-10" />
      </div>
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
        Issue Not Found
      </h2>
      <p className="text-gray-500 dark:text-gray-400 max-w-md mb-8">
        The civic issue you are looking for does not exist, has been removed, or the URL is invalid.
      </p>
      <Link 
        href="/feed"
        className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Return to Community Feed
      </Link>
    </div>
  );
}
