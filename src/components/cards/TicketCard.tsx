import React from 'react';
import { Plane, Train, Hotel, Receipt, QrCode } from 'lucide-react';
import { TicketItemContent, ScrapbookMode } from '../../types/travel';

interface Props {
  content: TicketItemContent;
  mode: ScrapbookMode;
  isSelected?: boolean;
}

export const TicketCard: React.FC<Props> = ({ content, mode, isSelected }) => {
  const isPhysical = mode === 'physical';

  const getIcon = () => {
    switch (content.type) {
      case 'flight': return <Plane className="w-4 h-4 text-sky-600" />;
      case 'train': return <Train className="w-4 h-4 text-emerald-600" />;
      case 'hotel': return <Hotel className="w-4 h-4 text-amber-600" />;
      default: return <Receipt className="w-4 h-4 text-stone-600" />;
    }
  };

  return (
    <div
      className={`relative w-72 bg-[#FFFDF9] rounded-lg shadow-md border border-stone-200/90 overflow-hidden transition-all select-none ${
        isSelected ? 'ring-2 ring-amber-500 ring-offset-2' : ''
      }`}
    >
      {/* Tape on corner */}
      {isPhysical && (
        <div className="washi-tape washi-tape-navy -top-2.5 -right-3 w-16 rotate-12 pointer-events-none" />
      )}

      {/* Top Header */}
      <div className="bg-stone-900 text-stone-100 px-3.5 py-2 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {getIcon()}
          <span className="font-mono text-xs font-bold uppercase tracking-wider">{content.carrier || content.title}</span>
        </div>
        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-stone-800 text-stone-300">
          {content.code || 'PASS'}
        </span>
      </div>

      {/* Ticket Body */}
      <div className="p-3.5 space-y-2.5">
        {(content.from || content.to) ? (
          <div className="flex items-center justify-between border-b border-dashed border-stone-200 pb-2">
            <div>
              <div className="text-[10px] uppercase font-bold text-stone-400">FROM</div>
              <div className="font-serif font-black text-base text-stone-800 leading-tight">{content.from || '---'}</div>
            </div>
            <div className="text-stone-300 px-2 font-mono">✈</div>
            <div className="text-right">
              <div className="text-[10px] uppercase font-bold text-stone-400">TO</div>
              <div className="font-serif font-black text-base text-stone-800 leading-tight">{content.to || '---'}</div>
            </div>
          </div>
        ) : (
          <div className="font-serif font-bold text-stone-800 text-sm">{content.title}</div>
        )}

        {/* Details row */}
        <div className="grid grid-cols-3 gap-2 text-[10px] font-mono text-stone-600 bg-stone-50 p-2 rounded">
          <div>
            <div className="text-stone-400 uppercase text-[9px]">Date</div>
            <div className="font-bold text-stone-800">{content.date}</div>
          </div>
          <div>
            <div className="text-stone-400 uppercase text-[9px]">Time</div>
            <div className="font-bold text-stone-800">{content.time || '--:--'}</div>
          </div>
          <div>
            <div className="text-stone-400 uppercase text-[9px]">Seat</div>
            <div className="font-bold text-stone-800">{content.seat || 'Open'}</div>
          </div>
        </div>

        {/* Bottom barcode & price */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center space-x-1.5 text-stone-400">
            <QrCode className="w-5 h-5 text-stone-600" />
            <span className="font-mono text-[9px] tracking-widest text-stone-400">||||| | ||| ||||</span>
          </div>
          {content.price && (
            <span className="font-mono font-bold text-xs text-stone-900 bg-amber-100/70 px-2 py-0.5 rounded">
              {content.price}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
