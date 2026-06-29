'use client';

import React, { useState } from 'react';
import { useDemo } from '../../context/DemoProvider';
import { AlertCircle, CheckCircle, Clock, Filter, Layers, ListChecks, Activity, LayoutGrid, Kanban, Table2, Search, SlidersHorizontal, MoreHorizontal, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { formatDistanceToNow } from '@/lib/utils/date';
import { fadeUp, staggerContainer } from '@/design-system/motion/variants';

interface AdminDemoIssuesViewProps {
  onNavigate: (view: string, id?: string | null) => void;
}

type ViewMode = 'table' | 'kanban' | 'card';

export default function AdminDemoIssuesView({ onNavigate }: AdminDemoIssuesViewProps) {
  const { issues, updateIssueStatus } = useDemo();
  const [filter, setFilter] = useState('all');
  const [viewMode, setViewMode] = useState<ViewMode>('table');
  const [search, setSearch] = useState('');
  
  const filteredIssues = issues.filter(issue => {
    if (filter !== 'all' && issue.status !== filter && (filter === 'pending' && issue.status !== 'Reported')) return false;
    if (search && !issue.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const getStatusConfig = (status: string) => {
    switch(status) {
      case 'verified': return { icon: AlertCircle, color: 'text-indigo-400', bg: 'bg-indigo-500/10 border-indigo-500/20' };
      case 'in_progress': return { icon: Activity, color: 'text-purple-400', bg: 'bg-purple-500/10 border-purple-500/20' };
      case 'resolved': return { icon: CheckCircle, color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' };
      default: return { icon: Clock, color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20' };
    }
  };

  const getSeverityConfig = (urgency: string) => {
    const level = (urgency || '').toLowerCase();
    if (level === 'critical') return 'text-rose-400 bg-rose-500/10 border-rose-500/30';
    if (level === 'high') return 'text-amber-400 bg-amber-500/10 border-amber-500/30';
    return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
  };

  return (
    <div className="min-h-screen bg-transparent relative overflow-hidden pb-24 selection:bg-indigo-500/30 text-white">
      {/* Ambient noise & glows */}
      <div className="absolute inset-0 z-0 bg-[url('/noise.png')] opacity-[0.03] pointer-events-none mix-blend-overlay" />
      <div className="absolute top-[20%] -right-[100px] w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 md:pt-12 relative z-10">
        
        {/* Header & Controls */}
        <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="mb-8">
          <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-6 mb-8">
            <div>
              <motion.h1 variants={fadeUp} className="text-4xl font-black text-white tracking-tight mb-2">Issue Management</motion.h1>
              <motion.p variants={fadeUp} className="text-gray-400 font-medium">Enterprise view of all community reports and workflow states.</motion.p>
            </div>

            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-4">
              <div className="flex bg-[#0a0f1c]/80 backdrop-blur-xl border border-white/10 rounded-xl p-1">
                <button onClick={() => setViewMode('table')} className={`p-2 rounded-lg transition-colors ${viewMode === 'table' ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-white'}`}>
                  <Table2 className="w-4 h-4" />
                </button>
                <button onClick={() => setViewMode('kanban')} className={`p-2 rounded-lg transition-colors ${viewMode === 'kanban' ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-white'}`}>
                  <Kanban className="w-4 h-4" />
                </button>
                <button onClick={() => setViewMode('card')} className={`p-2 rounded-lg transition-colors ${viewMode === 'card' ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-white'}`}>
                  <LayoutGrid className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center bg-[#0a0f1c]/80 backdrop-blur-xl border border-white/10 rounded-xl px-4 py-2">
                <Search className="w-4 h-4 text-gray-400 mr-2" />
                <input 
                  type="text" 
                  placeholder="Search issues..." 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="bg-transparent border-none text-sm text-white placeholder:text-gray-600 focus:outline-none focus:ring-0 w-[200px]"
                />
              </div>

              <div className="flex items-center gap-2 bg-[#0a0f1c]/80 backdrop-blur-xl border border-white/10 rounded-xl px-4 py-2">
                <Filter className="w-4 h-4 text-indigo-400" />
                <select 
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="bg-transparent text-sm font-bold text-white outline-none border-none focus:ring-0 cursor-pointer [&>option]:bg-[#0a0f1c]"
                >
                  <option value="all">All Statuses</option>
                  <option value="pending">Pending</option>
                  <option value="verified">Verified</option>
                  <option value="in_progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                </select>
              </div>

              <button className="px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm font-bold text-white hover:bg-white/10 transition-colors flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4" /> Filters
              </button>
            </motion.div>
          </div>
        </motion.div>

        {/* View Switcher Content */}
        <AnimatePresence mode="wait">
          
          {/* TABLE VIEW */}
          {viewMode === 'table' && (
            <motion.div 
              key="table"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-[#0a0f1c]/80 backdrop-blur-3xl rounded-[2rem] border border-white/10 shadow-2xl overflow-hidden ring-1 ring-white/5"
            >
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[1000px]">
                  <thead>
                    <tr className="bg-white/5 border-b border-white/10 text-[10px] uppercase tracking-widest text-gray-500">
                      <th className="px-6 py-4 font-black">Issue Title</th>
                      <th className="px-6 py-4 font-black">Category</th>
                      <th className="px-6 py-4 font-black">Priority</th>
                      <th className="px-6 py-4 font-black">Status</th>
                      <th className="px-6 py-4 font-black">Reporter</th>
                      <th className="px-6 py-4 font-black text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    {filteredIssues.map((issue, idx) => {
                      const statConf = getStatusConfig(issue.status);
                      const StatIcon = statConf.icon;
                      return (
                        <motion.tr 
                          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: idx * 0.05 }}
                          key={issue.id} 
                          className="hover:bg-white/5 transition-colors group cursor-pointer"
                          onClick={() => onNavigate('issue_details', issue.id)}
                        >
                          <td className="px-6 py-5">
                            <div className="font-bold text-white mb-1 group-hover:text-indigo-400 transition-colors line-clamp-1">{issue.title}</div>
                            <div className="text-[10px] uppercase tracking-widest text-gray-500 flex items-center gap-2">
                              {issue.id.slice(0,8)} • {formatDistanceToNow(new Date(issue.created_at), { addSuffix: true })}
                            </div>
                          </td>
                          <td className="px-6 py-5">
                            <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest bg-white/5 border border-white/10 text-gray-300">
                              {issue.category}
                            </span>
                          </td>
                          <td className="px-6 py-5">
                            <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border ${getSeverityConfig(issue.urgency || '')}`}>
                              {issue.urgency || 'Normal'}
                            </span>
                          </td>
                          <td className="px-6 py-5">
                            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-[10px] font-black uppercase tracking-widest ${statConf.bg} ${statConf.color}`}>
                              <StatIcon className="w-3 h-3" />
                              {(issue.status === 'Reported' ? 'Pending' : issue.status).replace('_', ' ')}
                            </div>
                          </td>
                          <td className="px-6 py-5">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-black border border-white/10 overflow-hidden">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${issue.user_id}`} alt="User" />
                              </div>
                              <div className="text-xs font-bold text-white">{issue.user_name || 'Anonymous'}</div>
                            </div>
                          </td>
                          <td className="px-6 py-5 text-right">
                            <button className="p-2 text-gray-500 hover:text-white hover:bg-white/10 rounded-lg transition-colors" onClick={(e) => e.stopPropagation()}>
                              <MoreHorizontal className="w-5 h-5" />
                            </button>
                          </td>
                        </motion.tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* KANBAN VIEW (Simulated) */}
          {viewMode === 'kanban' && (
            <motion.div 
              key="kanban"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex gap-6 overflow-x-auto pb-8 snap-x"
            >
              {['pending', 'verified', 'in_progress', 'resolved'].map(colStatus => {
                const colIssues = issues.filter(i => (colStatus === 'pending' ? (i.status === 'pending' || i.status === 'Reported') : i.status === colStatus));
                const statConf = getStatusConfig(colStatus);
                const StatIcon = statConf.icon;

                return (
                  <div key={colStatus} className="min-w-[350px] w-[350px] shrink-0 bg-[#0a0f1c]/80 backdrop-blur-3xl rounded-[2.5rem] border border-white/10 ring-1 ring-white/5 flex flex-col snap-center">
                    <div className="p-6 border-b border-white/10 flex items-center justify-between">
                      <div className={`flex items-center gap-2 font-black uppercase tracking-widest text-xs ${statConf.color}`}>
                        <StatIcon className="w-4 h-4" />
                        {colStatus.replace('_', ' ')}
                      </div>
                      <div className="w-6 h-6 rounded-full bg-white/5 text-gray-400 flex items-center justify-center text-[10px] font-bold border border-white/10">
                        {colIssues.length}
                      </div>
                    </div>
                    <div className="p-4 flex-1 overflow-y-auto space-y-4">
                      {colIssues.map(issue => (
                        <div key={issue.id} className="p-5 rounded-2xl bg-[#050505] border border-white/10 hover:border-indigo-500/50 hover:-translate-y-1 transition-all cursor-pointer shadow-xl group">
                          <div className="flex justify-between items-start mb-3">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-widest border ${getSeverityConfig(issue.urgency || '')}`}>
                              {issue.urgency || 'Normal'}
                            </span>
                            <MoreHorizontal className="w-4 h-4 text-gray-600 group-hover:text-white transition-colors" />
                          </div>
                          <h4 className="text-sm font-bold text-white mb-2 line-clamp-2">{issue.title}</h4>
                          <p className="text-xs text-gray-500 line-clamp-2 mb-4">{issue.description}</p>
                          <div className="flex items-center justify-between pt-4 border-t border-white/5">
                            <div className="w-6 h-6 rounded-full bg-black border border-white/10 overflow-hidden">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${issue.user_id}`} alt="User" />
                            </div>
                            <div className="text-[9px] font-black uppercase tracking-widest text-gray-600">
                              {formatDistanceToNow(new Date(issue.created_at), { addSuffix: true })}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </motion.div>
          )}

          {/* CARD VIEW */}
          {viewMode === 'card' && (
            <motion.div 
              key="card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {filteredIssues.map((issue, idx) => {
                const statConf = getStatusConfig(issue.status);
                const StatIcon = statConf.icon;
                return (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: idx * 0.05 }}
                    key={issue.id}
                    onClick={() => onNavigate('issue_details', issue.id)}
                    className="bg-[#0a0f1c]/80 backdrop-blur-3xl rounded-[2rem] border border-white/10 ring-1 ring-white/5 overflow-hidden hover:shadow-[0_0_40px_rgba(99,102,241,0.15)] hover:border-indigo-500/30 hover:-translate-y-1 transition-all cursor-pointer group"
                  >
                    <div className="h-40 bg-[#050505] relative overflow-hidden">
                      {issue.image_url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={issue.image_url} alt="Issue" className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center opacity-20"><LayoutGrid className="w-12 h-12 text-white" /></div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1c] to-transparent pointer-events-none" />
                      <div className="absolute top-3 left-3 flex gap-2">
                         <div className={`px-2 py-1 rounded-md text-[9px] font-black uppercase tracking-widest border backdrop-blur-md ${statConf.bg} ${statConf.color}`}>
                          {(issue.status === 'Reported' ? 'Pending' : issue.status).replace('_', ' ')}
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-3 gap-2">
                        <h3 className="text-lg font-black text-white line-clamp-1">{issue.title}</h3>
                        <div className={`shrink-0 px-2 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-widest border ${getSeverityConfig(issue.urgency || '')}`}>
                          {issue.urgency || 'Normal'}
                        </div>
                      </div>
                      <p className="text-xs text-gray-400 line-clamp-2 mb-4">{issue.description}</p>
                      
                      <div className="flex items-center justify-between border-t border-white/10 pt-4">
                        <div className="flex items-center gap-2">
                           <div className="w-6 h-6 rounded-full bg-black border border-white/10 overflow-hidden">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${issue.user_id}`} alt="User" />
                            </div>
                            <span className="text-[10px] font-bold text-gray-300">{issue.user_name || 'Anon'}</span>
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-600">
                          {formatDistanceToNow(new Date(issue.created_at))} ago
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
