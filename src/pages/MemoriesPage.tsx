import React, { useState } from 'react';
import { Heart, Plus } from 'lucide-react';
import { useTravelStore } from '../store/travelStore';
import { MemoryCard } from '../components/cards/MemoryCard';
import { MemoryItemContent } from '../types/travel';

export const MemoriesPage: React.FC = () => {
  const { canvasItems, trips, scrapbookMode, addCanvasItem } = useTravelStore();
  const [selectedCat, setSelectedCat] = useState<string>('All');

  const memoryItems = canvasItems.filter((i) => i.type === 'memory');

  const categories = [
    'All',
    'Best Meal',
    'Best View',
    'Hidden Gem',
    'Unexpected Adventure',
    'Best Coffee',
    'Favourite Hotel',
    'Most Beautiful Place',
    'Travel Tip',
  ];

  const filtered = selectedCat === 'All'
    ? memoryItems
    : memoryItems.filter((i) => (i.content as MemoryItemContent).category === selectedCat);

  const handleQuickAdd = () => {
    const trip = trips[0];
    if (!trip) return;
    const title = prompt('Memory title (e.g. Best Gelato in Rome):') || 'Secret Spot';
    const desc = prompt('Short note about this memory:') || 'Unforgettable moment.';
    addCanvasItem({
      tripId: trip.id,
      type: 'memory',
      x: 120,
      y: 120,
      width: 260,
      rotation: 2,
      content: {
        category: 'Best Meal',
        title,
        description: desc,
        location: trip.destination,
        emoji: '🍝',
        rating: 5,
      },
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-6">
        <div>
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-900 text-xs font-semibold mb-2">
            <Heart className="w-3.5 h-3.5 text-rose-600 fill-rose-600" />
            <span>Highlights & Memories</span>
          </div>
          <h1 className="font-serif font-black text-3xl sm:text-5xl text-stone-900 tracking-tight">Memories Vault</h1>
          <p className="text-stone-600 text-sm mt-1 font-serif italic">The highlights, meals, sunsets, and unscripted moments.</p>
        </div>
        <button
          onClick={handleQuickAdd}
          className="flex items-center space-x-1.5 px-4 py-2 bg-stone-900 text-white rounded-full text-xs font-semibold hover:bg-stone-800 shadow"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Memory</span>
        </button>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCat(cat)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCat === cat
                ? 'bg-amber-600 text-white shadow-sm'
                : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-100'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid of memory cards */}
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filtered.map((item) => (
          <div key={item.id} className="flex justify-center">
            <MemoryCard content={item.content as MemoryItemContent} mode={scrapbookMode} />
          </div>
        ))}
      </div>
    </div>
  );
};
