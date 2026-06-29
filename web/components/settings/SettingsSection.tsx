import React from 'react';
import { motion } from 'framer-motion';

interface SettingsSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

export default function SettingsSection({ title, description, children }: SettingsSectionProps) {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="mb-12 relative"
    >
      <div className="mb-6 pl-3 border-l-4 border-indigo-500 shadow-[inset_2px_0_0_rgba(99,102,241,0.5)]">
        <h2 className="text-xl font-bold tracking-tight text-white">{title}</h2>
        {description && <p className="mt-1.5 text-sm font-medium text-gray-400 max-w-2xl">{description}</p>}
      </div>
      <div className="space-y-4">
        {children}
      </div>
    </motion.section>
  );
}
