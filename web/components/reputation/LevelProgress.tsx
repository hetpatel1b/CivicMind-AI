import React from 'react';
import { Target, Star } from 'lucide-react';
import { ReputationProfile } from '@/types/reputation';

interface LevelProgressProps {
  profile: ReputationProfile;
}

export default function LevelProgress({ profile }: LevelProgressProps) {
  let nextLevelThreshold = 0;
  if (profile.totalPoints < 50) nextLevelThreshold = 50;
  else if (profile.totalPoints < 150) nextLevelThreshold = 150;
  else if (profile.totalPoints < 300) nextLevelThreshold = 300;
  
  const isMaxLevel = nextLevelThreshold === 0;
  
  let progressPercentage = 100;
  let pointsNeeded = 0;

  if (!isMaxLevel) {
    let baseThreshold = 0;
    if (nextLevelThreshold === 50) baseThreshold = 0;
    else if (nextLevelThreshold === 150) baseThreshold = 50;
    else if (nextLevelThreshold === 300) baseThreshold = 150;
    
    const pointsInCurrentLevel = profile.totalPoints - baseThreshold;
    const levelRange = nextLevelThreshold - baseThreshold;
    progressPercentage = Math.min(100, Math.max(0, (pointsInCurrentLevel / levelRange) * 100));
    pointsNeeded = nextLevelThreshold - profile.totalPoints;
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
      <div className="flex items-center gap-3 mb-6">
        <Target className="w-6 h-6 text-blue-500" />
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Rank Progression</h3>
      </div>
      
      {isMaxLevel ? (
        <div className="flex flex-col items-center justify-center p-6 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border border-yellow-100 dark:border-yellow-900/50 text-center">
          <Star className="w-12 h-12 text-yellow-500 mb-3" />
          <h4 className="text-lg font-bold text-yellow-700 dark:text-yellow-500 mb-1">Max Rank Achieved</h4>
          <p className="text-sm text-yellow-600 dark:text-yellow-600">You are a Civic Champion! You have reached the highest tier on the platform.</p>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-end mb-2">
            <div>
              <div className="text-3xl font-extrabold text-gray-900 dark:text-white">{progressPercentage.toFixed(0)}%</div>
              <div className="text-sm text-gray-500 dark:text-gray-400 font-medium">Completed</div>
            </div>
            <div className="text-right">
              <div className="text-sm font-bold text-gray-900 dark:text-white">{pointsNeeded} Points</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">until next rank</div>
            </div>
          </div>
          
          <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-4 mb-2 overflow-hidden shadow-inner relative">
            <div 
              className="bg-blue-600 dark:bg-blue-500 h-full rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          
          <div className="flex justify-between text-xs font-semibold text-gray-400 dark:text-gray-500">
            <span>{profile.level}</span>
            <span>Next Rank</span>
          </div>
        </>
      )}
    </div>
  );
}
