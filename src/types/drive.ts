export interface DriveBackupItem {
  id: string;
  fileName: string;
  timestamp: string;
  sizeKb: number;
  tripsCount: number;
  storiesCount: number;
  canvasItemsCount: number;
  driveFileId: string;
  version: string;
}

export interface DriveSyncState {
  isConnected: boolean;
  accountEmail: string | null;
  accountName: string | null;
  lastSyncTimestamp: string | null;
  isSyncing: boolean;
  autoBackup: boolean;
  storageQuota: {
    usedMb: number;
    totalMb: number;
  };
  backupList: DriveBackupItem[];
}

export interface WanderWallFullBackup {
  schemaVersion: '1.0';
  exportDate: string;
  userEmail?: string;
  trips: any[];
  canvasItems: any[];
  timelineDays: any[];
  diaryEntries: any[];
  stories: any[];
  passportStamps: any[];
  stats: any[];
}
