import React from 'react';
import Link from 'next/link';
import { LucideIcon, ArrowRight } from 'lucide-react';

interface HelpCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
}

export default function HelpCard({ title, description, icon: Icon, href }: HelpCardProps) {
  return (
    <Link href={href} className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-[1.5rem]">
      <div className="h-full flex flex-col p-6 bg-white dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800 rounded-[1.5rem] shadow-sm backdrop-blur-xl transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-indigo-200 dark:hover:border-indigo-900/50 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-indigo-50 dark:bg-indigo-900/10 rounded-full blur-2xl group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/20 transition-colors" />
        <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-sm relative z-10">
          <Icon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" aria-hidden="true" />
        </div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 relative z-10">{title}</h3>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 leading-relaxed mb-6 flex-1 relative z-10">{description}</p>
        <div className="flex items-center text-sm font-bold text-indigo-600 dark:text-indigo-400 group-hover:text-indigo-700 dark:group-hover:text-indigo-300 transition-colors relative z-10">
          Learn more <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
}
