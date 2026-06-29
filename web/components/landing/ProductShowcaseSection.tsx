'use client';

import React from 'react';
import { Activity, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { staggerContainer, fadeUp } from '@/design-system/motion/variants';

export default function ProductShowcaseSection() {
  return (
    <section className="py-24 md:py-32 bg-transparent relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center max-w-4xl mx-auto mb-20"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div variants={fadeUp} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 text-gray-300 font-bold text-[10px] uppercase tracking-[0.2em] mb-8 border border-white/10 shadow-[0_0_20px_rgba(255,255,255,0.02)] backdrop-blur-md">
            <Activity className="w-3.5 h-3.5 text-blue-400" aria-hidden="true" />
            Live Civic Ecosystem
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight leading-tight">
            See your city in <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-indigo-400 to-purple-400">real-time</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-lg md:text-xl text-gray-400 font-light max-w-3xl mx-auto">
            An interactive geospatial visualization of community hotspots, seamlessly connecting citizens with the authorities that serve them.
          </motion.p>
        </motion.div>

        {/* Premium Map Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: "-50px" }}
          className="relative w-full aspect-[16/10] md:aspect-[21/9] rounded-[2.5rem] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.8)] border border-white/10 bg-[#050505] ring-1 ring-white/5"
        >
          {/* Stylized Map Background */}
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-30 mix-blend-luminosity grayscale contrast-125" />
          
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10 mix-blend-screen" />

          {/* Animated Map Hotspots */}
          <Hotspot x="30%" y="40%" color="bg-rose-500" delay={0} />
          <Hotspot x="60%" y="25%" color="bg-indigo-500" delay={1.2} />
          <Hotspot x="45%" y="65%" color="bg-amber-500" delay={2.5} />
          <Hotspot x="75%" y="55%" color="bg-emerald-500" delay={0.8} />

          {/* Glass Overlay Panel - Live Indicators */}
          <motion.div 
            className="absolute bottom-8 left-8 right-8 md:right-auto md:w-80 bg-[#0a0f1c]/80 backdrop-blur-3xl border border-white/10 rounded-2xl p-6 shadow-2xl ring-1 ring-white/5"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.8, type: "spring", stiffness: 50 }}
            viewport={{ once: true }}
          >
            <h3 className="text-[9px] font-bold text-gray-500 mb-5 uppercase tracking-[0.2em] flex items-center gap-3">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
              </span>
              Live Indicators
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-3 text-gray-300 font-light">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.6)]" /> Infrastructure
                </div>
                <span className="font-bold text-white font-mono">12</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-3 text-gray-300 font-light">
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.6)]" /> Sanitation
                </div>
                <span className="font-bold text-white font-mono">5</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-3 text-gray-300 font-light">
                  <div className="w-2.5 h-2.5 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.6)]" /> Safety
                </div>
                <span className="font-bold text-white font-mono">3</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function Hotspot({ x, y, color, delay }: { x: string, y: string, color: string, delay: number }) {
  return (
    <div className="absolute z-10" style={{ left: x, top: y }}>
      <motion.div
        className={`w-4 h-4 rounded-full flex items-center justify-center ${color} shadow-[0_0_20px_rgba(255,255,255,0.4)] relative border border-white/50`}
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ delay, type: "spring", stiffness: 200, damping: 15 }}
        viewport={{ once: true }}
      >
        <MapPin className="w-2 h-2 text-white" />
        
        {/* Premium Pulsing ring */}
        <motion.div
          className={`absolute inset-0 rounded-full border-2 border-white/30 ${color}`}
          animate={{ scale: [1, 3.5], opacity: [0.8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut", delay }}
        />
      </motion.div>
    </div>
  );
}
