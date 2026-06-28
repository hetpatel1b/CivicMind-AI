import React from 'react';
import { ShieldCheck, Lock, Activity, Users, FileCode2, MessagesSquare } from 'lucide-react';

const TRUST_PILLARS = [
  { title: 'Privacy First', description: 'Your personal data is never sold, and reporting can be done entirely anonymously.', icon: ShieldCheck, color: 'text-blue-500', bg: 'bg-blue-100 dark:bg-blue-900/30' },
  { title: 'Secure Authentication', description: 'Enterprise-grade security and authentication powered by Supabase.', icon: Lock, color: 'text-indigo-500', bg: 'bg-indigo-100 dark:bg-indigo-900/30' },
  { title: 'AI Assisted', description: 'Smart categorization and prioritization, without removing human agency.', icon: Activity, color: 'text-green-500', bg: 'bg-green-100 dark:bg-green-900/30' },
  { title: 'Human Reviewed', description: 'All critical civic decisions and escalations are reviewed by human officials.', icon: Users, color: 'text-amber-500', bg: 'bg-amber-100 dark:bg-amber-900/30' },
  { title: 'Open Source', description: 'Our core platform components are open-source for community auditing.', icon: FileCode2, color: 'text-purple-500', bg: 'bg-purple-100 dark:bg-purple-900/30' },
  { title: 'Community Moderated', description: 'A robust reputation system ensures bad actors are filtered out early.', icon: MessagesSquare, color: 'text-pink-500', bg: 'bg-pink-100 dark:bg-pink-900/30' },
];

export default function TrustTransparency() {
  return (
    <section className="py-20 bg-[#f8fafc] dark:bg-[#020817] border-t border-gray-100 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Trust & Transparency</h2>
          <div className="w-16 h-1 bg-blue-500 mx-auto mb-8 rounded-full" />
          <p className="text-lg text-gray-600 dark:text-gray-400 font-medium">
            We believe civic technology must be built on a foundation of absolute trust, privacy, and security.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TRUST_PILLARS.map((pillar, idx) => (
            <div key={idx} className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 hover:shadow-md transition-all duration-300 group">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110 ${pillar.bg}`}>
                <pillar.icon className={`w-6 h-6 ${pillar.color}`} aria-hidden="true" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{pillar.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 font-medium leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
