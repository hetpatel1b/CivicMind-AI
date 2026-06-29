import React from 'react';
import { Award } from 'lucide-react';
import { BadgeSummary, Badge } from '@/types/badge';
import { getBadgeDefinitions } from '@/services/badges';
import BadgeCard from './BadgeCard';
import LockedBadgeCard from './LockedBadgeCard';
import { motion, Variants } from 'framer-motion';

interface BadgeGalleryProps {
  badgeSummary: BadgeSummary;
}

const BADGE_REQUIREMENTS: Record<string, string> = {
  'FIRST_REPORTER': '10 Points',
  'ACTIVE_CITIZEN': '50 Points',
  'COMMUNITY_LEADER': '150 Points',
  'CIVIC_CHAMPION': '300 Points'
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
};

export default function BadgeGallery({ badgeSummary }: BadgeGalleryProps) {
  const allDefinitions = getBadgeDefinitions();
  const earnedTypes = new Set(badgeSummary.badges.map(b => b.type));
  
  const earnedBadges = allDefinitions.filter(d => earnedTypes.has(d.type));
  const lockedBadges = allDefinitions.filter(d => !earnedTypes.has(d.type));

  return (
    <div className="bg-[#0a0f1c]/60 backdrop-blur-3xl rounded-[2.5rem] p-8 shadow-[0_0_40px_rgba(0,0,0,0.5)] border border-amber-500/20 ring-1 ring-amber-500/10">
      <div className="flex items-center gap-5 mb-10">
        <div className="p-4 bg-amber-500/20 text-amber-400 rounded-2xl border border-amber-500/30 shadow-[0_0_15px_rgba(251,191,36,0.2)]">
          <Award className="w-8 h-8" />
        </div>
        <div>
          <h3 className="text-2xl font-black text-white tracking-tight">Achievement Gallery</h3>
          <p className="text-sm font-medium text-amber-200/70 mt-1">Badges earned through your civic contributions</p>
        </div>
      </div>
      
      {earnedBadges.length > 0 && (
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <h4 className="text-[11px] font-black text-white uppercase tracking-widest bg-amber-500/20 px-3 py-1.5 rounded-lg border border-amber-500/30">Unlocked</h4>
            <div className="flex-1 h-px bg-gradient-to-r from-amber-500/30 to-transparent"></div>
          </div>
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {earnedBadges.map(badge => (
              <motion.div key={badge.id} variants={itemVariants} className="h-full">
                <BadgeCard badge={badge as Badge} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      )}

      {lockedBadges.length > 0 && (
        <div>
          <div className="flex items-center gap-4 mb-6">
            <h4 className="text-[11px] font-black text-gray-500 uppercase tracking-widest bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">Locked</h4>
            <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent"></div>
          </div>
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {lockedBadges.map(badge => (
              <motion.div key={badge.id} variants={itemVariants} className="h-full">
                <LockedBadgeCard 
                  badge={badge as Badge} 
                  requirementInfo={BADGE_REQUIREMENTS[badge.type] || 'Unknown Requirements'} 
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      )}
    </div>
  );
}
