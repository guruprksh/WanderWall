import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Landmark } from 'lucide-react';
import { useTravelStore } from '../store/travelStore';
import { Trip } from '../types/travel';

export const MuseumPage: React.FC = () => {
  const { trips } = useTravelStore();
  const navigate = useNavigate();

  // Group trips by year descending
  const years: number[] = Array.from(new Set(trips.map((t: Trip) => t.year))).sort((a: number, b: number) => b - a);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      <div className="border-b border-stone-200 pb-6">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold mb-2">
          <Landmark className="w-3.5 h-3.5 text-amber-600" />
          <span>The WanderWall Archives</span>
        </div>
        <h1 className="font-serif font-black text-3xl sm:text-5xl text-stone-900 tracking-tight">Travel Museum</h1>
        <p className="text-stone-600 text-sm mt-1 font-serif italic">Your travels curated as a lifelong chronological exhibition.</p>
      </div>

      <div className="space-y-12">
        {years.map((year: number) => {
          const yearTrips = trips.filter((t: Trip) => t.year === year);
          return (
            <div key={year} className="space-y-6">
              <div className="flex items-center space-x-4">
                <span className="font-serif font-black text-4xl text-amber-700 tracking-tight">{year}</span>
                <div className="h-0.5 flex-1 bg-gradient-to-r from-amber-300 to-transparent" />
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                {yearTrips.map((trip: Trip) => (
                  <div
                    key={trip.id}
                    onClick={() => navigate(`/trip/${trip.id}/canvas`)}
                    className="bg-[#FCFBF8] rounded-2xl p-5 border border-stone-200 shadow-sm hover:shadow-lg transition-all cursor-pointer group flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="h-48 w-full rounded-xl overflow-hidden relative shadow-inner">
                        <img src={trip.coverPhoto} alt={trip.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                        <div className="absolute bottom-2 left-2 bg-stone-900/80 backdrop-blur-xs text-white text-[10px] font-mono px-2 py-0.5 rounded-full">
                          Exhibit No. {trip.id.slice(-4)}
                        </div>
                      </div>

                      <div className="space-y-1">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-amber-700 font-bold">
                          {trip.destination}
                        </span>
                        <h3 className="font-serif font-black text-2xl text-stone-900 group-hover:text-amber-800 transition-colors">
                          {trip.title}
                        </h3>
                        <p className="text-xs text-stone-600 italic font-serif leading-relaxed">
                          "{trip.description}"
                        </p>
                      </div>
                    </div>

                    <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500 font-mono">
                      <span>{trip.distanceKm} km • {trip.cities.join(', ')}</span>
                      <span className="flex items-center space-x-1 text-amber-700 font-bold group-hover:translate-x-1 transition-transform">
                        <span>Enter Exhibit</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
