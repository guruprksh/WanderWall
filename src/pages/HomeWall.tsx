import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Navigation, Sparkles, ArrowRight, Sun } from 'lucide-react';
import { useTravelStore } from '../store/travelStore';

export const HomeWall: React.FC = () => {
  const { trips, stats, scrapbookMode } = useTravelStore();
  const navigate = useNavigate();
  const isPhysical = scrapbookMode === 'physical';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stone-200 pb-6">
        <div>
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-100/80 text-amber-900 text-xs font-semibold uppercase tracking-wider mb-2 border border-amber-200/50">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Virtual Scrapbook Wall</span>
          </div>
          <h1 className="font-serif font-black text-3xl sm:text-5xl text-stone-900 tracking-tight">Your Travel Wall</h1>
          <p className="text-stone-600 text-sm mt-1 font-serif italic max-w-xl">Pinned memories, routes, and tickets from the places that shaped your story.</p>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <Stat emoji="🌍" value={`${stats.countriesCount} Countries`} />
          <Stat emoji="✈️" value={`${stats.totalDistanceKm.toLocaleString()} km`} />
          <Stat emoji="📸" value={`${trips.length} Trips`} />
        </div>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {trips.map((trip, idx) => {
          const rot = [-1.5, 1, -0.8, 1.2, -1][idx % 5];
          return (
            <div
              key={trip.id}
              style={{ transform: isPhysical ? `rotate(${rot}deg)` : 'none' }}
              className="group relative bg-[#FCFBF8] rounded-2xl overflow-hidden border border-stone-200 shadow-md hover:shadow-xl transition-all cursor-pointer flex flex-col"
              onClick={() => navigate(`/trip/${trip.id}/canvas`)}
            >
              {isPhysical && (
                <>
                  <div className="pushpin pushpin-red -top-2.5 left-8 pointer-events-none" />
                  <div className="washi-tape washi-tape-coral -top-2.5 right-8 w-20 rotate-3 pointer-events-none" />
                </>
              )}
              <div className="relative h-56 w-full overflow-hidden bg-stone-100">
                <img src={trip.coverPhoto} alt={trip.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-black/10" />
                <div className="absolute top-3 left-3 bg-stone-900/70 backdrop-blur-xs text-white text-[11px] font-mono px-2.5 py-0.5 rounded-full">{trip.year}</div>
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <div className="flex items-center space-x-1.5 text-[11px] text-amber-300 font-mono uppercase font-semibold">
                    <Sun className="w-3 h-3" />
                    <span>{trip.weather}</span>
                  </div>
                  <h3 className="font-serif font-black text-2xl drop-shadow-sm leading-tight mt-0.5">{trip.title}</h3>
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <p className="text-xs text-stone-600 line-clamp-2 italic font-serif">"{trip.description}"</p>
                {trip.cities.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {trip.cities.slice(0, 4).map((c) => (
                      <span key={c} className="text-[10px] font-medium bg-stone-100 text-stone-700 px-2 py-0.5 rounded-md border border-stone-200/60">{c}</span>
                    ))}
                    {trip.cities.length > 4 && <span className="text-[10px] text-stone-500 px-1">+{trip.cities.length - 4}</span>}
                  </div>
                )}
                <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500 font-mono">
                  <span className="flex items-center space-x-1"><Navigation className="w-3 h-3 text-amber-600" /><span>{trip.distanceKm} km</span></span>
                  <span className="flex items-center space-x-1 text-amber-800 font-bold group-hover:translate-x-1 transition-transform"><span>Open</span><ArrowRight className="w-3.5 h-3.5" /></span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Stat: React.FC<{ emoji: string; value: string }> = ({ emoji, value }) => (
  <div className="bg-white px-3.5 py-2 rounded-2xl border border-stone-200 shadow-sm flex items-center space-x-2">
    <span className="text-lg">{emoji}</span>
    <div className="font-bold text-stone-900 text-xs">{value}</div>
  </div>
);
