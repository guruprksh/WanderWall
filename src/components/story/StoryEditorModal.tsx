import React, { useState } from 'react';
import { useTravelStore } from '../../store/travelStore';
import { TravelStory, StoryPage } from '../../types/story';
import { regeneratePageContent } from '../../utils/storyGenerator';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  story: TravelStory;
}

export const StoryEditorModal: React.FC<Props> = ({ isOpen, onClose, story }) => {
  const { updateStoryPage, reorderStoryPages, deleteStoryPage, addStoryPage, trips } = useTravelStore();
  const [selectedPageIndex, setSelectedPageIndex] = useState(0);

  if (!isOpen) return null;

  const currentTrip = trips.find((t) => t.id === story.tripId);
  const photoPool = currentTrip?.photos || story.pages.flatMap((p) => p.photos);
  const currentPage = story.pages[selectedPageIndex] || story.pages[0];

  const handleRegenerateAction = (action: 'rewrite' | 'change_photos' | 'change_layout' | 'shorter' | 'funnier' | 'personal') => {
    if (!currentPage) return;
    const updated = regeneratePageContent(currentPage, action, photoPool);
    updateStoryPage(story.id, currentPage.id, updated);
  };

  const handleMovePage = (index: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= story.pages.length) return;
    const newPages = [...story.pages];
    const [moved] = newPages.splice(index, 1);
    newPages.splice(targetIdx, 0, moved);
    reorderStoryPages(story.id, newPages);
    setSelectedPageIndex(targetIdx);
  };

  const handleDeletePage = (pageId: string) => {
    if (story.pages.length <= 1) {
      alert('Story must contain at least one page.');
      return;
    }
    deleteStoryPage(story.id, pageId);
    setSelectedPageIndex(Math.max(0, selectedPageIndex - 1));
  };

  const handleAddPage = () => {
    const newPage: StoryPage = {
      id: `p-${Date.now()}`,
      pageNumber: story.pages.length + 1,
      type: 'day',
      title: `Extra Chapter`,
      subtitle: story.destination,
      content: {
        introText: 'A newly added journal entry capturing special memories.',
      },
      photos: [story.coverPhoto],
    };
    addStoryPage(story.id, newPage);
    setSelectedPageIndex(story.pages.length);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
      <div className="bg-[#FAF7F2] text-[#2C241E] rounded-3xl max-w-4xl w-full h-[88vh] shadow-2xl border border-[#D9CEBF] overflow-hidden flex flex-col">
        <div className="px-6 py-4 border-b border-[#E8DEC8] flex items-center justify-between bg-[#F5EDE0]">
          <div>
            <h2 className="text-base font-serif font-bold text-[#2C241E]">Story Studio &amp; Page Editor</h2>
            <p className="text-xs text-[#7A6B5D]">Customize narrative, replace photos &amp; use AI page tools</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center text-[#7A6B5D] hover:bg-[#E8DEC8]">✕</button>
        </div>

        <div className="flex-1 flex overflow-hidden">
          <div className="w-64 border-r border-[#E8DEC8] bg-[#F5EDE0]/50 p-4 flex flex-col justify-between overflow-y-auto">
            <div className="space-y-2">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold uppercase text-[#7A6B5D]">Pages ({story.pages.length})</span>
                <button onClick={handleAddPage} className="px-2 py-1 bg-amber-600 text-white rounded-lg text-xs font-bold hover:bg-amber-700">
                  + Add
                </button>
              </div>

              {story.pages.map((p, idx) => (
                <div
                  key={p.id}
                  onClick={() => setSelectedPageIndex(idx)}
                  className={`p-2.5 rounded-xl border text-xs cursor-pointer flex items-center justify-between transition ${
                    selectedPageIndex === idx ? 'border-amber-600 bg-amber-50 font-bold ring-1 ring-amber-600' : 'border-[#E8DEC8] bg-white'
                  }`}
                >
                  <div className="truncate flex-1 mr-2">
                    <span className="text-[10px] text-[#7A6B5D] block">P. {idx + 1} • {p.type}</span>
                    <span className="truncate">{p.title}</span>
                  </div>
                  <div className="flex items-center gap-1 opacity-60 hover:opacity-100">
                    <button onClick={(e) => { e.stopPropagation(); handleMovePage(idx, 'up'); }} disabled={idx === 0} className="hover:text-amber-600">▲</button>
                    <button onClick={(e) => { e.stopPropagation(); handleMovePage(idx, 'down'); }} disabled={idx === story.pages.length - 1} className="hover:text-amber-600">▼</button>
                    <button onClick={(e) => { e.stopPropagation(); handleDeletePage(p.id); }} className="text-red-500 hover:text-red-700 ml-1">✕</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1 p-5 overflow-y-auto space-y-4">
            {currentPage && (
              <>
                <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200/70">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-amber-900 flex items-center gap-1">
                      <span>✨</span> AI Actions for Page {selectedPageIndex + 1} ({currentPage.type.toUpperCase()})
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1 text-xs">
                    {[
                      { action: 'rewrite' as const, label: '✍️ Rewrite' },
                      { action: 'change_photos' as const, label: '🖼️ Photos' },
                      { action: 'change_layout' as const, label: '📐 Layout' },
                      { action: 'shorter' as const, label: '✂️ Shorter' },
                      { action: 'funnier' as const, label: '😄 Funnier' },
                      { action: 'personal' as const, label: '❤️ Personal' },
                    ].map((btn) => (
                      <button
                        key={btn.action}
                        type="button"
                        onClick={() => handleRegenerateAction(btn.action)}
                        className="px-2 py-1 rounded bg-white border border-amber-300 text-amber-900 font-medium hover:bg-amber-100 shadow-sm"
                      >
                        {btn.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block font-bold text-[#5C4F43] mb-1">Page Title</label>
                    <input
                      type="text"
                      value={currentPage.title}
                      onChange={(e) => updateStoryPage(story.id, currentPage.id, { title: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-xl border border-[#D9CEBF] bg-white font-medium"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-[#5C4F43] mb-1">Subtitle</label>
                    <input
                      type="text"
                      value={currentPage.subtitle || ''}
                      onChange={(e) => updateStoryPage(story.id, currentPage.id, { subtitle: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-xl border border-[#D9CEBF] bg-white font-medium"
                    />
                  </div>

                  {currentPage.content.introText !== undefined && (
                    <div>
                      <label className="block font-bold text-[#5C4F43] mb-1">Text Narrative</label>
                      <textarea
                        rows={2}
                        value={currentPage.content.introText}
                        onChange={(e) => updateStoryPage(story.id, currentPage.id, { content: { introText: e.target.value } })}
                        className="w-full px-3 py-1.5 rounded-xl border border-[#D9CEBF] bg-white font-medium"
                      />
                    </div>
                  )}

                  {currentPage.content.dayNotes !== undefined && (
                    <div>
                      <label className="block font-bold text-[#5C4F43] mb-1">Day Reflections</label>
                      <textarea
                        rows={2}
                        value={currentPage.content.dayNotes}
                        onChange={(e) => updateStoryPage(story.id, currentPage.id, { content: { dayNotes: e.target.value } })}
                        className="w-full px-3 py-1.5 rounded-xl border border-[#D9CEBF] bg-white font-medium"
                      />
                    </div>
                  )}

                  {currentPage.content.closingMessage !== undefined && (
                    <div>
                      <label className="block font-bold text-[#5C4F43] mb-1">Closing Message</label>
                      <textarea
                        rows={2}
                        value={currentPage.content.closingMessage}
                        onChange={(e) => updateStoryPage(story.id, currentPage.id, { content: { closingMessage: e.target.value } })}
                        className="w-full px-3 py-1.5 rounded-xl border border-[#D9CEBF] bg-white font-medium"
                      />
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>

        <div className="px-6 py-3 border-t border-[#E8DEC8] flex items-center justify-between bg-[#F5EDE0]">
          <span className="text-xs text-[#7A6B5D]">Changes autosaved</span>
          <button onClick={onClose} className="px-5 py-1.5 rounded-xl text-xs font-bold bg-amber-600 text-white shadow">
            Done Editing
          </button>
        </div>
      </div>
    </div>
  );
};
