'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Rocket, X } from 'lucide-react';
import { spring } from '@/design-system/motion/tokens';

export default function DemoBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, height: 0 }}
        transition={spring.gentle}
        className="w-full relative z-50 bg-gradient-to-r from-indigo-600 to-purple-600 shadow-md border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-1.5 bg-white/20 rounded-lg backdrop-blur-md shrink-0">
              <Rocket className="w-4 h-4 text-white" />
            </div>
            <div className="text-white text-sm">
              <strong className="font-semibold mr-1">Demo Workspace:</strong>
              <span className="opacity-90 hidden sm:inline">You are exploring CivicMind AI with simulated data. Changes will not be saved.</span>
              <span className="opacity-90 sm:hidden">Exploring with simulated data.</span>
            </div>
          </div>
          
          <div className="flex items-center gap-3 shrink-0">
            <button 
              className="text-xs font-bold text-indigo-600 bg-white px-3 py-1.5 rounded-full shadow-sm hover:bg-gray-100 transition-colors hidden sm:block"
              onClick={() => alert("All features in Demo Mode are fully interactive but use mock data.")}
            >
              Explore Features
            </button>
            <button
              onClick={() => setIsVisible(false)}
              className="p-1 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
