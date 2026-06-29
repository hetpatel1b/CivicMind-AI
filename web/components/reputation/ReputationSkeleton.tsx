import React from 'react';

export default function ReputationSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 animate-pulse">
      {/* Header Skeleton */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="h-4 w-32 bg-white/5 rounded-full mb-4"></div>
          <div className="flex items-center gap-4 mb-2">
            <div className="w-12 h-12 bg-white/5 rounded-2xl"></div>
            <div className="h-12 w-64 bg-white/10 rounded-2xl"></div>
          </div>
          <div className="h-5 w-96 bg-white/5 rounded-xl"></div>
        </div>
        <div className="flex items-center gap-4">
          <div className="h-12 w-32 bg-white/5 rounded-xl"></div>
          <div className="h-12 w-32 bg-white/10 rounded-xl"></div>
        </div>
      </div>

      {/* Overview Skeleton */}
      <div className="h-64 bg-white/5 rounded-[2.5rem] mb-12 border border-white/5 shadow-inner flex items-center p-12 gap-8">
        <div className="w-40 h-40 rounded-[2rem] bg-white/10 shrink-0"></div>
        <div className="flex-1 space-y-4">
          <div className="h-6 w-32 bg-white/5 rounded-xl"></div>
          <div className="h-16 w-64 bg-white/10 rounded-2xl"></div>
          <div className="h-12 w-48 bg-white/5 rounded-2xl"></div>
        </div>
        <div className="w-80 h-48 bg-white/5 rounded-3xl shrink-0"></div>
      </div>

      {/* Stats Skeleton */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-28 bg-white/5 rounded-[2rem] border border-white/5 shadow-inner flex items-center p-6 gap-4">
            <div className="w-14 h-14 rounded-[1rem] bg-white/10"></div>
            <div className="space-y-2 flex-1">
              <div className="h-8 w-20 bg-white/10 rounded-lg"></div>
              <div className="h-3 w-16 bg-white/5 rounded-full"></div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="h-56 bg-white/5 rounded-[2.5rem] border border-white/5 shadow-inner"></div>
          <div className="h-96 bg-white/5 rounded-[2.5rem] border border-white/5 shadow-inner"></div>
        </div>
        <div className="lg:col-span-1 space-y-8">
          <div className="h-72 bg-white/5 rounded-[2.5rem] border border-white/5 shadow-inner"></div>
          <div className="h-72 bg-white/5 rounded-[2.5rem] border border-white/5 shadow-inner"></div>
        </div>
      </div>
    </div>
  );
}
