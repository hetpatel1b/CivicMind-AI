import React from 'react';
import { Mail, FileCode2, BookOpen, Clock } from 'lucide-react';

export default function ContactInformation() {
  return (
    <div className="bg-blue-600 dark:bg-blue-900 text-white rounded-3xl p-8 shadow-sm h-full flex flex-col justify-between">
      <div>
        <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
        <p className="text-blue-100 mb-10 leading-relaxed">
          Prefer to reach out directly? Use the channels below. We aim to respond to all inquiries within our standard response times.
        </p>

        <div className="space-y-8">
          <div className="flex items-start">
            <div className="flex-shrink-0 mt-1">
              <Mail className="w-6 h-6 text-blue-300" aria-hidden="true" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-semibold text-blue-200 uppercase tracking-wide">Support Email</p>
              <p className="text-lg font-medium mt-1">support@civicmind.ai</p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="flex-shrink-0 mt-1">
              <FileCode2 className="w-6 h-6 text-blue-300" aria-hidden="true" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-semibold text-blue-200 uppercase tracking-wide">Project Repository</p>
              <p className="text-lg font-medium mt-1">github.com/civicmind</p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="flex-shrink-0 mt-1">
              <BookOpen className="w-6 h-6 text-blue-300" aria-hidden="true" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-semibold text-blue-200 uppercase tracking-wide">Documentation</p>
              <p className="text-lg font-medium mt-1">docs.civicmind.ai</p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="flex-shrink-0 mt-1">
              <Clock className="w-6 h-6 text-blue-300" aria-hidden="true" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-semibold text-blue-200 uppercase tracking-wide">Response Time</p>
              <p className="text-lg font-medium mt-1">Under 24 hours (Business Days)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
