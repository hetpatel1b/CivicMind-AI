'use client';

import React from 'react';
import Link from 'next/link';
import { Camera, MessageSquare, Map, Users, BarChart3, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { staggerContainer, fadeUp } from '@/design-system/motion/variants';

const aiFeatures = [
  {
    title: 'AI Issue Intelligence',
    description: 'Automatically analyzes uploaded photos to draft reports, categorize issues, and determine severity instantly.',
    icon: <Camera className="w-5 h-5 text-indigo-400" aria-hidden="true" />,
    href: '/report',
    linkText: 'Try AI Reporting',
    glowColor: 'group-hover:shadow-[0_20px_40px_rgba(99,102,241,0.2)]',
    iconBg: 'bg-indigo-500/10 border-indigo-500/20 group-hover:bg-indigo-500/20'
  },
  {
    title: 'Civic AI Assistant',
    description: 'A context-aware intelligent assistant ready to answer questions, guide reporting, and explain platform features.',
    icon: <MessageSquare className="w-5 h-5 text-purple-400" aria-hidden="true" />,
    href: '/help',
    linkText: 'Ask the Assistant',
    glowColor: 'group-hover:shadow-[0_20px_40px_rgba(168,85,247,0.2)]',
    iconBg: 'bg-purple-500/10 border-purple-500/20 group-hover:bg-purple-500/20'
  },
  {
    title: 'AI Maps Intelligence',
    description: 'Generates regional summaries and location-specific insights directly from the interactive city map.',
    icon: <Map className="w-5 h-5 text-emerald-400" aria-hidden="true" />,
    href: '/map',
    linkText: 'Explore Map Insights',
    glowColor: 'group-hover:shadow-[0_20px_40px_rgba(16,185,129,0.2)]',
    iconBg: 'bg-emerald-500/10 border-emerald-500/20 group-hover:bg-emerald-500/20'
  },
  {
    title: 'AI Community Intelligence',
    description: 'Synthesizes community discussions, detects duplicate reports, and summarizes long comment threads.',
    icon: <Users className="w-5 h-5 text-blue-400" aria-hidden="true" />,
    href: '/feed',
    linkText: 'View Community Pulse',
    glowColor: 'group-hover:shadow-[0_20px_40px_rgba(59,130,246,0.2)]',
    iconBg: 'bg-blue-500/10 border-blue-500/20 group-hover:bg-blue-500/20'
  },
  {
    title: 'AI Analytics Intelligence',
    description: 'Explains complex data charts and statistical trends in plain English for better civic understanding.',
    icon: <BarChart3 className="w-5 h-5 text-amber-400" aria-hidden="true" />,
    href: '/admin',
    linkText: 'See Analytics',
    glowColor: 'group-hover:shadow-[0_20px_40px_rgba(245,158,11,0.2)]',
    iconBg: 'bg-amber-500/10 border-amber-500/20 group-hover:bg-amber-500/20'
  },
  {
    title: 'AI Admin Intelligence',
    description: 'Provides city administrators with daily executive summaries, resource recommendations, and anomaly alerts.',
    icon: <ShieldCheck className="w-5 h-5 text-rose-400" aria-hidden="true" />,
    href: '/admin',
    linkText: 'View Admin Dashboard',
    glowColor: 'group-hover:shadow-[0_20px_40px_rgba(244,63,94,0.2)]',
    iconBg: 'bg-rose-500/10 border-rose-500/20 group-hover:bg-rose-500/20'
  }
];

export default function AIFeaturesSection() {
  return (
    <section id="ai-features" className="py-24 md:py-32 bg-transparent relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-20"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 text-gray-300 font-bold text-[10px] uppercase tracking-[0.2em] mb-8 border border-white/10 shadow-[0_0_20px_rgba(255,255,255,0.02)] backdrop-blur-md">
            Platform Capabilities
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight leading-tight">
            A Fully Integrated <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 via-gray-400 to-gray-500">AI Ecosystem</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-lg md:text-xl text-gray-400 font-light leading-relaxed">
            Our proprietary AI models remove friction across the entire civic lifecycle, from reporting to resolution.
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-50px" }}
        >
          {aiFeatures.map((feature, index) => (
            <motion.div key={index} variants={fadeUp} className="h-full">
              <Link 
                href={feature.href}
                className={`group flex flex-col h-full bg-[#0a0a0c]/80 backdrop-blur-3xl p-8 rounded-[2rem] border border-white/5 hover:border-white/20 hover:-translate-y-2 transition-all duration-500 relative overflow-hidden ring-1 ring-white/5 ${feature.glowColor}`}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/5 to-transparent rounded-bl-full -z-10 group-hover:scale-[1.5] transition-transform duration-700 ease-out"></div>
                
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-8 border transition-colors duration-500 shadow-inner ${feature.iconBg}`}>
                  {feature.icon}
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3 tracking-wide">
                  {feature.title}
                </h3>
                
                <p className="text-gray-400 leading-relaxed flex-1 font-light text-sm">
                  {feature.description}
                </p>
                
                <div className="mt-8 font-bold text-[10px] uppercase tracking-[0.2em] text-gray-500 group-hover:text-white flex items-center gap-2 transition-colors duration-300">
                  {feature.linkText} <span className="text-lg leading-none transform group-hover:translate-x-1 transition-transform" aria-hidden="true">&rarr;</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
