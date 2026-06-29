import React from 'react';
import AIAssistantView from '@/components/assistant/AIAssistantView';
import AppLayout from '@/components/shared/AppLayout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Assistant | CivicMind AI',
  description: 'Your intelligent civic companion for navigating reports and platform features.',
};

export default function AssistantPage() {
  return (
    <AppLayout>
      <AIAssistantView />
    </AppLayout>
  );
}
