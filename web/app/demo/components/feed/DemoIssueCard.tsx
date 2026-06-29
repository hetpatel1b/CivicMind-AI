'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Calendar, MapPin, ShieldAlert, CheckCircle2, Clock, ThumbsUp, MessageSquare, Share2, Bookmark, Sparkles, Verified, Play, ChevronRight, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Using any for Demo issue type to match context/DemoProvider mock
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function DemoIssueCard({ issue, onCardClick }: { issue: any, onCardClick?: (e: React.MouseEvent, id: string) => void }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const formattedDate = new Date(issue.created_at).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });

  const seed = issue.id.split('').reduce((acc: number, char: string) => acc + char.charCodeAt(0), 0);
  const mockVotes = (seed % 250) + 42;
  const mockComments = (seed % 65) + 8;
  const mockDistance = ((seed % 50) / 10 + 0.2).toFixed(1);
  const isVerified = seed % 2 === 0;
  const hasAiSummary = seed % 3 !== 0;
  const hasVideo = seed % 5 === 0;
  
  // Fake timeline
  const progressPercentage = (seed % 60) + 20;

  const getSeverityStyles = (severity: string) => {
    switch ((severity || 'LOW').toUpperCase()) {
      case 'CRITICAL': return 'bg-rose-500/20 text-rose-300 border-rose-500/40 ring-rose-500/30';
      case 'HIGH': return 'bg-amber-500/20 text-amber-300 border-amber-500/40 ring-amber-500/30';
      case 'MEDIUM': return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 ring-emerald-500/30';
      default: return 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40 ring-indigo-500/30';
    }
  };

  const getStatusConfig = (status: string) => {
    const s = status?.toLowerCase() || '';
    if (s === 'resolved' || s === 'closed') {
      return { icon: CheckCircle2, text: 'Resolved', styles: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30' };
    }
    if (s === 'in progress' || s === 'in-progress') {
      return { icon: Clock, text: 'In Progress', styles: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/30' };
    }
    return { icon: ShieldAlert, text: 'Open', styles: 'text-rose-400 bg-rose-500/10 border-rose-500/30' };
  };

  const statusConfig = getStatusConfig(issue.status);
  const StatusIcon = statusConfig.icon;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex flex-col h-full bg-[#0a0f1c]/80 backdrop-blur-3xl border border-white/10 rounded-[2rem] overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.4)] hover:shadow-[0_20px_50px_rgba(99,102,241,0.2)] transition-all duration-500"
    >
      {/* Dynamic Gradient Background based on severity on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 via-transparent to-purple-500/0 group-hover:from-indigo-500/5 group-hover:to-purple-500/10 transition-colors duration-700 pointer-events-none z-0" />
      
      {/* Top Media Section */}
      <div 
        className="relative w-full overflow-hidden shrink-0 cursor-pointer z-10"
        style={{ height: hasVideo ? '280px' : '220px' }}
        onClick={(e) => onCardClick?.(e, issue.id)}
      >
        {issue.image_url ? (
          <div className="relative w-full h-full bg-[#050505]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={issue.image_url} 
              alt={issue.title} 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-90 group-hover:opacity-100"
              loading="lazy"
            />
            {hasVideo && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-[0_0_30px_rgba(0,0,0,0.5)] group-hover:scale-110 transition-transform duration-500">
                  <Play className="w-6 h-6 text-white fill-white ml-1" />
                </div>
              </div>
            )}
            {/* Soft gradient to blend with card body */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1c] via-[#0a0f1c]/40 to-transparent opacity-100" />
          </div>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-[#050505] relative">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/20 to-transparent" />
            <MapPin className="w-12 h-12 mb-3 text-indigo-500/40" />
            <span className="text-sm font-bold tracking-widest uppercase text-gray-600">Civic Location</span>
          </div>
        )}

        {/* Floating Metrics overlaid on image */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-20">
          <div className={`flex items-center px-3 py-1.5 rounded-xl text-[10px] font-black tracking-widest uppercase backdrop-blur-md border ${statusConfig.styles}`}>
            <StatusIcon className="w-3.5 h-3.5 mr-1.5" />
            {statusConfig.text}
          </div>
          <div className="flex gap-2">
            {isVerified && (
              <div className="flex items-center px-2 py-1.5 rounded-xl bg-emerald-500/20 backdrop-blur-md border border-emerald-500/30 text-emerald-300">
                <Verified className="w-4 h-4" />
              </div>
            )}
            {hasAiSummary && (
              <div className="flex items-center px-2 py-1.5 rounded-xl bg-indigo-500/20 backdrop-blur-md border border-indigo-500/30 text-indigo-300">
                <Sparkles className="w-4 h-4" />
              </div>
            )}
          </div>
        </div>

        {/* Reporter info floating bottom left of image area */}
        <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between z-20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full border-2 border-[#0a0f1c] overflow-hidden bg-indigo-900 shadow-lg shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${issue.user_name || issue.user_id}`} alt="Avatar" className="w-full h-full" />
            </div>
            <div>
              <div className="text-sm font-bold text-white drop-shadow-md">{issue.user_name || 'Citizen User'}</div>
              <div className="text-[10px] font-black tracking-widest uppercase text-indigo-300 drop-shadow-md flex items-center gap-1">
                <MapPin className="w-3 h-3" /> {mockDistance} mi away
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Body */}
      <div className="flex flex-col flex-grow p-6 pt-5 relative z-10">
        
        {/* Categories */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black border uppercase tracking-widest shadow-inner ${getSeverityStyles(issue.severity)}`}>
            {issue.severity || 'Medium'} Priority
          </span>
          <span className="px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest bg-white/5 text-gray-300 border border-white/10">
            {issue.category}
          </span>
        </div>

        <Link 
          href={`/demo/citizen/issues/${issue.id}`} 
          className="block mb-3 focus:outline-none"
          onClick={(e) => onCardClick?.(e, issue.id)}
        >
          <h3 className="text-xl font-black text-white leading-tight group-hover:text-indigo-400 transition-colors">
            {issue.title}
          </h3>
        </Link>
        
        <p className="text-sm text-gray-400 line-clamp-3 mb-5 font-medium leading-relaxed">
          {issue.description}
        </p>

        {/* AI Insight Snippet */}
        {hasAiSummary && (
          <div className="mb-5 p-4 rounded-2xl bg-indigo-500/5 border border-indigo-500/10 relative overflow-hidden group-hover:bg-indigo-500/10 transition-colors duration-500">
            <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500/50" />
            <div className="flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-black text-indigo-300 uppercase tracking-widest mb-1.5">AI Impact Analysis</h4>
                <p className="text-xs text-indigo-200/70 font-medium leading-relaxed">
                  High community impact detected. Recommended action involves immediate local authority dispatch.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Progress Timeline for in-progress or resolved */}
        {statusConfig.text !== 'Open' && (
          <div className="mb-6">
            <div className="flex justify-between text-[10px] font-black uppercase tracking-widest mb-2 text-gray-400">
              <span>Resolution Progress</span>
              <span className="text-emerald-400">{progressPercentage}%</span>
            </div>
            <div className="w-full h-1.5 bg-[#050505] rounded-full overflow-hidden border border-white/5 shadow-inner">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 1, delay: 0.2 }}
                className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-full"
              />
            </div>
          </div>
        )}

        {/* Actions Footer */}
        <div className="mt-auto pt-5 border-t border-white/5 flex items-center justify-between">
          
          <div className="flex items-center gap-5">
            <button 
              onClick={() => setIsLiked(!isLiked)}
              className={`flex items-center gap-2 text-sm font-bold transition-colors ${isLiked ? 'text-indigo-400' : 'text-gray-400 hover:text-white'}`}
            >
              <ThumbsUp className={`w-4 h-4 ${isLiked ? 'fill-indigo-400' : ''}`} />
              {mockVotes + (isLiked ? 1 : 0)}
            </button>
            <button className="flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-white transition-colors">
              <MessageSquare className="w-4 h-4" />
              {mockComments}
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-500 mr-2 flex items-center gap-1.5 hidden sm:flex">
              <Calendar className="w-3 h-3" />
              {formattedDate}
            </span>
            <button 
              onClick={() => setIsBookmarked(!isBookmarked)}
              className={`p-2 rounded-xl transition-all ${isBookmarked ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30' : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-transparent'}`}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-indigo-400' : ''}`} />
            </button>
            <button className="p-2 rounded-xl bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white transition-all">
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </motion.div>
  );
}
