import { createClient } from '@/lib/supabase-browser';
import { getReputationSummary } from '@/services/reputation';
import { getBadgeSummary } from '@/services/badges';
import { LeaderboardUser } from './LeaderboardTable';

export async function fetchLeaderboardData(): Promise<LeaderboardUser[]> {
  const supabase = createClient();
  
  // Fetch top 50 users sorted by reputation
  const { data: users, error } = await supabase
    .from('users')
    .select('id, full_name, avatar_url, role, reputation_points')
    .order('reputation_points', { ascending: false })
    .limit(50);

  if (error) {
    console.error('Error fetching leaderboard users:', error);
    throw new Error('Failed to load leaderboard data');
  }

  if (!users || users.length === 0) {
    return [];
  }

  // Fetch summaries concurrently
  const enhancedUsers = await Promise.all(
    users.map(async (u, index) => {
      try {
        const [repSummary, badgeSummary] = await Promise.all([
          getReputationSummary(u.id).catch(() => ({ totalReports: 0, totalSupports: 0, totalComments: 0, totalPoints: u.reputation_points })),
          getBadgeSummary(u.id).catch(() => ({ totalBadges: 0, badges: [] }))
        ]);

        return {
          id: u.id,
          rank: index + 1,
          name: u.full_name || 'Anonymous Citizen',
          avatarUrl: u.avatar_url,
          role: u.role || 'citizen',
          reputation: u.reputation_points || 0,
          badges: badgeSummary.totalBadges,
          reports: repSummary.totalReports,
          supports: repSummary.totalSupports,
          comments: repSummary.totalComments,
          status: 'active' as const // status logic is mock unless we have last_active_at
        };
      } catch {
        // Fallback if services fail
        return {
          id: u.id,
          rank: index + 1,
          name: u.full_name || 'Anonymous Citizen',
          avatarUrl: u.avatar_url,
          role: u.role || 'citizen',
          reputation: u.reputation_points || 0,
          badges: 0,
          reports: 0,
          supports: 0,
          comments: 0,
          status: 'active' as const
        };
      }
    })
  );

  return enhancedUsers;
}
