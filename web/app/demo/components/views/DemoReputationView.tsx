'use client';

import React, { useMemo } from 'react';
import { useDemo } from '../../context/DemoProvider';
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '@/design-system/motion/variants';
import { Trophy, TrendingUp, CheckCircle2, ShieldAlert, Award, Star, Zap, Target } from 'lucide-react';
import DemoLevelProgress from '../reputation/DemoLevelProgress';
import DemoBadgeGallery from '../reputation/DemoBadgeGallery';
import DemoAnalytics from '../reputation/DemoAnalytics';

interface DemoReputationViewProps {
  onNavigate: (view: string, id?: string | null) => void;
}

export default function DemoReputationView({ onNavigate }: DemoReputationViewProps) {
  const { currentUser, issues } = useDemo();

  // Create a robust mock profile for the gamification components
  const mockProfile = useMemo(() => {
    return {
      totalPoints: currentUser?.reputation || 1420,
      level: Math.floor((currentUser?.reputation || 1420) / 100) + 1,
      rank: 'Top 5%',
      weeklyGrowth: '+124',
      badges: currentUser?.badges || []
    };
  }, [currentUser]);

  const mockStats = useMemo(() => {
    return {
      reports: issues.filter(i => i.user_id === currentUser?.id).length || 12,
      verifications: 45,
      communityVotes: 128,
      successRate: 94
    };
  }, [issues, currentUser]);

  return (
    <div className="min-h-screen bg-transparent relative overflow-hidden pb-24 selection:bg-indigo-500/30 text-white">
      
      {/* Background ambient noise and glows */}
      <div className="absolute inset-0 z-0 bg-[url('/noise.png')] opacity-[0.03] pointer-events-none mix-blend-overlay" />
      <div className="absolute top-[20%] right-0 w-[800px] h-[800px] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute -top-[300px] -left-[200px] w-[800px] h-[800px] bg-indigo-600/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 md:pt-12 relative z-10">
        
        {/* Page Header */}
        <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="mb-12">
          <motion.div variants={fadeUp} className="flex items-center gap-3 mb-4">
            <div className="px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
              <Trophy className="w-4 h-4" />
              Civic Standing
            </div>
          </motion.div>
          <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-4">
            Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400">Reputation</span>
          </motion.h1>
          <motion.p variants={fadeUp} className="text-lg text-gray-400 max-w-2xl leading-relaxed font-medium">
            Track your impact, earn exclusive badges, and climb the civic leaderboard by actively improving your community.
          </motion.p>
        </motion.div>

        {/* Main Grid Layout */}
        <div className="flex flex-col gap-8">
          
          {/* Top Hero Section - Level Progress */}
          <DemoLevelProgress profile={mockProfile} />

          {/* Stats & Analytics Row */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            
            {/* Quick Stats Column */}
            <div className="xl:col-span-1 flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-6 rounded-[2rem] bg-[#0a0f1c]/80 backdrop-blur-3xl border border-white/10 ring-1 ring-white/5 hover:border-indigo-500/50 transition-colors group">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 mb-4 group-hover:scale-110 transition-transform">
                    <ShieldAlert className="w-5 h-5" />
                  </div>
                  <div className="text-3xl font-black text-white mb-1">{mockStats.reports}</div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-gray-500">Total Reports</div>
                </div>
                <div className="p-6 rounded-[2rem] bg-[#0a0f1c]/80 backdrop-blur-3xl border border-white/10 ring-1 ring-white/5 hover:border-emerald-500/50 transition-colors group">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-110 transition-transform">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div className="text-3xl font-black text-white mb-1">{mockStats.verifications}</div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-gray-500">Verifications</div>
                </div>
                <div className="p-6 rounded-[2rem] bg-[#0a0f1c]/80 backdrop-blur-3xl border border-white/10 ring-1 ring-white/5 hover:border-purple-500/50 transition-colors group">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 mb-4 group-hover:scale-110 transition-transform">
                    <Star className="w-5 h-5" />
                  </div>
                  <div className="text-3xl font-black text-white mb-1">{mockStats.communityVotes}</div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-gray-500">Helpful Votes</div>
                </div>
                <div className="p-6 rounded-[2rem] bg-[#0a0f1c]/80 backdrop-blur-3xl border border-white/10 ring-1 ring-white/5 hover:border-amber-500/50 transition-colors group">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400 mb-4 group-hover:scale-110 transition-transform">
                    <Target className="w-5 h-5" />
                  </div>
                  <div className="text-3xl font-black text-white mb-1">{mockStats.successRate}%</div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-gray-500">Success Rate</div>
                </div>
              </div>

              {/* Motivation Card */}
              <div className="p-6 rounded-[2rem] bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 flex-1 relative overflow-hidden">
                <div className="absolute right-0 top-0 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none" />
                <h3 className="text-lg font-black text-white tracking-tight mb-2">Daily Mission</h3>
                <p className="text-sm text-indigo-200/80 font-medium mb-6">Verify 3 infrastructure issues in your local area to earn a 50 XP bonus.</p>
                
                <div className="mb-2 flex justify-between text-xs font-bold text-indigo-300">
                  <span>Progress</span>
                  <span>1 / 3</span>
                </div>
                <div className="w-full h-2 bg-black/40 rounded-full overflow-hidden shadow-inner">
                  <div className="h-full bg-gradient-to-r from-indigo-400 to-purple-400 w-1/3 rounded-full" />
                </div>
              </div>
            </div>

            {/* Analytics Column */}
            <div className="xl:col-span-2">
              <DemoAnalytics summary={mockProfile} />
            </div>

          </div>

          {/* Badge Gallery */}
          <DemoBadgeGallery profile={mockProfile} />

        </div>
      </div>
    </div>
  );
}
