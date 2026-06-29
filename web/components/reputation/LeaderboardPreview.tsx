'use client';

import React, { useEffect, useState } from 'react';
import { Users, Crown, Medal, ArrowRight, Target, CheckCircle2 } from 'lucide-react';
import ReputationEmptyState from './ReputationEmptyState';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function LeaderboardPreview() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [leaders, setLeaders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLeaderboard() {
      try {
        const res = await fetch('/api/analytics');
        const data = await res.json();
        if (data.success && data.analytics?.topUsers) {
          setLeaders(data.analytics.topUsers.slice(0, 3));
        }
      } catch (err) {
        console.error('Error fetching leaderboard:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchLeaderboard();
  }, []);

  if (loading) {
    return (
      <div className="bg-[#050505]/60 backdrop-blur-3xl rounded-[2.5rem] p-8 shadow-[0_0_40px_rgba(0,0,0,0.5)] border border-white/5 h-full ring-1 ring-white/10 animate-pulse">
        <div className="h-6 w-48 bg-white/10 rounded mb-6"></div>
        <div className="space-y-4">
          {[1,2].map(i => <div key={i} className="h-16 bg-white/5 rounded-2xl"></div>)}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#050505]/60 backdrop-blur-3xl rounded-[2.5rem] p-8 shadow-[0_0_40px_rgba(0,0,0,0.5)] border border-rose-500/20 ring-1 ring-rose-500/10 h-full flex flex-col group overflow-hidden relative">
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[20rem] h-[20rem] bg-rose-500/10 blur-[80px] rounded-full pointer-events-none transition-transform duration-1000 group-hover:scale-110" />

      <div className="flex items-center gap-5 mb-8 relative z-10">
        <div className="p-4 bg-rose-500/20 text-rose-400 rounded-2xl border border-rose-500/30 shadow-[0_0_15px_rgba(244,63,94,0.2)]">
          <Target className="w-8 h-8 drop-shadow-[0_0_8px_rgba(244,63,94,0.8)]" />
        </div>
        <div>
          <h3 className="text-2xl font-black text-white tracking-tight">Next Goals</h3>
          <p className="text-sm font-medium text-rose-200/70 mt-1">Actions to increase your civic impact</p>
        </div>
      </div>
      
      <div className="mb-10 space-y-4 relative z-10">
        <motion.div whileHover={{ scale: 1.02 }} className="flex items-start gap-4 p-5 rounded-2xl border border-white/5 bg-[#0a0f1c]/80 shadow-inner group/item hover:border-white/20 transition-all">
          <CheckCircle2 className="w-6 h-6 text-gray-500 group-hover/item:text-rose-400 transition-colors mt-0.5 shrink-0" />
          <div>
            <h4 className="text-base font-black text-white tracking-tight">Report 5 verified issues</h4>
            <p className="text-[11px] font-black uppercase tracking-widest text-gray-500 mt-1">Unlock the Active Citizen badge</p>
          </div>
        </motion.div>
        <motion.div whileHover={{ scale: 1.02 }} className="flex items-start gap-4 p-5 rounded-2xl border border-white/5 bg-[#0a0f1c]/80 shadow-inner group/item hover:border-white/20 transition-all">
          <CheckCircle2 className="w-6 h-6 text-gray-500 group-hover/item:text-rose-400 transition-colors mt-0.5 shrink-0" />
          <div>
            <h4 className="text-base font-black text-white tracking-tight">Support 10 community requests</h4>
            <p className="text-[11px] font-black uppercase tracking-widest text-gray-500 mt-1">Increase your community trust score</p>
          </div>
        </motion.div>
      </div>

      <div className="flex items-center justify-between mb-5 mt-auto relative z-10">
        <div className="flex items-center gap-3">
          <Users className="w-5 h-5 text-indigo-400 drop-shadow-[0_0_8px_rgba(99,102,241,0.8)]" />
          <h4 className="text-[11px] font-black uppercase tracking-widest text-white">Top Citizens</h4>
        </div>
      </div>
      
      {leaders.length === 0 ? (
        <ReputationEmptyState 
          icon={<Users className="w-8 h-8" />}
          title="Leaderboard Unavailable"
          description=""
        />
      ) : (
        <div className="space-y-3 mb-8 relative z-10">
          {leaders.map((user, idx) => {
            let RankIcon = null;
            let rankColor = 'text-gray-500 bg-white/5 border border-white/10';
            
            if (idx === 0) { RankIcon = Crown; rankColor = 'text-amber-400 bg-amber-500/20 border border-amber-500/30 shadow-[0_0_10px_rgba(251,191,36,0.2)]'; }
            else if (idx === 1) { RankIcon = Medal; rankColor = 'text-gray-300 bg-gray-500/20 border border-gray-500/30'; }
            else if (idx === 2) { RankIcon = Medal; rankColor = 'text-orange-400 bg-orange-500/20 border border-orange-500/30'; }

            return (
              <div key={user.userId} className="flex items-center justify-between p-4 rounded-xl bg-[#0a0f1c]/80 border border-white/5 shadow-inner">
                <div className="flex items-center gap-4">
                  <div className={`w-8 h-8 rounded-[0.75rem] flex items-center justify-center font-black text-xs ${rankColor}`}>
                    {RankIcon ? <RankIcon className="w-4 h-4 drop-shadow-[0_0_8px_currentColor]" /> : `#${idx + 1}`}
                  </div>
                  <h4 className="text-sm font-black text-white truncate max-w-[120px] tracking-tight">
                    {user.fullName || 'Civic Member'}
                  </h4>
                </div>
                <div className="text-[11px] font-black uppercase tracking-widest text-indigo-300 bg-indigo-500/20 px-3 py-1.5 rounded-lg border border-indigo-500/30">
                  {user.reputationPoints} pts
                </div>
              </div>
            );
          })}
        </div>
      )}

      <Link 
        href="/leaderboard"
        className="w-full relative z-10 flex items-center justify-center gap-2 py-4 px-4 bg-white/5 hover:bg-white/10 rounded-xl text-[11px] font-black uppercase tracking-widest text-white transition-all border border-white/10 hover:border-white/20 shadow-inner group/btn"
      >
        View Full Leaderboard
        <ArrowRight className="w-4 h-4 text-gray-400 group-hover/btn:translate-x-1 transition-transform group-hover/btn:text-white" />
      </Link>
    </div>
  );
}
