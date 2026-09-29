import React, { useEffect } from 'react';
import { ArrowLeft, Printer } from 'lucide-react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { StoryPageRenderer } from '../components/story/StoryPageRenderer';
import { useTravelStore } from '../store/travelStore';

type PrintFormat = 'a4' | 'a5' | 'square';
const formatNames: Record<PrintFormat, string> = { a4: 'A4 portrait', a5: 'A5 portrait', square: 'Square photo book' };

export const PrintPreviewPage: React.FC = () => {
  const { storyId } = useParams<{ storyId: string }>();
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const story = useTravelStore((state) => state.stories.find((item) => item.id === storyId));
  const candidate = params.get('format');
  const format: PrintFormat = candidate === 'a5' || candidate === 'square' ? candidate : 'a4';

  useEffect(() => {
    document.documentElement.dataset.printFormat = format;
    return () => { delete document.documentElement.dataset.printFormat; };
  }, [format]);

  if (!story) return <div className="min-h-screen bg-[#F7F4EE] p-8 text-center"><h1 className="font-serif text-2xl font-bold">Book not found</h1><button onClick={() => navigate('/stories')} className="mt-4 rounded-xl bg-stone-900 px-4 py-2 text-sm font-bold text-white">Return to stories</button></div>;

  return <div className="print-preview-shell min-h-screen bg-stone-200 text-stone-900">
    <header className="no-print sticky top-0 z-20 flex items-center justify-between border-b border-stone-300 bg-[#FAF7F2]/95 px-4 py-3 backdrop-blur md:px-8">
      <div className="flex min-w-0 items-center gap-3"><button onClick={() => navigate(`/story/${story.id}`)} className="rounded-xl p-2 text-stone-600 hover:bg-stone-100"><ArrowLeft className="h-5 w-5" /></button><div className="min-w-0"><p className="truncate font-serif text-sm font-bold">{story.title}</p><p className="text-xs text-stone-500">Print preview · {formatNames[format]} · {story.pages.length} pages</p></div></div>
      <button onClick={() => window.print()} className="flex items-center gap-2 rounded-xl bg-stone-900 px-4 py-2 text-xs font-bold text-white shadow hover:bg-stone-800"><Printer className="h-4 w-4" />Print / Save as PDF</button>
    </header>
    <main className={`print-book print-book--${format} mx-auto p-5 md:p-10`}>
      {story.pages.map((page) => <article key={page.id} className="print-page"><StoryPageRenderer page={page} style={story.style} isPrint /></article>)}
    </main>
    <div className="no-print mx-auto max-w-2xl px-5 pb-10 text-center text-xs text-stone-600">Tip: choose <strong>Save as PDF</strong>, select {formatNames[format]}, and turn off browser headers and footers.</div>
  </div>;
};
