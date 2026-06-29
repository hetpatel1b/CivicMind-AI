import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Sparkles, PlusCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ReputationHeader() {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 relative z-10">
      <div>
        <Link 
          href="/profile" 
          className="inline-flex items-center gap-2 text-[11px] font-black text-indigo-400 hover:text-indigo-300 uppercase tracking-widest transition-colors mb-4 group"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
          Back to Profile
        </Link>
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-purple-500/20 rounded-xl border border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
            <Sparkles className="w-5 h-5 text-purple-400" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
            Reputation Hub
          </h1>
        </div>
        <p className="text-sm font-medium text-gray-400 max-w-xl leading-relaxed">
          Track your civic impact, unlock exclusive community badges, and build your trust score through active participation.
        </p>
      </div>
      
      <div className="flex items-center gap-4 shrink-0">
        <Link
          href="/dashboard"
          className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl text-sm font-bold transition-all shadow-inner backdrop-blur-md flex items-center justify-center"
        >
          Dashboard
        </Link>
        <Link
          href="/report"
          className="px-6 py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl text-sm font-bold transition-all shadow-[0_0_15px_rgba(99,102,241,0.4)] hover:scale-105 hover:shadow-[0_0_25px_rgba(99,102,241,0.6)] flex items-center gap-2"
        >
          <PlusCircle className="w-4 h-4" />
          Earn XP
        </Link>
      </div>
    </div>
  );
}
