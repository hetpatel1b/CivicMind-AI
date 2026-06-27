import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Link from 'next/link';

const FAQS = [
  { q: 'How long does it take to get a response?', a: 'Our standard response time is under 24 hours on business days.' },
  { q: 'Can I track the status of my support ticket?', a: 'Currently, support tracking is unavailable in this demo version.' },
  { q: 'Where do I report a bug?', a: 'You can select "Platform Bug" from the category dropdown in the contact form, or use the Report Issue tool for physical civic issues.' },
  { q: 'Is my data secure?', a: 'Yes, we take privacy and security seriously. All data is encrypted and handled securely.' },
];

export default function ContactFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-20 bg-white dark:bg-[#020817] border-t border-gray-100 dark:border-gray-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-600 dark:text-gray-400">Quick answers to common questions about our support process.</p>
        </div>
        
        <div className="space-y-4 mb-12">
          {FAQS.map((faq, idx) => (
            <div 
              key={idx} 
              className={`border rounded-2xl overflow-hidden transition-colors ${openIndex === idx ? 'border-blue-300 dark:border-blue-700 bg-blue-50/50 dark:bg-blue-900/10' : 'border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900'}`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full flex items-center justify-between p-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                <span className="font-semibold text-gray-900 dark:text-white">{faq.q}</span>
                {openIndex === idx ? (
                  <ChevronUp className="w-5 h-5 text-gray-500" aria-hidden="true" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500" aria-hidden="true" />
                )}
              </button>
              {openIndex === idx && (
                <div className="px-6 pb-6 text-gray-600 dark:text-gray-400 leading-relaxed">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <Link href="/help" className="inline-flex items-center text-blue-600 dark:text-blue-400 font-semibold hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded px-2 py-1">
            View full Help Center
          </Link>
        </div>
      </div>
    </section>
  );
}
