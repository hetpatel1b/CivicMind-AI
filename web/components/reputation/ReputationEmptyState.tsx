import React, { ReactNode } from 'react';

interface ReputationEmptyStateProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export default function ReputationEmptyState({ icon, title, description }: ReputationEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-6 text-center bg-[#0a0f1c]/50 backdrop-blur-md rounded-[2rem] border border-dashed border-white/10 shadow-inner group relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-white/5 rounded-full blur-[40px] pointer-events-none group-hover:bg-white/10 transition-colors duration-500" />
      
      <div className="w-16 h-16 bg-[#050505] rounded-2xl flex items-center justify-center text-gray-400 mb-6 border border-white/10 shadow-inner group-hover:scale-110 transition-transform duration-500 relative z-10">
        <div className="drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]">
          {icon}
        </div>
      </div>
      <h3 className="text-lg font-black text-white tracking-tight mb-2 relative z-10">{title}</h3>
      <p className="text-sm font-medium text-gray-500 max-w-xs leading-relaxed relative z-10">
        {description}
      </p>
    </div>
  );
}
