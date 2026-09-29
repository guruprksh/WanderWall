import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTravelStore } from '../store/travelStore';
import { StoryPageRenderer } from '../components/story/StoryPageRenderer';
import { StoryEditorModal } from '../components/story/StoryEditorModal';
import { SocialShareModal } from '../components/story/SocialShareModal';
import { PrintBookModal } from '../components/story/PrintBookModal';

export const StoryViewPage: React.FC = () => {
  const { storyId } = useParams<{ storyId: string }>();
  const navigate = useNavigate();
  const { stories, updateStory } = useTravelStore();

  const [currentSpread, setCurrentSpread] = useState(0);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isPrintOpen, setIsPrintOpen] = useState(false);

  const story = stories.find((s) => s.id === storyId) || stories[0];

  if (!story) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-[#F0EAD6]">
        <h2 className="text-xl font-serif font-bold text-[#2C241E] mb-2">Story Not Found</h2>
        <button onClick={() => navigate('/stories')} className="px-4 py-2 bg-amber-600 text-white rounded-xl font-bold text-xs">
          Return to My Travel Stories
        </button>
      </div>
    );
  }

  const totalPages = story.pages.length;
  const leftPageIdx = currentSpread === 0 ? 0 : (currentSpread - 1) * 2 + 1;
  const rightPageIdx = currentSpread === 0 ? null : (currentSpread - 1) * 2 + 2;
  const leftPage = story.pages[leftPageIdx];
  const rightPage = rightPageIdx !== null && rightPageIdx < totalPages ? story.pages[rightPageIdx] : null;
  const maxSpreads = Math.ceil((totalPages - 1) / 2) + 1;

  const handleNext = () => {
    if (currentSpread < maxSpreads - 1) setCurrentSpread(currentSpread + 1);
  };
  const handlePrev = () => {
    if (currentSpread > 0) setCurrentSpread(currentSpread - 1);
  };

  return (
    <div className="min-h-screen bg-[#241E19] text-[#FAF7F2] flex flex-col justify-between selection:bg-amber-600 selection:text-white">
      {/* Top Navbar */}
      <div className="px-5 py-3 border-b border-stone-800 bg-[#1A1612]/90 backdrop-blur-md flex items-center justify-between z-20">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/stories')}
            className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-xs font-bold text-stone-300 transition"
          >
            ← Stories
          </button>
          <div className="hidden sm:block border-l border-stone-700 pl-3">
            <h1 className="text-sm font-serif font-bold text-white truncate max-w-xs">{story.title}</h1>
            <p className="text-[10px] text-stone-400">{story.destination} • {story.dates}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={story.style}
            onChange={(e) => updateStory(story.id, { style: e.target.value as any })}
            className="text-xs bg-stone-800 text-stone-200 border border-stone-700 rounded-lg px-2 py-1.5 focus:outline-none"
          >
            <option value="magazine">Magazine</option>
            <option value="diary">Diary</option>
            <option value="luxury">Luxury</option>
            <option value="adventure">Adventure</option>
            <option value="polaroid">Polaroid</option>
            <option value="cinematic">Cinematic</option>
          </select>

          <button onClick={() => setIsEditorOpen(true)} className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-xs font-bold text-stone-200">
            ✍️ Studio
          </button>
          <button onClick={() => setIsShareOpen(true)} className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-xs font-bold text-stone-200">
            📱 Share
          </button>
          <button onClick={() => setIsPrintOpen(true)} className="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-xs font-bold text-white shadow">
            🖨️ Print
          </button>
        </div>
      </div>

      {/* Main Book Reader Canvas */}
      <div className="flex-1 flex items-center justify-center p-4 md:p-8 overflow-hidden relative">
        <button
          onClick={handlePrev}
          disabled={currentSpread === 0}
          className="absolute left-4 md:left-8 z-30 w-11 h-11 rounded-full bg-stone-800/80 hover:bg-stone-700 text-white flex items-center justify-center shadow-2xl backdrop-blur disabled:opacity-20 transition text-lg font-bold"
        >
          ‹
        </button>

        {/* Book Container with Central Spine Shadow */}
        <div className="relative w-full max-w-5xl aspect-[1.4/1] max-h-[76vh] flex rounded-2xl shadow-2xl overflow-hidden border border-stone-800 bg-[#F9F7F2]">
          <div className="absolute top-0 bottom-0 left-1/2 -ml-3 w-6 bg-gradient-to-r from-black/25 via-black/40 to-black/25 z-10 pointer-events-none hidden md:block" />

          {/* Left Page */}
          <div className="flex-1 h-full border-r border-black/5 overflow-hidden">
            {leftPage && <StoryPageRenderer page={leftPage} style={story.style} />}
          </div>

          {/* Right Page */}
          <div className="flex-1 h-full overflow-hidden hidden md:block">
            {rightPage ? (
              <StoryPageRenderer page={rightPage} style={story.style} />
            ) : (
              <div className="w-full h-full bg-[#F5EDE0] flex items-center justify-center text-xs text-stone-400 italic font-serif">
                End of Travelogue
              </div>
            )}
          </div>
        </div>

        <button
          onClick={handleNext}
          disabled={currentSpread >= maxSpreads - 1}
          className="absolute right-4 md:right-8 z-30 w-11 h-11 rounded-full bg-stone-800/80 hover:bg-stone-700 text-white flex items-center justify-center shadow-2xl backdrop-blur disabled:opacity-20 transition text-lg font-bold"
        >
          ›
        </button>
      </div>

      {/* Bottom Spread Navigator */}
      <div className="px-5 py-2.5 bg-[#1A1612]/90 border-t border-stone-800 flex items-center justify-between text-xs text-stone-400">
        <span className="font-bold text-stone-300">Spread {currentSpread + 1} of {maxSpreads}</span>
        <div className="flex items-center gap-1.5">
          {Array.from({ length: maxSpreads }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSpread(i)}
              className={`h-1.5 rounded-full transition-all ${currentSpread === i ? 'bg-amber-500 w-5' : 'bg-stone-700 w-1.5 hover:bg-stone-500'}`}
            />
          ))}
        </div>
        <span className="hidden sm:inline">Use arrow buttons to flip pages</span>
      </div>

      {/* Modals */}
      <StoryEditorModal isOpen={isEditorOpen} onClose={() => setIsEditorOpen(false)} story={story} />
      <SocialShareModal isOpen={isShareOpen} onClose={() => setIsShareOpen(false)} story={story} />
      <PrintBookModal isOpen={isPrintOpen} onClose={() => setIsPrintOpen(false)} story={story} />
    </div>
  );
};
