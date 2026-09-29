import React, { useState } from 'react';
import { TravelStory } from '../../types/story';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  story: TravelStory;
}

export const PrintBookModal: React.FC<Props> = ({ isOpen, onClose, story }) => {
  const [format, setFormat] = useState<'a4' | 'a5' | 'square'>('a4');
  const [includeBleed, setIncludeBleed] = useState(true);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
      <div className="bg-[#FAF7F2] text-[#2C241E] rounded-3xl max-w-lg w-full shadow-2xl border border-[#D9CEBF] overflow-hidden flex flex-col">
        <div className="px-5 py-4 border-b border-[#E8DEC8] flex items-center justify-between bg-[#F5EDE0]">
          <div>
            <h2 className="text-base font-serif font-bold text-[#2C241E]">Create Physical Book</h2>
            <p className="text-xs text-[#7A6B5D]">Prepare story for high-resolution print &amp; PDF</p>
          </div>
          <button onClick={onClose} className="w-7 h-7 rounded-full flex items-center justify-center text-[#7A6B5D]">✕</button>
        </div>

        <div className="p-5 space-y-4 text-xs">
          <div>
            <label className="block font-bold uppercase tracking-wider text-[#7A6B5D] mb-1.5">Print Format</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'a4', name: 'A4 Portrait', desc: 'Standard Editorial' },
                { id: 'a5', name: 'A5 Compact', desc: 'Journal Size' },
                { id: 'square', name: 'Square Photo Book', desc: 'Coffee Table' },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFormat(f.id as any)}
                  className={`p-2.5 rounded-xl border text-left transition ${
                    format === f.id ? 'border-amber-600 bg-amber-50 ring-1 ring-amber-600' : 'border-[#E8DEC8] bg-white'
                  }`}
                >
                  <p className="font-bold">{f.name}</p>
                  <p className="text-[10px] text-[#7A6B5D] mt-0.5">{f.desc}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-amber-50 border border-amber-200/60 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-amber-900">Print Specifications</span>
              <span className="text-[10px] bg-amber-200 text-amber-900 px-1.5 py-0.5 rounded font-medium">300 DPI Ready</span>
            </div>
            <ul className="space-y-1 text-[11px] text-amber-950">
              <li>• Total Pages: {story.pages.length}</li>
              <li>• Color Profile: CMYK simulated</li>
              <li>• Margins: 15mm with binding spine gutter</li>
            </ul>
          </div>

          <label className="flex items-center gap-2 cursor-pointer font-medium">
            <input
              type="checkbox"
              checked={includeBleed}
              onChange={(e) => setIncludeBleed(e.target.checked)}
              className="rounded text-amber-600"
            />
            <span>Include 3mm cutting bleed and crop marks</span>
          </label>
        </div>

        <div className="px-5 py-3 border-t border-[#E8DEC8] flex items-center justify-between bg-[#F5EDE0]">
          <span className="text-xs text-[#7A6B5D]">{story.pages.length} page spreads ready</span>
          <div className="flex gap-2">
            <button onClick={onClose} className="px-3.5 py-1.5 text-xs font-bold text-[#7A6B5D]">Cancel</button>
            <button
              onClick={handlePrint}
              className="px-5 py-2 rounded-xl text-xs font-bold bg-amber-600 text-white shadow hover:bg-amber-700 flex items-center gap-1.5"
            >
              <span>🖨️ Export Printable PDF</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
