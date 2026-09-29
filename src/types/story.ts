export type StoryStyle =
  | 'magazine'
  | 'diary'
  | 'luxury'
  | 'adventure'
  | 'polaroid'
  | 'cinematic';

export type WritingStyle =
  | 'casual'
  | 'funny'
  | 'emotional'
  | 'minimal'
  | 'storytelling'
  | 'magazine';

export type StoryLength = 'short' | 'medium' | 'detailed';

export type StoryVoice = 'first_person' | 'third_person' | 'neutral';

export type StoryVersionType =
  | 'full'
  | 'instagram'
  | 'short'
  | 'printable'
  | 'couples';

export type StoryPageType =
  | 'cover'
  | 'intro'
  | 'route'
  | 'day'
  | 'moments'
  | 'food'
  | 'people'
  | 'gallery'
  | 'gems'
  | 'stats'
  | 'closing'
  | 'yearly_summary';

export interface RouteStop {
  city: string;
  country: string;
  dates: string;
  transport?: string;
  distanceKm?: number;
  highlight?: string;
}

export interface DayScheduleItem {
  time: string;
  place: string;
  activity: string;
  icon?: string;
}

export interface BestMomentItem {
  category: string;
  title: string;
  place: string;
  photo?: string;
  description: string;
  rating?: number;
}

export interface FoodStoryItem {
  restaurant: string;
  city: string;
  dish: string;
  rating: number;
  photo: string;
  note: string;
}

export interface PeopleMemoryItem {
  photo: string;
  caption: string;
  who: string;
  location: string;
}

export interface HiddenGemItem {
  name: string;
  location: string;
  whySpecial: string;
  tip: string;
  photo?: string;
}

export interface StoryPage {
  id: string;
  pageNumber: number;
  type: StoryPageType;
  title: string;
  subtitle?: string;
  content: {
    introText?: string;
    routeStops?: RouteStop[];
    dayNumber?: number;
    dayDate?: string;
    dayCity?: string;
    daySchedule?: DayScheduleItem[];
    dayNotes?: string;
    bestMoments?: BestMomentItem[];
    foodItems?: FoodStoryItem[];
    peopleMemories?: PeopleMemoryItem[];
    galleryLayout?: 'spread' | 'grid3' | 'polaroid_wall' | 'film_strip' | 'overlapping';
    hiddenGems?: HiddenGemItem[];
    statsData?: {
      days: number;
      cities: number;
      distanceKm: number;
      placesCount: number;
      photosCount: number;
      restaurantsCount: number;
      highlightPhrase?: string;
    };
    closingMessage?: string;
    closingSubtext?: string;
    favouriteMemory?: string;
    quote?: string;
    quoteAuthor?: string;
    additionalText?: string;
  };
  photos: string[];
  layoutVariant?: string;
}

export interface TravelStory {
  id: string;
  tripId?: string;
  isYearly?: boolean;
  yearlyYear?: number;
  title: string;
  subtitle: string;
  destination: string;
  dates: string;
  year: number;
  coverPhoto: string;
  style: StoryStyle;
  writingSettings: {
    style: WritingStyle;
    length: StoryLength;
    voice: StoryVoice;
  };
  versionType: StoryVersionType;
  pages: StoryPage[];
  fontFamily: 'serif' | 'sans' | 'handwriting' | 'mono';
  colorTheme: 'terracotta' | 'gold' | 'olive' | 'ocean' | 'monochrome';
  createdAt: string;
  updatedAt: string;
}
