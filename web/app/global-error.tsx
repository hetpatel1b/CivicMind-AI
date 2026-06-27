'use client';

import React, { useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';
import { ErrorLayout, ErrorConfig } from '@/components/error';
import { logger } from '@/lib/logger';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    logger.error({
      category: 'SYSTEM',
      message: 'Unhandled Application Error',
      error
    });
  }, [error]);

  const config: ErrorConfig = {
    statusCode: 500,
    title: 'Internal Server Error',
    description: "An unexpected technical issue prevented us from completing your request. This is on our end, not yours. Our engineering team has automatically received a report. You can safely try your action again or return to the main dashboard.",
    primaryAction: {
      label: 'Try Again',
      onClick: () => reset(),
      primary: true
    },
    secondaryAction: {
      label: 'Contact Support',
      href: '/contact'
    },
    icon: AlertTriangle,
    severity: 'critical'
  };

  return (
    <html>
      <body>
        <ErrorLayout config={config} />
      </body>
    </html>
  );
}
