import React from 'react';
import { InstagramAudit } from '../types';
import { ResultCard } from './ResultCard';
import { HashtagResultCard } from './HashtagResultCard';

interface AuditResultProps {
  result: InstagramAudit;
}

const ProfileIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
);
const ContentIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
);
const CompetitorIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.124-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.124-1.283.356-1.857m0 0a3.001 3.001 0 015.288 0M12 14a4 4 0 100-8 4 4 0 000 8z" /></svg>
);
const VideoIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
);
const EngagementIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
);

export const AuditResult: React.FC<AuditResultProps> = ({ result }) => {
  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-center">Audit Results</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ResultCard section={result.profileAnalysis} icon={<ProfileIcon />} />
        <ResultCard section={result.contentStrategy} icon={<ContentIcon />} />
        <ResultCard section={result.competitorAnalysis} icon={<CompetitorIcon />} />
        {result.videoAnalysis && <ResultCard section={result.videoAnalysis} icon={<VideoIcon />} />}
        <ResultCard section={result.engagementStrategy} icon={<EngagementIcon />} />
      </div>

      <HashtagResultCard section={result.hashtagStrategy} />

      <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
        <h3 className="text-xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-brand-purple via-brand-pink to-brand-orange">
          Summary & Action Plan
        </h3>
        <p className="text-gray-300 leading-relaxed">{result.summary}</p>
      </div>
    </div>
  );
};