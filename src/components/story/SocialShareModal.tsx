import React, { useState } from 'react';
import { TravelStory } from '../../types/story';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  story: TravelStory;
}

export const SocialShareModal: React.FC<Props> = ({ isOpen, onClose, story }) => {
  const [format, setFormat] = useState<'post' | 'story' | 'square'>('post');
  const [activeSlide, setActiveSlide] = useState(0);

  if (!isOpen) return null;

  const slides = [
    { title: 'Cover', label: story.title, sub: story.destination, photo: story.coverPhoto },
    { title: 'Route', label: 'Journey Map', sub: `${story.destination} Stops`, photo: story.pages[2]?.photos[0] || story.coverPhoto },
    { title: 'Best Photo', label: 'Golden Hour', sub: 'Panorama', photo: story.pages[4]?.photos[0] || story.coverPhoto },
    { title: 'Food', label: 'Gastronomy', sub: 'Local Flavors', photo: story.pages[5]?.photos[0] || story.coverPhoto },
    { title: 'Favourite Place', label: 'Courtyard', sub: 'Secret Spot', photo: story.pages[4]?.photos[1] || story.coverPhoto },
    { title: 'Best Memory', label: 'The Companions', sub: 'Laughter', photo: story.pages[6]?.photos[0] || story.coverPhoto },
    { title: 'Statistics', label: 'Metrics', sub: `${story.year} Journey`, photo: story.pages[7]?.photos[0] || story.coverPhoto },
    { title: 'Final Shot', label: 'Until Next Time', sub: 'Farewell', photo: story.pages[story.pages.length - 1]?.photos[0] || story.coverPhoto },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
      <div className="bg-[#FAF7F2] text-[#2C241E] rounded-3xl max-w-xl w-full shadow-2xl border border-[#D9CEBF] overflow-hidden flex flex-col">
        <div className="px-5 py-3 border-b border-[#E8DEC8] flex items-center justify-between bg-[#F5EDE0]">
          <div>
            <h2 className="text-sm font-serif font-bold text-[#2C241E]">Social Media Carousel &amp; Export</h2>
            <p className="text-[10px] text-[#7A6B5D]">Export 8-slide ready-to-post story carousel</p>
          </div>
          <button onClick={onClose} className="w-7 h-7 rounded-full flex items-center justify-center text-[#7A6B5D]">✕</button>
        </div>

        <div className="p-4 space-y-3">
          <div className="flex gap-2">
            {[
              { id: 'post', name: 'Post (4:5)' },
              { id: 'story', name: 'Story/Reel (9:16)' },
              { id: 'square', name: 'Square (1:1)' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setFormat(f.id as any)}
                className={`flex-1 py-1 px-2 rounded-xl text-xs font-bold border transition ${
                  format === f.id ? 'bg-amber-600 text-white border-amber-600' : 'bg-white text-[#7A6B5D] border-[#D9CEBF]'
                }`}
              >
                {f.name}
              </button>
            ))}
          </div>

          <div className="flex flex-col items-center justify-center bg-stone-900 rounded-2xl p-4">
            <div
              className={`relative ${format === 'story' ? 'aspect-[9/16] max-h-[360px]' : format === 'square' ? 'aspect-square max-h-[300px]' : 'aspect-[4/5] max-h-[330px]'} w-auto rounded-xl overflow-hidden shadow-2xl flex flex-col justify-between p-4 bg-cover bg-center`}
              style={{ backgroundImage: `url(${slides[activeSlide]?.photo})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />
              <div className="relative z-10 flex justify-between items-center text-white/90 text-[10px]">
                <span className="font-bold tracking-widest uppercase">WanderWall</span>
                <span className="bg-white/20 px-2 py-0.5 rounded">{activeSlide + 1} / 8</span>
              </div>
              <div className="relative z-10 text-white space-y-0.5">
                <span className="text-[9px] uppercase font-bold tracking-widest text-amber-300">{slides[activeSlide]?.sub}</span>
                <h3 className="text-base font-serif font-bold leading-tight drop-shadow">{slides[activeSlide]?.label}</h3>
                <p className="text-[10px] text-white/80">{story.dates}</p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 mt-3">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveSlide(idx)}
                  className={`h-1.5 rounded-full transition-all ${activeSlide === idx ? 'bg-amber-500 w-5' : 'bg-white/40 w-1.5'}`}
                />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-4 gap-1.5 text-xs">
            {slides.map((s, idx) => (
              <button
                key={idx}
                onClick={() => setActiveSlide(idx)}
                className={`p-1.5 rounded-lg border text-left truncate transition ${
                  activeSlide === idx ? 'border-amber-600 bg-amber-50 font-bold' : 'border-[#E8DEC8] bg-white text-[#7A6B5D]'
                }`}
              >
                {idx + 1}. {s.title}
              </button>
            ))}
          </div>
        </div>

        <div className="px-4 py-2.5 border-t border-[#E8DEC8] flex items-center justify-between bg-[#F5EDE0]">
          <span className="text-[10px] text-[#7A6B5D]">Format: {format.toUpperCase()}</span>
          <div className="flex gap-2">
            <button
              onClick={() => { navigator.clipboard?.writeText(window.location.href); alert('Story link copied!'); }}
              className="px-3 py-1.5 rounded-xl text-xs font-bold bg-white border border-[#D9CEBF]"
            >
              Copy Link
            </button>
            <button
              onClick={() => { alert(`Exported Slide ${activeSlide + 1} successfully!`); }}
              className="px-4 py-1.5 rounded-xl text-xs font-bold bg-amber-600 text-white shadow"
            >
              Export Slide
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
