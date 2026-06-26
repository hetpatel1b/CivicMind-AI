import React from 'react';
import { Award, Megaphone, Activity, Trophy } from 'lucide-react';
import { BadgeSummary } from '@/types/badge';
import { getBadgeDefinitions } from '@/services/badges';
import ProfileCard from './ProfileCard';

interface ProfileBadgesProps {
  badgeSummary: BadgeSummary;
}

// Icon mapper
const ICON_MAP: Record<string, React.ElementType> = {
  'Megaphone': Megaphone,
  'Activity': Activity,
  'Award': Award,
  'Trophy': Trophy,
};

export default function ProfileBadges({ badgeSummary }: ProfileBadgesProps) {
  const allDefinitions = getBadgeDefinitions();
  const earnedTypes = new Set(badgeSummary.badges.map(b => b.type));

  return (
    <ProfileCard title="Badges & Achievements" icon={<Award className="w-5 h-5" />}>
      <div className="grid grid-cols-2 gap-4">
        {allDefinitions.map((def) => {
          const isEarned = earnedTypes.has(def.type);
          const IconComponent = ICON_MAP[def.icon] || Award;
          
          return (
            <div 
              key={def.id} 
              className={`p-4 rounded-xl border flex flex-col items-center text-center transition-all ${
                isEarned 
                  ? 'border-yellow-200 dark:border-yellow-900/50 bg-yellow-50 dark:bg-yellow-900/20 shadow-sm' 
                  : 'border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/30 opacity-60 grayscale'
              }`}
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 ${
                isEarned 
                  ? 'bg-yellow-100 dark:bg-yellow-900/40 text-yellow-600 dark:text-yellow-400' 
                  : 'bg-gray-200 dark:bg-gray-800 text-gray-400'
              }`}>
                <IconComponent className="w-6 h-6" />
              </div>
              <h4 className={`font-bold text-sm mb-1 ${isEarned ? 'text-gray-900 dark:text-white' : 'text-gray-500'}`}>
                {def.name}
              </h4>
              <p className={`text-xs ${isEarned ? 'text-gray-600 dark:text-gray-400' : 'text-gray-400 dark:text-gray-600'}`}>
                {def.description}
              </p>
            </div>
          );
        })}
      </div>
    </ProfileCard>
  );
}
