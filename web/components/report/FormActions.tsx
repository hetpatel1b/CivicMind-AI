import React from 'react';
import { Button } from '@/design-system/components/Button';

interface FormActionsProps {
  loading: boolean;
  disabled: boolean;
  onReset: () => void;
}

export default function FormActions({ loading, disabled, onReset }: FormActionsProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
      <Button
        type="button"
        variant="outline"
        onClick={onReset}
        disabled={loading}
        className="w-full sm:w-auto px-6 py-3"
      >
        Reset
      </Button>
      <Button
        type="submit"
        variant="primary"
        disabled={disabled || loading}
        className="w-full sm:flex-1 px-6 py-3"
      >
        {loading ? (
          <>
            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></span>
            Submitting...
          </>
        ) : (
          'Submit Issue Report'
        )}
      </Button>
    </div>
  );
}
