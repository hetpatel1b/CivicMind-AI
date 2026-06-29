'use client';

import React from 'react';
import { Sparkles, Brain, Cpu, Activity, Zap, ShieldAlert, GitMerge, ThermometerSnowflake, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '@/design-system/motion/variants';

export default function AdminDemoAIView() {
  return (
    <div className="min-h-screen bg-transparent relative overflow-hidden pb-24 selection:bg-purple-500/30 text-white">
      {/* Heavy futuristic glows */}
      <div className="absolute inset-0 z-0 bg-[url('/noise.png')] opacity-[0.05] pointer-events-none mix-blend-overlay" />
      <div className="absolute top-0 left-[20%] w-[1000px] h-[1000px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-600/10 via-purple-600/5 to-transparent rounded-full blur-[100px] pointer-events-none" />
      
      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none z-0" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 md:pt-12 relative z-10">
        
        {/* Header */}
        <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="mb-12">
          <motion.div variants={fadeUp} className="flex items-center gap-3 mb-4">
            <div className="px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-purple-300 shadow-[0_0_20px_rgba(168,85,247,0.3)]">
              <Sparkles className="w-4 h-4 animate-pulse" /> AI Core Active
            </div>
            <div className="text-xs font-black uppercase tracking-widest text-emerald-400 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> 99.9% Uptime
            </div>
          </motion.div>
          <motion.h1 variants={fadeUp} className="text-5xl sm:text-6xl font-black text-white tracking-tight mb-4 leading-none">
            Intelligence <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">Nexus</span>
          </motion.h1>
          <motion.p variants={fadeUp} className="text-lg text-purple-200/60 max-w-2xl font-medium">
            Centralized control over the CivicMind prediction engine, automated moderation, and city-scale forecasting models.
          </motion.p>
        </motion.div>

        {/* System Health Models */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Vision Model', ver: 'v4.2.1', stat: '98.4%', sub: 'Accuracy', icon: Brain, color: 'text-purple-400', bg: 'bg-purple-500/10 border-purple-500/30' },
            { label: 'NLP Engine', ver: 'v2.8.0', stat: '42ms', sub: 'Latency', icon: Cpu, color: 'text-indigo-400', bg: 'bg-indigo-500/10 border-indigo-500/30' },
            { label: 'Risk Predictor', ver: 'v1.1.0', stat: 'High', sub: 'Confidence', icon: ShieldAlert, color: 'text-rose-400', bg: 'bg-rose-500/10 border-rose-500/30' },
            { label: 'Dupe Catcher', ver: 'v3.0.0', stat: '99.1%', sub: 'Precision', icon: GitMerge, color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/30' }
          ].map((model, idx) => {
            const Icon = model.icon;
            return (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}
                className="bg-[#0a0f1c]/90 backdrop-blur-3xl p-6 rounded-[2rem] border border-white/10 ring-1 ring-white/5 hover:-translate-y-1 transition-transform cursor-pointer relative overflow-hidden group"
              >
                <div className={`absolute top-0 right-0 w-32 h-32 ${model.bg.split(' ')[0]} rounded-bl-full opacity-20 group-hover:opacity-40 transition-opacity`} />
                <div className="flex justify-between items-start mb-4 relative z-10">
                  <div className={`p-3 rounded-xl border ${model.bg} ${model.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="px-2 py-1 rounded-md bg-white/5 border border-white/10 text-[9px] font-black uppercase tracking-widest text-gray-400">{model.ver}</div>
                </div>
                <div className="relative z-10">
                  <div className="text-3xl font-black text-white">{model.stat}</div>
                  <div className="text-xs font-bold text-gray-500 mt-1">{model.label} • {model.sub}</div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Prediction Engine & Forecasts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Active Predictions */}
          <div className="lg:col-span-2 bg-[#0a0f1c]/80 backdrop-blur-3xl rounded-[2.5rem] border border-white/10 ring-1 ring-white/5 p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent pointer-events-none" />
            <h2 className="text-2xl font-black text-white tracking-tight flex items-center gap-3 mb-8 relative z-10">
              <Zap className="w-6 h-6 text-amber-400" /> Active City Forecasts
            </h2>
            
            <div className="space-y-4 relative z-10">
              {[
                { title: 'Severe Traffic Congestion', desc: 'Predicted on I-95 Northbound due to compounding pothole reports and scheduled roadwork.', prob: 88, time: '2 hours', icon: Activity, color: 'text-amber-400' },
                { title: 'Sanitation Overflow', desc: 'Downtown district waste bins likely to exceed capacity following the weekend festival.', prob: 94, time: '6 hours', icon: ThermometerSnowflake, color: 'text-rose-400' },
                { title: 'Resource Allocation Warning', desc: 'Water department currently overloaded. AI suggests rerouting 3 maintenance teams from Sector B.', prob: 76, time: 'Immediate', icon: Users, color: 'text-indigo-400' }
              ].map((forecast, idx) => {
                const Icon = forecast.icon;
                return (
                  <div key={idx} className="p-6 rounded-2xl bg-[#050505]/60 border border-white/10 hover:border-indigo-500/30 transition-colors group">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Icon className={`w-5 h-5 ${forecast.color}`} />
                          <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">{forecast.title}</h3>
                        </div>
                        <p className="text-sm text-gray-400 leading-relaxed">{forecast.desc}</p>
                      </div>
                      <div className="shrink-0 md:w-[150px] flex flex-col justify-center border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-6">
                        <div className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1">Probability</div>
                        <div className="flex items-end gap-2 mb-3">
                          <div className="text-2xl font-black text-white leading-none">{forecast.prob}%</div>
                        </div>
                        <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${forecast.prob > 90 ? 'bg-rose-500' : forecast.prob > 80 ? 'bg-amber-500' : 'bg-indigo-500'}`} style={{ width: `${forecast.prob}%` }} />
                        </div>
                        <div className="text-[10px] font-bold text-indigo-400 mt-2 text-right">ETA: {forecast.time}</div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* AI Decision Stream */}
          <div className="bg-[#0a0f1c]/80 backdrop-blur-3xl rounded-[2.5rem] border border-white/10 ring-1 ring-white/5 p-8 shadow-2xl flex flex-col">
            <h2 className="text-xl font-black text-white tracking-tight flex items-center gap-2 mb-6">
              <Cpu className="w-5 h-5 text-purple-400" /> Decision Stream
            </h2>
            <div className="flex-1 space-y-4 relative">
              <div className="absolute left-[11px] top-2 bottom-2 w-[2px] bg-white/5" />
              {[
                { action: 'Merged 4 Duplicate Reports', target: 'Pothole on 5th Ave', time: 'Just now' },
                { action: 'Flagged Suspicious Activity', target: 'User #92441', time: '2m ago' },
                { action: 'Auto-Verified Issue', target: 'Fallen Tree (High Conf)', time: '5m ago' },
                { action: 'Routed to Water Dept', target: 'Pipe Burst on Elm', time: '12m ago' },
                { action: 'Updated Severity to CRITICAL', target: 'Power Outage', time: '18m ago' },
              ].map((log, idx) => (
                <div key={idx} className="relative pl-8">
                  <div className="absolute left-0 top-1.5 w-6 h-6 rounded-full bg-[#050505] border-2 border-purple-500/30 flex items-center justify-center z-10">
                    <div className="w-2 h-2 rounded-full bg-purple-400" />
                  </div>
                  <div className="text-sm font-bold text-white mb-0.5">{log.action}</div>
                  <div className="text-xs text-gray-500">{log.target}</div>
                  <div className="text-[9px] font-black uppercase tracking-widest text-purple-400/60 mt-1">{log.time}</div>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-3 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 text-purple-300 rounded-xl font-black uppercase tracking-widest text-xs transition-colors">
              View All Logs
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
