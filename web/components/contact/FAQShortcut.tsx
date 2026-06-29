import React from 'react';
import Link from 'next/link';
import { HelpCircle, Info, Settings } from 'lucide-react';
import { Card } from '@/design-system/components/Card';

const SHORTCUTS = [
  { title: 'Help Center', description: 'Find answers in our extensive knowledge base.', icon: HelpCircle, href: '/help' },
  { title: 'About Us', description: 'Learn more about CivicMind AI and our mission.', icon: Info, href: '/about' },
  { title: 'Account Settings', description: 'Manage your profile and application preferences.', icon: Settings, href: '/settings' },
];

export default function FAQShortcut() {
  return (
    <section className="py-20 bg-white dark:bg-[#020817] border-t border-gray-100 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12">Looking for something else?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {SHORTCUTS.map((shortcut, idx) => (
            <Link 
              key={idx} 
              href={shortcut.href}
              className="group focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-3xl"
            >
              <Card className="flex flex-col items-center justify-center p-8 bg-[#f8fafc] dark:bg-gray-800/50 hover:shadow-md hover:border-blue-300 dark:hover:border-blue-700 transition-all h-full">
                <div className="w-14 h-14 bg-white dark:bg-gray-900 rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                  <shortcut.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{shortcut.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed max-w-xs">{shortcut.description}</p>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
