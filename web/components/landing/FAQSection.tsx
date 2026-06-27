import React from 'react';

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
  return (
    <section className="py-24 bg-white dark:bg-black">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Have questions? We&apos;re here to help.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <details 
              key={index}
              className="group bg-gray-50 dark:bg-[#020817] border border-gray-100 dark:border-gray-800 rounded-2xl [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex items-center justify-between cursor-pointer p-6 font-semibold text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 rounded-2xl">
                <span className="pr-4">{faq.question}</span>
                <span className="relative flex-shrink-0 ml-1.5 w-5 h-5">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="absolute inset-0 w-5 h-5 opacity-100 group-open:opacity-0 transition-opacity text-gray-400" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor" 
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="absolute inset-0 w-5 h-5 opacity-0 group-open:opacity-100 transition-opacity text-gray-400" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor" 
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
                  </svg>
                </span>
              </summary>
              <div className="px-6 pb-6 text-gray-600 dark:text-gray-400 leading-relaxed">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
