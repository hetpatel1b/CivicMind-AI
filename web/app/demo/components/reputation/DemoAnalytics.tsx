'use client';

import React, { useState } from 'react';
import { Target, HeartHandshake, Zap, BarChart2, Activity, ShieldCheck, Flame } from 'lucide-react';
import { motion } from 'framer-motion';

export default function DemoAnalytics({ summary }: { summary: Record<string, unknown> }) {
  // Mock data for graphs
  const [heatmapData] = useState(() => Array.from({ length: 7 * 4 }).map(() => Math.floor(Math.random() * 5)));
  
  const radarData = [
    { label: 'Reporting', val: 85 },
    { label: 'Verifying', val: 92 },
    { label: 'Discussion', val: 65 },
    { label: 'Support', val: 78 },
    { label: 'Consistency', val: 95 },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      
      {/* Contribution Heatmap */}
      <div className="bg-[#0a0f1c]/80 backdrop-blur-3xl p-6 rounded-[2rem] border border-white/10 ring-1 ring-white/5 shadow-2xl relative overflow-hidden group">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-500/10 to-transparent pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
        
        <div className="relative z-10 flex items-center justify-between mb-6">
          <h3 className="text-lg font-black text-white tracking-tight flex items-center gap-2">
            <Activity className="w-5 h-5 text-indigo-400" /> Activity Streak
          </h3>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-black uppercase tracking-widest">
            <Flame className="w-4 h-4" /> 12 Days
          </div>
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center h-48">
          <div className="flex flex-col gap-1 w-full max-w-[280px]">
            {Array.from({ length: 4 }).map((_, row) => (
              <div key={row} className="flex gap-1 justify-between">
                {Array.from({ length: 7 }).map((_, col) => {
                  const val = heatmapData[row * 7 + col];
                  const intensity = val === 0 ? 'bg-white/5' 
                                  : val === 1 ? 'bg-indigo-500/30' 
                                  : val === 2 ? 'bg-indigo-500/60' 
                                  : val === 3 ? 'bg-indigo-500' 
                                  : 'bg-indigo-400 shadow-[0_0_10px_rgba(99,102,241,0.8)]';
                  return (
                    <motion.div 
                      key={col}
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ delay: (row * 7 + col) * 0.01 }}
                      viewport={{ once: true }}
                      className={`w-8 h-8 rounded-lg ${intensity} border border-white/5 hover:border-white transition-colors cursor-pointer`}
                      title={`${val} contributions`}
                    />
                  );
                })}
              </div>
            ))}
          </div>
          <div className="flex justify-between w-full max-w-[280px] mt-4 text-[10px] font-black uppercase tracking-widest text-gray-500">
            <span>Less</span>
            <div className="flex gap-1">
              <div className="w-3 h-3 rounded-sm bg-white/5" />
              <div className="w-3 h-3 rounded-sm bg-indigo-500/30" />
              <div className="w-3 h-3 rounded-sm bg-indigo-500/60" />
              <div className="w-3 h-3 rounded-sm bg-indigo-500" />
              <div className="w-3 h-3 rounded-sm bg-indigo-400" />
            </div>
            <span>More</span>
          </div>
        </div>
      </div>

      {/* Trust Score & Radar */}
      <div className="bg-[#0a0f1c]/80 backdrop-blur-3xl p-6 rounded-[2rem] border border-emerald-500/20 ring-1 ring-emerald-500/10 shadow-[0_0_40px_rgba(16,185,129,0.1)] relative overflow-hidden group">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-emerald-500/10 to-transparent pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
        
        <div className="relative z-10 flex items-center justify-between mb-6">
          <h3 className="text-lg font-black text-white tracking-tight flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" /> Community Trust
          </h3>
          <div className="text-3xl font-black text-emerald-400 drop-shadow-md">94<span className="text-lg text-emerald-500/50">%</span></div>
        </div>

        <div className="relative z-10 space-y-4">
          {radarData.map((item, idx) => (
            <div key={item.label}>
              <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1.5">
                <span>{item.label}</span>
                <span className="text-white">{item.val}%</span>
              </div>
              <div className="w-full h-1.5 bg-[#050505] rounded-full overflow-hidden shadow-inner border border-white/5">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: `${item.val}%` }}
                  transition={{ duration: 1, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-full"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      
    </div>
  );
}
