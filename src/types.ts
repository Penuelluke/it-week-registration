export interface BaseRegistrationData {
  fullName: string;
  organization: string;
  contactNumber: string;
  email: string;
  message?: string;
}

export interface TalentRegistrationData extends BaseRegistrationData {
  performanceType: string;
  duration: string;
  participants: string;
  props: string;
}

export interface TrashOnShowRegistrationData extends BaseRegistrationData {
  heroChoice: string;
}

export interface GameRegistrationData extends BaseRegistrationData {
  inGameName: string;
  teamName: string;
  teamMembers: {
    name: string;
    inGameName: string;
    role?: string;   
    isStarter: boolean; 
  }[];
  gameType: 'mobile-legends' | 'call-of-duty' | 'other';
  notes?: string;
}

export type Event = {
  id: string;
  name: string;
  description: string;
  guidelines: string[];
  requiresTeam: boolean;
  icon: string;
  formType: 'talent' | 'trash on show' | 'game';
};