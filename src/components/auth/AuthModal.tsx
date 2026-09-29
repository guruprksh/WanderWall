import React, { useState } from 'react';
import { X, Compass, Sparkles } from 'lucide-react';
import { useTravelStore } from '../../store/travelStore';
import { SAMPLE_AVATARS, TravelTier } from '../../types/auth';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { user, isAuthenticated, login, logout, updateUserProfile, trips, stories, driveSync } = useTravelStore();
  const [mode, setMode] = useState<'profile' | 'login' | 'edit'>(isAuthenticated ? 'profile' : 'login');
  const [emailInput, setEmailInput] = useState(user?.email || '');
  const [nameInput, setNameInput] = useState(user?.name || '');
  const [bioInput, setBioInput] = useState(user?.bio || '');
  const [selectedAvatar] = useState(user?.avatar || SAMPLE_AVATARS[0]);
  const [tierInput, setTierInput] = useState<TravelTier>(user?.travelTier || 'Globetrotter');
  const [saveSuccess, setSaveSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({
      name: nameInput,
      email: emailInput,
      bio: bioInput,
      avatar: selectedAvatar,
      travelTier: tierInput,
    });
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      setMode('profile');
    }, 1000);
  };

  const handleQuickLogin = (email: string, name: string) => {
    login(email, name, selectedAvatar);
    setMode('profile');
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#FAF7F2] rounded-3xl shadow-2xl border border-[#E6DEC8] overflow-hidden">
        {/* Banner */}
        <div className="h-20 bg-gradient-to-r from-amber-800 to-stone-900 px-6 py-3 flex items-start justify-between">
          <div className="flex items-center space-x-2 text-amber-200 text-xs font-semibold uppercase">
            <Compass className="w-4 h-4 animate-spin-slow" />
            <span>Traveler Passport</span>
          </div>
          <button onClick={onClose} className="w-7 h-7 rounded-full bg-black/20 text-white flex items-center justify-center">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Avatar Header */}
          <div className="flex items-center space-x-3 -mt-10 mb-4">
            <img src={user?.avatar || selectedAvatar} alt="Avatar" className="w-16 h-16 rounded-2xl object-cover border-4 border-[#FAF7F2] shadow-md bg-amber-100" />
            <div className="pt-4 flex-1 flex items-center justify-between">
              <div>
                <h3 className="font-serif font-bold text-stone-900 text-base">{user?.name || 'Guest Traveler'}</h3>
                <span className="text-[10px] uppercase font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">{user?.travelTier || 'Explorer'}</span>
              </div>
              {isAuthenticated && (
                <button onClick={() => setMode(mode === 'edit' ? 'profile' : 'edit')} className="text-xs font-semibold text-amber-800 hover:underline">
                  {mode === 'edit' ? 'Cancel' : 'Edit'}
                </button>
              )}
            </div>
          </div>

          {isAuthenticated && mode === 'profile' && user && (
            <div className="space-y-3.5">
              <p className="text-xs text-stone-600 italic bg-amber-50/60 p-2.5 rounded-xl border border-amber-200/50">"{user.bio}"</p>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-stone-50 border border-stone-200 p-2 rounded-xl">
                  <div className="text-base font-bold text-amber-900">{trips.length}</div>
                  <div className="text-[10px] text-stone-500 uppercase">Trips</div>
                </div>
                <div className="bg-stone-50 border border-stone-200 p-2 rounded-xl">
                  <div className="text-base font-bold text-amber-900">{stories.length}</div>
                  <div className="text-[10px] text-stone-500 uppercase">Stories</div>
                </div>
                <div className="bg-stone-50 border border-stone-200 p-2 rounded-xl">
                  <div className="text-base font-bold text-amber-900">{user.countriesVisited}</div>
                  <div className="text-[10px] text-stone-500 uppercase">Countries</div>
                </div>
              </div>
              <div className="bg-emerald-50 border border-emerald-200 p-2.5 rounded-xl flex items-center justify-between text-xs">
                <span className="text-emerald-900 font-medium">Google Drive Sync</span>
                <span className="text-emerald-700 font-bold">{driveSync.isConnected ? 'Connected' : 'Offline'}</span>
              </div>
              <button onClick={() => { logout(); setMode('login'); }} className="w-full py-2 bg-stone-100 hover:bg-rose-50 hover:text-rose-700 text-stone-600 rounded-xl text-xs font-medium border border-stone-200">
                Sign Out
              </button>
            </div>
          )}

          {isAuthenticated && mode === 'edit' && (
            <form onSubmit={handleSaveProfile} className="space-y-3">
              <div>
                <label className="text-[11px] font-medium text-stone-600 block mb-0.5">Name</label>
                <input type="text" value={nameInput} onChange={(e) => setNameInput(e.target.value)} className="w-full px-2.5 py-1.5 bg-white rounded-lg border text-xs" />
              </div>
              <div>
                <label className="text-[11px] font-medium text-stone-600 block mb-0.5">Bio</label>
                <input type="text" value={bioInput} onChange={(e) => setBioInput(e.target.value)} className="w-full px-2.5 py-1.5 bg-white rounded-lg border text-xs" />
              </div>
              <div>
                <label className="text-[11px] font-medium text-stone-600 block mb-0.5">Tier</label>
                <select value={tierInput} onChange={(e) => setTierInput(e.target.value as TravelTier)} className="w-full px-2.5 py-1.5 bg-white rounded-lg border text-xs">
                  <option value="Explorer">Explorer</option>
                  <option value="Voyager">Voyager</option>
                  <option value="Globetrotter">Globetrotter</option>
                  <option value="Wanderer">Wanderer</option>
                </select>
              </div>
              <button type="submit" className="w-full py-2 bg-amber-700 hover:bg-amber-800 text-white rounded-xl text-xs font-bold shadow">
                {saveSuccess ? 'Saved!' : 'Save Details'}
              </button>
            </form>
          )}

          {!isAuthenticated && (
            <div className="space-y-3">
              <button onClick={() => handleQuickLogin('guruprakash@wanderwall.travel', 'Guru Prakash')} className="w-full p-2.5 bg-amber-50 hover:bg-amber-100 rounded-xl border border-amber-200 text-left text-xs font-semibold text-amber-900 flex items-center justify-between">
                <span>Continue as Guru Prakash</span>
                <Sparkles className="w-4 h-4 text-amber-600" />
              </button>
              <form onSubmit={(e) => { e.preventDefault(); if (emailInput.trim()) handleQuickLogin(emailInput, nameInput || emailInput.split('@')[0]); }} className="space-y-2">
                <input type="text" placeholder="Name" value={nameInput} onChange={(e) => setNameInput(e.target.value)} className="w-full px-2.5 py-1.5 bg-white rounded-lg border text-xs" />
                <input type="email" required placeholder="Email" value={emailInput} onChange={(e) => setEmailInput(e.target.value)} className="w-full px-2.5 py-1.5 bg-white rounded-lg border text-xs" />
                <button type="submit" className="w-full py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-bold">Sign In</button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
