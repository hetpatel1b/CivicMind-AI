import React from 'react';
import ReportForm from '@/components/report/ReportForm';
import { AlertTriangle, Sparkles, Lock, Clock } from 'lucide-react';

export const metadata = {
  title: 'Report Issue | CivicMind AI',
  description: 'Report a new civic issue in your community with AI assistance.',
};

export default function ReportPage() {
  return (
    <main className="min-h-screen relative overflow-hidden bg-transparent pt-16 pb-12">
      {/* Background Lighting is already handled by WorkspaceShell, 
          but we can add page-specific ambient glows here if needed. */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-indigo-500/10 via-purple-500/5 to-transparent blur-[120px] pointer-events-none mix-blend-screen" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Premium Header Section */}
        <div className="mb-10 text-center">
          <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-[#0a0f1c]/80 backdrop-blur-3xl border border-white/10 shadow-[0_0_30px_rgba(99,102,241,0.2)] mb-5 relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md" />
            <Sparkles className="w-6 h-6 text-indigo-400 relative z-10 animate-pulse" style={{ animationDuration: '3s' }} />
          </div>
          
          <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-3">
            Report a <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Civic Issue</span>
          </h1>
          
          <p className="text-base text-gray-400 font-medium max-w-xl mx-auto mb-6 leading-relaxed">
            Collaborate with CivicMind AI to categorize, describe, and route your community report in under 60 seconds.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 text-[11px] font-bold text-gray-400 uppercase tracking-widest">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              AI Assisted
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md">
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
              Private Location
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md">
              <Clock className="w-3.5 h-3.5 text-purple-400" />
              ~1 Min to Complete
            </div>
          </div>
        </div>

        {/* Main Guided Form */}
        <ReportForm />
        
      </div>
    </main>
  );
}
