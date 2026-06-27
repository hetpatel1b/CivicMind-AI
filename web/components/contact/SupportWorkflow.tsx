import React from 'react';
import { Send, Clock, UserCheck, CheckCircle } from 'lucide-react';

const WORKFLOW_STEPS = [
  { id: 1, title: 'Submit Request', description: 'Fill out the contact form with your details.', icon: Send, color: 'text-blue-500', bg: 'bg-blue-100 dark:bg-blue-900/30' },
  { id: 2, title: 'Review Process', description: 'Our team reviews your submission carefully.', icon: Clock, color: 'text-amber-500', bg: 'bg-amber-100 dark:bg-amber-900/30' },
  { id: 3, title: 'Team Response', description: 'We get back to you with a solution or update.', icon: UserCheck, color: 'text-indigo-500', bg: 'bg-indigo-100 dark:bg-indigo-900/30' },
  { id: 4, title: 'Issue Resolved', description: 'Your inquiry is fully resolved and closed.', icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-100 dark:bg-green-900/30' },
];

export default function SupportWorkflow() {
  return (
    <section className="py-20 bg-white dark:bg-[#020817] border-b border-gray-100 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Support Workflow</h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-16">
          Understanding how your request is handled from submission to resolution.
        </p>
        
        <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-8 max-w-5xl mx-auto">
          {/* Connector Line for Desktop */}
          <div className="hidden md:block absolute top-1/2 left-[10%] right-[10%] h-0.5 bg-gray-200 dark:bg-gray-700 -translate-y-12 z-0" aria-hidden="true" />
          
          {WORKFLOW_STEPS.map((step, idx) => (
            <div key={step.id} className="relative z-10 flex flex-col items-center flex-1 w-full md:w-auto">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 shadow-sm border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900`}>
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${step.bg}`}>
                  <step.icon className={`w-6 h-6 ${step.color}`} aria-hidden="true" />
                </div>
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{step.id}. {step.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 max-w-[200px] leading-relaxed">{step.description}</p>
              
              {/* Connector line for mobile */}
              {idx < WORKFLOW_STEPS.length - 1 && (
                <div className="md:hidden w-0.5 h-8 bg-gray-200 dark:bg-gray-700 my-4" aria-hidden="true" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
