import React from 'react';

export default function IssueSkeleton() {
  return (
    <div className="min-h-screen bg-[#050505] pt-24 pb-12 relative overflow-hidden">
      <div className="absolute inset-0 z-0 bg-[url('/noise.png')] opacity-[0.03] pointer-events-none mix-blend-overlay" />
      <div className="absolute -top-[500px] left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 animate-pulse">
        
        {/* Header Skeleton */}
        <div className="mb-12">
          <div className="flex gap-3 mb-6">
            <div className="h-6 w-24 bg-white/5 rounded-full border border-white/10" />
            <div className="h-6 w-32 bg-white/5 rounded-full border border-white/10" />
          </div>
          <div className="h-14 w-3/4 bg-white/5 rounded-2xl mb-4 border border-white/10" />
          <div className="h-6 w-1/3 bg-white/5 rounded-full border border-white/10" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Column Skeleton */}
          <div className="lg:col-span-2 space-y-8">
            <div className="w-full aspect-[16/9] md:aspect-[21/9] bg-white/5 rounded-[2rem] border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.5)]" />
            <div className="h-64 bg-[#0a0f1c]/50 rounded-[2rem] border border-white/10 backdrop-blur-xl shadow-[0_0_30px_rgba(0,0,0,0.5)]" />
            <div className="h-48 bg-[#0a0f1c]/50 rounded-[2rem] border border-white/10 backdrop-blur-xl shadow-[0_0_30px_rgba(0,0,0,0.5)]" />
          </div>
          
          {/* Sidebar Skeleton */}
          <div className="lg:col-span-1 space-y-6">
            <div className="h-32 bg-[#0a0f1c]/50 rounded-[2rem] border border-white/10 backdrop-blur-xl shadow-[0_0_30px_rgba(0,0,0,0.5)]" />
            <div className="h-48 bg-[#0a0f1c]/50 rounded-[2rem] border border-white/10 backdrop-blur-xl shadow-[0_0_30px_rgba(0,0,0,0.5)]" />
            <div className="h-48 bg-[#0a0f1c]/50 rounded-[2rem] border border-white/10 backdrop-blur-xl shadow-[0_0_30px_rgba(0,0,0,0.5)]" />
          </div>
          
        </div>
      </div>
    </div>
  );
}
