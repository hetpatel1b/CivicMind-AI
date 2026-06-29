import React from 'react';
import { Trophy, ShieldCheck, ChevronRight } from 'lucide-react';
import { ReputationProfile } from '@/types/reputation';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface ProfileReputationProps {
  profile: ReputationProfile;
}

export default function ProfileReputation({ profile }: ProfileReputationProps) {
  // Determine next level threshold
  let nextLevelThreshold = 0;
  if (profile.totalPoints < 50) nextLevelThreshold = 50;
  else if (profile.totalPoints < 150) nextLevelThreshold = 150;
  else if (profile.totalPoints < 300) nextLevelThreshold = 300;
  
  const isMaxLevel = nextLevelThreshold === 0;
  
  // Calculate progress percentage
  let progressPercentage = 100;
  if (!isMaxLevel) {
    let baseThreshold = 0;
    if (nextLevelThreshold === 50) baseThreshold = 0;
    else if (nextLevelThreshold === 150) baseThreshold = 50;
    else if (nextLevelThreshold === 300) baseThreshold = 150;
    
    const pointsInCurrentLevel = profile.totalPoints - baseThreshold;
    const levelRange = nextLevelThreshold - baseThreshold;
    progressPercentage = Math.min(100, Math.max(0, (pointsInCurrentLevel / levelRange) * 100));
  }

  // Mock trust score visually derived from points
  const trustScore = Math.min(99, Math.max(75, 80 + Math.floor(profile.totalPoints / 50)));

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="bg-[#050505]/60 backdrop-blur-3xl rounded-[2rem] p-8 shadow-[0_0_40px_rgba(0,0,0,0.5)] border border-white/5 ring-1 ring-white/10 relative overflow-hidden group"
    >
      <div className="absolute -right-20 -top-20 w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px] group-hover:scale-110 transition-transform duration-1000 pointer-events-none" />

      <div className="flex items-center gap-4 mb-8 relative z-10">
        <div className="p-3 bg-indigo-500/20 text-indigo-400 rounded-2xl border border-indigo-500/30 shadow-[0_0_15px_rgba(99,102,241,0.2)]">
          <Trophy className="w-6 h-6 drop-shadow-[0_0_8px_rgba(99,102,241,0.8)]" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white tracking-tight">Reputation</h3>
          <p className="text-sm font-medium text-gray-400 mt-0.5">Your civic ranking and trust level</p>
        </div>
      </div>

      <div className="relative z-10 mb-8 flex flex-col items-center">
        <div className="relative mb-4">
          <div className="w-28 h-28 rounded-full bg-[#0a0f1c] flex items-center justify-center border border-white/10 shadow-[0_0_30px_rgba(99,102,241,0.2)] group-hover:scale-105 transition-transform duration-500 relative z-10">
            <Trophy className="w-12 h-12 text-indigo-400 drop-shadow-[0_0_10px_rgba(99,102,241,0.8)]" />
          </div>
          <div className="absolute inset-0 rounded-full bg-indigo-500/20 blur-[20px] animate-pulse" />
        </div>
        <h3 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-indigo-200 mb-1 drop-shadow-sm tracking-tight">
          {profile.level}
        </h3>
        <p className="text-gray-400 font-black uppercase tracking-widest text-xs">
          {profile.totalPoints} Total Points
        </p>
      </div>

      <div className="relative z-10 mb-6 bg-[#0a0f1c]/80 backdrop-blur-md rounded-2xl p-5 border border-white/5 shadow-inner">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-black uppercase tracking-wider text-gray-400">
            Progress to Next Rank
          </span>
          {!isMaxLevel && (
            <span className="text-xs font-black text-indigo-300 drop-shadow-[0_0_5px_rgba(165,180,252,0.8)]">
              {progressPercentage.toFixed(0)}%
            </span>
          )}
        </div>
        
        {isMaxLevel ? (
          <div className="text-sm text-amber-400 font-bold text-center bg-amber-500/20 p-2.5 rounded-xl border border-amber-500/30 shadow-[0_0_15px_rgba(251,191,36,0.2)]">
            Maximum Rank Achieved!
          </div>
        ) : (
          <div className="w-full bg-white/5 rounded-full h-2.5 mb-2 overflow-hidden shadow-inner">
            <div 
              className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(168,85,247,0.8)]"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        )}
      </div>

      <div className="relative z-10 flex items-center justify-between p-4 bg-emerald-500/10 border border-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.1)] rounded-2xl mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-lg border border-emerald-500/30">
            <ShieldCheck className="w-5 h-5 drop-shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
          </div>
          <div>
            <p className="text-xs font-black uppercase tracking-wider text-emerald-400/70 mb-0.5">Community Trust</p>
            <p className="text-lg font-black text-emerald-300 drop-shadow-[0_0_5px_rgba(110,231,183,0.5)]">{trustScore}% Score</p>
          </div>
        </div>
      </div>

      <Link 
        href="/reputation"
        className="relative z-10 w-full py-3.5 px-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm font-bold text-gray-300 transition-all flex items-center justify-center gap-2 group/btn shadow-inner hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]"
      >
        View Full Reputation
        <ChevronRight className="w-4 h-4 text-gray-400 group-hover/btn:translate-x-1 group-hover/btn:text-white transition-all" />
      </Link>
    </motion.div>
  );
}
