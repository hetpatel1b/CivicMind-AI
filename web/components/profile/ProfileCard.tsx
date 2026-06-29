import React, { ReactNode } from 'react';
import { Card } from '@/design-system/components/Card';

interface ProfileCardProps {
  title?: string;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
}

export default function ProfileCard({ title, icon, children, className = '' }: ProfileCardProps) {
  return (
    <Card className={`p-0 overflow-hidden ${className}`}>
      {(title || icon) && (
        <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700 flex items-center gap-3">
          {icon && <div className="text-gray-400">{icon}</div>}
          {title && <h3 className="font-bold text-gray-900 dark:text-white">{title}</h3>}
        </div>
      )}
      <div className="p-6">
        {children}
      </div>
    </Card>
  );
}
