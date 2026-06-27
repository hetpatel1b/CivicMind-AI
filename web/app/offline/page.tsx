'use client';

import React from 'react';
import { WifiOff } from 'lucide-react';
import { ErrorLayout, ErrorConfig } from '@/components/error';

export default function OfflinePage() {
  const config: ErrorConfig = {
    statusCode: 'Offline',
    title: 'No Internet Connection',
    description: "We are unable to connect to CivicMind AI servers. This is likely due to a poor internet connection or a temporary network disruption on your device. Please verify your connection status and try again.",
    primaryAction: {
      label: 'Try Again',
      onClick: () => {
        if (typeof window !== 'undefined') {
          window.location.reload();
        }
      },
      primary: true
    },
    secondaryAction: {
      label: 'View Cached Feed',
      href: '/feed'
    },
    icon: WifiOff,
    severity: 'medium'
  };

  return <ErrorLayout config={config} />;
}
