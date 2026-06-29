import React from 'react';
import Link from 'next/link';
import { LayoutDashboard, MapPin, Users, Code2 } from 'lucide-react';

const ACTIONS = [
  { title: 'Go to Dashboard', icon: LayoutDashboard, href: '/dashboard', primary: true },
  { title: 'Report Issue', icon: MapPin, href: '/report', primary: false },
  { title: 'Community Feed', icon: Users, href: '/feed', primary: false },
];

export default function CallToAction() {
  return (
    <section className="mb-24 border-t border-gray-100 dark:border-gray-800 pt-20">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight">Ready to make an impact?</h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 font-medium">Join thousands of citizens actively improving their communities.</p>
      </div>

      <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
        {ACTIONS.map((action, idx) => (
          <Link 
            key={idx}
            href={action.href}
            className={`flex items-center px-6 py-4 rounded-xl font-bold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 shadow-sm hover:shadow-md hover:-translate-y-0.5 ${
              action.primary 
                ? 'bg-indigo-600 text-white hover:bg-indigo-700 focus-visible:ring-offset-2' 
                : 'bg-white dark:bg-gray-900/50 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-700'
            }`}
          >
            <action.icon className="w-5 h-5 mr-3" aria-hidden="true" />
            {action.title}
          </Link>
        ))}
        <a 
          href="https://github.com/civicmind" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center px-6 py-4 rounded-xl font-bold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 shadow-sm hover:shadow-md hover:-translate-y-0.5 bg-gray-900 text-white hover:bg-gray-800 dark:bg-gray-800 dark:hover:bg-gray-700 border border-transparent"
        >
          <Code2 className="w-5 h-5 mr-3" aria-hidden="true" />
          GitHub Repository
        </a>
      </div>
    </section>
  );
}
