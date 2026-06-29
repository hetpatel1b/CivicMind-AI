'use client';

import React, { useState } from 'react';
import { ChevronDown, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const FAQS = [
  { id: 'faq-1', q: 'How long does it take to get a response?', a: 'Our standard response time is under 24 hours on business days. Complex inquiries may take slightly longer, but we will always send an initial confirmation.' },
  { id: 'faq-2', q: 'Can I track the status of my support ticket?', a: 'Currently, support tracking is unavailable in this demo version. In a production environment, you would receive tracking links via email.' },
  { id: 'faq-3', q: 'Where do I report a physical bug in my city?', a: 'Please use the dedicated "Report Issue" tool from your dashboard to submit physical civic issues with location tracking and photos.' },
  { id: 'faq-4', q: 'Is my data secure when submitting a request?', a: 'Yes, we take privacy and security seriously. All data is encrypted in transit and at rest, and handled according to our strict privacy policy.' },
];

export default function ContactFAQ() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  return (
    <section className="mb-16 max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight">Frequently Asked Questions</h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 font-medium">Quick answers to common questions about our support process.</p>
      </div>
      
      <div className="flex flex-col gap-4 mb-10">
        {FAQS.map((faq) => {
          const isExpanded = expandedId === faq.id;
          return (
            <div 
              key={faq.id} 
              className={`bg-white dark:bg-gray-900/50 border rounded-3xl overflow-hidden transition-all duration-300 backdrop-blur-xl ${
                isExpanded 
                  ? 'border-indigo-300 dark:border-indigo-700/50 shadow-md ring-2 ring-indigo-500/20' 
                  : 'border-gray-100 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 hover:shadow-sm'
              }`}
            >
              <button
                id={`faq-button-${faq.id}`}
                aria-expanded={isExpanded}
                aria-controls={`faq-answer-${faq.id}`}
                onClick={() => toggleExpand(faq.id)}
                className="w-full flex items-center justify-between p-6 text-left focus:outline-none focus-visible:bg-gray-50 dark:focus-visible:bg-gray-800/50 rounded-3xl transition-colors"
              >
                <span className={`text-lg font-bold transition-colors duration-300 ${isExpanded ? 'text-indigo-900 dark:text-indigo-100' : 'text-gray-900 dark:text-white'}`}>
                  {faq.q}
                </span>
                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${isExpanded ? 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 rotate-180' : 'bg-gray-50 dark:bg-gray-800 text-gray-400 group-hover:bg-gray-100 dark:group-hover:bg-gray-700'}`}>
                  <ChevronDown className="w-5 h-5" aria-hidden="true" />
                </div>
              </button>

              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    id={`faq-answer-${faq.id}`} 
                    role="region" 
                    aria-labelledby={`faq-button-${faq.id}`} 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-6 pb-6 pt-2">
                      <div className="text-gray-600 dark:text-gray-300 leading-relaxed font-medium">
                        {faq.a}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
      
      <div className="text-center">
        <Link 
          href="/help" 
          className="inline-flex items-center justify-center px-6 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-700 rounded-xl text-indigo-600 dark:text-indigo-400 font-bold transition-all shadow-sm hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 group"
        >
          View full Help Center
          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </section>
  );
}
