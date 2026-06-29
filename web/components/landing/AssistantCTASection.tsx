'use client';

import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { buttonVariants } from '@/design-system/components/Button';
import { motion } from 'framer-motion';
import { staggerContainer, fadeUp } from '@/design-system/motion/variants';

export default function AssistantCTASection() {
  return (
    <section className="relative py-32 md:py-48 overflow-hidden bg-transparent">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          className="bg-[#0a0f1c]/40 backdrop-blur-3xl border border-white/5 rounded-[3rem] p-12 md:p-24 shadow-[0_50px_100px_rgba(0,0,0,0.8)] ring-1 ring-white/5 relative overflow-hidden"
        >
          {/* Inner ambient glow */}
          <div className="absolute inset-0 bg-gradient-to-t from-indigo-500/5 via-transparent to-purple-500/5 pointer-events-none" />

          <motion.div variants={fadeUp} className="w-20 h-20 bg-[#050505] rounded-3xl flex items-center justify-center mx-auto mb-10 shadow-[0_0_40px_rgba(99,102,241,0.4)] border border-indigo-500/30">
            <Sparkles className="w-10 h-10 text-indigo-400" />
          </motion.div>
          
          <motion.h2 variants={fadeUp} className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 tracking-tight leading-[1.1]">
            Ready to build a <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 via-white to-gray-400">smarter city?</span>
          </motion.h2>
          
          <motion.p variants={fadeUp} className="text-xl md:text-2xl text-gray-400 mb-14 max-w-2xl mx-auto font-light leading-relaxed">
            Join the growing network of municipalities using AI to create safer, cleaner, and more responsive communities.
          </motion.p>
          
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link 
              href="/report"
              className={buttonVariants('primary', 'lg', 'w-full sm:w-auto shadow-[0_0_50px_rgba(79,70,229,0.5)] hover:shadow-[0_0_80px_rgba(79,70,229,0.7)] !bg-indigo-600 hover:!bg-indigo-500 !border-transparent text-white font-bold transition-all px-10 h-14 text-lg')}
            >
              Report an Issue
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            
            <Link 
              href="/demo/citizen"
              className={buttonVariants('glass', 'lg', 'w-full sm:w-auto !bg-white/5 hover:!bg-white/10 !border-white/10 text-white font-medium backdrop-blur-xl px-10 h-14 text-lg')}
            >
              Try Demo Mode
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
