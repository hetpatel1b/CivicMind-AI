import React from 'react';
import { Trophy, ShieldCheck, Star, Activity, Sparkles, TrendingUp, Zap } from 'lucide-react';
import { ReputationProfile, ReputationSummary } from '@/types/reputation';
import { motion } from 'framer-motion';

interface ReputationOverviewProps {
  profile: ReputationProfile;
  summary: ReputationSummary;
}

export default function ReputationOverview({ profile, summary }: ReputationOverviewProps) {
  // Derive Trust Score (mock pseudo-logic based on points and reports to simulate reality)
  const trustScore = Math.min(99, Math.max(75, 80 + Math.floor(profile.totalPoints / 50)));
  const isVerified = profile.totalPoints >= 100;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative overflow-hidden rounded-[2.5rem] bg-[#0a0f1c]/80 backdrop-blur-3xl p-8 sm:p-12 shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-indigo-500/20 ring-1 ring-indigo-500/10 group"
    >
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 right-0 -mr-32 -mt-32 w-[35rem] h-[35rem] bg-indigo-500/20 blur-[120px] rounded-full pointer-events-none transition-transform duration-1000 group-hover:scale-110" />
      <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-[30rem] h-[30rem] bg-purple-500/15 blur-[100px] rounded-full pointer-events-none transition-transform duration-1000 group-hover:scale-110" />
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none">
        <Trophy className="w-[40rem] h-[40rem] text-white" />
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-12">
        
        {/* Left Content - Level and Points */}
        <div className="flex-1 flex flex-col md:flex-row items-start md:items-center gap-8">
          <div className="relative shrink-0">
            <div className="w-32 h-32 sm:w-40 sm:h-40 bg-[#050505]/50 backdrop-blur-xl rounded-[2rem] flex items-center justify-center border border-amber-500/30 shadow-[0_0_40px_rgba(251,191,36,0.15)] ring-1 ring-amber-500/20 transform transition-transform duration-700 group-hover:rotate-6">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/20 to-transparent opacity-50 rounded-[2rem]"></div>
              <Trophy className="w-16 h-16 sm:w-20 sm:h-20 text-amber-400 drop-shadow-[0_0_15px_rgba(251,191,36,0.8)] relative z-10" />
            </div>
            {isVerified && (
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.5 }}
                className="absolute -bottom-3 -right-3 bg-[#0a0f1c] rounded-2xl p-2.5 border border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.3)] ring-1 ring-emerald-500/20"
                title="Verified Citizen"
              >
                <ShieldCheck className="w-7 h-7 text-emerald-400 drop-shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
              </motion.div>
            )}
          </div>
          
          <div className="flex flex-col">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="px-3 py-1.5 bg-indigo-500/20 backdrop-blur-md rounded-xl text-[10px] font-black uppercase tracking-widest text-indigo-300 border border-indigo-500/30 shadow-[0_0_10px_rgba(99,102,241,0.2)]">
                Civic Identity
              </span>
              {isVerified && (
                <span className="px-3 py-1.5 bg-emerald-500/20 backdrop-blur-md rounded-xl text-[10px] font-black uppercase tracking-widest text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5 shadow-[0_0_10px_rgba(16,185,129,0.2)]">
                  <Sparkles className="w-3.5 h-3.5" /> Trusted Citizen
                </span>
              )}
            </div>
            <h2 className="text-4xl sm:text-6xl font-black mb-4 text-white tracking-tight drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
              {profile.level}
            </h2>
            <div className="flex items-end gap-3 bg-[#050505]/50 border border-white/10 rounded-2xl p-4 backdrop-blur-md self-start">
              <div className="flex items-center gap-2">
                <Zap className="w-8 h-8 text-amber-400 drop-shadow-[0_0_10px_rgba(251,191,36,0.5)]" />
                <span className="text-4xl font-black tabular-nums text-white tracking-tight">{profile.totalPoints.toLocaleString()}</span>
              </div>
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Total XP</span>
            </div>
          </div>
        </div>
        
        {/* Right Content - Trust Score & Summary */}
        <div className="w-full lg:w-auto bg-[#050505]/60 backdrop-blur-xl rounded-[2rem] p-8 border border-white/10 shadow-inner flex flex-col gap-8 shrink-0 min-w-[320px] ring-1 ring-white/5">
          <div className="flex items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-amber-500/20 rounded-[1rem] border border-amber-500/30 shadow-[0_0_15px_rgba(251,191,36,0.2)]">
                <Star className="w-8 h-8 text-amber-400 drop-shadow-[0_0_10px_rgba(251,191,36,0.8)]" />
              </div>
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Trust Score</p>
                <div className="flex items-baseline gap-1">
                  <p className="text-3xl font-black text-white tracking-tight">{trustScore}</p>
                  <span className="text-xl font-bold text-gray-500">%</span>
                </div>
              </div>
            </div>
            <div className="text-right bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-3">
              <TrendingUp className="w-5 h-5 text-emerald-400 mb-1 ml-auto drop-shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
              <p className="text-[10px] font-black text-emerald-300 uppercase tracking-widest">Top 5%</p>
            </div>
          </div>
          
          <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/5 rounded-xl p-4 border border-white/5">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Reports</p>
              <p className="text-xl font-black text-white flex items-center gap-2">
                <Activity className="w-4 h-4 text-indigo-400 drop-shadow-[0_0_10px_rgba(99,102,241,0.8)]" /> {summary.totalReports}
              </p>
            </div>
            <div className="bg-white/5 rounded-xl p-4 border border-white/5">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Impact</p>
              <p className="text-xl font-black text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 drop-shadow-[0_0_10px_rgba(16,185,129,0.8)]" /> {summary.totalSupports + summary.totalComments}
              </p>
            </div>
          </div>
        </div>
        
      </div>
    </motion.div>
  );
}
