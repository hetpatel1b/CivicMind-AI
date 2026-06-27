import React from 'react';

interface HelpHeaderProps {
  title: string;
  description: string;
}

export default function HelpHeader({ title, description }: HelpHeaderProps) {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{title}</h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl">{description}</p>
    </div>
  );
}
