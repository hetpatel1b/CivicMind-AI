import React from 'react';
import { Mail } from 'lucide-react';

export default function ContactHeader() {
  return (
    <header className="relative overflow-hidden bg-white dark:bg-[#020817] border-b border-gray-200 dark:border-gray-800 pt-24 pb-16 lg:pt-32 lg:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="inline-flex items-center justify-center p-3 bg-blue-50 dark:bg-blue-900/30 rounded-2xl mb-8">
          <Mail className="w-8 h-8 text-blue-600 dark:text-blue-400" aria-hidden="true" />
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-6">
          Contact CivicMind AI
        </h1>
        <p className="mt-4 text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
          Have a question, feedback, or need assistance? We&apos;re here to help you improve your community.
        </p>
      </div>
      
      {/* Background decoration */}
      <div className="absolute top-0 inset-x-0 h-64 bg-gradient-to-b from-blue-50 to-transparent dark:from-blue-900/10 dark:to-transparent pointer-events-none" aria-hidden="true" />
    </header>
  );
}
