import React from 'react';
import Link from 'next/link';
import { AlertTriangle, ArrowLeft } from 'lucide-react';

export default function IssueNotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center bg-[#050505] relative overflow-hidden">
      <div className="absolute inset-0 z-0 bg-[url('/noise.png')] opacity-[0.03] pointer-events-none mix-blend-overlay" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-rose-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center bg-[#0a0f1c]/50 backdrop-blur-3xl p-12 rounded-[3rem] border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.8)]">
        <div className="w-24 h-24 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-full flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(244,63,94,0.2)]">
          <AlertTriangle className="w-12 h-12 drop-shadow-[0_0_10px_rgba(244,63,94,0.8)]" />
        </div>
        <h2 className="text-4xl font-black text-white mb-4 tracking-tight">
          Record Not Found
        </h2>
        <p className="text-gray-400 max-w-md mb-10 text-lg font-medium leading-relaxed">
          The civic intelligence record you are looking for does not exist in the active registry, has been removed, or the URL is invalid.
        </p>
        <Link 
          href="/feed"
          className="flex items-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-2xl transition-all shadow-sm ring-1 ring-white/20 hover:scale-105 backdrop-blur-md"
        >
          <ArrowLeft className="w-5 h-5" />
          Return to Community Feed
        </Link>
      </div>
    </div>
  );
}
