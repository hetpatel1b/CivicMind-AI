import React from 'react';
import { Camera, Sparkles, MapPin, FileText, Send } from 'lucide-react';
import { motion } from 'framer-motion';

interface ReportStepperProps {
  currentStep: number; // 1 to 5
}

export default function ReportStepper({ currentStep }: ReportStepperProps) {
  const steps = [
    { id: 1, name: 'Upload', icon: Camera },
    { id: 2, name: 'AI Analysis', icon: Sparkles },
    { id: 3, name: 'Details', icon: FileText },
    { id: 4, name: 'Location', icon: MapPin },
    { id: 5, name: 'Submit', icon: Send },
  ];

  return (
    <div className="mb-10 w-full px-2">
      <div className="relative flex justify-between items-center max-w-3xl mx-auto">
        {/* Background Track */}
        <div className="absolute left-[5%] right-[5%] top-1/2 -translate-y-1/2 h-[2px] bg-white/5 rounded-full" />
        
        {/* Progress Fill with Glow */}
        <div 
          className="absolute left-[5%] top-1/2 -translate-y-1/2 h-[2px] bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-700 ease-in-out shadow-[0_0_15px_rgba(99,102,241,0.5)]" 
          style={{ width: `${Math.max(0, (currentStep - 1) / (steps.length - 1)) * 90}%` }}
        />
        
        {steps.map((step) => {
          const isActive = currentStep === step.id;
          const isCompleted = currentStep > step.id;
          const Icon = step.icon;

          return (
            <div key={step.id} className="relative z-10 flex flex-col items-center group">
              <motion.div 
                initial={false}
                animate={{
                  scale: isActive ? 1.15 : 1,
                  backgroundColor: isActive ? 'rgba(99, 102, 241, 0.2)' : isCompleted ? 'rgba(168, 85, 247, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                  borderColor: isActive ? 'rgba(99, 102, 241, 0.5)' : isCompleted ? 'rgba(168, 85, 247, 0.5)' : 'rgba(255, 255, 255, 0.1)',
                }}
                className={`w-10 h-10 md:w-12 md:h-12 rounded-2xl flex items-center justify-center border backdrop-blur-md transition-colors duration-500 ${
                  isActive ? 'shadow-[0_0_20px_rgba(99,102,241,0.3)]' : isCompleted ? 'shadow-[0_0_15px_rgba(168,85,247,0.2)]' : 'shadow-none'
                }`}
              >
                <Icon className={`w-4 h-4 md:w-5 md:h-5 transition-colors duration-500 ${
                  isActive ? 'text-indigo-400' : isCompleted ? 'text-purple-400' : 'text-gray-500 group-hover:text-gray-400'
                }`} />
              </motion.div>
              
              <span 
                className={`absolute -bottom-7 text-[10px] md:text-[11px] font-bold uppercase tracking-[0.15em] whitespace-nowrap transition-colors duration-500 ${
                  isActive
                    ? 'text-indigo-400 drop-shadow-[0_0_8px_rgba(99,102,241,0.5)]'
                    : isCompleted
                    ? 'text-gray-300'
                    : 'text-gray-600'
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
