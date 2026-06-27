'use client';

import React, { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase-browser';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import WelcomeCard from '@/components/dashboard/WelcomeCard';
import QuickStats from '@/components/dashboard/QuickStats';
import ReputationCard from '@/components/dashboard/ReputationCard';
import BadgePreview from '@/components/dashboard/BadgePreview';
import RecentReports from '@/components/dashboard/RecentReports';
import RecentActivity from '@/components/dashboard/RecentActivity';
import QuickActions from '@/components/dashboard/QuickActions';
import AIDigestWidget from '@/components/dashboard/AIDigestWidget';
import { getReputationProfile, getReputationSummary } from '@/services/reputation';
import { getBadgeSummary } from '@/services/badges';

import { ReputationProfile, ReputationSummary } from '@/types/reputation';
import { BadgeSummary } from '@/types/badge';

interface RecentReportType {
  id: string;
  title: string;
  status: string;
  created_at: string;
}

interface RecentEventType {
  id: string;
  type: string;
  points: number;
  created_at: string;
}

export default function UserDashboardPage() {
  const [userName, setUserName] = useState<string>('Citizen');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [summary, setSummary] = useState<ReputationSummary | null>(null);
  const [profile, setProfile] = useState<ReputationProfile | null>(null);
  const [badgeSummary, setBadgeSummary] = useState<BadgeSummary | null>(null);
  const [recentReports, setRecentReports] = useState<RecentReportType[]>([]);
  const [recentEvents, setRecentEvents] = useState<RecentEventType[]>([]);

  useEffect(() => {
    async function loadDashboard() {
      try {
        setLoading(true);
        setError(null);
        
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          throw new Error('User not authenticated. Please log in.');
        }

        const { data: userData } = await supabase
          .from('users')
          .select('full_name')
          .eq('id', user.id)
          .single();
          
        if (userData?.full_name) {
          setUserName(userData.full_name);
        }

        const [repSummary, repProfile, badges] = await Promise.all([
          getReputationSummary(user.id).catch(() => ({ totalPoints: 0, totalReports: 0, totalSupports: 0, totalComments: 0 })),
          getReputationProfile(user.id).catch(() => ({ userId: user.id, totalPoints: 0, level: 'Novice' })),
          getBadgeSummary(user.id).catch(() => ({ totalBadges: 0, badges: [] }))
        ]);

        setSummary(repSummary);
        setProfile(repProfile);
        setBadgeSummary(badges);

        try {
          const { data: reports, error: reportsError } = await supabase
            .from('issues')
            .select('id, title, status, created_at')
            .or(`user_id.eq.${user.id},created_by.eq.${user.id}`)
            .order('created_at', { ascending: false })
            .limit(5);
            
          if (!reportsError && reports) {
            setRecentReports(reports as RecentReportType[]);
          }
        } catch (e) {
          console.warn('Could not fetch recent reports:', e);
        }

        try {
          const { data: events, error: eventsError } = await supabase
            .from('reputation_events')
            .select('id, type, points, created_at')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false })
            .limit(5);
            
          if (!eventsError && events) {
            setRecentEvents(events as RecentEventType[]);
          }
        } catch (e) {
          console.warn('Could not fetch recent reputation events:', e);
        }

      } catch (err: unknown) {
        console.error('Error loading dashboard:', err);
        setError('Failed to load dashboard data. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8fafc] dark:bg-[#020817] p-6 md:p-10 flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-blue-200 dark:border-blue-900 border-t-blue-600 dark:border-t-blue-500 rounded-full animate-spin mb-4"></div>
          <p className="text-gray-500 dark:text-gray-400 font-medium">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#f8fafc] dark:bg-[#020817] p-6 md:p-10 flex items-center justify-center">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm text-center max-w-md w-full border border-red-100 dark:border-red-900/30">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Error</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#f8fafc] dark:bg-[#020817] text-gray-900 dark:text-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <DashboardHeader />

        <div className="space-y-6 md:space-y-8">
          <AIDigestWidget 
            summary={summary}
            badgeSummary={badgeSummary}
            recentReports={recentReports}
            recentEvents={recentEvents}
          />

          {/* Top Section */}
          <section className="grid grid-cols-1 xl:grid-cols-3 gap-6 md:gap-8">
            <div className="xl:col-span-1">
              <WelcomeCard userName={userName} />
            </div>
            <div className="xl:col-span-2">
              <QuickStats 
                totalReports={summary?.totalReports || 0}
                totalSupports={summary?.totalSupports || 0}
                totalComments={summary?.totalComments || 0}
              />
            </div>
          </section>

          {/* Middle Section */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            <div className="lg:col-span-1">
              <ReputationCard 
                totalPoints={profile?.totalPoints || 0}
                level={profile?.level || 'Novice'}
              />
            </div>
            <div className="lg:col-span-2">
              <BadgePreview 
                totalBadges={badgeSummary?.totalBadges || 0}
                badges={badgeSummary?.badges || []}
              />
            </div>
          </section>

          {/* Bottom Section */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            <div className="lg:col-span-1 h-full">
              <RecentReports reports={recentReports} />
            </div>
            <div className="lg:col-span-1 h-full">
              <RecentActivity events={recentEvents} />
            </div>
            <div className="lg:col-span-1 h-full">
              <QuickActions />
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
