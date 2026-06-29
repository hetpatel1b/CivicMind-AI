'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, MapPin, ShieldCheck, Sparkles, Activity } from 'lucide-react';
import { buttonVariants } from '@/design-system/components/Button';
import { motion } from 'framer-motion';
import { staggerContainer, fadeUp } from '@/design-system/motion/variants';

export default function HeroSection() {
  return (
    <section id="home" className="relative pt-40 pb-32 overflow-hidden bg-transparent">
      {/* Deep Atmospheric Lighting Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1400px] h-[900px] opacity-30 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-blue-500/10 to-purple-500/10 blur-[180px] rounded-full mix-blend-screen" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center max-w-5xl mx-auto"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 text-gray-300 font-bold text-[10px] tracking-[0.2em] uppercase mb-12 border border-white/10 shadow-[0_0_20px_rgba(255,255,255,0.03)] backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" aria-hidden="true" />
            AI-Powered Civic Intelligence
          </motion.div>
          
          {/* Reduced Heading Size by 20% for cleaner hierarchy */}
          <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-white tracking-tighter mb-8 leading-[1.05]">
            The Operating System <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-gray-100 via-gray-300 to-gray-500">for Modern Cities</span>
          </motion.h1>
          
          <motion.p variants={fadeUp} className="text-lg md:text-xl text-gray-400 mb-14 max-w-3xl mx-auto leading-relaxed font-light">
            CivicMind AI transforms civic reporting. Analyze issues, route efficiently, and build trust—all powered by intelligent algorithms and community validation.
          </motion.p>
          
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link 
              href="/report"
              className={buttonVariants('primary', 'lg', 'w-full sm:w-auto shadow-[0_0_30px_rgba(79,70,229,0.3)] hover:shadow-[0_0_50px_rgba(79,70,229,0.5)] !bg-indigo-600 hover:!bg-indigo-500 !border-transparent text-white font-bold transition-all px-8 h-12')}
            >
              Report an Issue
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
            
            <Link 
              href="/demo/citizen"
              className={buttonVariants('glass', 'lg', 'w-full sm:w-auto !bg-white/5 hover:!bg-white/10 !border-white/10 text-white font-medium backdrop-blur-xl px-8 h-12')}
            >
              Demo Citizen
            </Link>

            <Link 
              href="/demo/admin"
              className={buttonVariants('glass', 'lg', 'w-full sm:w-auto !bg-white/5 hover:!bg-white/10 !border-white/10 text-white font-medium backdrop-blur-xl px-8 h-12')}
            >
              Demo Admin
            </Link>
          </motion.div>
        </motion.div>

        {/* AI Visual Panel - OS Command Center */}
        <motion.div 
          className="mt-32 relative max-w-6xl mx-auto perspective-1000"
          initial={{ opacity: 0, y: 80, rotateX: 15 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ type: "spring", stiffness: 30, damping: 20, delay: 0.4 }}
        >
          <div className="relative aspect-[16/9] rounded-[2.5rem] overflow-hidden border border-white/10 shadow-[0_50px_100px_rgba(0,0,0,0.8)] bg-[#050505]/80 backdrop-blur-3xl ring-1 ring-white/5">
            {/* Inner ambient glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/5 via-transparent to-purple-500/5" />
            
            {/* Abstract visual treated as an OS map background */}
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-25 mix-blend-luminosity grayscale contrast-125" />
            
            {/* Deep overlay gradients for depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/40" />
            
            {/* Floating OS Elements */}
            <motion.div 
              className="absolute top-[20%] left-[10%] bg-[#0a0f1c]/90 backdrop-blur-2xl rounded-2xl p-4 shadow-[0_20px_40px_rgba(0,0,0,0.5)] border border-white/10 ring-1 ring-white/5"
              animate={{ y: [0, -12, 0] }}
              transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shadow-inner">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white tracking-wider uppercase">AI Verified</p>
                  <p className="text-[10px] font-medium text-emerald-400/80 uppercase tracking-widest mt-0.5">99.9% Confidence</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="absolute bottom-[25%] right-[10%] bg-[#0a0f1c]/90 backdrop-blur-2xl rounded-2xl p-4 shadow-[0_20px_40px_rgba(0,0,0,0.5)] border border-white/10 ring-1 ring-white/5"
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 8, ease: "easeInOut", delay: 1 }}
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shadow-inner">
                  <Activity className="w-5 h-5 text-indigo-400" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white tracking-wider uppercase">Live Dispatch</p>
                  <p className="text-[10px] font-medium text-indigo-400/80 uppercase tracking-widest mt-0.5">Active routing</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
