'use client';

import React, { useEffect, useState } from 'react';
import { Users, Crown, Medal } from 'lucide-react';
import ReputationEmptyState from './ReputationEmptyState';

export default function LeaderboardPreview() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [leaders, setLeaders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLeaderboard() {
      try {
        const res = await fetch('/api/analytics');
        const data = await res.json();
        if (data.success && data.analytics?.topUsers) {
          setLeaders(data.analytics.topUsers.slice(0, 5));
        }
      } catch (err) {
        console.error('Error fetching leaderboard:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchLeaderboard();
  }, []);

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 h-full animate-pulse">
        <div className="h-6 w-48 bg-gray-200 dark:bg-gray-700 rounded mb-6"></div>
        <div className="space-y-4">
          {[1,2,3].map(i => <div key={i} className="h-16 bg-gray-100 dark:bg-gray-700 rounded-xl"></div>)}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 h-full">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Users className="w-5 h-5 text-indigo-500" />
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Top Citizens</h3>
        </div>
        <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 px-2.5 py-1 rounded-full">
          Global
        </span>
      </div>
      
      {leaders.length === 0 ? (
        <ReputationEmptyState 
          icon={<Users className="w-8 h-8" />}
          title="Leaderboard Unavailable"
          description="Could not load the community leaderboard at this time."
        />
      ) : (
        <div className="space-y-3">
          {leaders.map((user, idx) => {
            let RankIcon = null;
            let rankColor = 'text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800';
            
            if (idx === 0) { RankIcon = Crown; rankColor = 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/40'; }
            else if (idx === 1) { RankIcon = Medal; rankColor = 'text-gray-600 bg-gray-200 dark:bg-gray-700'; }
            else if (idx === 2) { RankIcon = Medal; rankColor = 'text-orange-700 bg-orange-100 dark:bg-orange-900/40'; }

            return (
              <div key={user.userId} className="flex items-center justify-between p-3 rounded-xl border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${rankColor}`}>
                    {RankIcon ? <RankIcon className="w-4 h-4" /> : `#${idx + 1}`}
                  </div>
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
                    {user.fullName || 'Civic Member'}
                  </h4>
                </div>
                <div className="text-sm font-bold text-gray-900 dark:text-white">
                  {user.reputationPoints} pts
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
