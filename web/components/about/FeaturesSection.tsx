import React from 'react';
import Link from 'next/link';
import { Flag, Map, Cpu, ThumbsUp, Bell, Trophy, Shield } from 'lucide-react';

const FEATURES = [
  { title: 'Issue Reporting', description: 'Log civic issues with precise location data and photo evidence.', icon: Flag, href: '/report' },
  { title: 'Interactive Map', description: 'Visualize community problems geographically in real-time.', icon: Map, href: '/map' },
  { title: 'AI Assistance', description: 'Smart categorization and duplicate detection powered by AI.', icon: Cpu, href: '/about' },
  { title: 'Community Voting', description: 'Upvote critical issues to increase their visibility to authorities.', icon: ThumbsUp, href: '/feed' },
  { title: 'Notifications', description: 'Stay updated when issues you care about are resolved.', icon: Bell, href: '/notifications' },
  { title: 'Leaderboard', description: 'Earn reputation and badges for your active civic participation.', icon: Trophy, href: '/leaderboard' },
  { title: 'Admin Dashboard', description: 'Powerful moderation tools for city officials to manage reports.', icon: Shield, href: '/admin' },
];

export default function FeaturesSection() {
  return (
    <section className="py-20 bg-[#f8fafc] dark:bg-[#020817]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Key Features</h2>
          <div className="w-16 h-1 bg-blue-500 mx-auto mb-8 rounded-full" />
          <p className="text-lg text-gray-600 dark:text-gray-400">
            A comprehensive suite of tools designed to make civic engagement effortless and effective for everyone involved.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {FEATURES.map((feature, idx) => (
            <Link 
              key={idx} 
              href={feature.href}
              className="block group bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 transition-all hover:shadow-md hover:border-blue-200 dark:hover:border-blue-900/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <feature.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{feature.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
