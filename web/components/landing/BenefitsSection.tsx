import React from 'react';
import { UserCircle, Building2, UsersRound } from 'lucide-react';

const benefits = [
  {
    title: 'For Citizens',
    description: 'A frictionless way to improve the neighborhood you live in.',
    icon: <UserCircle className="w-8 h-8 text-blue-600 dark:text-blue-400" aria-hidden="true" />,
    points: [
      'Report issues in under 60 seconds',
      'Track progress in real-time',
      'Earn reputation badges for helping',
      'Remain completely anonymous if preferred'
    ]
  },
  {
    title: 'For Local Authorities',
    description: 'A powerful triaging system that saves time and municipal budget.',
    icon: <Building2 className="w-8 h-8 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />,
    points: [
      'Automated issue categorization',
      'Duplicate report filtering',
      'Severity-based prioritization',
      'Comprehensive data analytics dashboard'
    ]
  },
  {
    title: 'For Communities',
    description: 'Fostering a culture of civic responsibility and transparency.',
    icon: <UsersRound className="w-8 h-8 text-purple-600 dark:text-purple-400" aria-hidden="true" />,
    points: [
      'Public, verifiable issue map',
      'Community upvoting for priorities',
      'Transparent resolution timelines',
      'Stronger trust in local government'
    ]
  }
];

export default function BenefitsSection() {
  return (
    <section className="py-24 bg-white dark:bg-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Value for Everyone
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            CivicMind AI is designed to align the incentives of citizens and city officials.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex flex-col">
              <div className="w-16 h-16 bg-gray-50 dark:bg-gray-900 rounded-2xl flex items-center justify-center mb-6 border border-gray-100 dark:border-gray-800">
                {benefit.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                {benefit.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                {benefit.description}
              </p>
              <ul className="space-y-3 mt-auto">
                {benefit.points.map((point, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-700 dark:text-gray-300 font-medium">
                    <span className="text-blue-500 mt-1">✓</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
