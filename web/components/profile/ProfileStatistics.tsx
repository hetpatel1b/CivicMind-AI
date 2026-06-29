import React from 'react';
import { ShieldAlert, ThumbsUp, MessageSquare, Award } from 'lucide-react';
import { ReputationSummary } from '@/types/reputation';
import { motion } from 'framer-motion';

interface ProfileStatisticsProps {
  summary: ReputationSummary;
  totalBadges: number;
}

export default function ProfileStatistics({ summary, totalBadges }: ProfileStatisticsProps) {
  const stats = [
    { label: 'Issues Reported', value: summary.totalReports, icon: ShieldAlert, color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20', glow: 'group-hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]', iconGlow: 'drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]' },
    { label: 'Community Supports', value: summary.totalSupports, icon: ThumbsUp, color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20', glow: 'group-hover:shadow-[0_0_20px_rgba(16,185,129,0.3)]', iconGlow: 'drop-shadow-[0_0_8px_rgba(16,185,129,0.8)]' },
    { label: 'Discussions', value: summary.totalComments, icon: MessageSquare, color: 'text-purple-400', bg: 'bg-purple-500/10 border-purple-500/20', glow: 'group-hover:shadow-[0_0_20px_rgba(168,85,247,0.3)]', iconGlow: 'drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]' },
    { label: 'Badges Earned', value: totalBadges, icon: Award, color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20', glow: 'group-hover:shadow-[0_0_20px_rgba(251,191,36,0.3)]', iconGlow: 'drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
      {stats.map((stat, idx) => (
        <motion.div 
          key={idx}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: idx * 0.1 }}
          className={`bg-[#050505]/60 backdrop-blur-3xl rounded-[1.5rem] p-6 shadow-sm border border-white/5 ring-1 ring-white/10 flex flex-col items-center sm:items-start text-center sm:text-left group hover:-translate-y-1 transition-all duration-300 relative overflow-hidden ${stat.glow}`}
        >
          {/* Subtle hover gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          
          <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center mb-4 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6 ${stat.bg} relative z-10`}>
            <stat.icon className={`w-7 h-7 ${stat.color} ${stat.iconGlow}`} />
          </div>
          <span className="text-3xl font-black text-white mb-1 tracking-tight drop-shadow-[0_2px_10px_rgba(255,255,255,0.1)] relative z-10">
            {stat.value.toLocaleString()}
          </span>
          <span className="text-xs text-gray-400 font-black uppercase tracking-widest relative z-10">
            {stat.label}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
