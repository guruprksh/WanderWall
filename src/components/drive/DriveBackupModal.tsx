import React, { useState, useRef } from 'react';
import { X, Cloud, RefreshCw, Download, Upload, CheckCircle2, Clock, Trash2 } from 'lucide-react';
import { useTravelStore } from '../../store/travelStore';
import { createBackupPayload, downloadBackupAsJson } from '../../utils/driveBackupEngine';

interface DriveBackupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DriveBackupModal: React.FC<DriveBackupModalProps> = ({ isOpen, onClose }) => {
  const state = useTravelStore();
  const { driveSync, connectDrive, disconnectDrive, triggerDriveBackup, restoreDriveBackup, deleteDriveBackup, toggleAutoBackup, importFullBackupPayload } = state;

  const [connectEmail] = useState('guru.traveler@gmail.com');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleManualBackup = async () => {
    setStatusMessage('Syncing to Google Drive...');
    const result = await triggerDriveBackup();
    setStatusMessage(result ? 'Backup saved to Google Drive!' : 'Backup failed.');
    setTimeout(() => setStatusMessage(null), 2500);
  };

  const handleRestore = async (fileId: string) => {
    if (window.confirm('Restore this backup version?')) {
      setStatusMessage('Restoring cloud snapshot...');
      const ok = await restoreDriveBackup(fileId);
      setStatusMessage(ok ? 'Restored successfully!' : 'Restore failed.');
      setTimeout(() => setStatusMessage(null), 2500);
    }
  };

  const handleExportJson = () => {
    const payload = createBackupPayload(state, driveSync.accountEmail || undefined);
    downloadBackupAsJson(payload);
  };

  const handleFileImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        const ok = importFullBackupPayload(json);
        setStatusMessage(ok ? 'Imported successfully!' : 'Invalid backup format.');
      } catch {
        setStatusMessage('Could not parse JSON.');
      }
      setTimeout(() => setStatusMessage(null), 2500);
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-[#FAF7F2] rounded-3xl shadow-2xl border border-[#E6DEC8] overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-emerald-800 to-teal-900 text-white flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <Cloud className="w-5 h-5 text-emerald-300" />
            <div>
              <h3 className="font-serif font-bold text-base">Google Drive Cloud Sync</h3>
              <p className="text-[10px] text-emerald-200">Continuous cloud backup for WanderWall</p>
            </div>
          </div>
          <button onClick={onClose} className="w-7 h-7 rounded-full bg-black/20 text-white flex items-center justify-center">
            <X className="w-4 h-4" />
          </button>
        </div>

        {statusMessage && (
          <div className="bg-emerald-100 text-emerald-950 px-4 py-2 text-xs font-semibold flex items-center justify-between">
            <span>{statusMessage}</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-700" />
          </div>
        )}

        <div className="p-5 space-y-4 overflow-y-auto">
          {/* Connection Box */}
          <div className="bg-white rounded-2xl p-3.5 border border-stone-200 flex items-center justify-between">
            <div>
              <div className="text-[11px] text-stone-500">Google Drive Account</div>
              <div className="font-bold text-stone-900 text-xs">{driveSync.isConnected ? driveSync.accountEmail : 'Disconnected'}</div>
              <div className="text-[10px] text-stone-400 mt-0.5">{driveSync.storageQuota.usedMb} MB used</div>
            </div>
            {driveSync.isConnected ? (
              <div className="flex items-center space-x-1.5">
                <button
                  onClick={handleManualBackup}
                  disabled={driveSync.isSyncing}
                  className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white rounded-xl text-xs font-bold flex items-center space-x-1"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${driveSync.isSyncing ? 'animate-spin' : ''}`} />
                  <span>{driveSync.isSyncing ? 'Syncing...' : 'Sync'}</span>
                </button>
                <button onClick={disconnectDrive} className="px-2.5 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-600 text-xs rounded-xl">
                  Log out
                </button>
              </div>
            ) : (
              <button onClick={() => connectDrive(connectEmail)} className="px-3 py-1.5 bg-emerald-700 text-white rounded-xl text-xs font-bold">
                Connect
              </button>
            )}
          </div>

          {/* Auto Backup Switch */}
          <div className="flex items-center justify-between bg-emerald-50/70 p-3 rounded-2xl border border-emerald-200/70 text-xs">
            <div>
              <div className="font-bold text-emerald-950">Auto-Backup on Change</div>
              <div className="text-[10px] text-emerald-800">Save to Google Drive automatically</div>
            </div>
            <button
              onClick={() => toggleAutoBackup(!driveSync.autoBackup)}
              className={`w-10 h-5 rounded-full relative transition-colors ${driveSync.autoBackup ? 'bg-emerald-600' : 'bg-stone-300'}`}
            >
              <div className={`w-4 h-4 rounded-full bg-white absolute top-0.5 transition-transform ${driveSync.autoBackup ? 'left-5' : 'left-1'}`} />
            </button>
          </div>

          {/* Cloud Backups */}
          <div>
            <div className="text-xs font-bold text-stone-800 uppercase tracking-wider mb-2 flex items-center space-x-1">
              <Clock className="w-3.5 h-3.5 text-stone-500" />
              <span>Drive Snapshots ({driveSync.backupList.length})</span>
            </div>
            <div className="space-y-1.5 max-h-40 overflow-y-auto">
              {driveSync.backupList.map((item) => (
                <div key={item.id} className="p-2.5 bg-white rounded-xl border border-stone-200 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-stone-800">{item.version} <span className="font-normal text-stone-400">({item.sizeKb} KB)</span></div>
                    <div className="text-[10px] text-stone-500">{new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • {item.tripsCount} trips, {item.storiesCount} stories</div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <button onClick={() => handleRestore(item.driveFileId)} className="px-2 py-1 bg-emerald-100 hover:bg-emerald-200 text-emerald-900 rounded-lg text-xs font-semibold">
                      Restore
                    </button>
                    <button onClick={() => deleteDriveBackup(item.driveFileId)} className="p-1 text-stone-400 hover:text-rose-600">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Local Export / Import */}
          <div className="pt-2 border-t border-stone-200 flex space-x-2">
            <button onClick={handleExportJson} className="flex-1 p-2 bg-stone-100 hover:bg-stone-200 rounded-xl text-stone-800 text-xs font-medium flex items-center justify-center space-x-1.5">
              <Download className="w-3.5 h-3.5" />
              <span>Export File</span>
            </button>
            <button onClick={() => fileInputRef.current?.click()} className="flex-1 p-2 bg-stone-100 hover:bg-stone-200 rounded-xl text-stone-800 text-xs font-medium flex items-center justify-center space-x-1.5">
              <Upload className="w-3.5 h-3.5" />
              <span>Import File</span>
            </button>
            <input ref={fileInputRef} type="file" accept=".json" onChange={handleFileImport} className="hidden" />
          </div>
        </div>
      </div>
    </div>
  );
};
