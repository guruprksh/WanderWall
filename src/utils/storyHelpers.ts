import { Trip } from '../types/travel';
import { StoryPage, WritingStyle, StoryVoice } from '../types/story';

export const getStoryIntroText = (
  trip: Trip,
  writingStyle: WritingStyle,
  voice: StoryVoice
): string => {
  const days = trip.cities.length > 2 ? 'Seven days' : 'Five unforgettable days';
  const cityCount = trip.cities.length;
  const citiesStr = trip.cities.join(', ');

  if (writingStyle === 'funny') {
    return voice === 'first_person'
      ? `${days}, ${cityCount} cities, entirely too much espresso, and approximately 85,000 steps across cobblestones. We came for the architecture, stayed for the pasta, and somehow only got mildly lost.`
      : `${days} of delightful chaotic discovery across ${citiesStr}. A whirlwind of missed turns that turned into secret squares, impromptu gelatos, and luggage dragged courageously over bridges.`;
  }
  if (writingStyle === 'emotional') {
    return voice === 'first_person'
      ? `There is a rare stillness that comes with travelling somewhere you have long dreamed of. From our first morning in ${trip.cities[0] || trip.destination} to our last evening light, these pages hold the moments that changed us.`
      : `An intimate journey through the soul of ${trip.destination}. A celebration of slowing down, looking upward, and finding quiet poetry in timeless cities.`;
  }
  if (writingStyle === 'magazine') {
    return `Between morning fog and golden twilight, ${trip.destination} reveals itself not as a postcard, but as an enduring tapestry. Across ${citiesStr}, this expedition captured grand monuments and quiet courtyards alike.`;
  }
  if (writingStyle === 'minimal') {
    return `${days}. ${cityCount} cities. ${trip.distanceKm} kilometers. Here is what we found along the way.`;
  }
  return `${days}, ${cityCount} ancient cities, countless plates of regional food, and a surprising amount of walking. Here is our personal chronicle through the heart of ${trip.destination}.`;
};

export const regeneratePageContent = (
  page: StoryPage,
  action: 'rewrite' | 'change_photos' | 'change_layout' | 'shorter' | 'funnier' | 'personal',
  photoPool: string[]
): StoryPage => {
  const updated = JSON.parse(JSON.stringify(page)) as StoryPage;

  if (action === 'change_photos' && photoPool.length > 1) {
    const shuffled = [...photoPool].sort(() => 0.5 - Math.random());
    updated.photos = shuffled.slice(0, Math.max(1, page.photos.length));
  } else if (action === 'change_layout') {
    const variants = ['spread', 'grid3', 'polaroid_wall', 'film_strip', 'overlapping'];
    const curIdx = variants.indexOf(updated.layoutVariant || 'spread');
    updated.layoutVariant = variants[(curIdx + 1) % variants.length];
    if (updated.content.galleryLayout) {
      updated.content.galleryLayout = updated.layoutVariant as any;
    }
  } else if (action === 'shorter') {
    if (updated.content.introText) updated.content.introText = updated.content.introText.split('.')[0] + '.';
    if (updated.content.closingMessage) updated.content.closingMessage = updated.content.closingMessage.split('.')[0] + '.';
    if (updated.content.dayNotes) updated.content.dayNotes = updated.content.dayNotes.split('.')[0] + '.';
  } else if (action === 'funnier') {
    if (updated.content.introText) {
      updated.content.introText = `Rule number one of this journey: calories consumed while gazing at historical ruins do not count. We walked 18 miles a day and somehow gained three pounds of pure joy.`;
    }
    if (updated.content.dayNotes) {
      updated.content.dayNotes = `Got completely disoriented in the alleyways, refused to consult GPS for an hour out of pride, and ended up having the greatest meal of our lives.`;
    }
  } else if (action === 'personal') {
    if (updated.content.introText) {
      updated.content.introText = `I will remember the warmth of the early afternoon sun on my shoulders, the smell of roasted coffee drifting across the square, and how quiet the world felt right then.`;
    }
    if (updated.content.closingMessage) {
      updated.content.closingMessage = `It wasn't just the famous sights; it was the quiet minutes in between. Carrying this trip with me into all the days ahead.`;
    }
  } else if (action === 'rewrite') {
    if (updated.content.introText) {
      updated.content.introText = `A vibrant chronicle written between train stations, quiet stone cafes, and sunset terraces. Every turn unfolded another chapter worth keeping.`;
    }
    if (updated.content.closingMessage) {
      updated.content.closingMessage = `No journey ever truly ends. Its echoes stay in the recipes we try at home and the way we watch the evening sky.`;
    }
  }

  return updated;
};
