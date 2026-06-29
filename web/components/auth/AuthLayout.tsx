'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, 
  Sparkles, 
  MapPin, 
  Users, 
  Award, 
  Activity, 
  ArrowRight,
  Shield,
  Eye,
  Lock,
  Globe,
  Bell
} from 'lucide-react';
import Link from 'next/link';
import { spring } from '@/design-system/motion/tokens';

const features = [
  {
    icon: Sparkles,
    title: "AI Issue Detection",
    desc: "Automatically categorizes reports"
  },
  {
    icon: Users,
    title: "Community Verification",
    desc: "Validate reports together"
  },
  {
    icon: MapPin,
    title: "Interactive Maps",
    desc: "Explore nearby issues"
  },
  {
    icon: Activity,
    title: "Real-Time Tracking",
    desc: "Track issue progress"
  },
  {
    icon: Award,
    title: "Reputation Rewards",
    desc: "Earn Civic Points"
  },
  {
    icon: Bell,
    title: "Smart Notifications",
    desc: "Stay updated"
  }
];

const stats = [
  { value: "450K+", label: "Community Points" },
  { value: "15K+", label: "Reports Submitted" },
  { value: "96%", label: "AI Accuracy" },
  { value: "24h", label: "Avg Response Time" }
];

const badges = [
  { icon: Shield, label: "Government Ready" },
  { icon: Sparkles, label: "AI Powered" },
  { icon: Lock, label: "Privacy First" },
  { icon: Users, label: "Community Verified" },
  { icon: Eye, label: "Human Moderation" }
];

export function AuthLayout({ children }: { children: React.ReactNode }) {
  const [activeFeature, setActiveFeature] = useState(0);

  // Auto-rotate features
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen w-full flex bg-[#030712] text-white overflow-hidden relative selection:bg-indigo-500/30">
      
      {/* Mobile Background - subtle glow */}
      <div className="absolute inset-0 lg:hidden overflow-hidden pointer-events-none">
        <div className="absolute top-0 inset-x-0 h-64 bg-indigo-500/10 blur-[100px] rounded-full transform -translate-y-1/2" />
      </div>

      {/* LEFT SHOWCASE PANEL (Desktop Only) */}
      <div className="hidden lg:flex w-1/2 relative flex-col justify-between p-12 border-r border-white/5 z-10 overflow-hidden">
        {/* Animated Gradient Mesh Background */}
        <div className="absolute inset-0 z-0 opacity-40">
          <motion.div 
            className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-600/30 blur-[120px]"
            animate={{ 
              x: [0, 100, 0],
              y: [0, 50, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          />
          <motion.div 
            className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-purple-600/30 blur-[120px]"
            animate={{ 
              x: [0, -100, 0],
              y: [0, -50, 0],
              scale: [1, 1.3, 1]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          <motion.div 
            className="absolute top-[40%] left-[40%] w-[40%] h-[40%] rounded-full bg-blue-600/20 blur-[100px]"
            animate={{ 
              x: [0, 50, -50, 0],
              y: [0, -50, 50, 0],
            }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          />
        </div>

        {/* Particles Overlay */}
        <div className="absolute inset-0 z-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay" />

        {/* Content Container */}
        <div className="relative z-10 flex flex-col h-full">
          {/* Logo / Brand */}
          <Link href="/" className="flex items-center gap-3 w-fit group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/40 transition-shadow">
              <Globe className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              CivicMind <span className="px-2 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 text-xs uppercase tracking-widest font-semibold border border-indigo-500/20">AI</span>
            </span>
          </Link>

          {/* Hero Section */}
          <div className="mt-20">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, ...spring.gentle }}
              className="text-5xl xl:text-6xl font-extrabold tracking-tight leading-[1.1] mb-6"
            >
              Building <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">Smarter</span><br />
              Communities Together.
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, ...spring.gentle }}
              className="text-lg text-gray-400 max-w-xl leading-relaxed"
            >
              Report civic issues, collaborate with your neighborhood, earn reputation, and help local authorities create better cities using responsible AI.
            </motion.p>
          </div>

          {/* Feature Showcase */}
          <div className="mt-16 flex-1">
            <div className="grid grid-cols-2 gap-4">
              {features.map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + (idx * 0.1), ...spring.gentle }}
                  className={`p-4 rounded-2xl border transition-all duration-500 ${
                    activeFeature === idx 
                      ? 'bg-white/10 border-white/20 shadow-[0_0_30px_-5px_rgba(99,102,241,0.3)]' 
                      : 'bg-white/5 border-white/5 hover:bg-white/10'
                  }`}
                >
                  <feature.icon className={`w-6 h-6 mb-3 ${activeFeature === idx ? 'text-indigo-400' : 'text-gray-400'}`} />
                  <h3 className={`font-semibold mb-1 ${activeFeature === idx ? 'text-white' : 'text-gray-300'}`}>
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {feature.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Badges & Stats */}
          <div className="mt-12 space-y-8">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="flex flex-wrap gap-2"
            >
              {badges.map((badge, idx) => (
                <div key={idx} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-gray-300">
                  <badge.icon className="w-3.5 h-3.5 text-indigo-400" />
                  {badge.label}
                </div>
              ))}
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, ...spring.gentle }}
              className="grid grid-cols-4 gap-6 pt-8 border-t border-white/10"
            >
              {stats.map((stat, idx) => (
                <div key={idx}>
                  <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-[10px] uppercase tracking-wider font-semibold text-gray-500">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* RIGHT AUTH PANEL */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 lg:p-24 relative z-10">
        
        {/* Mobile Header (Hidden on Desktop) */}
        <div className="absolute top-6 left-6 lg:hidden">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
              <Globe className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold tracking-tight text-white flex items-center gap-1.5">
              CivicMind <span className="px-1.5 py-0.5 rounded text-[10px] uppercase tracking-widest font-bold bg-indigo-500/20 text-indigo-300">AI</span>
            </span>
          </Link>
        </div>

        <div className="w-full max-w-md relative mt-12 lg:mt-0">
          
          {/* Security Message */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex items-center justify-center gap-2 mb-8 text-xs font-medium text-indigo-300/80 bg-indigo-500/10 py-2 px-4 rounded-full border border-indigo-500/20 w-fit mx-auto"
          >
            <ShieldCheck className="w-4 h-4" />
            Your information is encrypted and securely protected.
          </motion.div>

          {/* Form Container */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.2, ...spring.gentle }}
            className="bg-[#0c1222]/80 backdrop-blur-2xl rounded-3xl p-8 border border-white/10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] relative overflow-hidden"
          >
            {/* Inner Glow */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-indigo-500/20 rounded-full blur-[50px] pointer-events-none" />

            <div className="relative z-10">
              {children}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
