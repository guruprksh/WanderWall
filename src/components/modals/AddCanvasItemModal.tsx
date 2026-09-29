import React, { useState } from 'react';
import { X } from 'lucide-react';
import { CanvasItemType } from '../../types/travel';

interface Props {
  tripId: string;
  onClose: () => void;
  onAdd: (item: any) => void;
}

export const AddCanvasItemModal: React.FC<Props> = ({ tripId, onClose, onAdd }) => {
  const [tab, setTab] = useState<CanvasItemType>('photo');
  const [url, setUrl] = useState('https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=800&fit=crop&q=80');
  const [text, setText] = useState('');
  const [title, setTitle] = useState('');

  const handleAdd = () => {
    const rx = 100 + Math.floor(Math.random() * 250);
    const ry = 80 + Math.floor(Math.random() * 200);
    const rot = Math.floor(Math.random() * 8) - 4;
    let content: any = {};

    if (tab === 'photo') {
      content = { url, caption: text || 'Travel moment', frameStyle: 'polaroid', hasTape: true, tapeColor: 'coral' };
    } else if (tab === 'place') {
      content = { name: title || 'Favorite Spot', location: text || 'Italy', category: 'restaurant', rating: 5, note: 'Simply wonderful' };
    } else if (tab === 'memory') {
      content = { category: 'Best Meal', title: title || 'Special Moment', description: text || 'A truly unforgettable experience.', emoji: '🍝', rating: 5 };
    } else if (tab === 'ticket') {
      content = { type: 'flight', title: title || 'Flight Ticket', from: 'AMS', to: 'FCO', date: '2026-05-12', time: '07:15', carrier: 'KLM', price: '€189', seat: '14A' };
    } else if (tab === 'note') {
      content = { text: text || 'Remember this spot forever!', color: 'yellow', fontStyle: 'handwriting' };
    } else if (tab === 'sticker') {
      content = { emoji: '✈️', label: text || 'Wanderlust' };
    }

    onAdd({ tripId, type: tab, x: rx, y: ry, width: 260, rotation: rot, content });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs" onClick={onClose}>
      <div className="bg-[#FAF7F2] rounded-2xl shadow-xl w-full max-w-sm p-5 border border-stone-200" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-serif font-bold text-stone-900">Add to Wall</h3>
          <button onClick={onClose}><X className="w-5 h-5 text-stone-500" /></button>
        </div>

        <div className="flex gap-1.5 mb-4 overflow-x-auto pb-1 text-xs">
          {(['photo', 'place', 'memory', 'ticket', 'note', 'sticker'] as CanvasItemType[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-3 py-1 rounded-full capitalize font-medium ${
                tab === t ? 'bg-stone-900 text-white' : 'bg-stone-200/70 text-stone-700'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="space-y-3 text-xs mb-4">
          {tab === 'photo' && (
            <div>
              <label className="font-semibold block mb-1">Photo URL</label>
              <input value={url} onChange={(e) => setUrl(e.target.value)} className="w-full p-2 border rounded bg-white" />
            </div>
          )}
          {(tab === 'place' || tab === 'memory' || tab === 'ticket') && (
            <div>
              <label className="font-semibold block mb-1">Title / Name</label>
              <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Trattoria da Enzo" className="w-full p-2 border rounded bg-white" />
            </div>
          )}
          <div>
            <label className="font-semibold block mb-1">{tab === 'note' ? 'Note Text' : 'Caption / Details'}</label>
            <textarea value={text} onChange={(e) => setText(e.target.value)} rows={3} placeholder="Add your travel memory..." className="w-full p-2 border rounded bg-white" />
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-3 py-1.5 text-xs text-stone-600">Cancel</button>
          <button onClick={handleAdd} className="px-4 py-1.5 text-xs bg-stone-900 text-white rounded-full font-medium">Add to Canvas</button>
        </div>
      </div>
    </div>
  );
};
