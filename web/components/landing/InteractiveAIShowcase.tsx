'use client';

import React from 'react';
import { UploadCloud, Sparkles, CheckCircle2, ChevronRight, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import { staggerContainer, fadeUp } from '@/design-system/motion/variants';

export default function InteractiveAIShowcase() {
  return (
    <section className="py-24 md:py-32 relative bg-transparent overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* Text Content */}
          <motion.div 
            className="flex-1 text-center lg:text-left"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 text-gray-300 font-bold text-[10px] tracking-[0.2em] uppercase mb-8 border border-white/10 shadow-[0_0_20px_rgba(255,255,255,0.02)] backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              AI Vision Engine
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-[1.1] tracking-tight">
              Snap a photo. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-indigo-400 to-blue-400">
                AI does the rest.
              </span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto lg:mx-0 font-light leading-relaxed">
              No more tedious forms. Our computer vision models instantly analyze your image, write a detailed description, identify the exact civic category, and route it to the correct department.
            </motion.p>
            
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <div className="flex items-center gap-3 text-gray-300 text-sm font-medium bg-[#0a0f1c]/50 backdrop-blur-xl px-5 py-3 rounded-xl border border-white/5 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Automatic Categorization
              </div>
              <div className="flex items-center gap-3 text-gray-300 text-sm font-medium bg-[#0a0f1c]/50 backdrop-blur-xl px-5 py-3 rounded-xl border border-white/5 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Severity Scoring
              </div>
            </motion.div>
          </motion.div>

          {/* Interactive UI Mock */}
          <motion.div 
            className="flex-1 w-full max-w-lg relative perspective-1000"
            initial={{ opacity: 0, x: 40, rotateY: -10 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ type: "spring", stiffness: 40, damping: 20 }}
            viewport={{ once: true }}
          >
            {/* Background Glow behind the card */}
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 to-purple-500/10 blur-[100px] -z-10 rounded-full" />
            
            <div className="bg-[#050505]/60 backdrop-blur-3xl border border-white/10 rounded-[2rem] shadow-[0_40px_80px_rgba(0,0,0,0.6)] p-8 relative overflow-hidden ring-1 ring-white/5">
              
              {/* Stepper Header */}
              <div className="flex items-center justify-between mb-8 text-[10px] font-bold tracking-[0.15em] uppercase">
                <div className="flex items-center text-gray-500">
                  <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center mr-2 border border-white/10">1</div>
                  Upload
                </div>
                <ChevronRight className="w-4 h-4 text-gray-700" />
                <div className="flex items-center text-purple-400">
                  <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center mr-2 border border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.5)]">
                    <Sparkles className="w-3 h-3 animate-pulse text-purple-300" />
                  </div>
                  Analyze
                </div>
                <ChevronRight className="w-4 h-4 text-gray-700" />
                <div className="flex items-center text-gray-600">
                  <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center mr-2 border border-white/5">3</div>
                  Submit
                </div>
              </div>

              {/* Mock Upload Area */}
              <div className="border border-white/10 rounded-2xl p-8 flex flex-col items-center justify-center bg-black/40 mb-8 relative overflow-hidden group h-56 shadow-inner">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80&w=800')] bg-cover bg-center opacity-30 mix-blend-luminosity"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent"></div>
                
                <div className="relative z-10 flex flex-col items-center text-white mt-16">
                  <UploadCloud className="w-10 h-10 mb-3 text-white/80" />
                  <p className="font-medium text-[10px] tracking-wider uppercase bg-black/60 px-4 py-1.5 rounded-full backdrop-blur-md border border-white/10">Pothole_Main_St.jpg</p>
                </div>

                {/* Premium AI Scanning Line */}
                <motion.div 
                  className="absolute left-0 w-full h-px bg-purple-400 shadow-[0_0_30px_5px_rgba(168,85,247,0.8)] z-20"
                  animate={{ top: ["0%", "100%", "0%"] }}
                  transition={{ duration: 3.5, ease: "linear", repeat: Infinity }}
                />
              </div>

              {/* Mock AI Results Form */}
              <motion.div 
                className="space-y-5"
                variants={staggerContainer}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, margin: "-50px" }}
              >
                <motion.div variants={fadeUp} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">AI Generated Title</label>
                    <span className="flex items-center gap-1 text-[9px] font-bold text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-sm border border-purple-500/20 uppercase tracking-wider">
                      <Sparkles className="w-3 h-3" /> Auto-filled
                    </span>
                  </div>
                  <div className="w-full bg-black/50 border border-white/10 rounded-xl p-3.5 text-sm font-medium text-white shadow-inner">
                    Severe Pothole on Main Street
                  </div>
                </motion.div>

                <div className="grid grid-cols-2 gap-4">
                  <motion.div variants={fadeUp} className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Category</label>
                    <div className="w-full bg-black/50 border border-white/10 rounded-xl p-3.5 text-sm font-medium text-white flex items-center justify-between shadow-inner">
                      Infrastructure
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    </div>
                  </motion.div>
                  <motion.div variants={fadeUp} className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Severity</label>
                    <div className="w-full bg-amber-500/10 border border-amber-500/20 rounded-xl p-3.5 text-sm font-medium text-amber-400 flex items-center justify-between shadow-inner">
                      High Priority
                      <AlertTriangle className="w-4 h-4 text-amber-500" />
                    </div>
                  </motion.div>
                </div>
                
                <motion.button 
                  variants={fadeUp}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 mt-6 bg-white text-black rounded-xl font-bold text-sm hover:bg-gray-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                >
                  Confirm & Submit
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
