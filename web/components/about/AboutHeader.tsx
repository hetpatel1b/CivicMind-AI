import React from 'react';
import { ShieldCheck, HeartHandshake } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AboutHeader() {
  return (
    <div className="relative mb-16 py-16 md:py-24 text-center lg:text-center rounded-[2.5rem] overflow-hidden bg-gradient-to-b from-indigo-950 via-gray-950 to-gray-950 border border-indigo-500/20 shadow-2xl">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-1/4 -mt-32 w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 -mb-32 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="relative px-6 md:px-12 z-10 max-w-4xl mx-auto flex flex-col items-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md"
        >
          <HeartHandshake className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-bold tracking-widest text-emerald-100 uppercase">Citizen-First Philosophy</span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-8 tracking-tight leading-tight"
        >
          Empowering communities through <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-400">responsible AI.</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-2xl text-indigo-100/70 leading-relaxed font-medium max-w-3xl"
        >
          CivicMind AI bridges the gap between citizens and local government, using intelligent analysis to turn everyday observations into actionable civic improvements.
        </motion.p>
      </div>
    </div>
  );
}
