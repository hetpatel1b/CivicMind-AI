import React from 'react';
import { Globe2 } from 'lucide-react';

export default function VisionSection() {
  return (
    <section className="mb-24">
      <div className="bg-gradient-to-br from-indigo-900 via-indigo-950 to-gray-950 rounded-[3rem] p-10 md:p-16 lg:p-20 shadow-2xl relative overflow-hidden border border-indigo-500/20 text-center">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[400px] h-[400px] bg-indigo-500/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[80px] pointer-events-none" />
        
        <div className="relative z-10 flex flex-col items-center max-w-4xl mx-auto">
          <div className="w-20 h-20 bg-white/5 border border-white/10 rounded-3xl flex items-center justify-center mb-8 backdrop-blur-md">
            <Globe2 className="w-10 h-10 text-blue-400" aria-hidden="true" />
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">The Future of Civic Engagement</h2>
          <p className="text-lg md:text-xl text-indigo-100/80 leading-relaxed font-medium">
            Our vision extends beyond simply fixing potholes. We are building the foundational operating system for responsive communities worldwide. By turning citizens into active sensors and AI into an analytical engine, we envision a future where cities fix themselves proactively, resources are allocated equitably, and trust in local government is universally restored.
          </p>
        </div>
      </div>
    </section>
  );
}
