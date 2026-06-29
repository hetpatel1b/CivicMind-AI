'use client';

import React from 'react';
import { Flame, ThumbsUp, CheckCircle2, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { fadeUp } from '@/design-system/motion/variants';

export default function CommunityPulse() {
  return (
    <motion.div 
      variants={fadeUp}
      className="bg-[#0a0f1c]/40 backdrop-blur-3xl rounded-[2rem] p-8 border border-white/5 shadow-[0_15px_30px_rgba(0,0,0,0.4)] h-full flex flex-col ring-1 ring-white/5"
    >
      <div className="flex items-center justify-between mb-8">
        <h3 className="font-bold text-white flex items-center gap-3 text-lg tracking-tight">
          <div className="p-2 bg-pink-500/20 border border-pink-500/30 rounded-lg shadow-inner">
            <Heart className="w-4 h-4 text-pink-400" />
          </div>
          Community Pulse
        </h3>
        <span className="flex h-3 w-3 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500 shadow-[0_0_10px_rgba(236,72,153,0.8)]"></span>
        </span>
      </div>

      <div className="flex-1 flex flex-col gap-5">
        {/* Trending Nearby */}
        <div className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors duration-300">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-orange-500/20 p-1.5 rounded-lg border border-orange-500/30">
              <Flame className="w-4 h-4 text-orange-400" />
            </div>
            <span className="text-[10px] font-bold text-orange-400 uppercase tracking-[0.2em]">Trending Nearby</span>
          </div>
          <p className="font-bold text-white text-sm mb-3 tracking-wide">Broken streetlight on 5th Avenue</p>
          <div className="flex items-center gap-4 text-xs text-gray-400 font-medium">
            <span className="flex items-center gap-1.5 bg-orange-500/10 text-orange-300 px-2 py-1 rounded border border-orange-500/20"><ThumbsUp className="w-3 h-3" /> 24 Supports</span>
            <span>• 1.2 miles away</span>
          </div>
        </div>

        {/* Most Supported */}
        <div className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors duration-300">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-blue-500/20 p-1.5 rounded-lg border border-blue-500/30">
              <ThumbsUp className="w-4 h-4 text-blue-400" />
            </div>
            <span className="text-[10px] font-bold text-blue-400 uppercase tracking-[0.2em]">Most Supported</span>
          </div>
          <p className="font-bold text-white text-sm mb-3 tracking-wide">Pothole affecting traffic on Main St.</p>
          <div className="flex items-center gap-4 text-xs text-gray-400 font-medium">
            <span className="flex items-center gap-1.5 bg-blue-500/10 text-blue-300 px-2 py-1 rounded border border-blue-500/20"><ThumbsUp className="w-3 h-3 text-blue-400" /> 142 Supports</span>
            <span>• City Center</span>
          </div>
        </div>

        {/* Recently Verified */}
        <div className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors duration-300">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-emerald-500/20 p-1.5 rounded-lg border border-emerald-500/30">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-[0.2em]">Recently Verified</span>
          </div>
          <p className="font-bold text-white text-sm mb-3 tracking-wide">Illegal dumping near City Park</p>
          <div className="flex items-center gap-4 text-xs text-gray-400 font-medium">
            <span className="bg-emerald-500/10 text-emerald-300 px-2 py-1 rounded border border-emerald-500/20">Assigned to Sanitation Dept.</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
