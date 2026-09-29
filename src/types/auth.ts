export type TravelTier = 'Explorer' | 'Voyager' | 'Globetrotter' | 'Wanderer';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  bio: string;
  homeCity: string;
  homeCountry: string;
  passportNumber: string;
  travelTier: TravelTier;
  memberSince: string;
  countriesVisited: number;
  totalTripsLogged: number;
  favoriteStyle: 'magazine' | 'polaroid' | 'scrapbook';
}

export interface AuthState {
  user: UserProfile | null;
  isAuthenticated: boolean;
}

export const DEFAULT_USER: UserProfile = {
  id: 'user-default-1',
  name: 'Guru Prakash Sahu',
  email: 'guruprakash@wanderwall.travel',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  bio: 'Roaming the globe one notebook, polaroid, and espresso at a time.',
  homeCity: 'San Francisco',
  homeCountry: 'USA',
  passportNumber: 'US •••••481',
  travelTier: 'Globetrotter',
  memberSince: '2024',
  countriesVisited: 14,
  totalTripsLogged: 8,
  favoriteStyle: 'magazine',
};

export const SAMPLE_AVATARS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
];
