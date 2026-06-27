import React from 'react';

interface SettingsHeaderProps {
  title: string;
  description?: string;
}

export default function SettingsHeader({ title, description }: SettingsHeaderProps) {
  return (
    <div className="mb-8 border-b border-gray-200 dark:border-gray-800 pb-6">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h1>
      {description && <p className="mt-2 text-base text-gray-500 dark:text-gray-400">{description}</p>}
    </div>
  );
}
