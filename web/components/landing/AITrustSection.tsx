'use client';

import React from 'react';
import { ShieldCheck, UserCheck, Edit3, Lock } from 'lucide-react';
import { motion } from 'framer-motion';
import { staggerContainer, fadeUp } from '@/design-system/motion/variants';

export default function AITrustSection() {
  return (
    <section className="py-24 md:py-32 bg-transparent relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-20"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 text-gray-300 font-bold text-[10px] uppercase tracking-[0.2em] mb-8 border border-white/10 shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5" />
            Enterprise-Grade Trust
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight leading-tight">
            Security & <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-500">Transparency</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-lg md:text-xl text-gray-400 font-light max-w-2xl mx-auto">
            We believe AI should empower citizens and administrators, not replace them. Our platform is designed with clear guardrails and strict data privacy.
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-50px" }}
        >
          <TrustCard 
            icon={<UserCheck className="w-5 h-5 text-gray-300" />}
            title="Humans in Control"
            description="AI acts as an intelligent assistant, but final decisions on civic actions are always made by verified city administrators."
          />
          <TrustCard 
            icon={<Edit3 className="w-5 h-5 text-gray-300" />}
            title="100% Editable"
            description="When AI analyzes an image or suggests a category, it's just a draft. You can always override before submitting."
          />
          <TrustCard 
            icon={<ShieldCheck className="w-5 h-5 text-gray-300" />}
            title="Clear Boundaries"
            description="All AI-generated insights, summaries, and tags are explicitly labeled across the platform."
          />
          <TrustCard 
            icon={<Lock className="w-5 h-5 text-gray-300" />}
            title="Data Privacy"
            description="Your personal information is encrypted. We do not sell data, and location tracking is strictly opt-in."
          />
        </motion.div>
      </div>
    </section>
  );
}

function TrustCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <motion.div 
      variants={fadeUp}
      className="bg-transparent p-6 rounded-2xl border border-white/5 flex flex-col relative overflow-hidden group hover:bg-white/5 transition-all duration-300"
    >
      <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 bg-white/5 border border-white/10 group-hover:bg-white/10 transition-colors shadow-inner">
        {icon}
      </div>
      <h3 className="text-sm font-bold text-white mb-3 uppercase tracking-wider">{title}</h3>
      <p className="text-sm text-gray-400 font-light leading-relaxed">
        {description}
      </p>
      
      {/* Active Indicator Line */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
    </motion.div>
  );
}
