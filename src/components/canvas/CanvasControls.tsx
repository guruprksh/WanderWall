import React from 'react';
import { Plus, ZoomIn, ZoomOut, RotateCw, Trash2, Copy, ArrowUp, ArrowDown, Share2 } from 'lucide-react';
import { useTravelStore } from '../../store/travelStore';

interface Props {
  zoom: number;
  setZoom: (z: number | ((prev: number) => number)) => void;
  selectedId: string | null;
  onOpenAddModal: () => void;
  bgTexture: string;
  setBgTexture: (t: string) => void;
  onShare: () => void;
}

export const CanvasControls: React.FC<Props> = ({
  zoom,
  setZoom,
  selectedId,
  onOpenAddModal,
  bgTexture,
  setBgTexture,
  onShare,
}) => {
  const {
    deleteCanvasItem,
    duplicateCanvasItem,
    bringToFront,
    sendToBack,
    updateCanvasItem,
    canvasItems,
  } = useTravelStore();

  const selectedItem = canvasItems.find((i) => i.id === selectedId);

  const handleRotate = () => {
    if (!selectedItem) return;
    const nextRot = ((selectedItem.rotation || 0) + 15) % 360;
    updateCanvasItem(selectedItem.id, { rotation: nextRot });
  };

  return (
    <div className="absolute top-4 left-4 z-30 flex flex-wrap items-center gap-2 pointer-events-auto">
      {/* Primary Add Button */}
      <button
        onClick={onOpenAddModal}
        className="flex items-center space-x-1.5 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-full text-xs font-bold shadow-lg shadow-amber-900/20 transition-all hover:scale-105"
      >
        <Plus className="w-4 h-4 stroke-[3]" />
        <span>Add Scrapbook Memory</span>
      </button>

      {/* Selected Item Toolbar */}
      {selectedItem && (
        <div className="flex items-center space-x-1 bg-white/95 backdrop-blur-md px-2 py-1 rounded-full shadow-md border border-stone-200">
          <button
            onClick={handleRotate}
            title="Rotate Item"
            className="p-1.5 hover:bg-stone-100 rounded-full text-stone-700"
          >
            <RotateCw className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => duplicateCanvasItem(selectedItem.id)}
            title="Duplicate Item"
            className="p-1.5 hover:bg-stone-100 rounded-full text-stone-700"
          >
            <Copy className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => bringToFront(selectedItem.id)}
            title="Bring to Front"
            className="p-1.5 hover:bg-stone-100 rounded-full text-stone-700"
          >
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => sendToBack(selectedItem.id)}
            title="Send to Back"
            className="p-1.5 hover:bg-stone-100 rounded-full text-stone-700"
          >
            <ArrowDown className="w-3.5 h-3.5" />
          </button>
          <div className="w-px h-4 bg-stone-200 my-auto" />
          <button
            onClick={() => deleteCanvasItem(selectedItem.id)}
            title="Delete Item"
            className="p-1.5 hover:bg-rose-100 text-rose-600 rounded-full"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Zoom Controls */}
      <div className="flex items-center space-x-1 bg-white/90 backdrop-blur-md px-2 py-1 rounded-full shadow-sm border border-stone-200 text-xs">
        <button
          onClick={() => setZoom((z) => Math.max(0.5, z - 0.1))}
          className="p-1 hover:bg-stone-100 rounded text-stone-600"
        >
          <ZoomOut className="w-3.5 h-3.5" />
        </button>
        <span className="font-mono text-[11px] w-10 text-center font-semibold">
          {Math.round(zoom * 100)}%
        </span>
        <button
          onClick={() => setZoom((z) => Math.min(1.8, z + 0.1))}
          className="p-1 hover:bg-stone-100 rounded text-stone-600"
        >
          <ZoomIn className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Background Texture Selector */}
      <div className="flex items-center space-x-1 bg-white/90 backdrop-blur-md px-2 py-1 rounded-full shadow-sm border border-stone-200 text-xs">
        {['dots', 'corkboard', 'clean'].map((tex) => (
          <button
            key={tex}
            onClick={() => setBgTexture(tex)}
            className={`px-2 py-0.5 rounded-full capitalize text-[11px] ${
              bgTexture === tex ? 'bg-stone-900 text-white font-medium' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            {tex}
          </button>
        ))}
      </div>

      {/* Share / Export */}
      <button
        onClick={onShare}
        className="flex items-center space-x-1 bg-white/90 hover:bg-white text-stone-700 px-3 py-1.5 rounded-full shadow-sm border border-stone-200 text-xs font-medium"
      >
        <Share2 className="w-3.5 h-3.5" />
        <span>Share</span>
      </button>
    </div>
  );
};
