import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { X, ZoomIn, ZoomOut, RotateCcw, ExternalLink, Maximize2 } from 'lucide-react';

interface ExamImageModalProps {
  isOpen: boolean;
  imageUrl: string | null;
  title?: string;
  onClose: () => void;
}

const ExamImageViewer: React.FC<{
  imageUrl: string;
  title?: string;
  onClose: () => void;
}> = ({ imageUrl, title, onClose }) => {
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Lock body scroll and handle Escape key
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === '+' || e.key === '=') {
        setZoom((prev) => Math.min(prev + 0.25, 4));
      } else if (e.key === '-' || e.key === '_') {
        setZoom((prev) => Math.max(prev - 0.25, 0.5));
      } else if (e.key === '0') {
        setZoom(1);
        setPan({ x: 0, y: 0 });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.25, 4));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.25, 0.5));
  const handleResetZoom = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  // Wheel zoom
  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY < 0 ? 0.2 : -0.2;
    setZoom((prev) => {
      const next = Math.max(0.5, Math.min(prev + delta, 4));
      if (next === 1) setPan({ x: 0, y: 0 });
      return next;
    });
  }, []);

  // Double click toggles 1x and 2x
  const handleDoubleClick = () => {
    if (zoom > 1.2) {
      setZoom(1);
      setPan({ x: 0, y: 0 });
    } else {
      setZoom(2);
    }
  };

  // Dragging to pan
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return; // Only left click
    setIsDragging(true);
    dragStartRef.current = {
      x: e.clientX - pan.x,
      y: e.clientY - pan.y,
    };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPan({
      x: e.clientX - dragStartRef.current.x,
      y: e.clientY - dragStartRef.current.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[99999] bg-black/90 flex flex-col backdrop-blur-md animate-in fade-in duration-200 select-none"
      onClick={onClose}
    >
      {/* Top Floating Control Bar */}
      <div
        className="shrink-0 flex items-center justify-between px-4 sm:px-6 py-3 bg-neutral-900/90 border-b border-white/10 text-white z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2 min-w-0 pr-4">
          <Maximize2 size={18} className="text-primary shrink-0" />
          <span className="text-sm font-bold truncate max-w-xs sm:max-w-md">
            {title || 'Chi tiết hình ảnh / tài liệu đề thi'}
          </span>
        </div>

        {/* Toolbar Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Zoom controls */}
          <div className="flex items-center bg-white/10 rounded-lg p-0.5 border border-white/15">
            <button
              type="button"
              onClick={handleZoomOut}
              disabled={zoom <= 0.5}
              className="p-1.5 rounded hover:bg-white/20 text-white disabled:opacity-40 transition-colors cursor-pointer"
              title="Thu nhỏ (-)"
            >
              <ZoomOut size={16} />
            </button>
            <span className="text-xs font-mono font-bold px-2 min-w-[3.5rem] text-center">
              {Math.round(zoom * 100)}%
            </span>
            <button
              type="button"
              onClick={handleZoomIn}
              disabled={zoom >= 4}
              className="p-1.5 rounded hover:bg-white/20 text-white disabled:opacity-40 transition-colors cursor-pointer"
              title="Phóng to (+)"
            >
              <ZoomIn size={16} />
            </button>
          </div>

          <button
            type="button"
            onClick={handleResetZoom}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white border border-white/15 transition-colors cursor-pointer flex items-center gap-1 text-xs font-medium"
            title="Vừa màn hình (0)"
          >
            <RotateCcw size={15} />
            <span className="hidden sm:inline">Vừa vặn</span>
          </button>

          <a
            href={imageUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white border border-white/15 transition-colors cursor-pointer flex items-center gap-1 text-xs font-medium"
            title="Mở ảnh gốc trong tab mới"
          >
            <ExternalLink size={15} />
            <span className="hidden sm:inline">Ảnh gốc</span>
          </a>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg bg-primary hover:bg-primary/90 text-on-primary transition-all cursor-pointer shadow-md ml-1"
            title="Đóng (Esc)"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Main Viewport */}
      <div
        ref={containerRef}
        className="flex-1 w-full h-full overflow-hidden flex items-center justify-center relative p-4"
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        style={{
          cursor: isDragging ? 'grabbing' : zoom > 1 ? 'grab' : 'zoom-in',
        }}
      >
        <div
          className="transition-transform duration-75 ease-out max-w-full max-h-full flex items-center justify-center pointer-events-auto"
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
            transformOrigin: 'center center',
          }}
          onClick={(e) => {
            e.stopPropagation();
            if (zoom === 1) setZoom(1.75);
          }}
          onDoubleClick={(e) => {
            e.stopPropagation();
            handleDoubleClick();
          }}
        >
          <img
            src={imageUrl}
            alt={title || 'Chi tiết đề thi'}
            className="max-w-[92vw] max-h-[82vh] object-contain rounded-lg shadow-2xl bg-white p-2 border border-white/20 pointer-events-none"
            draggable={false}
          />
        </div>

        {/* Quick hint at bottom */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none">
          <span className="px-3 py-1 rounded-full bg-black/60 text-white/80 border border-white/15 text-xs backdrop-blur-sm">
            💡 Cuộn chuột hoặc bấm +/- để phóng to • Kéo chuột để di chuyển • Nhấp đúp để đổi kích thước • Esc để đóng
          </span>
        </div>
      </div>
    </div>,
    document.body
  );
};

export const ExamImageModal: React.FC<ExamImageModalProps> = ({
  isOpen,
  imageUrl,
  title,
  onClose,
}) => {
  if (!isOpen || !imageUrl) return null;
  return <ExamImageViewer key={imageUrl} imageUrl={imageUrl} title={title} onClose={onClose} />;
};
