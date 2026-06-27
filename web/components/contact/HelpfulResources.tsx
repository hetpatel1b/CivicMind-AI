import React from 'react';
import Link from 'next/link';
import { HelpCircle, Bug, Settings, BookOpen, Search, Trophy, Info, MessageSquare } from 'lucide-react';

const RESOURCES = [
  { title: 'Help Center', description: 'Comprehensive guides and tutorials.', icon: HelpCircle, href: '/help' },
  { title: 'FAQ', description: 'Answers to the most common questions.', icon: MessageSquare, href: '/help' },
  { title: 'Settings', description: 'Manage your account and preferences.', icon: Settings, href: '/settings' },
  { title: 'Report Issue', description: 'Report a physical civic issue in your area.', icon: Bug, href: '/report' },
  { title: 'Community Feed', description: 'Explore issues reported by other citizens.', icon: Search, href: '/feed' },
  { title: 'Leaderboard', description: 'See the top contributors in your community.', icon: Trophy, href: '/leaderboard' },
  { title: 'About Us', description: 'Learn about CivicMind AI and our mission.', icon: Info, href: '/about' },
  { title: 'Documentation', description: 'Technical documentation and APIs.', icon: BookOpen, href: '#' },
];

export default function HelpfulResources() {
  return (
    <section className="py-20 bg-[#f8fafc] dark:bg-gray-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Helpful Resources</h2>
          <p className="text-gray-600 dark:text-gray-400">Before contacting support, check out these helpful links.</p>
          <div className="w-16 h-1 bg-blue-500 mx-auto mt-8 rounded-full" />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {RESOURCES.map((resource, idx) => (
            <Link 
              key={idx} 
              href={resource.href} 
              className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-blue-300 dark:hover:border-blue-700 transition-all group focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <resource.icon className="w-5 h-5 text-blue-600 dark:text-blue-400" aria-hidden="true" />
              </div>
              <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2">{resource.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{resource.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
