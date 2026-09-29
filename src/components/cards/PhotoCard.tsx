import React from 'react';
import { MapPin, Calendar } from 'lucide-react';
import { PhotoItemContent, ScrapbookMode } from '../../types/travel';

interface Props {
  content: PhotoItemContent;
  mode: ScrapbookMode;
  isSelected?: boolean;
}

export const PhotoCard: React.FC<Props> = ({ content, mode, isSelected }) => {
  const isPhysical = mode === 'physical';
  const frameStyle = content.frameStyle || 'polaroid';

  return (
    <div className={`relative transition-all select-none ${isSelected ? 'ring-2 ring-amber-500 ring-offset-2' : ''}`}>
      {/* Washi tape on top if physical */}
      {isPhysical && content.hasTape && (
        <div className={`washi-tape ${content.tapeColor ? `washi-tape-${content.tapeColor}` : 'washi-tape-coral'} -top-3 left-1/2 -translate-x-1/2 w-28 -rotate-2 pointer-events-none`} />
      )}

      {/* Pushpin if physical */}
      {isPhysical && content.hasPin && (
        <div className={`pushpin ${content.pinColor ? `pushpin-${content.pinColor}` : 'pushpin-brass'} -top-2 left-1/2 -translate-x-1/2 pointer-events-none`} />
      )}

      {/* Polaroid Frame */}
      {frameStyle === 'polaroid' && (
        <div className="bg-white p-3 pb-8 rounded-sm shadow-md border border-stone-200/60 max-w-[280px]">
          <div className="aspect-[4/3] bg-stone-100 overflow-hidden rounded-xs relative">
            <img
              src={content.url}
              alt={content.caption || 'Photo'}
              className="w-full h-full object-cover pointer-events-none"
              loading="lazy"
            />
          </div>
          {content.caption && (
            <p className="mt-3 text-stone-800 font-handwriting text-base leading-tight tracking-wide text-center px-1">
              {content.caption}
            </p>
          )}
          {(content.location || content.date) && (
            <div className="mt-2 flex items-center justify-center space-x-3 text-[10px] text-stone-600 font-sans">
              {content.location && (
                <span className="flex items-center space-x-1">
                  <MapPin className="w-3 h-3 text-rose-500" />
                  <span>{content.location}</span>
                </span>
              )}
              {content.date && (
                <span className="flex items-center space-x-1">
                  <Calendar className="w-3 h-3 text-stone-500" />
                  <span>{content.date}</span>
                </span>
              )}
            </div>
          )}
        </div>
      )}

      {/* Rounded Frame */}
      {frameStyle === 'rounded' && (
        <div className="bg-white p-2.5 rounded-2xl shadow-lg border border-stone-200/80 max-w-[280px]">
          <div className="aspect-[4/3] rounded-xl overflow-hidden relative">
            <img
              src={content.url}
              alt={content.caption || 'Photo'}
              className="w-full h-full object-cover pointer-events-none"
              loading="lazy"
            />
          </div>
          {content.caption && (
            <p className="mt-2 text-stone-800 font-sans text-xs font-medium text-center">
              {content.caption}
            </p>
          )}
        </div>
      )}

      {/* Simple / Filmstrip frame */}
      {(frameStyle === 'simple' || frameStyle === 'filmstrip') && (
        <div className="bg-stone-900 p-2 rounded shadow-xl max-w-[280px]">
          <div className="aspect-[4/3] overflow-hidden rounded-xs">
            <img
              src={content.url}
              alt={content.caption || 'Photo'}
              className="w-full h-full object-cover pointer-events-none"
              loading="lazy"
            />
          </div>
          {content.caption && (
            <p className="mt-1.5 text-stone-300 font-mono text-[11px] text-center">
              {content.caption}
            </p>
          )}
        </div>
      )}
    </div>
  );
};
