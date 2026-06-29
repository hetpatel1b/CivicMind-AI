'use client';

import React from 'react';
import Link from 'next/link';
import { CheckCircle2, ArrowRight, LayoutDashboard, Search, MessageSquare, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '@/design-system/motion/variants';

export default function SubmissionSuccess() {
  const nextSteps = [
    {
      title: 'AI Verification',
      description: 'Our system analyzes the report for duplicates and prioritizes it.',
      icon: Search,
      color: 'text-indigo-400',
      bg: 'bg-indigo-500/10 border-indigo-500/20'
    },
    {
      title: 'Assignment',
      description: 'Routed to the correct city department based on category and location.',
      icon: ArrowRight,
      color: 'text-purple-400',
      bg: 'bg-purple-500/10 border-purple-500/20'
    },
    {
      title: 'Resolution Tracking',
      description: 'You will receive notifications as work progresses.',
      icon: CheckCircle2,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10 border-emerald-500/20'
    },
    {
      title: 'Reputation Reward',
      description: 'XP awarded to your profile once the issue is verified.',
      icon: Award,
      color: 'text-amber-400',
      bg: 'bg-amber-500/10 border-amber-500/20'
    }
  ];

  return (
    <div className="w-full flex items-center justify-center min-h-[60vh] py-12 relative z-10">
      <motion.div 
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="max-w-2xl w-full bg-[#0a0f1c]/80 backdrop-blur-3xl p-8 md:p-12 rounded-[3rem] shadow-[0_20px_40px_rgba(0,0,0,0.6)] border border-white/10 ring-1 ring-white/5 text-center relative overflow-hidden"
      >
        {/* Ambient Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-emerald-500/10 via-transparent to-transparent opacity-50 blur-[100px] pointer-events-none" />

        <motion.div variants={fadeUp} className="relative z-10 w-24 h-24 bg-emerald-500 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-[0_0_40px_rgba(16,185,129,0.5)] border border-emerald-400/50">
          <CheckCircle2 className="w-12 h-12 text-white" />
        </motion.div>
        
        <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-4 relative z-10">
          Report Submitted Successfully
        </motion.h2>
        
        <motion.p variants={fadeUp} className="text-base text-gray-400 mb-12 relative z-10 max-w-lg mx-auto font-medium leading-relaxed">
          Thank you for improving our community. Your civic contribution has been securely recorded and dispatched.
        </motion.p>

        <motion.div variants={fadeUp} className="relative z-10 text-left mb-12">
          <h3 className="text-[11px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-6 text-center">What happens next?</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {nextSteps.map((step, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 flex gap-4 transition-all hover:bg-white/5 hover:border-white/10 group">
                <div className={`mt-0.5 p-2 rounded-xl border flex items-center justify-center h-10 w-10 shrink-0 ${step.bg}`}>
                  <step.icon className={`w-5 h-5 ${step.color}`} />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm mb-1.5">{step.title}</h4>
                  <p className="text-xs text-gray-400 leading-relaxed font-medium">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div variants={fadeUp} className="relative z-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/dashboard"
            className="px-8 py-3.5 bg-white text-[#050505] rounded-xl font-bold flex items-center justify-center gap-2 transition-transform hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
          >
            <LayoutDashboard className="w-5 h-5" />
            Go to Dashboard
          </Link>
          <Link 
            href="/feed"
            className="px-8 py-3.5 bg-white/5 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all hover:scale-105 hover:bg-white/10 border border-white/10 shadow-sm"
          >
            <MessageSquare className="w-5 h-5" />
            Community Feed
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
