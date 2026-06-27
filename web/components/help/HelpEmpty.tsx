import React from 'react';
import { LifeBuoy } from 'lucide-react';

interface HelpEmptyProps {
  title?: string;
  message?: string;
}

export default function HelpEmpty({ 
  title = "No help articles available", 
  message = "We're currently updating our help center. Please check back later or contact support directly."
}: HelpEmptyProps) {
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-12 text-center flex flex-col items-center">
      <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
        <LifeBuoy className="w-8 h-8 text-blue-600 dark:text-blue-400" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
      <p className="text-gray-500 dark:text-gray-400 max-w-md">{message}</p>
    </div>
  );
}
