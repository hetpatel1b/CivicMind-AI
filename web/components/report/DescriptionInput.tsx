import React from 'react';

interface DescriptionInputProps {
  title: string;
  onTitleChange: (title: string) => void;
  description: string;
  onDescriptionChange: (desc: string) => void;
}

export default function DescriptionInput({ 
  title, onTitleChange, 
  description, onDescriptionChange 
}: DescriptionInputProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="issue-title" className="block text-sm font-semibold text-gray-900 dark:text-gray-100">
          Issue Title
        </label>
        <input
          id="issue-title"
          type="text"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          placeholder="E.g. Large pothole on Main Street"
          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
          required
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="issue-desc" className="block text-sm font-semibold text-gray-900 dark:text-gray-100">
          Detailed Description
        </label>
        <textarea
          id="issue-desc"
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
          placeholder="Please provide any additional details that might help resolve the issue..."
          rows={4}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow resize-none"
          required
        />
      </div>
    </div>
  );
}
