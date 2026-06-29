import React from 'react';
import { Mail, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ContactHeader() {
  return (
    <div className="relative mb-16 py-12 md:py-20 text-center lg:text-left rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-blue-900 via-indigo-950 to-slate-950 border border-blue-500/20 shadow-2xl">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      
      <div className="relative px-6 md:px-12 z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 max-w-6xl mx-auto">
        <div className="max-w-2xl">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md"
          >
            <Clock className="w-4 h-4 text-emerald-400" />
            <span className="text-sm font-bold tracking-wider text-emerald-100 uppercase">Avg Response: Under 24h</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight leading-tight"
          >
            How can we help you today?
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-blue-100/80 leading-relaxed font-medium"
          >
            Whether you have a question, need to report a platform bug, or want to share feedback, our support team is ready to assist you.
          </motion.p>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="hidden lg:flex shrink-0 w-56 h-56 bg-gradient-to-tr from-blue-500/20 to-indigo-500/20 rounded-[2.5rem] border border-white/10 items-center justify-center backdrop-blur-sm shadow-2xl relative"
        >
          <div className="absolute inset-0 bg-blue-400/20 blur-xl rounded-full" />
          <Mail className="w-24 h-24 text-white relative z-10" />
        </motion.div>
      </div>
    </div>
  );
}
