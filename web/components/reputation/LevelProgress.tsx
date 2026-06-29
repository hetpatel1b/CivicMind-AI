import React from 'react';
import { Target, Star, ChevronRight, Zap } from 'lucide-react';
import { ReputationProfile } from '@/types/reputation';
import { motion } from 'framer-motion';

interface LevelProgressProps {
  profile: ReputationProfile;
}

export default function LevelProgress({ profile }: LevelProgressProps) {
  let nextLevelThreshold = 0;
  let nextLevelName = "Max Rank";
  if (profile.totalPoints < 50) { nextLevelThreshold = 50; nextLevelName = "Active Citizen"; }
  else if (profile.totalPoints < 150) { nextLevelThreshold = 150; nextLevelName = "Community Leader"; }
  else if (profile.totalPoints < 300) { nextLevelThreshold = 300; nextLevelName = "Civic Champion"; }
  
  const isMaxLevel = nextLevelThreshold === 0;
  
  let progressPercentage = 100;
  let pointsNeeded = 0;

  if (!isMaxLevel) {
    let baseThreshold = 0;
    if (nextLevelThreshold === 50) baseThreshold = 0;
    else if (nextLevelThreshold === 150) baseThreshold = 50;
    else if (nextLevelThreshold === 300) baseThreshold = 150;
    
    const pointsInCurrentLevel = profile.totalPoints - baseThreshold;
    const levelRange = nextLevelThreshold - baseThreshold;
    progressPercentage = Math.min(100, Math.max(0, (pointsInCurrentLevel / levelRange) * 100));
    pointsNeeded = nextLevelThreshold - profile.totalPoints;
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-[#0a0f1c]/60 backdrop-blur-3xl rounded-[2.5rem] p-8 shadow-[0_0_40px_rgba(0,0,0,0.5)] border border-indigo-500/20 ring-1 ring-indigo-500/10 relative overflow-hidden group"
    >
      <div className="absolute -right-20 -top-20 w-[30rem] h-[30rem] bg-indigo-500/10 rounded-full blur-[100px] group-hover:scale-110 transition-transform duration-1000 pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div className="flex items-center gap-5">
          <div className="p-4 bg-indigo-500/20 text-indigo-400 rounded-2xl border border-indigo-500/30 shadow-[0_0_15px_rgba(99,102,241,0.2)]">
            <Target className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-2xl font-black text-white tracking-tight">Rank Progression</h3>
            <p className="text-sm font-medium text-indigo-200/70 mt-1">Your journey to the next milestone</p>
          </div>
        </div>
        
        {!isMaxLevel && (
          <div className="flex items-center gap-2 bg-[#050505]/50 px-5 py-2.5 rounded-xl border border-amber-500/20 shadow-inner">
            <Zap className="w-5 h-5 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]" />
            <span className="text-lg font-black text-white">{pointsNeeded} XP</span>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">to {nextLevelName}</span>
          </div>
        )}
      </div>
      
      {isMaxLevel ? (
        <div className="relative overflow-hidden flex flex-col items-center justify-center p-10 bg-amber-500/10 rounded-[2rem] border border-amber-500/30 text-center shadow-[0_0_30px_rgba(251,191,36,0.1)]">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/20 to-transparent pointer-events-none" />
          <motion.div 
            animate={{ rotate: [0, 5, -5, 0] }} 
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <Star className="w-20 h-20 text-amber-400 mb-6 drop-shadow-[0_0_20px_rgba(251,191,36,0.8)]" />
          </motion.div>
          <h4 className="text-2xl font-black text-amber-400 tracking-tight mb-3">Max Rank Achieved</h4>
          <p className="text-base font-medium text-amber-200/70 max-w-lg mx-auto leading-relaxed">
            You are a Civic Champion! You have reached the highest tier on the platform. Your continued contributions inspire the entire community.
          </p>
        </div>
      ) : (
        <div className="relative z-10">
          <div className="flex justify-between items-end mb-6">
            <div>
              <div className="text-5xl font-black text-white flex items-baseline gap-1 drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]">
                {progressPercentage.toFixed(0)}<span className="text-2xl text-gray-500">%</span>
              </div>
              <div className="text-[10px] font-black uppercase tracking-widest text-indigo-300 mt-2">Completed</div>
            </div>
            
            <div className="flex flex-col items-end">
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Target Milestone</span>
              <div className="text-xl font-black text-white flex items-center gap-2">
                {nextLevelThreshold} <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Total XP</span>
              </div>
            </div>
          </div>
          
          <div className="w-full bg-[#050505] rounded-full h-6 mb-6 overflow-hidden shadow-inner relative p-1 border border-white/5">
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: `${progressPercentage}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
              className="bg-gradient-to-r from-indigo-600 via-purple-500 to-indigo-400 h-full rounded-full shadow-[0_0_15px_rgba(99,102,241,0.5)] relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 bottom-0 left-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%,transparent_100%)] bg-[length:20px_20px] animate-[shimmer_2s_linear_infinite]" />
              <div className="absolute top-0 right-0 bottom-0 w-10 bg-gradient-to-r from-transparent to-white/30" />
            </motion.div>
          </div>
          
          <div className="flex justify-between items-center text-sm font-black">
            <span className="text-gray-400">{profile.level}</span>
            <div className="flex items-center gap-2 text-indigo-400 drop-shadow-[0_0_8px_rgba(99,102,241,0.5)]">
              {nextLevelName} <ChevronRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
