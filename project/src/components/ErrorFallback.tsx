import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import type { FallbackProps } from 'react-error-boundary';

export const ErrorFallback: React.FC<FallbackProps> = ({ error, resetErrorBoundary }) => (
  <div className="flex flex-col items-center justify-center min-h-[200px] p-6">
    <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg p-6 max-w-md w-full">
      <div className="flex items-start gap-3 mb-4">
        <AlertCircle className="text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" size={24} />
        <div>
          <h2 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-2">
            Something went wrong
          </h2>
          <p className="text-red-700 dark:text-red-300 text-sm">
            {error.message}
          </p>
        </div>
      </div>
      <button
        onClick={resetErrorBoundary}
        className="w-full mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors flex items-center justify-center gap-2"
      >
        <RefreshCw size={18} />
        Try again
      </button>
    </div>
  </div>
);