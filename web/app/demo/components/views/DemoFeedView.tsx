'use client';

import React, { useState, useMemo } from 'react';
import { useDemo } from '../../context/DemoProvider';
import DemoIssueCard from '../feed/DemoIssueCard';
import { Activity, ShieldCheck, MapPin, TrendingUp, Users, Search, Sparkles, Filter, ChevronDown, BellRing, CloudRain, AlertTriangle, Zap, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeUp, staggerContainer } from '@/design-system/motion/variants';

interface DemoFeedViewProps {
  onNavigate: (view: string, id?: string | null) => void;
}

export default function DemoFeedView({ onNavigate }: DemoFeedViewProps) {
  const { issues } = useDemo();
  
  // Advanced Filter States
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [activeFilter, setActiveFilter] = useState<string>('Trending');

  const categories = ['All', 'Infrastructure', 'Water', 'Security', 'Sanitation', 'Noise'];
  const filters = ['Trending', 'Newest', 'AI Priority', 'Verified', 'Nearby'];

  // Filter & Sort Logic (Client-Side Only)
  const processedIssues = useMemo(() => {
    let result = [...issues];

    // Search
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(issue => 
        issue.title.toLowerCase().includes(term) ||
        (issue.description || '').toLowerCase().includes(term) ||
        issue.category.toLowerCase().includes(term)
      );
    }

    // Category
    if (activeCategory !== 'All') {
      result = result.filter(issue => issue.category.toLowerCase() === activeCategory.toLowerCase());
    }

    // Filters (Simulated sorting for demo)
    result.sort((a, b) => {
      if (activeFilter === 'Newest') {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      }
      
      const seedA = a.id.split('').reduce((acc: number, char: string) => acc + char.charCodeAt(0), 0);
      const seedB = b.id.split('').reduce((acc: number, char: string) => acc + char.charCodeAt(0), 0);
      
      if (activeFilter === 'Trending') {
        return ((seedB % 250) + 42) - ((seedA % 250) + 42);
      }
      if (activeFilter === 'AI Priority') {
        // AI Priority pushes Critical/High to top
        const getWeight = (sev: string) => sev === 'critical' ? 4 : sev === 'high' ? 3 : sev === 'medium' ? 2 : 1;
        return getWeight((b.severity || '').toLowerCase()) - getWeight((a.severity || '').toLowerCase());
      }
      if (activeFilter === 'Verified') {
        const aV = seedA % 2 === 0 ? 1 : 0;
        const bV = seedB % 2 === 0 ? 1 : 0;
        return bV - aV;
      }
      if (activeFilter === 'Nearby') {
        return (seedA % 50) - (seedB % 50); // Ascending distance
      }
      return 0;
    });

    return result;
  }, [issues, searchTerm, activeCategory, activeFilter]);

  return (
    <div className="min-h-screen bg-transparent relative overflow-hidden pb-24 selection:bg-indigo-500/30 text-white">
      
      {/* Background ambient noise and glows */}
      <div className="absolute inset-0 z-0 bg-[url('/noise.png')] opacity-[0.03] pointer-events-none mix-blend-overlay" />
      <div className="absolute -top-[500px] left-1/2 -translate-x-1/2 w-[1200px] h-[1200px] bg-indigo-600/10 rounded-full blur-[150px] pointer-events-none" />

      {/* Redesigned Hero Section - Community Intelligence */}
      <div className="relative z-10 mb-12">
        <div className="flex flex-col lg:flex-row gap-8 justify-between items-end mb-8">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="max-w-2xl">
            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-6">
              <div className="px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-indigo-300 shadow-[0_0_15px_rgba(99,102,241,0.2)]">
                <div className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
                Live Civic Feed
              </div>
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-4xl sm:text-6xl font-black text-white tracking-tight mb-4 leading-none">
              Community <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Intelligence</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-lg text-gray-400 leading-relaxed font-medium">
              Real-time civic awareness powered by AI and community collaboration.
            </motion.p>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="flex gap-4">
            {/* Animated Counters */}
            <div className="flex flex-col items-end">
              <div className="text-3xl font-black text-white">1,482</div>
              <div className="text-[10px] font-black uppercase tracking-widest text-gray-500">Today&apos;s Reports</div>
            </div>
            <div className="w-px h-12 bg-white/10 mx-2" />
            <div className="flex flex-col items-end">
              <div className="text-3xl font-black text-emerald-400">92%</div>
              <div className="text-[10px] font-black uppercase tracking-widest text-gray-500">Verification Rate</div>
            </div>
            <div className="w-px h-12 bg-white/10 mx-2" />
            <div className="flex flex-col items-end">
              <div className="text-3xl font-black text-indigo-400">Active</div>
              <div className="text-[10px] font-black uppercase tracking-widest text-gray-500">AI Analysis</div>
            </div>
          </motion.div>
        </div>

        {/* Modern Filter Chips */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between p-2 rounded-3xl bg-[#0a0f1c]/80 backdrop-blur-3xl border border-white/5 ring-1 ring-white/10 shadow-2xl">
          <div className="flex overflow-x-auto hide-scrollbar w-full md:w-auto p-2 gap-2">
            {filters.map(filter => (
              <button 
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-5 py-2.5 rounded-2xl text-sm font-bold whitespace-nowrap transition-all duration-300 ${activeFilter === filter ? 'bg-white text-[#050505] shadow-[0_0_20px_rgba(255,255,255,0.3)]' : 'bg-transparent text-gray-400 hover:text-white hover:bg-white/5'}`}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto px-4 pb-2 md:pb-0">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search civic intelligence..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#050505] border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm font-medium text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all"
              />
            </div>
            <button className="p-3 rounded-xl bg-[#050505] border border-white/10 text-gray-400 hover:text-white transition-colors">
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Category Chips */}
        <div className="flex overflow-x-auto hide-scrollbar gap-2 mt-6 px-2">
          {categories.map(cat => (
            <button 
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-lg border text-xs font-black uppercase tracking-widest transition-all ${activeCategory === cat ? 'bg-indigo-500/20 border-indigo-500/50 text-indigo-300' : 'bg-[#050505] border-white/10 text-gray-500 hover:bg-white/5 hover:text-gray-300'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto relative z-10 flex flex-col xl:flex-row gap-8">
        
        {/* Main Feed Column (Masonry Grid) */}
        <div className="flex-1 w-full min-w-0">
          
          {processedIssues.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-32 px-4 text-center">
              <div className="relative w-48 h-48 mb-8">
                <div className="absolute inset-0 bg-indigo-500/20 rounded-full blur-3xl animate-pulse" />
                <img src="https://illustrations.popsy.co/amber/freelancer.svg" alt="No issues" className="w-full h-full relative z-10 drop-shadow-2xl opacity-80 filter invert sepia hue-rotate-[220deg] saturate-200" />
              </div>
              <h3 className="text-3xl font-black text-white mb-4 tracking-tight">Zero active alerts in this grid.</h3>
              <p className="text-gray-400 max-w-md mx-auto text-lg font-medium leading-relaxed mb-8">
                Your filters are returning no civic intelligence. The community is either quiet, or you need to broaden your search parameters.
              </p>
              <button 
                onClick={() => {
                  setSearchTerm('');
                  setActiveCategory('All');
                  setActiveFilter('Trending');
                }}
                className="px-8 py-3.5 bg-white text-[#050505] hover:bg-indigo-50 font-black rounded-2xl shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:scale-105 transition-all"
              >
                Reset Grid Parameters
              </button>
            </div>
          ) : (
            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6 pb-20">
              {processedIssues.map((issue) => (
                <div key={issue.id} className="break-inside-avoid">
                  <DemoIssueCard issue={issue} onCardClick={(e, id) => {
                    e.preventDefault();
                    onNavigate('issue_details', id);
                  }} />
                </div>
              ))}
              
              {/* Simulate infinite scroll loader */}
              <div className="col-span-full py-12 flex justify-center break-inside-avoid">
                <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-[#0a0f1c]/80 backdrop-blur-md border border-white/10">
                  <div className="w-4 h-4 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin" />
                  <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Loading Grid...</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Sidebar - Expanded Community Insights */}
        <div className="w-full xl:w-[400px] shrink-0 flex flex-col gap-6 sticky top-8">
          
          {/* AI Command Center */}
          <div className="bg-[#0a0f1c]/80 backdrop-blur-3xl rounded-[2rem] border p-[1px] relative overflow-hidden shadow-[0_0_40px_rgba(99,102,241,0.15)] group">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/50 via-purple-500/50 to-pink-500/50 opacity-20 group-hover:opacity-100 transition-opacity duration-1000 animate-[spin_10s_linear_infinite]" />
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 opacity-20 blur-xl" />
            <div className="bg-[#050505]/95 backdrop-blur-xl rounded-[2rem] p-6 relative z-10 h-full">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-xl font-black text-white tracking-tight flex items-center gap-2 mb-1">
                    <Sparkles className="w-5 h-5 text-indigo-400" /> AI Command Center
                  </h3>
                  <p className="text-[10px] font-black uppercase tracking-widest text-indigo-300/70">Real-time prediction active</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30">
                  <Zap className="w-5 h-5 text-indigo-400" />
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <div className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1">Top Priority Area</div>
                  <div className="text-white font-bold mb-1">Downtown Tech District</div>
                  <div className="flex items-center justify-between text-xs font-medium text-rose-400">
                    <span>High Risk Heatmap</span>
                    <span>89% Confidence</span>
                  </div>
                  <div className="w-full h-1 bg-black rounded-full mt-3 overflow-hidden">
                    <div className="h-full bg-rose-500 w-[89%]" />
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <div className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1">Duplicate Detection</div>
                  <div className="text-white font-bold mb-1">3 Similar Water Issues</div>
                  <div className="flex items-center justify-between text-xs font-medium text-indigo-400">
                    <span>Auto-merged by AI</span>
                    <span>Saved 12 hrs</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Local Impact & Weather */}
          <div className="bg-[#0a0f1c]/80 backdrop-blur-3xl rounded-[2rem] border border-white/10 ring-1 ring-white/5 p-6 shadow-2xl">
            <h3 className="text-lg font-black text-white tracking-tight flex items-center gap-2 mb-6">
              <CloudRain className="w-5 h-5 text-blue-400" /> Environment Impact
            </h3>
            
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="text-5xl font-black text-white drop-shadow-lg">68°</div>
                <div>
                  <div className="text-sm font-bold text-white">Heavy Rain Expected</div>
                  <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Next 4 Hours</div>
                </div>
              </div>
            </div>

            <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
              <div>
                <div className="text-xs font-bold text-amber-100 mb-1">AI Prediction: Infrastructure Risk</div>
                <div className="text-[10px] text-amber-200/70 font-medium leading-relaxed">
                  Upcoming rain highly correlates with increased pothole reports in Sector 4. Civic teams have been notified.
                </div>
              </div>
            </div>
          </div>

          {/* Trending Pulse */}
          <div className="bg-[#0a0f1c]/80 backdrop-blur-3xl rounded-[2rem] border border-white/10 ring-1 ring-white/5 p-6 shadow-2xl">
            <h3 className="text-lg font-black text-white tracking-tight flex items-center gap-2 mb-6">
              <TrendingUp className="w-5 h-5 text-emerald-400" /> Community Pulse
            </h3>
            
            <div className="space-y-4">
              {[
                { tag: 'Infrastructure', count: '1.2k', trend: '+14%' },
                { tag: 'Safety', count: '856', trend: '+5%' },
                { tag: 'Sanitation', count: '432', trend: '-2%' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between group cursor-pointer p-2 -mx-2 rounded-xl hover:bg-white/5 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#050505] border border-white/10 flex items-center justify-center text-xs font-black text-gray-400 group-hover:text-white transition-colors">
                      #{i+1}
                    </div>
                    <div className="text-sm font-bold text-gray-300 group-hover:text-white transition-colors">{item.tag}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-black text-white">{item.count}</div>
                    <div className={`text-[10px] font-black tracking-widest uppercase ${item.trend.startsWith('+') ? 'text-emerald-400' : 'text-rose-400'}`}>{item.trend}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Emergency Broadcasts */}
          <div className="p-6 rounded-[2rem] bg-rose-500/10 border border-rose-500/20 ring-1 ring-rose-500/10">
            <h3 className="text-lg font-black text-rose-400 tracking-tight flex items-center gap-2 mb-4">
              <BellRing className="w-5 h-5" /> Active Broadcasts
            </h3>
            <div className="text-sm font-medium text-rose-200/80 leading-relaxed mb-4">
              City-wide water maintenance scheduled for Friday 2AM - 6AM. Temporary pressure drops expected in Northern Districts.
            </div>
            <button className="text-xs font-black uppercase tracking-widest text-rose-400 hover:text-rose-300 flex items-center gap-1 transition-colors">
              Read Official Memo <ChevronRight className="w-3 h-3" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
