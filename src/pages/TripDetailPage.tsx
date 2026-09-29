import React, { useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useTravelStore } from '../store/travelStore';
import { TripHeader } from '../components/trip/TripHeader';
import { ScrapbookCanvas } from '../components/canvas/ScrapbookCanvas';
import { TripTimeline } from '../components/trip/TripTimeline';
import { TripMap } from '../components/trip/TripMap';
import { TripDiary } from '../components/trip/TripDiary';
import { TripMoodboard } from '../components/trip/TripMoodboard';
import { TripDocuments } from '../components/trip/TripDocuments';

export const TripDetailPage: React.FC = () => {
  const { tripId, tab } = useParams<{ tripId: string; tab?: string }>();
  const { trips } = useTravelStore();
  const [activeTab, setActiveTab] = useState(tab || 'canvas');

  const trip = trips.find((t) => t.id === tripId);

  if (!trip) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-[#F7F4EE] flex flex-col">
      <TripHeader trip={trip} activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1 p-4 md:p-6">
        {activeTab === 'canvas' && <ScrapbookCanvas tripId={trip.id} />}
        {activeTab === 'timeline' && <TripTimeline tripId={trip.id} />}
        {activeTab === 'map' && <TripMap trip={trip} />}
        {activeTab === 'diary' && <TripDiary tripId={trip.id} />}
        {activeTab === 'moodboard' && <TripMoodboard tripId={trip.id} />}
        {activeTab === 'documents' && <TripDocuments tripId={trip.id} />}
      </main>
    </div>
  );
};
