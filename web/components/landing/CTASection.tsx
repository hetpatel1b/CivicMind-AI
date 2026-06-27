import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="py-24 bg-white dark:bg-[#020817]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
          Ready to transform your city?
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-10 leading-relaxed max-w-2xl mx-auto">
          Every report matters. Join thousands of active citizens and forward-thinking municipalities working together to build safer, smarter, and cleaner communities.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            href="/report"
            className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-lg transition-colors shadow-lg flex items-center justify-center gap-2"
          >
            Report an Issue
            <ArrowRight className="w-5 h-5" aria-hidden="true" />
          </Link>
          
          <Link 
            href="/register"
            className="w-full sm:w-auto px-8 py-4 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white rounded-xl font-semibold text-lg transition-colors flex items-center justify-center"
          >
            Join the Community
          </Link>
        </div>
      </div>
    </section>
  );
}
