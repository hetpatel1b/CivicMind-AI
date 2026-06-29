import React from 'react';

export default function NotificationSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="flex items-start gap-4 p-5 rounded-2xl bg-[#0a0f1c]/50 border border-white/5 animate-pulse shadow-inner">
          <div className="w-2.5 h-2.5 rounded-full shrink-0 mt-3 bg-white/10" />
          <div className="w-10 h-10 rounded-full shrink-0 bg-white/10" />
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="h-4 w-32 rounded bg-white/10" />
              <div className="h-3 w-16 rounded bg-white/10" />
            </div>
            <div className="space-y-2 mb-4">
              <div className="h-3 w-full rounded bg-white/10" />
              <div className="h-3 w-3/4 rounded bg-white/10" />
            </div>
            <div className="flex items-center gap-4">
              <div className="h-6 w-24 rounded-lg bg-white/10" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
