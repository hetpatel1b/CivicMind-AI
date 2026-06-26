import React from 'react';
import Link from 'next/link';
import { Edit3, LayoutDashboard, PlusCircle, List } from 'lucide-react';
import ProfileCard from './ProfileCard';

export default function ProfileActions() {
  return (
    <ProfileCard title="Quick Actions">
      <div className="space-y-3">
        <button 
          onClick={() => alert('Edit profile functionality coming soon in Phase 9.')}
          className="w-full flex items-center gap-3 p-3 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          <Edit3 className="w-4 h-4 text-gray-400" />
          Edit Profile
        </button>
        <Link 
          href="/dashboard"
          className="w-full flex items-center gap-3 p-3 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          <LayoutDashboard className="w-4 h-4 text-gray-400" />
          Go to Dashboard
        </Link>
        <Link 
          href="/report"
          className="w-full flex items-center gap-3 p-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition-colors text-sm font-medium"
        >
          <PlusCircle className="w-4 h-4" />
          Report New Issue
        </Link>
        <Link 
          href="/feed"
          className="w-full flex items-center gap-3 p-3 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          <List className="w-4 h-4 text-gray-400" />
          Community Feed
        </Link>
      </div>
    </ProfileCard>
  );
}
