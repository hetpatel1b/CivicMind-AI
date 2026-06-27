import React from 'react';
import { Camera, Cpu, Users, CheckCircle } from 'lucide-react';

const steps = [
  {
    title: 'Report',
    description: 'Spot an issue in your community? Snap a photo and provide a quick description using our app.',
    icon: <Camera className="w-8 h-8 text-blue-600 dark:text-blue-400" aria-hidden="true" />
  },
  {
    title: 'AI Analysis',
    description: 'Our AI instantly analyzes the report, tagging the correct department and estimating severity.',
    icon: <Cpu className="w-8 h-8 text-blue-600 dark:text-blue-400" aria-hidden="true" />
  },
  {
    title: 'Community Verification',
    description: 'Other citizens can upvote and verify the issue, increasing its priority and visibility.',
    icon: <Users className="w-8 h-8 text-blue-600 dark:text-blue-400" aria-hidden="true" />
  },
  {
    title: 'Resolution',
    description: 'City officials take action. You get notified in real-time when the issue is fixed.',
    icon: <CheckCircle className="w-8 h-8 text-blue-600 dark:text-blue-400" aria-hidden="true" />
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
            From discovering an issue to resolving it, we make civic engagement simple and transparent.
          </p>
        </div>

        <div className="relative">
          {/* Connecting line for desktop */}
          <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gray-100 dark:bg-gray-800 -z-10"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative flex flex-col items-center text-center">
                <div className="w-24 h-24 bg-white dark:bg-[#020817] rounded-full border-4 border-gray-50 dark:border-gray-900 shadow-sm flex items-center justify-center mb-6 z-10 relative">
                  <div className="absolute -top-3 -right-3 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm border-2 border-white dark:border-[#020817]">
                    {index + 1}
                  </div>
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
