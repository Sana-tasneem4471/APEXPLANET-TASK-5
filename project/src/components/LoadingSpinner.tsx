import React from 'react';
import { Loader2 } from 'lucide-react';

export const LoadingSpinner: React.FC = () => (
  <div className="flex flex-col items-center justify-center min-h-[200px]">
    <Loader2 className="animate-spin text-blue-600 dark:text-blue-400 mb-4" size={40} />
    <p className="text-gray-600 dark:text-gray-300">Loading...</p>
  </div>
);