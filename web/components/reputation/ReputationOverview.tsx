import React from 'react';
import { Trophy } from 'lucide-react';
import { ReputationProfile } from '@/types/reputation';

interface ReputationOverviewProps {
  profile: ReputationProfile;
}

export default function ReputationOverview({ profile }: ReputationOverviewProps) {
  return (
    <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-md relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute -right-20 -top-20 opacity-10">
        <Trophy className="w-64 h-64" />
      </div>

      <div className="flex items-center gap-6 relative z-10">
        <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/40 shadow-inner">
          <Trophy className="w-10 h-10 text-white" />
        </div>
        <div>
          <h2 className="text-3xl font-bold mb-1">{profile.level}</h2>
          <p className="text-blue-100 font-medium">Your Current Rank</p>
        </div>
      </div>
      
      <div className="relative z-10 text-center md:text-right bg-white/10 backdrop-blur-sm px-6 py-4 rounded-xl border border-white/20 shadow-inner">
        <div className="text-4xl font-extrabold mb-1">{profile.totalPoints}</div>
        <div className="text-sm text-blue-100 font-medium uppercase tracking-wider">Total Points</div>
      </div>
    </div>
  );
}
