import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export default function SubmissionSuccess() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-10 shadow-sm border border-green-200 dark:border-green-900/50 flex flex-col items-center justify-center text-center">
      <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6">
        <CheckCircle2 className="w-10 h-10 text-green-600 dark:text-green-400" />
      </div>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
        Issue Reported Successfully!
      </h2>
      <p className="text-gray-500 dark:text-gray-400 max-w-md">
        Thank you for contributing to your community. Your issue has been logged and will be reviewed shortly.
      </p>
      <div className="mt-8">
        <div className="w-8 h-8 border-4 border-blue-200 dark:border-blue-900 border-t-blue-600 dark:border-t-blue-500 rounded-full animate-spin mx-auto"></div>
        <p className="text-sm text-gray-500 mt-3">Redirecting to feed...</p>
      </div>
    </div>
  );
}
