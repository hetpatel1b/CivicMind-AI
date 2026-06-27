import React from 'react';
import Link from 'next/link';
import { LucideIcon } from 'lucide-react';

interface HelpCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
}

export default function HelpCard({ title, description, icon: Icon, href }: HelpCardProps) {
  return (
    <Link href={href} className="block group focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-2xl">
      <div className="h-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 transition-all hover:shadow-md hover:border-blue-200 dark:hover:border-blue-900/50">
        <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
          <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" aria-hidden="true" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{description}</p>
      </div>
    </Link>
  );
}
