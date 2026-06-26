import React from 'react';
import { Award, Target, Trophy, TrendingUp } from 'lucide-react';
import { ReputationSummary } from '@/types/reputation';
import { BadgeSummary } from '@/types/badge';

interface ReputationStatsProps {
  reputationSummary: ReputationSummary;
  badgeSummary: BadgeSummary;
}

export default function ReputationStats({ reputationSummary, badgeSummary }: ReputationStatsProps) {
  const stats = [
    { label: 'Total Points', value: reputationSummary.totalPoints, icon: Target, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/20' },
    { label: 'Badges Earned', value: badgeSummary.totalBadges, icon: Award, color: 'text-yellow-500', bg: 'bg-yellow-50 dark:bg-yellow-900/20' },
    { label: 'Reports', value: reputationSummary.totalReports, icon: TrendingUp, color: 'text-green-500', bg: 'bg-green-50 dark:bg-green-900/20' },
    { label: 'Supports', value: reputationSummary.totalSupports, icon: Trophy, color: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-900/20' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat, idx) => (
        <div key={idx} className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <div className={`w-12 h-12 rounded-full flex shrink-0 items-center justify-center ${stat.bg}`}>
            <stat.icon className={`w-6 h-6 ${stat.color}`} />
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {stat.value}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">
              {stat.label}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
