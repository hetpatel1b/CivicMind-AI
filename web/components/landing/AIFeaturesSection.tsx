import React from 'react';
import { Camera, FolderTree, AlertTriangle, CopyX, MapPin, BarChart3 } from 'lucide-react';

const aiFeatures = [
  {
    title: 'AI Image Analysis',
    description: 'Automatically detects the type of issue from uploaded photos using advanced computer vision.',
    icon: <Camera className="w-6 h-6 text-blue-600 dark:text-blue-400" aria-hidden="true" />
  },
  {
    title: 'Smart Categorization',
    description: 'Routes reports to the correct municipal department based on natural language processing of the description.',
    icon: <FolderTree className="w-6 h-6 text-indigo-600 dark:text-indigo-400" aria-hidden="true" />
  },
  {
    title: 'Severity Detection',
    description: 'Assesses the urgency of a report, prioritizing critical safety hazards automatically.',
    icon: <AlertTriangle className="w-6 h-6 text-amber-600 dark:text-amber-400" aria-hidden="true" />
  },
  {
    title: 'Duplicate Detection',
    description: 'Prevents system clutter by identifying and grouping visually or geographically similar reports.',
    icon: <CopyX className="w-6 h-6 text-red-600 dark:text-red-400" aria-hidden="true" />
  },
  {
    title: 'Location Intelligence',
    description: 'Extracts precise coordinates and cross-references them with city zoning and infrastructure data.',
    icon: <MapPin className="w-6 h-6 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
  },
  {
    title: 'Analytics Dashboard',
    description: 'Generates predictive insights to help cities allocate resources before problems escalate.',
    icon: <BarChart3 className="w-6 h-6 text-purple-600 dark:text-purple-400" aria-hidden="true" />
  }
];

export default function AIFeaturesSection() {
  return (
    <section className="py-24 bg-gray-50 dark:bg-[#020817] border-y border-gray-100 dark:border-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 font-medium text-sm mb-6 border border-purple-100 dark:border-purple-800">
            Powered by Machine Learning
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Intelligence at the Core
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Our proprietary AI models remove the friction from civic reporting, ensuring accurate and actionable data.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {aiFeatures.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white dark:bg-black p-8 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/10 dark:to-purple-900/10 rounded-bl-full -z-10 group-hover:scale-110 transition-transform"></div>
              <div className="w-12 h-12 bg-gray-50 dark:bg-gray-900 rounded-xl flex items-center justify-center mb-6 border border-gray-100 dark:border-gray-800">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
