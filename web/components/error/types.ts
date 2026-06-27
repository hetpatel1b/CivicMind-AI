import { LucideIcon } from 'lucide-react';

export type ErrorSeverity = 'low' | 'medium' | 'high' | 'critical';

export interface ErrorAction {
  label: string;
  href?: string;
  onClick?: () => void;
  primary?: boolean;
}

export interface ErrorConfig {
  statusCode: string | number;
  title: string;
  description: string;
  primaryAction: ErrorAction;
  secondaryAction?: ErrorAction;
  icon: LucideIcon;
  severity: ErrorSeverity;
}
