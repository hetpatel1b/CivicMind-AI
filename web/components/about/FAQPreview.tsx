import React from 'react';
import Link from 'next/link';
import { HelpCircle } from 'lucide-react';

const FAQS = [
  { question: "Is CivicMind AI free to use?", answer: "Yes, the platform is entirely free for citizens to report issues and participate in community discussions." },
  { question: "Who responds to my reports?", answer: "Issues are verified by the community and officially responded to by authorized city officials or local department managers." },
  { question: "How does the AI work?", answer: "Our AI helps categorize incoming reports, detect potential duplicates to save time, and routes severe issues to the appropriate authorities faster." },
];

export default function FAQPreview() {
  return (
    <section className="py-20 bg-[#f8fafc] dark:bg-[#020817]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center justify-center p-3 bg-blue-50 dark:bg-blue-900/30 rounded-full mb-6">
          <HelpCircle className="w-8 h-8 text-blue-600 dark:text-blue-400" aria-hidden="true" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12">Common Questions</h2>
        
        <div className="space-y-6 text-left mb-12">
          {FAQS.map((faq, idx) => (
            <div key={idx} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{faq.question}</h3>
              <p className="text-gray-600 dark:text-gray-400">{faq.answer}</p>
            </div>
          ))}
        </div>
        
        <Link 
          href="/help"
          className="inline-flex items-center px-6 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 shadow-sm"
        >
          Visit Help Center
        </Link>
      </div>
    </section>
  );
}
