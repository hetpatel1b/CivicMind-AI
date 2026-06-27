import React from 'react';

const stats = [
  { label: 'Issues Reported', value: '10K+' },
  { label: 'Resolution Rate', value: '95%' },
  { label: 'Communities', value: '500+' },
  { label: 'Cities', value: '100+' },
  { label: 'AI Assistance', value: '24/7' },
  { label: 'Platform Uptime', value: '99%' }
];

export default function StatsSection() {
  return (
    <section id="stats" className="py-20 bg-blue-600 dark:bg-blue-900 text-white border-y border-blue-700 dark:border-blue-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 md:gap-y-12 text-center divide-x divide-blue-500 dark:divide-blue-800">
          {stats.map((stat, index) => (
            <div key={index} className="px-4">
              <div className="text-4xl md:text-5xl font-extrabold mb-2">{stat.value}</div>
              <div className="text-blue-100 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
