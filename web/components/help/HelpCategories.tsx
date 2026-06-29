import React from 'react';
import { Layers } from 'lucide-react';
import { motion } from 'framer-motion';

interface Category {
  id: string;
  name: string;
}

interface HelpCategoriesProps {
  categories: Category[];
}

export default function HelpCategories({ categories }: HelpCategoriesProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {categories.map((category, index) => (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          key={category.id}
          className="group relative overflow-hidden bg-white dark:bg-gray-900/50 rounded-3xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm transition-all hover:shadow-xl hover:border-indigo-200 dark:hover:border-indigo-900/50 flex flex-col items-center justify-center gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 hover:-translate-y-1"
        >
          <div className="w-14 h-14 rounded-2xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm">
            <Layers className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
          </div>
          <span className="font-bold text-gray-900 dark:text-white text-sm text-center">{category.name}</span>
        </motion.button>
      ))}
    </div>
  );
}
