'use client';

import React, { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase-browser';
import DashboardHero from '@/components/dashboard/DashboardHero';
import QuickStats from '@/components/dashboard/QuickStats';
import ReputationSnapshot from '@/components/dashboard/ReputationSnapshot';
import RecentActivity from '@/components/dashboard/RecentActivity';
import QuickActions from '@/components/dashboard/QuickActions';
import AIDigestWidget from '@/components/dashboard/AIDigestWidget';
import InteractiveMapPreview from '@/components/dashboard/InteractiveMapPreview';
import CommunityPulse from '@/components/dashboard/CommunityPulse';
import { getReputationProfile, getReputationSummary } from '@/services/reputation';
import { getBadgeSummary } from '@/services/badges';

import { ReputationProfile, ReputationSummary } from '@/types/reputation';
import { BadgeSummary } from '@/types/badge';
import { motion } from 'framer-motion';
import { staggerContainer, fadeUp } from '@/design-system/motion/variants';

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
      <div className="min-h-screen bg-transparent p-6 md:p-10 flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin mb-4 shadow-[0_0_15px_rgba(99,102,241,0.5)]"></div>
          <p className="text-gray-400 font-medium tracking-wide">Initializing OS environment...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-transparent p-6 md:p-10 flex items-center justify-center">
        <div className="bg-[#050505]/80 backdrop-blur-3xl p-8 rounded-[2rem] border border-red-500/20 shadow-[0_0_40px_rgba(239,68,68,0.2)] text-center max-w-md w-full">
          <h2 className="text-xl font-bold text-white mb-2">System Error</h2>
          <p className="text-gray-400 mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-2.5 bg-red-600 hover:bg-red-500 text-white rounded-xl font-medium transition-colors shadow-[0_0_20px_rgba(239,68,68,0.4)]"
          >
            Reboot System
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-transparent text-white selection:bg-indigo-500/30 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {/* Top Section: Hero & Quick Actions */}
          <motion.div variants={fadeUp}>
            <DashboardHero userName={userName} profile={profile} />
          </motion.div>
          
          <QuickActions />

          {/* AI Intelligence Section */}
          <AIDigestWidget 
            summary={summary}
            badgeSummary={badgeSummary}
            recentReports={recentReports}
            recentEvents={recentEvents}
          />

          {/* KPI Statistics */}
          <QuickStats 
            totalReports={summary?.totalReports || 0}
            totalSupports={summary?.totalSupports || 0}
            totalComments={summary?.totalComments || 0}
          />

          {/* Map & Community */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-8">
            <InteractiveMapPreview />
            <CommunityPulse />
          </div>

          {/* Activity & Reputation */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            <RecentActivity events={recentEvents} />
            <ReputationSnapshot profile={profile} badgeSummary={badgeSummary} />
          </div>
        </motion.div>
      </div>
    </main>
  );
}
