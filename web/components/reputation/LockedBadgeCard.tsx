import React from 'react';
import { Award, Megaphone, Activity, Trophy, Lock } from 'lucide-react';
import { Badge } from '@/types/badge';

interface LockedBadgeCardProps {
  badge: Badge;
  requirementInfo: string;
}

const ICON_MAP: Record<string, React.ElementType> = {
  'Megaphone': Megaphone,
  'Activity': Activity,
  'Award': Award,
  'Trophy': Trophy,
};

export default function LockedBadgeCard({ badge, requirementInfo }: LockedBadgeCardProps) {
  const IconComponent = ICON_MAP[badge.icon] || Award;

  return (
    <div className="relative bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 flex flex-col items-center text-center opacity-70 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300">
      <div className="absolute top-3 right-3 text-gray-400">
        <Lock className="w-4 h-4" />
      </div>
      
      <div className="w-16 h-16 bg-gray-200 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4 border border-gray-300 dark:border-gray-700">
        <IconComponent className="w-8 h-8 text-gray-400 dark:text-gray-500" />
      </div>
      
      <h4 className="text-base font-bold text-gray-700 dark:text-gray-300 mb-2">
        {badge.name}
      </h4>
      <p className="text-sm text-gray-500 dark:text-gray-500 leading-relaxed mb-4">
        {badge.description}
      </p>
      
      <div className="mt-auto inline-flex items-center justify-center px-3 py-1 bg-gray-200 dark:bg-gray-800 text-xs font-semibold text-gray-600 dark:text-gray-400 rounded-full w-full">
        Requires {requirementInfo}
      </div>
    </div>
  );
}
