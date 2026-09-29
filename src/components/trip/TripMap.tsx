import React from 'react';
import { MapPin, Navigation, ArrowRight, Compass } from 'lucide-react';
import { Trip } from '../../types/travel';

interface Props {
  trip: Trip;
}

export const TripMap: React.FC<Props> = ({ trip }) => {
  const stops = trip.routePreview && trip.routePreview.length > 0
    ? trip.routePreview
    : ['Start', 'Destination', 'End'];

  return (
    <div className="max-w-4xl mx-auto py-6 px-4 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-serif font-black text-2xl text-stone-900">Route & Travel Journey</h2>
          <p className="text-stone-500 text-xs">Connected stops across {trip.destination} • {trip.distanceKm} km total</p>
        </div>
        <div className="flex items-center space-x-2 text-xs font-mono bg-amber-100 text-amber-900 px-3 py-1.5 rounded-full border border-amber-200">
          <Navigation className="w-3.5 h-3.5 text-amber-700" />
          <span>{stops.length} Stops Planned</span>
        </div>
      </div>

      {/* Visual Journey Path */}
      <div className="bg-[#FAF7F2] p-6 rounded-2xl border border-stone-200 shadow-sm relative overflow-hidden">
        <div className="flex items-center justify-between overflow-x-auto pb-4 pt-2">
          {stops.map((stop, idx) => (
            <React.Fragment key={stop}>
              <div className="flex flex-col items-center min-w-[100px] text-center">
                <div className="w-10 h-10 rounded-full bg-amber-600 text-white flex items-center justify-center font-bold text-sm shadow-md ring-4 ring-amber-100">
                  {idx + 1}
                </div>
                <span className="font-serif font-bold text-stone-900 text-sm mt-2">{stop}</span>
                <span className="text-[10px] text-stone-500 font-mono">Stop #{idx + 1}</span>
              </div>
              {idx < stops.length - 1 && (
                <div className="flex-1 flex items-center justify-center px-2 min-w-[60px]">
                  <div className="w-full h-0.5 border-t-2 border-dashed border-amber-400 relative">
                    <ArrowRight className="w-4 h-4 text-amber-600 absolute -top-2 left-1/2 -translate-x-1/2" />
                  </div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Styled Map Graphic Representation */}
      <div className="relative h-96 rounded-2xl overflow-hidden border border-stone-300 shadow-inner bg-[#EFE9DF] flex items-center justify-center">
        {/* Visual Map Texture */}
        <div
          className="absolute inset-0 opacity-40 bg-cover bg-center"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1200&fit=crop&q=80')` }}
        />
        <div className="absolute inset-0 bg-stone-900/15" />

        {/* Route Pins on map representation */}
        <div className="relative z-10 w-4/5 max-w-lg bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-stone-200/80 space-y-4">
          <div className="flex items-center space-x-2 text-stone-900 font-serif font-bold">
            <Compass className="w-5 h-5 text-amber-600" />
            <span>Route Highlights — {trip.title}</span>
          </div>

          <div className="space-y-2 text-xs">
            {stops.map((city, i) => (
              <div key={city} className="flex items-center justify-between p-2 rounded-lg bg-stone-50 border border-stone-200/60">
                <div className="flex items-center space-x-2">
                  <span className="w-5 h-5 rounded-full bg-stone-900 text-white text-[10px] font-bold flex items-center justify-center">{i + 1}</span>
                  <span className="font-semibold text-stone-800">{city}</span>
                </div>
                <div className="flex items-center space-x-1 text-stone-500">
                  <MapPin className="w-3 h-3 text-rose-500" />
                  <span>Visited</span>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-stone-200 flex justify-between text-[11px] text-stone-600 font-mono">
            <span>Total: ~{trip.distanceKm} km</span>
            <span>Mode: 🚆 Train & 🚗 Drive</span>
          </div>
        </div>
      </div>
    </div>
  );
};
