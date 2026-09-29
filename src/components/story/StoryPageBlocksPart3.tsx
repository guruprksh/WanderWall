import React from 'react';
import { StoryPage } from '../../types/story';

export const PeopleBlock: React.FC<{ page: StoryPage }> = ({ page }) => (
  <div className="flex-1 flex flex-col justify-between space-y-4">
    <div>
      <span className="text-xs uppercase tracking-widest opacity-60 font-bold">Companions</span>
      <h2 className="text-2xl font-bold">{page.title}</h2>
    </div>
    <div className="grid grid-cols-2 gap-3 flex-1 items-center">
      {page.content.peopleMemories?.map((p, idx) => (
        <div key={idx} className="p-2 rounded-xl bg-white/10 shadow border border-black/5 text-center">
          {p.photo && <img src={p.photo} alt="Memory" className="w-full h-28 object-cover rounded-lg mb-1.5" />}
          <p className="text-xs italic opacity-80">{p.caption}</p>
        </div>
      ))}
    </div>
  </div>
);

export const GalleryBlock: React.FC<{ page: StoryPage }> = ({ page }) => (
  <div className="flex-1 flex flex-col justify-between space-y-4">
    <div>
      <span className="text-xs uppercase tracking-widest opacity-60 font-bold">Visual Portfolio</span>
      <h2 className="text-2xl font-bold">{page.title}</h2>
    </div>
    <div className="grid grid-cols-3 gap-2 flex-1 items-center">
      {page.photos.slice(0, 6).map((img, idx) => (
        <div key={idx} className="rounded-lg overflow-hidden h-28">
          <img src={img} alt="Gallery" className="w-full h-full object-cover" />
        </div>
      ))}
    </div>
  </div>
);

export const GemsBlock: React.FC<{ page: StoryPage }> = ({ page }) => (
  <div className="flex-1 flex flex-col justify-between space-y-4">
    <div>
      <span className="text-xs uppercase tracking-widest opacity-60 font-bold">Recommendations</span>
      <h2 className="text-2xl font-bold">{page.title}</h2>
    </div>
    <div className="space-y-3 flex-1 flex flex-col justify-center">
      {page.content.hiddenGems?.map((g, idx) => (
        <div key={idx} className="p-3 rounded-xl bg-black/5">
          <h4 className="font-bold text-xs">{g.name} — <span className="opacity-60">{g.location}</span></h4>
          <p className="text-[11px] opacity-80 mt-0.5">{g.whySpecial}</p>
          <p className="text-[10px] font-bold text-amber-600 mt-1">💡 Tip: {g.tip}</p>
        </div>
      ))}
    </div>
  </div>
);

export const StatsBlock: React.FC<{ page: StoryPage }> = ({ page }) => (
  <div className="flex-1 flex flex-col justify-between space-y-4 text-center">
    <div>
      <span className="text-xs uppercase tracking-widest opacity-60 font-bold">By The Numbers</span>
      <h2 className="text-3xl font-bold">{page.title}</h2>
    </div>
    <div className="grid grid-cols-3 gap-3 my-auto text-xs">
      {page.content.statsData && (
        <>
          <div className="p-3 rounded-xl bg-black/5"><p className="text-xl font-bold">{page.content.statsData.days}</p><p className="opacity-60 font-bold uppercase text-[10px]">Days</p></div>
          <div className="p-3 rounded-xl bg-black/5"><p className="text-xl font-bold">{page.content.statsData.cities}</p><p className="opacity-60 font-bold uppercase text-[10px]">Cities</p></div>
          <div className="p-3 rounded-xl bg-black/5"><p className="text-xl font-bold">{page.content.statsData.distanceKm}</p><p className="opacity-60 font-bold uppercase text-[10px]">Kilometers</p></div>
          <div className="p-3 rounded-xl bg-black/5"><p className="text-xl font-bold">{page.content.statsData.placesCount}</p><p className="opacity-60 font-bold uppercase text-[10px]">Places</p></div>
          <div className="p-3 rounded-xl bg-black/5"><p className="text-xl font-bold">{page.content.statsData.photosCount}</p><p className="opacity-60 font-bold uppercase text-[10px]">Photos</p></div>
          <div className="p-3 rounded-xl bg-black/5"><p className="text-xl font-bold">{page.content.statsData.restaurantsCount}</p><p className="opacity-60 font-bold uppercase text-[10px]">Meals</p></div>
        </>
      )}
    </div>
    {page.content.statsData?.highlightPhrase && (
      <p className="text-xs font-bold opacity-75">{page.content.statsData.highlightPhrase}</p>
    )}
  </div>
);

export const ClosingBlock: React.FC<{ page: StoryPage }> = ({ page }) => (
  <div className="flex-1 flex flex-col justify-between items-center text-center space-y-4">
    <div className="space-y-1">
      <span className="text-xs uppercase tracking-widest opacity-60 font-bold">Epilogue</span>
      <h2 className="text-2xl md:text-3xl font-bold">{page.title}</h2>
    </div>
    <p className="text-sm md:text-base italic opacity-90 max-w-sm">"{page.content.closingMessage}"</p>
    {page.content.favouriteMemory && (
      <div className="p-3 rounded-xl border border-black/10 text-xs max-w-xs">
        <span className="font-bold block mb-0.5">Favourite Memory:</span>
        <p className="italic opacity-80">{page.content.favouriteMemory}</p>
      </div>
    )}
    <p className="text-[10px] uppercase tracking-widest opacity-50 font-bold">{page.content.closingSubtext}</p>
  </div>
);
