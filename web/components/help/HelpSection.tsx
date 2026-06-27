import React from 'react';

interface HelpSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

export default function HelpSection({ title, description, children }: HelpSectionProps) {
  return (
    <section className="mb-12">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h2>
        {description && <p className="text-gray-600 dark:text-gray-400 mt-1">{description}</p>}
      </div>
      {children}
    </section>
  );
}
