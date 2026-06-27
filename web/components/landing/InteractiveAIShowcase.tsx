import React from 'react';
import { UploadCloud, Sparkles, CheckCircle2, ChevronRight } from 'lucide-react';

export default function InteractiveAIShowcase() {
  return (
    <section className="py-24 bg-white dark:bg-black overflow-hidden relative border-y border-gray-100 dark:border-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-medium text-sm mb-6 border border-blue-100 dark:border-blue-800">
              <Sparkles className="w-4 h-4" />
              AI Issue Intelligence
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Just snap a photo. <br className="hidden lg:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                AI does the rest.
              </span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto lg:mx-0">
              No more filling out tedious forms. Our computer vision models instantly analyze your image, write a detailed description, identify the exact civic category, and route it to the correct department.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300 font-medium">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                Automatic Categorization
              </div>
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300 font-medium">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                Severity Scoring
              </div>
            </div>
          </div>

          {/* Interactive UI Mock */}
          <div className="flex-1 w-full max-w-lg relative">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-blue-500/20 to-purple-500/20 blur-3xl -z-10 rounded-full"></div>
            
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-2xl p-6 relative overflow-hidden">
              {/* Stepper Header */}
              <div className="flex items-center justify-between mb-8 text-sm font-medium">
                <div className="flex items-center text-blue-600 dark:text-blue-400">
                  <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center mr-2">1</div>
                  Upload
                </div>
                <ChevronRight className="w-4 h-4 text-gray-300 dark:text-gray-700" />
                <div className="flex items-center text-purple-600 dark:text-purple-400">
                  <div className="w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center mr-2">
                    <Sparkles className="w-3 h-3" />
                  </div>
                  Analyze
                </div>
                <ChevronRight className="w-4 h-4 text-gray-300 dark:text-gray-700" />
                <div className="flex items-center text-gray-400 dark:text-gray-500">
                  <div className="w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mr-2">3</div>
                  Submit
                </div>
              </div>

              {/* Mock Upload Area */}
              <div className="border-2 border-dashed border-blue-200 dark:border-blue-900/50 rounded-xl p-8 flex flex-col items-center justify-center bg-blue-50/50 dark:bg-blue-900/10 mb-6 relative overflow-hidden group h-48">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80&w=800')] bg-cover bg-center opacity-40"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent"></div>
                
                <div className="relative z-10 flex flex-col items-center text-white mt-12">
                  <UploadCloud className="w-10 h-10 mb-3 drop-shadow-md" />
                  <p className="font-medium drop-shadow-md">Pothole on Main St.jpg</p>
                </div>

                {/* AI Scanning Animation overlay */}
                <div className="absolute left-0 w-full h-1 bg-blue-500 shadow-[0_0_15px_3px_rgba(59,130,246,0.5)] animate-[scan_3s_ease-in-out_infinite_alternate]"></div>
              </div>

              {/* Mock AI Results Form */}
              <div className="space-y-4">
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">AI Suggested Title</label>
                    <span className="flex items-center gap-1 text-[10px] font-semibold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/30 px-1.5 py-0.5 rounded">
                      <Sparkles className="w-3 h-3" /> Auto-filled
                    </span>
                  </div>
                  <div className="w-full bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg p-3 text-sm font-medium text-gray-900 dark:text-white">
                    Large Pothole on Main Street
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Category</label>
                    <div className="w-full bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg p-3 text-sm text-gray-900 dark:text-white flex items-center justify-between">
                      Infrastructure
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Severity</label>
                    <div className="w-full bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-3 text-sm font-medium text-amber-700 dark:text-amber-400 flex items-center justify-between">
                      High Priority
                      <AlertIcon className="w-4 h-4 text-amber-500" />
                    </div>
                  </div>
                </div>
                
                <button className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium text-sm hover:bg-blue-700 transition-colors mt-4">
                  Review & Submit
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scan {
          0% { top: 0; }
          100% { top: 100%; }
        }
      `}} />
    </section>
  );
}

function AlertIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </svg>
  );
}
