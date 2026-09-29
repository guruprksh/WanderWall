import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { HomeWall } from './pages/HomeWall';
import { TripsListPage } from './pages/TripsListPage';
import { TripDetailPage } from './pages/TripDetailPage';
import { WorldMapPage } from './pages/WorldMapPage';
import { MemoriesPage } from './pages/MemoriesPage';
import { WishlistPage } from './pages/WishlistPage';
import { PassportPage } from './pages/PassportPage';
import { MuseumPage } from './pages/MuseumPage';
import { StatsPage } from './pages/StatsPage';
import { StoriesArchivePage } from './pages/StoriesArchivePage';
import { StoryViewPage } from './pages/StoryViewPage';
import { PrintPreviewPage } from './pages/PrintPreviewPage';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#F7F4EE] flex flex-col font-sans text-stone-900 selection:bg-amber-200 selection:text-amber-900">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomeWall />} />
            <Route path="/trips" element={<TripsListPage />} />
            <Route path="/trip/:tripId" element={<TripDetailPage />} />
            <Route path="/trip/:tripId/:tab" element={<TripDetailPage />} />
            <Route path="/map" element={<WorldMapPage />} />
            <Route path="/memories" element={<MemoriesPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/passport" element={<PassportPage />} />
            <Route path="/museum" element={<MuseumPage />} />
            <Route path="/stats" element={<StatsPage />} />
            <Route path="/stories" element={<StoriesArchivePage />} />
            <Route path="/story/:storyId" element={<StoryViewPage />} />
            <Route path="/print/:storyId" element={<PrintPreviewPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;
