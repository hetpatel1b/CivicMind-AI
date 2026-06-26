import React, { ReactNode } from 'react';

interface ProfileEmptyStateProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export default function ProfileEmptyState({ icon, title, description }: ProfileEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-10 px-4 text-center">
      <div className="w-16 h-16 bg-gray-50 dark:bg-gray-900/50 rounded-full flex items-center justify-center text-gray-400 mb-4 border border-gray-100 dark:border-gray-800">
        {icon}
      </div>
      <h4 className="text-gray-900 dark:text-white font-semibold mb-2">{title}</h4>
      <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm">
        {description}
      </p>
    </div>
  );
}
