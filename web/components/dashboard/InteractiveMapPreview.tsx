'use client';

import React from 'react';
import Link from 'next/link';
import { Map as MapIcon, ArrowRight, MapPin, Activity, ShieldAlert, Crosshair } from 'lucide-react';
import { motion } from 'framer-motion';
import { fadeUp } from '@/design-system/motion/variants';

export default function InteractiveMapPreview() {
  return (
    <motion.div 
      variants={fadeUp}
      className="bg-[#0a0f1c]/40 backdrop-blur-3xl rounded-[2rem] p-8 border border-white/5 shadow-[0_20px_40px_rgba(0,0,0,0.5)] flex flex-col h-full relative overflow-hidden group ring-1 ring-white/5"
    >
      <div className="flex items-center justify-between mb-6 relative z-20">
        <h3 className="font-bold text-white flex items-center gap-3 text-lg tracking-tight">
          <div className="p-2 bg-indigo-500/20 border border-indigo-500/30 rounded-xl shadow-inner">
            <MapIcon className="w-4 h-4 text-indigo-400" />
          </div>
          Live Intelligence Map
        </h3>
        <Link href="/map" className="text-[10px] font-bold text-indigo-400 hover:text-white uppercase tracking-widest flex items-center gap-2 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded p-1 bg-indigo-500/10 hover:bg-indigo-500/30 px-3 py-1.5 border border-indigo-500/20">
          Open Map <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      <div className="flex-1 rounded-[1.5rem] overflow-hidden relative bg-[#050505] border border-white/10 min-h-[300px] shadow-[inset_0_0_50px_rgba(0,0,0,0.8)] group-hover:border-indigo-500/30 transition-colors duration-500">
        {/* High-Fidelity Abstract Map Grid Simulation */}
        <div className="absolute inset-0 opacity-[0.15] mix-blend-screen" 
          style={{ 
            backgroundImage: 'linear-gradient(#6366f1 1px, transparent 1px), linear-gradient(90deg, #6366f1 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}
        />
        
        {/* Street Lines Overlay */}
        <div className="absolute inset-0 opacity-10 mix-blend-screen">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <path d="M-50 150 Q 150 50, 300 200 T 600 100" fill="transparent" stroke="#818cf8" strokeWidth="4" />
                <path d="M100 -50 Q 200 150, 150 300 T 250 600" fill="transparent" stroke="#818cf8" strokeWidth="2" />
                <path d="M400 -50 Q 300 250, 450 400 T 350 700" fill="transparent" stroke="#a855f7" strokeWidth="3" />
            </svg>
        </div>

        {/* Scanning Line Animation */}
        <motion.div 
            animate={{ top: ['-10%', '110%'] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            className="absolute left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent shadow-[0_0_30px_rgba(99,102,241,0.5)] z-10 mix-blend-screen"
        />

        {/* Intelligence Data Points */}
        
        {/* Cluster 1: High Priority */}
        <div className="absolute top-[35%] left-[30%] text-rose-400 z-10 flex flex-col items-center">
            <div className="relative">
                <div className="absolute inset-0 bg-rose-500/20 blur-xl rounded-full" />
                <ShieldAlert className="w-7 h-7 relative z-10 drop-shadow-[0_0_15px_rgba(244,63,94,0.8)]" />
                <div className="absolute top-0 left-0 w-full h-full border border-rose-500/50 rounded-full animate-ping" />
            </div>
            <span className="mt-2 bg-rose-500/20 backdrop-blur-md px-2 py-0.5 rounded text-[8px] font-bold text-rose-300 border border-rose-500/30 tracking-widest uppercase">
                Critical
            </span>
        </div>
        
        {/* Cluster 2: Standard Report */}
        <div className="absolute top-[65%] left-[55%] text-indigo-400 z-10 flex flex-col items-center">
            <div className="relative">
                <div className="absolute inset-0 bg-indigo-500/20 blur-lg rounded-full" />
                <MapPin className="w-5 h-5 relative z-10 drop-shadow-[0_0_15px_rgba(99,102,241,0.8)]" />
            </div>
            <span className="mt-1 bg-[#050505]/80 backdrop-blur-md px-2 py-0.5 rounded text-[8px] font-bold text-indigo-300 border border-white/10 tracking-widest uppercase">
                Active
            </span>
        </div>

        {/* Cluster 3: Resolved */}
        <div className="absolute top-[25%] left-[75%] text-emerald-400 z-10 flex flex-col items-center">
            <div className="relative opacity-70">
                <div className="absolute inset-0 bg-emerald-500/10 blur-lg rounded-full" />
                <MapPin className="w-4 h-4 relative z-10 drop-shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
            </div>
        </div>

        {/* Map Legend / Overlay Controls (Simulated) */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 z-20">
            <div className="w-8 h-8 rounded-lg bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center shadow-lg cursor-not-allowed">
                <Crosshair className="w-4 h-4 text-gray-400" />
            </div>
        </div>

        {/* Deep Glass Overlay CTA */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1c] via-[#0a0f1c]/80 to-transparent flex flex-col justify-end p-8 opacity-0 group-hover:opacity-100 transition-all duration-500 backdrop-blur-[4px] z-30">
          <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            <p className="text-gray-300 font-medium mb-5 text-sm leading-relaxed text-center">
              AI has identified <strong className="text-white">3 active hotspots</strong> in your vicinity.
            </p>
            <Link href="/map" className="w-full py-4 bg-indigo-600/90 hover:bg-indigo-500 backdrop-blur-xl border border-indigo-400/50 text-white text-center rounded-xl font-bold transition-all shadow-[0_0_30px_rgba(99,102,241,0.4)] text-xs uppercase tracking-widest outline-none focus-visible:ring-2 focus-visible:ring-white flex items-center justify-center gap-2">
              <Activity className="w-4 h-4" /> Enter Live Map
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
