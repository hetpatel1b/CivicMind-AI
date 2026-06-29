import React from 'react';
import { ShieldCheck, CheckCircle2, XCircle, Clock, Loader2, Activity } from 'lucide-react';

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
      colorClass = 'text-blue-400 bg-blue-500/10 border-blue-500/30 shadow-[0_0_20px_rgba(59,130,246,0.15)] ring-1 ring-blue-500/20';
      title = 'Verified Issue';
      description = 'This issue has been officially verified by the civic administration.';
      break;
    case 'RESOLVED':
    case 'CLOSED':
      Icon = CheckCircle2;
      colorClass = 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.15)] ring-1 ring-emerald-500/20';
      title = 'Resolved';
      description = 'This issue has been successfully resolved.';
      break;
    case 'REJECTED':
      Icon = XCircle;
      colorClass = 'text-rose-400 bg-rose-500/10 border-rose-500/30 shadow-[0_0_20px_rgba(244,63,94,0.15)] ring-1 ring-rose-500/20';
      title = 'Rejected';
      description = 'This issue was rejected. It may be a duplicate or invalid.';
      break;
    case 'IN PROGRESS':
    case 'IN-PROGRESS':
      Icon = Activity;
      colorClass = 'text-amber-400 bg-amber-500/10 border-amber-500/30 shadow-[0_0_20px_rgba(245,158,11,0.15)] ring-1 ring-amber-500/20';
      title = 'In Progress';
      description = 'Active work is currently being done to resolve this issue.';
      break;
    default:
      Icon = Clock;
      colorClass = 'text-indigo-400 bg-indigo-500/10 border-indigo-500/30 shadow-[0_0_20px_rgba(99,102,241,0.15)] ring-1 ring-indigo-500/20';
      title = 'Pending Review';
      description = 'Awaiting administrative verification and assignment.';
  }

  return (
    <div className={`rounded-3xl p-6 backdrop-blur-3xl flex items-start gap-5 overflow-hidden relative ${colorClass}`}>
      <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
        <Icon className="w-32 h-32" />
      </div>
      
      <div className="relative shrink-0 p-3 bg-white/10 rounded-2xl border border-white/10 shadow-inner">
        <Icon className="w-8 h-8 drop-shadow-sm" />
      </div>
      <div className="relative z-10">
        <h3 className="font-black text-xl mb-1.5 tracking-tight text-white">{title}</h3>
        <p className="text-sm font-medium opacity-90 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
