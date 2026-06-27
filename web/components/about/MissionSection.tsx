import React from 'react';
import { Heart } from 'lucide-react';

export default function MissionSection() {
  return (
    <section className="py-20 bg-[#f8fafc] dark:bg-[#020817]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Our Mission</h2>
        <div className="w-16 h-1 bg-blue-500 mx-auto mb-8 rounded-full" />
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-12">
          CivicMind AI exists to bridge the gap between local governments and the citizens they serve. By providing an accessible, transparent, and AI-assisted platform for civic engagement, we empower communities to take an active role in resolving local issues and shaping their neighborhoods.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
            <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-6">
              <Heart className="w-6 h-6 text-blue-600 dark:text-blue-400" aria-hidden="true" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Citizen-First Governance</h3>
            <p className="text-gray-600 dark:text-gray-400">
              We believe that the most effective governance starts from the ground up. Our platform ensures that every citizen has a voice that is heard, categorized, and acted upon efficiently.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
            <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-6">
              <Heart className="w-6 h-6 text-blue-600 dark:text-blue-400" aria-hidden="true" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">AI-Assisted Engagement</h3>
            <p className="text-gray-600 dark:text-gray-400">
              By leveraging modern artificial intelligence, we streamline the reporting process, automate issue categorization, and help city officials prioritize what matters most to the community.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
