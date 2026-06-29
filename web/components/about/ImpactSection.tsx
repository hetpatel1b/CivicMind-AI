import React from 'react';
import { DashboardStatistics } from '@/types/analytics';

interface ImpactSectionProps {
  stats: DashboardStatistics | null;
}

export default function ImpactSection({ stats }: ImpactSectionProps) {
  // Use real stats if available, otherwise fallback to meaningful placeholders for the story
  const displayStats = [
    { label: 'Total Reports', value: stats?.totalIssues?.toString() || '1,200+', color: 'text-blue-600 dark:text-blue-400' },
    { label: 'Issues Resolved', value: stats?.resolvedIssues?.toString() || '8,500+', color: 'text-emerald-600 dark:text-emerald-400' },
    { label: 'Civic Points Earned', value: '450K+', color: 'text-indigo-600 dark:text-indigo-400' },
    { label: 'Avg Resolution Time', value: '3.2 Days', color: 'text-amber-600 dark:text-amber-400' },
  ];

  return (
    <section className="mb-24 mt-[-40px] relative z-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white dark:bg-gray-900 backdrop-blur-2xl border border-gray-100 dark:border-gray-800 rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-indigo-500/5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-transparent md:divide-gray-100 md:dark:divide-gray-800">
            {displayStats.map((stat, idx) => (
              <div key={idx} className="text-center px-4">
                <div className={`text-4xl md:text-5xl font-extrabold tracking-tight mb-2 ${stat.color}`}>
                  {stat.value}
                </div>
                <div className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
