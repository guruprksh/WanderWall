import React, { useState } from 'react';
import { Plus, MapPin, Sun, Utensils } from 'lucide-react';
import { useTravelStore } from '../../store/travelStore';

interface Props {
  tripId: string;
}

export const TripDiary: React.FC<Props> = ({ tripId }) => {
  const { diaryEntries, addDiaryEntry } = useTravelStore();
  const [showNew, setShowNew] = useState(false);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [location, setLocation] = useState('');
  const [weather, setWeather] = useState('☀️ 26°C');
  const [mood, setMood] = useState('✨ Inspired');

  const entries = diaryEntries.filter((e) => e.tripId === tripId);

  const handleSave = () => {
    if (!title.trim() || !text.trim()) return;
    addDiaryEntry({
      tripId,
      date: new Date().toISOString().slice(0, 10),
      title: title.trim(),
      text: text.trim(),
      location: location || 'Destination',
      weather,
      mood,
      photos: [],
      placesVisited: [],
      foodHighlights: [],
    });
    setTitle('');
    setText('');
    setShowNew(false);
  };

  return (
    <div className="max-w-3xl mx-auto py-6 px-4 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-serif font-black text-2xl text-stone-900">Personal Travel Diary</h2>
          <p className="text-stone-500 text-xs">Unfiltered thoughts, reflections, and stories</p>
        </div>
        <button
          onClick={() => setShowNew(true)}
          className="flex items-center space-x-1.5 px-4 py-2 bg-stone-900 text-white rounded-full text-xs font-semibold hover:bg-stone-800 shadow"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Write Entry</span>
        </button>
      </div>

      {showNew && (
        <div className="bg-[#FAF7F2] p-5 rounded-2xl border border-stone-300 shadow-md space-y-3">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Entry Title (e.g. Lost in the back alleys of Venice)"
            className="w-full px-3 py-2 rounded-lg border border-stone-300 font-serif font-bold text-base bg-white"
          />
          <div className="grid grid-cols-3 gap-2 text-xs">
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Location"
              className="px-3 py-1.5 rounded-lg border border-stone-300 bg-white"
            />
            <input
              type="text"
              value={weather}
              onChange={(e) => setWeather(e.target.value)}
              placeholder="Weather (e.g. ☀️ 25°C)"
              className="px-3 py-1.5 rounded-lg border border-stone-300 bg-white"
            />
            <input
              type="text"
              value={mood}
              onChange={(e) => setMood(e.target.value)}
              placeholder="Mood (e.g. ✨ Grateful)"
              className="px-3 py-1.5 rounded-lg border border-stone-300 bg-white"
            />
          </div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write freely about today's adventures, tastes, and unexpected moments..."
            rows={5}
            className="w-full px-3 py-2 rounded-lg border border-stone-300 text-sm bg-white resize-none"
          />
          <div className="flex justify-end space-x-2">
            <button onClick={() => setShowNew(false)} className="px-3 py-1.5 text-xs text-stone-500">Cancel</button>
            <button onClick={handleSave} className="px-4 py-1.5 bg-stone-900 text-white rounded-lg text-xs font-semibold">Publish Entry</button>
          </div>
        </div>
      )}

      {/* Entries */}
      <div className="space-y-6">
        {entries.map((entry) => (
          <article key={entry.id} className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-100 pb-3">
              <div>
                <span className="text-[11px] font-mono text-stone-600 block">{entry.date}</span>
                <h3 className="font-serif font-black text-xl text-stone-900 mt-0.5">{entry.title}</h3>
              </div>
              <div className="flex items-center space-x-2 text-xs text-stone-600">
                <span className="flex items-center space-x-1 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200/60">
                  <MapPin className="w-3 h-3 text-rose-500" />
                  <span>{entry.location}</span>
                </span>
                <span className="flex items-center space-x-1 bg-stone-100 px-2 py-0.5 rounded-full">
                  <Sun className="w-3 h-3 text-amber-500" />
                  <span>{entry.weather}</span>
                </span>
                <span className="bg-rose-50 text-rose-700 px-2 py-0.5 rounded-full text-[11px]">
                  {entry.mood}
                </span>
              </div>
            </div>

            <p className="text-stone-700 leading-relaxed text-sm whitespace-pre-wrap font-serif">
              {entry.text}
            </p>

            {entry.foodHighlights && entry.foodHighlights.length > 0 && (
              <div className="bg-amber-50/60 p-3 rounded-xl border border-amber-100 flex items-center space-x-2 text-xs text-stone-700">
                <Utensils className="w-4 h-4 text-amber-600 shrink-0" />
                <span className="font-semibold text-stone-900">Food Highlights:</span>
                <span>{entry.foodHighlights.join(' • ')}</span>
              </div>
            )}
          </article>
        ))}
      </div>
    </div>
  );
};
