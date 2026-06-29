'use client';

import React from 'react';
import { FileText, ThumbsUp, MessageCircle } from 'lucide-react';
import { motion, useSpring, useTransform } from 'framer-motion';
import { fadeUp } from '@/design-system/motion/variants';

interface QuickStatsProps {
  totalReports: number;
  totalSupports: number;
  totalComments: number;
}

function AnimatedCounter({ value }: { value: number }) {
  const spring = useSpring(0, { stiffness: 50, damping: 20 });
  const display = useTransform(spring, (current) => Math.floor(current));

  React.useEffect(() => {
    spring.set(value);
  }, [value, spring]);

  return <motion.span>{display}</motion.span>;
}

export default function QuickStats({ totalReports, totalSupports, totalComments }: QuickStatsProps) {
  const stats = [
    {
      label: 'Total Reports',
      value: totalReports,
      icon: FileText,
      color: 'bg-indigo-500',
      textColor: 'text-indigo-400',
      bg: 'bg-indigo-500/10 border-indigo-500/20',
      trend: '+12% this month',
      trendColor: 'text-emerald-400'
    },
    {
      label: 'Total Supports',
      value: totalSupports,
      icon: ThumbsUp,
      color: 'bg-emerald-500',
      textColor: 'text-emerald-400',
      bg: 'bg-emerald-500/10 border-emerald-500/20',
      trend: '+5% this month',
      trendColor: 'text-emerald-400'
    },
    {
      label: 'Total Comments',
      value: totalComments,
      icon: MessageCircle,
      color: 'bg-purple-500',
      textColor: 'text-purple-400',
      bg: 'bg-purple-500/10 border-purple-500/20',
      trend: 'Steady',
      trendColor: 'text-gray-400'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8 mb-8">
      {stats.map((stat) => (
        <motion.div 
          key={stat.label}
          variants={fadeUp}
          className="bg-[#0a0f1c]/40 backdrop-blur-3xl rounded-[2rem] p-8 border border-white/5 shadow-[0_15px_30px_rgba(0,0,0,0.4)] relative overflow-hidden group transition-all duration-500 hover:bg-white/5 ring-1 ring-white/5"
        >
          <div className="flex items-center gap-4 mb-6 relative z-10">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${stat.bg}`}>
              <stat.icon className={`w-4 h-4 ${stat.textColor}`} />
            </div>
            <h3 className="font-bold text-gray-400 text-xs uppercase tracking-widest">{stat.label}</h3>
          </div>
          <div className="flex flex-col gap-1 relative z-10">
            <p className="text-5xl font-extrabold text-white tracking-tighter mb-2">
              <AnimatedCounter value={stat.value} />
            </p>
            <span className={`text-xs font-bold ${stat.trendColor} tracking-wide uppercase`}>
              {stat.trend}
            </span>
          </div>
          
          {/* Subtle glow */}
          <div className={`absolute -bottom-10 -right-10 w-40 h-40 ${stat.color}/10 blur-[50px] rounded-full pointer-events-none group-hover:scale-150 group-hover:opacity-100 opacity-30 transition-all duration-700`} />
        </motion.div>
      ))}
    </div>
  );
}
