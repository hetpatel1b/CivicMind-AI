import React from 'react';
import AnalyticsPage from '@/components/admin/AnalyticsPage';
import { BarChart3 } from 'lucide-react';

export default function AdminAnalyticsPage() {
  return (
    <div className="p-6 sm:p-10 max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Analytics & Reports</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Export reports and view detailed statistics on civic issues and resolution rates.
          </p>
        </div>
        <div className="flex items-center gap-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-4 py-2 rounded-xl shadow-sm">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-purple-500" />
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              Live Data
            </span>
          </div>
        </div>
      </div>

      <AnalyticsPage />
    </div>
  );
}
