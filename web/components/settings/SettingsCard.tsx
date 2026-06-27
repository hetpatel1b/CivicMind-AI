import React from 'react';

interface SettingsCardProps {
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export default function SettingsCard({ title, children, footer }: SettingsCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 overflow-hidden shadow-sm">
      {title && (
        <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white">{title}</h3>
        </div>
      )}
      <div className="p-6 sm:p-8">
        {children}
      </div>
      {footer && (
        <div className="px-6 py-4 bg-gray-50/50 dark:bg-gray-900/30 border-t border-gray-100 dark:border-gray-700">
          {footer}
        </div>
      )}
    </div>
  );
}
