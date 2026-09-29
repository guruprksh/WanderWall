import { Trip } from '../types/travel';
import { StoryPage, TravelStory } from '../types/story';

export const generateAnnualTravelStory = (
  year: number,
  trips: Trip[],
  uniquePhotos: string[]
): TravelStory => {
  return generateCollectionTravelStory({
    title: `MY ${year} IN TRAVEL`,
    subtitle: `${trips.length} Journeys across ${Array.from(new Set(trips.flatMap((trip) => trip.countries || [trip.destination]))).length} Countries`,
    trips,
    coverPhoto: uniquePhotos[0],
    year,
  });
};

export interface CollectionStoryOptions {
  title: string;
  subtitle?: string;
  trips: Trip[];
  coverPhoto?: string;
  year?: number;
}

export const generateCollectionTravelStory = ({
  title,
  subtitle,
  trips,
  coverPhoto,
  year,
}: CollectionStoryOptions): TravelStory => {
  const uniquePhotos = Array.from(new Set(trips.flatMap((trip) => trip.photos?.length ? trip.photos : [trip.coverPhoto])));
  const collectionYear = year || trips[0]?.year || new Date().getFullYear();
  const totalKm = trips.reduce((acc, t) => acc + (t.distanceKm || 0), 0);
  const countries = Array.from(new Set(trips.flatMap((t) => t.countries || [t.destination])));
  const allCities = trips.flatMap((t) => t.cities);
  const coverImg = coverPhoto || trips[0]?.coverPhoto || uniquePhotos[0] || '';

  const pages: StoryPage[] = [
    {
      id: 'collection-cover',
      pageNumber: 1,
      type: 'cover',
      title,
      subtitle: subtitle || `${trips.length} Journeys • ${countries.length} Countries • ${allCities.length} Cities`,
      content: {
        introText: `A personal collection of journeys, places, and moments from ${collectionYear}.`,
        additionalText: countries.join(' · ').toUpperCase(),
      },
      photos: [coverImg],
      layoutVariant: 'cinematic_full',
    },
    {
      id: 'collection-stats',
      pageNumber: 2,
      type: 'stats',
      title: `${collectionYear} By The Numbers`,
      subtitle: 'The full record of your planetary mileage',
      content: {
        statsData: {
          days: trips.length * 7,
          cities: allCities.length,
          distanceKm: totalKm,
          placesCount: allCities.length * 8,
          photosCount: trips.length * 150,
          restaurantsCount: trips.length * 12,
          highlightPhrase: `${totalKm.toLocaleString()} KM traversed`,
        },
      },
      photos: uniquePhotos.slice(0, 2),
    },
    {
      id: 'collection-trips',
      pageNumber: 3,
      type: 'route',
      title: 'Your Collection Route',
      subtitle: 'Chronological expedition log',
      content: {
        routeStops: trips.map((t) => ({
          city: t.destination,
          country: t.countries?.[0] || t.destination,
          dates: `${t.dates.start}`,
          distanceKm: t.distanceKm,
          highlight: t.title,
        })),
      },
      photos: uniquePhotos.slice(2, 4),
    },
    {
      id: 'collection-moments',
      pageNumber: 4,
      type: 'moments',
      title: 'Highlights from the Road',
      subtitle: 'Unforgettable moments of the year',
      content: {
        bestMoments: [
          {
            category: 'MOST SCENIC',
            title: 'Panoramic Overlook',
            place: trips[0]?.destination || 'Europe',
            description: 'The golden hour that defined the summer travels.',
            photo: uniquePhotos[0],
            rating: 5,
          },
          {
            category: 'BEST MEAL OF THE YEAR',
            title: 'Unforgettable Dinner',
            place: trips[1]?.destination || trips[0]?.destination || 'Italy',
            description: 'Handmade pasta and regional wine shared with friends.',
            photo: uniquePhotos[1 % uniquePhotos.length],
            rating: 5,
          },
        ],
      },
      photos: uniquePhotos.slice(0, 4),
    },
    {
      id: 'collection-gallery',
      pageNumber: 5,
      type: 'gallery',
      title: 'Visual Retrospective',
      subtitle: 'A mosaic of places and horizons',
      content: {
        galleryLayout: 'polaroid_wall',
      },
      photos: uniquePhotos.slice(0, 6),
    },
    {
      id: 'collection-closing',
      pageNumber: 6,
      type: 'closing',
      title: 'THE JOURNEY, KEPT',
      subtitle: 'Here’s to the next horizon',
      content: {
        closingMessage: `${trips.length} journeys and a lifetime of shared moments across ${countries.join(', ')}. Until the next departure gate.`,
        favouriteMemory: `Every sunset watched from a new corner of the world.`,
      },
      photos: [trips[trips.length - 1]?.coverPhoto || uniquePhotos[0]],
    },
  ];

  return {
    id: `story-collection-${Date.now()}`,
    isYearly: Boolean(year),
    yearlyYear: year,
    title,
    subtitle: subtitle || `${trips.length} Journeys across ${countries.length} Countries`,
    destination: countries.join(', '),
    dates: trips.length === 1 ? `${trips[0].dates.start} — ${trips[0].dates.end}` : `${trips.length} selected journeys`,
    year: collectionYear,
    coverPhoto: coverImg,
    style: 'magazine',
    writingSettings: {
      style: 'magazine',
      length: 'medium',
      voice: 'first_person',
    },
    versionType: 'full',
    pages,
    fontFamily: 'serif',
    colorTheme: 'gold',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
};
