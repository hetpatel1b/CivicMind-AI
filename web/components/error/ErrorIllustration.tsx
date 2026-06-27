import React from 'react';
import { LucideIcon } from 'lucide-react';
import { ErrorSeverity } from './types';

interface ErrorIllustrationProps {
  icon: LucideIcon;
  severity: ErrorSeverity;
}

export function ErrorIllustration({ icon: Icon, severity }: ErrorIllustrationProps) {
  let colorClass = 'text-blue-500 bg-blue-100 dark:bg-blue-900/30';
  
  if (severity === 'medium') colorClass = 'text-amber-500 bg-amber-100 dark:bg-amber-900/30';
  if (severity === 'high' || severity === 'critical') colorClass = 'text-red-500 bg-red-100 dark:bg-red-900/30';

  return (
    <div className="flex justify-center mb-6">
      <div className={`w-24 h-24 rounded-full flex items-center justify-center ${colorClass}`}>
        <Icon className="w-12 h-12" aria-hidden="true" />
      </div>
    </div>
  );
}
