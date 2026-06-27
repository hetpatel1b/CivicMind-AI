import React from 'react';
import { Lock } from 'lucide-react';
import { ErrorLayout, ErrorConfig } from '@/components/error';

export default function UnauthorizedPage() {
  const config: ErrorConfig = {
    statusCode: 401,
    title: 'Authentication Required',
    description: "You need an active account to view this specific page. This happens when you try to access member-only features while signed out. Please sign in to your CivicMind AI account to continue your civic participation.",
    primaryAction: {
      label: 'Sign In',
      href: '/login',
      primary: true
    },
    secondaryAction: {
      label: 'Return Home',
      href: '/'
    },
    icon: Lock,
    severity: 'medium'
  };

  return <ErrorLayout config={config} />;
}
