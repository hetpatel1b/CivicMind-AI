import React from 'react';
import { Clock, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface IssueTimelineProps {
  status: string;
  createdAt: string;
  updatedAt: string;
}

export default function IssueTimeline({ status, createdAt, updatedAt }: IssueTimelineProps) {
  const steps = [
    {
      label: 'Reported',
      date: new Date(createdAt).toLocaleString(),
      icon: Clock,
      completed: true,
    }
  ];

  if (status === 'VERIFIED' || status === 'RESOLVED') {
    steps.push({
      label: 'Verified',
      date: status === 'VERIFIED' ? new Date(updatedAt).toLocaleString() : 'Pending...',
      icon: ShieldCheck,
      completed: true,
    });
  }

  if (status === 'RESOLVED') {
    steps.push({
      label: 'Resolved',
      date: new Date(updatedAt).toLocaleString(),
      icon: CheckCircle2,
      completed: true,
    });
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
      <h3 className="font-bold text-gray-900 dark:text-white mb-6">Activity Timeline</h3>
      
      <div className="relative border-l-2 border-gray-100 dark:border-gray-700 ml-3 space-y-8">
        {steps.map((step, i) => (
          <div key={i} className="relative pl-6">
            <span className="absolute -left-[11px] top-1 bg-white dark:bg-gray-800 rounded-full p-1 border-2 border-blue-500">
              <step.icon className="w-3 h-3 text-blue-500" />
            </span>
            <h4 className="text-sm font-bold text-gray-900 dark:text-white leading-none mb-1.5">
              {step.label}
            </h4>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {step.date}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
