import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { buttonVariants } from '@/design-system/components/Button';

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
            className={buttonVariants('primary', 'lg', 'w-full sm:w-auto shadow-lg')}
          >
            Report an Issue
            <ArrowRight className="w-5 h-5 ml-2" aria-hidden="true" />
          </Link>
          
          <Link 
            href="/register"
            className={buttonVariants('secondary', 'lg', 'w-full sm:w-auto')}
          >
            Join the Community
          </Link>
        </div>
      </div>
    </section>
  );
}
