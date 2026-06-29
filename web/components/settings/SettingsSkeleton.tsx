import React from 'react';

export default function SettingsSkeleton() {
  return (
    <div className="animate-pulse space-y-12">
      <div className="h-48 bg-[#0a0f1c]/50 rounded-[2rem] border border-white/5 shadow-inner" />
      
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        <div className="w-full lg:w-72 shrink-0 space-y-2">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-12 bg-white/5 rounded-xl border border-white/5" />
          ))}
        </div>
        
        <div className="flex-1 space-y-8">
          <div className="h-64 bg-[#0a0f1c]/50 rounded-[1.5rem] border border-white/5 shadow-inner" />
          <div className="h-80 bg-[#0a0f1c]/50 rounded-[1.5rem] border border-white/5 shadow-inner" />
        </div>
      </div>
    </div>
  );
}
