import React from 'react';
import Link from 'next/link';
import { ErrorAction } from './types';
import { Button, buttonVariants } from '@/design-system/components/Button';

interface ErrorActionsProps {
  primaryAction: ErrorAction;
  secondaryAction?: ErrorAction;
}

export function ErrorActions({ primaryAction, secondaryAction }: ErrorActionsProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
      {primaryAction.href ? (
        <Link 
          href={primaryAction.href}
          className={buttonVariants('primary', 'lg', 'w-full sm:w-auto shadow-sm')}
        >
          {primaryAction.label}
        </Link>
      ) : (
        <Button 
          onClick={primaryAction.onClick}
          size="lg"
          className="w-full sm:w-auto shadow-sm"
        >
          {primaryAction.label}
        </Button>
      )}

      {secondaryAction && (
        secondaryAction.href ? (
          <Link 
            href={secondaryAction.href}
            className={buttonVariants('outline', 'lg', 'w-full sm:w-auto shadow-sm')}
          >
            {secondaryAction.label}
          </Link>
        ) : (
          <Button
            variant="outline"
            onClick={secondaryAction.onClick}
            size="lg"
            className="w-full sm:w-auto shadow-sm"
          >
            {secondaryAction.label}
          </Button>
        )
      )}
    </div>
  );
}
