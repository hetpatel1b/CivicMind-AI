import React from 'react';
import { ShieldCheck, CheckCircle2, XCircle, Clock } from 'lucide-react';

interface IssueStatusCardProps {
  status: string;
}

export default function IssueStatusCard({ status }: IssueStatusCardProps) {
  let Icon = Clock;
  let colorClass = '';
  let title = '';
  let description = '';

  switch (status) {
    case 'VERIFIED':
      Icon = ShieldCheck;
      colorClass = 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 border-blue-200 dark:border-blue-900/50';
      title = 'Verified Issue';
      description = 'This issue has been officially verified by the civic administration.';
      break;
    case 'RESOLVED':
      Icon = CheckCircle2;
      colorClass = 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30 border-green-200 dark:border-green-900/50';
      title = 'Resolved';
      description = 'This issue has been successfully resolved.';
      break;
    case 'REJECTED':
      Icon = XCircle;
      colorClass = 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30 border-red-200 dark:border-red-900/50';
      title = 'Rejected';
      description = 'This issue was rejected. It may be a duplicate or invalid.';
      break;
    default:
      Icon = Clock;
      colorClass = 'text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/30 border-yellow-200 dark:border-yellow-900/50';
      title = 'Pending Verification';
      description = 'This issue is currently awaiting verification by administrators.';
  }

  return (
    <div className={`rounded-2xl p-6 shadow-sm border flex items-start gap-4 ${colorClass}`}>
      <div className="shrink-0 p-2 bg-white/50 dark:bg-black/20 rounded-full">
        <Icon className="w-8 h-8" />
      </div>
      <div>
        <h3 className="font-bold text-lg mb-1">{title}</h3>
        <p className="text-sm opacity-90">{description}</p>
      </div>
    </div>
  );
}
