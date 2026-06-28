import React from 'react';
import AppLayout from '@/components/shared/AppLayout';

export default function LeaderboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppLayout>{children}</AppLayout>;
}
