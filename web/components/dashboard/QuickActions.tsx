'use client';

import React from 'react';
import Link from 'next/link';
import { PlusCircle, Map, MessageSquare, Trophy, User, Bell } from 'lucide-react';
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '@/design-system/motion/variants';

export default function QuickActions() {
  const actions = [
    {
      name: 'Report Issue',
      href: '/report',
      icon: PlusCircle,
      color: 'text-indigo-400',
      bg: 'bg-indigo-500/10 group-hover:bg-indigo-500/20',
      border: 'border-indigo-500/20 group-hover:border-indigo-500/40',
      glow: 'group-hover:shadow-[0_0_20px_rgba(99,102,241,0.2)]'
    },
    {
      name: 'Explore Map',
      href: '/map',
      icon: Map,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10 group-hover:bg-emerald-500/20',
      border: 'border-emerald-500/20 group-hover:border-emerald-500/40',
      glow: 'group-hover:shadow-[0_0_20px_rgba(16,185,129,0.2)]'
    },
    {
      name: 'Community',
      href: '/feed',
      icon: MessageSquare,
      color: 'text-purple-400',
      bg: 'bg-purple-500/10 group-hover:bg-purple-500/20',
      border: 'border-purple-500/20 group-hover:border-purple-500/40',
      glow: 'group-hover:shadow-[0_0_20px_rgba(168,85,247,0.2)]'
    },
    {
      name: 'Leaderboard',
      href: '/leaderboard',
      icon: Trophy,
      color: 'text-amber-400',
      bg: 'bg-amber-500/10 group-hover:bg-amber-500/20',
      border: 'border-amber-500/20 group-hover:border-amber-500/40',
      glow: 'group-hover:shadow-[0_0_20px_rgba(245,158,11,0.2)]'
    },
    {
      name: 'Profile',
      href: '/profile',
      icon: User,
      color: 'text-blue-400',
      bg: 'bg-blue-500/10 group-hover:bg-blue-500/20',
      border: 'border-blue-500/20 group-hover:border-blue-500/40',
      glow: 'group-hover:shadow-[0_0_20px_rgba(59,130,246,0.2)]'
    },
    {
      name: 'Alerts',
      href: '/notifications',
      icon: Bell,
      color: 'text-rose-400',
      bg: 'bg-rose-500/10 group-hover:bg-rose-500/20',
      border: 'border-rose-500/20 group-hover:border-rose-500/40',
      glow: 'group-hover:shadow-[0_0_20px_rgba(244,63,94,0.2)]'
    }
  ];

  return (
    <motion.div 
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8"
    >
      {actions.map((action) => (
        <Link 
          key={action.name} 
          href={action.href}
          className="focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-2xl outline-none group"
        >
          <motion.div 
            variants={fadeUp}
            whileHover={{ y: -4, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`flex flex-col items-center justify-center p-5 rounded-2xl border transition-all duration-300 h-[130px] bg-[#0a0f1c]/40 backdrop-blur-3xl ring-1 ring-white/5 border-white/5 shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:bg-white/10 ${action.glow}`}
          >
            <div className={`p-2.5 rounded-xl border mb-3 transition-colors duration-300 ${action.bg} ${action.border}`}>
              <action.icon className={`w-6 h-6 transition-transform duration-300 group-hover:scale-110 ${action.color}`} />
            </div>
            <span className="text-[11px] font-bold text-gray-400 group-hover:text-white transition-colors duration-300 uppercase tracking-widest text-center">
              {action.name}
            </span>
          </motion.div>
        </Link>
      ))}
    </motion.div>
  );
}
