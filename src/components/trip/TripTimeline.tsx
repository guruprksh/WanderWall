import React, { useState } from 'react';
import { Plus, Clock, MapPin, Coffee, Utensils, Landmark, Plane, Train, Footprints, Hotel } from 'lucide-react';
import { useTravelStore } from '../../store/travelStore';

interface Props {
  tripId: string;
}

export const TripTimeline: React.FC<Props> = ({ tripId }) => {
  const { timelineDays, addTimelineDay } = useTravelStore();
  const [showAdd, setShowAdd] = useState(false);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');

  const days = timelineDays.filter((d) => d.tripId === tripId);

  const getIcon = (type: string) => {
    switch (type) {
      case 'flight': return <Plane className="w-3.5 h-3.5 text-sky-600" />;
      case 'train': return <Train className="w-3.5 h-3.5 text-emerald-600" />;
      case 'cafe': return <Coffee className="w-3.5 h-3.5 text-amber-700" />;
      case 'food': return <Utensils className="w-3.5 h-3.5 text-orange-600" />;
      case 'museum': return <Landmark className="w-3.5 h-3.5 text-indigo-600" />;
      case 'hotel': return <Hotel className="w-3.5 h-3.5 text-rose-600" />;
      default: return <Footprints className="w-3.5 h-3.5 text-stone-600" />;
    }
  };

  const handleCreate = () => {
    if (!title.trim()) return;
    addTimelineDay({
      tripId,
      dayNumber: days.length + 1,
      date: date || new Date().toISOString().slice(0, 10),
      title: title.trim(),
      events: [{ id: `ev-${Date.now()}`, type: 'walk', title: 'Exploration & stroll', location: 'City Center' }],
    });
    setTitle('');
    setShowAdd(false);
  };

  return (
    <div className="max-w-4xl mx-auto py-6 px-4 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-serif font-black text-2xl text-stone-900">Visual Trip Timeline</h2>
          <p className="text-stone-500 text-xs">Chronological step-by-step memory of the journey</p>
        </div>
        <button
          onClick={() => setShowAdd(true)}
          className="flex items-center space-x-1.5 px-4 py-2 bg-stone-900 text-white rounded-full text-xs font-semibold shadow hover:bg-stone-800"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Day</span>
        </button>
      </div>

      {showAdd && (
        <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 flex flex-wrap gap-2 items-center">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Day Title (e.g. Venice Gondola & Sunset)"
            className="flex-1 px-3 py-1.5 rounded-lg border border-stone-300 text-xs bg-white"
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="px-3 py-1.5 rounded-lg border border-stone-300 text-xs bg-white"
          />
          <button onClick={handleCreate} className="px-4 py-1.5 bg-stone-900 text-white text-xs font-medium rounded-lg">Save</button>
          <button onClick={() => setShowAdd(false)} className="text-xs text-stone-500">Cancel</button>
        </div>
      )}

      <div className="space-y-8">
        {days.map((day) => (
          <div key={day.id} className="relative pl-8 border-l-2 border-amber-300/80 space-y-3">
            <div className="absolute -left-[15px] top-0 w-7 h-7 rounded-full bg-amber-600 text-white flex items-center justify-center font-bold text-xs shadow-md">
              D{day.dayNumber}
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-stone-900">{day.title}</h3>
              <span className="text-xs text-stone-500 font-mono">{day.date}</span>
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              {day.events.map((ev) => (
                <div key={ev.id} className="bg-white p-3 rounded-xl border border-stone-200 flex items-start space-x-3 shadow-xs">
                  <div className="p-2 rounded-lg bg-stone-100 shrink-0">{getIcon(ev.type)}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-stone-900 truncate">{ev.title}</span>
                      {ev.time && (
                        <span className="flex items-center space-x-1 text-stone-600 font-mono text-[10px]">
                          <Clock className="w-2.5 h-2.5 text-stone-500" />
                          <span>{ev.time}</span>
                        </span>
                      )}
                    </div>
                    {ev.location && (
                      <div className="flex items-center space-x-1 text-[11px] text-stone-600 mt-0.5">
                        <MapPin className="w-2.5 h-2.5 text-rose-500" />
                        <span className="truncate">{ev.location}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
