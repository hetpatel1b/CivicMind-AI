import React from 'react';
import { User, Cpu, Users, Building, CheckCircle2, ArrowRight } from 'lucide-react';

export default function MeetPlatform() {
  return (
    <section className="py-20 bg-white dark:bg-[#020817] border-t border-gray-100 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Meet the Platform</h2>
          <div className="w-16 h-1 bg-blue-500 mx-auto mb-8 rounded-full" />
          <p className="text-lg text-gray-600 dark:text-gray-400 font-medium">
            A high-level overview of how data flows through the CivicMind architecture to deliver rapid civic improvements.
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto bg-gray-50 dark:bg-gray-900/50 rounded-3xl p-8 md:p-12 border border-gray-200 dark:border-gray-800 overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            
            {/* Step 1 */}
            <div className="flex flex-col items-center flex-1 text-center group">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/40 rounded-2xl flex items-center justify-center mb-4 border border-blue-200 dark:border-blue-800/50 shadow-sm group-hover:scale-110 transition-transform duration-300">
                <User className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h4 className="font-bold text-gray-900 dark:text-white text-sm mb-1">Citizen</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-medium max-w-[120px]">Reports issue via mobile or web</p>
            </div>

            <ArrowRight className="hidden md:block w-6 h-6 text-gray-300 dark:text-gray-700 flex-shrink-0" />
            <div className="md:hidden w-0.5 h-6 bg-gray-200 dark:bg-gray-700" />

            {/* Step 2 */}
            <div className="flex flex-col items-center flex-1 text-center group">
              <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900/40 rounded-2xl flex items-center justify-center mb-4 border border-indigo-200 dark:border-indigo-800/50 shadow-sm group-hover:scale-110 transition-transform duration-300">
                <Cpu className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h4 className="font-bold text-gray-900 dark:text-white text-sm mb-1">AI Engine</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-medium max-w-[120px]">Categorizes & checks duplicates</p>
            </div>

            <ArrowRight className="hidden md:block w-6 h-6 text-gray-300 dark:text-gray-700 flex-shrink-0" />
            <div className="md:hidden w-0.5 h-6 bg-gray-200 dark:bg-gray-700" />

            {/* Step 3 */}
            <div className="flex flex-col items-center flex-1 text-center group">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/40 rounded-2xl flex items-center justify-center mb-4 border border-purple-200 dark:border-purple-800/50 shadow-sm group-hover:scale-110 transition-transform duration-300">
                <Users className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h4 className="font-bold text-gray-900 dark:text-white text-sm mb-1">Community</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-medium max-w-[120px]">Upvotes & verifies report</p>
            </div>

            <ArrowRight className="hidden md:block w-6 h-6 text-gray-300 dark:text-gray-700 flex-shrink-0" />
            <div className="md:hidden w-0.5 h-6 bg-gray-200 dark:bg-gray-700" />

            {/* Step 4 */}
            <div className="flex flex-col items-center flex-1 text-center group">
              <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900/40 rounded-2xl flex items-center justify-center mb-4 border border-amber-200 dark:border-amber-800/50 shadow-sm group-hover:scale-110 transition-transform duration-300">
                <Building className="w-8 h-8 text-amber-600 dark:text-amber-400" />
              </div>
              <h4 className="font-bold text-gray-900 dark:text-white text-sm mb-1">Authority</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-medium max-w-[120px]">Reviews on dashboard</p>
            </div>

            <ArrowRight className="hidden md:block w-6 h-6 text-gray-300 dark:text-gray-700 flex-shrink-0" />
            <div className="md:hidden w-0.5 h-6 bg-gray-200 dark:bg-gray-700" />

            {/* Step 5 */}
            <div className="flex flex-col items-center flex-1 text-center group">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/40 rounded-2xl flex items-center justify-center mb-4 border border-green-200 dark:border-green-800/50 shadow-sm group-hover:scale-110 transition-transform duration-300">
                <CheckCircle2 className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h4 className="font-bold text-gray-900 dark:text-white text-sm mb-1">Resolution</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-medium max-w-[120px]">Issue resolved & user rewarded</p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
