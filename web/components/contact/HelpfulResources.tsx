import React from 'react';
import Link from 'next/link';
import { HelpCircle, Bug, Settings, BookOpen, Search, Trophy, Info, MessageSquare, ArrowRight } from 'lucide-react';

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
    <section className="mb-16">
      <div className="text-center max-w-3xl mx-auto mb-10">
        <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight">Helpful Resources</h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 font-medium">Before contacting support, check out these frequently used resources.</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {RESOURCES.map((resource, idx) => (
          <Link 
            key={idx} 
            href={resource.href} 
            className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-2xl"
          >
            <div className="h-full flex items-center p-4 bg-white dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-sm backdrop-blur-xl transition-all duration-300 hover:shadow-md hover:border-indigo-200 dark:hover:border-indigo-900/50 overflow-hidden relative">
              <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center shrink-0 mr-4 group-hover:scale-110 transition-transform duration-300 shadow-sm relative z-10">
                <resource.icon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" aria-hidden="true" />
              </div>
              <div className="flex-1 min-w-0 relative z-10">
                <h3 className="text-base font-bold text-gray-900 dark:text-white truncate">{resource.title}</h3>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 truncate">{resource.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
