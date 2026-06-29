'use client';

import React from 'react';
import { BarChart3, TrendingUp, PieChart, Activity, Download, Calendar, Users, Target } from 'lucide-react';
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '@/design-system/motion/variants';

export default function AdminDemoAnalyticsView() {
  const [chartBars] = React.useState(() => Array.from({ length: 24 }).map(() => Math.floor(Math.random() * 80) + 20));

  return (
    <div className="min-h-screen bg-transparent relative overflow-hidden pb-24 selection:bg-blue-500/30 text-white">
      <div className="absolute inset-0 z-0 bg-[url('/noise.png')] opacity-[0.03] pointer-events-none mix-blend-overlay" />
      <div className="absolute top-[30%] -right-[20%] w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 md:pt-12 relative z-10">
        
        <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="mb-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div>
              <motion.h1 variants={fadeUp} className="text-4xl font-black text-white tracking-tight mb-2">Executive Analytics</motion.h1>
              <motion.p variants={fadeUp} className="text-gray-400 font-medium">City-wide performance, efficiency, and growth metrics.</motion.p>
            </div>
            <motion.div variants={fadeUp} className="flex gap-4">
              <div className="px-4 py-2.5 bg-[#0a0f1c]/80 backdrop-blur-xl border border-white/10 rounded-xl flex items-center gap-2 cursor-pointer hover:bg-white/5 transition-colors">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span className="text-sm font-bold text-white">Last 30 Days</span>
              </div>
              <button className="px-4 py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-xl text-sm font-bold flex items-center gap-2 transition-colors">
                <Download className="w-4 h-4" /> Export PDF
              </button>
            </motion.div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="bg-[#0a0f1c]/80 backdrop-blur-3xl rounded-[2rem] border border-white/10 p-6 shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity"><TrendingUp className="w-24 h-24" /></div>
            <div className="flex items-center gap-3 mb-4 relative z-10">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center"><TrendingUp className="w-5 h-5" /></div>
              <div>
                <div className="text-sm font-bold text-gray-400">Resolution Trend</div>
                <div className="text-xs font-black uppercase tracking-widest text-emerald-400">+12% vs last month</div>
              </div>
            </div>
            <div className="text-4xl font-black text-white mb-6 relative z-10">4,291 <span className="text-lg text-gray-500">issues</span></div>
            
            {/* CSS Bar Chart */}
            <div className="h-24 flex items-end gap-1.5 relative z-10">
              {chartBars.slice(0, 14).map((val, i) => (
                <div key={i} className="flex-1 bg-white/5 rounded-t-sm hover:bg-blue-500/50 transition-colors cursor-pointer group/bar relative">
                  <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-1 bg-black text-white text-[10px] font-bold rounded opacity-0 group-hover/bar:opacity-100 transition-opacity pointer-events-none">{val}</div>
                  <div className="w-full bg-blue-500 rounded-t-sm" style={{ height: `${val}%` }} />
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#0a0f1c]/80 backdrop-blur-3xl rounded-[2rem] border border-white/10 p-6 shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity"><Activity className="w-24 h-24" /></div>
            <div className="flex items-center gap-3 mb-4 relative z-10">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center"><Activity className="w-5 h-5" /></div>
              <div>
                <div className="text-sm font-bold text-gray-400">Avg Response Time</div>
                <div className="text-xs font-black uppercase tracking-widest text-emerald-400">-45m vs last month</div>
              </div>
            </div>
            <div className="text-4xl font-black text-white mb-6 relative z-10">1.2 <span className="text-lg text-gray-500">hours</span></div>
            
            <div className="h-24 flex items-end gap-1.5 relative z-10">
              {chartBars.slice(10, 24).map((val, i) => (
                <div key={i} className="flex-1 bg-white/5 rounded-t-sm hover:bg-emerald-500/50 transition-colors cursor-pointer group/bar relative">
                  <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-1 bg-black text-white text-[10px] font-bold rounded opacity-0 group-hover/bar:opacity-100 transition-opacity pointer-events-none">{val}m</div>
                  <div className="w-full bg-emerald-400 rounded-t-sm" style={{ height: `${val}%` }} />
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#0a0f1c]/80 backdrop-blur-3xl rounded-[2rem] border border-white/10 p-6 shadow-xl relative flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center"><Target className="w-5 h-5" /></div>
                <div className="text-sm font-bold text-gray-400">Verification Accuracy</div>
              </div>
              <div className="flex items-end gap-4 mb-2">
                <div className="text-6xl font-black text-white leading-none tracking-tighter">98.4<span className="text-3xl text-gray-500">%</span></div>
              </div>
              <p className="text-sm text-gray-500">AI and manual verification precision rate.</p>
            </div>
            <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden mt-6">
              <div className="h-full bg-gradient-to-r from-purple-500 to-blue-500 w-[98.4%] rounded-full shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
            </div>
          </div>
        </div>

        {/* Breakdown Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-[#0a0f1c]/80 backdrop-blur-3xl rounded-[2.5rem] border border-white/10 ring-1 ring-white/5 p-8 shadow-xl">
            <h3 className="text-xl font-black text-white tracking-tight mb-6 flex items-center gap-2"><PieChart className="w-5 h-5 text-gray-400" /> Category Distribution</h3>
            <div className="space-y-4">
              {[
                { name: 'Infrastructure', count: 1245, color: 'bg-indigo-500' },
                { name: 'Sanitation', count: 856, color: 'bg-emerald-500' },
                { name: 'Utilities', count: 432, color: 'bg-amber-500' },
                { name: 'Public Safety', count: 210, color: 'bg-rose-500' },
              ].map(cat => (
                <div key={cat.name} className="flex items-center gap-4">
                  <div className="w-32 text-sm font-bold text-gray-300 shrink-0">{cat.name}</div>
                  <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                    <div className={`h-full ${cat.color} rounded-full`} style={{ width: `${(cat.count / 2743) * 100}%` }} />
                  </div>
                  <div className="w-12 text-right text-xs font-black text-white">{cat.count}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-[#0a0f1c]/80 backdrop-blur-3xl rounded-[2.5rem] border border-white/10 ring-1 ring-white/5 p-8 shadow-xl">
            <h3 className="text-xl font-black text-white tracking-tight mb-6 flex items-center gap-2"><Users className="w-5 h-5 text-gray-400" /> Department Efficiency</h3>
            <div className="space-y-4">
              {[
                { name: 'Dept of Transport', score: 92, color: 'bg-indigo-500' },
                { name: 'Waste Management', score: 88, color: 'bg-emerald-500' },
                { name: 'Water & Power', score: 76, color: 'bg-amber-500' },
                { name: 'Parks & Rec', score: 95, color: 'bg-purple-500' },
              ].map(dept => (
                <div key={dept.name} className="flex items-center gap-4">
                  <div className="w-32 text-sm font-bold text-gray-300 shrink-0">{dept.name}</div>
                  <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                    <div className={`h-full ${dept.color} rounded-full`} style={{ width: `${dept.score}%` }} />
                  </div>
                  <div className="w-12 text-right text-xs font-black text-white">{dept.score}%</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
