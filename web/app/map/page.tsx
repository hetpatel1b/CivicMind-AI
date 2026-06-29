'use client';

import dynamic from 'next/dynamic';
import React from 'react';
import { Map as MapIcon, Loader2, Sparkles, Navigation } from 'lucide-react';
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '@/design-system/motion/variants';


/**
 * Dynamically import MapView with SSR disabled.
 * CRITICAL: React Leaflet strictly requires the `window` object to function.
 * By making this a Client Component and using ssr: false, we prevent SSR crashes.
 */
const MapView = dynamic(() => import('@/components/map/MapView'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[500px] md:h-[600px] lg:h-[700px] xl:h-[800px] rounded-[2rem] flex flex-col items-center justify-center bg-gray-50/50 dark:bg-gray-900/20 border border-gray-200 dark:border-gray-800 shadow-sm backdrop-blur-md">
      <div className="relative">
        <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full" />
        <Loader2 className="w-10 h-10 text-blue-600 dark:text-blue-500 animate-spin relative z-10 mb-4" />
      </div>
      <p className="text-gray-500 dark:text-gray-400 font-medium animate-pulse tracking-wide">Loading geospatial intelligence...</p>
    </div>
  )
});

/**
 * MapPage - The dedicated route for the Interactive Civic Map.
 * Provides the overarching UI structure, headers, and embeds the client-side MapView.
 */
export default function MapPage() {
  return (
    <main className="flex-1 bg-[#050505] pt-20 pb-8 relative overflow-hidden min-h-screen flex flex-col">
      
      {/* Ambient Lighting & Depth */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-gradient-to-b from-indigo-500/20 via-purple-500/10 to-transparent blur-[120px] pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-blue-500/10 blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[400px] bg-purple-500/10 blur-[150px] pointer-events-none rounded-full" />

      {/* Noise Texture for Premium Feel */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none mix-blend-overlay" />

      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col h-full flex-1">
        
        {/* Compact Premium Page Header */}
        <motion.div 
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="mb-5 shrink-0"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-4">
            <div className="flex-1">
              <motion.div variants={fadeUp} className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-[0_0_20px_rgba(99,102,241,0.4)] border border-indigo-400/50">
                  <MapIcon className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  Civic <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 drop-shadow-[0_0_15px_rgba(99,102,241,0.5)]">Intelligence</span> Map
                </h1>
              </motion.div>
              
              <motion.p variants={fadeUp} className="text-sm text-gray-400 max-w-xl font-medium leading-relaxed">
                Live geospatial intelligence. Monitor real-time civic issues and AI-driven hotspots across the community.
              </motion.p>
            </div>

            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-2 shrink-0">
              <div className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 flex items-center gap-2 backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]"></span>
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400">Live Reports</span>
              </div>
              <div className="px-3 py-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/30 flex items-center gap-1.5 backdrop-blur-md shadow-[0_0_15px_rgba(99,102,241,0.15)]">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-300">AI Insights</span>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Dynamic Map Container */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full flex-1 relative z-0 flex flex-col min-h-[65vh] xl:min-h-[75vh]"
        >
          <MapView />
        </motion.div>

      </div>
    </main>
  );
}
