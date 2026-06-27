import React from 'react';

interface Category {
  id: string;
  name: string;
}

interface HelpCategoriesProps {
  categories: Category[];
}

export default function HelpCategories({ categories }: HelpCategoriesProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {categories.map((category) => (
        <button
          key={category.id}
          className="px-5 py-2.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-sm font-semibold text-gray-700 dark:text-gray-300 hover:border-blue-300 dark:hover:border-blue-700 hover:text-blue-600 dark:hover:text-blue-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}
