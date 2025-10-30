import React from 'react';
import { AuditSection } from '../types';

interface ResultCardProps {
  section: AuditSection;
  icon: React.ReactNode;
}

export const ResultCard: React.FC<ResultCardProps> = ({ section, icon }) => {
  const ratingColor =
    section.rating >= 8
      ? 'bg-green-500'
      : section.rating >= 5
      ? 'bg-yellow-500'
      : 'bg-red-500';

  const ratingPercentage = section.rating * 10;

  return (
    <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="text-brand-pink">{icon}</div>
          <h3 className="text-lg font-bold text-white">{section.title}</h3>
        </div>
        <span className={`text-sm font-bold px-2 py-1 rounded ${ratingColor}`}>
          {section.rating}/10
        </span>
      </div>
      
      <div className="w-full bg-gray-700 rounded-full h-2.5 mb-4">
        <div 
          className={`h-2.5 rounded-full ${ratingColor} transition-all duration-500`} 
          style={{ width: `${ratingPercentage}%` }}
        ></div>
      </div>

      <p className="text-gray-300 text-sm leading-relaxed flex-grow">{section.feedback}</p>
    </div>
  );
};