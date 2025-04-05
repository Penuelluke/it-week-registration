// Form Payload Type Definitions

// Common Event Types
export type EventType = 
  | 'mobile-legends' 
  | 'call-of-duty' 
  | 'other' 
  | 'talent' 
  | 'trash-on-show';

// Team Member Interface
export interface TeamMember {
  name: string;
  inGameName: string;
  role?: string;
}

// Base Submission Payload
export interface BaseSubmissionPayload {
  fullName: string;
  email: string;
  contactNumber: string;
  eventType: EventType;
  organization?: string;
  facebook?: string;
  message?: string;
}

// Game Submission Payload
export interface GameSubmissionPayload extends BaseSubmissionPayload {
  teamName: string;
  teamMembers: TeamMember[];
  substitutes: TeamMember[];
}

// Talent Submission Payload
export interface TalentSubmissionPayload extends BaseSubmissionPayload {
  performanceDetails: {
    performanceType: string;
    duration: string;
    participants: string;
    props?: string;
  };
}

// Trash on Show Submission Payload
export interface TrashOnShowSubmissionPayload extends BaseSubmissionPayload {
  performanceDetails: {
    heroChoice: string;
  };
}

// API Response Interface
export interface ApiResponse {
  result: 'success' | 'error';
  message?: string;
  timestamp?: string;
}
