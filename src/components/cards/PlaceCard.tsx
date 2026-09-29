import React from 'react';
import { Star, MapPin, Coffee, Utensils, Landmark, Umbrella, Trees, Building2, Compass } from 'lucide-react';
import { PlaceItemContent, ScrapbookMode } from '../../types/travel';

interface Props {
  content: PlaceItemContent;
  mode: ScrapbookMode;
  isSelected?: boolean;
}

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'restaurant': return <Utensils className="w-3.5 h-3.5 text-amber-600" />;
    case 'cafe': return <Coffee className="w-3.5 h-3.5 text-amber-700" />;
    case 'museum': return <Landmark className="w-3.5 h-3.5 text-blue-600" />;
    case 'beach': return <Umbrella className="w-3.5 h-3.5 text-cyan-600" />;
    case 'hiking': return <Trees className="w-3.5 h-3.5 text-emerald-600" />;
    case 'hotel': return <Building2 className="w-3.5 h-3.5 text-indigo-600" />;
    default: return <Compass className="w-3.5 h-3.5 text-stone-600" />;
  }
};

export const PlaceCard: React.FC<Props> = ({ content, mode, isSelected }) => {
  const isPhysical = mode === 'physical';

  return (
    <div
      className={`relative w-64 bg-[#FCFBF8] rounded-xl overflow-hidden shadow-md border border-stone-200/80 transition-all select-none ${
        isSelected ? 'ring-2 ring-amber-500 ring-offset-2' : ''
      } ${isPhysical ? 'rotate-1' : ''}`}
    >
      {/* Optional tape */}
      {isPhysical && (
        <div className="washi-tape washi-tape-sage -top-3 left-1/2 -translate-x-1/2 w-20 pointer-events-none" />
      )}

      {content.photo && (
        <div className="h-32 w-full overflow-hidden relative">
          <img
            src={content.photo}
            alt={content.name}
            className="w-full h-full object-cover pointer-events-none"
            loading="lazy"
          />
          <div className="absolute top-2 right-2 bg-stone-900/75 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center space-x-1">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <span>{content.rating}.0</span>
          </div>
        </div>
      )}

      <div className="p-3.5 space-y-1.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1 text-xs font-semibold text-stone-700 capitalize">
            {getCategoryIcon(content.category)}
            <span>{content.category}</span>
          </div>
          {content.priceLevel && (
            <span className="text-[11px] font-mono text-emerald-700 font-bold">{content.priceLevel}</span>
          )}
        </div>

        <h4 className="font-serif font-bold text-stone-900 text-sm leading-snug">{content.name}</h4>

        <div className="flex items-center space-x-1 text-stone-500 text-[11px]">
          <MapPin className="w-3 h-3 text-stone-400 shrink-0" />
          <span className="truncate">{content.location}</span>
        </div>

        {content.note && (
          <p className="text-xs text-stone-600 italic bg-amber-50/70 p-2 rounded border border-amber-200/40 font-handwriting">
            "{content.note}"
          </p>
        )}
      </div>
    </div>
  );
};
