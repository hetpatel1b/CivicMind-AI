import React from 'react';
import AppLayout from '@/components/shared/AppLayout';

export const metadata = {
  title: 'About | CivicMind AI',
  description: 'Learn about our mission, vision, and the technology powering CivicMind AI.',
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppLayout>{children}</AppLayout>;
}
