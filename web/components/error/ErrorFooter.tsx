import React from 'react';
import Link from 'next/link';
import { Home, HelpCircle, Bug, Search, Mail, Settings } from 'lucide-react';

const HELPFUL_LINKS = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'Community Feed', href: '/feed', icon: Search },
  { label: 'Help Center', href: '/help', icon: HelpCircle },
  { label: 'Report Issue', href: '/report', icon: Bug },
  { label: 'Contact', href: '/contact', icon: Mail },
  { label: 'Settings', href: '/settings', icon: Settings },
];

export function ErrorFooter() {
  return (
    <div className="pt-8 border-t border-gray-100 dark:border-gray-800">
      <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">
        Helpful Links
      </p>
      <nav aria-label="Helpful Links" className="flex flex-wrap justify-center gap-4">
        {HELPFUL_LINKS.map((link, idx) => (
          <Link
            key={idx}
            href={link.href}
            className="flex items-center text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded px-2 py-1"
          >
            <link.icon className="w-4 h-4 mr-2" aria-hidden="true" />
            {link.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
