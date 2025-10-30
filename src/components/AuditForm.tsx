import React, { useState } from 'react';

interface AuditFormProps {
  onAudit: (username: string, bio: string, postUrl: string, competitors: string, isVideo: boolean) => void;
  isLoading: boolean;
}

const ConnectIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0l-1.5-1.5a2 2 0 112.828-2.828l1.5 1.5a.5.5 0 00.707 0l3-3a.5.5 0 00-.707-.707l-3 3a1 1 0 01-1.414 0l-1.5-1.5a1 1 0 10-1.414 1.414l1.5 1.5a.5.5 0 00.707 0l3-3a.5.5 0 000-.707l-3-3a.5.5 0 00-.707 0z" clipRule="evenodd" />
    </svg>
);


export const AuditForm: React.FC<AuditFormProps> = ({ onAudit, isLoading }) => {
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [postUrl, setPostUrl] = useState('');
  const [competitors, setCompetitors] = useState('');
  const [isVideo, setIsVideo] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim() && bio.trim() && postUrl.trim()) {
      onAudit(username, bio, postUrl, competitors, isVideo);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-gray-900/50 p-4 rounded-lg border border-dashed border-gray-600 text-center">
          <h3 className="font-semibold text-white">Live Data Connection (Coming Soon!)</h3>
          <p className="text-sm text-gray-400 mt-1 mb-3">To audit a live page, apps need secure access via the official Instagram API.</p>
          <button
            type="button"
            disabled
            className="w-full flex items-center justify-center text-white font-bold py-2 px-4 rounded-lg bg-gray-700 opacity-50 cursor-not-allowed"
          >
            <ConnectIcon />
            Connect with Instagram
          </button>
           <p className="text-xs text-gray-500 mt-2">For now, please manually enter your profile details below.</p>
      </div>

      <div>
        <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">Instagram Username</label>
        <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">@</span>
            <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="yourusername"
            required
            className="w-full pl-7 pr-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-brand-pink focus:border-brand-pink transition duration-200"
            />
        </div>
      </div>
      <div>
        <label htmlFor="bio" className="block text-sm font-medium text-gray-300 mb-2">Profile Bio</label>
        <textarea
          id="bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Copy and paste your Instagram bio here."
          rows={3}
          required
          className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-brand-pink focus:border-brand-pink transition duration-200"
        />
      </div>
       <div>
        <label htmlFor="competitors" className="block text-sm font-medium text-gray-300 mb-2">Top Competitors or Influencers (Optional)</label>
        <textarea
          id="competitors"
          value={competitors}
          onChange={(e) => setCompetitors(e.target.value)}
          placeholder="e.g., @competitor1, @influencer2"
          rows={2}
          className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-brand-pink focus:border-brand-pink transition duration-200"
        />
      </div>
      <div>
        <label htmlFor="postUrl" className="block text-sm font-medium text-gray-300 mb-2">Link to a Specific Post</label>
        <input
          type="url"
          id="postUrl"
          value={postUrl}
          onChange={(e) => setPostUrl(e.target.value)}
          placeholder="https://www.instagram.com/p/C..."
          required
          className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-brand-pink focus:border-brand-pink transition duration-200"
        />
      </div>
      <div className="flex items-center">
        <input
            id="isVideo"
            name="isVideo"
            type="checkbox"
            checked={isVideo}
            onChange={(e) => setIsVideo(e.target.checked)}
            className="h-4 w-4 rounded border-gray-500 bg-gray-800 text-brand-pink focus:ring-brand-pink"
        />
        <label htmlFor="isVideo" className="ml-3 block text-sm text-gray-300">
            This post is a video (Reel)
        </label>
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="w-full text-white font-bold py-3 px-4 rounded-lg bg-gradient-to-r from-brand-purple via-brand-pink to-brand-orange hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 shadow-lg"
      >
        {isLoading ? 'Analyzing...' : 'Analyze Profile'}
      </button>
    </form>
  );
};