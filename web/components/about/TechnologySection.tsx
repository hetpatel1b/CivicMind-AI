import React from 'react';
import { Layers, Database, Code, ShieldCheck, Paintbrush, Bot } from 'lucide-react';

const TECH_STACK = [
  { name: 'Next.js', description: 'React framework for production', icon: Layers },
  { name: 'TypeScript', description: 'Typed JavaScript at scale', icon: Code },
  { name: 'Tailwind CSS', description: 'Utility-first styling', icon: Paintbrush },
  { name: 'Supabase', description: 'Open source Firebase alternative', icon: Database },
  { name: 'PostgreSQL', description: 'Robust relational database', icon: ShieldCheck },
  { name: 'AI Integration', description: 'Smart natural language processing', icon: Bot },
];

export default function TechnologySection() {
  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Our Technology</h2>
          <div className="w-16 h-1 bg-blue-500 mx-auto mb-8 rounded-full" />
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Built on a modern, scalable, and secure technology stack to ensure reliability for citizens and municipalities alike.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {TECH_STACK.map((tech, idx) => (
            <div key={idx} className="bg-[#f8fafc] dark:bg-[#020817] p-6 rounded-2xl border border-gray-200 dark:border-gray-800 flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-xl flex items-center justify-center mb-4 shadow-sm">
                <tech.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" aria-hidden="true" />
              </div>
              <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-1">{tech.name}</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-tight">{tech.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
