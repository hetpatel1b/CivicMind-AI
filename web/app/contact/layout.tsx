import React from 'react';
import AppLayout from '@/components/shared/AppLayout';

export const metadata = {
  title: 'Support Center | CivicMind AI',
  description: 'AI-powered support and platform knowledge.',
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppLayout>{children}</AppLayout>;
}
