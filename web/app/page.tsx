import React from 'react';
import Navbar from '@/components/landing/Navbar';
import HeroSection from '@/components/landing/HeroSection';
import InteractiveAIShowcase from '@/components/landing/InteractiveAIShowcase';
import AIFeaturesSection from '@/components/landing/AIFeaturesSection';
import HowItWorksSection from '@/components/landing/HowItWorksSection';
import AITrustSection from '@/components/landing/AITrustSection';
import StatsSection from '@/components/landing/StatsSection';
import TestimonialsSection from '@/components/landing/TestimonialsSection';
import FAQSection from '@/components/landing/FAQSection';
import AssistantCTASection from '@/components/landing/AssistantCTASection';
import Footer from '@/components/landing/Footer';

export default function Home() {
  return (
    <div className="dark flex flex-col min-h-screen bg-[#050505] text-gray-100 font-sans selection:bg-indigo-500/30 overflow-x-hidden relative">
      {/* Universal Depth Layers */}
      <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.035] pointer-events-none z-[100] mix-blend-overlay"></div>
      
      {/* Global Ambient Lighting */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden flex items-center justify-center">
        <div className="absolute top-[-20%] left-[-10%] w-[1000px] h-[1000px] bg-blue-600/10 rounded-full blur-[150px] mix-blend-screen opacity-50" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[1200px] h-[1200px] bg-indigo-600/10 rounded-full blur-[150px] mix-blend-screen opacity-40" />
      </div>

      <div className="relative z-10 flex flex-col w-full">
        <Navbar />
        <main className="flex-1 w-full flex flex-col">
          <HeroSection />
          <InteractiveAIShowcase />
          <AIFeaturesSection />
          <HowItWorksSection />
          <AITrustSection />
          <StatsSection />
          <TestimonialsSection />
          <FAQSection />
          <AssistantCTASection />
        </main>
        <Footer />
      </div>
    </div>
  );
}
