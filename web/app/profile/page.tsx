'use client';

import React, { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase-browser';
import { getReputationProfile, getReputationSummary } from '@/services/reputation';
import { getBadgeSummary } from '@/services/badges';

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

export default function ProfilePage() {
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [userMetadata, setUserMetadata] = useState<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [reputationProfile, setReputationProfile] = useState<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [reputationSummary, setReputationSummary] = useState<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [badgeSummary, setBadgeSummary] = useState<any>(null);

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

      } catch (error) {
        console.error('Error loading profile:', error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  if (loading) {
    return <ProfileSkeleton />;
  }

  if (!userId) {
    return null; // Will redirect to login
  }

  return (
    <main className="min-h-screen bg-[#f8fafc] dark:bg-[#020817] pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header */}
        <div className="mb-8">
          <ProfileHeader 
            fullName={userMetadata.fullName}
            email={userMetadata.email}
            avatarUrl={userMetadata.avatarUrl}
            createdAt={userMetadata.createdAt}
          />
        </div>

        {/* Global Statistics Grid */}
        <div className="mb-8">
          <ProfileStatistics 
            summary={reputationSummary} 
            totalBadges={badgeSummary?.totalBadges || 0} 
          />
        </div>

        {/* Complex Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Sidebar (Rank & Navigation) */}
          <div className="lg:col-span-1 space-y-6">
            <ProfileReputation profile={reputationProfile} />
            <ProfileActions />
          </div>

          {/* Right Main Content (History & Details) */}
          <div className="lg:col-span-2 space-y-6">
            <ProfileBadges badgeSummary={badgeSummary} />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ProfileReports userId={userId} />
              <ProfileSupports userId={userId} />
            </div>

            <ProfileComments userId={userId} />
            <ProfileActivity userId={userId} />
          </div>
          
        </div>
      </div>
    </main>
  );
}
