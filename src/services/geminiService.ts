import { InstagramAudit } from '../types';

export const getInstagramAudit = async (username: string, bio: string, postUrl: string, competitors: string, isVideo: boolean): Promise<InstagramAudit> => {
  try {
    const response = await fetch('/api/audit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, bio, postUrl, competitors, isVideo }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'The server responded with an error.');
    }

    const result = await response.json();
    
    if (!result.profileAnalysis || !result.contentStrategy || !result.summary) {
        throw new Error("Invalid JSON structure received from the backend.");
    }
    
    return result as InstagramAudit;

  } catch (error) {
    console.error("Error fetching Instagram audit from backend API:", error);
    if (error instanceof Error) {
        // Re-throw with a more user-friendly message if possible
        throw new Error(`Failed to get audit: ${error.message}`);
    }
    throw new Error("An unknown error occurred while fetching the audit.");
  }
};