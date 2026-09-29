import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTravelStore } from '../../store/travelStore';
import { generateAnnualTravelStory } from '../../utils/annualStoryHelper';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const AnnualStoryModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { trips, addStory } = useTravelStore();
  const [selectedYear, setSelectedYear] = useState<number>(2026);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const years = Array.from(new Set(trips.map((t) => t.year))).sort((a, b) => b - a);
  const matchingTrips = trips.filter((t) => t.year === selectedYear);

  const handleGenerate = () => {
    setLoading(true);
    setTimeout(() => {
      const photos = matchingTrips.flatMap((t) => t.photos || [t.coverPhoto]);
      const story = generateAnnualTravelStory(selectedYear, matchingTrips, photos);
      const id = addStory(story);
      setLoading(false);
      onClose();
      navigate(`/story/${id}`);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#FAF7F2] text-[#2C241E] rounded-3xl max-w-md w-full shadow-2xl border border-[#D9CEBF] p-6 space-y-5">
        <div>
          <h2 className="text-xl font-serif font-bold text-[#2C241E]">Create Yearly Travel Book</h2>
          <p className="text-xs text-[#7A6B5D] mt-1">Combine an entire year of adventures into a single retrospective.</p>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#7A6B5D] mb-1.5">
            Select Year
          </label>
          <div className="flex gap-2">
            {(years.length > 0 ? years : [2026]).map((y) => (
              <button
                key={y}
                type="button"
                onClick={() => setSelectedYear(y)}
                className={`flex-1 py-2 rounded-xl text-sm font-bold border transition ${
                  selectedYear === y
                    ? 'border-amber-600 bg-amber-50 text-amber-900'
                    : 'border-[#E8DEC8] bg-white text-[#7A6B5D]'
                }`}
              >
                {y}
              </button>
            ))}
          </div>
        </div>

        <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-200/60 text-xs text-amber-950 space-y-1">
          <p className="font-bold">Summary for {selectedYear}:</p>
          <p>{matchingTrips.length} Trips found ({matchingTrips.map(t => t.destination).join(', ') || 'No trips recorded yet'})</p>
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-bold text-[#7A6B5D] hover:bg-[#E8DEC8]"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleGenerate}
            disabled={loading || matchingTrips.length === 0}
            className="px-5 py-2 rounded-xl text-xs font-bold bg-amber-600 text-white hover:bg-amber-700 shadow disabled:opacity-50"
          >
            {loading ? 'Creating...' : '✨ Generate Book'}
          </button>
        </div>
      </div>
    </div>
  );
};
