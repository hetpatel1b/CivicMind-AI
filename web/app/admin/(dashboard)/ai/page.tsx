import React from 'react';
import AICenter from '@/components/admin/AICenter';
import { Sparkles } from 'lucide-react';

export default function AdminAIPage() {
  return (
    <div className="p-6 sm:p-10 max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">AI Center</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Manage AI integrations, monitor token usage, and configure automation settings.
          </p>
        </div>
        <div className="flex items-center gap-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-4 py-2 rounded-xl shadow-sm">
          <div className="flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              Systems Operational
            </span>
          </div>
        </div>
      </div>

      <AICenter />
    </div>
  );
}
