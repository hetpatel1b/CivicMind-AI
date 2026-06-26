import React from 'react';
import { Trophy, TrendingUp } from 'lucide-react';
import { ReputationProfile } from '@/types/reputation';
import ProfileCard from './ProfileCard';

interface ProfileReputationProps {
  profile: ReputationProfile;
}

export default function ProfileReputation({ profile }: ProfileReputationProps) {
  // Determine next level threshold
  let nextLevelThreshold = 0;
  if (profile.totalPoints < 50) nextLevelThreshold = 50;
  else if (profile.totalPoints < 150) nextLevelThreshold = 150;
  else if (profile.totalPoints < 300) nextLevelThreshold = 300;
  
  const isMaxLevel = nextLevelThreshold === 0;
  
  // Calculate progress percentage
  let progressPercentage = 100;
  if (!isMaxLevel) {
    let baseThreshold = 0;
    if (nextLevelThreshold === 50) baseThreshold = 0;
    else if (nextLevelThreshold === 150) baseThreshold = 50;
    else if (nextLevelThreshold === 300) baseThreshold = 150;
    
    const pointsInCurrentLevel = profile.totalPoints - baseThreshold;
    const levelRange = nextLevelThreshold - baseThreshold;
    progressPercentage = Math.min(100, Math.max(0, (pointsInCurrentLevel / levelRange) * 100));
  }

  return (
    <ProfileCard title="Reputation & Rank" icon={<Trophy className="w-5 h-5" />}>
      <div className="flex flex-col items-center justify-center p-4 mb-6">
        <div className="w-24 h-24 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center border-4 border-blue-100 dark:border-blue-900/50 mb-4 shadow-sm">
          <Trophy className="w-10 h-10 text-blue-600 dark:text-blue-400" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
          {profile.level}
        </h3>
        <p className="text-gray-500 dark:text-gray-400 font-medium">
          {profile.totalPoints} Total Points
        </p>
      </div>

      <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-5 border border-gray-100 dark:border-gray-700">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-green-500" />
            Progress to next rank
          </span>
          {!isMaxLevel && (
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
              {profile.totalPoints} / {nextLevelThreshold} pts
            </span>
          )}
        </div>
        
        {isMaxLevel ? (
          <div className="text-sm text-green-600 dark:text-green-400 font-medium text-center bg-green-50 dark:bg-green-900/20 p-2 rounded-lg">
            You have reached the maximum rank!
          </div>
        ) : (
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-2 overflow-hidden shadow-inner">
            <div 
              className="bg-blue-600 dark:bg-blue-500 h-3 rounded-full transition-all duration-1000"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        )}
      </div>
    </ProfileCard>
  );
}
