import React from 'react';
import { Award, Megaphone, Activity, Trophy, ChevronRight, CheckCircle2, Lock } from 'lucide-react';
import { BadgeSummary } from '@/types/badge';
import { getBadgeDefinitions } from '@/services/badges';
import Link from 'next/link';
import { motion } from 'framer-motion';

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

  // Sort so earned badges appear first
  const sortedBadges = [...allDefinitions].sort((a, b) => {
    if (earnedTypes.has(a.type) && !earnedTypes.has(b.type)) return -1;
    if (!earnedTypes.has(a.type) && earnedTypes.has(b.type)) return 1;
    return 0;
  }).slice(0, 4); // Only show top 4 featured

  return (
    <div className="bg-[#050505]/60 backdrop-blur-3xl rounded-[2rem] p-8 shadow-[0_0_40px_rgba(0,0,0,0.5)] border border-white/5 ring-1 ring-white/10 relative overflow-hidden group">
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-amber-500/10 blur-[80px] rounded-full pointer-events-none transition-transform duration-1000 group-hover:scale-110" />

      <div className="flex items-center justify-between mb-8 relative z-10">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-amber-500/20 text-amber-400 rounded-2xl border border-amber-500/30 shadow-[0_0_15px_rgba(251,191,36,0.2)]">
            <Award className="w-6 h-6 drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white tracking-tight">Achievement Highlights</h3>
            <p className="text-sm font-medium text-gray-400 mt-0.5">Featured badges from your journey</p>
          </div>
        </div>
        
        <Link 
          href="/reputation"
          className="hidden sm:flex items-center gap-1.5 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm font-bold text-gray-300 transition-colors shadow-inner"
        >
          View All <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
        {sortedBadges.map((def, index) => {
          const isEarned = earnedTypes.has(def.type);
          const IconComponent = ICON_MAP[def.icon] || Award;
          
          return (
            <motion.div 
              key={def.id} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative p-5 rounded-[1.5rem] border flex flex-col items-center text-center transition-all duration-300 group/badge hover:-translate-y-1 ${
                isEarned 
                  ? 'border-amber-500/30 bg-amber-500/10 hover:bg-amber-500/20 shadow-[0_0_15px_rgba(251,191,36,0.1)] hover:shadow-[0_0_25px_rgba(251,191,36,0.2)]' 
                  : 'border-dashed border-white/10 bg-white/5 opacity-70 grayscale hover:grayscale-0 hover:opacity-100 hover:border-white/20'
              }`}
            >
              {isEarned && (
                <div className="absolute top-3 right-3 text-emerald-400 bg-[#0a0f1c] rounded-full drop-shadow-[0_0_5px_rgba(16,185,129,0.5)]">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
              )}
              
              <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-4 transition-transform duration-500 group-hover/badge:scale-110 ${
                isEarned 
                  ? 'bg-gradient-to-br from-amber-400 to-amber-600 text-[#0a0f1c] border border-amber-300 shadow-[0_0_15px_rgba(251,191,36,0.5)]' 
                  : 'bg-white/10 text-gray-500 border border-white/10'
              }`}>
                {isEarned ? <IconComponent className="w-7 h-7" /> : <Lock className="w-6 h-6 opacity-50" />}
              </div>
              
              <h4 className={`font-bold text-sm mb-1 line-clamp-1 ${isEarned ? 'text-white' : 'text-gray-500'}`}>
                {def.name}
              </h4>
              
              {isEarned ? (
                <span className="mt-auto text-[10px] font-black uppercase tracking-widest text-amber-300 bg-amber-500/20 border border-amber-500/30 px-3 py-1 rounded-full drop-shadow-[0_0_5px_rgba(251,191,36,0.5)]">
                  Unlocked
                </span>
              ) : (
                <span className="mt-auto text-[10px] font-black uppercase tracking-widest text-gray-500 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
                  Locked
                </span>
              )}
            </motion.div>
          );
        })}
      </div>
      
      <Link 
        href="/reputation"
        className="mt-6 flex sm:hidden items-center justify-center gap-1.5 w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm font-bold text-gray-300 transition-colors shadow-inner relative z-10"
      >
        View All Achievements <ChevronRight className="w-4 h-4" />
      </Link>
    </div>
  );
}
