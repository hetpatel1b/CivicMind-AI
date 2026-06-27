'use client';

import React from 'react';
import { ShieldAlert } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ErrorLayout, ErrorConfig } from '@/components/error';

export default function ForbiddenPage() {
  const router = useRouter();
  
  const config: ErrorConfig = {
    statusCode: 403,
    title: 'Access Denied',
    description: "Your account does not have the necessary permissions to access this specific area. This usually occurs if you are attempting to view administrative tools or private profiles. If you believe this is a system error, please contact our support team.",
    primaryAction: {
      label: 'Go Back',
      onClick: () => router.back(),
      primary: true
    },
    secondaryAction: {
      label: 'Return Home',
      href: '/'
    },
    icon: ShieldAlert,
    severity: 'high'
  };

  return <ErrorLayout config={config} />;
}
