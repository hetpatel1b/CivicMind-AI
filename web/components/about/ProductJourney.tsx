import React from 'react';
import { Target, Lightbulb, TrendingUp } from 'lucide-react';

export default function ProductJourney() {
  return (
    <section className="mb-24">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight">The CivicMind Story</h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 font-medium">Why we exist and the civic challenges we are solving.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Problem */}
        <div className="bg-white dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800 rounded-[2rem] p-8 shadow-sm hover:shadow-xl transition-all duration-300 group">
          <div className="w-14 h-14 bg-rose-50 dark:bg-rose-900/20 rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-rose-100 dark:border-rose-800/30 group-hover:scale-110 transition-transform">
            <Target className="w-7 h-7 text-rose-500 dark:text-rose-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">The Problem</h3>
          <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
            Citizens often encounter infrastructure issues but lack an easy, transparent way to report them. Local authorities are overwhelmed by duplicate, unstructured data, leading to delayed responses and civic frustration.
          </p>
        </div>

        {/* Solution */}
        <div className="bg-white dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800 rounded-[2rem] p-8 shadow-sm hover:shadow-xl transition-all duration-300 group relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-transparent dark:from-indigo-900/10 pointer-events-none" />
          <div className="w-14 h-14 bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-indigo-100 dark:border-indigo-800/30 group-hover:scale-110 transition-transform relative z-10">
            <Lightbulb className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 relative z-10">Our Solution</h3>
          <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed font-medium relative z-10">
            CivicMind AI provides a frictionless reporting platform. Our AI analyzes submissions, categorizes issues, groups duplicates, and assesses severity, presenting authorities with clean, actionable insights.
          </p>
        </div>

        {/* Impact */}
        <div className="bg-white dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800 rounded-[2rem] p-8 shadow-sm hover:shadow-xl transition-all duration-300 group">
          <div className="w-14 h-14 bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-emerald-100 dark:border-emerald-800/30 group-hover:scale-110 transition-transform">
            <TrendingUp className="w-7 h-7 text-emerald-500 dark:text-emerald-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">The Impact</h3>
          <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
            Faster resolution times, transparent progress tracking, and a gamified reputation system encourage active community participation, ultimately leading to safer, better-maintained cities.
          </p>
        </div>
      </div>
    </section>
  );
}
