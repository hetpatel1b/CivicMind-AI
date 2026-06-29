import React from 'react';
import { Eye, Shield, Users, Zap, MapPin, Heart } from 'lucide-react';

const VALUES = [
  { icon: Eye, title: 'Transparency', description: 'Open communication between citizens and authorities throughout the entire issue lifecycle.', color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-900/50' },
  { icon: Shield, title: 'Trust', description: 'Reliable AI analysis combined with human moderation to prevent misuse and ensure data integrity.', color: 'text-indigo-500', bg: 'bg-indigo-50 dark:bg-indigo-900/20 border-indigo-100 dark:border-indigo-900/50' },
  { icon: Users, title: 'Community', description: 'Fostering a sense of shared responsibility where every reported issue improves the neighborhood.', color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-100 dark:border-emerald-900/50' },
  { icon: Heart, title: 'Accessibility', description: 'An intuitive platform designed for everyone, regardless of technical expertise.', color: 'text-rose-500', bg: 'bg-rose-50 dark:bg-rose-900/20 border-rose-100 dark:border-rose-900/50' },
  { icon: Shield, title: 'Privacy First', description: 'Strict data protection protocols ensuring citizen locations and personal data remain secure.', color: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-900/20 border-purple-100 dark:border-purple-900/50' },
  { icon: Zap, title: 'Innovation', description: 'Continuously leveraging cutting-edge AI to make civic maintenance proactive rather than reactive.', color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-900/20 border-amber-100 dark:border-amber-900/50' },
];

export default function CoreBenefits() {
  return (
    <section className="mb-24">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight">Platform Values</h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 font-medium">The principles guiding every feature we build.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {VALUES.map((value, idx) => (
          <div 
            key={idx} 
            className="group p-8 bg-white dark:bg-gray-900/40 border border-gray-100 dark:border-gray-800 rounded-[2rem] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-sm border ${value.bg} group-hover:scale-110 transition-transform duration-300`}>
              <value.icon className={`w-6 h-6 ${value.color}`} aria-hidden="true" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{value.title}</h3>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 leading-relaxed">
              {value.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
