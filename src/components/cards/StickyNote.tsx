import React from 'react';
import { NoteItemContent, ScrapbookMode } from '../../types/travel';

interface Props {
  content: NoteItemContent;
  mode: ScrapbookMode;
  isSelected?: boolean;
}

export const StickyNote: React.FC<Props> = ({ content, mode, isSelected }) => {
  const isPhysical = mode === 'physical';

  const getColorClasses = () => {
    switch (content.color) {
      case 'pink': return 'bg-rose-100 border-rose-200 text-rose-950';
      case 'blue': return 'bg-sky-100 border-sky-200 text-sky-950';
      case 'green': return 'bg-emerald-100 border-emerald-200 text-emerald-950';
      case 'kraft': return 'bg-[#EBDDC3] border-[#D9C4A1] text-amber-950';
      default: return 'bg-amber-100 border-amber-200 text-amber-950';
    }
  };

  return (
    <div
      className={`relative w-48 p-4 rounded shadow-md border transition-all select-none ${getColorClasses()} ${
        isSelected ? 'ring-2 ring-amber-500 ring-offset-2' : ''
      }`}
    >
      {/* Pushpin */}
      {isPhysical && (
        <div className="pushpin pushpin-red -top-2.5 left-1/2 -translate-x-1/2 pointer-events-none" />
      )}

      <p className="font-handwriting text-sm leading-snug pt-1 whitespace-pre-wrap">
        {content.text}
      </p>
    </div>
  );
};
