import React from 'react';
import { User } from 'lucide-react';

interface WelcomeCardProps {
  userName: string;
}

export default function WelcomeCard({ userName }: WelcomeCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 flex items-center gap-5">
      <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
        <User className="w-8 h-8 text-blue-600 dark:text-blue-400" />
      </div>
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Welcome back, {userName}!
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Thank you for making your community a better place.
        </p>
      </div>
    </div>
  );
}
