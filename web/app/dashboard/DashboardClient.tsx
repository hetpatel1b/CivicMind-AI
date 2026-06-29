'use client';

import React from 'react';
import DashboardHero from '@/components/dashboard/DashboardHero';
import QuickStats from '@/components/dashboard/QuickStats';
import ReputationSnapshot from '@/components/dashboard/ReputationSnapshot';
import RecentActivity from '@/components/dashboard/RecentActivity';
import QuickActions from '@/components/dashboard/QuickActions';
import AIDigestWidget from '@/components/dashboard/AIDigestWidget';
import InteractiveMapPreview from '@/components/dashboard/InteractiveMapPreview';
import CommunityPulse from '@/components/dashboard/CommunityPulse';

import { ReputationProfile, ReputationSummary } from '@/types/reputation';
import { BadgeSummary } from '@/types/badge';
import { motion } from 'framer-motion';
import { staggerContainer, fadeUp } from '@/design-system/motion/variants';

export interface RecentReportType {
  id: string;
  title: string;
  status: string;
  created_at: string;
}

export interface RecentEventType {
  id: string;
  type: string;
  points: number;
  created_at: string;
}

interface DashboardClientProps {
  userName: string;
  summary: ReputationSummary | null;
  profile: ReputationProfile | null;
  badgeSummary: BadgeSummary | null;
  recentReports: RecentReportType[];
  recentEvents: RecentEventType[];
}

export default function DashboardClient({
  userName,
  summary,
  profile,
  badgeSummary,
  recentReports,
  recentEvents
}: DashboardClientProps) {
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
