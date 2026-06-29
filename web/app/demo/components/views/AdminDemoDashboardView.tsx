'use client';

import React, { useMemo } from 'react';
import { useDemo } from '../../context/DemoProvider';
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '@/design-system/motion/variants';
import { Activity, AlertTriangle, ShieldCheck, Zap, Users, MapPin, Target, CheckCircle2, CloudRain, ShieldAlert } from 'lucide-react';

interface AdminDemoDashboardViewProps {
  onNavigate: (view: string, id?: string | null) => void;
}

export default function AdminDemoDashboardView({ onNavigate }: AdminDemoDashboardViewProps) {
  const { issues, users } = useDemo();

  const stats = useMemo(() => {
    return {
      issuesToday: 1482,
      resolved: 89,
      pending: 342,
      critical: issues.filter(i => (i.severity || '').toLowerCase() === 'critical').length || 12,
      avgResolutionTime: '2.4 hrs',
      citizenSatisfaction: 94,
      verificationAccuracy: 98,
      aiConfidence: 92,
      weeklyGrowth: '+14%'
    };
  }, [issues]);

  const kpis = [
    { label: 'Issues Today', value: stats.issuesToday.toLocaleString(), trend: '+12%', icon: AlertTriangle, color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20' },
    { label: 'Critical Incidents', value: stats.critical, trend: '-2%', icon: ShieldAlert, color: 'text-rose-400', bg: 'bg-rose-500/10 border-rose-500/20' },
    { label: 'Avg Resolution', value: stats.avgResolutionTime, trend: '-15m', icon: Activity, color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' },
    { label: 'AI Confidence', value: `${stats.aiConfidence}%`, trend: '+2%', icon: Zap, color: 'text-indigo-400', bg: 'bg-indigo-500/10 border-indigo-500/20' },
  ];

  return (
    <div className="min-h-screen bg-transparent relative overflow-hidden pb-24 selection:bg-indigo-500/30 text-white">
      
      {/* Background ambient noise and glows */}
      <div className="absolute inset-0 z-0 bg-[url('/noise.png')] opacity-[0.03] pointer-events-none mix-blend-overlay" />
      <div className="absolute top-0 right-1/4 w-[800px] h-[800px] bg-indigo-600/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute -bottom-[200px] -left-[200px] w-[800px] h-[800px] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 md:pt-12 relative z-10">
        
        {/* Page Header */}
        <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="mb-12">
          <motion.div variants={fadeUp} className="flex items-center gap-3 mb-4">
            <div className="px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-indigo-300 shadow-[0_0_15px_rgba(99,102,241,0.2)]">
              <div className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
              AI Command Center
            </div>
            <div className="px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-emerald-300">
              <ShieldCheck className="w-4 h-4" /> Secure Env
            </div>
          </motion.div>
          <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-4 leading-none">
            Executive <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Operations</span>
          </motion.h1>
        </motion.div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {kpis.map((kpi, idx) => {
            const Icon = kpi.icon;
            return (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`p-6 rounded-[2rem] bg-[#0a0f1c]/80 backdrop-blur-3xl border ring-1 ring-white/5 hover:scale-[1.02] transition-transform ${kpi.bg} shadow-2xl relative overflow-hidden group`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10 flex justify-between items-start mb-4">
                  <div className={`p-3 rounded-xl bg-white/5 border border-white/10 ${kpi.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-full border bg-white/5 border-white/10 ${kpi.trend.startsWith('+') ? (kpi.label === 'Critical Incidents' ? 'text-rose-400' : 'text-emerald-400') : (kpi.label === 'Critical Incidents' ? 'text-emerald-400' : 'text-rose-400')}`}>
                    {kpi.trend}
                  </div>
                </div>
                <div className="relative z-10">
                  <div className="text-4xl font-black text-white tracking-tight drop-shadow-md">{kpi.value}</div>
                  <div className="text-sm font-bold text-gray-500 mt-1">{kpi.label}</div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          
          {/* Live Operations Panel */}
          <div className="lg:col-span-2 bg-[#0a0f1c]/80 backdrop-blur-3xl rounded-[2.5rem] border border-white/10 ring-1 ring-white/5 p-8 shadow-2xl">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-black text-white tracking-tight flex items-center gap-3">
                <Target className="w-6 h-6 text-indigo-400" /> Live Operations
              </h2>
              <button 
                onClick={() => onNavigate('verification')}
                className="text-xs font-black uppercase tracking-widest text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                View Full Queue &rarr;
              </button>
            </div>

            <div className="space-y-4">
              {issues.slice(0, 4).map((issue, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer" onClick={() => onNavigate('verification')}>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#050505] border border-white/10 flex items-center justify-center shrink-0 overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${issue.user_id}`} alt="User" className="w-full h-full opacity-80" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white mb-1 line-clamp-1">{issue.title}</div>
                      <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-500">
                        <span className="text-indigo-400">AI Confidence: 94%</span> • {issue.category}
                      </div>
                    </div>
                  </div>
                  <div className="shrink-0 flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${(issue.severity || '').toLowerCase() === 'critical' ? 'bg-rose-500/10 text-rose-400 border-rose-500/30' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'}`}>
                      {issue.severity || 'Medium'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Insights & Geographic Intel */}
          <div className="flex flex-col gap-8">
            {/* Geographic Intelligence Map Mock */}
            <div className="bg-[#0a0f1c]/80 backdrop-blur-3xl rounded-[2.5rem] border border-white/10 ring-1 ring-white/5 p-6 shadow-2xl relative overflow-hidden h-[300px]">
              <div className="absolute inset-0 bg-[#050505] z-0" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/30 to-transparent z-10" />
              
              {/* Fake Map Elements */}
              <div className="absolute inset-0 opacity-20 pointer-events-none z-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} />
              
              <div className="relative z-20 flex flex-col h-full">
                <div className="flex justify-between items-start mb-auto">
                  <div className="flex items-center gap-2 text-white font-bold">
                    <MapPin className="w-5 h-5 text-indigo-400" /> Geographic Intel
                  </div>
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
                </div>

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="relative">
                    <div className="w-8 h-8 bg-rose-500/20 rounded-full animate-ping absolute -inset-2" />
                    <div className="w-4 h-4 bg-rose-500 rounded-full shadow-[0_0_15px_rgba(225,29,72,1)]" />
                  </div>
                </div>
                <div className="absolute top-1/3 left-1/4">
                  <div className="w-3 h-3 bg-amber-500 rounded-full shadow-[0_0_10px_rgba(245,158,11,1)]" />
                </div>
                
                <div className="mt-auto p-3 rounded-xl bg-black/60 backdrop-blur-md border border-white/10">
                  <div className="text-[10px] font-black uppercase tracking-widest text-rose-400 mb-1">Hotspot Detected</div>
                  <div className="text-xs font-bold text-white">Downtown District (3 Critical)</div>
                </div>
              </div>
            </div>

            {/* AI Predictions */}
            <div className="bg-indigo-900/20 backdrop-blur-3xl rounded-[2.5rem] border border-indigo-500/20 ring-1 ring-indigo-500/10 p-6 shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent pointer-events-none" />
              <div className="relative z-10">
                <h3 className="text-lg font-black text-indigo-300 tracking-tight flex items-center gap-2 mb-4">
                  <Zap className="w-5 h-5" /> AI Prediction Engine
                </h3>
                <div className="p-3 rounded-xl bg-black/40 border border-indigo-500/20 mb-3">
                  <div className="text-[10px] font-black uppercase tracking-widest text-emerald-400 mb-1 flex justify-between">
                    <span>Weather Impact</span>
                    <span>94% Conf</span>
                  </div>
                  <div className="text-xs font-medium text-indigo-100">Heavy rain predicted. Proactively deploying sanitation teams to Sector 4.</div>
                </div>
                <div className="p-3 rounded-xl bg-black/40 border border-indigo-500/20">
                  <div className="text-[10px] font-black uppercase tracking-widest text-amber-400 mb-1 flex justify-between">
                    <span>Duplicate Detection</span>
                    <span>12 Merged</span>
                  </div>
                  <div className="text-xs font-medium text-indigo-100">AI automatically merged 12 identical reports regarding Main St. Traffic Light.</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
