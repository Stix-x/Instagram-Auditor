export interface AuditSection {
  title: string;
  rating: number; // A score from 1-10
  feedback: string;
}

export interface HashtagStrategy {
    title: string;
    feedback: string;
    suggestedHashtags: {
        primary: string[];
        secondary: string[];
        niche: string[];
    }
}

export interface InstagramAudit {
  profileAnalysis: AuditSection;
  contentStrategy: AuditSection;
  competitorAnalysis: AuditSection;
  hashtagStrategy: HashtagStrategy;
  engagementStrategy: AuditSection;
  videoAnalysis?: AuditSection; // Optional, only if the user specifies the post is a video
  summary: string;
}