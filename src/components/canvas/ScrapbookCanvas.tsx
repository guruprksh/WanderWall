import React, { useEffect, useRef, useState } from 'react';
import { useTravelStore } from '../../store/travelStore';
import { CanvasControls } from './CanvasControls';
import { PhotoCard } from '../cards/PhotoCard';
import { PlaceCard } from '../cards/PlaceCard';
import { TicketCard } from '../cards/TicketCard';
import { MemoryCard } from '../cards/MemoryCard';
import { StickyNote } from '../cards/StickyNote';
import { StampBadge } from '../cards/StampBadge';
import { StickerItem } from '../cards/StickerItem';
import { AddCanvasItemModal } from '../modals/AddCanvasItemModal';

interface Props {
  tripId: string;
}

export const ScrapbookCanvas: React.FC<Props> = ({ tripId }) => {
  const { canvasItems, updateCanvasItem, addCanvasItem, scrapbookMode } = useTravelStore();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const [bgTexture, setBgTexture] = useState('dots');
  const [showAddModal, setShowAddModal] = useState(false);
  const [copiedAlert, setCopiedAlert] = useState(false);
  const [clipboardItem, setClipboardItem] = useState<any>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const draggingItem = useRef<{ id: string; startX: number; startY: number; initX: number; initY: number } | null>(null);

  const tripItems = canvasItems.filter((item) => item.tripId === tripId);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;
      if (target.isContentEditable || ['INPUT', 'TEXTAREA'].includes(target.tagName)) return;
      const selected = canvasItems.find((item) => item.id === selectedId);
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'c' && selected) {
        event.preventDefault();
        setClipboardItem(selected);
        setCopiedAlert(true);
        setTimeout(() => setCopiedAlert(false), 1800);
      }
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'x' && selected) {
        event.preventDefault();
        setClipboardItem(selected);
        useTravelStore.getState().deleteCanvasItem(selected.id);
        setSelectedId(null);
      }
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'v' && clipboardItem) {
        event.preventDefault();
        const itemData = { ...clipboardItem };
        delete itemData.id;
        delete itemData.zIndex;
        addCanvasItem({ ...itemData, x: clipboardItem.x + 30, y: clipboardItem.y + 30, rotation: clipboardItem.rotation + 2 });
      }
      if ((event.key === 'Backspace' || event.key === 'Delete') && selected) {
        event.preventDefault();
        useTravelStore.getState().deleteCanvasItem(selected.id);
        setSelectedId(null);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [addCanvasItem, canvasItems, clipboardItem, selectedId]);

  const handlePointerDown = (e: React.PointerEvent, item: any) => {
    e.stopPropagation();
    setSelectedId(item.id);
    draggingItem.current = {
      id: item.id,
      startX: e.clientX,
      startY: e.clientY,
      initX: item.x,
      initY: item.y,
    };
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!draggingItem.current) return;
    const dx = (e.clientX - draggingItem.current.startX) / zoom;
    const dy = (e.clientY - draggingItem.current.startY) / zoom;
    const newX = Math.round(draggingItem.current.initX + dx);
    const newY = Math.round(draggingItem.current.initY + dy);
    updateCanvasItem(draggingItem.current.id, { x: newX, y: newY });
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (draggingItem.current) {
      (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
      draggingItem.current = null;
    }
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedAlert(true);
    setTimeout(() => setCopiedAlert(false), 2500);
  };

  const renderItemContent = (item: any) => {
    const isSelected = selectedId === item.id;
    switch (item.type) {
      case 'photo':
        return <PhotoCard content={item.content} mode={scrapbookMode} isSelected={isSelected} />;
      case 'place':
        return <PlaceCard content={item.content} mode={scrapbookMode} isSelected={isSelected} />;
      case 'ticket':
        return <TicketCard content={item.content} mode={scrapbookMode} isSelected={isSelected} />;
      case 'memory':
        return <MemoryCard content={item.content} mode={scrapbookMode} isSelected={isSelected} />;
      case 'note':
        return <StickyNote content={item.content} mode={scrapbookMode} isSelected={isSelected} onChange={(text) => updateCanvasItem(item.id, { content: { ...item.content, text } })} />;
      case 'stamp':
        return <StampBadge content={item.content} isSelected={isSelected} />;
      case 'sticker':
        return <StickerItem content={item.content} isSelected={isSelected} />;
      default:
        return null;
    }
  };

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onClick={() => setSelectedId(null)}
      className={`relative w-full min-h-[520px] h-[calc(100svh-140px)] md:aspect-[16/10] md:h-auto max-h-[900px] overflow-auto select-none rounded-2xl border border-stone-300 shadow-inner ${
        bgTexture === 'corkboard' ? 'canvas-corkboard' : bgTexture === 'dots' ? 'bg-[#F7F4EE] canvas-grid-dots' : 'bg-[#FAF8F5]'
      }`}
    >
      {/* Controls Toolbar */}
      <CanvasControls
        zoom={zoom}
        setZoom={setZoom}
        selectedId={selectedId}
        onOpenAddModal={() => setShowAddModal(true)}
        bgTexture={bgTexture}
        setBgTexture={setBgTexture}
        onShare={handleShare}
      />

      {/* Share Toast */}
      {copiedAlert && (
        <div className="absolute top-4 right-4 z-40 bg-stone-900 text-white text-xs px-4 py-2 rounded-full shadow-lg">
          ✨ Copied — use ⌘/Ctrl+V to paste on this canvas.
        </div>
      )}

      {/* Scaled Canvas Surface */}
      <div
        style={{
          transform: `scale(${zoom})`,
          transformOrigin: 'top left',
          width: '2400px',
          height: '1800px',
        }}
        className="relative transition-transform duration-75"
      >
        {tripItems.map((item) => (
          <div
            key={item.id}
            onPointerDown={(e) => handlePointerDown(e, item)}
            style={{
              position: 'absolute',
              left: `${item.x}px`,
              top: `${item.y}px`,
              transform: `rotate(${item.rotation || 0}deg)`,
              zIndex: item.zIndex || 1,
              cursor: 'grab',
            }}
            className="hover:scale-[1.01] transition-transform active:cursor-grabbing"
          >
            {renderItemContent(item)}
          </div>
        ))}
      </div>

      {showAddModal && (
        <AddCanvasItemModal
          tripId={tripId}
          onClose={() => setShowAddModal(false)}
          onAdd={addCanvasItem}
        />
      )}
    </div>
  );
};
