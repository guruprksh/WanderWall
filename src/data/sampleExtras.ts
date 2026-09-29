import { DreamTrip, MoodboardItem, PassportStamp, TravelStats } from '../types/travel';
import { photos } from './photos';

export const sampleDreamTrips: DreamTrip[] = [
  {
    id: 'dream-1', destination: 'Japan', country: 'Japan', flag: '🇯🇵',
    photos: [photos.japan, photos.tokyo, photos.kyoto, photos.sakura],
    estimatedBudget: '€4,200', bestSeason: 'Spring (March-April)',
    priority: 'Must Visit', placesToVisit: ['Tokyo', 'Kyoto', 'Osaka', 'Mount Fuji', 'Nara'],
    restaurants: ['Ichiran Ramen', 'Tsukiji Market', 'Gion Kaiseki'],
    activities: ['Sakura viewing', 'Fushimi Inari hike', 'Shinkansen ride', 'Onsen bath'],
    status: 'Planning', notes: 'Cherry blossom bloom timing is key! Aim for late March.',
    targetYear: '2027',
  },
  {
    id: 'dream-2', destination: 'New Zealand', country: 'New Zealand', flag: '🇳🇿',
    photos: [photos.hiking, photos.sunset],
    estimatedBudget: '€5,800', bestSeason: 'Dec - Feb',
    priority: 'High', placesToVisit: ['Queenstown', 'Milford Sound', 'Rotorua', 'Hobbiton'],
    restaurants: ['Fergburger Queenstown', 'Depot Auckland'],
    activities: ['Milford Sound cruise', 'Tongariro Alpine Crossing', 'Stargazing in Tekapo'],
    status: 'Dream Trip', notes: 'Rent a campervan and explore both North and South islands.',
    targetYear: '2028',
  },
  {
    id: 'dream-3', destination: 'Morocco', country: 'Morocco', flag: '🇲🇦',
    photos: [photos.sunset, photos.food],
    estimatedBudget: '€1,800', bestSeason: 'Oct - Nov',
    priority: 'Someday', placesToVisit: ['Marrakech', 'Chefchaouen', 'Sahara Desert', 'Fes'],
    restaurants: ['Riad cooking class', 'Jemaa el-Fnaa street food'],
    activities: ['Desert camp under stars', 'Blue city walk', 'Souk spices'],
    status: 'Dream Trip', notes: 'Dreaming of the warm colors, mint tea, and desert nights.',
    targetYear: '2027',
  },
];

export const sampleMoodboard: MoodboardItem[] = [
  { id: 'mb-1', tripId: 'trip-italy-2026', type: 'photo', title: 'Tuscan Sun', value: photos.florence, subtitle: 'Rolling golden hills' },
  { id: 'mb-2', tripId: 'trip-italy-2026', type: 'color', title: 'Terracotta', value: '#c65d3e', subtitle: 'Roman brickwork' },
  { id: 'mb-3', tripId: 'trip-italy-2026', type: 'color', title: 'Olive Branch', value: '#6b7d2c', subtitle: 'Tuscan olive groves' },
  { id: 'mb-4', tripId: 'trip-italy-2026', type: 'food', title: 'Handmade Pasta', value: photos.italyFood, subtitle: 'Trastevere carbonara' },
  { id: 'mb-5', tripId: 'trip-italy-2026', type: 'quote', title: '', value: '"La dolce vita" — living sweetly', subtitle: 'Trip philosophy' },
  { id: 'mb-6', tripId: 'trip-italy-2026', type: 'music', title: '🎵 Italian Summer', value: 'Dean Martin, Mina, Paolo Conte', subtitle: 'Playlist for road trips' },
  { id: 'mb-7', tripId: 'trip-italy-2026', type: 'architecture', title: 'Arches of Rome', value: photos.colosseum, subtitle: 'Colosseum shadows' },
  { id: 'mb-8', tripId: 'trip-italy-2026', type: 'color', title: 'Adriatic Teal', value: '#1098ad', subtitle: 'Water in Venice' },
];

export const samplePassportStamps: PassportStamp[] = [
  { id: 'ps-1', country: 'Italy', flag: '🇮🇹', city: 'Rome', date: 'May 2026', tripTitle: 'Italy 2026', shape: 'round', color: '#b94a48' },
  { id: 'ps-2', country: 'France', flag: '🇫🇷', city: 'Paris', date: 'Jun 2026', tripTitle: 'Weekend in Paris', shape: 'rect', color: '#1971c2' },
  { id: 'ps-3', country: 'Japan', flag: '🇯🇵', city: 'Tokyo', date: 'Apr 2025', tripTitle: 'Japan Adventure', shape: 'oval', color: '#c2255c' },
  { id: 'ps-4', country: 'Austria', flag: '🇦🇹', city: 'Salzburg', date: 'Dec 2024', tripTitle: 'Weekend in Salzburg', shape: 'round', color: '#2b8a3e' },
  { id: 'ps-5', country: 'France', flag: '🇫🇷', city: 'Nice', date: 'Jul 2026', tripTitle: 'South of France', shape: 'rect', color: '#e67700' },
];

export const sampleStats: TravelStats = {
  totalDistanceKm: 5450,
  countriesCount: 4,
  citiesCount: 17,
  tripsCount: 5,
  flightsCount: 7,
  trainCount: 6,
  hotelsCount: 9,
  restaurantsCount: 34,
  photosCount: 847,
  travelDaysCount: 47,
};
