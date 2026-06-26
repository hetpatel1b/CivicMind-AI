'use client';

import React, { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase-browser';
import { getReputationProfile, getReputationSummary } from '@/services/reputation';
import { getBadgeSummary, getBadgeDefinitions, getUserBadges } from '@/services/badges';

import ReputationHeader from '@/components/reputation/ReputationHeader';
import ReputationOverview from '@/components/reputation/ReputationOverview';
import ReputationStats from '@/components/reputation/ReputationStats';
import LevelProgress from '@/components/reputation/LevelProgress';
import BadgeGallery from '@/components/reputation/BadgeGallery';
import PointsHistory from '@/components/reputation/PointsHistory';
import AchievementTimeline from '@/components/reputation/AchievementTimeline';
import LeaderboardPreview from '@/components/reputation/LeaderboardPreview';
import ReputationSkeleton from '@/components/reputation/ReputationSkeleton';

export default function ReputationPage() {
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    async function loadData() {
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

      } catch (error) {
        console.error('Error loading reputation data:', error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  if (loading) {
    return <ReputationSkeleton />;
  }

  if (!userId) {
    return null;
  }

  return (
    <main className="min-h-screen bg-[#f8fafc] dark:bg-[#020817] pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-8">
          <ReputationHeader />
        </div>

        <div className="mb-8">
          <ReputationOverview profile={reputationProfile} />
        </div>

        <div className="mb-8">
          <ReputationStats 
            reputationSummary={reputationSummary} 
            badgeSummary={badgeSummary} 
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 space-y-8">
            <LevelProgress profile={reputationProfile} />
            <BadgeGallery badgeSummary={badgeSummary} />
          </div>

          <div className="lg:col-span-1 space-y-8">
            <LeaderboardPreview />
            <AchievementTimeline 
              events={reputationEvents} 
              userBadges={userBadges} 
              badgeDefinitions={getBadgeDefinitions()} 
            />
            <PointsHistory events={reputationEvents} />
          </div>
          
        </div>
      </div>
    </main>
  );
}
