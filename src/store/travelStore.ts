import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { TravelStoreState } from './types';
import { Trip, CanvasItem, TimelineDay, DiaryEntry, DreamTrip, MoodboardItem, PassportStamp } from '../types/travel';
import { TravelStory } from '../types/story';
import { DEFAULT_USER, UserProfile } from '../types/auth';
import { DriveBackupItem, DriveSyncState, WanderWallFullBackup } from '../types/drive';
import { sampleTrips, sampleCanvasItems, sampleTimeline, sampleDiary, sampleDreamTrips, sampleMoodboard, samplePassportStamps, sampleStats } from '../data/sampleData';
import { buildSampleStories } from '../data/sampleStories';
import { createBackupPayload, googleDriveCloudService, validateBackupPayload } from '../utils/driveBackupEngine';

const initialDriveBackups: DriveBackupItem[] = [
  {
    id: 'backup-demo-1',
    fileName: 'wanderwall_cloud_backup_current.json',
    timestamp: new Date(Date.now() - 1000 * 60 * 35).toISOString(),
    sizeKb: 142.5,
    tripsCount: 4,
    storiesCount: 4,
    canvasItemsCount: 16,
    driveFileId: 'gdrive_demo_initial_file',
    version: 'v4.4',
  },
];

const initialDriveSync: DriveSyncState = {
  isConnected: true,
  accountEmail: 'guru.traveler@gmail.com',
  accountName: 'Guru Prakash',
  lastSyncTimestamp: new Date(Date.now() - 1000 * 60 * 35).toISOString(),
  isSyncing: false,
  autoBackup: true,
  storageQuota: {
    usedMb: 4.2,
    totalMb: 15360,
  },
  backupList: initialDriveBackups,
};

