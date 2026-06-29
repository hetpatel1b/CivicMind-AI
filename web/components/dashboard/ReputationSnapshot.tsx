'use client';

import React from 'react';
import { Award, Target, Trophy, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { fadeUp } from '@/design-system/motion/variants';
import { ReputationProfile } from '@/types/reputation';
import { BadgeSummary } from '@/types/badge';

interface ReputationSnapshotProps {
  profile: ReputationProfile | null;
  badgeSummary: BadgeSummary | null;
}

export default function ReputationSnapshot({ profile, badgeSummary }: ReputationSnapshotProps) {
  const points = profile?.totalPoints || 0;
  const level = profile?.level || 'Novice';
  const badges = badgeSummary?.badges || [];
  
  // Calculate fake progress for UI purposes (e.g. 1000 points per level up)
  const nextLevelThreshold = (Math.floor(points / 1000) + 1) * 1000;
  const progressPercent = Math.min(100, Math.max(0, (points / nextLevelThreshold) * 100));

  return (
    <motion.div 
      variants={fadeUp}
      className="bg-[#0a0f1c]/40 backdrop-blur-3xl rounded-[2rem] p-8 border border-white/5 shadow-[0_15px_30px_rgba(0,0,0,0.4)] h-full flex flex-col relative overflow-hidden group ring-1 ring-white/5"
    >
      <div className="absolute top-0 right-0 w-[400px] h-[400px] opacity-20 pointer-events-none transform group-hover:scale-110 transition-transform duration-700 mix-blend-screen blur-[100px] bg-purple-500/20" />
      <div className="absolute -top-10 -right-10 opacity-[0.02] pointer-events-none transform group-hover:rotate-12 transition-transform duration-1000">
        <Award className="w-[300px] h-[300px]" />
      </div>

      <div className="flex items-center justify-between mb-8 relative z-10">
        <h3 className="font-bold text-white flex items-center gap-3 text-lg tracking-tight">
          <div className="p-2 bg-purple-500/20 border border-purple-500/30 rounded-lg shadow-inner">
            <Award className="w-4 h-4 text-purple-400" />
          </div>
          Reputation Snapshot
        </h3>
        <Link href="/reputation" className="text-[10px] font-bold text-purple-400 hover:text-purple-300 uppercase tracking-widest flex items-center gap-2 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-purple-500 rounded p-1">
          Full Profile <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      <div className="flex-1 flex flex-col justify-center relative z-10">
        <div className="flex items-end justify-between mb-4">
          <div>
            <p className="text-[10px] text-gray-400 font-bold mb-2 uppercase tracking-[0.2em]">Current Level</p>
            <h2 className="text-4xl font-extrabold text-white tracking-tight flex items-center gap-3">
              {level}
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 mt-1 shadow-[0_0_10px_rgba(16,185,129,0.8)] animate-pulse"></div>
            </h2>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-gray-400 font-bold mb-2 uppercase tracking-[0.2em]">Total XP</p>
            <p className="text-3xl font-extrabold text-purple-400 drop-shadow-[0_0_15px_rgba(168,85,247,0.3)]">{points.toLocaleString()}</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-6 mb-8">
          <div className="flex items-center justify-between text-[10px] text-gray-400 mb-3 font-bold uppercase tracking-widest">
            <span className="flex items-center gap-2"><Target className="w-3 h-3 text-purple-500" /> Next rank</span>
            <span className="text-purple-300">{nextLevelThreshold.toLocaleString()} XP</span>
          </div>
          <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden shadow-inner border border-white/10">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
              className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-full relative"
            >
              <div className="absolute inset-0 bg-white/20 blur-[1px] rounded-full" />
            </motion.div>
          </div>
        </div>

        {/* Badges Preview */}
        <div className="mt-auto pt-8 border-t border-white/10">
          <div className="flex items-center justify-between mb-5">
            <p className="text-[10px] font-bold text-white uppercase tracking-widest">Recent Achievements</p>
            <span className="text-[9px] font-bold text-purple-400 uppercase tracking-widest bg-purple-500/10 px-2 py-1 rounded border border-purple-500/20">{badgeSummary?.totalBadges || 0} Total Badges</span>
          </div>
          
          <div className="flex gap-4">
            {badges.length > 0 ? (
              badges.slice(0, 4).map((badge) => (
                <div key={badge.id} className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.15)] flex items-center justify-center flex-shrink-0 hover:scale-110 transition-transform cursor-help" title={badge.name}>
                  <Trophy className="w-5 h-5 text-amber-400 drop-shadow-[0_0_5px_rgba(245,158,11,0.5)]" />
                </div>
              ))
            ) : (
              <p className="text-xs text-gray-500 font-medium tracking-wide">No badges earned yet. Start contributing to earn your first badge!</p>
            )}
            
            {badges.length > 4 && (
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 text-xs font-bold text-gray-400 shadow-inner">
                +{badges.length - 4}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
