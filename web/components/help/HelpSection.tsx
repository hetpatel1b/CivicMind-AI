import React from 'react';

interface HelpSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

export default function HelpSection({ title, description, children }: HelpSectionProps) {
  return (
    <section className="mb-16">
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">{title}</h2>
        {description && <p className="text-lg font-medium text-gray-500 dark:text-gray-400 mt-2 max-w-2xl">{description}</p>}
      </div>
      {children}
    </section>
  );
}
