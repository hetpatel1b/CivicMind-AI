import React from 'react';
import { Award, Megaphone, Activity, Trophy, CheckCircle } from 'lucide-react';
import { Badge } from '@/types/badge';

interface BadgeCardProps {
  badge: Badge;
}

const ICON_MAP: Record<string, React.ElementType> = {
  'Megaphone': Megaphone,
  'Activity': Activity,
  'Award': Award,
  'Trophy': Trophy,
};

export default function BadgeCard({ badge }: BadgeCardProps) {
  const IconComponent = ICON_MAP[badge.icon] || Award;

  return (
    <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-yellow-200 dark:border-yellow-900/30 hover:border-yellow-300 dark:hover:border-yellow-700 transition-colors flex flex-col items-center text-center overflow-hidden">
      <div className="absolute top-3 right-3 text-yellow-500">
        <CheckCircle className="w-5 h-5" />
      </div>
      
      <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mb-4 border border-yellow-200 dark:border-yellow-900/50 shadow-inner">
        <IconComponent className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
      </div>
      
      <h4 className="text-base font-bold text-gray-900 dark:text-white mb-2">
        {badge.name}
      </h4>
      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
        {badge.description}
      </p>
    </div>
  );
}
