import React, { useState } from 'react';
import { ArrowDown, ArrowUp, BookOpen, Check, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTravelStore } from '../../store/travelStore';
import { generateCollectionTravelStory } from '../../utils/annualStoryHelper';

interface Props { isOpen: boolean; onClose: () => void; }

export const CollectionBookModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { trips, addStory } = useTravelStore();
  const navigate = useNavigate();
  const [ids, setIds] = useState<string[]>([]);
  const [title, setTitle] = useState('My Travel Collection');
  const [subtitle, setSubtitle] = useState('Journeys worth keeping');
  const selected = ids.map((id) => trips.find((trip) => trip.id === id)).filter((trip): trip is typeof trips[number] => Boolean(trip));
  if (!isOpen) return null;
  const toggle = (id: string) => setIds((items) => items.includes(id) ? items.filter((item) => item !== id) : [...items, id]);
  const move = (id: string, step: -1 | 1) => setIds((items) => {
    const from = items.indexOf(id); const to = from + step;
    if (from < 0 || to < 0 || to >= items.length) return items;
    const next = [...items]; [next[from], next[to]] = [next[to], next[from]]; return next;
  });
  const create = () => {
    if (!selected.length || !title.trim()) return;
    const id = addStory(generateCollectionTravelStory({ title: title.trim(), subtitle: subtitle.trim() || undefined, trips: selected }));
    onClose(); navigate(`/story/${id}`);
  };
  return <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/55 p-4 backdrop-blur-sm">
    <div role="dialog" aria-modal="true" className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-stone-200 bg-[#FAF7F2] shadow-2xl">
      <header className="flex items-start justify-between border-b border-stone-200 px-6 py-5"><div><div className="mb-1 flex items-center gap-2 text-amber-800"><BookOpen className="h-4 w-4" /><span className="text-[11px] font-bold uppercase tracking-[0.16em]">Collection Book</span></div><h2 className="font-serif text-2xl font-bold text-stone-900">Make one book from many journeys</h2><p className="mt-1 text-sm text-stone-600">Choose your trips, then arrange them in the order you want to remember them.</p></div><button onClick={onClose} aria-label="Close" className="rounded-full p-2 text-stone-500 hover:bg-stone-100"><X className="h-5 w-5" /></button></header>
      <div className="grid min-h-0 flex-1 gap-6 overflow-y-auto p-6 md:grid-cols-[1fr_0.9fr]">
        <section><label className="mb-1 block text-xs font-bold text-stone-700">Collection title</label><input value={title} onChange={(event) => setTitle(event.target.value)} className="mb-3 w-full rounded-xl border border-stone-300 bg-white px-3 py-2 text-sm" /><label className="mb-1 block text-xs font-bold text-stone-700">Subtitle <span className="font-normal text-stone-400">(optional)</span></label><input value={subtitle} onChange={(event) => setSubtitle(event.target.value)} className="mb-5 w-full rounded-xl border border-stone-300 bg-white px-3 py-2 text-sm" /><p className="mb-2 text-xs font-bold uppercase tracking-wider text-stone-500">Your saved trips</p><div className="space-y-2">{trips.map((trip) => { const active = ids.includes(trip.id); return <button key={trip.id} type="button" onClick={() => toggle(trip.id)} className={`flex w-full items-center gap-3 rounded-2xl border p-2 text-left ${active ? 'border-amber-500 bg-amber-50' : 'border-stone-200 bg-white'}`}><img src={trip.coverPhoto} alt="" className="h-12 w-12 rounded-xl object-cover" /><span className="min-w-0 flex-1"><span className="block truncate text-sm font-bold text-stone-900">{trip.title}</span><span className="block truncate text-xs text-stone-500">{trip.destination} · {trip.year}</span></span><span className={`flex h-5 w-5 items-center justify-center rounded-full border ${active ? 'border-amber-600 bg-amber-600 text-white' : 'border-stone-300'}`}>{active && <Check className="h-3.5 w-3.5" />}</span></button>; })}</div></section>
        <section className="rounded-2xl border border-stone-200 bg-[#F5EDE0]/60 p-4"><p className="text-xs font-bold uppercase tracking-wider text-stone-500">Book order</p><p className="mb-3 text-xs text-stone-600">{selected.length ? `${selected.length} selected` : 'Select at least one trip to begin.'}</p><div className="space-y-2">{selected.map((trip, index) => <div key={trip.id} className="flex items-center gap-2 rounded-xl bg-white p-2 shadow-sm"><span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-stone-900 text-[11px] font-bold text-white">{index + 1}</span><span className="min-w-0 flex-1 truncate text-xs font-bold text-stone-800">{trip.title}</span><button disabled={!index} onClick={() => move(trip.id, -1)} className="p-1 disabled:opacity-30"><ArrowUp className="h-3.5 w-3.5" /></button><button disabled={index === selected.length - 1} onClick={() => move(trip.id, 1)} className="p-1 disabled:opacity-30"><ArrowDown className="h-3.5 w-3.5" /></button></div>)}</div></section>
      </div>
      <footer className="flex items-center justify-between border-t border-stone-200 bg-[#F5EDE0] px-6 py-4"><span className="text-xs text-stone-500">Local draft · saved in this browser</span><div className="flex gap-2"><button onClick={onClose} className="rounded-xl px-4 py-2 text-xs font-bold text-stone-600">Cancel</button><button onClick={create} disabled={!selected.length || !title.trim()} className="rounded-xl bg-stone-900 px-4 py-2 text-xs font-bold text-white disabled:opacity-40">Create collection</button></div></footer>
    </div>
  </div>;
};
