import React from 'react';
import { User, Calendar } from 'lucide-react';

interface ProfileHeaderProps {
  fullName: string | null;
  email: string | null;
  avatarUrl: string | null;
  createdAt: string;
}

export default function ProfileHeader({ fullName, email, avatarUrl, createdAt }: ProfileHeaderProps) {
  const memberSince = new Date(createdAt).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
  });

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col md:flex-row items-center gap-6">
      <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gray-100 dark:bg-gray-700 flex shrink-0 items-center justify-center overflow-hidden border-4 border-white dark:border-gray-800 shadow-md">
        {avatarUrl ? (
          <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
        ) : (
          <User className="w-12 h-12 text-gray-400" />
        )}
      </div>
      
      <div className="flex-1 text-center md:text-left">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
          {fullName || 'Civic Member'}
        </h1>
        {email && (
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
            {email}
          </p>
        )}
        <div className="flex items-center justify-center md:justify-start gap-2 text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/50 inline-flex px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700">
          <Calendar className="w-4 h-4" />
          Member since {memberSince}
        </div>
      </div>
    </div>
  );
}
