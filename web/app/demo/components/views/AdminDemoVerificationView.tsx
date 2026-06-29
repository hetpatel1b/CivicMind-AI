'use client';

import React, { useState } from 'react';
import { useDemo } from '../../context/DemoProvider';
import { MapPin, CheckCircle, XCircle, AlertTriangle, ShieldAlert, GitMerge, FileWarning, Eye, ChevronRight, Activity, Zap } from 'lucide-react';
import { formatDistanceToNow } from '@/lib/utils/date';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeUp, staggerContainer } from '@/design-system/motion/variants';

interface AdminDemoVerificationViewProps {
  onNavigate: (view: string, id?: string | null) => void;
}

export default function AdminDemoVerificationView({ onNavigate }: AdminDemoVerificationViewProps) {
  const { issues, updateIssueStatus } = useDemo();
  
  const pendingIssues = issues.filter(i => i.status === 'pending' || i.status === 'Reported');
  const [processingId, setProcessingId] = useState<string | null>(null);

  const handleAction = async (issueId: string, action: 'VERIFY' | 'REJECT' | 'MERGE' | 'FLAG') => {
    setProcessingId(issueId);
    
    // Simulate network delay
    await new Promise(r => setTimeout(r, 800));

    if (action === 'VERIFY') {
      updateIssueStatus(issueId, 'verified');
    } else if (action === 'REJECT') {
      updateIssueStatus(issueId, 'rejected');
    } else {
      updateIssueStatus(issueId, 'verified'); // Mock resolve
    }
    
    setProcessingId(null);
  };

  return (
    <div className="min-h-screen bg-transparent relative overflow-hidden pb-24 selection:bg-indigo-500/30 text-white">
      {/* Background ambient noise and glows */}
      <div className="absolute inset-0 z-0 bg-[url('/noise.png')] opacity-[0.03] pointer-events-none mix-blend-overlay" />
      <div className="absolute top-[10%] right-0 w-[600px] h-[600px] bg-rose-600/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-[40%] -left-[200px] w-[800px] h-[800px] bg-indigo-600/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 md:pt-12 relative z-10">
        
        {/* Page Header */}
        <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="mb-12">
          <motion.div variants={fadeUp} className="flex items-center gap-3 mb-4">
            <div className="px-3 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-rose-300 shadow-[0_0_15px_rgba(225,29,72,0.2)]">
              <div className="w-2 h-2 rounded-full bg-rose-400 animate-pulse" />
              Live Moderation
            </div>
          </motion.div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-none">
              Issue <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-orange-400">Verification</span>
            </motion.h1>
            <motion.div variants={fadeUp} className="flex gap-4">
              <div className="px-6 py-3 rounded-2xl bg-[#0a0f1c]/80 backdrop-blur-xl border border-white/10 flex items-center gap-4">
                <div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-gray-500">Pending</div>
                  <div className="text-2xl font-black text-white">{pendingIssues.length}</div>
                </div>
                <div className="w-10 h-10 rounded-full bg-rose-500/10 flex items-center justify-center text-rose-400 border border-rose-500/20">
                  <Activity className="w-5 h-5" />
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {pendingIssues.length === 0 ? (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="p-12 text-center bg-[#0a0f1c]/80 backdrop-blur-3xl rounded-[2.5rem] border border-emerald-500/20 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/10 to-transparent pointer-events-none" />
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-500/10 text-emerald-400 mb-6 border border-emerald-500/20">
              <CheckCircle className="w-10 h-10" />
            </div>
            <h3 className="text-3xl font-black text-white tracking-tight mb-2">Queue Cleared</h3>
            <p className="text-gray-400 font-medium max-w-md mx-auto">There are no pending issues requiring moderation. The community is healthy.</p>
          </motion.div>
        ) : (
          <div className="space-y-8">
            <AnimatePresence mode="popLayout">
              {pendingIssues.map((issue, idx) => (
                <motion.div 
                  key={issue.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="bg-[#0a0f1c]/80 backdrop-blur-3xl rounded-[2.5rem] border border-white/10 ring-1 ring-white/5 overflow-hidden shadow-2xl group relative"
                >
                  {processingId === issue.id && (
                    <div className="absolute inset-0 z-50 bg-[#050505]/60 backdrop-blur-sm flex items-center justify-center">
                      <div className="w-12 h-12 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
                    </div>
                  )}

                  <div className="flex flex-col xl:flex-row">
                    {/* Media Gallery */}
                    <div className="xl:w-[400px] h-[300px] xl:h-auto relative bg-[#050505] overflow-hidden shrink-0">
                      {issue.image_url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img 
                          src={issue.image_url} 
                          alt="Evidence" 
                          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full w-full bg-[#0a0f1c]">
                          <Eye className="w-10 h-10 text-white/10" />
                        </div>
                      )}
                      
                      {/* AI Scan Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none" />
                      <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                        <div className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 border backdrop-blur-md ${(issue.severity || '').toLowerCase() === 'critical' ? 'bg-rose-500/20 text-rose-300 border-rose-500/30' : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'}`}>
                          <AlertTriangle className="w-3 h-3" />
                          {(issue.severity || 'Medium').toUpperCase()}
                        </div>
                        <div className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center cursor-pointer hover:bg-white/10 transition-colors">
                          <Eye className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="flex-1 p-8 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start gap-4 mb-4">
                          <div>
                            <div className="flex items-center gap-3 mb-3">
                              <span className="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-[10px] font-black uppercase tracking-widest">
                                {issue.category}
                              </span>
                              <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">
                                {formatDistanceToNow(new Date(issue.created_at), { addSuffix: true })}
                              </span>
                            </div>
                            <h3 className="text-2xl font-black text-white tracking-tight mb-2 leading-tight">{issue.title}</h3>
                            <p className="text-gray-400 text-sm leading-relaxed max-w-3xl">{issue.description}</p>
                          </div>
                          
                          {/* Reporter Info */}
                          <div className="shrink-0 p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center min-w-[140px]">
                            <div className="w-12 h-12 rounded-xl bg-black border border-white/10 flex items-center justify-center mb-2 overflow-hidden">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${issue.user_id}`} alt="User" className="w-full h-full opacity-80" />
                            </div>
                            <div className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1">Reporter</div>
                            <div className="text-sm font-bold text-white text-center line-clamp-1">{issue.user_name || 'Anonymous'}</div>
                            <div className="text-[10px] font-black text-emerald-400 mt-1">94 Trust Score</div>
                          </div>
                        </div>

                        {/* AI Intelligence Block */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                          <div className="p-4 rounded-2xl bg-indigo-500/5 border border-indigo-500/10">
                            <div className="flex items-center gap-2 mb-2">
                              <Zap className="w-4 h-4 text-indigo-400" />
                              <span className="text-[10px] font-black uppercase tracking-widest text-indigo-300">AI Confidence</span>
                            </div>
                            <div className="flex items-end justify-between">
                              <div className="text-2xl font-black text-white">92%</div>
                              <div className="text-xs font-bold text-emerald-400">High</div>
                            </div>
                            <div className="w-full h-1 bg-black rounded-full mt-3 overflow-hidden">
                              <div className="h-full bg-indigo-500 w-[92%]" />
                            </div>
                          </div>

                          <div className="p-4 rounded-2xl bg-rose-500/5 border border-rose-500/10">
                            <div className="flex items-center gap-2 mb-2">
                              <GitMerge className="w-4 h-4 text-rose-400" />
                              <span className="text-[10px] font-black uppercase tracking-widest text-rose-300">Duplicate Prob.</span>
                            </div>
                            <div className="flex items-end justify-between">
                              <div className="text-2xl font-black text-white">14%</div>
                              <div className="text-xs font-bold text-emerald-400">Low</div>
                            </div>
                            <div className="w-full h-1 bg-black rounded-full mt-3 overflow-hidden">
                              <div className="h-full bg-rose-500 w-[14%]" />
                            </div>
                          </div>

                          <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                            <div className="flex items-center gap-2 mb-2">
                              <MapPin className="w-4 h-4 text-gray-400" />
                              <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Location Data</span>
                            </div>
                            <div className="text-sm font-bold text-white line-clamp-2">{issue.address || 'Geo-coordinates verified'}</div>
                            <div className="text-xs font-bold text-indigo-400 mt-2 hover:text-indigo-300 cursor-pointer flex items-center">
                              View on Map <ChevronRight className="w-3 h-3 ml-1" />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Action Bar */}
                      <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap gap-4">
                        <button 
                          onClick={() => handleAction(issue.id, 'VERIFY')}
                          disabled={processingId === issue.id}
                          className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-8 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-black rounded-xl font-black uppercase tracking-widest text-xs transition-colors"
                        >
                          <CheckCircle className="w-4 h-4" />
                          Approve
                        </button>
                        <button 
                          onClick={() => handleAction(issue.id, 'REJECT')}
                          disabled={processingId === issue.id}
                          className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-8 py-3.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 rounded-xl font-black uppercase tracking-widest text-xs transition-colors"
                        >
                          <XCircle className="w-4 h-4" />
                          Reject
                        </button>
                        
                        <div className="flex-1 hidden sm:block"></div>

                        <button 
                          onClick={() => handleAction(issue.id, 'MERGE')}
                          disabled={processingId === issue.id}
                          className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl font-black uppercase tracking-widest text-xs transition-colors"
                        >
                          <GitMerge className="w-4 h-4" />
                          Merge
                        </button>
                        <button 
                          onClick={() => handleAction(issue.id, 'FLAG')}
                          disabled={processingId === issue.id}
                          className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3.5 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/20 text-amber-400 rounded-xl font-black uppercase tracking-widest text-xs transition-colors"
                        >
                          <FileWarning className="w-4 h-4" />
                          Flag
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
