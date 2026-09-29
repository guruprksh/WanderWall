import React, { useState } from 'react';
import { Plus, Music } from 'lucide-react';
import { useTravelStore } from '../../store/travelStore';
import { MoodboardItem } from '../../types/travel';

interface Props {
  tripId: string;
}

export const TripMoodboard: React.FC<Props> = ({ tripId }) => {
  const { moodboardItems, addMoodboardItem } = useTravelStore();
  const [showAdd, setShowAdd] = useState(false);
  const [type, setType] = useState<MoodboardItem['type']>('quote');
  const [title, setTitle] = useState('');
  const [value, setValue] = useState('');
  const [subtitle, setSubtitle] = useState('');

  const items = moodboardItems.filter((i) => i.tripId === tripId);

  const handleAdd = () => {
    if (!value.trim()) return;
    addMoodboardItem({
      tripId,
      type,
      title: title || 'Mood',
      value: value.trim(),
      subtitle: subtitle || undefined,
    });
    setTitle('');
    setValue('');
    setSubtitle('');
    setShowAdd(false);
  };

  return (
    <div className="max-w-5xl mx-auto py-6 px-4 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-serif font-black text-2xl text-stone-900">Trip Moodboard</h2>
          <p className="text-stone-500 text-xs">Visual aesthetic, colors, tunes, and atmosphere</p>
        </div>
        <button
          onClick={() => setShowAdd(true)}
          className="flex items-center space-x-1.5 px-4 py-2 bg-stone-900 text-white rounded-full text-xs font-semibold hover:bg-stone-800 shadow"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Element</span>
        </button>
      </div>

      {showAdd && (
        <div className="bg-[#FAF7F2] p-5 rounded-2xl border border-stone-300 shadow-md space-y-3">
          <div className="flex gap-2">
            {(['quote', 'color', 'music', 'photo', 'food'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setType(t)}
                className={`px-3 py-1 rounded-full capitalize text-xs font-medium ${
                  type === t ? 'bg-stone-900 text-white' : 'bg-stone-200 text-stone-700'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title (e.g. Olive Branch, Sound of Waves)"
              className="px-3 py-1.5 rounded-lg border border-stone-300 bg-white"
            />
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder={type === 'color' ? 'Hex code e.g. #c65d3e' : 'Value or Quote'}
              className="px-3 py-1.5 rounded-lg border border-stone-300 bg-white"
            />
          </div>
          <input
            type="text"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            placeholder="Subtitle / Note"
            className="w-full px-3 py-1.5 rounded-lg border border-stone-300 bg-white text-xs"
          />
          <div className="flex justify-end gap-2">
            <button onClick={() => setShowAdd(false)} className="px-3 py-1 text-xs text-stone-500">Cancel</button>
            <button onClick={handleAdd} className="px-4 py-1.5 bg-stone-900 text-white text-xs font-semibold rounded-lg">Add to Moodboard</button>
          </div>
        </div>
      )}

      {/* Masonry / Grid */}
      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="break-inside-avoid bg-white rounded-2xl p-4 border border-stone-200 shadow-sm hover:shadow-md transition-shadow space-y-2.5"
          >
            {item.type === 'color' && (
              <div
                className="h-28 w-full rounded-xl shadow-inner border border-black/5"
                style={{ backgroundColor: item.value }}
              />
            )}

            {item.type === 'photo' && (
              <div className="rounded-xl overflow-hidden shadow-inner">
                <img src={item.value} alt={item.title} className="w-full object-cover max-h-48" loading="lazy" />
              </div>
            )}

            {item.type === 'quote' && (
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200/60 font-serif italic text-amber-950 text-base leading-snug">
                {item.value}
              </div>
            )}

            {item.type === 'music' && (
              <div className="p-3 bg-stone-900 text-white rounded-xl flex items-center space-x-3">
                <Music className="w-5 h-5 text-amber-400 shrink-0" />
                <div className="min-w-0">
                  <div className="text-xs font-bold truncate">{item.title}</div>
                  <div className="text-[10px] text-stone-400 truncate">{item.value}</div>
                </div>
              </div>
            )}

            <div>
              <div className="font-serif font-bold text-stone-900 text-sm">{item.title}</div>
              {item.subtitle && <p className="text-[11px] text-stone-500 mt-0.5">{item.subtitle}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
