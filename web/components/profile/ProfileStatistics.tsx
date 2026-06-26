import React from 'react';
import { ShieldAlert, ThumbsUp, MessageSquare, Award } from 'lucide-react';
import { ReputationSummary } from '@/types/reputation';
import ProfileCard from './ProfileCard';

interface ProfileStatisticsProps {
  summary: ReputationSummary;
  totalBadges: number;
}

export default function ProfileStatistics({ summary, totalBadges }: ProfileStatisticsProps) {
  const stats = [
    { label: 'Reports', value: summary.totalReports, icon: ShieldAlert, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/20' },
    { label: 'Supports', value: summary.totalSupports, icon: ThumbsUp, color: 'text-green-500', bg: 'bg-green-50 dark:bg-green-900/20' },
    { label: 'Comments', value: summary.totalComments, icon: MessageSquare, color: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-900/20' },
    { label: 'Badges', value: totalBadges, icon: Award, color: 'text-yellow-500', bg: 'bg-yellow-50 dark:bg-yellow-900/20' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat, idx) => (
        <ProfileCard key={idx} className="!p-0 border-none shadow-none bg-transparent dark:bg-transparent">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col items-center justify-center text-center h-full">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 ${stat.bg}`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <span className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {stat.value}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider font-semibold">
              {stat.label}
            </span>
          </div>
        </ProfileCard>
      ))}
    </div>
  );
}
