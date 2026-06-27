import React from 'react';
import { ErrorConfig } from './types';
import { ErrorCard } from './ErrorCard';
import { ErrorHeader } from './ErrorHeader';
import { ErrorIllustration } from './ErrorIllustration';
import { ErrorContent } from './ErrorContent';
import { ErrorActions } from './ErrorActions';
import { ErrorFooter } from './ErrorFooter';

interface ErrorLayoutProps {
  config: ErrorConfig;
}

export function ErrorLayout({ config }: ErrorLayoutProps) {
  return (
    <main className="min-h-screen bg-[#f8fafc] dark:bg-[#020817] flex items-center justify-center p-4 selection:bg-blue-100 dark:selection:bg-blue-900/50">
      <ErrorCard>
        <ErrorHeader statusCode={config.statusCode} />
        <ErrorIllustration icon={config.icon} severity={config.severity} />
        <ErrorContent title={config.title} description={config.description} />
        <ErrorActions primaryAction={config.primaryAction} secondaryAction={config.secondaryAction} />
        <ErrorFooter />
      </ErrorCard>
    </main>
  );
}
