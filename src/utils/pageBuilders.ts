import { Trip, DiaryEntry } from '../types/travel';
import { StoryPage, StoryStyle, RouteStop, DayScheduleItem, BestMomentItem } from '../types/story';

export const buildStoryPages = (
  trip: Trip,
  style: StoryStyle,
  introText: string,
  diaryEntries: DiaryEntry[],
  uniquePhotos: string[],
  _voice: string,
  customTitle?: string
): StoryPage[] => {
  const pages: StoryPage[] = [];
  let pNum = 1;
  const countryName = trip.countries?.[0] || trip.destination;

  // 1. Cover
  pages.push({
    id: `p-${pNum}`, pageNumber: pNum++, type: 'cover',
    title: customTitle || trip.title,
    subtitle: `${trip.destination} • ${trip.dates.start} - ${trip.dates.end}`,
    content: { introText: trip.description, additionalText: trip.cities.join(' · ').toUpperCase() },
    photos: [trip.coverPhoto || uniquePhotos[0] || ''],
    layoutVariant: style === 'magazine' ? 'editorial_hero' : style === 'polaroid' ? 'polaroid_pile' : 'cinematic_full',
  });

  // 2. Intro
  pages.push({
    id: `p-${pNum}`, pageNumber: pNum++, type: 'intro',
    title: 'The Journey Begins', subtitle: `Dispatches from ${trip.destination}`,
    content: { introText, quote: `“To travel is to discover that everyone is wrong about other countries.”`, quoteAuthor: 'Aldous Huxley' },
    photos: uniquePhotos.slice(0, 2),
    layoutVariant: 'text_with_side_photo',
  });

  // 3. Route
  const stops: RouteStop[] = trip.cities.map((city, idx) => ({
    city, country: countryName, dates: `Day 0${idx * 2 + 1} – 0${idx * 2 + 2}`,
    transport: idx === 0 ? 'High-speed Rail' : 'Scenic Express',
    distanceKm: Math.round(trip.distanceKm / (trip.cities.length || 1)),
    highlight: idx === 0 ? 'Historic Center' : idx === 1 ? 'Art Museums' : 'Canals & Islands',
  }));
  pages.push({
    id: `p-${pNum}`, pageNumber: pNum++, type: 'route',
    title: 'The Travel Route', subtitle: `${stops.length} Chapters • ${trip.distanceKm} km traversed`,
    content: { routeStops: stops }, photos: uniquePhotos.slice(1, 3),
  });

  // 4. Days
  [1, 2, 3].forEach((dayNum) => {
    const cityName = trip.cities[(dayNum - 1) % trip.cities.length] || trip.destination;
    const sched: DayScheduleItem[] = [
      { time: '08:30', place: `${cityName} Morning Walk`, activity: 'Fresh espresso & warm cornetto in the piazza', icon: '☕' },
      { time: '10:30', place: dayNum === 1 ? 'Historic Landmark' : 'Art Gallery', activity: 'Exploring winding stone alleyways & historic architecture', icon: '🏛️' },
      { time: '13:15', place: 'Osteria Rustica', activity: 'Handmade local pasta and chilled house wine', icon: '🍝' },
      { time: '16:00', place: 'Piazza Belvedere', activity: 'People watching & afternoon light', icon: '📸' },
      { time: '19:45', place: 'Trattoria Terrace', activity: 'Candlelight dinner under grape arbors', icon: '🍷' },
    ];
    pages.push({
      id: `p-${pNum}`, pageNumber: pNum++, type: 'day',
      title: `Day 0${dayNum}`, subtitle: `${cityName} • ${countryName}`,
      content: {
        dayNumber: dayNum, dayCity: cityName, dayDate: `Day ${dayNum} of the journey`, daySchedule: sched,
        dayNotes: diaryEntries[dayNum - 1]?.text || `Wandering through ${cityName} feeling completely untethered from regular routines. The afternoon light touches ancient stone beautifully.`,
      },
      photos: [uniquePhotos[(dayNum * 2) % uniquePhotos.length] || uniquePhotos[0], uniquePhotos[(dayNum * 2 + 1) % uniquePhotos.length] || uniquePhotos[0]],
      layoutVariant: 'day_split_columns',
    });
  });

  // 5. Best moments
  const moments: BestMomentItem[] = [
    { category: 'BEST VIEW', title: 'Golden Hour Panorama', place: trip.cities[1] || trip.destination, description: 'Twilight settling across tiled rooftops as bells rang throughout the valley.', photo: uniquePhotos[2 % uniquePhotos.length], rating: 5 },
    { category: 'BEST MEAL', title: 'Truffle Pasta by Candlelight', place: trip.cities[0] || trip.destination, description: 'Warm focaccia straight from the wood oven with fresh virgin olive oil.', photo: uniquePhotos[3 % uniquePhotos.length], rating: 5 },
    { category: 'UNEXPECTED MOMENT', title: 'Lost in the Cobblestones', place: trip.cities[2] || trip.destination, description: 'A rain shower forced us under a café awning where an accordion player played.', photo: uniquePhotos[4 % uniquePhotos.length], rating: 5 },
    { category: 'FAVOURITE SPOT', title: 'Hidden Quiet Courtyard', place: trip.destination, description: 'A stone fountain, sleepy orange cats, and old wisteria vines.', photo: uniquePhotos[1 % uniquePhotos.length], rating: 5 },
  ];
  pages.push({
    id: `p-${pNum}`, pageNumber: pNum++, type: 'moments',
    title: 'The Best Moments', subtitle: 'Curated highlights & indelible memories',
    content: { bestMoments: moments }, photos: uniquePhotos.slice(0, 4),
  });

  return pages;
};
