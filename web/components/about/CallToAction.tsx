import React from 'react';
import Link from 'next/link';
import { MessageSquarePlus, Activity, UserPlus, LifeBuoy } from 'lucide-react';

export default function CallToAction() {
  return (
    <section className="py-24 bg-blue-600 dark:bg-blue-900 text-white relative overflow-hidden">
      {/* Decorative bg elements */}
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-96 h-96 bg-blue-500 dark:bg-blue-800 rounded-full blur-3xl opacity-50 pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/4 w-80 h-80 bg-blue-400 dark:bg-blue-700 rounded-full blur-3xl opacity-40 pointer-events-none" />
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">Ready to make an impact?</h2>
        <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-2xl mx-auto leading-relaxed">
          Join thousands of citizens taking an active role in improving their neighborhoods today.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <Link 
            href="/report"
            className="flex flex-col items-center justify-center p-6 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-2xl hover:scale-105 transition-transform shadow-lg focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-300"
          >
            <MessageSquarePlus className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-3" aria-hidden="true" />
            <span className="font-bold">Report an Issue</span>
          </Link>
          
          <Link 
            href="/feed"
            className="flex flex-col items-center justify-center p-6 bg-blue-700 dark:bg-blue-800 text-white rounded-2xl hover:bg-blue-800 dark:hover:bg-blue-700 transition-colors shadow-lg border border-blue-500 dark:border-blue-600 focus:outline-none focus-visible:ring-4 focus-visible:ring-white"
          >
            <Activity className="w-8 h-8 mb-3 opacity-90" aria-hidden="true" />
            <span className="font-bold">Explore Feed</span>
          </Link>
          
          <Link 
            href="/register"
            className="flex flex-col items-center justify-center p-6 bg-blue-700 dark:bg-blue-800 text-white rounded-2xl hover:bg-blue-800 dark:hover:bg-blue-700 transition-colors shadow-lg border border-blue-500 dark:border-blue-600 focus:outline-none focus-visible:ring-4 focus-visible:ring-white"
          >
            <UserPlus className="w-8 h-8 mb-3 opacity-90" aria-hidden="true" />
            <span className="font-bold">Join Community</span>
          </Link>
          
          <Link 
            href="/help"
            className="flex flex-col items-center justify-center p-6 bg-blue-700 dark:bg-blue-800 text-white rounded-2xl hover:bg-blue-800 dark:hover:bg-blue-700 transition-colors shadow-lg border border-blue-500 dark:border-blue-600 focus:outline-none focus-visible:ring-4 focus-visible:ring-white"
          >
            <LifeBuoy className="w-8 h-8 mb-3 opacity-90" aria-hidden="true" />
            <span className="font-bold">Get Help</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
