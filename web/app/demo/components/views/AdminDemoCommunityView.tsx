'use client';

import React from 'react';
import { useDemo } from '../../context/DemoProvider';
import { MessageSquare, Flame, TrendingUp, Users, Heart, AlertCircle, MessageCircle, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '@/design-system/motion/variants';

export default function AdminDemoCommunityView() {
  const { issues } = useDemo();

  return (
    <div className="min-h-screen bg-transparent relative overflow-hidden pb-24 selection:bg-purple-500/30 text-white">
      <div className="absolute inset-0 z-0 bg-[url('/noise.png')] opacity-[0.03] pointer-events-none mix-blend-overlay" />
      <div className="absolute top-[30%] -left-[10%] w-[600px] h-[600px] bg-emerald-600/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 md:pt-12 relative z-10">
        
        <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="mb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <motion.h1 variants={fadeUp} className="text-4xl font-black text-white tracking-tight mb-2">Community Watch</motion.h1>
              <motion.p variants={fadeUp} className="text-gray-400 font-medium">Live sentiment analysis and trending civic discussions.</motion.p>
            </div>
            <motion.div variants={fadeUp} className="flex gap-4">
              <div className="px-6 py-3 rounded-2xl bg-[#0a0f1c]/80 backdrop-blur-xl border border-white/10 flex items-center gap-4 shadow-xl">
                <div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-gray-500">Live Sentiment</div>
                  <div className="text-2xl font-black text-emerald-400">Positive</div>
                </div>
                <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-emerald-500/20">
                  <Heart className="w-5 h-5" />
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-[#0a0f1c]/80 backdrop-blur-3xl rounded-[2.5rem] border border-white/10 ring-1 ring-white/5 p-8 shadow-2xl relative overflow-hidden">
              <h2 className="text-xl font-black text-white tracking-tight mb-6 flex items-center gap-2">
                <Flame className="w-5 h-5 text-amber-400" /> Trending Discussions
              </h2>
              <div className="space-y-4">
                {issues.slice(0, 4).map((issue, idx) => (
                  <div key={issue.id} className="p-5 rounded-2xl bg-[#050505] border border-white/10 hover:bg-white/5 transition-colors cursor-pointer group">
                    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-3">
                      <h3 className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors">{issue.title}</h3>
                      <div className="flex gap-3 shrink-0">
                        <div className="flex items-center gap-1.5 px-2 py-1 bg-white/5 rounded-lg text-xs font-bold text-gray-400"><MessageCircle className="w-3.5 h-3.5" /> {(idx * 12) + 5}</div>
                        <div className="flex items-center gap-1.5 px-2 py-1 bg-white/5 rounded-lg text-xs font-bold text-gray-400"><TrendingUp className="w-3.5 h-3.5" /> {(idx * 27) + 10}</div>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 line-clamp-2">{issue.description}</p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {['#Infrastructure', '#CityCouncil', '#Urgent'].map(tag => (
                        <span key={tag} className="text-[10px] font-black uppercase tracking-widest text-indigo-400 bg-indigo-500/10 px-2 py-1 rounded-md">{tag}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
               <div className="bg-[#0a0f1c]/80 backdrop-blur-3xl rounded-[2rem] border border-white/10 ring-1 ring-white/5 p-6 shadow-xl text-center">
                 <Users className="w-8 h-8 text-indigo-400 mx-auto mb-4" />
                 <div className="text-4xl font-black text-white mb-1">12.4k</div>
                 <div className="text-xs font-black uppercase tracking-widest text-gray-500">Active Citizens</div>
               </div>
               <div className="bg-[#0a0f1c]/80 backdrop-blur-3xl rounded-[2rem] border border-white/10 ring-1 ring-white/5 p-6 shadow-xl text-center">
                 <MessageSquare className="w-8 h-8 text-purple-400 mx-auto mb-4" />
                 <div className="text-4xl font-black text-white mb-1">842</div>
                 <div className="text-xs font-black uppercase tracking-widest text-gray-500">Daily Comments</div>
               </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-[#0a0f1c]/80 backdrop-blur-3xl rounded-[2.5rem] border border-white/10 ring-1 ring-white/5 p-6 shadow-2xl relative overflow-hidden h-[400px] flex flex-col">
              <h2 className="text-lg font-black text-white tracking-tight mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-emerald-400" /> Engagement Heatmap
              </h2>
              <div className="flex-1 bg-[#050505] rounded-2xl relative overflow-hidden border border-white/10">
                 {/* Fake Heatmap */}
                 <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '16px 16px' }} />
                 <div className="absolute top-1/4 left-1/3 w-32 h-32 bg-rose-500 rounded-full blur-[40px] opacity-60" />
                 <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-amber-500 rounded-full blur-[50px] opacity-40" />
                 <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                   <div className="px-4 py-2 bg-black/80 backdrop-blur border border-white/10 rounded-xl text-xs font-bold text-white shadow-xl">
                     High density in Downtown
                   </div>
                 </div>
              </div>
            </div>

            <div className="bg-[#0a0f1c]/80 backdrop-blur-3xl rounded-[2.5rem] border border-white/10 ring-1 ring-white/5 p-6 shadow-2xl relative">
              <h2 className="text-lg font-black text-white tracking-tight mb-4 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-rose-400" /> Negative Sentiment Alerts
              </h2>
              <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20">
                <div className="text-sm font-bold text-white mb-1">Traffic Delays on I-95</div>
                <div className="text-xs text-rose-200 mb-2">Spike in frustration detected across 45 comments regarding recent pothole patch delays.</div>
                <button className="text-[10px] font-black uppercase tracking-widest text-rose-400 hover:text-rose-300">Issue Public Statement &rarr;</button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
