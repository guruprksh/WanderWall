import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileOutput, Printer, X } from 'lucide-react';
import { TravelStory } from '../../types/story';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  story: TravelStory;
}

export const PrintBookModal: React.FC<Props> = ({ isOpen, onClose, story }) => {
  const navigate = useNavigate();
  const [format, setFormat] = useState<'a4' | 'a5' | 'square'>('a4');

  if (!isOpen) return null;

  const openPrintPreview = () => {
    onClose();
    navigate(`/print/${story.id}?format=${format}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
      <div className="bg-[#FAF7F2] text-[#2C241E] rounded-3xl max-w-lg w-full shadow-2xl border border-[#D9CEBF] overflow-hidden flex flex-col">
        <div className="px-5 py-4 border-b border-[#E8DEC8] flex items-center justify-between bg-[#F5EDE0]">
          <div>
            <h2 className="text-base font-serif font-bold text-[#2C241E]">Print Studio</h2>
            <p className="text-xs text-[#7A6B5D]">Preview every page before using your browser’s Save as PDF.</p>
          </div>
          <button onClick={onClose} className="w-7 h-7 rounded-full flex items-center justify-center text-[#7A6B5D] hover:bg-[#E8DEC8]">
            <X className="w-4 h-4" />
          </button>
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
            <div className="flex items-center gap-2 text-amber-900">
              <FileOutput className="w-4 h-4" />
              <span className="font-bold">What happens next</span>
            </div>
            <ul className="space-y-1 text-[11px] text-amber-950">
              <li>• Review all {story.pages.length} pages in a clean print layout.</li>
              <li>• Select <strong>Save as PDF</strong> in your browser’s print dialog.</li>
              <li>• Use the selected paper size and disable browser headers and footers.</li>
            </ul>
          </div>

          <p className="text-[11px] text-[#7A6B5D] leading-relaxed">
            This local-first preview does not yet add professional crop marks, CMYK conversion, or a guaranteed print DPI. Those belong to the later professional-print service.
          </p>
        </div>

        <div className="px-5 py-3 border-t border-[#E8DEC8] flex items-center justify-between bg-[#F5EDE0]">
          <span className="text-xs text-[#7A6B5D]">{story.pages.length} page spreads ready</span>
          <div className="flex gap-2">
            <button onClick={onClose} className="px-3.5 py-1.5 text-xs font-bold text-[#7A6B5D]">Cancel</button>
            <button
              onClick={openPrintPreview}
              className="px-5 py-2 rounded-xl text-xs font-bold bg-amber-600 text-white shadow hover:bg-amber-700 flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Open Print Preview</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
