import React from 'react';
import { Search } from 'lucide-react';
import { ErrorLayout, ErrorConfig } from '@/components/error';

export default function NotFound() {
  const config: ErrorConfig = {
    statusCode: 404,
    title: 'Page Not Found',
    description: "The page you are looking for doesn't exist or has been moved. This typically happens if you follow a broken link or type an incorrect URL. You can return to the home page or browse the community feed to discover active civic issues.",
    primaryAction: {
      label: 'Return Home',
      href: '/',
      primary: true
    },
    secondaryAction: {
      label: 'Browse Feed',
      href: '/feed'
    },
    icon: Search,
    severity: 'medium'
  };

  return <ErrorLayout config={config} />;
}
