'use client';

import React from 'react';
import { MessageSquare } from 'lucide-react';
import Link from 'next/link';

export default function AssistantCTASection() {
  return (
    <section className="py-24 bg-white dark:bg-black relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-96 h-96 bg-blue-500/10 dark:bg-blue-500/5 blur-3xl rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-96 h-96 bg-purple-500/10 dark:bg-purple-500/5 blur-3xl rounded-full pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-xl shadow-blue-500/20 rotate-3">
          <MessageSquare className="w-10 h-10 text-white -rotate-3" />
        </div>
        
        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
          Meet your new Civic Assistant
        </h2>
        
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto">
          Have a question about how to report a specific issue? Need help navigating the dashboard? Our intelligent assistant is available 24/7 on every page.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={() => {
              // The AssistantWidget listens for nothing globally, but we can simulate a click on it
              // by finding the button (which has aria-label="Open Civic Assistant")
              const btn = document.querySelector('button[aria-label="Open Civic Assistant"]') as HTMLButtonElement;
              if (btn) btn.click();
            }}
            className="w-full sm:w-auto px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 rounded-xl font-semibold text-lg transition-colors flex items-center justify-center gap-2 shadow-lg"
          >
            Chat Now
            <MessageSquare className="w-5 h-5" />
          </button>
          
          <Link 
            href="/help"
            className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-[#020817] hover:bg-gray-50 dark:hover:bg-gray-900 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-800 rounded-xl font-semibold text-lg transition-colors flex items-center justify-center"
          >
            View Help Center
          </Link>
        </div>
        
        <p className="mt-6 text-sm text-gray-500 dark:text-gray-500">
          Or just click the blue chat bubble in the bottom right corner of your screen at any time.
        </p>
      </div>
    </section>
  );
}
