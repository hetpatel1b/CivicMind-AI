import React from 'react';
import { Trophy, Info, RefreshCw, Calendar, Sparkles, Users, FileText, CheckCircle2 } from 'lucide-react';
import { Button } from '@/design-system/components/Button';
import { motion } from 'framer-motion';

interface LeaderboardHeaderProps {
  onRefresh?: () => void;
  isRefreshing?: boolean;
}

export default function LeaderboardHeader({ onRefresh, isRefreshing }: LeaderboardHeaderProps) {
  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative flex flex-col justify-between gap-8 mb-12 overflow-hidden rounded-[2.5rem] p-8 sm:p-12 shadow-[0_0_50px_rgba(0,0,0,0.6)] text-white border border-white/10 ring-1 ring-white/5 bg-[#0a0f1c]/80 backdrop-blur-3xl"
    >
      {/* Background animated gradients */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden rounded-[2.5rem]">
        <div className="absolute -top-1/2 -left-1/4 w-[150%] h-[150%] bg-[conic-gradient(from_90deg_at_50%_50%,#00000000_50%,#4f46e540_100%)] animate-[spin_10s_linear_infinite] mix-blend-screen opacity-30" />
        <div className="absolute top-0 right-0 -mt-32 -mr-32 w-[30rem] h-[30rem] bg-indigo-500/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 -mb-32 -ml-32 w-[30rem] h-[30rem] bg-purple-500/20 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="flex-1 max-w-3xl">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/5 backdrop-blur-md border border-white/10 rounded-full text-xs font-black uppercase tracking-widest text-indigo-300 shadow-inner">
              <Calendar className="w-3.5 h-3.5 text-indigo-400" />
              Season 4: Summer
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-amber-500/20 to-orange-500/20 backdrop-blur-md border border-amber-500/30 rounded-full text-xs font-black uppercase tracking-widest text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              14 Days Remaining
            </div>
          </div>

          <div className="flex items-center gap-5 mb-4">
            <div className="p-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-inner relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
              <Trophy className="w-10 h-10 text-amber-400 drop-shadow-[0_0_10px_rgba(251,191,36,0.5)] relative z-10" aria-hidden="true" />
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-100 to-purple-200 tracking-tight leading-tight">
              Global Rankings
            </h1>
          </div>
          
          <p className="text-indigo-200/80 text-base sm:text-lg leading-relaxed max-w-2xl font-medium">
            Climb the ranks by contributing to your city. Earn reputation, unlock exclusive badges, and become a community champion.
          </p>
        </div>
        
        <div className="relative z-10 flex flex-wrap items-center gap-3 shrink-0">
          <Button 
            variant="outline" 
            className="gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 border-white/10 text-white shadow-inner backdrop-blur-md rounded-xl transition-all font-bold"
          >
            <Info className="w-4 h-4 text-indigo-300" aria-hidden="true" />
            How it works
          </Button>
          
          {onRefresh && (
            <Button 
              variant="outline"
              onClick={onRefresh}
              disabled={isRefreshing}
              className="w-11 h-11 p-0 flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 border-indigo-400/50 text-white rounded-xl backdrop-blur-md transition-all shadow-[0_0_15px_rgba(99,102,241,0.4)] disabled:opacity-50"
              aria-label="Refresh leaderboard"
            >
              <RefreshCw className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`} aria-hidden="true" />
            </Button>
          )}
        </div>
      </div>

      {/* Recognition Statistics Grid */}
      <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-white/10">
        <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/5 flex flex-col">
          <div className="flex items-center gap-2 mb-2 text-indigo-300/80">
            <Users className="w-4 h-4" />
            <span className="text-[10px] font-black uppercase tracking-widest">Active Citizens</span>
          </div>
          <span className="text-2xl font-black text-white tracking-tight">12,450</span>
        </div>
        
        <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/5 flex flex-col">
          <div className="flex items-center gap-2 mb-2 text-indigo-300/80">
            <Trophy className="w-4 h-4" />
            <span className="text-[10px] font-black uppercase tracking-widest">Top Contributors</span>
          </div>
          <span className="text-2xl font-black text-white tracking-tight">Top 5%</span>
        </div>

        <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/5 flex flex-col">
          <div className="flex items-center gap-2 mb-2 text-indigo-300/80">
            <FileText className="w-4 h-4" />
            <span className="text-[10px] font-black uppercase tracking-widest">Reports This Week</span>
          </div>
          <span className="text-2xl font-black text-white tracking-tight">3,492</span>
        </div>

        <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/5 flex flex-col">
          <div className="flex items-center gap-2 mb-2 text-indigo-300/80">
            <CheckCircle2 className="w-4 h-4" />
            <span className="text-[10px] font-black uppercase tracking-widest">Verified Fixes</span>
          </div>
          <span className="text-2xl font-black text-emerald-400 tracking-tight">847</span>
        </div>
      </div>
    </motion.header>
  );
}
