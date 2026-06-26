import React, { ReactNode } from 'react';

interface ReputationEmptyStateProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export default function ReputationEmptyState({ icon, title, description }: ReputationEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center bg-gray-50 dark:bg-gray-900/50 rounded-2xl border border-gray-100 dark:border-gray-700">
      <div className="w-16 h-16 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center text-gray-400 mb-4 shadow-sm border border-gray-100 dark:border-gray-700">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm">
        {description}
      </p>
    </div>
  );
}
