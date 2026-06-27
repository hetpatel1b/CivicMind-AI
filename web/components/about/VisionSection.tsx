import React from 'react';
import { Eye } from 'lucide-react';

export default function VisionSection() {
  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
          <div className="flex-1 text-center lg:text-left">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Our Long-term Vision</h2>
            <div className="w-16 h-1 bg-blue-500 mx-auto lg:mx-0 mb-8 rounded-full" />
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
              We envision a world where civic participation is a daily, frictionless habit rather than an annual obligation. A world where neighborhoods are collaboratively maintained by both the people who live in them and the authorities who manage them.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              In the coming years, CivicMind AI aims to become the standard digital infrastructure for modern municipalities, integrating deeply with city services to create an unbroken feedback loop of civic improvement.
            </p>
          </div>
          <div className="flex-1 flex justify-center lg:justify-end w-full max-w-md lg:max-w-none mx-auto">
            <div className="aspect-square w-full max-w-sm bg-gradient-to-tr from-blue-100 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/10 rounded-full flex items-center justify-center p-12 relative">
              <div className="absolute inset-0 border-4 border-blue-500/20 rounded-full animate-pulse" />
              <Eye className="w-32 h-32 text-blue-500 opacity-80" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
