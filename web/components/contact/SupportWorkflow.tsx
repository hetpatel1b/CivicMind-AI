import React from 'react';
import { Send, Clock, UserCheck, CheckCircle2 } from 'lucide-react';

const WORKFLOW_STEPS = [
  { id: 1, title: 'Submit Request', description: 'Fill out the contact form with details.', icon: Send, color: 'text-indigo-500 dark:text-indigo-400', bg: 'bg-indigo-50 dark:bg-indigo-900/30 border-indigo-100 dark:border-indigo-800' },
  { id: 2, title: 'Review Process', description: 'Our team reviews your submission.', icon: Clock, color: 'text-amber-500 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-900/30 border-amber-100 dark:border-amber-800' },
  { id: 3, title: 'Team Response', description: 'We get back to you with an update.', icon: UserCheck, color: 'text-blue-500 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-900/30 border-blue-100 dark:border-blue-800' },
  { id: 4, title: 'Issue Resolved', description: 'Your inquiry is fully resolved.', icon: CheckCircle2, color: 'text-emerald-500 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-900/30 border-emerald-100 dark:border-emerald-800' },
];

export default function SupportWorkflow() {
  return (
    <section className="mb-16 bg-white dark:bg-gray-900/30 backdrop-blur-xl border border-gray-100 dark:border-gray-800 rounded-[2rem] p-8 md:p-12 shadow-sm">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight">Trust & Transparency</h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 font-medium">
          We process every request securely. Here is exactly what happens when you contact us.
        </p>
      </div>
      
      <div className="relative flex flex-col md:flex-row justify-between items-start md:items-start gap-8 max-w-5xl mx-auto">
        {/* Connector Line for Desktop */}
        <div className="hidden md:block absolute top-8 left-[10%] right-[10%] h-0.5 bg-gray-100 dark:bg-gray-800 z-0" aria-hidden="true" />
        
        {WORKFLOW_STEPS.map((step, idx) => (
          <div key={step.id} className="relative z-10 flex flex-col items-center flex-1 w-full text-center group">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-sm border ${step.bg} transition-transform duration-300 group-hover:-translate-y-1`}>
              <step.icon className={`w-6 h-6 ${step.color}`} aria-hidden="true" />
            </div>
            <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2">{step.id}. {step.title}</h3>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 max-w-[180px] leading-relaxed">{step.description}</p>
            
            {/* Connector line for mobile */}
            {idx < WORKFLOW_STEPS.length - 1 && (
              <div className="md:hidden w-0.5 h-8 bg-gray-100 dark:bg-gray-800 my-6" aria-hidden="true" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
