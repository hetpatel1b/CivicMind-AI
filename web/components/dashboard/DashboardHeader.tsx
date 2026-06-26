import React from 'react';

interface DashboardHeaderProps {
  title?: string;
}

export default function DashboardHeader({ title = 'User Dashboard' }: DashboardHeaderProps) {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
        {title}
      </h1>
      <p className="text-gray-500 dark:text-gray-400 mt-1">
        Overview of your civic engagement and community impact.
      </p>
    </div>
  );
}
