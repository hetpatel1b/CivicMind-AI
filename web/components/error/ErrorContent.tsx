import React from 'react';

interface ErrorContentProps {
  title: string;
  description: string;
}

export function ErrorContent({ title, description }: ErrorContentProps) {
  return (
    <div className="mb-8">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
        {title}
      </h1>
      <p className="text-gray-600 dark:text-gray-400 text-lg max-w-lg mx-auto leading-relaxed">
        {description}
      </p>
    </div>
  );
}
