import React from 'react';
import { HashtagStrategy } from '../types';

interface HashtagResultCardProps {
  section: HashtagStrategy;
}

const HashtagIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" /></svg>
);

const HashtagPill: React.FC<{tag: string}> = ({ tag }) => (
    <span className="inline-block bg-gray-700 rounded-full px-3 py-1 text-sm font-semibold text-gray-300 mr-2 mb-2">
        #{tag}
    </span>
);

export const HashtagResultCard: React.FC<HashtagResultCardProps> = ({ section }) => {
  return (
    <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
      <div className="flex items-center space-x-3 mb-4">
          <div className="text-brand-pink">{<HashtagIcon />}</div>
          <h3 className="text-lg font-bold text-white">{section.title}</h3>
      </div>
      
      <p className="text-gray-300 text-sm leading-relaxed mb-6">{section.feedback}</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
              <h4 className="font-bold text-md mb-3 text-white">Primary Hashtags</h4>
              <div className="flex flex-wrap">
                  {section.suggestedHashtags.primary.map(tag => <HashtagPill key={tag} tag={tag} />)}
              </div>
          </div>
          <div>
              <h4 className="font-bold text-md mb-3 text-white">Secondary Hashtags</h4>
              <div className="flex flex-wrap">
                  {section.suggestedHashtags.secondary.map(tag => <HashtagPill key={tag} tag={tag} />)}
              </div>
          </div>
          <div>
              <h4 className="font-bold text-md mb-3 text-white">Niche Hashtags</h4>
              <div className="flex flex-wrap">
                  {section.suggestedHashtags.niche.map(tag => <HashtagPill key={tag} tag={tag} />)}
              </div>
          </div>
      </div>
    </div>
  );
};