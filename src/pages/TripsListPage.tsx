import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, MapPin, Trash2 } from 'lucide-react';
import { useTravelStore } from '../store/travelStore';
import { NewTripModal } from '../components/modals/NewTripModal';
import { Trip } from '../types/travel';

export const TripsListPage: React.FC = () => {
  const { trips, deleteTrip } = useTravelStore();
  const [query, setQuery] = useState('');
  const [showNewModal, setShowNewModal] = useState(false);
  const navigate = useNavigate();

  const filtered = trips.filter(
    (t: Trip) =>
      t.title.toLowerCase().includes(query.toLowerCase()) ||
      t.destination.toLowerCase().includes(query.toLowerCase()) ||
      t.tags.some((tag: string) => tag.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif font-black text-3xl text-stone-900">All Travel Journeys</h1>
          <p className="text-stone-500 text-xs">Search and explore your personal scrapbooks</p>
        </div>
        <button
          onClick={() => setShowNewModal(true)}
          className="flex items-center space-x-1.5 px-4 py-2 bg-stone-900 text-white rounded-full text-xs font-semibold hover:bg-stone-800 shadow"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Create New Trip</span>
        </button>
      </div>

      <div className="relative">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by city, country, or tag (e.g. Italy, beach, food)..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 bg-white text-xs shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-200"
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((trip: Trip) => (
          <div
            key={trip.id}
            className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="cursor-pointer" onClick={() => navigate(`/trip/${trip.id}/canvas`)}>
              <div className="h-44 w-full relative">
                <img src={trip.coverPhoto} alt={trip.title} className="w-full h-full object-cover" loading="lazy" />
                <div className="absolute top-2.5 right-2.5 bg-stone-900/75 text-white text-[10px] font-mono px-2 py-0.5 rounded-full">
                  {trip.year}
                </div>
              </div>
              <div className="p-4 space-y-2">
                <div className="flex items-center space-x-1 text-stone-500 text-[11px]">
                  <MapPin className="w-3 h-3 text-rose-500" />
                  <span>{trip.destination}</span>
                  <span>•</span>
                  <span>{trip.distanceKm} km</span>
                </div>
                <h3 className="font-serif font-bold text-lg text-stone-900">{trip.title}</h3>
                <p className="text-xs text-stone-600 line-clamp-2">{trip.description}</p>
              </div>
            </div>
            <div className="px-4 py-3 bg-stone-50 border-t border-stone-100 flex items-center justify-between text-xs">
              <span className="text-[11px] text-stone-500 font-mono">{trip.dates.start}</span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => navigate(`/trip/${trip.id}/canvas`)}
                  className="px-3 py-1 bg-amber-600 hover:bg-amber-700 text-white rounded-full text-xs font-semibold"
                >
                  Open
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (confirm(`Delete trip "${trip.title}"?`)) deleteTrip(trip.id);
                  }}
                  className="p-1 text-stone-400 hover:text-rose-600"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showNewModal && (
        <NewTripModal
          onClose={() => setShowNewModal(false)}
          onCreated={(id) => {
            setShowNewModal(false);
            navigate(`/trip/${id}/canvas`);
          }}
        />
      )}
    </div>
  );
};
