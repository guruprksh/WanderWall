import React from 'react';
import { BarChart3, Navigation, Globe, MapPin, Building2, Coffee, Camera, Mountain, Plane, Train } from 'lucide-react';
import { useTravelStore } from '../store/travelStore';

export const StatsPage: React.FC = () => {
  const { stats } = useTravelStore();

  const StatBlock = ({ icon: Icon, value, label, colorClass }: any) => (
    <div className={`p-5 rounded-2xl border bg-white flex flex-col items-center justify-center text-center space-y-2 shadow-sm ${colorClass}`}>
      <div className="p-3 rounded-full bg-white/60 shadow-inner">
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <div className="font-serif font-black text-3xl">{value}</div>
        <div className="text-[11px] font-mono font-bold tracking-wider uppercase opacity-80">{label}</div>
      </div>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      <div className="border-b border-stone-200 pb-6">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold mb-2">
          <BarChart3 className="w-3.5 h-3.5 text-amber-600" />
          <span>The Numbers Behind The Journey</span>
        </div>
        <h1 className="font-serif font-black text-3xl sm:text-5xl text-stone-900 tracking-tight">Travel Statistics</h1>
        <p className="text-stone-600 text-sm mt-1 font-serif italic">Every mile travelled, every photo captured, every sunset witnessed.</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-2 bg-[#1A1A1A] text-white p-6 rounded-3xl flex flex-col justify-between shadow-lg relative overflow-hidden">
          <div className="relative z-10 space-y-1">
            <span className="text-[10px] font-mono text-stone-400 uppercase tracking-widest">Total Distance</span>
            <div className="font-serif font-black text-6xl tracking-tighter text-amber-400">
              {stats.totalDistanceKm.toLocaleString()} <span className="text-2xl text-stone-300">KM</span>
            </div>
            <p className="text-sm text-stone-400 max-w-sm pt-2">That's approximately {(stats.totalDistanceKm / 40075 * 100).toFixed(1)}% of the way around the equator!</p>
          </div>
          <Navigation className="absolute -bottom-6 -right-6 w-48 h-48 text-white/5" />
        </div>

        <StatBlock icon={Globe} value={stats.countriesCount} label="Countries" colorClass="border-emerald-200 text-emerald-950 bg-emerald-50" />
        <StatBlock icon={MapPin} value={stats.citiesCount} label="Cities" colorClass="border-sky-200 text-sky-950 bg-sky-50" />
        <StatBlock icon={Mountain} value={stats.tripsCount} label="Trips Taken" colorClass="border-amber-200 text-amber-950 bg-amber-50" />
        <StatBlock icon={Camera} value={stats.photosCount} label="Photos Taken" colorClass="border-rose-200 text-rose-950 bg-rose-50" />
        
        <StatBlock icon={Plane} value={stats.flightsCount} label="Flights" colorClass="border-indigo-200 text-indigo-950 bg-indigo-50" />
        <StatBlock icon={Train} value={stats.trainCount} label="Trains" colorClass="border-stone-200 text-stone-950 bg-stone-100" />
        
        <StatBlock icon={Coffee} value={stats.restaurantsCount} label="Cafes & Food" colorClass="border-orange-200 text-orange-950 bg-orange-50" />
        <StatBlock icon={Building2} value={stats.hotelsCount} label="Hotels" colorClass="border-purple-200 text-purple-950 bg-purple-50" />
      </div>
    </div>
  );
};
