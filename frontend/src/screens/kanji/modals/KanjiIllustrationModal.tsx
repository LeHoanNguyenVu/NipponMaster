import React from 'react';
import { createPortal } from 'react-dom';
import { RotateCcw, X, ZoomIn, ZoomOut } from 'lucide-react';

interface KanjiIllustrationModalProps {
  isOpen: boolean;
  imageUrl: string;
  imageTitle: string;
  zoom: number;
  pan: { x: number; y: number };
  isDragging: boolean;
  onClose: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetZoom: () => void;
  onWheel: (e: React.WheelEvent) => void;
  onMouseDown: (e: React.MouseEvent) => void;
  onMouseMove: (e: React.MouseEvent) => void;
  onMouseUp: (e: React.MouseEvent) => void;
  onContextMenu: (e: React.MouseEvent) => void;
}

export function KanjiIllustrationModal({
  isOpen,
  imageUrl,
  imageTitle,
  zoom,
  pan,
  isDragging,
  onClose,
  onZoomIn,
  onZoomOut,
  onResetZoom,
  onWheel,
  onMouseDown,
  onMouseMove,
  onMouseUp,
  onContextMenu,
}: KanjiIllustrationModalProps) {
  if (!isOpen || !imageUrl) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[999999] w-screen h-screen bg-[#09090b]/98 backdrop-blur-md flex flex-col select-none overflow-hidden"
      onWheel={onWheel}
      onTouchMove={(e) => e.stopPropagation()}
    >
      {/* Header Bar */}
      <div className="w-full flex items-center justify-between px-4 sm:px-6 py-2.5 bg-[#18181b] border-b border-[#27272a] shadow-xl z-20 flex-shrink-0">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 bg-[#b91c1c]" />
          <h3 className="font-serif font-bold text-sm sm:text-base text-[#f4f4f5] tracking-wide truncate max-w-[65vw]">
            {imageTitle || 'Xem tranh'}
          </h3>
        </div>

        <div className="flex items-center gap-3">
          {/* Zoom controls */}
          <div className="flex items-center gap-1 bg-[#27272a] p-1 border border-[#3f3f46]">
            <button
              type="button"
              onClick={onZoomOut}
              className="px-2 py-0.5 hover:bg-[#3f3f46] text-[#f4f4f5] text-xs font-bold cursor-pointer transition-colors"
              title="Thu nhỏ (-)"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="text-[#f4f4f5] text-xs font-mono font-bold px-2 border-x border-[#3f3f46]">
              Độ thu phóng: {Math.round(zoom * 100)}%
            </span>
            <button
              type="button"
              onClick={onResetZoom}
              className="px-2 py-0.5 hover:bg-[#3f3f46] text-[#f4f4f5] text-xs font-bold cursor-pointer transition-colors"
              title="Tỉ lệ gốc 100%"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={onZoomIn}
              className="px-2 py-0.5 hover:bg-[#3f3f46] text-[#f4f4f5] text-xs font-bold cursor-pointer transition-colors"
              title="Phóng to (+)"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center bg-[#b91c1c] hover:bg-[#dc2626] text-white transition-colors cursor-pointer shadow-md rounded-none"
            title="Đóng (ESC)"
          >
            <X className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>
      </div>

      {/* Viewport */}
      <div
        className={`flex-1 w-full h-full overflow-hidden relative flex items-center justify-center p-2 sm:p-6 bg-[#09090b] select-none ${
          isDragging
            ? 'cursor-grabbing'
            : zoom > 1
              ? 'cursor-grab'
              : 'cursor-zoom-in'
        }`}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onContextMenu={onContextMenu}
      >
        <div
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
            transformOrigin: 'center center',
            transition: isDragging ? 'none' : 'transform 0.12s ease-out',
          }}
          className="max-h-full max-w-full flex items-center justify-center pointer-events-none"
        >
          <img
            src={imageUrl || ''}
            alt={imageTitle || 'Tranh bài tập'}
            draggable={false}
            className="max-h-[84vh] max-w-[94vw] object-contain shadow-2xl border border-[#27272a] bg-white pointer-events-none select-none"
          />
        </div>
      </div>
    </div>,
    document.body
  );
}

