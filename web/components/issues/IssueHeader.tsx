import React from 'react';
import Link from 'next/link';
import { ChevronRight, ShieldCheck, Activity } from 'lucide-react';

interface IssueHeaderProps {
  title: string;
  category: string;
  severity: string;
  status?: string;
  createdAt?: string;
}

function formatDate(dateStr?: string) {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  });
}

export default function IssueHeader({ title, category, severity, status, createdAt }: IssueHeaderProps) {
  
  const getStatusColor = (s?: string) => {
    const stat = (s || '').toLowerCase();
    if (stat === 'resolved' || stat === 'closed') return 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]';
    if (stat === 'in progress' || stat === 'in-progress') return 'bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.8)]';
    return 'bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]';
  };

  const getSeverityStyle = (sev: string) => {
    const s = sev.toUpperCase();
    if (s === 'CRITICAL') return 'text-rose-400 bg-rose-500/10 border-rose-500/20 shadow-[0_0_10px_rgba(244,63,94,0.15)]';
    if (s === 'HIGH') return 'text-orange-400 bg-orange-500/10 border-orange-500/20 shadow-[0_0_10px_rgba(249,115,22,0.15)]';
    if (s === 'MEDIUM') return 'text-amber-400 bg-amber-500/10 border-amber-500/20 shadow-[0_0_10px_rgba(245,158,11,0.15)]';
    return 'text-blue-400 bg-blue-500/10 border-blue-500/20 shadow-[0_0_10px_rgba(59,130,246,0.15)]';
  };

  const getSeverityColor = (severity: string | null) => {
    switch (severity?.toLowerCase()) {
      case 'high':
        return 'text-rose-400 bg-rose-500/10 border border-rose-500/20';
      case 'medium':
        return 'text-amber-400 bg-amber-500/10 border border-amber-500/20';
      case 'low':
        return 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20';
      default:
        return 'text-gray-400 bg-gray-500/10 border border-gray-500/20';
    }
  };

  return (
    <div className="flex flex-col gap-6">
      
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm font-bold text-gray-500">
        <Link href="/feed" className="hover:text-white transition-colors">Intelligence Feed</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-gray-400">{category}</span>
        <ChevronRight className="w-4 h-4" />
        <span className="text-indigo-400 truncate max-w-[200px]">{title}</span>
      </div>

      <div className="flex flex-col gap-4">
        {/* Badges & Status */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-black text-gray-300 uppercase tracking-widest backdrop-blur-md">
            <div className={`w-2 h-2 rounded-full animate-pulse ${getStatusColor(status)}`} />
            {status || 'OPEN'}
          </div>

          <div className={`px-3 py-1 border rounded-full text-xs font-black uppercase tracking-widest backdrop-blur-md ${getSeverityStyle(severity)}`}>
            {severity} SEVERITY
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full text-xs font-black uppercase tracking-widest shadow-[0_0_10px_rgba(16,185,129,0.15)] backdrop-blur-md">
            <ShieldCheck className="w-3.5 h-3.5" />
            Verified
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-full text-xs font-black uppercase tracking-widest shadow-[0_0_10px_rgba(99,102,241,0.15)] backdrop-blur-md ml-auto">
            <Activity className="w-3.5 h-3.5" />
            98% AI Confidence
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
          {title}
        </h1>

        {/* Metadata */}
        <div className="flex items-center gap-4 text-sm font-bold text-gray-400">
          <span>Reported {formatDate(createdAt)}</span>
          <span className="w-1 h-1 rounded-full bg-gray-700" />
          <span className="text-indigo-400">Public Record</span>
        </div>
      </div>
    </div>
  );
}
