import React from 'react';
import { Camera, Brain, Users, ShieldCheck, HardHat, CheckCircle2, Trophy } from 'lucide-react';

const WORKFLOW_STEPS = [
  { id: 1, title: 'Citizen Reports', description: 'User submits an issue with location and photo.', icon: Camera, color: 'text-blue-500' },
  { id: 2, title: 'AI Analysis', description: 'AI categorizes, tags, and assesses severity instantly.', icon: Brain, color: 'text-indigo-500' },
  { id: 3, title: 'Community Validates', description: 'Other citizens upvote to confirm the issue.', icon: Users, color: 'text-emerald-500' },
  { id: 4, title: 'Admin Verifies', description: 'City moderators verify and approve the report.', icon: ShieldCheck, color: 'text-amber-500' },
  { id: 5, title: 'Authority Assigned', description: 'Work crew is dispatched to the exact location.', icon: HardHat, color: 'text-orange-500' },
  { id: 6, title: 'Issue Resolved', description: 'Problem is fixed and marked closed.', icon: CheckCircle2, color: 'text-green-500' },
  { id: 7, title: 'Reputation Rewarded', description: 'Original reporter earns civic points.', icon: Trophy, color: 'text-purple-500' },
];

export default function MeetPlatform() {
  return (
    <section className="mb-24 bg-white dark:bg-gray-900/30 border border-gray-100 dark:border-gray-800 rounded-[2.5rem] p-8 md:p-12 lg:p-16 shadow-sm overflow-hidden relative backdrop-blur-xl">
      <div className="absolute top-0 right-0 -mt-32 -mr-32 w-[600px] h-[600px] bg-gradient-to-br from-indigo-500/5 to-purple-500/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="text-center max-w-3xl mx-auto mb-16 relative z-10">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight">How CivicMind Works</h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 font-medium">From observation to resolution, track the complete lifecycle of a civic report.</p>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {WORKFLOW_STEPS.map((step, idx) => (
            <div key={step.id} className="relative group">
              {idx < WORKFLOW_STEPS.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-[60%] w-full h-[2px] bg-gradient-to-r from-gray-200 to-transparent dark:from-gray-700 pointer-events-none" />
              )}
              
              <div className="flex flex-col items-center text-center p-6 bg-gray-50/50 dark:bg-gray-800/30 rounded-3xl border border-gray-100 dark:border-gray-700/50 h-full hover:bg-white dark:hover:bg-gray-800 hover:shadow-lg transition-all duration-300">
                <div className={`w-16 h-16 rounded-2xl bg-white dark:bg-gray-900 flex items-center justify-center mb-6 shadow-sm border border-gray-100 dark:border-gray-800 group-hover:scale-110 transition-transform duration-300`}>
                  <step.icon className={`w-7 h-7 ${step.color}`} aria-hidden="true" />
                </div>
                <div className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-2">Step {step.id}</div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{step.title}</h3>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
