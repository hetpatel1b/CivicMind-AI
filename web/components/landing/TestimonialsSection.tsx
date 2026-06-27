import React from 'react';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Jenkins',
    role: 'Local Resident',
    review: 'I reported a massive pothole on my street, and it was fixed within 48 hours. The ability to track the status made me feel heard by the city.',
    avatar: 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400'
  },
  {
    name: 'Marcus Chen',
    role: 'City Operations Manager',
    review: 'The AI triage feature is a game-changer. We no longer spend hours sorting through duplicate reports. We just dispatch crews where they are needed most.',
    avatar: 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400'
  },
  {
    name: 'Elena Rodriguez',
    role: 'Community Organizer',
    review: 'This platform finally gives our neighborhood association a transparent way to coordinate with local government on persistent infrastructure issues.',
    avatar: 'bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400'
  }
];

export default function TestimonialsSection() {
  return (
    <section className="py-24 bg-gray-50 dark:bg-[#020817] border-t border-gray-100 dark:border-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium text-xs mb-6 uppercase tracking-wider">
            Demo Testimonials
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Trusted by communities
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            See how CivicMind AI is making a difference in municipalities around the globe.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white dark:bg-black p-8 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm relative">
              <Quote className="absolute top-8 right-8 w-8 h-8 text-gray-100 dark:text-gray-900" aria-hidden="true" />
              <div className="flex items-center gap-4 mb-6 relative z-10">
                <div className={`w-14 h-14 rounded-full flex items-center justify-center font-bold text-xl ${testimonial.avatar}`} aria-hidden="true">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white">{testimonial.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed italic relative z-10">
                &quot;{testimonial.review}&quot;
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
