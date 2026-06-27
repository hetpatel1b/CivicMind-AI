import React from 'react';
import { 
  BrainCircuit, 
  Users, 
  Map, 
  Trophy, 
  ShieldCheck, 
  LineChart 
} from 'lucide-react';

const features = [
  {
    title: 'AI Issue Detection',
    description: 'Our AI automatically categorizes and assesses the severity of reported issues based on images and text descriptions.',
    icon: <BrainCircuit className="w-6 h-6 text-blue-600 dark:text-blue-400" aria-hidden="true" />
  },
  {
    title: 'Community Reporting',
    description: 'Empower citizens to easily report local issues from their smartphones with precise location tracking.',
    icon: <Users className="w-6 h-6 text-green-600 dark:text-green-400" aria-hidden="true" />
  },
  {
    title: 'Live Map',
    description: 'Visualize all reported, pending, and resolved issues in your city on an interactive, real-time map.',
    icon: <Map className="w-6 h-6 text-purple-600 dark:text-purple-400" aria-hidden="true" />
  },
  {
    title: 'Reputation System',
    description: 'Earn points and badges for actively improving your community through verified reports and supports.',
    icon: <Trophy className="w-6 h-6 text-yellow-600 dark:text-yellow-400" aria-hidden="true" />
  },
  {
    title: 'Admin Dashboard',
    description: 'Provide city officials with powerful moderation tools to verify and manage reports efficiently.',
    icon: <ShieldCheck className="w-6 h-6 text-red-600 dark:text-red-400" aria-hidden="true" />
  },
  {
    title: 'Analytics',
    description: 'Track resolution times, common issues, and community engagement with comprehensive data insights.',
    icon: <LineChart className="w-6 h-6 text-indigo-600 dark:text-indigo-400" aria-hidden="true" />
  }
];

export default function FeatureSection() {
  return (
    <section id="features" className="py-24 bg-gray-50 dark:bg-black/50 border-y border-gray-100 dark:border-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Everything you need for a better city
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            CivicMind AI combines community engagement with artificial intelligence to streamline municipal issue resolution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white dark:bg-[#020817] p-8 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-gray-50 dark:bg-gray-900 rounded-xl flex items-center justify-center mb-6 border border-gray-100 dark:border-gray-800">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
