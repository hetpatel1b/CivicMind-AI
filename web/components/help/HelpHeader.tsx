import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

interface HelpHeaderProps {
  title: string;
  description: string;
}

export default function HelpHeader({ title, description }: HelpHeaderProps) {
  return (
    <div className="relative mb-12 py-10 md:py-16 text-center lg:text-left rounded-[2rem] overflow-hidden bg-gradient-to-br from-indigo-900 via-indigo-950 to-gray-950 border border-indigo-500/20 shadow-2xl">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      
      <div className="relative px-6 md:px-12 z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
        <div className="max-w-2xl">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md"
          >
            <div className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </div>
            <span className="text-xs font-bold tracking-wider text-emerald-100 uppercase">Support Systems Operational</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight"
          >
            {title}
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-indigo-100/80 leading-relaxed font-medium"
          >
            {description}
          </motion.p>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="hidden lg:flex shrink-0 w-48 h-48 bg-gradient-to-tr from-blue-500/20 to-indigo-500/20 rounded-[2rem] border border-white/10 items-center justify-center backdrop-blur-sm"
        >
          <ShieldCheck className="w-24 h-24 text-white/40" />
        </motion.div>
      </div>
    </div>
  );
}
