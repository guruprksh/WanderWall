import React, { useState } from 'react';
import { Calendar, Navigation, Sun, Palette, Sparkles } from 'lucide-react';
import { Trip, CoverStyle } from '../../types/travel';
import { useTravelStore } from '../../store/travelStore';
import { StoryGeneratorModal } from '../story/StoryGeneratorModal';

interface Props {
  trip: Trip;
  activeTab: string;
  setActiveTab: (t: string) => void;
}

export const TripHeader: React.FC<Props> = ({ trip, activeTab, setActiveTab }) => {
  const { updateTrip } = useTravelStore();
  const [showStoryModal, setShowStoryModal] = useState(false);

  const cycleCoverStyle = () => {
    const styles: CoverStyle[] = ['large', 'polaroid', 'grid', 'minimal', 'scrapbook'];
    const curIdx = styles.indexOf(trip.coverStyle);
    const nextStyle = styles[(curIdx + 1) % styles.length];
    updateTrip(trip.id, { coverStyle: nextStyle });
  };

  const tabs = [
    { id: 'canvas', label: 'Canvas Wall' },
    { id: 'timeline', label: 'Timeline' },
    { id: 'map', label: 'Route & Map' },
    { id: 'diary', label: 'Diary' },
    { id: 'moodboard', label: 'Moodboard' },
    { id: 'documents', label: 'Tickets & Docs' },
  ];

  return (
    <>
      <div className="bg-[#FAF7F2] border-b border-stone-200">
        {/* Cover Banner */}
        <div className="relative h-64 md:h-80 overflow-hidden bg-stone-900">
          <img
            src={trip.coverPhoto}
            alt={trip.title}
            className="w-full h-full object-cover opacity-80 filter brightness-95"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/30 to-transparent" />

          {/* Top-right actions */}
          <div className="absolute top-4 right-4 flex items-center space-x-2 z-10">
            <button
              onClick={() => setShowStoryModal(true)}
              className="flex items-center space-x-1.5 px-3.5 py-1.5 bg-gradient-to-r from-amber-600 to-amber-700 text-white text-xs font-bold rounded-full shadow-lg hover:brightness-110 transition-all hover:scale-105"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-200" />
              <span>Turn into Story</span>
            </button>
            <button
              onClick={cycleCoverStyle}
              title="Switch Cover Design"
              className="flex items-center space-x-1.5 px-3 py-1.5 bg-stone-900/70 hover:bg-stone-900 backdrop-blur-md text-stone-200 text-xs rounded-full border border-white/20 transition-all"
            >
              <Palette className="w-3.5 h-3.5 text-amber-400" />
              <span className="capitalize">{trip.coverStyle} Style</span>
            </button>
          </div>

          {/* Cover Info */}
          <div className="absolute bottom-6 left-6 right-6 text-white max-w-4xl space-y-2">
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono tracking-wider uppercase text-amber-300">
              <span className="flex items-center space-x-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>{trip.dates.start} — {trip.dates.end}</span>
              </span>
              <span>•</span>
              <span className="flex items-center space-x-1">
                <Navigation className="w-3.5 h-3.5" />
                <span>{trip.distanceKm} km</span>
              </span>
              <span>•</span>
              <span className="flex items-center space-x-1">
                <Sun className="w-3.5 h-3.5" />
                <span>{trip.weather}</span>
              </span>
            </div>

            <h1 className="font-serif font-black text-3xl md:text-5xl tracking-tight text-white drop-shadow-md">
              {trip.title}
            </h1>

            {trip.cities && trip.cities.length > 0 && (
              <p className="text-stone-300 text-xs md:text-sm font-sans tracking-wide uppercase font-semibold">
                {trip.cities.join(' • ')}
              </p>
            )}

            <p className="text-stone-300 text-xs md:text-sm italic font-serif max-w-2xl pt-1">
              "{trip.description}"
            </p>
          </div>
        </div>

        {/* Trip Tabs Navigation */}
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center space-x-2 overflow-x-auto py-3">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'bg-amber-600 text-white shadow-md shadow-amber-900/10'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <StoryGeneratorModal
        isOpen={showStoryModal}
        onClose={() => setShowStoryModal(false)}
        preselectedTripId={trip.id}
      />
    </>
  );
};

