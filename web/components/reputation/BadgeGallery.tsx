import React from 'react';
import { Award } from 'lucide-react';
import { BadgeSummary, Badge } from '@/types/badge';
import { getBadgeDefinitions } from '@/services/badges';
import BadgeCard from './BadgeCard';
import LockedBadgeCard from './LockedBadgeCard';

interface BadgeGalleryProps {
  badgeSummary: BadgeSummary;
}

const BADGE_REQUIREMENTS: Record<string, string> = {
  'FIRST_REPORTER': '10 Points',
  'ACTIVE_CITIZEN': '50 Points',
  'COMMUNITY_LEADER': '150 Points',
  'CIVIC_CHAMPION': '300 Points'
};

export default function BadgeGallery({ badgeSummary }: BadgeGalleryProps) {
  const allDefinitions = getBadgeDefinitions();
  const earnedTypes = new Set(badgeSummary.badges.map(b => b.type));
  
  const earnedBadges = allDefinitions.filter(d => earnedTypes.has(d.type));
  const lockedBadges = allDefinitions.filter(d => !earnedTypes.has(d.type));

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
      <div className="flex items-center gap-3 mb-6">
        <Award className="w-6 h-6 text-yellow-500" />
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Badge Gallery</h3>
      </div>
      
      {earnedBadges.length > 0 && (
        <div className="mb-8">
          <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">Unlocked Badges</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {earnedBadges.map(badge => (
              <BadgeCard key={badge.id} badge={badge as Badge} />
            ))}
          </div>
        </div>
      )}

      {lockedBadges.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">Locked Badges</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {lockedBadges.map(badge => (
              <LockedBadgeCard 
                key={badge.id} 
                badge={badge as Badge} 
                requirementInfo={BADGE_REQUIREMENTS[badge.type] || 'Unknown Requirements'} 
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
