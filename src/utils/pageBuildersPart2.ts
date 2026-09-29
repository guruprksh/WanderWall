import { Trip } from '../types/travel';
import { StoryPage, StoryStyle, FoodStoryItem, PeopleMemoryItem, HiddenGemItem } from '../types/story';

export const buildSecondHalfPages = (
  trip: Trip,
  style: StoryStyle,
  uniquePhotos: string[],
  voice: string,
  startPageNum: number
): StoryPage[] => {
  const pages: StoryPage[] = [];
  let pNum = startPageNum;

  // 6. Food
  const foods: FoodStoryItem[] = [
    { restaurant: 'Trattoria Da Enzo', city: trip.cities[0] || trip.destination, dish: 'Rigatoni alla Carbonara & Guanciale', rating: 5, photo: uniquePhotos[3 % uniquePhotos.length] || uniquePhotos[0], note: 'Crispy guanciale with pecorino romano so sharp it made us pause.' },
    { restaurant: 'Caffè Gilli', city: trip.cities[1] || trip.destination, dish: 'Double Espresso & Pistachio Cannolo', rating: 5, photo: uniquePhotos[1 % uniquePhotos.length] || uniquePhotos[0], note: 'Standing at the polished brass bar watching the morning rush.' },
    { restaurant: 'Osteria Al Squero', city: trip.cities[2] || trip.destination, dish: 'Baccalà Mantecato Cicchetti & Spritz', rating: 4.9, photo: uniquePhotos[0], note: 'Eaten sitting along the canal wall with legs dangling toward the water.' },
  ];
  pages.push({
    id: `p-${pNum}`, pageNumber: pNum++, type: 'food',
    title: 'The Culinary Chronicle', subtitle: 'From morning espresso to midnight gelato',
    content: { foodItems: foods }, photos: [uniquePhotos[2 % uniquePhotos.length], uniquePhotos[3 % uniquePhotos.length]],
  });

  // 7. People
  const people: PeopleMemoryItem[] = [
    { photo: uniquePhotos[0], caption: '“First evening of the voyage. Wide-eyed and endlessly happy.”', who: 'Travel Companions', location: `${trip.destination} arrival` },
    { photo: uniquePhotos[1 % uniquePhotos.length], caption: '“Everyone was exhausted here after 22,000 steps, but wouldn’t admit it.”', who: 'The Crew', location: 'Midday rest stop' },
    { photo: uniquePhotos[2 % uniquePhotos.length], caption: '“Probably the single finest evening of the entire journey.”', who: 'Shared Sunset', location: 'Overlook terrace' },
  ];
  pages.push({
    id: `p-${pNum}`, pageNumber: pNum++, type: 'people',
    title: 'People & Shared Days', subtitle: 'Laughter, missed turns, and warm toasts',
    content: { peopleMemories: people }, photos: uniquePhotos.slice(0, 3),
  });

  // 8. Gallery
  pages.push({
    id: `p-${pNum}`, pageNumber: pNum++, type: 'gallery',
    title: 'Visual Portfolio', subtitle: 'Light, textures, and geometry',
    content: {
      galleryLayout: style === 'polaroid' ? 'polaroid_wall' : style === 'cinematic' ? 'spread' : 'grid3',
      additionalText: 'Moments captured between the planned destinations.',
    },
    photos: uniquePhotos.slice(0, 6),
  });

  // 9. Hidden Gems
  const gems: HiddenGemItem[] = [
    { name: 'Giardino delle Rose', location: trip.cities[1] || trip.destination, whySpecial: 'Blooming rose varieties overlooking the historic skyline with few tourists.', tip: 'Visit 45 minutes prior to sunset.', photo: uniquePhotos[1 % uniquePhotos.length] },
    { name: 'Libreria dell’Arco', location: trip.cities[0] || trip.destination, whySpecial: 'Antique bookstore with volumes stacked to the beams and secret courtyard.', tip: 'Ask the shopkeeper for the back garden.', photo: uniquePhotos[2 % uniquePhotos.length] },
  ];
  pages.push({
    id: `p-${pNum}`, pageNumber: pNum++, type: 'gems',
    title: 'Secret Corners & Hidden Gems', subtitle: 'Off the beaten path',
    content: { hiddenGems: gems }, photos: uniquePhotos.slice(1, 3),
  });

  // 10. Stats
  pages.push({
    id: `p-${pNum}`, pageNumber: pNum++, type: 'stats',
    title: 'Trip by the Numbers', subtitle: 'The metrics behind the adventure',
    content: {
      statsData: {
        days: 7, cities: trip.cities.length, distanceKm: trip.distanceKm,
        placesCount: 38, photosCount: 246, restaurantsCount: 14,
        highlightPhrase: '100% Worth every cobblestone step',
      },
    },
    photos: [uniquePhotos[0]],
  });

  // 11. Closing
  pages.push({
    id: `p-${pNum}`, pageNumber: pNum++, type: 'closing',
    title: `Until Next Time, ${trip.destination}.`, subtitle: `${trip.dates.end} • End of Chapter`,
    content: {
      closingMessage: voice === 'first_person'
        ? `We left with dusty shoes, full camera rolls, and hearts softened by ${trip.destination}. The world is vast, but this slice of it will always belong in our memory.`
        : `Every journey concludes, but its colors linger long after the suitcase is unpacked. ${trip.destination} gave everything it promised and countless small wonders besides.`,
      favouriteMemory: 'Walking through stone alleyways after sunset, listening to distant laughter and the hum of Vespas.',
      closingSubtext: 'Safe travels, always.',
    },
    photos: [trip.coverPhoto || uniquePhotos[0]],
  });

  return pages;
};
