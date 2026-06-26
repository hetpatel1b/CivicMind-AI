import React from 'react';
import { Medal, Trophy, Activity, Award, Megaphone } from 'lucide-react';
import EmptyState from './EmptyState';
import { Badge } from '@/types/badge';

interface BadgePreviewProps {
  totalBadges: number;
  badges: Badge[];
}

const IconMap: Record<string, React.ElementType> = {
  Megaphone,
  Activity,
  Award,
  Trophy,
};

export default function BadgePreview({ totalBadges, badges }: BadgePreviewProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
          <Medal className="w-5 h-5 text-yellow-500" />
          Recent Badges
        </h3>
        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
          {totalBadges} Total
        </span>
      </div>
      
      <div className="flex-1 flex items-center justify-center">
        {badges.length === 0 ? (
          <div className="w-full">
            <EmptyState 
              icon={Medal} 
              title="No badges yet" 
              description="Start participating in the community to earn your first badge." 
            />
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 w-full">
            {badges.slice(0, 4).map((badge) => {
              const Icon = IconMap[badge.icon] || Medal;
              return (
                <div key={badge.id} className="flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-100 dark:border-gray-700 text-center">
                  <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center mb-3 shadow-sm text-yellow-500">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white line-clamp-1">{badge.name}</h4>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
