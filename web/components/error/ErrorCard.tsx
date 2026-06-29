import React from 'react';
import { Card } from '@/design-system/components/Card';

interface ErrorCardProps {
  children: React.ReactNode;
}

export function ErrorCard({ children }: ErrorCardProps) {
  return (
    <Card className="p-8 md:p-12 md:rounded-3xl max-w-2xl mx-auto text-center relative overflow-hidden">
      {children}
    </Card>
  );
}
