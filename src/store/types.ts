import { Trip, CanvasItem, TimelineDay, DiaryEntry, DreamTrip, MoodboardItem, PassportStamp, TravelStats, ScrapbookMode } from '../types/travel';
import { TravelStory, StoryPage, StoryVersionType } from '../types/story';

export interface TravelStoreState {
  trips: Trip[];
  activeTripId: string | null;
  canvasItems: CanvasItem[];
  timelineDays: TimelineDay[];
  diaryEntries: DiaryEntry[];
  dreamTrips: DreamTrip[];
  moodboardItems: MoodboardItem[];
  passportStamps: PassportStamp[];
  stats: TravelStats;
  scrapbookMode: ScrapbookMode;
  stories: TravelStory[];
  activeStoryId: string | null;
  setScrapbookMode: (mode: ScrapbookMode) => void;
  setActiveTripId: (id: string | null) => void;
  setActiveStoryId: (id: string | null) => void;
  addTrip: (trip: Omit<Trip, 'id' | 'createdAt'>) => string;
  updateTrip: (id: string, updates: Partial<Trip>) => void;
  deleteTrip: (id: string) => void;
  addCanvasItem: (item: Omit<CanvasItem, 'id' | 'zIndex'>) => void;
  updateCanvasItem: (id: string, updates: Partial<CanvasItem>) => void;
  deleteCanvasItem: (id: string) => void;
  duplicateCanvasItem: (id: string) => void;
  bringToFront: (id: string) => void;
  sendToBack: (id: string) => void;
  addTimelineDay: (day: Omit<TimelineDay, 'id'>) => void;
  addDiaryEntry: (entry: Omit<DiaryEntry, 'id'>) => void;
  addDreamTrip: (trip: Omit<DreamTrip, 'id'>) => void;
  updateDreamTrip: (id: string, updates: Partial<DreamTrip>) => void;
  deleteDreamTrip: (id: string) => void;
  addMoodboardItem: (item: Omit<MoodboardItem, 'id'>) => void;
  deleteMoodboardItem: (id: string) => void;
  addPassportStamp: (stamp: Omit<PassportStamp, 'id'>) => void;
  addStory: (story: TravelStory) => string;
  updateStory: (id: string, updates: Partial<TravelStory>) => void;
  deleteStory: (id: string) => void;
  updateStoryPage: (storyId: string, pageId: string, updates: Partial<StoryPage>) => void;
  reorderStoryPages: (storyId: string, newPages: StoryPage[]) => void;
  deleteStoryPage: (storyId: string, pageId: string) => void;
  addStoryPage: (storyId: string, page: StoryPage, insertIndex?: number) => void;
  duplicateStoryVersion: (storyId: string, versionType: StoryVersionType, newTitle: string) => string;
  resetToSampleData: () => void;
}

