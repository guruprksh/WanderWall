import React from 'react';
import { StoryPage } from '../../types/story';

export const DayBlock: React.FC<{ page: StoryPage }> = ({ page }) => (
  <div className="flex-1 flex flex-col justify-between space-y-4">
    <div>
      <span className="text-xs uppercase tracking-widest opacity-60 font-bold">{page.content.dayDate}</span>
      <h2 className="text-2xl font-bold">{page.title}</h2>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 items-center">
      <div className="space-y-2">
        {page.content.daySchedule?.map((s, idx) => (
          <div key={idx} className="text-xs flex gap-2 items-start">
            <span className="font-bold opacity-75">{s.time}</span>
            <div><span className="font-bold">{s.place}: </span><span className="opacity-80">{s.activity}</span></div>
          </div>
        ))}
        {page.content.dayNotes && <p className="text-xs italic opacity-75 pt-2 border-t mt-3">{page.content.dayNotes}</p>}
      </div>
      {page.photos[0] && (
        <div className="h-44 rounded-xl overflow-hidden shadow-sm">
          <img src={page.photos[0]} alt="Day" className="w-full h-full object-cover" />
        </div>
      )}
    </div>
  </div>
);

export const MomentsBlock: React.FC<{ page: StoryPage }> = ({ page }) => (
  <div className="flex-1 flex flex-col justify-between space-y-4">
    <div>
      <span className="text-xs uppercase tracking-widest opacity-60 font-bold">Highlights</span>
      <h2 className="text-2xl font-bold">{page.title}</h2>
    </div>
    <div className="grid grid-cols-2 gap-3 flex-1 items-center">
      {page.content.bestMoments?.map((m, idx) => (
        <div key={idx} className="p-3 rounded-xl bg-black/5 space-y-1">
          <span className="text-[10px] font-bold uppercase opacity-60 block">{m.category}</span>
          <h4 className="font-bold text-xs truncate">{m.title}</h4>
          <p className="text-[11px] opacity-75 line-clamp-2">{m.description}</p>
        </div>
      ))}
    </div>
  </div>
);

export const FoodBlock: React.FC<{ page: StoryPage }> = ({ page }) => (
  <div className="flex-1 flex flex-col justify-between space-y-4">
    <div>
      <span className="text-xs uppercase tracking-widest opacity-60 font-bold">Gastronomy</span>
      <h2 className="text-2xl font-bold">{page.title}</h2>
    </div>
    <div className="space-y-3 flex-1 flex flex-col justify-center">
      {page.content.foodItems?.map((f, idx) => (
        <div key={idx} className="flex gap-3 p-2.5 rounded-xl bg-black/5 items-center">
          {f.photo && <img src={f.photo} alt={f.dish} className="w-14 h-14 rounded-lg object-cover" />}
          <div className="flex-1 text-xs">
            <div className="flex justify-between items-center mb-0.5">
              <h4 className="font-bold">{f.dish}</h4>
              <span className="text-amber-500 font-bold">★ {f.rating}</span>
            </div>
            <p className="opacity-60">{f.restaurant} ({f.city})</p>
            <p className="italic opacity-80 mt-0.5">{f.note}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);
