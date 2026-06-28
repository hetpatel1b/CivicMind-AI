import React from 'react';
import { Camera, Sparkles, FileText, CheckCircle } from 'lucide-react';

interface ReportStepperProps {
  currentStage: number; // 1 to 4
}

export default function ReportStepper({ currentStage }: ReportStepperProps) {
  const steps = [
    { id: 1, name: 'Upload Photo', icon: Camera },
    { id: 2, name: 'AI Analysis', icon: Sparkles },
    { id: 3, name: 'Review Details', icon: FileText },
    { id: 4, name: 'Submit Report', icon: CheckCircle },
  ];

  return (
    <div className="mb-8 hidden sm:block">
      <div className="flex items-center justify-between relative">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-200 dark:bg-gray-800 rounded-full" />
        
        {steps.map((step) => {
          const isActive = currentStage === step.id;
          const isCompleted = currentStage > step.id;
          const Icon = step.icon;

          return (
            <div key={step.id} className="relative z-10 flex flex-col items-center gap-2 bg-[#f8fafc] dark:bg-[#020817] px-2">
              <div 
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors duration-300 ${
                  isActive
                    ? 'border-blue-600 bg-blue-600 text-white dark:border-blue-500 dark:bg-blue-500 shadow-md'
                    : isCompleted
                    ? 'border-blue-600 bg-white text-blue-600 dark:border-blue-500 dark:bg-gray-900 dark:text-blue-500'
                    : 'border-gray-300 bg-white text-gray-400 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-500'
                }`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <span 
                className={`text-xs font-semibold uppercase tracking-wider ${
                  isActive || isCompleted
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-gray-400 dark:text-gray-600'
                }`}
              >
                {step.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
