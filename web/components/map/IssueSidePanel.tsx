'use client';

import React, { useState } from 'react';
import { MapPin, X, Loader2, Sparkles, Navigation, Clock, ShieldCheck, Map as MapIcon, Share2, ThumbsUp, MessageSquare, ShieldAlert, CheckCircle2, Calendar, Building, AlertCircle, ExternalLink } from 'lucide-react';
import { MapIssue } from '@/types/map';
import Link from 'next/link';
import { Badge } from '@/design-system/components/Badge';
import { motion, AnimatePresence } from 'framer-motion';

interface IssueSidePanelProps {
  issue: MapIssue;
  onClose: () => void;
}

export default function IssueSidePanel({ issue, onClose }: IssueSidePanelProps) {
  const [activeTab, setActiveTab] = useState<'details' | 'ai'>('details');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiSummary, setAiSummary] = useState<string | null>(null);

  const formattedDate = new Date(issue.created_at).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  const getSeverityStyles = (severity: string) => {
    switch ((severity || 'LOW').toUpperCase()) {
      case 'CRITICAL': return 'bg-red-500/10 text-red-600 border-red-200 dark:border-red-900/50';
      case 'HIGH': return 'bg-orange-500/10 text-orange-600 border-orange-200 dark:border-orange-900/50';
      case 'MEDIUM': return 'bg-yellow-500/10 text-yellow-600 border-yellow-200 dark:border-yellow-900/50';
      default: return 'bg-green-500/10 text-green-600 border-green-200 dark:border-green-900/50';
    }
  };

  const getStatusStyles = (status?: string) => {
    switch (status) {
      case 'resolved': return 'bg-emerald-500/10 text-emerald-600 border-emerald-200 dark:border-emerald-900/50';
      case 'in-progress': return 'bg-blue-500/10 text-blue-600 border-blue-200 dark:border-blue-900/50';
      default: return 'bg-gray-500/10 text-gray-600 border-gray-200 dark:border-gray-800';
    }
  };

  // Mock interaction data
  const seed = issue ? issue.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) : 0;
  const mockVotes = React.useMemo(() => (seed % 50) + 5, [seed]);
  const mockComments = React.useMemo(() => (seed % 20), [seed]);

  const handleGenerateSummary = () => {
    setIsAiLoading(true);
    // Simulate AI loading since actual API wasn't modified
    setTimeout(() => {
      setAiSummary(`This ${issue.severity.toLowerCase()} severity issue was reported on ${formattedDate}. It relates to ${issue.category.toLowerCase()} and is currently marked as ${issue.status}. Given its location and priority, it is recommended to address this promptly to minimize community disruption.`);
      setIsAiLoading(false);
    }, 1500);
  };

  return (
    <motion.div 
      initial={{ x: '100%', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: '100%', opacity: 0 }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="absolute top-0 right-0 h-full w-full sm:w-[420px] bg-[#0a0f1c]/95 backdrop-blur-3xl shadow-[-20px_0_40px_rgba(0,0,0,0.5)] z-[2000] flex flex-col border-l border-white/10 ring-1 ring-white/5 overflow-hidden pointer-events-auto"
    >
      {/* Premium Header */}
      <div className="flex items-center justify-between p-5 border-b border-white/10 shrink-0 bg-transparent z-10">
        <h3 className="font-extrabold text-white tracking-tight truncate pr-4 flex items-center gap-2">
          Issue Intelligence
        </h3>
        <button 
          onClick={onClose}
          className="w-8 h-8 rounded-full flex items-center justify-center bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 hover:scale-105 transition-all border border-white/10 shadow-inner"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-white/10 px-5 pt-2">
        <button 
          onClick={() => setActiveTab('details')}
          className={`pb-3 px-2 text-sm font-bold border-b-2 transition-colors ${
            activeTab === 'details' ? 'border-indigo-400 text-indigo-400' : 'border-transparent text-gray-500 hover:text-gray-300'
          }`}
        >
          Details
        </button>
        <button 
          onClick={() => setActiveTab('ai')}
          className={`pb-3 px-2 text-sm font-bold border-b-2 transition-colors flex items-center gap-1.5 ${
            activeTab === 'ai' ? 'border-indigo-400 text-indigo-400' : 'border-transparent text-gray-500 hover:text-gray-300'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" /> AI Analysis
        </button>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">
          {activeTab === 'details' ? (
            <motion.div 
              key="details"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col h-full"
            >
              {/* Image Header */}
              <div className="w-full aspect-video bg-[#050505] relative group overflow-hidden border-b border-white/5">
                {issue.image_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={issue.image_url} alt={issue.title} className="w-full h-full object-cover group-hover:scale-105 opacity-90 transition-transform duration-700" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-[#050505] to-[#0a0f1c]">
                    <span className="text-gray-600 text-sm font-bold tracking-widest uppercase">No Image</span>
                  </div>
                )}
                
                {/* Floating Tags over image */}
                <div className="absolute top-3 left-3 flex flex-wrap items-start gap-2">
                  <Badge variant="glass" className="px-2.5 py-1 uppercase tracking-wider backdrop-blur-md bg-[#050505]/70 border-white/10 shadow-sm font-bold text-[10px]">
                    {issue.category}
                  </Badge>
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border shadow-[0_0_10px_rgba(0,0,0,0.5)] backdrop-blur-md bg-[#050505]/70 ${getSeverityStyles(issue.severity)}`}>
                    {issue.severity}
                  </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1c] to-transparent opacity-60 pointer-events-none" />
              </div>

              <div className="p-6 flex flex-col gap-6 relative z-10">
                
                {/* Title & Status */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wider border ${getStatusStyles(issue.status)}`}>
                      {issue.status}
                    </span>
                  </div>
                  <h2 className="text-2xl font-extrabold text-white tracking-tight leading-tight mb-3">
                    {issue.title}
                  </h2>
                  <p className="text-sm text-gray-400 leading-relaxed font-medium">
                    {issue.description || 'No detailed description provided for this issue.'}
                  </p>
                </div>

                {/* Social Stats */}
                <div className="flex items-center gap-4 py-3 border-y border-white/10">
                  <div className="flex items-center gap-1.5 text-sm font-bold text-gray-300">
                    <ThumbsUp className="w-4 h-4 text-indigo-400" /> {mockVotes}
                  </div>
                  <div className="flex items-center gap-1.5 text-sm font-bold text-gray-300">
                    <MessageSquare className="w-4 h-4 text-purple-400" /> {mockComments}
                  </div>
                </div>

                {/* Metadata Grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-[#050505]/50 rounded-2xl p-3.5 border border-white/5 shadow-inner flex flex-col gap-1.5">
                    <span className="flex items-center gap-1.5 text-[10px] font-extrabold text-gray-500 uppercase tracking-widest">
                      <Calendar className="w-3.5 h-3.5" /> Date
                    </span>
                    <span className="text-sm font-bold text-white">{formattedDate}</span>
                  </div>
                  <div className="bg-[#050505]/50 rounded-2xl p-3.5 border border-white/5 shadow-inner flex flex-col gap-1.5">
                    <span className="flex items-center gap-1.5 text-[10px] font-extrabold text-gray-500 uppercase tracking-widest">
                      <Building className="w-3.5 h-3.5" /> Dept
                    </span>
                    <span className="text-sm font-bold text-white truncate">{issue.department || 'General'}</span>
                  </div>
                  <div className="col-span-2 bg-[#050505]/50 rounded-2xl p-3.5 border border-white/5 shadow-inner flex flex-col gap-1.5">
                    <span className="flex items-center gap-1.5 text-[10px] font-extrabold text-gray-500 uppercase tracking-widest">
                      <MapPin className="w-3.5 h-3.5" /> Coordinates
                    </span>
                    <span className="text-sm font-mono font-bold text-white tracking-tight">
                      {issue.latitude.toFixed(5)}, {issue.longitude.toFixed(5)}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="ai"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-6 h-full flex flex-col"
            >
              {!aiSummary && !isAiLoading ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center mt-10">
                  <div className="w-16 h-16 bg-indigo-500/10 rounded-full flex items-center justify-center mb-4 border border-indigo-500/30 shadow-[0_0_20px_rgba(99,102,241,0.2)]">
                    <Sparkles className="w-8 h-8 text-indigo-400" />
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2 tracking-tight">AI Issue Summary</h4>
                  <p className="text-sm text-gray-400 mb-6 max-w-[250px]">
                    Generate an intelligent breakdown of this issue&apos;s priority and impact.
                  </p>
                  <button 
                    onClick={handleGenerateSummary}
                    className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold shadow-[0_0_15px_rgba(99,102,241,0.4)] transition-all flex items-center gap-2 text-sm"
                  >
                    Generate Insight
                  </button>
                </div>
              ) : isAiLoading ? (
                <div className="flex-1 flex flex-col items-center justify-center mt-10">
                  <div className="relative mb-4">
                    <div className="absolute inset-0 bg-indigo-500/20 blur-xl rounded-full" />
                    <div className="w-12 h-12 border-4 border-indigo-500/30 border-t-indigo-400 rounded-full animate-spin relative z-10"></div>
                  </div>
                  <p className="text-sm font-medium text-gray-400 animate-pulse">Analyzing issue data...</p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="bg-indigo-500/10 rounded-3xl p-5 border border-indigo-500/20 shadow-[0_0_15px_rgba(99,102,241,0.1)]">
                    <h4 className="flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-widest text-indigo-300 mb-3">
                      <Sparkles className="w-4 h-4 text-indigo-400" /> AI Executive Summary
                    </h4>
                    <p className="text-sm font-medium text-gray-200 leading-relaxed">
                      {aiSummary}
                    </p>
                  </div>
                  
                  <div className="bg-[#050505]/50 rounded-3xl p-5 border border-white/5 shadow-inner">
                    <h4 className="flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-widest text-gray-500 mb-3">
                      Priority Assessment
                    </h4>
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden border border-white/5">
                        <div className={`h-full rounded-full shadow-[0_0_10px_currentColor] ${
                          issue.severity === 'CRITICAL' ? 'bg-rose-500 w-[95%]' :
                          issue.severity === 'HIGH' ? 'bg-amber-500 w-[75%]' :
                          issue.severity === 'MEDIUM' ? 'bg-emerald-500 w-[50%]' : 'bg-indigo-500 w-[25%]'
                        }`} />
                      </div>
                      <span className="text-xs font-bold text-white w-12 text-right">
                        {issue.severity === 'CRITICAL' ? '95%' : issue.severity === 'HIGH' ? '75%' : issue.severity === 'MEDIUM' ? '50%' : '25%'}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer Quick Actions */}
      <div className="p-4 border-t border-white/10 bg-[#0a0f1c]/80 backdrop-blur-3xl shrink-0 flex gap-2 z-10">
        <Link 
          href={`/issues/${issue.id}`}
          className="flex-1 px-4 py-2.5 bg-white text-[#050505] rounded-xl font-bold flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform shadow-[0_0_15px_rgba(255,255,255,0.2)]"
        >
          View Full <ExternalLink className="w-4 h-4" />
        </Link>
        <button className="px-4 py-2.5 bg-white/5 border border-white/10 text-gray-300 rounded-xl font-bold hover:bg-white/10 hover:text-white transition-colors flex items-center justify-center">
          <Navigation className="w-4 h-4" />
        </button>
        <button className="px-4 py-2.5 bg-white/5 border border-white/10 text-gray-300 rounded-xl font-bold hover:bg-white/10 hover:text-white transition-colors flex items-center justify-center">
          <Share2 className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}
