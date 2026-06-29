'use client';

import React, { useEffect, useState } from 'react';
import { User, Award, ShieldAlert, Sparkles, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '@/design-system/motion/variants';
import { ReputationProfile } from '@/types/reputation';

interface DashboardHeroProps {
  userName: string;
  profile: ReputationProfile | null;
}

export default function DashboardHero({ userName, profile }: DashboardHeroProps) {
  const [greeting, setGreeting] = useState('Welcome back');
  
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 18) setGreeting('Good afternoon');
    else setGreeting('Good evening');
  }, []);

  return (
    <div className="relative mb-6 w-full rounded-[2rem] overflow-hidden bg-[#0a0f1c]/40 backdrop-blur-3xl border border-white/5 shadow-[0_20px_40px_rgba(0,0,0,0.4)] ring-1 ring-white/5 group h-[160px] md:h-[180px] flex items-center">
      {/* Neural Lighting Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-50 mix-blend-screen">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-20 -right-20 w-[400px] h-[400px] bg-indigo-500/20 blur-[100px] rounded-full" 
        />
        <motion.div 
          animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute -bottom-20 -left-20 w-[500px] h-[500px] bg-purple-500/20 blur-[120px] rounded-full" 
        />
      </div>

      <div className="relative w-full px-6 md:px-8 flex items-center gap-6 z-10">
        {/* Avatar Area */}
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
          className="relative shrink-0"
        >
          {/* Glowing Ring */}
          <div className="absolute -inset-1 bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 rounded-[1.4rem] blur-[10px] opacity-60 group-hover:opacity-100 transition-opacity duration-700 animate-pulse" style={{ animationDuration: '4s' }} />
          
          <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-[1.25rem] bg-[#050505] flex items-center justify-center border border-white/20 group-hover:border-indigo-400 transition-colors duration-500 shadow-inner z-10">
            <User className="w-8 h-8 md:w-10 md:h-10 text-indigo-400 group-hover:text-indigo-300 transition-colors" />
          </div>
          
          <div className="absolute -bottom-2 -right-2 bg-[#050505] p-1.5 md:p-2 rounded-xl border border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.5)] z-20" title="Verified Citizen">
            <ShieldAlert className="w-3.5 h-3.5 md:w-4 md:h-4 text-emerald-400" />
          </div>
        </motion.div>

        {/* Text & Badges */}
        <motion.div 
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="flex-1"
        >
          <motion.p variants={fadeUp} className="text-[10px] font-bold text-gray-400 mb-1 uppercase tracking-[0.2em]">
            {greeting}
          </motion.p>
          <motion.h1 variants={fadeUp} className="text-2xl md:text-4xl font-extrabold text-white mb-3 tracking-tight leading-none">
            {userName}
          </motion.h1>
          
          <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-3">
            {profile && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-500/10 text-indigo-300 font-bold text-[10px] uppercase tracking-wider border border-indigo-500/20 shadow-inner">
                <Star className="w-3.5 h-3.5 text-indigo-400 fill-indigo-400/50" />
                Level {profile.level}
              </div>
            )}
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-300 font-bold text-[10px] uppercase tracking-wider border border-emerald-500/20 shadow-inner">
              <Award className="w-3.5 h-3.5" />
              Top 10%
            </div>
            <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/10 text-amber-300 font-bold text-[10px] uppercase tracking-wider border border-amber-500/20 shadow-inner">
              <Sparkles className="w-3.5 h-3.5" />
              3 Day Streak
            </div>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Animated bottom border glow */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
    </div>
  );
}
