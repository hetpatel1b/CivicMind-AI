'use client';

import React, { useEffect, useRef } from 'react';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';
import { staggerContainer, fadeUp } from '@/design-system/motion/variants';

const stats = [
  { label: 'Issues Reported', value: 10542, suffix: '+' },
  { label: 'Resolution Rate', value: 95, suffix: '%' },
  { label: 'Communities', value: 524, suffix: '+' },
  { label: 'Cities', value: 112, suffix: '+' },
  { label: 'AI Assistance', value: 24, suffix: '/7' },
  { label: 'Platform Uptime', value: 99, suffix: '%' }
];

function Counter({ from = 0, to, suffix = '' }: { from?: number, to: number, suffix?: string }) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(nodeRef, { once: true, margin: "-50px" });
  
  const spring = useSpring(from, { mass: 1, stiffness: 40, damping: 20 });
  const display = useTransform(spring, (current) => Math.round(current).toLocaleString() + suffix);

  useEffect(() => {
    if (isInView) {
      spring.set(to);
    }
  }, [isInView, spring, to]);

  return <motion.span ref={nodeRef}>{display}</motion.span>;
}

export default function StatsSection() {
  return (
    <section id="stats" className="py-24 bg-transparent relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 border-y border-white/5 py-16 bg-[#050505]/40 backdrop-blur-md">
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 md:gap-6"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-50px" }}
        >
          {stats.map((stat, index) => (
            <motion.div 
              key={index} 
              variants={fadeUp}
              className="text-center group"
            >
              <div className="text-3xl md:text-4xl font-extrabold mb-2 text-white tracking-tight group-hover:scale-105 transition-transform duration-300">
                <Counter from={0} to={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-[9px] font-bold text-gray-500 uppercase tracking-[0.2em] group-hover:text-gray-400 transition-colors duration-300">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
