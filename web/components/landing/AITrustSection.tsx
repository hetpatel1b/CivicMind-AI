import React from 'react';
import { ShieldCheck, UserCheck, Edit3 } from 'lucide-react';

export default function AITrustSection() {
  return (
    <section className="py-24 bg-gray-50 dark:bg-[#020817] border-y border-gray-100 dark:border-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 font-medium text-sm mb-6 border border-emerald-100 dark:border-emerald-800">
            <ShieldCheck className="w-4 h-4" />
            Responsible AI
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Built for Trust & Transparency
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            We believe AI should empower citizens and administrators, not replace them. Our platform is designed with clear guardrails.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-black p-8 rounded-2xl border border-gray-100 dark:border-gray-800 text-center flex flex-col items-center">
            <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-xl flex items-center justify-center mb-6 text-blue-600 dark:text-blue-400">
              <UserCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Humans in Control</h3>
            <p className="text-gray-600 dark:text-gray-400">
              AI acts as an intelligent assistant, but final decisions on civic actions are always made by verified city administrators and community members.
            </p>
          </div>

          <div className="bg-white dark:bg-black p-8 rounded-2xl border border-gray-100 dark:border-gray-800 text-center flex flex-col items-center">
            <div className="w-12 h-12 bg-purple-50 dark:bg-purple-900/20 rounded-xl flex items-center justify-center mb-6 text-purple-600 dark:text-purple-400">
              <Edit3 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">100% Editable</h3>
            <p className="text-gray-600 dark:text-gray-400">
              When AI analyzes an image or suggests a category, it&apos;s just a draft. You can always override, edit, or delete any AI-generated content before submitting.
            </p>
          </div>

          <div className="bg-white dark:bg-black p-8 rounded-2xl border border-gray-100 dark:border-gray-800 text-center flex flex-col items-center">
            <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl flex items-center justify-center mb-6 text-emerald-600 dark:text-emerald-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Clear Boundaries</h3>
            <p className="text-gray-600 dark:text-gray-400">
              All AI-generated insights, summaries, and tags are explicitly labeled across the platform with our signature Sparkles icon, ensuring total transparency.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
