import React from 'react';
import { Star, Trophy, Award, ShieldAlert } from 'lucide-react';
import { Badge } from '@/types/badge';
import ReputationEmptyState from './ReputationEmptyState';

interface AchievementTimelineProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  events: any[]; // reputation events
  userBadges: { badgeType: string; awardedAt: string }[];
  badgeDefinitions: Badge[];
}

export default function AchievementTimeline({ events, userBadges, badgeDefinitions }: AchievementTimelineProps) {
  
  // Create a unified list of major events
  const majorEvents = events
    .filter(e => e.type === 'ISSUE_RESOLVED' || e.type === 'ISSUE_VERIFIED')
    .map(e => ({
      id: e.id,
      type: e.type,
      date: new Date(e.created_at),
      name: e.type === 'ISSUE_RESOLVED' ? 'Issue Resolved' : 'Issue Verified',
      icon: e.type === 'ISSUE_RESOLVED' ? Trophy : ShieldAlert,
      color: e.type === 'ISSUE_RESOLVED' ? 'text-green-500' : 'text-blue-500',
      bg: e.type === 'ISSUE_RESOLVED' ? 'bg-green-100 dark:bg-green-900/30' : 'bg-blue-100 dark:bg-blue-900/30'
    }));

  const badgeEvents = userBadges.map(ub => {
    const def = badgeDefinitions.find(d => d.type === ub.badgeType);
    return {
      id: `badge-${ub.badgeType}`,
      type: 'BADGE_EARNED',
      date: new Date(ub.awardedAt),
      name: `Badge Unlocked: ${def?.name || ub.badgeType}`,
      icon: Award,
      color: 'text-yellow-500',
      bg: 'bg-yellow-100 dark:bg-yellow-900/30'
    };
  });

  const timeline = [...majorEvents, ...badgeEvents].sort((a, b) => b.date.getTime() - a.date.getTime());

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 h-full">
      <div className="flex items-center gap-3 mb-6">
        <Star className="w-5 h-5 text-yellow-500" />
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Major Achievements</h3>
      </div>
      
      {timeline.length === 0 ? (
        <ReputationEmptyState 
          icon={<Star className="w-8 h-8" />}
          title="No Major Achievements"
          description="Keep participating in the community to unlock major milestones."
        />
      ) : (
        <div className="relative border-l-2 border-gray-100 dark:border-gray-700 ml-3 space-y-6 pt-2">
          {timeline.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.id} className="relative pl-6">
                <span className={`absolute -left-[17px] top-0 rounded-full p-1.5 border-4 border-white dark:border-gray-800 ${item.bg}`}>
                  <Icon className={`w-3 h-3 ${item.color}`} />
                </span>
                <div className="flex flex-col gap-1">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
                    {item.name}
                  </h4>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {item.date.toLocaleString()}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