export const useTravelStore = create<TravelStoreState>()(
  persist(
    (set, get) => ({
      trips: sampleTrips,
      activeTripId: 'trip-italy-2026',
      canvasItems: sampleCanvasItems,
      timelineDays: sampleTimeline,
      diaryEntries: sampleDiary,
      dreamTrips: sampleDreamTrips,
      moodboardItems: sampleMoodboard,
      passportStamps: samplePassportStamps,
      stats: sampleStats,
      scrapbookMode: 'physical',
      stories: buildSampleStories(),
      activeStoryId: 'story-italy-magazine',

      // User Profile & Authentication State
      user: DEFAULT_USER,
      isAuthenticated: true,

      login: (email: string, name?: string, avatar?: string) => {
        const userName = name || email.split('@')[0];
        const updatedUser: UserProfile = {
          ...(get().user || DEFAULT_USER),
          id: `user-${Date.now()}`,
          name: userName.charAt(0).toUpperCase() + userName.slice(1),
          email,
          avatar: avatar || (get().user?.avatar || DEFAULT_USER.avatar),
        };
        set({ user: updatedUser, isAuthenticated: true });
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
        });
      },

      updateUserProfile: (updates: Partial<UserProfile>) => {
        const current = get().user || DEFAULT_USER;
        set({ user: { ...current, ...updates } });
      },

      // Google Drive & Cloud Backup State
      driveSync: initialDriveSync,

      connectDrive: async (email: string) => {
        set((s) => ({ driveSync: { ...s.driveSync, isSyncing: true } }));
        try {
          const res = await googleDriveCloudService.connectAccount(email);
          set((s) => ({
            driveSync: {
              ...s.driveSync,
              isConnected: true,
              accountEmail: email,
              accountName: res.accountName,
              isSyncing: false,
            },
          }));
          return true;
        } catch {
          set((s) => ({ driveSync: { ...s.driveSync, isSyncing: false } }));
          return false;
        }
      },

      disconnectDrive: () => {
        set((s) => ({
          driveSync: {
            ...s.driveSync,
            isConnected: false,
            accountEmail: null,
            accountName: null,
            lastSyncTimestamp: null,
          },
        }));
      },

      triggerDriveBackup: async () => {
        const state = get();
        set((s) => ({ driveSync: { ...s.driveSync, isSyncing: true } }));
        try {
          const payload = createBackupPayload(state, state.driveSync.accountEmail || state.user?.email);
          const backupItem = await googleDriveCloudService.uploadToDrive(payload);
          set((s) => ({
            driveSync: {
              ...s.driveSync,
              isSyncing: false,
              lastSyncTimestamp: backupItem.timestamp,
              storageQuota: {
                ...s.driveSync.storageQuota,
                usedMb: Math.round((s.driveSync.storageQuota.usedMb + backupItem.sizeKb / 1024) * 10) / 10,
              },
              backupList: [backupItem, ...s.driveSync.backupList],
            },
          }));
          return backupItem;
        } catch (e) {
          console.error('Backup failed', e);
          set((s) => ({ driveSync: { ...s.driveSync, isSyncing: false } }));
          return null;
        }
      },

      restoreDriveBackup: async (driveFileId: string) => {
        set((s) => ({ driveSync: { ...s.driveSync, isSyncing: true } }));
        try {
          const payload = await googleDriveCloudService.fetchBackupFile(driveFileId);
          if (payload && validateBackupPayload(payload).valid) {
            get().importFullBackupPayload(payload);
            set((s) => ({ driveSync: { ...s.driveSync, isSyncing: false } }));
            return true;
          }
          if (driveFileId === 'gdrive_demo_initial_file') {
            get().resetToSampleData();
            set((s) => ({ driveSync: { ...s.driveSync, isSyncing: false } }));
            return true;
          }
          set((s) => ({ driveSync: { ...s.driveSync, isSyncing: false } }));
          return false;
        } catch (e) {
          console.error('Restore failed', e);
          set((s) => ({ driveSync: { ...s.driveSync, isSyncing: false } }));
          return false;
        }
      },

      deleteDriveBackup: async (driveFileId: string) => {
        await googleDriveCloudService.deleteBackupFromDrive(driveFileId);
        set((s) => ({
          driveSync: {
            ...s.driveSync,
            backupList: s.driveSync.backupList.filter((b) => b.driveFileId !== driveFileId),
          },
        }));
        return true;
      },

      toggleAutoBackup: (enabled: boolean) => {
        set((s) => ({
          driveSync: { ...s.driveSync, autoBackup: enabled },
        }));
      },

      importFullBackupPayload: (payload: WanderWallFullBackup) => {
        const validation = validateBackupPayload(payload);
        if (!validation.valid) return false;
        set({
          trips: payload.trips || [],
          canvasItems: payload.canvasItems || [],
          timelineDays: payload.timelineDays || [],
          diaryEntries: payload.diaryEntries || [],
          stories: payload.stories || [],
          passportStamps: payload.passportStamps || [],
          stats: payload.stats && Object.keys(payload.stats).length > 0 ? (payload.stats as any) : sampleStats,
          activeTripId: payload.trips?.[0]?.id || null,
          activeStoryId: payload.stories?.[0]?.id || null,
        });
        return true;
      },

      setScrapbookMode: (mode) => set({ scrapbookMode: mode }),
      setActiveTripId: (id) => set({ activeTripId: id }),
      setActiveStoryId: (id) => set({ activeStoryId: id }),

      addTrip: (tripData) => {
        const id = `trip-${Date.now()}`;
        const newTrip: Trip = { ...tripData, id, createdAt: new Date().toISOString() };
        set((s) => ({
          trips: [newTrip, ...s.trips],
          stats: { ...s.stats, tripsCount: s.stats.tripsCount + 1, totalDistanceKm: s.stats.totalDistanceKm + newTrip.distanceKm }
        }));
        return id;
      },

      updateTrip: (id, updates) =>
        set((s) => ({ trips: s.trips.map((t) => (t.id === id ? { ...t, ...updates } : t)) })),

      deleteTrip: (id) =>
        set((s) => ({
          trips: s.trips.filter((t) => t.id !== id),
          canvasItems: s.canvasItems.filter((i) => i.tripId !== id),
          timelineDays: s.timelineDays.filter((td) => td.tripId !== id),
          diaryEntries: s.diaryEntries.filter((de) => de.tripId !== id),
          moodboardItems: s.moodboardItems.filter((mi) => mi.tripId !== id),
        })),

      addCanvasItem: (itemData) => {
        const maxZ = Math.max(0, ...get().canvasItems.map((i) => i.zIndex || 0));
        const newItem: CanvasItem = {
          ...itemData,
          id: `item-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
          zIndex: maxZ + 1,
        };
        set((s) => ({ canvasItems: [...s.canvasItems, newItem] }));
      },

      updateCanvasItem: (id, updates) =>
        set((s) => ({
          canvasItems: s.canvasItems.map((i) => (i.id === id ? { ...i, ...updates } : i)),
        })),

      deleteCanvasItem: (id) =>
        set((s) => ({ canvasItems: s.canvasItems.filter((i) => i.id !== id) })),

      duplicateCanvasItem: (id) => {
        const item = get().canvasItems.find((i) => i.id === id);
        if (!item) return;
        const maxZ = Math.max(0, ...get().canvasItems.map((i) => i.zIndex || 0));
        const dup: CanvasItem = {
          ...item,
          id: `item-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
          x: item.x + 25,
          y: item.y + 25,
          rotation: (item.rotation || 0) + (Math.random() * 6 - 3),
          zIndex: maxZ + 1,
        };
        set((s) => ({ canvasItems: [...s.canvasItems, dup] }));
      },

      bringToFront: (id) => {
        const maxZ = Math.max(0, ...get().canvasItems.map((i) => i.zIndex || 0));
        set((s) => ({
          canvasItems: s.canvasItems.map((i) => (i.id === id ? { ...i, zIndex: maxZ + 1 } : i)),
        }));
      },

      sendToBack: (id) => {
        const minZ = Math.min(1, ...get().canvasItems.map((i) => i.zIndex || 1));
        set((s) => ({
          canvasItems: s.canvasItems.map((i) => (i.id === id ? { ...i, zIndex: Math.max(1, minZ - 1) } : i)),
        }));
      },

      addTimelineDay: (dayData) => {
        const newDay: TimelineDay = { ...dayData, id: `tl-${Date.now()}` };
        set((s) => ({ timelineDays: [...s.timelineDays, newDay] }));
      },

      addDiaryEntry: (entryData) => {
        const newEntry: DiaryEntry = { ...entryData, id: `diary-${Date.now()}` };
        set((s) => ({ diaryEntries: [newEntry, ...s.diaryEntries] }));
      },

      addDreamTrip: (tripData) => {
        const newTrip: DreamTrip = { ...tripData, id: `dream-${Date.now()}` };
        set((s) => ({ dreamTrips: [newTrip, ...s.dreamTrips] }));
      },

      updateDreamTrip: (id, updates) =>
        set((s) => ({
          dreamTrips: s.dreamTrips.map((dt) => (dt.id === id ? { ...dt, ...updates } : dt)),
        })),

      deleteDreamTrip: (id) =>
        set((s) => ({ dreamTrips: s.dreamTrips.filter((dt) => dt.id !== id) })),

      addMoodboardItem: (itemData) => {
        const newItem: MoodboardItem = { ...itemData, id: `mb-${Date.now()}` };
        set((s) => ({ moodboardItems: [...s.moodboardItems, newItem] }));
      },

      deleteMoodboardItem: (id) =>
        set((s) => ({ moodboardItems: s.moodboardItems.filter((i) => i.id !== id) })),

      addPassportStamp: (stampData) => {
        const newStamp: PassportStamp = { ...stampData, id: `ps-${Date.now()}` };
        set((s) => ({ passportStamps: [...s.passportStamps, newStamp] }));
      },

      addStory: (story: TravelStory) => {
        set((s) => ({ stories: [story, ...s.stories], activeStoryId: story.id }));
        return story.id;
      },

      updateStory: (id, updates) =>
        set((s) => ({
          stories: s.stories.map((st) => (st.id === id ? { ...st, ...updates, updatedAt: new Date().toISOString() } : st)),
        })),

      deleteStory: (id) =>
        set((s) => ({
          stories: s.stories.filter((st) => st.id !== id),
          activeStoryId: s.activeStoryId === id ? (s.stories[0]?.id || null) : s.activeStoryId,
        })),

      updateStoryPage: (storyId, pageId, updates) =>
        set((s) => ({
          stories: s.stories.map((st) =>
            st.id === storyId
              ? {
                  ...st,
                  updatedAt: new Date().toISOString(),
                  pages: st.pages.map((p) =>
                    p.id === pageId
                      ? {
                          ...p,
                          ...updates,
                          content: { ...p.content, ...(updates.content || {}) },
                        }
                      : p
                  ),
                }
              : st
          ),
        })),

      reorderStoryPages: (storyId, newPages) =>
        set((s) => ({
          stories: s.stories.map((st) =>
            st.id === storyId
              ? {
                  ...st,
                  updatedAt: new Date().toISOString(),
                  pages: newPages.map((p, i) => ({ ...p, pageNumber: i + 1 })),
                }
              : st
          ),
        })),

      deleteStoryPage: (storyId, pageId) =>
        set((s) => ({
          stories: s.stories.map((st) =>
            st.id === storyId
              ? {
                  ...st,
                  updatedAt: new Date().toISOString(),
                  pages: st.pages
                    .filter((p) => p.id !== pageId)
                    .map((p, i) => ({ ...p, pageNumber: i + 1 })),
                }
              : st
          ),
        })),

      addStoryPage: (storyId, page, insertIndex) =>
        set((s) => ({
          stories: s.stories.map((st) => {
            if (st.id !== storyId) return st;
            const updated = [...st.pages];
            if (typeof insertIndex === 'number') {
              updated.splice(insertIndex, 0, page);
            } else {
              updated.push(page);
            }
            return {
              ...st,
              updatedAt: new Date().toISOString(),
              pages: updated.map((p, i) => ({ ...p, pageNumber: i + 1 })),
            };
          }),
        })),

      duplicateStoryVersion: (storyId, versionType, newTitle) => {
        const current = get().stories.find((s) => s.id === storyId);
        if (!current) return '';
        const id = `story-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
        const duplicated: TravelStory = {
          ...current,
          id,
          title: newTitle,
          versionType,
          pages: current.pages.map((p) => ({ ...p, id: `p-${Date.now()}-${Math.random().toString(36).substring(2, 5)}` })),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        set((s) => ({ stories: [duplicated, ...s.stories], activeStoryId: id }));
        return id;
      },

      resetToSampleData: () => set({
        trips: sampleTrips,
        activeTripId: 'trip-italy-2026',
        canvasItems: sampleCanvasItems,
        timelineDays: sampleTimeline,
        diaryEntries: sampleDiary,
        dreamTrips: sampleDreamTrips,
        moodboardItems: sampleMoodboard,
        passportStamps: samplePassportStamps,
        stats: sampleStats,
        stories: buildSampleStories(),
        activeStoryId: 'story-italy-magazine',
      }),
    }),
    {
      name: 'wanderwall_storage_v2',
      partialize: (s) => ({
        trips: s.trips,
        canvasItems: s.canvasItems,
        timelineDays: s.timelineDays,
        diaryEntries: s.diaryEntries,
        dreamTrips: s.dreamTrips,
        moodboardItems: s.moodboardItems,
        passportStamps: s.passportStamps,
        scrapbookMode: s.scrapbookMode,
        stories: s.stories,
        user: s.user,
        isAuthenticated: s.isAuthenticated,
        driveSync: s.driveSync,
      }),
    }
  )
);
