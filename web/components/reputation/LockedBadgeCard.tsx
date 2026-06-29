import React from 'react';
import { Award, Megaphone, Activity, Trophy, Lock } from 'lucide-react';
import { Badge } from '@/types/badge';
import { motion } from 'framer-motion';

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
    <motion.div 
      className="relative h-full bg-white/5 border border-dashed border-white/10 rounded-[1.5rem] flex flex-col items-center text-center overflow-hidden p-6 opacity-70 hover:opacity-100 transition-all duration-300 group"
    >
      <div className="absolute top-4 right-4 text-gray-500 bg-white/10 border border-white/5 rounded-full p-1.5" title="Locked">
        <Lock className="w-4 h-4" />
      </div>
      
      <div className="w-24 h-24 bg-[#050505]/50 rounded-[1.25rem] flex items-center justify-center mb-6 border border-white/10 relative ring-1 ring-white/5">
        <IconComponent className="w-10 h-10 text-gray-600" />
      </div>
      
      <h4 className="text-xl font-bold text-gray-500 mb-2">
        {badge.name}
      </h4>
      <p className="text-sm font-medium text-gray-500/70 leading-relaxed mb-6">
        {badge.description}
      </p>
      
      <div className="mt-auto px-5 py-2 bg-[#050505]/80 text-gray-400 text-[10px] font-black uppercase tracking-widest rounded-xl w-full border border-white/5">
        Requires {requirementInfo}
      </div>
    </motion.div>
  );
}
