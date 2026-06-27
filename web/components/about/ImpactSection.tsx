import React from 'react';

interface DashboardStatistics {
  totalIssues: number;
  resolvedIssues: number;
  totalUsers: number;
  totalSupports: number;
}

interface ImpactSectionProps {
  stats: DashboardStatistics | null;
}

export default function ImpactSection({ stats }: ImpactSectionProps) {
  const displayStats = stats ? [
    { value: stats.totalIssues.toLocaleString() + '+', label: 'Issues Reported' },
    { value: stats.resolvedIssues.toLocaleString() + '+', label: 'Issues Resolved' },
    { value: stats.totalUsers.toLocaleString() + '+', label: 'Active Citizens' },
    { value: stats.totalSupports.toLocaleString() + '+', label: 'Community Supports' },
  ] : [
    { value: '14,000+', label: 'Issues Reported' },
    { value: '340+', label: 'Communities Served' },
    { value: '250,000+', label: 'Citizens Engaged' },
    { value: '< 24hr', label: 'Average Response Time' },
  ];
  return (
    <section className="py-20 bg-blue-600 dark:bg-blue-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-6">Our Impact</h2>
          <div className="w-16 h-1 bg-blue-300 mx-auto mb-8 rounded-full" />
          <p className="text-lg text-blue-100">
            Measuring our success by the improvements we bring to local neighborhoods every single day.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {displayStats.map((stat, idx) => (
            <div key={idx} className="p-4">
              <div className="text-4xl md:text-5xl font-extrabold mb-2">{stat.value}</div>
              <div className="text-blue-200 font-medium tracking-wide uppercase text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
