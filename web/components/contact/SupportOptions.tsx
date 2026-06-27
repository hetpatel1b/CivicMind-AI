import React from 'react';
import { HelpCircle, Bug, Search, Settings } from 'lucide-react';
import Link from 'next/link';

const OPTIONS = [
  { title: 'Help Center', description: 'Find answers in our extensive knowledge base.', icon: HelpCircle, href: '/help' },
  { title: 'Report Civic Issue', description: 'Encountered a physical issue in your community? Report it.', icon: Bug, href: '/report' },
  { title: 'Explore Feed', description: 'See what issues others are reporting around you.', icon: Search, href: '/feed' },
  { title: 'Account Settings', description: 'Manage your profile and platform preferences.', icon: Settings, href: '/settings' },
];

export default function SupportOptions() {
  return (
    <section className="py-20 bg-[#f8fafc] dark:bg-[#020817]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">How can we help?</h2>
          <div className="w-16 h-1 bg-blue-500 mx-auto mb-8 rounded-full" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {OPTIONS.map((option, idx) => (
            <Link key={idx} href={option.href} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow group focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 block">
              <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <option.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{option.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{option.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
