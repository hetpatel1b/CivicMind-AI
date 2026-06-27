import React from 'react';
import { BadgeCheck } from 'lucide-react';

const products = [
  {
    title: 'Live Feed',
    description: 'Real-time feed of all reported civic issues, constantly updated by the community.',
    color: 'from-blue-500 to-indigo-600'
  },
  {
    title: 'AI Report Page',
    description: 'Smart reporting interface that automatically extracts severity and category from photos.',
    color: 'from-emerald-500 to-teal-600'
  },
  {
    title: 'Interactive Map',
    description: 'Geospatial visualization of community hotspots and resolution tracking.',
    color: 'from-purple-500 to-pink-600'
  }
];

export default function ProductShowcaseSection() {
  return (
    <section className="py-24 bg-gray-50 dark:bg-black/50 border-t border-gray-100 dark:border-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            A Complete Civic Ecosystem
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Everything you need to seamlessly connect citizens with the authorities that serve them.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <div key={index} className="flex flex-col bg-white dark:bg-[#020817] rounded-3xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow">
              <div className="p-8">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-medium text-xs mb-6 border border-blue-100 dark:border-blue-800">
                  <BadgeCheck className="w-3.5 h-3.5" aria-hidden="true" />
                  Live Module
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">{product.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{product.description}</p>
              </div>
              <div className="mt-auto px-8 pb-8 pt-4">
                <div className={`w-full aspect-[4/3] rounded-xl bg-gradient-to-br ${product.color} opacity-90 relative overflow-hidden shadow-inner flex items-center justify-center`}>
                  <div className="absolute inset-0 bg-white/10 dark:bg-black/10 backdrop-blur-sm"></div>
                  <span className="relative text-white font-semibold text-sm tracking-widest uppercase opacity-80">App Interface Preview</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
