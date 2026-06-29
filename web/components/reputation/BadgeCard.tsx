import React from 'react';
import { Award, Megaphone, Activity, Trophy, CheckCircle2 } from 'lucide-react';
import { Badge } from '@/types/badge';
import { motion } from 'framer-motion';

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
    <motion.div 
      whileHover={{ y: -4, scale: 1.02 }}
      className="relative h-full bg-[#050505]/60 backdrop-blur-md border border-amber-500/30 shadow-[0_0_20px_rgba(251,191,36,0.1)] hover:shadow-[0_0_30px_rgba(251,191,36,0.2)] transition-all rounded-[1.5rem] flex flex-col items-center text-center overflow-hidden p-6 group ring-1 ring-amber-500/10"
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-300 via-amber-500 to-amber-300 opacity-50 group-hover:opacity-100 transition-opacity" />
      <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/10 to-transparent pointer-events-none" />
      
      <div className="absolute top-4 right-4 text-emerald-400 bg-emerald-500/20 border border-emerald-500/30 rounded-full p-1.5 shadow-[0_0_10px_rgba(16,185,129,0.3)]" title="Unlocked">
        <CheckCircle2 className="w-4 h-4" />
      </div>
      
      <div className="w-24 h-24 bg-[#0a0f1c] rounded-[1.25rem] flex items-center justify-center mb-6 border border-amber-500/30 shadow-[0_0_20px_rgba(251,191,36,0.2)] relative group-hover:rotate-6 transition-transform duration-500 ring-1 ring-amber-500/20">
        <div className="absolute inset-2 bg-gradient-to-br from-amber-500/20 to-transparent rounded-[1rem] flex items-center justify-center border border-amber-500/10">
          <IconComponent className="w-10 h-10 text-amber-400 drop-shadow-[0_0_10px_rgba(251,191,36,0.8)]" />
        </div>
      </div>
      
      <h4 className="text-xl font-black text-white mb-2 tracking-tight">
        {badge.name}
      </h4>
      <p className="text-sm font-medium text-amber-200/70 leading-relaxed mb-6">
        {badge.description}
      </p>
      
      <div className="mt-auto px-5 py-2 bg-amber-500/10 text-amber-400 text-[10px] font-black uppercase tracking-widest rounded-xl border border-amber-500/20 shadow-inner w-full">
        Achieved
      </div>
    </motion.div>
  );
}
