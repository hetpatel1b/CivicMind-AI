'use client';

import React from 'react';
import { Download, FileText, PieChart, TrendingUp, Users } from 'lucide-react';
import { Card } from '@/design-system/components/Card';
import StatisticsChart from './StatisticsChart';
import CategoryChart from './CategoryChart';
import SeverityChart from './SeverityChart';

export default function AnalyticsPage() {
  const handleExport = (format: string) => {
    alert(`Exporting report as ${format}...`);
  };

  return (
    <div className="space-y-6">
      
      {/* Export Options Row */}
      <Card className="p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Export Reports</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">Download system data for offline analysis</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button 
            onClick={() => handleExport('CSV')}
            className="flex items-center gap-2 px-4 py-2 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-colors font-medium text-sm"
          >
            <FileText className="w-4 h-4" />
            CSV Data
          </button>
          <button 
            onClick={() => handleExport('PDF')}
            className="flex items-center gap-2 px-4 py-2 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-colors font-medium text-sm"
          >
            <Download className="w-4 h-4" />
            PDF Report
          </button>
        </div>
      </Card>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-5 h-5 text-blue-500" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Resolution Trends</h3>
          </div>
          <div className="h-64 flex items-center justify-center bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800 text-slate-400">
            [Resolution Over Time Chart]
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <Users className="w-5 h-5 text-emerald-500" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">User Engagement</h3>
          </div>
          <div className="h-64 flex items-center justify-center bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800 text-slate-400">
            [User Growth & Reports Chart]
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <PieChart className="w-5 h-5 text-purple-500" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Issue Categories</h3>
          </div>
          <div className="h-64 flex items-center justify-center bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800 text-slate-400">
            [Category Distribution Chart]
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <PieChart className="w-5 h-5 text-amber-500" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Severity Breakdown</h3>
          </div>
          <div className="h-64 flex items-center justify-center bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800 text-slate-400">
            [Severity Distribution Chart]
          </div>
        </Card>
      </div>

    </div>
  );
}
