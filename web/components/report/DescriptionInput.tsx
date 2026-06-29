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
      <div className="space-y-2 relative group">
        <label htmlFor="issue-title" className="block text-sm font-bold text-gray-300 mb-2">
          Issue Title
        </label>
        <div className="relative">
          <input
            id="issue-title"
            type="text"
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            placeholder="E.g. Large pothole on Main Street"
            className="w-full px-5 py-3.5 rounded-xl border border-white/10 bg-[#050505]/50 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500/50 transition-all backdrop-blur-md shadow-inner"
            required
          />
          {title.length > 0 && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.8)]" />
          )}
        </div>
      </div>
      
      <div className="space-y-2 relative group">
        <div className="flex items-center justify-between mb-2">
          <label htmlFor="issue-desc" className="block text-sm font-bold text-gray-300">
            Detailed Description
          </label>
          <span className="text-[10px] text-gray-500 font-medium uppercase tracking-wider">
            {description.length} characters
          </span>
        </div>
        <div className="relative">
          <textarea
            id="issue-desc"
            value={description}
            onChange={(e) => onDescriptionChange(e.target.value)}
            placeholder="Please provide any additional details that might help resolve the issue..."
            rows={5}
            className="w-full px-5 py-4 rounded-xl border border-white/10 bg-[#050505]/50 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500/50 transition-all backdrop-blur-md shadow-inner resize-none"
            required
          />
          {description.length > 0 && (
            <div className="absolute right-4 top-4 w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.8)]" />
          )}
        </div>
      </div>
    </div>
  );
}
