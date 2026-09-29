import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTravelStore } from '../store/travelStore';
import { StoryGeneratorModal } from '../components/story/StoryGeneratorModal';
import { AnnualStoryModal } from '../components/story/AnnualStoryModal';
import { CollectionBookModal } from '../components/story/CollectionBookModal';

export const StoriesArchivePage: React.FC = () => {
  const { stories, deleteStory } = useTravelStore();
  const navigate = useNavigate();
  const [isGeneratorOpen, setGeneratorOpen] = useState(false);
  const [isAnnualOpen, setAnnualOpen] = useState(false);
  const [isCollectionOpen, setCollectionOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F0EAD6] p-8 -mt-16 pt-24 pb-20">
      <div className="max-w-6xl mx-auto space-y-8">
        
        <header className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
          <div>
            <h1 className="text-4xl font-serif font-bold text-[#2C241E]">My Travel Stories</h1>
            <p className="text-[#5C4F43] mt-2 max-w-lg">
              Your personalized digital library of travel books, editorial pieces, and memories.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setCollectionOpen(true)}
              className="px-4 py-2 rounded-xl bg-white text-[#2C241E] border border-[#D9CEBF] text-sm font-bold shadow-sm hover:bg-[#F5EDE0] transition"
            >
              📚 Collection Book
            </button>
            <button
              onClick={() => setAnnualOpen(true)}
              className="px-4 py-2 rounded-xl bg-white text-[#2C241E] border border-[#D9CEBF] text-sm font-bold shadow-sm hover:bg-[#F5EDE0] transition"
            >
              🗓️ Yearly Book
            </button>
            <button
              onClick={() => setGeneratorOpen(true)}
              className="px-5 py-2.5 rounded-xl bg-amber-600 text-white text-sm font-bold shadow-md hover:bg-amber-700 transition"
            >
              ✨ Create Story
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 pt-8">
          {stories.map((story) => (
            <div
              key={story.id}
              onClick={() => navigate(`/story/${story.id}`)}
              className="group cursor-pointer perspective-1000 transform transition-transform hover:-translate-y-2 relative"
            >
              {/* DELETE BUTTON */}
              <button
                onClick={(e) => { e.stopPropagation(); deleteStory(story.id); }}
                className="absolute -top-3 -right-3 z-20 w-8 h-8 rounded-full bg-red-100 text-red-600 shadow border border-red-200 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center font-bold"
              >
                ✕
              </button>

              <div className="relative w-full aspect-[2/3] rounded-r-xl rounded-l-md shadow-2xl transition-all duration-300 group-hover:shadow-3xl overflow-hidden preserve-3d group-hover:rotate-y-[-10deg]">
                {/* Book Spine Edge */}
                <div className="absolute top-0 bottom-0 left-0 w-[4%] bg-gradient-to-r from-black/20 to-black/5 z-10" />
                
                {/* Leather/Cloth binding based on style */}
                <div className={`absolute inset-0 bg-cover bg-center ${
                  story.style === 'magazine' ? 'bg-zinc-900' :
                  story.style === 'diary' ? 'bg-[#988165]' :
                  story.style === 'luxury' ? 'bg-[#1a1a1a]' :
                  'bg-amber-800'
                }`}>
                  <img
                    src={story.coverPhoto}
                    alt={story.title}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity mix-blend-overlay"
                  />
                </div>
                
                <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/70 p-5 flex flex-col justify-end">
                  <div className="transform translate-z-[10px]">
                    <span className="inline-block px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider mb-2 bg-black/40 text-white backdrop-blur-sm">
                      {story.isYearly ? 'Annual Edition' : story.versionType}
                    </span>
                    <h2 className="text-xl font-serif font-bold text-white leading-tight drop-shadow-md">
                      {story.title}
                    </h2>
                    <p className="text-white/80 text-xs mt-1 drop-shadow-sm font-medium">
                      {story.destination}
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-4 px-1">
                <p className="text-[11px] font-bold text-[#7A6B5D] uppercase tracking-wider">{story.year}</p>
                <h3 className="text-sm font-bold text-[#2C241E] truncate">{story.title}</h3>
                <p className="text-xs text-[#5C4F43] truncate">{story.pages.length} Pages • {story.style}</p>
              </div>
            </div>
          ))}

          {stories.length === 0 && (
            <div className="col-span-full py-20 flex flex-col items-center justify-center text-center text-[#7A6B5D]">
              <span className="text-4xl mb-4 opacity-50">📚</span>
              <p className="font-serif text-xl italic mb-2">Your library is currently empty.</p>
              <p className="text-sm font-medium max-w-sm">Turn one of your past trips into a beautiful editorial travel story.</p>
            </div>
          )}
        </div>
      </div>

      <StoryGeneratorModal isOpen={isGeneratorOpen} onClose={() => setGeneratorOpen(false)} />
      <AnnualStoryModal isOpen={isAnnualOpen} onClose={() => setAnnualOpen(false)} />
      <CollectionBookModal isOpen={isCollectionOpen} onClose={() => setCollectionOpen(false)} />
    </div>
  );
};
