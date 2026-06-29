import React from 'react';
import { LayoutDashboard } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SettingsEmpty() {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center py-24 px-4 text-center rounded-[2rem] border border-white/10 bg-[#0a0f1c]/50 backdrop-blur-md shadow-inner"
    >
      <div className="w-20 h-20 bg-indigo-500/10 border border-indigo-500/20 shadow-inner rounded-full flex items-center justify-center text-indigo-400 mb-6 relative">
        <div className="absolute inset-0 rounded-full border border-indigo-500/10" />
        <LayoutDashboard className="w-10 h-10 drop-shadow-[0_0_8px_rgba(99,102,241,0.5)]" />
      </div>
      <h3 className="text-xl font-bold text-white mb-2">Section Not Found</h3>
      <p className="text-sm font-medium text-gray-400 max-w-sm leading-relaxed">
        The settings section you&apos;re looking for is either under construction or doesn&apos;t exist.
      </p>
    </motion.div>
  );
}
