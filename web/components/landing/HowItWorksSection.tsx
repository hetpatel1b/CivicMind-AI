'use client';

import React from 'react';
import { Camera, Cpu, Users, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { staggerContainer, fadeUp } from '@/design-system/motion/variants';

const steps = [
  {
    title: 'Citizen Reports',
    description: 'Spot an issue in your community? Snap a photo and let our app do the rest.',
    icon: <Camera className="w-5 h-5 text-indigo-400 group-hover:scale-110 transition-transform duration-300" aria-hidden="true" />,
    color: 'bg-indigo-500/10 border-indigo-500/30 group-hover:bg-indigo-500/20',
    glow: 'group-hover:shadow-[0_20px_40px_rgba(99,102,241,0.2)]'
  },
  {
    title: 'AI Analysis',
    description: 'Our AI instantly analyzes the image, drafts the report, tags the department, and scores severity.',
    icon: <Cpu className="w-5 h-5 text-purple-400 group-hover:scale-110 transition-transform duration-300" aria-hidden="true" />,
    color: 'bg-purple-500/10 border-purple-500/30 group-hover:bg-purple-500/20',
    glow: 'group-hover:shadow-[0_20px_40px_rgba(168,85,247,0.2)]'
  },
  {
    title: 'Community & Admin',
    description: 'The community verifies the issue, while AI provides administrators with actionable insights.',
    icon: <Users className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform duration-300" aria-hidden="true" />,
    color: 'bg-blue-500/10 border-blue-500/30 group-hover:bg-blue-500/20',
    glow: 'group-hover:shadow-[0_20px_40px_rgba(59,130,246,0.2)]'
  },
  {
    title: 'Resolution',
    description: 'City officials take action, guided by data. You get notified in real-time when fixed.',
    icon: <CheckCircle className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform duration-300" aria-hidden="true" />,
    color: 'bg-emerald-500/10 border-emerald-500/30 group-hover:bg-emerald-500/20',
    glow: 'group-hover:shadow-[0_20px_40px_rgba(16,185,129,0.2)]'
  }
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-24 md:py-32 bg-transparent relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-24"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight">
            How CivicMind AI works
          </motion.h2>
          <motion.p variants={fadeUp} className="text-lg md:text-xl text-gray-400 font-light max-w-2xl mx-auto">
            From discovering an issue to resolving it, AI empowers every step of the civic engagement lifecycle.
          </motion.p>
        </motion.div>

        <div className="relative max-w-5xl mx-auto">
          {/* Animated Connecting Line Background */}
          <div className="absolute top-[48px] left-[10%] right-[10%] h-px bg-white/5 hidden md:block" />
          
          {/* Animated Glowing Connector */}
          <motion.div 
            className="absolute top-[48px] left-[10%] h-px bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500 hidden md:block origin-left shadow-[0_0_20px_rgba(168,85,247,0.6)]"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, margin: "-100px" }}
            style={{ right: '10%' }}
          />
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-6 relative z-10"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
          >
            {steps.map((step, index) => (
              <motion.div 
                key={index} 
                variants={fadeUp}
                className="relative flex flex-col items-center text-center group"
              >
                {/* Connector Dot */}
                <div className="hidden md:block absolute top-[48px] -translate-y-1/2 w-3 h-3 rounded-full bg-[#050505] border-2 border-white/20 z-20 group-hover:border-purple-400 group-hover:shadow-[0_0_10px_rgba(168,85,247,0.5)] transition-all duration-300" />

                <motion.div 
                  className={`w-24 h-24 rounded-3xl flex items-center justify-center mb-10 border border-white/10 bg-[#0a0f1c]/80 backdrop-blur-3xl transition-all duration-500 group-hover:border-white/20 ring-1 ring-white/5 ${step.glow}`}
                  whileHover={{ y: -10, scale: 1.05 }}
                >
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border shadow-inner transition-colors duration-300 ${step.color}`}>
                    {step.icon}
                  </div>
                </motion.div>
                
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-gray-500 mb-6 md:hidden">
                  {index + 1}
                </div>

                <h3 className="text-xl font-bold text-white mb-4 tracking-wide group-hover:text-purple-300 transition-colors duration-300">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed font-light px-2">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
