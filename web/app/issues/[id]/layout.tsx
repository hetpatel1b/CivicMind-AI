import React from 'react';
import AppLayout from '@/components/shared/AppLayout';

export const metadata = {
  title: 'Issue Details | CivicMind AI',
  description: 'View and investigate civic issue details.',
};

export default function IssueDetailsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppLayout>{children}</AppLayout>;
}
