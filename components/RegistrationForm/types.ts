export interface Step1Data {
  interestedIn: 'full_trail' | 'eastern' | 'southern' | 'western' | 'undecided';
  timeframe: 'next_month' | 'next_3_months' | 'next_6_months' | 'next_year' | 'just_exploring';
  groupType: 'solo' | 'couple' | 'friends' | 'family' | 'organized_group';
}

export interface Step2Data {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  age: number;
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
}

export interface Step3Data {
  fitnessLevel: 1 | 2 | 3 | 4 | 5;
  hikingExperience: 'none' | 'day_hikes' | 'multi_day' | 'expert';
  longestHike: number;
  medicalConditions: string[];
  dietaryRequirements: string[];
  specialNeeds: string;
}

export interface Step4Data {
  motivation: string;
  goals: string[];
  howDidYouHear: string;
  newsletter: boolean;
  termsAccepted: boolean;
  dataProcessing: boolean;
}

export interface RegistrationFormData extends Step1Data, Step2Data, Step3Data, Step4Data {}

export interface FormErrors {
  [key: string]: string;
}

export interface RouteOption {
  id: 'full_trail' | 'eastern' | 'southern' | 'western' | 'undecided';
  name: string;
  description: string;
  image: string;
  duration: string;
  difficulty: string;
}

export interface GoalOption {
  id: string;
  label: string;
  icon: string;
}