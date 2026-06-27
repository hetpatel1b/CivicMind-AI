import React from 'react';
import Link from 'next/link';
import { ArrowRight, Target } from 'lucide-react';

export default function AboutHeader() {
  return (
    <header className="relative overflow-hidden bg-white dark:bg-[#020817] border-b border-gray-200 dark:border-gray-800 pt-24 pb-20 lg:pt-32 lg:pb-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="inline-flex items-center justify-center p-3 bg-blue-50 dark:bg-blue-900/30 rounded-2xl mb-8">
          <Target className="w-8 h-8 text-blue-600 dark:text-blue-400" aria-hidden="true" />
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-6">
          About CivicMind AI
        </h1>
        <p className="mt-4 text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
          Empowering citizens through AI-assisted civic engagement. We are building the future of transparent, community-driven governance.
        </p>
        
        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <Link 
            href="/feed"
            className="inline-flex items-center justify-center px-8 py-3.5 border border-transparent text-base font-semibold rounded-xl text-white bg-blue-600 hover:bg-blue-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 shadow-sm"
          >
            Explore Feed
            <ArrowRight className="ml-2 w-5 h-5" aria-hidden="true" />
          </Link>
          <Link 
            href="/report"
            className="inline-flex items-center justify-center px-8 py-3.5 border border-gray-300 dark:border-gray-700 text-base font-semibold rounded-xl text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 shadow-sm"
          >
            Report Issue
          </Link>
        </div>
      </div>
      
      {/* Background decoration */}
      <div className="absolute top-0 inset-x-0 h-64 bg-gradient-to-b from-blue-50 to-transparent dark:from-blue-900/10 dark:to-transparent pointer-events-none" />
    </header>
  );
}
