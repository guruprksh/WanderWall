export type CoverStyle = 'large' | 'grid' | 'polaroid' | 'minimal' | 'scrapbook';

export type ScrapbookMode = 'physical' | 'clean';

export interface Collaborator {
  name: string;
  avatar: string;
  role: string;
}

export interface Trip {
  id: string;
  title: string;
  destination: string;
  dates: {
    start: string;
    end: string;
  };
  year: number;
  coverPhoto: string;
  coverStyle: CoverStyle;
  description: string;
  weather: string;
  distanceKm: number;
  countries: string[];
  cities: string[];
  placesCount: number;
  routePreview: string[];
  collaborators: Collaborator[];
  tags: string[];
  moodPalette: string[];
  photos?: string[];
  createdAt: string;
  status: 'completed' | 'ongoing' | 'dream';
}

export type CanvasItemType = 
  | 'photo'
  | 'place'
  | 'ticket'
  | 'memory'
  | 'note'
  | 'sticker'
  | 'stamp'
  | 'route';

export interface PhotoItemContent {
  url: string;
  caption?: string;
  date?: string;
  location?: string;
  frameStyle: 'polaroid' | 'filmstrip' | 'rounded' | 'simple';
  tapeColor?: 'coral' | 'sage' | 'navy' | 'gold' | 'default';
  pinColor?: 'red' | 'brass' | 'blue' | 'green';
  hasTape?: boolean;
  hasPin?: boolean;
}

export interface PlaceItemContent {
  name: string;
  location: string;
  category: 'city' | 'restaurant' | 'cafe' | 'museum' | 'beach' | 'hiking' | 'hotel' | 'attraction';
  rating: number;
  note: string;
  photo?: string;
  dateVisited?: string;
  address?: string;
  priceLevel?: string;
}

export interface TicketItemContent {
  type: 'flight' | 'train' | 'boarding-pass' | 'hotel' | 'museum' | 'receipt';
  title: string;
  from?: string;
  to?: string;
  date: string;
  time?: string;
  carrier?: string;
  seat?: string;
  code?: string;
  price?: string;
  notes?: string;
  gate?: string;
  qrCode?: boolean;
}

export type MemoryCategory = 
  | 'Best Meal'
  | 'Best View'
  | 'Funniest Moment'
  | 'Hidden Gem'
  | 'Unexpected Adventure'
  | 'Best Coffee'
  | 'Favourite Hotel'
  | 'Most Beautiful Place'
  | 'Would Visit Again'
  | 'Travel Tip';

export interface MemoryItemContent {
  category: MemoryCategory;
  title: string;
  description: string;
  photo?: string;
  location?: string;
  rating?: number;
  emoji?: string;
  audioDuration?: string;
}

export interface NoteItemContent {
  text: string;
  color: 'yellow' | 'pink' | 'blue' | 'green' | 'kraft';
  fontStyle: 'handwriting' | 'sans' | 'serif';
  pinned?: boolean;
  tape?: boolean;
}

export interface StickerItemContent {
  emoji: string;
  label?: string;
  badgeStyle?: 'circle' | 'ribbon' | 'badge';
  bgColor?: string;
}

export interface StampItemContent {
  text: string;
  country: string;
  city: string;
  date: string;
  color: 'red' | 'navy' | 'green' | 'amber';
  shape: 'round' | 'rect' | 'oval';
}

export interface RouteStop {
  name: string;
  country?: string;
  lat: number;
  lng: number;
  order: number;
  type?: 'flight' | 'train' | 'car' | 'boat';
}

export interface RouteItemContent {
  title: string;
  stops: RouteStop[];
  totalDistance?: string;
}

export interface CanvasItem {
  id: string;
  tripId: string;
  type: CanvasItemType;
  x: number;
  y: number;
  width: number;
  height?: number;
  rotation: number;
  zIndex: number;
  isPinned?: boolean;
  addedBy?: string;
  content: 
    | PhotoItemContent 
    | PlaceItemContent 
    | TicketItemContent 
    | MemoryItemContent 
    | NoteItemContent 
    | StickerItemContent 
    | StampItemContent 
    | RouteItemContent;
}

export interface TimelineEvent {
  id: string;
  time?: string;
  type: 'flight' | 'train' | 'cafe' | 'food' | 'museum' | 'activity' | 'walk' | 'hotel';
  title: string;
  location?: string;
  notes?: string;
  photo?: string;
  cost?: string;
}

export interface TimelineDay {
  id: string;
  tripId: string;
  dayNumber: number;
  date: string;
  title: string;
  events: TimelineEvent[];
}

export interface DiaryEntry {
  id: string;
  tripId: string;
  date: string;
  location: string;
  weather: string;
  mood: string;
  title: string;
  text: string;
  photos: string[];
  placesVisited: string[];
  foodHighlights: string[];
  voiceNoteUrl?: string;
}

export interface DreamTrip {
  id: string;
  destination: string;
  country: string;
  flag: string;
  photos: string[];
  estimatedBudget: string;
  bestSeason: string;
  priority: 'Must Visit' | 'High' | 'Someday';
  placesToVisit: string[];
  restaurants: string[];
  activities: string[];
  status: 'Dream Trip' | 'Planning' | 'Booked';
  notes: string;
  targetYear?: string;
}

export interface MoodboardItem {
  id: string;
  tripId: string;
  type: 'photo' | 'color' | 'food' | 'architecture' | 'music' | 'quote' | 'texture' | 'packing';
  title: string;
  value: string; // url, hex color, quote string, track name
  subtitle?: string;
  aspect?: string;
}

export interface PassportStamp {
  id: string;
  country: string;
  flag: string;
  city: string;
  date: string;
  tripTitle: string;
  shape: 'round' | 'rect' | 'oval';
  color: string;
}

export interface TravelStats {
  totalDistanceKm: number;
  countriesCount: number;
  citiesCount: number;
  tripsCount: number;
  flightsCount: number;
  trainCount: number;
  hotelsCount: number;
  restaurantsCount: number;
  photosCount: number;
  travelDaysCount: number;
}
