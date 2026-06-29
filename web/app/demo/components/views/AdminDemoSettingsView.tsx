'use client';

import React from 'react';
import { Settings, Shield, Bell, Database, Server, Smartphone, Cpu, Key, Lock, Monitor, Users, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '@/design-system/motion/variants';

export default function AdminDemoSettingsView() {
  const sections = [
    { title: 'AI & Automation', icon: Cpu, items: ['Confidence Thresholds', 'Auto-Merge Duplicate Reports', 'Sentiment Alert Sensitivity'] },
    { title: 'Security & Access', icon: Shield, items: ['Two-Factor Authentication (2FA)', 'Role-Based Access Control', 'Session Management'] },
    { title: 'Department Routing', icon: Users, items: ['Auto-Assignment Rules', 'Department SLAs', 'Escalation Paths'] },
    { title: 'System Alerts', icon: Bell, items: ['Critical Incident Webhooks', 'Daily Executive Summary', 'SMS Emergency Alerts'] },
  ];

  return (
    <div className="min-h-screen bg-transparent relative overflow-hidden pb-24 selection:bg-indigo-500/30 text-white">
      <div className="absolute inset-0 z-0 bg-[url('/noise.png')] opacity-[0.03] pointer-events-none mix-blend-overlay" />
      
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 md:pt-12 relative z-10">
        <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="mb-12">
          <motion.h1 variants={fadeUp} className="text-4xl font-black text-white tracking-tight mb-2">System Preferences</motion.h1>
          <motion.p variants={fadeUp} className="text-gray-400 font-medium">Global configuration for AI moderation, security, and routing.</motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sections.map((section, idx) => {
            const Icon = section.icon;
            return (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-[#0a0f1c]/80 backdrop-blur-3xl rounded-[2rem] border border-white/10 ring-1 ring-white/5 p-8 shadow-xl"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-black text-white">{section.title}</h3>
                </div>

                <div className="space-y-4">
                  {section.items.map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5 cursor-pointer">
                      <span className="text-sm font-bold text-gray-300">{item}</span>
                      <div className="w-10 h-5 bg-indigo-500/20 rounded-full border border-indigo-500/30 relative">
                        <div className="absolute right-1 top-1 bottom-1 w-3 bg-indigo-400 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.8)]" />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 bg-rose-900/20 backdrop-blur-3xl rounded-[2.5rem] border border-rose-500/20 ring-1 ring-rose-500/10 p-8 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div>
            <h3 className="text-xl font-black text-rose-400 mb-2 flex items-center gap-2"><Lock className="w-5 h-5" /> Danger Zone</h3>
            <p className="text-rose-200/60 text-sm">Purge demo database or reset AI weights to default parameters.</p>
          </div>
          <button className="px-6 py-3 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-400 rounded-xl font-black uppercase tracking-widest text-xs transition-colors shrink-0">
            Factory Reset
          </button>
        </motion.div>
      </div>
    </div>
  );
}
