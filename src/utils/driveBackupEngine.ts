import { DriveBackupItem, WanderWallFullBackup } from '../types/drive';

/**
 * Serializes the full application state into a clean, portable WanderWall backup payload.
 */
export const createBackupPayload = (storeState: any, userEmail?: string): WanderWallFullBackup => {
  return {
    schemaVersion: '1.0',
    exportDate: new Date().toISOString(),
    userEmail: userEmail || 'anonymous',
    trips: storeState.trips || [],
    canvasItems: storeState.canvasItems || [],
    timelineDays: storeState.timelineDays || [],
    diaryEntries: storeState.diaryEntries || [],
    stories: storeState.stories || [],
    passportStamps: storeState.passportStamps || [],
    stats: storeState.stats || {},
  };
};

/**
 * Calculates payload size in Kilobytes.
 */
export const getPayloadSizeKb = (payload: any): number => {
  const str = JSON.stringify(payload);
  const bytes = new Blob([str]).size;
  return Math.round((bytes / 1024) * 10) / 10;
};

/**
 * Triggers a browser download of the WanderWall JSON backup file.
 */
export const downloadBackupAsJson = (payload: WanderWallFullBackup, fileName?: string) => {
  const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(payload, null, 2))}`;
  const downloadAnchor = document.createElement('a');
  const dateStr = new Date().toISOString().split('T')[0];
  const finalName = fileName || `wanderwall-backup-${dateStr}.json`;
  
  downloadAnchor.setAttribute('href', jsonString);
  downloadAnchor.setAttribute('download', finalName);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
};

/**
 * Validates whether an uploaded JSON object conforms to the WanderWall backup schema.
 */
export const validateBackupPayload = (parsed: any): { valid: boolean; error?: string } => {
  if (!parsed || typeof parsed !== 'object') {
    return { valid: false, error: 'Invalid JSON file format' };
  }
  if (!Array.isArray(parsed.trips)) {
    return { valid: false, error: 'Backup is missing trips array' };
  }
  return { valid: true };
};

/**
 * Mock Google Drive Cloud API adapter.
 * Handles connect, cloud backup upload, listing backups, and restoring.
 */
export const googleDriveCloudService = {
  async connectAccount(email: string): Promise<{ success: boolean; accountName: string }> {
    // Simulating OAuth Google authorization handshake
    await new Promise((r) => setTimeout(r, 800));
    const namePart = email.split('@')[0];
    const accountName = namePart.charAt(0).toUpperCase() + namePart.slice(1);
    return { success: true, accountName };
  },

  async uploadToDrive(
    payload: WanderWallFullBackup,
    customName?: string
  ): Promise<DriveBackupItem> {
    // Simulate upload network delay
    await new Promise((r) => setTimeout(r, 1000));

    const timestamp = new Date().toISOString();
    const dateFormatted = timestamp.replace(/[:.]/g, '-');
    const sizeKb = getPayloadSizeKb(payload);
    const fileName = customName || `wanderwall_cloud_backup_${dateFormatted.slice(0, 16)}.json`;
    const driveFileId = `gdrive_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;

    const backupItem: DriveBackupItem = {
      id: `backup-${Date.now()}`,
      fileName,
      timestamp,
      sizeKb,
      tripsCount: payload.trips?.length || 0,
      storiesCount: payload.stories?.length || 0,
      canvasItemsCount: payload.canvasItems?.length || 0,
      driveFileId,
      version: `v${payload.trips?.length || 1}.${payload.stories?.length || 0}`,
    };

    // Save backup to persistent localStorage virtual Google Drive storage
    const existing = JSON.parse(localStorage.getItem('wanderwall_gdrive_backups') || '[]');
    localStorage.setItem('wanderwall_gdrive_backups', JSON.stringify([backupItem, ...existing]));
    localStorage.setItem(`wanderwall_gdrive_file_${driveFileId}`, JSON.stringify(payload));

    return backupItem;
  },

  getSavedBackups(): DriveBackupItem[] {
    try {
      const data = localStorage.getItem('wanderwall_gdrive_backups');
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  async fetchBackupFile(driveFileId: string): Promise<WanderWallFullBackup | null> {
    await new Promise((r) => setTimeout(r, 600));
    try {
      const data = localStorage.getItem(`wanderwall_gdrive_file_${driveFileId}`);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },

  async deleteBackupFromDrive(driveFileId: string): Promise<boolean> {
    await new Promise((r) => setTimeout(r, 400));
    try {
      const existing: DriveBackupItem[] = JSON.parse(
        localStorage.getItem('wanderwall_gdrive_backups') || '[]'
      );
      const filtered = existing.filter((b) => b.driveFileId !== driveFileId);
      localStorage.setItem('wanderwall_gdrive_backups', JSON.stringify(filtered));
      localStorage.removeItem(`wanderwall_gdrive_file_${driveFileId}`);
      return true;
    } catch {
      return false;
    }
  }
};
