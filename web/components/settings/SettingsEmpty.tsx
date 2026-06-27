import React from 'react';
import { Settings } from 'lucide-react';

interface SettingsEmptyProps {
  title?: string;
  message?: string;
}

export default function SettingsEmpty({ 
  title = "No settings available", 
  message = "There are currently no settings to display in this category." 
}: SettingsEmptyProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-full mb-5">
        <Settings className="w-10 h-10 text-gray-400 dark:text-gray-500" />
      </div>
      <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white mb-2">{title}</h3>
      <p className="text-base text-gray-500 dark:text-gray-400 max-w-md">{message}</p>
    </div>
  );
}
