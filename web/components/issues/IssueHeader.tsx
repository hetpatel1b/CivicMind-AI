import React from 'react';

interface IssueHeaderProps {
  title: string;
  category: string;
  severity: string;
}

export default function IssueHeader({ title, category, severity }: IssueHeaderProps) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 flex-wrap mb-4">
        <span className="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300 text-xs font-bold rounded-full uppercase tracking-wider">
          {category}
        </span>
        <span className="px-3 py-1 bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-300 text-xs font-bold rounded-full uppercase tracking-wider border border-gray-300 dark:border-gray-700">
          Severity: {severity}
        </span>
      </div>
      <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight break-words">
        {title}
      </h1>
    </div>
  );
}
