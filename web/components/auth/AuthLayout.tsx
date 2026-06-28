import React from 'react';
import AuthBranding from './AuthBranding';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#020817] flex flex-col md:flex-row w-full font-sans">
      {/* Left Branding Panel (Hidden on very small screens, stacked on tablet, split on desktop) */}
      <div className="hidden md:flex flex-col md:w-[40%] lg:w-[45%] xl:w-[45%] relative shrink-0 overflow-hidden">
        <AuthBranding />
      </div>

      {/* Right Content Area (Form) */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 sm:p-12 lg:p-16 relative w-full overflow-y-auto">
        {/* Mobile-only Branding Header */}
        <div className="md:hidden w-full max-w-md mb-8 flex flex-col items-center text-center">
          <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 mb-4">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <h1 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">CivicMind AI</h1>
        </div>

        <div className="w-full max-w-[440px] animate-in fade-in slide-in-from-bottom-4 duration-700">
          {children}
        </div>
      </div>
    </div>
  );
}
