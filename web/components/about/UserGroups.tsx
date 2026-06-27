import React from 'react';
import { User, Users, ShieldAlert, Building } from 'lucide-react';

const GROUPS = [
  { title: 'Citizens', description: 'Easily report local issues like potholes or broken streetlights, track their resolution progress, and stay informed about neighborhood improvements.', icon: User },
  { title: 'Community Volunteers', description: 'Actively verify reports, engage in local discussions, and earn reputation badges for dedicating time to community betterment.', icon: Users },
  { title: 'Administrators', description: 'Utilize powerful AI-driven dashboards to filter noise, manage duplicate reports, and ensure the platform remains a safe, productive space.', icon: ShieldAlert },
  { title: 'Government Officials', description: 'Receive prioritized, democratically-voted issue lists that clearly highlight exactly what the community needs fixed most urgently.', icon: Building },
];

export default function UserGroups() {
  return (
    <section className="py-20 bg-white dark:bg-gray-900 border-y border-gray-100 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="flex-1 text-center lg:text-left">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Who Uses CivicMind AI?</h2>
            <div className="w-16 h-1 bg-blue-500 mx-auto lg:mx-0 mb-8 rounded-full" />
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              Our ecosystem thrives on collaboration. By connecting the people who live in the community with the people responsible for managing it, we create an unbroken chain of civic accountability and improvement.
            </p>
          </div>
          
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
            {GROUPS.map((group, idx) => (
              <div key={idx} className="bg-[#f8fafc] dark:bg-gray-800/40 p-6 rounded-2xl border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-lg flex items-center justify-center">
                    <group.icon className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white">{group.title}</h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {group.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
