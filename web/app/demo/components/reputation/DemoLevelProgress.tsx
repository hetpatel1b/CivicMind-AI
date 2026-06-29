'use client';

import React from 'react';
import { Target, Star, Zap, Trophy, Shield, Award, Crown } from 'lucide-react';
import { motion } from 'framer-motion';
import { fadeUp } from '@/design-system/motion/variants';

export default function DemoLevelProgress({ profile }: { profile: { totalPoints?: number, rank?: string, [key: string]: unknown } }) {
  const currentPoints = typeof profile.totalPoints === 'number' ? profile.totalPoints : 0;
  
  // Timeline nodes
  const milestones = [
    { name: 'Citizen', threshold: 0, icon: Shield },
    { name: 'Active Citizen', threshold: 50, icon: Target },
    { name: 'Community Leader', threshold: 150, icon: Award },
    { name: 'Civic Champion', threshold: 300, icon: Trophy },
    { name: 'Local Hero', threshold: 600, icon: Crown },
  ];

  const currentLevelIndex = milestones.findIndex((m, i) => {
    const next = milestones[i + 1];
    return currentPoints >= m.threshold && (!next || currentPoints < next.threshold);
  });
  
  const currentLevel = milestones[currentLevelIndex !== -1 ? currentLevelIndex : 0];
  const nextLevel = milestones[currentLevelIndex + 1];
  
  const progressPercentage = nextLevel 
    ? ((currentPoints - currentLevel.threshold) / (nextLevel.threshold - currentLevel.threshold)) * 100 
    : 100;

  const circumference = 2 * Math.PI * 120;
  const strokeDashoffset = circumference - (progressPercentage / 100) * circumference;

  return (
    <motion.div 
      variants={fadeUp}
      className="bg-[#0a0f1c]/80 backdrop-blur-3xl rounded-[2.5rem] border border-white/10 ring-1 ring-white/5 relative overflow-hidden group shadow-2xl"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-purple-500/5 group-hover:from-indigo-500/10 group-hover:to-purple-500/10 transition-colors duration-1000 z-0 pointer-events-none" />
      
      <div className="flex flex-col lg:flex-row gap-12 p-8 lg:p-12 relative z-10">
        
        {/* Left Side: Circular Progress */}
        <div className="flex flex-col items-center justify-center shrink-0">
          <div className="relative w-[300px] h-[300px] flex items-center justify-center">
            {/* Background Ring */}
            <svg className="w-full h-full transform -rotate-90 absolute inset-0" viewBox="0 0 260 260">
              <circle 
                cx="130" cy="130" r="120" 
                className="stroke-[#050505] fill-none border border-white/5 shadow-inner" 
                strokeWidth="12"
              />
              <circle 
                cx="130" cy="130" r="120" 
                className="stroke-indigo-500/10 fill-none" 
                strokeWidth="12"
              />
              {/* Progress Ring */}
              <motion.circle 
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                cx="130" cy="130" r="120" 
                className="stroke-[url(#gradient)] fill-none drop-shadow-[0_0_15px_rgba(99,102,241,0.5)]" 
                strokeWidth="12"
                strokeDasharray={circumference}
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#818cf8" />
                  <stop offset="50%" stopColor="#c084fc" />
                  <stop offset="100%" stopColor="#818cf8" />
                </linearGradient>
              </defs>
            </svg>
            
            {/* Center Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-[10px] font-black uppercase tracking-widest text-indigo-300 mb-1">Current XP</div>
              <div className="text-5xl font-black text-white tracking-tighter drop-shadow-lg">{currentPoints}</div>
              {nextLevel ? (
                <div className="text-xs font-bold text-gray-400 mt-2 bg-black/50 px-3 py-1 rounded-full border border-white/5">
                  / {nextLevel.threshold} XP
                </div>
              ) : (
                <div className="text-xs font-bold text-amber-400 mt-2 flex items-center gap-1 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                  <Star className="w-3 h-3" /> Max Rank
                </div>
              )}
            </div>
            
            {/* Hover floating element */}
            <div className="absolute -right-4 -bottom-4 p-4 rounded-2xl bg-[#050505] border border-white/10 ring-1 ring-white/5 shadow-2xl flex items-center gap-3 transform group-hover:scale-105 transition-transform duration-500">
              <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] font-black uppercase tracking-widest text-gray-500">Earn Rate</div>
                <div className="text-white font-bold">+12 XP / wk</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Timeline and Details */}
        <div className="flex-1 flex flex-col justify-center">
          <div className="mb-8">
            <h2 className="text-3xl font-black text-white tracking-tight mb-2">Journey to {nextLevel?.name || 'Legend'}</h2>
            <p className="text-gray-400 font-medium leading-relaxed max-w-xl">
              Next Rank: <strong>{(profile as { rank?: string }).rank === 'Bronze' ? 'Silver' : (profile as { rank?: string }).rank === 'Silver' ? 'Gold' : 'Diamond'}</strong>. 
              Keep contributing to unlock exclusive civic privileges and direct channels to city officials. Your voice matters!
            </p>
          </div>

          {/* Gamified Timeline */}
          <div className="relative mt-8 mb-6">
            <div className="absolute top-1/2 left-0 right-0 h-1.5 bg-[#050505] rounded-full -translate-y-1/2 border border-white/5" />
            
            {/* Timeline Fill */}
            <div className="absolute top-1/2 left-0 h-1.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full -translate-y-1/2 shadow-[0_0_15px_rgba(99,102,241,0.5)]" style={{ width: `${(currentLevelIndex / (milestones.length - 1)) * 100}%` }} />

            <div className="relative flex justify-between">
              {milestones.map((milestone, idx) => {
                const isPassed = idx <= currentLevelIndex;
                const isCurrent = idx === currentLevelIndex;
                const MilestoneIcon = milestone.icon;
                
                return (
                  <div key={idx} className="flex flex-col items-center relative group/node cursor-default">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center border-2 transition-all duration-300 z-10 ${isCurrent ? 'bg-indigo-500 border-indigo-400 shadow-[0_0_20px_rgba(99,102,241,0.6)] scale-110' : isPassed ? 'bg-[#0a0f1c] border-indigo-500 text-indigo-400' : 'bg-[#050505] border-white/10 text-gray-600'}`}>
                      <MilestoneIcon className={`w-4 h-4 ${isCurrent ? 'text-white' : ''}`} />
                    </div>
                    
                    {/* Tooltip */}
                    <div className="absolute -bottom-10 opacity-0 group-hover/node:opacity-100 transition-opacity whitespace-nowrap z-20 pointer-events-none">
                      <div className="bg-[#050505] border border-white/10 px-3 py-1.5 rounded-lg shadow-xl text-center">
                        <div className="text-[10px] font-black text-white uppercase tracking-widest">{milestone.name}</div>
                        <div className="text-[9px] font-bold text-indigo-400">{milestone.threshold} XP</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          <div className="flex justify-between items-center text-xs font-bold text-gray-500 mt-2 px-2">
            <span>Newcomer</span>
            <span>Civic Elite</span>
          </div>

        </div>
      </div>
    </motion.div>
  );
}
