import React, { ChangeEvent, useState } from 'react';
import { ImagePlus, X } from 'lucide-react';
import { CanvasItemType } from '../../types/travel';

interface Props { tripId: string; onClose: () => void; onAdd: (item: any) => void; }
const stickers = ['✈️', '📍', '🌅', '🍜', '🏝️', '🗺️', '📸', '🚆', '☕', '🎒'];

export const AddCanvasItemModal: React.FC<Props> = ({ tripId, onClose, onAdd }) => {
  const [tab, setTab] = useState<CanvasItemType>('photo');
  const [url, setUrl] = useState(''); const [text, setText] = useState('');
  const [title, setTitle] = useState(''); const [emoji, setEmoji] = useState('✈️');
  const [error, setError] = useState('');
  const importPhoto = (file: File) => {
    if (!file.type.startsWith('image/')) return setError('Please choose an image file.');
    if (file.size > 8 * 1024 * 1024) return setError('Choose an image smaller than 8 MB.');
    const reader = new FileReader();
    reader.onload = () => { setUrl(String(reader.result)); setError(''); };
    reader.onerror = () => setError('That image could not be read.');
    reader.readAsDataURL(file);
  };
  const handleFile = (event: ChangeEvent<HTMLInputElement>) => { const file = event.target.files?.[0]; if (file) importPhoto(file); };
  const handleAdd = () => {
    if (tab === 'photo' && !/^(https?:\/\/|data:image\/)/i.test(url.trim())) return setError('Add a valid image URL or upload a photo.');
    if (['place', 'memory', 'ticket'].includes(tab) && !title.trim()) return setError('A title is required.');
    if (tab === 'note' && !text.trim()) return setError('Write a note before adding it.');
    let content: any;
    if (tab === 'photo') content = { url: url.trim(), caption: text.trim() || 'Travel moment', frameStyle: 'polaroid', hasTape: true, tapeColor: 'coral' };
    else if (tab === 'place') content = { name: title.trim(), location: text.trim() || 'Travel destination', category: 'restaurant', rating: 5, note: '' };
    else if (tab === 'memory') content = { category: 'Best Meal', title: title.trim(), description: text.trim() || 'A moment worth remembering.', emoji: '✨', rating: 5 };
    else if (tab === 'ticket') content = { type: 'flight', title: title.trim(), date: new Date().toISOString().slice(0, 10), carrier: text.trim() || 'Travel document' };
    else if (tab === 'note') content = { text: text.trim(), color: 'yellow', fontStyle: 'handwriting' };
    else content = { emoji, label: text.trim() || undefined };
    onAdd({ tripId, type: tab, x: 80 + Math.random() * 300, y: 80 + Math.random() * 220, width: tab === 'sticker' ? 110 : 260, rotation: Math.floor(Math.random() * 8) - 4, content }); onClose();
  };
  return <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={onClose}>
    <div role="dialog" aria-modal="true" className="bg-[#FAF7F2] rounded-2xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto p-5 border border-stone-200" onClick={(e) => e.stopPropagation()}>
      <div className="flex justify-between items-center mb-4"><h3 className="font-serif font-bold text-stone-900 text-lg">Add a memory</h3><button aria-label="Close" onClick={onClose}><X className="w-5 h-5 text-stone-500" /></button></div>
      <div className="flex gap-1.5 mb-4 overflow-x-auto pb-1 text-xs">{(['photo', 'place', 'memory', 'ticket', 'note', 'sticker'] as CanvasItemType[]).map((type) => <button key={type} onClick={() => { setTab(type); setError(''); }} className={`px-3 py-1.5 rounded-full capitalize font-medium ${tab === type ? 'bg-stone-900 text-white' : 'bg-stone-200/70 text-stone-700'}`}>{type}</button>)}</div>
      <div className="space-y-3 text-xs mb-5">
        {tab === 'photo' && <><input value={url} onChange={(e) => { setUrl(e.target.value); setError(''); }} placeholder="Image URL (https://…)" className="w-full p-2 border rounded bg-white" /><label className="flex items-center justify-center gap-2 p-3 border-2 border-dashed rounded-lg cursor-pointer bg-white hover:bg-amber-50"><ImagePlus className="w-4 h-4" />Upload photo (max 8 MB)<input type="file" accept="image/*" onChange={handleFile} className="sr-only" /></label>{url && <img src={url} alt="Selected preview" className="w-full aspect-video object-cover rounded border" onError={() => setError('This image could not be loaded.')} />}</>}
        {(['place', 'memory', 'ticket'] as CanvasItemType[]).includes(tab) && <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title / name *" className="w-full p-2 border rounded bg-white" />}
        {tab === 'sticker' && <div className="flex flex-wrap gap-2">{stickers.map((item) => <button key={item} onClick={() => setEmoji(item)} className={`text-xl p-2 rounded-lg ${emoji === item ? 'bg-amber-200 ring-2 ring-amber-500' : 'bg-white border'}`}>{item}</button>)}</div>}
        <textarea value={text} onChange={(e) => setText(e.target.value)} rows={3} placeholder={tab === 'note' ? 'Note text *' : tab === 'sticker' ? 'Sticker label (optional)' : 'Caption / details'} className="w-full p-2 border rounded bg-white" />
        {error && <p role="alert" className="text-rose-700 font-medium">{error}</p>}
      </div>
      <div className="flex justify-end gap-2"><button onClick={onClose} className="px-3 py-1.5 text-xs text-stone-600">Cancel</button><button onClick={handleAdd} className="px-4 py-2 text-xs bg-stone-900 text-white rounded-full font-medium">Add to canvas</button></div>
    </div>
  </div>;
};
