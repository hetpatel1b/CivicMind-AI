import React from 'react';
import Link from 'next/link';
import { ArrowRight, MapPin } from 'lucide-react';

export default function HeroSection() {
  return (
    <section id="home" className="relative pt-20 pb-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-medium text-sm mb-8 border border-blue-100 dark:border-blue-800">
            <MapPin className="w-4 h-4" aria-hidden="true" />
            AI-Powered Civic Intelligence
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-8">
            CivicMind AI
          </h1>
          
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-200 mb-6">
            The intelligent operating system for modern cities
          </h2>
          
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Report issues, verify community problems, and track resolutions in real-time. Powered by AI to ensure the right departments get the right information instantly.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/report"
              className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-lg transition-colors shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2"
            >
              Report an Issue
              <ArrowRight className="w-5 h-5" />
            </Link>
            
            <Link 
              href="/demo/citizen"
              className="w-full sm:w-auto px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold text-lg transition-colors shadow-lg shadow-purple-600/20 flex items-center justify-center gap-2"
            >
              Try Citizen Demo
            </Link>

            <Link 
              href="/demo/admin"
              className="w-full sm:w-auto px-8 py-4 bg-gray-900 dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-100 text-white dark:text-gray-900 rounded-xl font-semibold text-lg transition-colors shadow-lg shadow-gray-900/20 flex items-center justify-center gap-2"
            >
              Try Admin Demo
            </Link>
          </div>
        </div>

        {/* Placeholder for illustration / application screenshot */}
        <div className="mt-20 relative max-w-5xl mx-auto">
          <div className="aspect-[16/9] bg-gradient-to-tr from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-2xl flex items-center justify-center overflow-hidden relative">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-40 dark:opacity-20 mix-blend-overlay"></div>
            <div className="text-center z-10 p-6 bg-white/80 dark:bg-black/80 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg">
              <p className="text-gray-500 dark:text-gray-400 font-medium">Application Preview / Interactive Map</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
