import React from 'react';
import AppLayout from '@/components/shared/AppLayout';

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppLayout>{children}</AppLayout>;
}
