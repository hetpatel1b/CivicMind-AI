import React from 'react';
import { ArrowDown, User, Flag, Cpu, Users, Shield, CheckCircle, Bell } from 'lucide-react';

const JOURNEY_STEPS = [
  { title: 'Citizen Observer', description: 'A community member identifies a local problem.', icon: User, color: 'text-indigo-500' },
  { title: 'Report Issue', description: 'Log the issue with location and photo.', icon: Flag, color: 'text-blue-500' },
  { title: 'AI Analysis', description: 'Smart categorization & duplicate detection.', icon: Cpu, color: 'text-purple-500' },
  { title: 'Community Support', description: 'Neighbors verify and upvote the report.', icon: Users, color: 'text-pink-500' },
  { title: 'Admin Review', description: 'City officials prioritize based on support.', icon: Shield, color: 'text-orange-500' },
  { title: 'Issue Resolution', description: 'Authorities resolve the problem on site.', icon: CheckCircle, color: 'text-green-500' },
  { title: 'Notification', description: 'Community receives a resolution alert.', icon: Bell, color: 'text-blue-400' },
];

export default function ProductJourney() {
  return (
    <section className="py-20 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">How It Works</h2>
        <div className="w-16 h-1 bg-blue-500 mx-auto mb-12 rounded-full" />
        
        <div className="flex flex-col items-center">
          {JOURNEY_STEPS.map((step, idx) => (
            <React.Fragment key={idx}>
              <div className="bg-[#f8fafc] dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 w-full max-w-lg shadow-sm hover:shadow-md transition-shadow flex items-center gap-6">
                <div className={`w-14 h-14 rounded-full bg-white dark:bg-gray-900 flex-shrink-0 flex items-center justify-center border border-gray-100 dark:border-gray-800 shadow-sm ${step.color}`}>
                  <step.icon className="w-6 h-6" aria-hidden="true" />
                </div>
                <div className="text-left">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{step.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-snug">{step.description}</p>
                </div>
              </div>
              
              {idx < JOURNEY_STEPS.length - 1 && (
                <div className="h-10 w-px bg-gray-300 dark:bg-gray-700 my-2 relative">
                  <ArrowDown className="w-4 h-4 text-gray-400 absolute -bottom-2 -translate-x-1/2 left-1/2" aria-hidden="true" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
