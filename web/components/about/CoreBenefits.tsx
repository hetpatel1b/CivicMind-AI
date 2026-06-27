import React from 'react';
import { Zap, BrainCircuit, Users, BellRing, MapPinned, Trophy } from 'lucide-react';

const BENEFITS = [
  { title: 'Faster Issue Reporting', description: 'Streamlined forms allow citizens to report problems in under 30 seconds.', icon: Zap },
  { title: 'AI Assisted Classification', description: 'Machine learning instantly tags, sorts, and checks for duplicate reports.', icon: BrainCircuit },
  { title: 'Transparent Voting', description: 'Democratic upvoting ensures the most critical issues surface first.', icon: Users },
  { title: 'Real-Time Notifications', description: 'Stay informed the exact moment an issue status changes.', icon: BellRing },
  { title: 'Interactive City Mapping', description: 'Visualize neighborhood health at a glance with geographic clustering.', icon: MapPinned },
  { title: 'Community Reputation', description: 'Gamified civic participation rewards engaged neighbors.', icon: Trophy },
];

export default function CoreBenefits() {
  return (
    <section className="py-20 bg-[#f8fafc] dark:bg-[#020817]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Core Benefits</h2>
          <div className="w-16 h-1 bg-blue-500 mx-auto mb-8 rounded-full" />
          <p className="text-lg text-gray-600 dark:text-gray-400">
            A platform engineered from the ground up to reduce friction and accelerate civic improvement.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BENEFITS.map((benefit, idx) => (
            <div key={idx} className="bg-white dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/40 dark:to-indigo-900/20 rounded-2xl flex items-center justify-center mb-6 border border-blue-100/50 dark:border-blue-800/50">
                <benefit.icon className="w-7 h-7 text-blue-600 dark:text-blue-400" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{benefit.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
