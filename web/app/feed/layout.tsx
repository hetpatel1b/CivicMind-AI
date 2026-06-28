import React from 'react';
import AppLayout from '@/components/shared/AppLayout';

export default function FeedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppLayout>{children}</AppLayout>;
}
