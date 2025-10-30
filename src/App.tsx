import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { AuditForm } from './components/AuditForm';
import { AuditResult } from './components/AuditResult';
import { LoadingSpinner } from './components/LoadingSpinner';
import { getInstagramAudit } from './services/geminiService';
import { InstagramAudit } from './types';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [auditResult, setAuditResult] = useState<InstagramAudit | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAudit = useCallback(async (username: string, bio: string, postUrl: string, competitors: string, isVideo: boolean) => {
    setIsLoading(true);
    setError(null);
    setAuditResult(null);

    try {
      const result = await getInstagramAudit(username, bio, postUrl, competitors, isVideo);
      setAuditResult(result);
    } catch (e) {
      console.error(e);
      setError("An error occurred while analyzing the profile. Please check your inputs and try again.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white font-sans">
      <Header />
      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white/10 p-6 sm:p-8 rounded-2xl shadow-2xl backdrop-blur-lg border border-white/20">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-2">Get Your Free Instagram Audit</h2>
            <p className="text-center text-gray-300 mb-6">
              Enter your profile details below. Our AI will analyze your strategy and provide actionable insights for growth.
            </p>
            <AuditForm onAudit={handleAudit} isLoading={isLoading} />
          </div>

          {isLoading && (
            <div className="mt-8">
              <LoadingSpinner />
            </div>
          )}

          {error && (
            <div className="mt-8 bg-red-500/20 border border-red-500 text-red-300 px-4 py-3 rounded-lg text-center animate-fade-in">
              <p className="font-bold">Oops! Something went wrong.</p>
              <p>{error}</p>
            </div>
          )}

          {auditResult && !isLoading && (
            <div className="mt-8 animate-fade-in">
              <AuditResult result={auditResult} />
            </div>
          )}

        </div>
      </main>
      <footer className="text-center py-6 text-gray-500 text-sm">
        <p>Powered by Gemini AI</p>
      </footer>
    </div>
  );
};

export default App;