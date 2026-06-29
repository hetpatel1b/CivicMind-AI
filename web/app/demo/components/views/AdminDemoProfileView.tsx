'use client';

import React from 'react';
import { useDemo } from '../../context/DemoProvider';
import { ShieldCheck, Target, Activity, Clock, ShieldAlert, Award, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '@/design-system/motion/variants';

export default function AdminDemoProfileView() {
  const { currentUser } = useDemo();

  return (
    <div className="min-h-screen bg-transparent relative overflow-hidden pb-24 selection:bg-indigo-500/30 text-white">
      <div className="absolute inset-0 z-0 bg-[url('/noise.png')] opacity-[0.03] pointer-events-none mix-blend-overlay" />
      <div className="absolute top-[10%] left-[20%] w-[600px] h-[600px] bg-emerald-600/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 md:pt-12 relative z-10">
        
        <div className="bg-[#0a0f1c]/80 backdrop-blur-3xl rounded-[3rem] border border-white/10 ring-1 ring-white/5 p-8 sm:p-12 shadow-2xl mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
            <ShieldCheck className="w-48 h-48 text-emerald-400" />
          </div>

          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start relative z-10">
            <div className="relative">
              <div className="w-32 h-32 rounded-3xl bg-black border border-white/10 overflow-hidden shadow-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${currentUser?.id || 'admin'}`} alt="Admin Avatar" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-3 -right-3 w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center border-4 border-[#0a0f1c] shadow-xl text-black">
                <ShieldCheck className="w-5 h-5" />
              </div>
            </div>

            <div className="text-center md:text-left flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full text-[10px] font-black uppercase tracking-widest mb-3">
                System Administrator
              </div>
              <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-2">{currentUser?.full_name || 'Admin User'}</h1>
              <p className="text-gray-400 font-medium mb-6">{currentUser?.email || 'admin@civicmind.ai'} • ID: {currentUser?.id.slice(0,8) || 'USR-001'}</p>
              
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <button className="px-6 py-2.5 bg-white text-black font-bold rounded-xl text-sm transition-transform hover:scale-105 active:scale-95">Edit Profile</button>
                <button className="px-6 py-2.5 bg-white/5 border border-white/10 text-white font-bold rounded-xl text-sm transition-colors hover:bg-white/10">Manage Access</button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[
            { label: 'Issues Verified', value: '4,281', icon: ShieldCheck, color: 'text-emerald-400' },
            { label: 'Avg Review Time', value: '14m', icon: Clock, color: 'text-indigo-400' },
            { label: 'Accuracy Rating', value: '99.4%', icon: Target, color: 'text-purple-400' }
          ].map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="bg-[#0a0f1c]/80 backdrop-blur-3xl rounded-[2rem] border border-white/10 ring-1 ring-white/5 p-6 flex flex-col items-center justify-center text-center group hover:border-white/20 transition-colors">
                <Icon className={`w-8 h-8 ${stat.color} mb-3 group-hover:scale-110 transition-transform`} />
                <div className="text-3xl font-black text-white mb-1">{stat.value}</div>
                <div className="text-[10px] font-black uppercase tracking-widest text-gray-500">{stat.label}</div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
}
