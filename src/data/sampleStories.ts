import { TravelStory } from '../types/story';
import { photos } from './photos';

const italyStoryPages = [
  {
    id: 'p-1', pageNumber: 1, type: 'cover' as const,
    title: 'A Week in Italy',
    subtitle: '12 – 24 May 2026 • ROME · FLORENCE · VENICE',
    content: { introText: 'Seven days across the Italian peninsula.', additionalText: 'ROME · FLORENCE · VENICE' },
    photos: [photos.rome], layoutVariant: 'editorial_hero',
  },
  {
    id: 'p-2', pageNumber: 2, type: 'intro' as const,
    title: 'The Journey Begins', subtitle: 'Dispatches from Italy',
    content: {
      introText: 'Seven days, three cities, countless plates of pasta, and a surprising amount of walking.',
      quote: '"To travel is to discover that everyone is wrong about other countries."', quoteAuthor: 'Aldous Huxley',
    },
    photos: [photos.colosseum, photos.italyFood], layoutVariant: 'text_with_side_photo',
  },
  {
    id: 'p-3', pageNumber: 3, type: 'route' as const,
    title: 'The Route', subtitle: '3 Cities • 1,280 KM',
    content: {
      routeStops: [
        { city: 'Rome', country: 'Italy', dates: '12–15 May', transport: 'Frecciarossa', distanceKm: 420, highlight: 'Colosseum & Trastevere' },
        { city: 'Florence', country: 'Italy', dates: '15–19 May', transport: 'Regional Rail', distanceKm: 280, highlight: 'Duomo & Tuscan Sunset' },
        { city: 'Venice', country: 'Italy', dates: '19–24 May', transport: 'Water Taxi', distanceKm: 580, highlight: 'Grand Canal & Cicchetti' },
      ],
    },
    photos: [photos.florence, photos.venice],
  },
  {
    id: 'p-4', pageNumber: 4, type: 'day' as const,
    title: 'Day 01 · Rome', subtitle: 'The Eternal City',
    content: {
      dayNumber: 1, dayCity: 'Rome', dayDate: '12 May 2026',
      daySchedule: [
        { time: '08:30', place: 'Piazza Navona', activity: 'Morning espresso & cornetto', icon: '☕' },
        { time: '10:00', place: 'Colosseum', activity: 'Walking ancient stones under sun', icon: '🏛️' },
        { time: '13:20', place: 'Trattoria Da Enzo', activity: 'Carbonara with guanciale', icon: '🍝' },
        { time: '16:00', place: 'Pantheon', activity: 'Sunbeam piercing the oculus', icon: '📸' },
        { time: '19:30', place: 'Trastevere', activity: 'Spritz and accordion music', icon: '🍷' },
      ],
      dayNotes: 'First day in Rome. The sheer scale of history leaves you breathless. We walked 16 kilometers and slept with the window open.',
    },
    photos: [photos.rome, photos.colosseum], layoutVariant: 'day_split_columns',
  },
  {
    id: 'p-5', pageNumber: 5, type: 'moments' as const,
    title: 'The Best Moments', subtitle: 'Highlights & magic',
    content: {
      bestMoments: [
        { category: 'BEST VIEW', title: 'Sunset from Piazzale Michelangelo', place: 'Florence', description: 'Golden sun melting behind the Ponte Vecchio.', photo: photos.florence, rating: 5 },
        { category: 'BEST MEAL', title: 'Carbonara in Rome', place: 'Trastevere', description: 'Silky egg yolk and crispy guanciale.', photo: photos.italyFood, rating: 5 },
        { category: 'UNEXPECTED', title: 'Getting Lost in Florence', place: 'Oltrarno', description: 'Finding a leather craftsman who told stories for an hour.', photo: photos.florence, rating: 5 },
        { category: 'FAVOURITE SPOT', title: 'Café near the Duomo', place: 'Florence', description: 'Tiny tables, local newspapers, and one-euro espresso.', photo: photos.coffee, rating: 5 },
      ],
    },
    photos: [photos.florence, photos.italyFood, photos.coffee, photos.venice],
  },
  {
    id: 'p-6', pageNumber: 6, type: 'food' as const,
    title: 'The Food Chapter', subtitle: 'A love letter to gastronomy',
    content: {
      foodItems: [
        { restaurant: 'Trattoria Da Enzo', city: 'Rome', dish: 'Tonnarelli Cacio e Pepe', rating: 5, photo: photos.italyFood, note: 'Simple, creamy perfection.' },
        { restaurant: 'All’Antico Vinaio', city: 'Florence', dish: 'La Favolosa Panino', rating: 4.9, photo: photos.food, note: 'Warm schiacciata with truffle cream.' },
      ],
    },
    photos: [photos.italyFood, photos.food],
  },
  {
    id: 'p-7', pageNumber: 7, type: 'people' as const,
    title: 'People & Memories', subtitle: 'The faces behind the adventure',
    content: {
      peopleMemories: [
        { photo: photos.sunset, caption: '“First evening in Rome together. Jetlagged but captivated.”', who: 'Travel Companions', location: 'Spanish Steps' },
        { photo: photos.florence, caption: '“Everyone was exhausted after 24,000 steps, but still smiling.”', who: 'The Crew', location: 'Boboli Gardens' },
      ],
    },
    photos: [photos.sunset, photos.florence],
  },
  {
    id: 'p-8', pageNumber: 8, type: 'gallery' as const,
    title: 'Photo Portfolio', subtitle: 'Light, shade, and colors',
    content: { galleryLayout: 'polaroid_wall' as const, additionalText: 'Visual fragments collected between footsteps.' },
    photos: [photos.rome, photos.florence, photos.venice, photos.colosseum, photos.sunset, photos.italyFood],
  },
  {
    id: 'p-9', pageNumber: 9, type: 'gems' as const,
    title: 'Hidden Gems', subtitle: 'Treasures off the beaten track',
    content: {
      hiddenGems: [
        { name: 'Giardino delle Rose', location: 'Florence', whySpecial: 'Tranquil terrace with roses overlooking the city.', tip: 'Bring fresh cherries and watch the sunset.', photo: photos.florence },
        { name: 'Acqua Alta Bookshop', location: 'Venice', whySpecial: 'Books inside vintage gondolas and bathtubs with cats.', tip: 'Climb the recycled book staircase.', photo: photos.venice },
      ],
    },
    photos: [photos.florence, photos.venice],
  },
  {
    id: 'p-10', pageNumber: 10, type: 'stats' as const,
    title: 'Travel Statistics', subtitle: 'The Italian journey in numbers',
    content: {
      statsData: { days: 7, cities: 3, distanceKm: 2840, placesCount: 47, photosCount: 312, restaurantsCount: 18, highlightPhrase: '100% of pasta cravings satisfied' },
    },
    photos: [photos.rome],
  },
  {
    id: 'p-11', pageNumber: 11, type: 'closing' as const,
    title: 'Until Next Time, Italy.', subtitle: 'May 2026 • Chapter Concluded',
    content: {
      closingMessage: 'We left Italy with dusty sneakers, expanded waistlines, and minds indelibly imprinted with warm ochre walls.',
      favouriteMemory: 'Walking through Florence after sunset, listening to distant laughter and the sound of the river.',
      closingSubtext: 'The journey never truly ends—it just waits for the next ticket.',
    },
    photos: [photos.rome],
  },
];

