import React from 'react';

interface FormActionsProps {
  loading: boolean;
  disabled: boolean;
  onReset: () => void;
}

export default function FormActions({ loading, disabled, onReset }: FormActionsProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
      <button
        type="button"
        onClick={onReset}
        disabled={loading}
        className="w-full sm:w-auto px-6 py-3 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-200 disabled:opacity-50"
      >
        Reset
      </button>
      <button
        type="submit"
        disabled={disabled || loading}
        className="w-full sm:flex-1 px-6 py-3 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            Submitting...
          </>
        ) : (
          'Submit Issue Report'
        )}
      </button>
    </div>
  );
}
