import React, { useState } from 'react';
import { X, Compass } from 'lucide-react';
import { useTravelStore } from '../../store/travelStore';

interface Props {
  onClose: () => void;
  onCreated: (id: string) => void;
}

export const NewTripModal: React.FC<Props> = ({ onClose, onCreated }) => {
  const { addTrip } = useTravelStore();
  const [title, setTitle] = useState('');
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [description, setDescription] = useState('');

  const handleCreate = () => {
    if (!title.trim() || !destination.trim()) return;
    const id = addTrip({
      title: title.trim(),
      destination: destination.trim(),
      dates: { start: startDate || new Date().toISOString().slice(0, 10), end: endDate || startDate || new Date().toISOString().slice(0, 10) },
      year: new Date(startDate || Date.now()).getFullYear(),
      coverPhoto: `https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&fit=crop&q=80`,
      coverStyle: 'large',
      description: description || `My trip to ${destination}`,
      weather: '☀️',
      distanceKm: 0,
      countries: [destination.trim()],
      cities: [],
      placesCount: 0,
      routePreview: [],
      collaborators: [{ name: 'You', avatar: '', role: 'Owner' }],
      tags: [],
      moodPalette: ['#e3a857', '#3d5a80', '#f4ede4', '#b94a48'],
      status: 'ongoing',
    });
    onCreated(id);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-[#FAF7F2] rounded-2xl shadow-2xl w-full max-w-md border border-stone-200 flex flex-col" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-stone-200">
          <div className="flex items-center space-x-2">
            <Compass className="w-5 h-5 text-amber-600" />
            <h2 className="font-serif font-bold text-lg text-stone-900">New Trip</h2>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-stone-200 rounded-full"><X className="w-5 h-5 text-stone-500" /></button>
        </div>

        <div className="p-5 space-y-4">
          <div>
            <label className="block text-xs font-medium text-stone-600 mb-1">Trip Name *</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Italy 2026" className="w-full px-3 py-2 rounded-lg border border-stone-300 bg-white text-sm focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-200" />
          </div>
          <div>
            <label className="block text-xs font-medium text-stone-600 mb-1">Destination *</label>
            <input type="text" value={destination} onChange={(e) => setDestination(e.target.value)} placeholder="Country or city" className="w-full px-3 py-2 rounded-lg border border-stone-300 bg-white text-sm focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-200" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-stone-600 mb-1">Start Date</label>
              <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-stone-300 bg-white text-sm focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-200" />
            </div>
            <div>
              <label className="block text-xs font-medium text-stone-600 mb-1">End Date</label>
              <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-stone-300 bg-white text-sm focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-200" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-stone-600 mb-1">Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} placeholder="What's this trip about?" className="w-full px-3 py-2 rounded-lg border border-stone-300 bg-white text-sm resize-none focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-200" />
          </div>
        </div>

        <div className="flex items-center justify-end space-x-3 px-5 py-4 border-t border-stone-200">
          <button onClick={onClose} className="px-4 py-2 text-sm text-stone-600 hover:text-stone-900">Cancel</button>
          <button onClick={handleCreate} disabled={!title.trim() || !destination.trim()} className="px-5 py-2 bg-stone-900 text-white text-sm rounded-full font-medium hover:bg-stone-800 disabled:opacity-40 disabled:hover:bg-stone-900 transition-all">
            Create Trip
          </button>
        </div>
      </div>
    </div>
  );
};
