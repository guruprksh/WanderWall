import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Globe, ArrowRight, CheckCircle2, Compass } from 'lucide-react';
import { useTravelStore } from '../store/travelStore';

export const WorldMapPage: React.FC = () => {
  const { trips, dreamTrips } = useTravelStore();
  const [selectedCountry, setSelectedCountry] = useState<string | null>('Italy');
  const navigate = useNavigate();

  const visitedCountries = Array.from(new Set(trips.flatMap((t) => t.countries)));
  const wishlistCountries = Array.from(new Set(dreamTrips.map((d) => d.country)));

  const matchedTrips = trips.filter(
    (t) => selectedCountry && t.countries.includes(selectedCountry)
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stone-200 pb-6">
        <div>
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold mb-2">
            <Globe className="w-3.5 h-3.5 text-amber-600" />
            <span>Interactive World Journal</span>
          </div>
          <h1 className="font-serif font-black text-3xl sm:text-5xl text-stone-900 tracking-tight">Your World</h1>
          <p className="text-stone-600 text-sm mt-1 font-serif italic">Countries you've explored and places waiting on your bucket list.</p>
        </div>
        <div className="flex gap-3 text-xs">
          <div className="bg-white px-4 py-2 rounded-xl border border-stone-200 shadow-xs">
            <span className="text-stone-400 block text-[10px] font-mono">EXPLORED</span>
            <span className="font-serif font-bold text-stone-900 text-sm">{visitedCountries.length} Countries</span>
          </div>
          <div className="bg-white px-4 py-2 rounded-xl border border-stone-200 shadow-xs">
            <span className="text-stone-400 block text-[10px] font-mono">WISHLIST</span>
            <span className="font-serif font-bold text-amber-700 text-sm">{wishlistCountries.length} Dream Spots</span>
          </div>
        </div>
      </div>

      <div className="relative rounded-3xl overflow-hidden border border-stone-300 shadow-lg bg-[#EAE2D5] min-h-[420px] flex flex-col justify-between p-6">
        <div
          className="absolute inset-0 opacity-40 bg-cover bg-center"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1600&fit=crop&q=80')` }}
        />
        <div className="absolute inset-0 bg-stone-900/10 pointer-events-none" />

        <div className="relative z-10 flex flex-wrap gap-2">
          {visitedCountries.map((c) => (
            <button
              key={c}
              onClick={() => setSelectedCountry(c)}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm ${
                selectedCountry === c ? 'bg-amber-600 text-white ring-2 ring-amber-300' : 'bg-white/90 text-stone-800'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>{c}</span>
            </button>
          ))}
          {wishlistCountries.map((c) => (
            <button
              key={c}
              onClick={() => setSelectedCountry(c)}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-medium border border-dashed shadow-sm ${
                selectedCountry === c ? 'bg-stone-900 text-white' : 'bg-amber-50/90 text-amber-900 border-amber-300'
              }`}
            >
              <Compass className="w-3.5 h-3.5 text-amber-600" />
              <span>{c}</span>
            </button>
          ))}
        </div>

        {selectedCountry && (
          <div className="relative z-10 mt-auto bg-white/95 backdrop-blur-md p-5 rounded-2xl border border-stone-200 shadow-xl max-w-xl">
            <h3 className="font-serif font-black text-2xl text-stone-900">{selectedCountry}</h3>
            {matchedTrips.length > 0 ? (
              <div className="mt-3 space-y-2">
                {matchedTrips.map((t) => (
                  <div
                    key={t.id}
                    onClick={() => navigate(`/trip/${t.id}/canvas`)}
                    className="p-3 bg-stone-50 hover:bg-amber-50/80 rounded-xl border border-stone-200 cursor-pointer flex items-center justify-between"
                  >
                    <div>
                      <div className="font-serif font-bold text-sm text-stone-900">{t.title}</div>
                      <div className="text-[11px] text-stone-500 font-mono">{t.dates.start} • {t.distanceKm} km</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-amber-700" />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-stone-600 mt-2 italic">{selectedCountry} is on your Dream Trips wishlist!</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
