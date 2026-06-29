import React from 'react';
import { Clock, ShieldCheck, CheckCircle2, Activity, Play } from 'lucide-react';

interface IssueTimelineProps {
  status: string;
  createdAt: string;
  updatedAt: string;
}

export default function IssueTimeline({ status, createdAt, updatedAt }: IssueTimelineProps) {
  const isVerified = status === 'VERIFIED' || status === 'IN PROGRESS' || status === 'IN-PROGRESS' || status === 'RESOLVED' || status === 'CLOSED';
  const isInProgress = status === 'IN PROGRESS' || status === 'IN-PROGRESS' || status === 'RESOLVED' || status === 'CLOSED';
  const isResolved = status === 'RESOLVED' || status === 'CLOSED';

  const steps = [
    {
      label: 'Issue Reported',
      date: new Date(createdAt).toLocaleString(),
      icon: Clock,
      completed: true,
      active: !isVerified,
      color: 'bg-indigo-500'
    },
    {
      label: 'Verified',
      date: isVerified ? new Date(updatedAt).toLocaleString() : 'Pending Administration Review...',
      icon: ShieldCheck,
      completed: isVerified,
      active: isVerified && !isInProgress,
      color: 'bg-blue-500'
    },
    {
      label: 'In Progress',
      date: isInProgress ? new Date(updatedAt).toLocaleString() : 'Awaiting Assignment...',
      icon: Activity,
      completed: isInProgress,
      active: isInProgress && !isResolved,
      color: 'bg-amber-500'
    },
    {
      label: 'Resolved',
      date: isResolved ? new Date(updatedAt).toLocaleString() : 'Work in progress...',
      icon: CheckCircle2,
      completed: isResolved,
      active: isResolved,
      color: 'bg-emerald-500'
    }
  ];

  return (
    <div className="bg-[#0a0f1c]/50 backdrop-blur-3xl rounded-[2rem] p-8 shadow-[0_0_30px_rgba(0,0,0,0.5)] border border-white/10 ring-1 ring-white/5">
      <h3 className="text-lg font-black text-white mb-8 tracking-tight flex items-center gap-2">
        <Play className="w-5 h-5 text-indigo-400" />
        Investigation Timeline
      </h3>
      
      <div className="relative ml-4 space-y-10 before:absolute before:inset-0 before:ml-[5px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-indigo-500 before:via-white/10 before:to-transparent">
        {steps.map((step, i) => (
          <div key={i} className={`relative pl-8 ${step.completed ? 'opacity-100' : 'opacity-40 grayscale'} transition-all`}>
            {/* Timeline dot */}
            <span className={`absolute left-0 top-1 w-3 h-3 rounded-full flex items-center justify-center ring-4 ring-[#0a0f1c] ${step.active ? `${step.color} shadow-[0_0_15px_rgba(255,255,255,0.5)] scale-125` : (step.completed ? step.color : 'bg-white/20')} transition-all`}>
            </span>
            
            <div className={`p-4 rounded-2xl border transition-all ${step.active ? 'bg-white/10 border-white/20 shadow-sm' : 'bg-white/5 border-white/5 hover:bg-white/10'}`}>
              <div className="flex items-center gap-3 mb-1">
                <step.icon className={`w-4 h-4 ${step.active ? 'text-white' : 'text-gray-400'}`} />
                <h4 className={`text-sm font-bold ${step.active ? 'text-white' : 'text-gray-300'}`}>
                  {step.label}
                </h4>
              </div>
              <p className={`text-xs font-medium pl-7 ${step.active ? 'text-indigo-200' : 'text-gray-500'}`}>
                {step.date}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
