import React from 'react';
import { Trophy, Home, PlusCircle } from 'lucide-react';
import Link from 'next/link';

export default function LeaderboardEmpty() {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center mt-8 bg-white/5 border border-white/10 backdrop-blur-md rounded-[2rem] shadow-inner relative overflow-hidden">
      {/* Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px] pointer-events-none" />

      <div className="relative z-10 w-24 h-24 bg-indigo-500/10 rounded-full flex items-center justify-center text-indigo-400 mb-8 border border-indigo-500/20 shadow-[0_0_30px_rgba(99,102,241,0.2)]">
        <Trophy className="w-10 h-10 drop-shadow-[0_0_10px_rgba(99,102,241,0.8)]" aria-hidden="true" />
      </div>
      
      <h3 className="relative z-10 text-2xl font-black text-white mb-3 tracking-tight">No rankings available yet</h3>
      
      <p className="relative z-10 text-base font-medium text-gray-400 max-w-sm mb-10 leading-relaxed">
        Be the first to climb the ranks! Start participating in the community by reporting or supporting issues to earn XP.
      </p>
      
      <div className="relative z-10 flex flex-col sm:flex-row gap-4">
        <Link 
          href="/feed"
          className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl transition-all border border-white/10 shadow-inner flex items-center justify-center"
        >
          Explore Feed
        </Link>
        <Link 
          href="/report"
          className="px-6 py-3 bg-indigo-500 hover:bg-indigo-600 text-white font-bold rounded-xl transition-all shadow-[0_0_15px_rgba(99,102,241,0.4)] flex items-center justify-center gap-2"
        >
          <PlusCircle className="w-4 h-4" aria-hidden="true" />
          Report Issue
        </Link>
        <Link 
          href="/"
          className="px-6 py-3 text-gray-400 hover:text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 hover:bg-white/5"
        >
          <Home className="w-4 h-4" aria-hidden="true" />
          Return Home
        </Link>
      </div>
    </div>
  );
}