export const sampleStories: TravelStory[] = [];

export const buildSampleStories = (): TravelStory[] => {
  return [
    {
      id: 'story-italy-magazine',
      tripId: 'trip-italy-2026',
      title: 'A Week in Italy',
      subtitle: 'Rome · Florence · Venice',
      destination: 'Italy',
      dates: '12 – 24 May 2026',
      year: 2026,
      coverPhoto: photos.rome,
      style: 'magazine',
      writingSettings: { style: 'magazine', length: 'medium', voice: 'first_person' },
      versionType: 'full',
      fontFamily: 'serif',
      colorTheme: 'terracotta',
      createdAt: '2026-05-25T10:00:00Z',
      updatedAt: '2026-05-25T10:00:00Z',
      pages: italyStoryPages,
    },
    {
      id: 'story-annual-2026',
      isYearly: true,
      yearlyYear: 2026,
      title: 'MY 2026 IN TRAVEL',
      subtitle: '4 Journeys across 4 Countries',
      destination: 'Italy · France · Austria · Spain',
      dates: 'Jan — Dec 2026',
      year: 2026,
      coverPhoto: photos.paris,
      style: 'luxury',
      writingSettings: { style: 'magazine', length: 'medium', voice: 'first_person' },
      versionType: 'full',
      fontFamily: 'serif',
      colorTheme: 'gold',
      createdAt: '2026-06-01T12:00:00Z',
      updatedAt: '2026-06-01T12:00:00Z',
      pages: [
        {
          id: 'ann-1', pageNumber: 1, type: 'cover',
          title: 'MY 2026 IN TRAVEL', subtitle: '4 Journeys • 4 Countries • 12 Cities',
          content: { introText: 'A retrospective of wanderlust, discovery, and roads taken throughout 2026.', additionalText: 'ITALY · FRANCE · AUSTRIA · SPAIN' },
          photos: [photos.paris], layoutVariant: 'cinematic_full',
        },
        {
          id: 'ann-2', pageNumber: 2, type: 'stats',
          title: '2026 By The Numbers', subtitle: 'Planetary mileage record',
          content: {
            statsData: { days: 34, cities: 12, distanceKm: 8940, placesCount: 92, photosCount: 1420, restaurantsCount: 56, highlightPhrase: '8,940 KM Traversed Across Europe' },
          },
          photos: [photos.florence, photos.eiffel],
        },
        {
          id: 'ann-3', pageNumber: 3, type: 'closing',
          title: '2026 IN ONE JOURNEY', subtitle: 'Here’s to the next horizon',
          content: {
            closingMessage: 'Twelve months of waking up in unfamiliar beds, learning how to say thank you in four languages, and finding beauty in both ancient monuments and midnight trains.',
            favouriteMemory: 'Every sunset watched from a new corner of the world.',
          },
          photos: [photos.sunset],
        },
      ],
    },
  ];
};
