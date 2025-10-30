import React from 'react';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-brand-pink"></div>
        <p className="text-lg font-semibold text-gray-300">AI is analyzing your profile...</p>
        <p className="text-gray-400">This might take a moment.</p>
    </div>
  );
};
