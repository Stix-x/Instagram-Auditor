/// <reference types="node" />

// This file should be placed in an /api directory.
// When deployed to a platform like Vercel or Netlify, it will become a serverless function.

import { GoogleGenAI, Type } from "@google/genai";
import type { InstagramAudit } from '../src/types';

// This function will be the entry point for the serverless function.
// The exact signature might vary slightly based on the hosting provider,
// but the Request -> Response pattern is standard.
export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method Not Allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const { username, bio, postUrl, competitors, isVideo } = await req.json();

    if (!username || !bio || !postUrl) {
        return new Response(JSON.stringify({ error: 'Missing required fields: username, bio, postUrl' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    const audit = await generateAudit(username, bio, postUrl, competitors, isVideo);
    
    return new Response(JSON.stringify(audit), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error("Error in serverless function:", error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return new Response(JSON.stringify({ error: 'Internal Server Error', details: errorMessage }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}


// --- Gemini API Logic (moved from the frontend) ---

const getApiKey = () => {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
        throw new Error("API_KEY environment variable is not set");
    }
    return apiKey;
}

const auditSchema = {
  type: Type.OBJECT,
  properties: {
    profileAnalysis: {
      type: Type.OBJECT,
      properties: {
        title: { type: Type.STRING },
        rating: { type: Type.NUMBER },
        feedback: { type: Type.STRING }
      },
      required: ['title', 'rating', 'feedback']
    },
    contentStrategy: {
      type: Type.OBJECT,
      properties: {
        title: { type: Type.STRING },
        rating: { type: Type.NUMBER },
        feedback: { type: Type.STRING }
      },
      required: ['title', 'rating', 'feedback']
    },
    competitorAnalysis: {
      type: Type.OBJECT,
      properties: {
        title: { type: Type.STRING },
        rating: { type: Type.NUMBER },
        feedback: { type: Type.STRING }
      },
      required: ['title', 'rating', 'feedback']
    },
    hashtagStrategy: {
      type: Type.OBJECT,
      properties: {
        title: { type: Type.STRING },
        feedback: { type: Type.STRING },
        suggestedHashtags: {
            type: Type.OBJECT,
            properties: {
                primary: { type: Type.ARRAY, items: { type: Type.STRING } },
                secondary: { type: Type.ARRAY, items: { type: Type.STRING } },
                niche: { type: Type.ARRAY, items: { type: Type.STRING } }
            },
            required: ['primary', 'secondary', 'niche']
        }
      },
      required: ['title', 'feedback', 'suggestedHashtags']
    },
    engagementStrategy: {
      type: Type.OBJECT,
      properties: {
        title: { type: Type.STRING },
        rating: { type: Type.NUMBER },
        feedback: { type: Type.STRING }
      },
      required: ['title', 'rating', 'feedback']
    },
    videoAnalysis: {
        type: Type.OBJECT,
        properties: {
            title: { type: Type.STRING },
            rating: { type: Type.NUMBER },
            feedback: { type: Type.STRING }
        },
        nullable: true
    },
    summary: {
      type: Type.STRING
    }
  },
  required: ['profileAnalysis', 'contentStrategy', 'competitorAnalysis', 'hashtagStrategy', 'engagementStrategy', 'summary']
};

const generateAudit = async (username: string, bio: string, postUrl: string, competitors: string, isVideo: boolean): Promise<InstagramAudit> => {
  const ai = new GoogleGenAI({ apiKey: getApiKey() });
  
  let prompt = `
    You are a world-class social media marketing expert and an Instagram growth strategist. Your task is to perform a comprehensive audit of a hypothetical Instagram profile based on the information provided. Provide actionable, specific, and constructive feedback to help the user dramatically increase their engagement and growth.

    Analyze the following profile details:
    - Username: "${username}"
    - Bio: "${bio}"
    - Link to a specific post: "${postUrl}"

    Based on this information, provide a detailed audit in the required JSON format. For each section with a rating, give a score from 1 to 10, where 1 is extremely poor and 10 is perfect. The feedback should be concise, professional, and highly actionable.
  `;

  if (competitors) {
    prompt += `
    **Competitor Analysis:**
    The user has listed the following competitors or influencers in their niche: ${competitors}.
    Provide a "Competitor Analysis" section. Analyze potential content gaps and suggest a "Mimic Strategy" by identifying 1-2 key things these top accounts likely do well that this user could adopt. Rate the user's current strategy against this inferred competition.
    `;
  }

  prompt += `
    **Hashtag Strategy:**
    Provide a "Hashtag Strategy" section. Based on the user's niche (inferred from bio and post), generate a list of predictive hashtags that are likely to perform well. Do not just list generic tags. Provide a mix of primary (high volume), secondary (medium volume), and niche-specific tags. Also provide feedback on how they can develop a better hashtag strategy.
  `;

  if (isVideo) {
    prompt += `
    **Viral Video Analysis:**
    The linked post is a video (like an Instagram Reel). Provide a "Video Analysis" section. Based on best practices for short-form video, critique its viral potential. Focus on the first 3-second hook quality, potential for sound trend matching, motion pacing, and overall visual appeal. Provide a rating and concrete suggestions for improvement.
    `;
  }

  prompt += `
    **Final Summary:**
    The summary should provide a 2-3 sentence high-level action plan incorporating the key findings from all sections.

    Return ONLY the JSON object that conforms to the provided schema.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: auditSchema,
      temperature: 0.7,
    },
  });
  
  const responseText = response.text;
  if (!responseText) {
    throw new Error("Received an empty or invalid response from the AI model.");
  }
  
  const result = JSON.parse(responseText.trim());
  
  return result as InstagramAudit;
};
