import React, { useState } from 'react';
import { Compass, Plus, Calendar, DollarSign, Check } from 'lucide-react';
import { useTravelStore } from '../store/travelStore';
import { DreamTrip } from '../types/travel';

export const WishlistPage: React.FC = () => {
  const { dreamTrips, addDreamTrip, updateDreamTrip } = useTravelStore();
  const [showAdd, setShowAdd] = useState(false);
  const [dest, setDest] = useState('');
  const [country, setCountry] = useState('');
  const [budget, setBudget] = useState('€3,000');
  const [season, setSeason] = useState('Spring');

  const handleAdd = () => {
    if (!dest.trim()) return;
    addDreamTrip({
      destination: dest.trim(),
      country: country || dest.trim(),
      flag: '✈️',
      photos: ['https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&fit=crop&q=80'],
      estimatedBudget: budget,
      bestSeason: season,
      priority: 'High',
      placesToVisit: ['Must-see spots', 'Local sights'],
      restaurants: ['Local bistro'],
      activities: ['Exploring', 'Photography'],
      status: 'Dream Trip',
      notes: 'Exciting future trip!',
    });
    setDest('');
    setCountry('');
    setShowAdd(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-6">
        <div>
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold mb-2">
            <Compass className="w-3.5 h-3.5 text-amber-600" />
            <span>Travel Bucket List</span>
          </div>
          <h1 className="font-serif font-black text-3xl sm:text-5xl text-stone-900 tracking-tight">Dream Trips</h1>
          <p className="text-stone-600 text-sm mt-1 font-serif italic">Wishlist destinations and future travel dreams.</p>
        </div>
        <button
          onClick={() => setShowAdd(true)}
          className="flex items-center space-x-1.5 px-4 py-2 bg-stone-900 text-white rounded-full text-xs font-semibold hover:bg-stone-800 shadow"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Dream Trip</span>
        </button>
      </div>

      {showAdd && (
        <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-stone-300 shadow-md space-y-2 max-w-lg">
          <div className="grid grid-cols-2 gap-2">
            <input type="text" value={dest} onChange={(e) => setDest(e.target.value)} placeholder="Destination" className="px-3 py-1.5 rounded-lg border text-xs bg-white" />
            <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} placeholder="Country" className="px-3 py-1.5 rounded-lg border text-xs bg-white" />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <input type="text" value={budget} onChange={(e) => setBudget(e.target.value)} placeholder="Budget" className="px-3 py-1.5 rounded-lg border text-xs bg-white" />
            <input type="text" value={season} onChange={(e) => setSeason(e.target.value)} placeholder="Season" className="px-3 py-1.5 rounded-lg border text-xs bg-white" />
          </div>
          <div className="flex justify-end gap-2 pt-1">
            <button onClick={() => setShowAdd(false)} className="px-3 py-1 text-xs text-stone-500">Cancel</button>
            <button onClick={handleAdd} className="px-4 py-1.5 bg-stone-900 text-white text-xs font-semibold rounded-lg">Save</button>
          </div>
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {dreamTrips.map((d: DreamTrip) => (
          <div key={d.id} className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm flex flex-col justify-between">
            <div>
              <div className="h-44 w-full relative">
                <img src={d.photos[0]} alt={d.destination} className="w-full h-full object-cover" loading="lazy" />
                <div className="absolute top-3 left-3 bg-stone-900/80 text-white text-xs px-2.5 py-1 rounded-full font-bold flex items-center space-x-1">
                  <span>{d.flag}</span><span>{d.country}</span>
                </div>
                <div className="absolute top-3 right-3 bg-amber-500 text-stone-900 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                  {d.priority}
                </div>
              </div>
              <div className="p-4 space-y-2">
                <h3 className="font-serif font-black text-xl text-stone-900">{d.destination}</h3>
                <div className="flex items-center gap-2 text-xs text-stone-600 font-mono">
                  <span className="flex items-center"><DollarSign className="w-3 h-3 text-emerald-600" />{d.estimatedBudget}</span>
                  <span>•</span>
                  <span className="flex items-center"><Calendar className="w-3 h-3 text-amber-600" />{d.bestSeason}</span>
                </div>
                <p className="text-xs text-stone-600 italic">"{d.notes}"</p>
              </div>
            </div>
            <div className="p-3 bg-stone-50 border-t border-stone-100 flex items-center justify-between text-xs">
              <span className="font-semibold text-stone-700">{d.status}</span>
              <button
                onClick={() => updateDreamTrip(d.id, { status: d.status === 'Booked' ? 'Planning' : 'Booked' })}
                className="flex items-center space-x-1 text-xs text-emerald-700 font-bold"
              >
                <Check className="w-3 h-3" />
                <span>{d.status === 'Booked' ? 'Planning' : 'Mark Booked!'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
