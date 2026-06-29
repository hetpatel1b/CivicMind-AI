import React from 'react';

export default function LeaderboardSkeleton() {
  return (
    <div className="space-y-8 animate-pulse w-full max-w-[90rem] mx-auto relative z-10" aria-label="Loading leaderboard">
      
      {/* Header Skeleton */}
      <div className="h-[250px] w-full rounded-[2.5rem] bg-white/5 border border-white/10 mt-8 mb-12 shadow-inner" />

      {/* Podium Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 pt-10 pb-12 max-w-5xl mx-auto items-end px-4">
        <div className="h-64 w-full rounded-[2rem] bg-white/5 border border-white/10 md:mt-4 order-2 md:order-1" />
        <div className="h-80 w-full rounded-[2rem] bg-white/10 border border-white/20 md:-mt-8 order-1 md:order-2 shadow-[0_0_30px_rgba(255,255,255,0.05)]" />
        <div className="h-64 w-full rounded-[2rem] bg-white/5 border border-white/10 md:mt-4 order-3" />
      </div>

      {/* Coach/Insights Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="h-56 w-full rounded-[2rem] bg-white/5 border border-white/10 md:col-span-2" />
        <div className="h-56 w-full rounded-[2rem] bg-white/5 border border-white/10" />
      </div>

      {/* Table Skeleton */}
      <div className="bg-[#0a0f1c]/60 border border-white/10 rounded-[2rem] overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.5)] backdrop-blur-3xl ring-1 ring-white/5">
        <div className="p-5 sm:p-6 lg:p-8 border-b border-white/10 flex flex-col sm:flex-row gap-4 items-center justify-between bg-white/5">
          <div className="h-12 w-full sm:w-80 rounded-xl bg-white/10" />
          <div className="flex gap-3 w-full sm:w-auto">
            <div className="h-12 w-full sm:w-32 rounded-xl bg-white/10" />
            <div className="h-12 w-full sm:w-40 rounded-xl bg-white/10" />
          </div>
        </div>

        <div className="p-0">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="flex items-center gap-6 p-5 border-b border-white/5">
              <div className="w-10 h-10 rounded-xl bg-white/10 shrink-0 mx-2" />
              <div className="w-12 h-12 rounded-[1rem] bg-white/10 shrink-0" />
              <div className="flex-1 space-y-3">
                <div className="h-4 w-40 rounded bg-white/10" />
                <div className="h-3 w-24 rounded bg-white/5" />
              </div>
              <div className="h-8 w-24 rounded-xl bg-white/10 hidden sm:block" />
              <div className="h-8 w-32 rounded-xl bg-white/10 hidden md:block" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
