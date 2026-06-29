import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface LeaderboardErrorProps {
  message?: string;
  onRetry: () => void;
}

export default function LeaderboardError({ message = 'Failed to load leaderboard data', onRetry }: LeaderboardErrorProps) {
  return (
    <div role="alert" className="flex flex-col items-center justify-center py-20 px-4 mt-8 bg-[#0a0f1c]/80 border border-red-500/20 backdrop-blur-md rounded-[2rem] shadow-[0_0_40px_rgba(239,68,68,0.1)] relative overflow-hidden text-center">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-red-500/10 rounded-full blur-[80px] pointer-events-none" />

      <div className="relative z-10 w-24 h-24 bg-red-500/10 rounded-full flex items-center justify-center text-red-400 mb-8 border border-red-500/20 shadow-[0_0_30px_rgba(239,68,68,0.2)]">
        <AlertTriangle className="w-10 h-10 drop-shadow-[0_0_10px_rgba(239,68,68,0.8)]" aria-hidden="true" />
      </div>

      <h3 className="relative z-10 text-2xl font-black text-white mb-3 tracking-tight">System Glitch</h3>
      
      <p className="relative z-10 text-base font-medium text-red-200/70 max-w-sm mb-10 leading-relaxed">
        {message}. We&apos;re working on restoring the civic network connection.
      </p>
      
      <button
        onClick={onRetry}
        className="relative z-10 inline-flex items-center gap-2 px-6 py-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 rounded-xl text-sm font-bold transition-all shadow-[0_0_15px_rgba(239,68,68,0.1)] hover:shadow-[0_0_20px_rgba(239,68,68,0.3)]"
      >
        <RefreshCw className="w-4 h-4" aria-hidden="true" />
        Retry Connection
      </button>
    </div>
  );
}
