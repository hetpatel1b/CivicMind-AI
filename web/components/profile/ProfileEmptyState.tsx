import React, { ReactNode } from 'react';

interface ProfileEmptyStateProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export default function ProfileEmptyState({ icon, title, description }: ProfileEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-[1.5rem] bg-gray-50/50 dark:bg-gray-900/30">
      <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center text-gray-400 mb-4 shadow-inner">
        {icon}
      </div>
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
        {title}
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
        {description}
      </p>
    </div>
  );
}
