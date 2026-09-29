import React from 'react';
import { StoryPage, StoryStyle } from '../../types/story';
import { CoverBlock, IntroBlock, RouteBlock } from './StoryPageBlocks';
import { DayBlock, MomentsBlock, FoodBlock } from './StoryPageBlocksPart2';
import { PeopleBlock, GalleryBlock, GemsBlock, StatsBlock, ClosingBlock } from './StoryPageBlocksPart3';

interface Props {
  page: StoryPage;
  style: StoryStyle;
  isPrint?: boolean;
}

export const StoryPageRenderer: React.FC<Props> = ({ page, style, isPrint = false }) => {
  const getStyleClasses = () => {
    switch (style) {
      case 'magazine': return 'font-serif bg-white text-zinc-900 border-zinc-200';
      case 'diary': return 'font-serif bg-[#FAF6EE] text-[#4A3B32] border-[#E8DEC8]';
      case 'luxury': return 'font-sans tracking-wide bg-stone-900 text-stone-100 border-stone-800';
      case 'adventure': return 'font-mono bg-[#EAE6DF] text-[#2C332D] border-[#C2BCB0]';
      case 'polaroid': return 'font-sans bg-[#F4F1EA] text-zinc-800 border-[#DDD5C7]';
      case 'cinematic': return 'font-sans bg-black text-white border-zinc-900';
      default: return 'font-serif bg-white text-zinc-900 border-zinc-200';
    }
  };

  const renderContent = () => {
    switch (page.type) {
      case 'cover': return <CoverBlock page={page} />;
      case 'intro': return <IntroBlock page={page} />;
      case 'route': return <RouteBlock page={page} />;
      case 'day': return <DayBlock page={page} />;
      case 'moments': return <MomentsBlock page={page} />;
      case 'food': return <FoodBlock page={page} />;
      case 'people': return <PeopleBlock page={page} />;
      case 'gallery': return <GalleryBlock page={page} />;
      case 'gems': return <GemsBlock page={page} />;
      case 'stats': return <StatsBlock page={page} />;
      case 'closing': return <ClosingBlock page={page} />;
      default: return <div className="p-8 text-center">Unrecognized page content</div>;
    }
  };

  return (
    <div className={`w-full h-full p-6 md:p-10 flex flex-col justify-between overflow-y-auto select-text ${getStyleClasses()} ${isPrint ? 'shadow-none' : 'shadow-inner'}`}>
      {renderContent()}
      <div className="pt-3 border-t border-black/10 flex justify-between items-center text-[10px] opacity-40 font-bold uppercase tracking-widest mt-4">
        <span>{page.title}</span>
        <span>Page {page.pageNumber}</span>
      </div>
    </div>
  );
};
