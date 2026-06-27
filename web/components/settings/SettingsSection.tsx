import React from 'react';

interface SettingsSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

export default function SettingsSection({ title, description, children }: SettingsSectionProps) {
  return (
    <section className="mb-10">
      <div className="mb-6">
        <h2 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h2>
        {description && <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{description}</p>}
      </div>
      <div className="space-y-6">
        {children}
      </div>
    </section>
  );
}
