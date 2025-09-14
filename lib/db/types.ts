export interface User {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  country?: string;
  age?: number;
  emergency_contact?: {
    name: string;
    phone: string;
    relationship: string;
  };
  created_at: Date;
  updated_at: Date;
}

export interface Registration {
  id: string;
  user_id: string;
  interested_in: 'full_trail' | 'eastern' | 'southern' | 'western' | 'undecided';
  timeframe: 'next_month' | 'next_3_months' | 'next_6_months' | 'next_year' | 'just_exploring';
  group_type: 'solo' | 'couple' | 'friends' | 'family' | 'organized_group';
  fitness_level: 1 | 2 | 3 | 4 | 5;
  hiking_experience: 'none' | 'day_hikes' | 'multi_day' | 'expert';
  longest_hike?: number;
  medical_conditions?: string[];
  dietary_requirements?: string[];
  special_needs?: string;
  motivation: string;
  goals: string[];
  how_did_you_hear: string;
  newsletter: boolean;
  terms_accepted: boolean;
  data_processing: boolean;
  experience_level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  preferred_dates?: any;
  group_size: number;
  status: 'draft' | 'pending' | 'approved' | 'rejected' | 'cancelled';
  step: number;
  created_at: Date;
  updated_at: Date;
}

export interface Route {
  id: string;
  name: string;
  description?: string;
  distance_km: number;
  difficulty: 'easy' | 'moderate' | 'hard' | 'expert';
  gpx_data?: any;
  markers?: any;
  created_at: Date;
  updated_at: Date;
}

export interface AnalyticsEvent {
  id: string;
  event_type: string;
  event_data?: any;
  user_id?: string;
  session_id?: string;
  ip_address?: string;
  user_agent?: string;
  referrer?: string;
  created_at: Date;
}

export interface CreateUserInput {
  email: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  country?: string;
  age?: number;
  emergency_contact?: {
    name: string;
    phone: string;
    relationship: string;
  };
}

export interface CreateRegistrationInput {
  user_id: string;
  interested_in?: 'full_trail' | 'eastern' | 'southern' | 'western' | 'undecided';
  timeframe?: 'next_month' | 'next_3_months' | 'next_6_months' | 'next_year' | 'just_exploring';
  group_type?: 'solo' | 'couple' | 'friends' | 'family' | 'organized_group';
  fitness_level?: 1 | 2 | 3 | 4 | 5;
  hiking_experience?: 'none' | 'day_hikes' | 'multi_day' | 'expert';
  longest_hike?: number;
  medical_conditions?: string[];
  dietary_requirements?: string[];
  special_needs?: string;
  motivation?: string;
  goals?: string[];
  how_did_you_hear?: string;
  newsletter?: boolean;
  terms_accepted?: boolean;
  data_processing?: boolean;
  experience_level?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  preferred_dates?: any;
  group_size?: number;
  status?: 'draft' | 'pending' | 'approved' | 'rejected' | 'cancelled';
  step?: number;
}

export interface CreateRouteInput {
  name: string;
  description?: string;
  distance_km: number;
  difficulty: 'easy' | 'moderate' | 'hard' | 'expert';
  gpx_data?: any;
  markers?: any;
}

export interface CreateAnalyticsEventInput {
  event_type: string;
  event_data?: any;
  user_id?: string;
  session_id?: string;
  ip_address?: string;
  user_agent?: string;
  referrer?: string;
}