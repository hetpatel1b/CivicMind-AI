import React, { ReactNode } from 'react';

interface ProfileCardProps {
  title?: string;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
}

export default function ProfileCard({ title, icon, children, className = '' }: ProfileCardProps) {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden ${className}`}>
      {(title || icon) && (
        <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700 flex items-center gap-3">
          {icon && <div className="text-gray-400">{icon}</div>}
          {title && <h3 className="font-bold text-gray-900 dark:text-white">{title}</h3>}
        </div>
      )}
      <div className="p-6">
        {children}
      </div>
    </div>
  );
}
