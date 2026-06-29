import React from 'react';
import { Sparkles, TrendingUp, Target, Award, Activity, MessageSquare, ChevronRight, CheckCircle2, Zap } from 'lucide-react';
import { LeaderboardUser } from './LeaderboardTable';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface LeaderboardCoachProps {
  users: LeaderboardUser[];
  currentUserId: string | null;
}

export default function LeaderboardCoach({ users, currentUserId }: LeaderboardCoachProps) {
  if (!currentUserId || users.length === 0) return null;

  const currentUser = users.find(u => u.id === currentUserId);
  
  if (!currentUser) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-white/5 border border-white/10 backdrop-blur-3xl rounded-[2rem] p-6 mb-8 shadow-inner flex flex-col sm:flex-row items-center justify-between"
      >
        <div className="flex items-center gap-4">
          <div className="bg-indigo-500/20 text-indigo-400 p-4 rounded-2xl shrink-0 border border-indigo-500/30 shadow-[0_0_15px_rgba(99,102,241,0.2)]">
            <Target className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-black text-white tracking-tight">Join the Leaderboard</h3>
            <p className="text-sm font-medium text-gray-400 mt-1">Start reporting issues or verifying reports to earn XP.</p>
          </div>
        </div>
        <Link href="/report" className="mt-4 sm:mt-0 px-6 py-3 bg-indigo-500 hover:bg-indigo-600 text-white font-bold rounded-xl transition-all shadow-[0_0_15px_rgba(99,102,241,0.4)] hover:scale-105">
          Start Earning XP
        </Link>
      </motion.div>
    );
  }

  // Calculate insights based on existing data
  const rank = currentUser.rank;
  const rep = currentUser.reputation;
  
  // Find the person immediately above them
  const targetUser = users.find(u => u.rank === rank - 1);
  const repToNextRank = targetUser ? targetUser.reputation - rep + 1 : 0;
  
  let insightTitle = "Community Participant";
  let insightDesc = "Your consistent efforts are helping build a better neighborhood.";
  let InsightIcon = CheckCircle2;
  let iconColor = "text-emerald-400 bg-emerald-500/20 border-emerald-500/30 drop-shadow-[0_0_10px_rgba(52,211,153,0.5)]";

  // Pseudo-logic to determine their best trait based on their stats
  if (rank === 1) {
    insightTitle = "Civic Champion";
    insightDesc = "You are currently the #1 contributor in the community!";
    InsightIcon = Award;
    iconColor = "text-amber-400 bg-amber-500/20 border-amber-500/30 drop-shadow-[0_0_10px_rgba(251,191,36,0.5)]";
  } else if (currentUser.reports > currentUser.supports * 2) {
    insightTitle = "Top Reporter";
    insightDesc = "You're excellent at spotting and documenting new issues.";
    InsightIcon = Target;
    iconColor = "text-indigo-400 bg-indigo-500/20 border-indigo-500/30 drop-shadow-[0_0_10px_rgba(99,102,241,0.5)]";
  } else if (currentUser.comments > 10) {
    insightTitle = "Helpful Neighbor";
    insightDesc = "Your comments are driving important community discussions.";
    InsightIcon = MessageSquare;
    iconColor = "text-purple-400 bg-purple-500/20 border-purple-500/30 drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]";
  } else {
    insightTitle = "Rising Star";
    insightDesc = "You're on the move! Keep engaging to unlock new badges.";
    InsightIcon = TrendingUp;
    iconColor = "text-orange-400 bg-orange-500/20 border-orange-500/30 drop-shadow-[0_0_10px_rgba(249,115,22,0.5)]";
  }

  const progressPercent = targetUser 
    ? Math.min(100, Math.max(5, (rep / targetUser.reputation) * 100))
    : 100;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
      className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
    >
      {/* Personal Snapshot */}
      <div className="md:col-span-2 bg-white/5 border border-white/10 backdrop-blur-3xl rounded-[2rem] p-6 sm:p-8 shadow-[0_0_40px_rgba(0,0,0,0.5)] relative overflow-hidden group ring-1 ring-white/5">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-[80px] -mt-20 -mr-20 transition-transform group-hover:scale-110 duration-700 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/10 rounded-full blur-[80px] -mb-20 -ml-20 transition-transform group-hover:scale-110 duration-700 pointer-events-none" />
        
        <div className="relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <h2 className="text-xl font-black text-white flex items-center gap-3 tracking-tight">
              Your Performance
              <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 shadow-[0_0_10px_rgba(99,102,241,0.2)] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse"></span>
                Live Sync
              </span>
            </h2>
            <div className="flex items-center gap-3 text-sm font-black text-white bg-white/5 px-4 py-2 rounded-xl border border-white/10 shadow-inner">
              Global Rank <span className="text-indigo-400 text-xl drop-shadow-[0_0_10px_rgba(99,102,241,0.5)]">#{rank}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            <div className="bg-[#050505]/50 border border-white/10 rounded-2xl p-4 backdrop-blur-md">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Total XP</p>
              <p className="text-2xl font-black text-white tracking-tight">{rep.toLocaleString()}</p>
            </div>
            <div className="bg-[#050505]/50 border border-white/10 rounded-2xl p-4 backdrop-blur-md">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Badges</p>
              <p className="text-2xl font-black text-amber-400 tracking-tight">{currentUser.badges}</p>
            </div>
            <div className="bg-[#050505]/50 border border-white/10 rounded-2xl p-4 backdrop-blur-md">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Reports</p>
              <p className="text-2xl font-black text-emerald-400 tracking-tight">{currentUser.reports}</p>
            </div>
            <div className="bg-[#050505]/50 border border-white/10 rounded-2xl p-4 backdrop-blur-md">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Supports</p>
              <p className="text-2xl font-black text-purple-400 tracking-tight">{currentUser.supports}</p>
            </div>
          </div>

          {rank > 1 && targetUser ? (
            <div className="bg-[#0a0f1c]/80 rounded-2xl p-6 border border-indigo-500/20 ring-1 ring-indigo-500/10 relative overflow-hidden">
              <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-indigo-500/10 to-transparent pointer-events-none" />
              <div className="flex items-end justify-between mb-4 relative z-10">
                <div>
                  <p className="text-[10px] font-black text-indigo-300 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5" /> Next Milestone
                  </p>
                  <p className="text-base font-bold text-white tracking-tight">
                    Overtake {targetUser.name} <span className="text-gray-500 font-medium text-sm ml-1">(Rank #{rank - 1})</span>
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xl font-black text-indigo-400 drop-shadow-[0_0_10px_rgba(99,102,241,0.5)]">{repToNextRank} XP</span>
                  <span className="text-[10px] font-black uppercase tracking-widest text-indigo-300 ml-1.5">needed</span>
                </div>
              </div>
              <div className="h-3 w-full bg-[#050505] rounded-full overflow-hidden border border-white/5 relative z-10 shadow-inner">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                  className="h-full bg-gradient-to-r from-indigo-600 via-purple-500 to-indigo-400 rounded-full relative"
                >
                  <div className="absolute top-0 right-0 bottom-0 w-10 bg-gradient-to-r from-transparent to-white/30" />
                </motion.div>
              </div>
            </div>
          ) : (
            <div className="bg-amber-500/10 rounded-2xl p-6 border border-amber-500/30 flex items-center gap-4 relative overflow-hidden">
              <div className="absolute right-0 top-0 h-full w-full bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] from-amber-500/10 to-transparent pointer-events-none" />
              <Award className="w-10 h-10 text-amber-400 shrink-0 drop-shadow-[0_0_15px_rgba(251,191,36,0.5)] relative z-10" />
              <div className="relative z-10">
                <p className="text-lg font-black text-amber-400 tracking-tight">You are the #1 Citizen!</p>
                <p className="text-sm font-medium text-amber-200/70 mt-1">Keep up the amazing work leading the community.</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* AI Recognition Insights */}
      <div className="bg-[#0a0f1c]/60 border border-purple-500/20 rounded-[2rem] p-6 sm:p-8 shadow-[0_0_40px_rgba(168,85,247,0.15)] flex flex-col justify-between group relative overflow-hidden backdrop-blur-3xl ring-1 ring-purple-500/10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-500/10 to-transparent pointer-events-none transition-opacity duration-500 group-hover:opacity-100 opacity-50" />
        
        <div className="relative z-10">
          <div className="flex items-center gap-2.5 mb-8">
            <Sparkles className="w-5 h-5 text-purple-400 drop-shadow-[0_0_10px_rgba(168,85,247,0.8)]" />
            <h2 className="text-[11px] font-black text-purple-300 uppercase tracking-widest">AI Insights</h2>
          </div>
          
          <div className="flex flex-col items-center text-center mt-4">
            <div className={`p-4 rounded-[1.25rem] border ${iconColor} mb-5 shrink-0 transition-transform group-hover:scale-110 group-hover:rotate-3 duration-500`}>
              <InsightIcon className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-black text-white tracking-tight mb-2">{insightTitle}</h3>
            <p className="text-sm text-purple-200/70 leading-relaxed font-medium">
              {insightDesc}
            </p>
          </div>
        </div>
        
        <Link href="/reputation" className="relative z-10 w-full mt-8 flex items-center justify-center gap-2 py-3.5 px-4 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 rounded-xl text-sm font-bold text-purple-300 transition-all hover:shadow-[0_0_20px_rgba(168,85,247,0.2)]">
          View Reputation Hub
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </motion.div>
  );
}
