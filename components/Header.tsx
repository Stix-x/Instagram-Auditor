import React from 'react';

const InstaIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
    </svg>
);


export const Header: React.FC = () => {
  return (
    <header className="py-6">
      <div className="container mx-auto px-4 flex justify-center items-center space-x-3">
        <div className="p-2 rounded-lg bg-gradient-to-r from-brand-purple via-brand-pink to-brand-orange">
          <InstaIcon />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-brand-purple via-brand-pink to-brand-orange">
          AI Instagram Auditor
        </h1>
      </div>
    </header>
  );
};
