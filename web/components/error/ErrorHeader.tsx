import React from 'react';

interface ErrorHeaderProps {
  statusCode: string | number;
}

export function ErrorHeader({ statusCode }: ErrorHeaderProps) {
  return (
    <div className="mb-4">
      <span className="text-sm font-bold tracking-widest uppercase text-blue-600 dark:text-blue-400">
        Error {statusCode}
      </span>
    </div>
  );
}
