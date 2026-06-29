import React from 'react';
import { createClient } from '@/lib/supabase-server';
import { redirect } from 'next/navigation';
import DashboardClient, { RecentReportType, RecentEventType } from './DashboardClient';
import { getReputationProfile, getReputationSummary } from '@/services/reputation';
import { getBadgeSummary } from '@/services/badges';

export default async function UserDashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // Fetch user profile data
  let userName = 'Citizen';
  try {
    const { data: userData } = await supabase
      .from('users')
      .select('full_name')
      .eq('id', user.id)
      .single();
    if (userData?.full_name) {
      userName = userData.full_name;
    }
  } catch (err) {
    console.error('Error fetching user data on server:', err);
  }

  // Fetch reputation summaries, badges, reports, and events in parallel on the server
  const [repSummary, repProfile, badges, reportsResult, eventsResult] = await Promise.all([
    getReputationSummary(user.id, supabase).catch(() => ({
      totalPoints: 0,
      totalReports: 0,
      totalSupports: 0,
      totalComments: 0,
    })),
    getReputationProfile(user.id, supabase).catch(() => ({
      userId: user.id,
      totalPoints: 0,
      level: 'Novice',
    })),
    getBadgeSummary(user.id, supabase).catch(() => ({
      totalBadges: 0,
      badges: [],
    })),
    supabase
      .from('issues')
      .select('id, title, status, created_at')
      .or(`user_id.eq.${user.id},created_by.eq.${user.id}`)
      .order('created_at', { ascending: false })
      .limit(5),
    supabase
      .from('reputation_events')
      .select('id, type, points, created_at')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(5),
  ]);

  const recentReports = (reportsResult.data || []) as unknown as RecentReportType[];
  const recentEvents = (eventsResult.data || []) as unknown as RecentEventType[];

  return (
    <DashboardClient
      userName={userName}
      summary={repSummary}
      profile={repProfile}
      badgeSummary={badges}
      recentReports={recentReports}
      recentEvents={recentEvents}
    />
  );
}
