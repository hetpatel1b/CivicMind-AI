'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, MessageCircleQuestion } from 'lucide-react';
import { staggerContainer, fadeUp } from '@/design-system/motion/variants';

const faqs = [
  {
    question: 'How much does it cost to use CivicMind AI?',
    answer: 'The platform is completely free for citizens to use. Municipalities and local authorities pay a subscription fee based on population size and feature usage.'
  },
  {
    question: 'Do I need to create an account to report an issue?',
    answer: 'No, you can submit reports anonymously. However, creating an account allows you to track the resolution status, earn reputation badges, and interact with the community.'
  },
  {
    question: 'How does the AI categorization work?',
    answer: 'Our machine learning models analyze both the uploaded images and text descriptions to determine the issue category (e.g., Infrastructure, Sanitation) and estimate the severity automatically.'
  },
  {
    question: 'What happens if someone submits a fake report?',
    answer: 'The system uses image analysis to flag digitally altered photos and duplicate detection to catch spam. Furthermore, community downvoting helps filter out invalid reports before they reach city officials.'
  },
  {
    question: 'Can I use the app outside of participating cities?',
    answer: 'Yes! Even if your local government has not officially partnered with CivicMind AI, you can still document issues. Our system aggregates this data and we use it to demonstrate community need to local officials.'
  },
  {
    question: 'Is my location data secure?',
    answer: 'We take privacy seriously. Location data is only attached to specific reports you choose to submit. We do not track your background location or share personal data with third-party advertisers.'
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 md:py-32 bg-transparent relative overflow-hidden">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center mb-20"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 text-gray-300 font-bold text-[10px] mb-8 uppercase tracking-[0.2em] border border-white/10 shadow-sm backdrop-blur-md">
            <MessageCircleQuestion className="w-3.5 h-3.5" />
            Support
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight leading-tight">
            Questions? <span className="text-gray-500">We&apos;ve got answers.</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-lg md:text-xl text-gray-400 font-light max-w-2xl mx-auto">
            Everything you need to know about CivicMind AI.
          </motion.p>
        </motion.div>

        <motion.div 
          className="space-y-4"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-50px" }}
        >
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            
            return (
              <motion.div 
                key={index}
                variants={fadeUp}
                className={`rounded-2xl overflow-hidden transition-all duration-500 border ${isOpen ? 'bg-[#0a0f1c]/50 backdrop-blur-xl border-indigo-500/30 shadow-[0_20px_40px_rgba(0,0,0,0.6)] ring-1 ring-indigo-500/10' : 'bg-transparent border-white/5 hover:border-white/20 hover:bg-white/5'}`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-6 md:p-8 text-left focus:outline-none group"
                >
                  <span className={`font-semibold text-lg tracking-wide transition-colors ${isOpen ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.4, type: "spring", stiffness: 200, damping: 20 }}
                    className={`flex-shrink-0 ml-4 rounded-full p-2 border transition-colors ${isOpen ? 'bg-indigo-500/20 border-indigo-500/30 text-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.4)]' : 'bg-white/5 border-white/10 text-gray-500 group-hover:text-white'}`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </motion.div>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                    >
                      <div className="px-6 md:px-8 pb-8 text-gray-400 leading-relaxed font-light text-base md:text-lg">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
