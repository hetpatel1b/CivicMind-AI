import React from 'react';
import AppLayout from '@/components/shared/AppLayout';

export const metadata = {
  title: 'Help Center | CivicMind AI',
  description: 'AI-powered support and platform knowledge.',
};

export default function HelpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppLayout>{children}</AppLayout>;
}
