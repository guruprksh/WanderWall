import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTravelStore } from '../../store/travelStore';
import { StoryStyle, WritingStyle, StoryLength, StoryVoice, StoryVersionType } from '../../types/story';
import { generateTripStory } from '../../utils/storyGenerator';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  preselectedTripId?: string;
}

export const StoryGeneratorModal: React.FC<Props> = ({ isOpen, onClose, preselectedTripId }) => {
  const navigate = useNavigate();
  const { trips, activeTripId, timelineDays, diaryEntries, canvasItems, addStory } = useTravelStore();
  const [selectedTripId, setSelectedTripId] = useState(preselectedTripId || activeTripId || trips[0]?.id || '');
  const [style, setStyle] = useState<StoryStyle>('magazine');
  const [writingStyle, setWritingStyle] = useState<WritingStyle>('storytelling');
  const [length, setLength] = useState<StoryLength>('medium');
  const [voice, setVoice] = useState<StoryVoice>('first_person');
  const [versionType, setVersionType] = useState<StoryVersionType>('full');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');

  if (!isOpen) return null;
  const currentTrip = trips.find((t) => t.id === selectedTripId) || trips[0];

  const handleGenerate = () => {
    if (!currentTrip) return;
    setLoading(true);
    setStatus('Analyzing trip data & photos...');
    setTimeout(() => {
      const story = generateTripStory({
        trip: currentTrip,
        timelineEvents: timelineDays.flatMap((td) => td.events),
        diaryEntries,
        canvasItems,
        style,
        writingStyle,
        length,
        voice,
        versionType,
      });
      const id = addStory(story);
      setLoading(false);
      onClose();
      navigate(`/story/${id}`);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-[#FAF7F2] text-[#2C241E] rounded-3xl max-w-lg w-full max-h-[90vh] flex flex-col shadow-2xl border border-[#D9CEBF] overflow-hidden">
        <div className="px-5 py-4 border-b border-[#E8DEC8] flex items-center justify-between bg-[#F5EDE0]">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-amber-600/10 text-amber-800 flex items-center justify-center text-base">✨</span>
            <div>
              <h2 className="text-base font-serif font-bold text-[#2C241E]">Turn My Trip into a Story</h2>
              <p className="text-[11px] text-[#7A6B5D]">AI-powered editorial storybook from your actual travel data</p>
            </div>
          </div>
          <button onClick={onClose} disabled={loading} className="w-7 h-7 rounded-full flex items-center justify-center text-[#7A6B5D] hover:bg-[#E8DEC8]">✕</button>
        </div>

        <div className="p-5 overflow-y-auto flex-1 space-y-4 text-xs">
          {loading ? (
            <div className="py-12 flex flex-col items-center justify-center text-center space-y-3">
              <div className="w-12 h-12 rounded-full border-4 border-amber-200 border-t-amber-600 animate-spin flex items-center justify-center text-lg">✨</div>
              <h3 className="font-serif font-bold text-[#2C241E]">Generating Travel Story</h3>
              <p className="text-[11px] text-amber-800 font-medium">{status}</p>
            </div>
          ) : (
            <>
              <div>
                <label className="block font-bold uppercase tracking-wider text-[#7A6B5D] mb-1">Select Trip</label>
                <select
                  value={selectedTripId}
                  onChange={(e) => setSelectedTripId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#D9CEBF] bg-white font-medium"
                >
                  {trips.map((t) => (
                    <option key={t.id} value={t.id}>{t.title} ({t.destination} · {t.year})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-[#7A6B5D] mb-1">Story Style</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'magazine', name: 'Travel Magazine', icon: '📰' },
                    { id: 'diary', name: 'Personal Diary', icon: '📔' },
                    { id: 'luxury', name: 'Luxury Travel', icon: '✨' },
                    { id: 'adventure', name: 'Adventure Journal', icon: '🧭' },
                    { id: 'polaroid', name: 'Polaroid Scrapbook', icon: '📸' },
                    { id: 'cinematic', name: 'Cinematic', icon: '🎬' },
                  ].map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setStyle(s.id as StoryStyle)}
                      className={`p-2 rounded-xl border text-left transition-all ${
                        style === s.id ? 'border-amber-600 bg-amber-50 ring-1 ring-amber-600' : 'border-[#E8DEC8] bg-white'
                      }`}
                    >
                      <div className="text-base mb-0.5">{s.icon}</div>
                      <div className="font-bold text-[#2C241E]">{s.name}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#F0E6D2] border border-[#E0D4BE] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#5C4F43]">AI Writing Controls</span>
                  <span className="text-[9px] bg-amber-200 text-amber-900 px-1.5 py-0.5 rounded font-medium">Verified data only</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block text-[9px] uppercase font-bold text-[#7A6B5D] mb-0.5">Tone</label>
                    <select
                      value={writingStyle}
                      onChange={(e) => setWritingStyle(e.target.value as WritingStyle)}
                      className="w-full px-2 py-1 rounded bg-white border border-[#D9CEBF]"
                    >
                      <option value="storytelling">Storytelling</option>
                      <option value="casual">Casual</option>
                      <option value="funny">Funnier</option>
                      <option value="emotional">Emotional</option>
                      <option value="magazine">Magazine</option>
                      <option value="minimal">Minimal</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[9px] uppercase font-bold text-[#7A6B5D] mb-0.5">Length</label>
                    <select
                      value={length}
                      onChange={(e) => setLength(e.target.value as StoryLength)}
                      className="w-full px-2 py-1 rounded bg-white border border-[#D9CEBF]"
                    >
                      <option value="short">Short</option>
                      <option value="medium">Medium</option>
                      <option value="detailed">Detailed</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[9px] uppercase font-bold text-[#7A6B5D] mb-0.5">Voice</label>
                    <select
                      value={voice}
                      onChange={(e) => setVoice(e.target.value as StoryVoice)}
                      className="w-full px-2 py-1 rounded bg-white border border-[#D9CEBF]"
                    >
                      <option value="first_person">First person (I/We)</option>
                      <option value="third_person">Third person</option>
                      <option value="neutral">Neutral</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-[#7A6B5D] mb-1">Version Format</label>
                <div className="grid grid-cols-2 gap-1.5">
                  {[
                    { id: 'full', label: 'Full Travel Story' },
                    { id: 'instagram', label: 'Instagram Carousel' },
                    { id: 'short', label: 'Short Story' },
                    { id: 'printable', label: 'Printable Book' },
                  ].map((v) => (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => setVersionType(v.id as StoryVersionType)}
                      className={`p-1.5 rounded-lg border text-left font-medium ${
                        versionType === v.id ? 'border-amber-600 bg-amber-50 text-amber-900 font-bold' : 'border-[#E8DEC8] bg-white'
                      }`}
                    >
                      {v.label}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {!loading && (
          <div className="px-5 py-3 border-t border-[#E8DEC8] flex items-center justify-between bg-[#F5EDE0]">
            <span className="text-[11px] text-[#7A6B5D]">{currentTrip?.destination}</span>
            <div className="flex items-center gap-2">
              <button type="button" onClick={onClose} className="px-3 py-1.5 font-bold text-[#7A6B5D]">Cancel</button>
              <button
                type="button"
                onClick={handleGenerate}
                className="px-4 py-2 rounded-xl font-bold bg-amber-600 text-white hover:bg-amber-700 shadow flex items-center gap-1"
              >
                <span>✨ Generate Story</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
