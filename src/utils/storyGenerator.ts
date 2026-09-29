import { Trip, TimelineEvent, DiaryEntry, CanvasItem } from '../types/travel';
import {
  TravelStory,
  StoryStyle,
  WritingStyle,
  StoryLength,
  StoryVoice,
  StoryVersionType,
} from '../types/story';
import { getStoryIntroText } from './storyHelpers';
import { buildStoryPages } from './pageBuilders';
import { buildSecondHalfPages } from './pageBuildersPart2';

export interface GeneratorOptions {
  trip: Trip;
  timelineEvents: TimelineEvent[];
  diaryEntries: DiaryEntry[];
  canvasItems: CanvasItem[];
  style: StoryStyle;
  writingStyle: WritingStyle;
  length: StoryLength;
  voice: StoryVoice;
  versionType?: StoryVersionType;
  customTitle?: string;
}

export const generateTripStory = (opts: GeneratorOptions): TravelStory => {
  const { trip, diaryEntries, canvasItems, style, writingStyle, length, voice, versionType = 'full' } = opts;

  // Extract photos
  const tripPhotos = trip.photos && trip.photos.length > 0 ? trip.photos : [trip.coverPhoto];
  const photoPool = [...tripPhotos];
  canvasItems.forEach((ci) => {
    if (ci.type === 'photo' && typeof ci.content === 'object' && ci.content !== null && 'url' in ci.content) {
      photoPool.push((ci.content as { url: string }).url);
    }
  });
  const uniquePhotos = Array.from(new Set(photoPool));

  const introText = getStoryIntroText(trip, writingStyle, voice);
  const part1 = buildStoryPages(trip, style, introText, diaryEntries, uniquePhotos, voice, opts.customTitle);
  const part2 = buildSecondHalfPages(trip, style, uniquePhotos, voice, part1.length + 1);
  const allPages = [...part1, ...part2];

  // Version filtering
  let finalPages = allPages;
  if (versionType === 'instagram') {
    finalPages = [
      allPages.find((p) => p.type === 'cover')!,
      allPages.find((p) => p.type === 'route')!,
      allPages.find((p) => p.type === 'day')!,
      allPages.find((p) => p.type === 'food')!,
      allPages.find((p) => p.type === 'moments')!,
      allPages.find((p) => p.type === 'people')!,
      allPages.find((p) => p.type === 'stats')!,
      allPages.find((p) => p.type === 'closing')!,
    ].filter(Boolean);
    finalPages.forEach((p, i) => { p.pageNumber = i + 1; });
  } else if (versionType === 'short') {
    finalPages = [
      allPages.find((p) => p.type === 'cover')!,
      allPages.find((p) => p.type === 'intro')!,
      allPages.find((p) => p.type === 'moments')!,
      allPages.find((p) => p.type === 'gallery')!,
      allPages.find((p) => p.type === 'closing')!,
    ].filter(Boolean);
    finalPages.forEach((p, i) => { p.pageNumber = i + 1; });
  }

  return {
    id: `story-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    tripId: trip.id,
    title: opts.customTitle || `${trip.destination}: The Story`,
    subtitle: `${trip.cities.join(' · ')} (${trip.year})`,
    destination: trip.destination,
    dates: `${trip.dates.start} — ${trip.dates.end}`,
    year: trip.year,
    coverPhoto: trip.coverPhoto,
    style,
    writingSettings: { style: writingStyle, length, voice },
    versionType,
    pages: finalPages,
    fontFamily: style === 'diary' ? 'handwriting' : style === 'adventure' ? 'mono' : 'serif',
    colorTheme: style === 'luxury' ? 'monochrome' : style === 'adventure' ? 'olive' : 'terracotta',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
};

export { regeneratePageContent } from './storyHelpers';
export { generateAnnualTravelStory } from './annualStoryHelper';
