'use client';

import React, { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase-browser';
import { getReputationProfile, getReputationSummary } from '@/services/reputation';
import { getBadgeSummary, getBadgeDefinitions, getUserBadges } from '@/services/badges';
import { motion, AnimatePresence } from 'framer-motion';

import ReputationHeader from '@/components/reputation/ReputationHeader';
import ReputationOverview from '@/components/reputation/ReputationOverview';
import ReputationStats from '@/components/reputation/ReputationStats';
import LevelProgress from '@/components/reputation/LevelProgress';
import BadgeGallery from '@/components/reputation/BadgeGallery';
import AchievementTimeline from '@/components/reputation/AchievementTimeline';
import LeaderboardPreview from '@/components/reputation/LeaderboardPreview';
import ReputationSkeleton from '@/components/reputation/ReputationSkeleton';
import AICivicCoach from '@/components/reputation/AICivicCoach';
import ReputationEmptyState from '@/components/reputation/ReputationEmptyState';
import { RefreshCw, UserX } from 'lucide-react';

export default function ReputationPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [reputationProfile, setReputationProfile] = useState<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [reputationSummary, setReputationSummary] = useState<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [badgeSummary, setBadgeSummary] = useState<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [userBadges, setUserBadges] = useState<any[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [reputationEvents, setReputationEvents] = useState<any[]>([]);

  const loadData = async () => {
    setLoading(true);
    setError(false);
    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        window.location.href = '/login';
        return;
      }

      setUserId(user.id);

      // Fetch core data concurrently
      const [repProfile, repSummary, badges, history, uBadges] = await Promise.all([
        getReputationProfile(user.id),
        getReputationSummary(user.id),
        getBadgeSummary(user.id),
        supabase.from('reputation_events').select('*').eq('user_id', user.id).order('created_at', { ascending: false }).limit(20),
        getUserBadges(user.id)
      ]);

      setReputationProfile(repProfile);
      setReputationSummary(repSummary);
      setBadgeSummary(badges);
      if (!history.error && history.data) {
        setReputationEvents(history.data);
      }
      setUserBadges(uBadges);

    } catch (err) {
      console.error('Error loading reputation data:', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadData();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#050505] relative pt-24 pb-12 overflow-x-hidden">
        {/* Ambient OS Background Elements */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay"></div>
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        </div>
        <ReputationSkeleton />
      </main>
    );
  }

  if (error || !userId || !reputationProfile || !reputationSummary) {
    return (
      <main className="min-h-screen bg-[#050505] relative pt-24 pb-12 flex flex-col items-center justify-center">
        {/* Ambient OS Background Elements */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay"></div>
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-red-600/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen" />
        </div>
        
        <div className="relative z-10 w-full max-w-4xl px-4">
          <ReputationEmptyState 
            icon={<UserX className="w-12 h-12 text-red-400 drop-shadow-[0_0_10px_rgba(239,68,68,0.8)]" />}
            title={error ? "Unable to load reputation" : "Profile not found"}
            description={error ? "We encountered an error loading your civic identity." : "Please sign in to view your civic identity."}
          />
          {error && (
            <div className="flex justify-center mt-8">
              <button onClick={loadData} className="px-6 py-3 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 rounded-xl font-bold flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(239,68,68,0.1)] hover:shadow-[0_0_20px_rgba(239,68,68,0.3)]">
                <RefreshCw className="w-4 h-4" /> Try Again
              </button>
            </div>
          )}
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#050505] relative pt-24 pb-12 overflow-x-hidden selection:bg-indigo-500/30 selection:text-indigo-200">
      
      {/* Ambient OS Background Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        
        {/* Deep ambient glows */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-600/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen" />
        <div className="absolute top-[40%] left-[-10%] w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen" />
        <div className="absolute bottom-0 right-[10%] w-[700px] h-[700px] bg-blue-600/5 rounded-full blur-[150px] pointer-events-none mix-blend-screen" />
      </div>

      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="mb-12">
          <ReputationHeader />
        </div>

        <AnimatePresence mode="wait">
          <motion.div 
            key="content" 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="space-y-12"
          >
            {/* Hero Section */}
            <ReputationOverview profile={reputationProfile} summary={reputationSummary} />

            {/* Statistics & Community Trust */}
            <ReputationStats reputationSummary={reputationSummary} badgeSummary={badgeSummary} />

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              
              {/* Left Column - Progress & Badges */}
              <div className="xl:col-span-2 space-y-12">
                <LevelProgress profile={reputationProfile} />
                <BadgeGallery badgeSummary={badgeSummary} />
              </div>

              {/* Right Column - AI Coach, Timeline, Next Goals */}
              <div className="xl:col-span-1 space-y-8 xl:sticky xl:top-28 self-start">
                <AICivicCoach />
                <LeaderboardPreview />
                <AchievementTimeline 
                  events={reputationEvents} 
                  userBadges={userBadges} 
                  badgeDefinitions={getBadgeDefinitions()} 
                />
              </div>
              
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  );
}
