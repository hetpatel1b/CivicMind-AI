'use client';

import React from 'react';
import { Activity, CheckCircle2, MessageSquare, AlertCircle, TrendingUp, HelpCircle } from 'lucide-react';
import EmptyState from './EmptyState';
import { motion } from 'framer-motion';
import { fadeUp } from '@/design-system/motion/variants';


interface ReputationEvent {
  id: string;
  type: string;
  points: number;
  created_at: string;
}

interface RecentActivityProps {
  events: ReputationEvent[];
}

const getEventConfig = (type: string) => {
  switch (type) {
    case 'ISSUE_REPORTED': 
      return { label: 'Reported a civic issue', icon: AlertCircle, color: 'text-orange-400', bg: 'bg-orange-500/20 border-orange-500/30 glow-orange' };
    case 'ISSUE_SUPPORTED': 
      return { label: 'Supported an issue', icon: TrendingUp, color: 'text-blue-400', bg: 'bg-blue-500/20 border-blue-500/30 glow-blue' };
    case 'COMMENT_CREATED': 
      return { label: 'Commented on an issue', icon: MessageSquare, color: 'text-purple-400', bg: 'bg-purple-500/20 border-purple-500/30 glow-purple' };
    case 'ISSUE_VERIFIED': 
      return { label: 'Issue was verified', icon: CheckCircle2, color: 'text-emerald-400', bg: 'bg-emerald-500/20 border-emerald-500/30 glow-emerald' };
    case 'ISSUE_RESOLVED': 
      return { label: 'Issue was resolved', icon: CheckCircle2, color: 'text-emerald-400', bg: 'bg-emerald-500/20 border-emerald-500/30 glow-emerald' };
    default: 
      return { label: type.replace(/_/g, ' '), icon: HelpCircle, color: 'text-gray-400', bg: 'bg-white/10 border-white/20 glow-gray' };
  }
};

export default function RecentActivity({ events }: RecentActivityProps) {
  return (
    <motion.div 
      variants={fadeUp}
      className="bg-[#0a0f1c]/40 backdrop-blur-3xl rounded-[2rem] p-8 border border-white/5 shadow-[0_15px_30px_rgba(0,0,0,0.4)] h-full flex flex-col ring-1 ring-white/5 relative overflow-hidden"
    >
      <div className="flex items-center justify-between mb-10 relative z-10">
        <h3 className="font-bold text-white flex items-center gap-3 text-lg tracking-tight">
          <div className="p-2 bg-blue-500/20 border border-blue-500/30 rounded-lg shadow-inner">
            <Activity className="w-4 h-4 text-blue-400" />
          </div>
          Recent Activity
        </h3>
      </div>

      <div className="flex-1 flex flex-col relative z-10">
        {events.length === 0 ? (
          <EmptyState 
            icon={Activity} 
            title="No recent activity" 
            description="Your reputation events will appear here once you start participating." 
          />
        ) : (
          <div className="relative pl-8 border-l border-white/10 space-y-10 flex-1 mt-2 before:absolute before:inset-0 before:bg-gradient-to-b before:from-transparent before:via-blue-500/20 before:to-transparent before:-left-px before:w-[1px]">
            {events.map((event) => {
              const config = getEventConfig(event.type);
              const isPositive = event.points > 0;
              const Icon = config.icon;
              
              return (
                <div key={event.id} className="relative group">
                  {/* Timeline Dot */}
                  <div className={`absolute -left-[49px] w-10 h-10 rounded-full flex items-center justify-center border shadow-inner ${config.bg.split('glow')[0]} group-hover:scale-110 transition-transform duration-300 backdrop-blur-md z-10`}>
                    <Icon className={`w-4 h-4 ${config.color}`} />
                  </div>
                  
                  {/* Glow effect behind dot */}
                  <div className={`absolute -left-[49px] w-10 h-10 rounded-full blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-300 ${config.bg.split('glow')[0]}`} />
                  
                  {/* Content */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pl-2">
                    <div>
                      <p className="text-sm font-bold text-white tracking-wide mb-1.5">
                        {config.label}
                      </p>
                      <time className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em]">
                        {new Date(event.created_at).toLocaleString()}
                      </time>
                    </div>
                    
                    <div className={`inline-flex items-center justify-center px-3 py-1.5 rounded border text-[10px] font-bold uppercase tracking-widest ${isPositive ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.1)]' : 'bg-red-500/10 text-red-400 border-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.1)]'}`}>
                      {isPositive ? '+' : '-'}{Math.abs(event.points)} XP
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </motion.div>
  );
}
