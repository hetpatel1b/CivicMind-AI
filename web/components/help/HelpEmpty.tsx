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
    <div className="bg-white dark:bg-gray-900/50 backdrop-blur-xl border border-gray-100 dark:border-gray-800 rounded-[2rem] p-12 text-center flex flex-col items-center shadow-sm">
      <div className="w-20 h-20 bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-indigo-100 dark:border-indigo-800/50">
        <LifeBuoy className="w-10 h-10 text-indigo-600 dark:text-indigo-400" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{title}</h3>
      <p className="text-base font-medium text-gray-500 dark:text-gray-400 max-w-md leading-relaxed">{message}</p>
    </div>
  );
}
