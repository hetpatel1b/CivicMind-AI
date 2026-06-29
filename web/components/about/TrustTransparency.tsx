import React from 'react';
import { Brain, ShieldCheck, Eye, Lock } from 'lucide-react';

const PRINCIPLES = [
  { id: 1, title: 'AI Assists, Humans Decide', description: 'Our AI categorizes issues and detects duplicates, but it never makes final administrative decisions. Human moderators always verify the data before assigning work crews.', icon: Brain, color: 'text-indigo-500' },
  { id: 2, title: 'User-Controlled AI', description: 'Citizens have full transparency into how the AI interprets their reports. You can always override AI suggestions if the auto-categorization misses context.', icon: Eye, color: 'text-blue-500' },
  { id: 3, title: 'Data Privacy & Security', description: 'Location data and personal identifiers are strictly protected. The AI models are trained only on anonymized civic data to ensure complete privacy.', icon: Lock, color: 'text-emerald-500' },
  { id: 4, title: 'Responsible Analysis', description: 'We actively monitor our models for bias. The system is designed to treat all neighborhoods equitably, ensuring every community gets the attention it deserves.', icon: ShieldCheck, color: 'text-amber-500' },
];

export default function TrustTransparency() {
  return (
    <section className="mb-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-5">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-100 dark:border-indigo-800/50 mb-6">
            <ShieldCheck className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span className="text-xs font-bold tracking-widest text-indigo-700 dark:text-indigo-300 uppercase">Responsible AI</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-6 tracking-tight">Technology built on trust.</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 font-medium leading-relaxed mb-8">
            We believe that artificial intelligence should empower communities, not obscure them. Our models are designed with strict ethical guidelines, prioritizing transparency, fairness, and human oversight.
          </p>
        </div>
        
        <div className="lg:col-span-7">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {PRINCIPLES.map((principle) => (
              <div 
                key={principle.id}
                className="bg-white dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-gray-50 dark:bg-gray-800 flex items-center justify-center mb-5 border border-gray-100 dark:border-gray-700">
                  <principle.icon className={`w-6 h-6 ${principle.color}`} aria-hidden="true" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{principle.title}</h3>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 leading-relaxed">{principle.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
