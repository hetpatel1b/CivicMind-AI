import React from 'react';
import Link from 'next/link';
import { Camera, MessageSquare, Map, Users, BarChart3, ShieldCheck } from 'lucide-react';

const aiFeatures = [
  {
    title: 'AI Issue Intelligence',
    description: 'Automatically analyzes uploaded photos to draft reports, categorize issues, and determine severity instantly.',
    icon: <Camera className="w-6 h-6 text-blue-600 dark:text-blue-400" aria-hidden="true" />,
    href: '/report',
    linkText: 'Try AI Reporting'
  },
  {
    title: 'Civic AI Assistant',
    description: 'A context-aware intelligent assistant ready to answer questions, guide reporting, and explain platform features.',
    icon: <MessageSquare className="w-6 h-6 text-indigo-600 dark:text-indigo-400" aria-hidden="true" />,
    href: '/help',
    linkText: 'Ask the Assistant'
  },
  {
    title: 'AI Maps Intelligence',
    description: 'Generates regional summaries and location-specific insights directly from the interactive city map.',
    icon: <Map className="w-6 h-6 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />,
    href: '/map',
    linkText: 'Explore Map Insights'
  },
  {
    title: 'AI Community Intelligence',
    description: 'Synthesizes community discussions, detects duplicate reports, and summarizes long comment threads.',
    icon: <Users className="w-6 h-6 text-purple-600 dark:text-purple-400" aria-hidden="true" />,
    href: '/feed',
    linkText: 'View Community Pulse'
  },
  {
    title: 'AI Analytics Intelligence',
    description: 'Explains complex data charts and statistical trends in plain English for better civic understanding.',
    icon: <BarChart3 className="w-6 h-6 text-amber-600 dark:text-amber-400" aria-hidden="true" />,
    href: '/admin',
    linkText: 'See Analytics'
  },
  {
    title: 'AI Admin Intelligence',
    description: 'Provides city administrators with daily executive summaries, resource recommendations, and anomaly alerts.',
    icon: <ShieldCheck className="w-6 h-6 text-red-600 dark:text-red-400" aria-hidden="true" />,
    href: '/admin',
    linkText: 'View Admin Dashboard'
  }
];

export default function AIFeaturesSection() {
  return (
    <section id="ai-features" className="py-24 bg-gray-50 dark:bg-[#020817] border-y border-gray-100 dark:border-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 font-medium text-sm mb-6 border border-purple-100 dark:border-purple-800">
            Platform Capabilities
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            A Fully Integrated AI Ecosystem
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Our proprietary AI models remove friction across the entire civic lifecycle, from reporting to resolution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {aiFeatures.map((feature, index) => (
            <Link 
              href={feature.href}
              key={index} 
              className="bg-white dark:bg-black p-8 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md hover:border-purple-200 dark:hover:border-purple-800 transition-all relative overflow-hidden group flex flex-col h-full"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/10 dark:to-purple-900/10 rounded-bl-full -z-10 group-hover:scale-110 transition-transform"></div>
              
              <div className="w-12 h-12 bg-gray-50 dark:bg-gray-900 rounded-xl flex items-center justify-center mb-6 border border-gray-100 dark:border-gray-800">
                {feature.icon}
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed flex-1">
                {feature.description}
              </p>
              
              <div className="mt-6 font-medium text-purple-600 dark:text-purple-400 group-hover:text-purple-700 dark:group-hover:text-purple-300 flex items-center gap-1 transition-colors">
                {feature.linkText} <span aria-hidden="true">&rarr;</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
