import React from 'react';
import Link from 'next/link';
import { ErrorAction } from './types';

interface ErrorActionsProps {
  primaryAction: ErrorAction;
  secondaryAction?: ErrorAction;
}

export function ErrorActions({ primaryAction, secondaryAction }: ErrorActionsProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
      {primaryAction.href ? (
        <Link 
          href={primaryAction.href}
          className="w-full sm:w-auto flex justify-center items-center px-8 py-3.5 border border-transparent text-base font-semibold rounded-xl text-white bg-blue-600 hover:bg-blue-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 shadow-sm"
        >
          {primaryAction.label}
        </Link>
      ) : (
        <button 
          onClick={primaryAction.onClick}
          className="w-full sm:w-auto flex justify-center items-center px-8 py-3.5 border border-transparent text-base font-semibold rounded-xl text-white bg-blue-600 hover:bg-blue-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 shadow-sm"
        >
          {primaryAction.label}
        </button>
      )}

      {secondaryAction && (
        secondaryAction.href ? (
          <Link 
            href={secondaryAction.href}
            className="w-full sm:w-auto flex justify-center items-center px-8 py-3.5 border border-gray-300 dark:border-gray-700 text-base font-semibold rounded-xl text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-500 shadow-sm"
          >
            {secondaryAction.label}
          </Link>
        ) : (
          <button 
            onClick={secondaryAction.onClick}
            className="w-full sm:w-auto flex justify-center items-center px-8 py-3.5 border border-gray-300 dark:border-gray-700 text-base font-semibold rounded-xl text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-500 shadow-sm"
          >
            {secondaryAction.label}
          </button>
        )
      )}
    </div>
  );
}
