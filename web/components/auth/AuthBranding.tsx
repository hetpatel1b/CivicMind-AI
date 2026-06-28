import React from 'react';
import { ShieldCheck, Sparkles, Users, Building2, MapPin, SearchCheck } from 'lucide-react';

export default function AuthBranding() {
  return (
    <div className="relative w-full h-full min-h-screen bg-blue-900 overflow-hidden flex flex-col">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900" />
      <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
      
      {/* Decorative Orbs */}
      <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-500/30 blur-[120px] mix-blend-screen" />
      <div className="absolute top-[40%] -right-[20%] w-[60%] h-[60%] rounded-full bg-indigo-500/20 blur-[100px] mix-blend-screen" />
      <div className="absolute -bottom-[20%] left-[20%] w-[50%] h-[50%] rounded-full bg-purple-500/20 blur-[120px] mix-blend-screen" />

      {/* Floating Icons Background */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <MapPin className="absolute top-[15%] left-[20%] w-16 h-16 animate-[pulse_4s_ease-in-out_infinite]" />
        <SearchCheck className="absolute top-[35%] right-[25%] w-12 h-12 animate-[pulse_5s_ease-in-out_infinite_delay-1s]" />
        <Building2 className="absolute bottom-[25%] left-[30%] w-20 h-20 animate-[pulse_6s_ease-in-out_infinite_delay-2s]" />
      </div>

      <div className="relative z-10 flex-1 flex flex-col justify-between p-12 lg:p-16">
        
        {/* Header / Logo */}
        <div>
          <div className="inline-flex items-center gap-3">
            <div className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/20 shadow-xl">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <span className="text-xl font-bold text-white tracking-tight">CivicMind AI</span>
          </div>
        </div>

        {/* Main Value Proposition */}
        <div className="max-w-md">
          <h1 className="text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-6 tracking-tight">
            Building Smarter Communities <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Together</span>
          </h1>
          <p className="text-lg text-blue-100/80 leading-relaxed">
            AI-powered civic engagement platform helping citizens report, track, and resolve community issues faster.
          </p>
        </div>

        {/* Trust Indicators & Stats */}
        <div className="space-y-6">
          <div className="flex flex-wrap gap-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-xs font-semibold text-white">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-300" />
              Secure Authentication
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-xs font-semibold text-white">
              <Sparkles className="w-3.5 h-3.5 text-purple-300" />
              AI Assisted Platform
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-xs font-semibold text-white">
              <Users className="w-3.5 h-3.5 text-emerald-300" />
              Community Verified
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-xs font-semibold text-white">
              <Building2 className="w-3.5 h-3.5 text-amber-300" />
              Government Ready
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
            <div>
              <div className="text-2xl font-bold text-white tracking-tight">10,482+</div>
              <div className="text-xs font-medium text-blue-200/60 uppercase tracking-wider mt-1">Issues Reported</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white tracking-tight">8,921+</div>
              <div className="text-xs font-medium text-blue-200/60 uppercase tracking-wider mt-1">Resolved Issues</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
