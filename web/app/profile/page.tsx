'use client';

import React, { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase-browser';
import { getReputationProfile, getReputationSummary } from '@/services/reputation';
import { getBadgeSummary } from '@/services/badges';
import { motion, AnimatePresence } from 'framer-motion';

import ProfileHeader from '@/components/profile/ProfileHeader';
import ProfileStatistics from '@/components/profile/ProfileStatistics';
import ProfileReputation from '@/components/profile/ProfileReputation';
import ProfileBadges from '@/components/profile/ProfileBadges';
import ProfileReports from '@/components/profile/ProfileReports';
import ProfileSupports from '@/components/profile/ProfileSupports';
import ProfileComments from '@/components/profile/ProfileComments';
import ProfileActivity from '@/components/profile/ProfileActivity';
import ProfileActions from '@/components/profile/ProfileActions';
import ProfileSkeleton from '@/components/profile/ProfileSkeleton';
import ProfileInsights from '@/components/profile/ProfileInsights';
import ProfileEmptyState from '@/components/profile/ProfileEmptyState';
import { UserX, RefreshCw } from 'lucide-react';

export default function ProfilePage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [userMetadata, setUserMetadata] = useState<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [reputationProfile, setReputationProfile] = useState<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [reputationSummary, setReputationSummary] = useState<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [badgeSummary, setBadgeSummary] = useState<any>(null);

  const loadData = async (isRetry = false) => {
    if (isRetry) {
      setLoading(true);
      setError(false);
    }
    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        window.location.href = '/login';
        return;
      }

      setUserId(user.id);
      setUserMetadata({
        email: user.email,
        fullName: user.user_metadata?.full_name || null,
        avatarUrl: user.user_metadata?.avatar_url || null,
        createdAt: user.created_at,
      });

      // Concurrently fetch the robust gamification profile data
      const [repProfile, repSummary, badges] = await Promise.all([
        getReputationProfile(user.id),
        getReputationSummary(user.id),
        getBadgeSummary(user.id),
      ]);

      setReputationProfile(repProfile);
      setReputationSummary(repSummary);
      setBadgeSummary(badges);

    } catch (err) {
      console.error('Error loading profile:', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <ProfileSkeleton />;
  }

  if (error || !userId || !userMetadata) {
    return (
      <main className="min-h-screen bg-[#050505] relative pt-24 pb-12 flex items-center justify-center">
        {/* Ambient OS Background Elements */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay"></div>
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-600/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen" />
        </div>
        
        <div className="relative z-10 w-full max-w-4xl px-4">
          <ProfileEmptyState 
            icon={<UserX className="w-12 h-12 text-rose-400 drop-shadow-[0_0_10px_rgba(244,63,94,0.8)]" />}
            title={error ? "Unable to load profile" : "Profile not found"}
            description={error ? "We encountered an error loading your civic identity." : "Please sign in to view your profile."}
          />
          {error && (
            <div className="flex justify-center mt-8">
              <button onClick={() => loadData(true)} className="px-6 py-3 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-400 rounded-xl font-bold flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(244,63,94,0.1)] hover:shadow-[0_0_20px_rgba(244,63,94,0.3)]">
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
        
        <AnimatePresence mode="wait">
          <motion.div 
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8"
          >
            {/* Top Hero Card */}
            <ProfileHeader 
              fullName={userMetadata.fullName}
              email={userMetadata.email}
              avatarUrl={userMetadata.avatarUrl}
              createdAt={userMetadata.createdAt}
              reputationProfile={reputationProfile}
            />

            {/* Global Statistics Grid */}
            <ProfileStatistics 
              summary={reputationSummary} 
              totalBadges={badgeSummary?.totalBadges || 0} 
            />

            {/* Main Content Grid Layout */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 items-start">
              
              {/* Left Sidebar (Rank, Insights, Quick Actions) */}
              <div className="xl:col-span-1 space-y-8 xl:sticky xl:top-28">
                <ProfileReputation profile={reputationProfile} />
                <ProfileInsights />
                <ProfileActions />
              </div>

              {/* Right Main Content (History & Details) */}
              <div className="xl:col-span-2 space-y-8">
                <ProfileBadges badgeSummary={badgeSummary} />
                
                <ProfileActivity userId={userId} />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <ProfileReports userId={userId} />
                  <ProfileSupports userId={userId} />
                </div>

                <ProfileComments userId={userId} />
              </div>
              
            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </main>
  );
}
