import React from 'react';
import { StampItemContent } from '../../types/travel';

interface Props {
  content: StampItemContent;
  isSelected?: boolean;
}

export const StampBadge: React.FC<Props> = ({ content, isSelected }) => {
  const getColorClasses = () => {
    switch (content.color) {
      case 'green': return 'border-emerald-700 text-emerald-800';
      case 'navy': return 'border-blue-800 text-blue-900';
      case 'amber': return 'border-amber-700 text-amber-800';
      default: return 'border-rose-700 text-rose-800';
    }
  };

  return (
    <div
      className={`select-none p-3 text-center border-2 border-dashed rounded-lg opacity-85 mix-blend-multiply transition-all ${getColorClasses()} ${
        isSelected ? 'ring-2 ring-amber-500' : ''
      }`}
    >
      <div className="text-[10px] tracking-widest font-mono font-bold uppercase">{content.country}</div>
      <div className="font-serif font-black text-sm tracking-wider my-0.5">{content.text}</div>
      <div className="text-[9px] font-mono opacity-80">{content.date} • {content.city}</div>
    </div>
  );
};
