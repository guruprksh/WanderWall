import React from 'react';
import { StoryPage } from '../../types/story';

export const CoverBlock: React.FC<{ page: StoryPage }> = ({ page }) => (
  <div className="flex-1 flex flex-col justify-between items-center text-center">
    <div className="space-y-2">
      <span className="text-xs uppercase tracking-widest opacity-60 font-bold">
        {page.content.additionalText || 'Travelogue'}
      </span>
      <h1 className="text-3xl md:text-5xl font-bold tracking-tight">{page.title}</h1>
      <p className="text-sm opacity-75">{page.subtitle}</p>
    </div>
    {page.photos[0] && (
      <div className="w-full max-h-[60%] my-4 flex-1 rounded-2xl overflow-hidden shadow-md">
        <img src={page.photos[0]} alt="Cover" className="w-full h-full object-cover" />
      </div>
    )}
    <p className="text-xs italic opacity-60 max-w-sm">{page.content.introText}</p>
  </div>
);

export const IntroBlock: React.FC<{ page: StoryPage }> = ({ page }) => (
  <div className="flex-1 flex flex-col justify-center space-y-6">
    <div className="border-b pb-4 opacity-50">
      <span className="text-xs uppercase tracking-widest font-bold">Prologue</span>
      <h2 className="text-2xl md:text-3xl font-bold">{page.title}</h2>
    </div>
    <p className="text-base md:text-xl leading-relaxed italic opacity-90">
      "{page.content.introText}"
    </p>
    {page.content.quote && (
      <div className="p-4 rounded-xl bg-black/5 border border-black/10 text-xs">
        <p className="italic">{page.content.quote}</p>
        {page.content.quoteAuthor && <p className="text-right font-bold mt-1">— {page.content.quoteAuthor}</p>}
      </div>
    )}
  </div>
);

export const RouteBlock: React.FC<{ page: StoryPage }> = ({ page }) => (
  <div className="flex-1 flex flex-col justify-between space-y-4">
    <div>
      <span className="text-xs uppercase tracking-widest opacity-60 font-bold">Itinerary</span>
      <h2 className="text-2xl font-bold">{page.title}</h2>
    </div>
    <div className="space-y-3 my-auto">
      {page.content.routeStops?.map((stop, idx) => (
        <div key={idx} className="flex items-center gap-3 p-2.5 rounded-xl bg-black/5 text-xs">
          <span className="w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold">
            {idx + 1}
          </span>
          <div className="flex-1">
            <h4 className="font-bold">{stop.city}, {stop.country}</h4>
            <p className="opacity-60">{stop.highlight} • {stop.dates}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);
