import React from 'react';
import { MapPin, Star, Heart } from 'lucide-react';
import { MemoryItemContent, ScrapbookMode } from '../../types/travel';

interface Props {
  content: MemoryItemContent;
  mode: ScrapbookMode;
  isSelected?: boolean;
}

export const MemoryCard: React.FC<Props> = ({ content, mode, isSelected }) => {
  const isPhysical = mode === 'physical';

  return (
    <div
      className={`relative w-64 bg-[#FFFBF0] rounded-xl overflow-hidden shadow-md border border-amber-200/70 p-4 space-y-2.5 transition-all select-none ${
        isSelected ? 'ring-2 ring-amber-500 ring-offset-2' : ''
      }`}
    >
      {/* Stamp badge */}
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase bg-amber-200/80 text-amber-900 border border-amber-300">
          <span>{content.emoji || '✨'}</span>
          <span>{content.category}</span>
        </span>
        {content.rating && (
          <div className="flex items-center text-amber-500">
            {Array.from({ length: content.rating }).map((_, i) => (
              <Star key={i} className="w-3 h-3 fill-current" />
            ))}
          </div>
        )}
      </div>

      {content.photo && (
        <div className="h-28 w-full rounded-lg overflow-hidden border border-amber-200/60 shadow-inner">
          <img
            src={content.photo}
            alt={content.title}
            className="w-full h-full object-cover pointer-events-none"
            loading="lazy"
          />
        </div>
      )}

      <div>
        <h4 className="font-serif font-bold text-stone-900 text-sm leading-snug">{content.title}</h4>
        {content.location && (
          <div className="flex items-center space-x-1 text-stone-500 text-[10px] mt-0.5">
            <MapPin className="w-3 h-3 text-rose-500" />
            <span>{content.location}</span>
          </div>
        )}
      </div>

      <p className="text-xs text-stone-700 leading-relaxed font-handwriting text-[13px] bg-white/70 p-2 rounded border border-amber-100">
        {content.description}
      </p>

      {isPhysical && (
        <div className="flex items-center justify-end text-amber-700/60 text-[10px] italic">
          <Heart className="w-3 h-3 inline mr-1 fill-amber-300 text-amber-500" />
          <span>cherished memory</span>
        </div>
      )}
    </div>
  );
};
