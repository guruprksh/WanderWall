import React from 'react';
import { StickerItemContent } from '../../types/travel';

interface Props {
  content: StickerItemContent;
  isSelected?: boolean;
}

export const StickerItem: React.FC<Props> = ({ content, isSelected }) => {
  return (
    <div
      className={`select-none flex flex-col items-center justify-center p-2 rounded-xl bg-white/80 backdrop-blur-xs shadow border border-stone-200/60 transition-all ${
        isSelected ? 'ring-2 ring-amber-500' : ''
      }`}
    >
      <span className="text-3xl filter drop-shadow-sm">{content.emoji}</span>
      {content.label && (
        <span className="text-[10px] font-bold text-stone-700 font-sans tracking-wide mt-1">
          {content.label}
        </span>
      )}
    </div>
  );
};
