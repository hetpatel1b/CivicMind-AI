import React from 'react';
import { Camera, Cpu, Users, CheckCircle } from 'lucide-react';

const steps = [
  {
    title: '1. Citizen Reports',
    description: 'Spot an issue in your community? Snap a photo and let our app do the rest.',
    icon: <Camera className="w-8 h-8 text-blue-600 dark:text-blue-400" aria-hidden="true" />
  },
  {
    title: '2. AI Analysis',
    description: 'Our AI instantly analyzes the image, drafts the report, tags the department, and scores severity.',
    icon: <Cpu className="w-8 h-8 text-indigo-600 dark:text-indigo-400" aria-hidden="true" />
  },
  {
    title: '3. Community & Admin',
    description: 'The community verifies the issue, while AI provides administrators with actionable insights to resolve it.',
    icon: <Users className="w-8 h-8 text-purple-600 dark:text-purple-400" aria-hidden="true" />
  },
  {
    title: '4. Resolution',
    description: 'City officials take action, guided by data. You get notified in real-time when the issue is fixed.',
    icon: <CheckCircle className="w-8 h-8 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
  }
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-24 bg-white dark:bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            How CivicMind AI works
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            From discovering an issue to resolving it, AI empowers every step of the civic engagement lifecycle.
          </p>
        </div>

        <div className="relative">
          {/* Connecting line for desktop */}
          <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gray-100 dark:bg-gray-800 -z-10"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative flex flex-col items-center text-center">
                <div className="w-24 h-24 bg-white dark:bg-[#020817] rounded-full border-4 border-gray-50 dark:border-gray-900 shadow-sm flex items-center justify-center mb-6 z-10 relative">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
