import React from 'react';

interface ErrorCardProps {
  children: React.ReactNode;
}

export function ErrorCard({ children }: ErrorCardProps) {
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-8 md:p-12 shadow-sm max-w-2xl mx-auto text-center relative overflow-hidden">
      {children}
    </div>
  );
}
