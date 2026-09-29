import React, { useState } from 'react';
import { Scroll, Award, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTravelStore } from '../store/travelStore';
import { PassportStamp } from '../types/travel';

export const PassportPage: React.FC = () => {
  const { trips, passportStamps } = useTravelStore();
  const [currentPage, setCurrentPage] = useState(0);

  const activeTrip = trips[currentPage % trips.length];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-6">
        <div>
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold mb-2">
            <Scroll className="w-3.5 h-3.5 text-amber-600" />
            <span>Official Travel Passport</span>
          </div>
          <h1 className="font-serif font-black text-3xl sm:text-5xl text-stone-900 tracking-tight">Digital Passport</h1>
          <p className="text-stone-600 text-sm mt-1 font-serif italic">Stamps, entry visas, and certified records of your wanderings.</p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
            disabled={currentPage === 0}
            className="p-2 rounded-full border border-stone-300 bg-white hover:bg-stone-100 disabled:opacity-30"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-xs font-mono font-bold text-stone-700">
            Page {currentPage + 1} of {trips.length}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(trips.length - 1, p + 1))}
            disabled={currentPage === trips.length - 1}
            className="p-2 rounded-full border border-stone-300 bg-white hover:bg-stone-100 disabled:opacity-30"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Passport Book Spread */}
      {activeTrip && (
        <div className="bg-[#FAF3E0] rounded-3xl p-6 sm:p-10 border-4 border-[#8B5A2B]/40 shadow-2xl relative overflow-hidden">
          {/* Passport Watermark Pattern */}
          <div className="absolute inset-0 opacity-5 pointer-events-none flex items-center justify-center">
            <Award className="w-96 h-96 text-stone-900" />
          </div>

          <div className="relative z-10 grid gap-8 md:grid-cols-2">
            {/* Left Page: Identification & Photo */}
            <div className="border-r-0 md:border-r border-dashed border-[#8B5A2B]/30 pr-0 md:pr-8 space-y-4">
              <div className="flex items-center justify-between border-b border-[#8B5A2B]/20 pb-2">
                <span className="font-serif font-black text-sm tracking-widest text-[#5C3A21] uppercase">PASSPORT • REISEPASS</span>
                <span className="font-mono text-xs font-bold text-[#8B5A2B]">TRIP #{currentPage + 1}</span>
              </div>

              <div className="aspect-[4/3] rounded-lg overflow-hidden border-2 border-[#8B5A2B]/40 shadow-md">
                <img src={activeTrip.coverPhoto} alt={activeTrip.title} className="w-full h-full object-cover" />
              </div>

              <div className="space-y-2 text-xs font-mono">
                <div>
                  <span className="text-[10px] text-[#8B5A2B] uppercase block">DESTINATION</span>
                  <span className="font-bold text-base text-stone-900 font-serif">{activeTrip.destination}</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-[10px] text-[#8B5A2B] uppercase block">DATES</span>
                    <span className="font-bold text-stone-900">{activeTrip.dates.start}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#8B5A2B] uppercase block">DISTANCE</span>
                    <span className="font-bold text-stone-900">{activeTrip.distanceKm} KM</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Page: Ink Stamps Collection */}
            <div className="space-y-4 pl-0 md:pl-2">
              <div className="flex items-center justify-between border-b border-[#8B5A2B]/20 pb-2">
                <span className="font-serif font-black text-sm tracking-widest text-[#5C3A21] uppercase">VISAS & ENTRY STAMPS</span>
                <span className="font-mono text-xs text-[#8B5A2B]">{passportStamps.length} Stamps</span>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                {passportStamps.map((stamp: PassportStamp) => (
                  <div
                    key={stamp.id}
                    style={{ borderColor: stamp.color, color: stamp.color }}
                    className="p-3 border-2 border-dashed rounded-xl opacity-85 rotate-[-4deg] text-center space-y-0.5 mix-blend-multiply shadow-xs"
                  >
                    <div className="text-xl">{stamp.flag}</div>
                    <div className="font-mono text-[10px] font-black uppercase tracking-wider">{stamp.country}</div>
                    <div className="font-serif font-black text-xs uppercase">{stamp.city}</div>
                    <div className="font-mono text-[9px] opacity-75">{stamp.date} • ADMITTED</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
