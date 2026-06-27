import React from 'react';
import { AlertOctagon, ShieldCheck } from 'lucide-react';

export default function WhyCivicMindSection() {
  return (
    <section className="py-24 bg-white dark:bg-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Why CivicMind AI?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Bridging the communication gap between frustrated citizens and overwhelmed city officials.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-stretch">
          
          {/* Problem */}
          <div className="bg-red-50/50 dark:bg-red-950/20 p-8 md:p-12 rounded-3xl border border-red-100 dark:border-red-900/30 relative">
            <div className="w-12 h-12 bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400 rounded-2xl flex items-center justify-center mb-8">
              <AlertOctagon className="w-6 h-6" aria-hidden="true" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">The Problem</h3>
            <ul className="space-y-4">
              {[
                'Citizens struggle to report infrastructure issues through outdated portals.',
                'Duplicate reports clog the system, wasting municipal time and resources.',
                'Lack of transparency leads to frustration and low civic engagement.',
                'Authorities cannot easily prioritize issues based on community impact.'
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-600 dark:text-gray-400">
                  <span className="text-red-500 mt-1">•</span>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Solution */}
          <div className="bg-emerald-50/50 dark:bg-emerald-950/20 p-8 md:p-12 rounded-3xl border border-emerald-100 dark:border-emerald-900/30 relative">
            <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-center justify-center mb-8">
              <ShieldCheck className="w-6 h-6" aria-hidden="true" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">The CivicMind Solution</h3>
            <ul className="space-y-4">
              {[
                'Seamless, mobile-first reporting interface accessible to everyone.',
                'AI instantly identifies duplicates and categorizes issue severity.',
                'Real-time public feed and map ensuring complete transparency.',
                'Gamified reputation system encouraging active community participation.'
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-600 dark:text-gray-400">
                  <span className="text-emerald-500 mt-1">✓</span>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}
