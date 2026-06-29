'use client';

import React from 'react';
import { Quote, Star, BadgeCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { staggerContainer, fadeUp } from '@/design-system/motion/variants';

const testimonials = [
  {
    name: 'Sarah Jenkins',
    role: 'Local Resident',
    municipality: 'City of Austin',
    review: 'I reported a massive pothole on my street, and it was fixed within 48 hours. The ability to track the status made me feel heard by the city.',
    avatar: 'bg-gradient-to-br from-indigo-500 to-indigo-700',
    stars: 5,
    verified: true
  },
  {
    name: 'Marcus Chen',
    role: 'City Operations Manager',
    municipality: 'Seattle Dept of Transport',
    review: 'The AI triage feature is a game-changer. We no longer spend hours sorting through duplicate reports. We just dispatch crews where they are needed most.',
    avatar: 'bg-gradient-to-br from-emerald-500 to-emerald-700',
    stars: 5,
    verified: true
  },
  {
    name: 'Elena Rodriguez',
    role: 'Community Organizer',
    municipality: 'Miami Civic Org',
    review: 'This platform finally gives our neighborhood association a transparent way to coordinate with local government on persistent infrastructure issues.',
    avatar: 'bg-gradient-to-br from-purple-500 to-purple-700',
    stars: 5,
    verified: true
  }
];

export default function TestimonialsSection() {
  return (
    <section className="py-24 md:py-32 bg-transparent relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-20"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 text-gray-300 font-bold text-[10px] mb-8 uppercase tracking-[0.2em] border border-white/10 shadow-[0_0_20px_rgba(255,255,255,0.02)] backdrop-blur-md">
            Proven Impact
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight leading-tight">
            Trusted by <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-500">communities</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-lg md:text-xl text-gray-400 font-light max-w-2xl mx-auto">
            See how CivicMind AI is making a difference in municipalities around the globe.
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-50px" }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div 
              key={index} 
              variants={fadeUp}
              whileHover={{ y: -10 }}
              className="bg-[#050505]/60 backdrop-blur-3xl p-8 rounded-[2rem] border border-white/5 ring-1 ring-white/5 relative group overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.5)] transition-all duration-500 hover:border-white/20"
            >
              <div className="absolute top-0 right-0 p-6 opacity-10 transform group-hover:scale-125 transition-transform duration-700 ease-out">
                <Quote className="w-20 h-20 text-white" aria-hidden="true" />
              </div>
              
              <div className="flex items-center gap-1 mb-8">
                {[...Array(testimonial.stars)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400 drop-shadow-[0_0_10px_rgba(251,191,36,0.3)]" />
                ))}
              </div>

              <p className="text-gray-300 leading-relaxed text-base font-light mb-10 relative z-10">
                &quot;{testimonial.review}&quot;
              </p>
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-auto relative z-10 pt-6 border-t border-white/5 group-hover:border-white/10 transition-colors">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg text-white shadow-inner ring-1 ring-white/20 ${testimonial.avatar}`} aria-hidden="true">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-white flex items-center gap-1.5 text-sm tracking-wide">
                    {testimonial.name}
                    {testimonial.verified && (
                      <BadgeCheck className="w-4 h-4 text-indigo-400 drop-shadow-[0_0_5px_rgba(99,102,241,0.5)]" />
                    )}
                  </h3>
                  <div className="flex flex-col mt-1">
                    <span className="text-[9px] text-gray-500 uppercase tracking-widest font-bold">{testimonial.role}</span>
                    <span className="text-[9px] text-indigo-400 uppercase tracking-widest font-bold mt-0.5">{testimonial.municipality}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
