import { useRef, useEffect, useState, useCallback } from 'react';
import { RotateCcw, Trash2, Eye, EyeOff, Sparkles, PenTool } from 'lucide-react';
import type { DrawnStroke, Point } from '../api/kanjiCanvasApi';

interface KanjiInteractiveCanvasProps {
  guideCharacter?: string;
  guideSvgContent?: string;
  onStrokesChange?: (strokes: DrawnStroke[]) => void;
  width?: number;
  height?: number;
}

export default function KanjiInteractiveCanvas({
  guideCharacter,
  guideSvgContent,
  onStrokesChange,
  width = 300,
  height = 300,
}: KanjiInteractiveCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [strokes, setStrokes] = useState<DrawnStroke[]>([]);
  const [currentPoints, setCurrentPoints] = useState<Point[]>([]);
  const [showGuide, setShowGuide] = useState(true);
  const [penColor, setPenColor] = useState('#c01538'); // Traditional Washi Crimson Red
  const [penWidth, setPenWidth] = useState(6);

  // Redraw canvas content
  const redrawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Set line styles
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    // Draw saved strokes
    strokes.forEach((stroke) => {
      if (stroke.points.length === 0) return;
      ctx.beginPath();
      ctx.strokeStyle = penColor;
      ctx.lineWidth = penWidth;
      ctx.moveTo(stroke.points[0].x, stroke.points[0].y);
      if (stroke.points.length === 1) {
        ctx.lineTo(stroke.points[0].x + 0.1, stroke.points[0].y + 0.1);
      } else {
        for (let i = 1; i < stroke.points.length; i++) {
          ctx.lineTo(stroke.points[i].x, stroke.points[i].y);
        }
      }
      ctx.stroke();
    });

    // Draw active stroke
    if (currentPoints.length >= 1) {
      ctx.beginPath();
      ctx.strokeStyle = penColor;
      ctx.lineWidth = penWidth;
      ctx.moveTo(currentPoints[0].x, currentPoints[0].y);
      if (currentPoints.length === 1) {
        ctx.lineTo(currentPoints[0].x + 0.1, currentPoints[0].y + 0.1);
      } else {
        for (let i = 1; i < currentPoints.length; i++) {
          ctx.lineTo(currentPoints[i].x, currentPoints[i].y);
        }
      }
      ctx.stroke();
    }
  }, [strokes, currentPoints, penColor, penWidth]);

  useEffect(() => {
    redrawCanvas();
  }, [redrawCanvas]);

  useEffect(() => {
    if (onStrokesChange) {
      onStrokesChange(strokes);
    }
  }, [strokes, onStrokesChange]);

  // Handle Event Coordinate Mapping
  const getCanvasCoordinates = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>): Point | null => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    let clientX = 0;
    let clientY = 0;

    if ('touches' in e) {
      if (e.touches.length === 0) return null;
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY,
    };
  };

  const animFrameRef = useRef<number | null>(null);

  // Touch & Mouse Handlers
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const pt = getCanvasCoordinates(e);
    if (!pt) return;
    setIsDrawing(true);
    setCurrentPoints([pt]);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    e.preventDefault();
    const pt = getCanvasCoordinates(e);
    if (!pt) return;

    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
    }
    animFrameRef.current = requestAnimationFrame(() => {
      setCurrentPoints((prev) => [...prev, pt]);
    });
  };

  const stopDrawing = (e?: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    if (e) e.preventDefault();
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
    }
    setIsDrawing(false);
    if (currentPoints.length > 0) {
      const finalPoints = currentPoints.length === 1
        ? [currentPoints[0], { x: currentPoints[0].x + 0.1, y: currentPoints[0].y + 0.1 }]
        : currentPoints;
      setStrokes((prev) => [...prev, { points: finalPoints }]);
    }
    setCurrentPoints([]);
  };

  const handleUndo = () => {
    setStrokes((prev) => prev.slice(0, -1));
  };

  const handleClear = () => {
    setStrokes([]);
    setCurrentPoints([]);
  };

  return (
    <div className="flex flex-col items-center gap-3">
      {/* Outer Washi Frame */}
      <div
        className="relative rounded-2xl border-2 border-outline-variant/60 bg-surface-container-lowest/80 shadow-md p-2 overflow-hidden"
        style={{ width: width + 16, height: height + 16 }}
      >
        {/* Japanese Grid Guidelines Background */}
        <div className="absolute inset-2 pointer-events-none z-0">
          {/* Outer Border */}
          <div className="w-full h-full border border-outline-variant/30 rounded-xl" />
          {/* Horizontal Line */}
          <div className="absolute top-1/2 left-0 right-0 border-t border-dashed border-outline-variant/25" />
          {/* Vertical Line */}
          <div className="absolute left-1/2 top-0 bottom-0 border-l border-dashed border-outline-variant/25" />
          {/* Diagonal Lines */}
          <svg className="absolute inset-0 w-full h-full stroke-outline-variant/15 stroke-dasharray-[3,3]">
            <line x1="0" y1="0" x2="100%" y2="100%" />
            <line x1="100%" y1="0" x2="0" y2="100%" />
          </svg>
        </div>

        {/* Faint Target Guide Character SVG or Text */}
        {showGuide && (guideCharacter || guideSvgContent) && (
          <div className="absolute inset-2 flex items-center justify-center pointer-events-none z-0 opacity-20 select-none">
            {guideSvgContent ? (
              <div
                className="w-full h-full flex items-center justify-center text-primary"
                dangerouslySetInnerHTML={{ __html: guideSvgContent }}
              />
            ) : (
              <span className="text-[160px] font-jp font-bold text-primary leading-none">
                {guideCharacter}
              </span>
            )}
          </div>
        )}

        {/* Interactive Drawing Canvas */}
        <canvas
          ref={canvasRef}
          width={width}
          height={height}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          className="relative z-10 touch-none cursor-crosshair rounded-xl"
        />

        {/* Floating Stroke Counter Badge */}
        <div className="absolute bottom-3 right-3 z-20 px-2.5 py-1 rounded-full bg-surface-container/90 border border-outline-variant/30 text-[11px] font-semibold text-on-surface flex items-center gap-1 shadow-sm">
          <PenTool size={12} className="text-primary" />
          <span>{strokes.length} nét</span>
        </div>
      </div>

      {/* Toolbar Controls */}
      <div className="flex items-center gap-2 bg-surface-container-low p-2 rounded-2xl border border-outline-variant/30 shadow-sm">
        <button
          onClick={handleUndo}
          disabled={strokes.length === 0}
          className="p-2 rounded-xl hover:bg-surface-container-high text-on-surface-variant transition-colors disabled:opacity-30 cursor-pointer flex items-center gap-1 text-xs font-medium"
          title="Xóa nét vừa vẽ (Undo)"
        >
          <RotateCcw size={16} />
          <span>Hoàn tác</span>
        </button>

        <div className="w-[1px] h-4 bg-outline-variant/40" />

        <button
          onClick={handleClear}
          disabled={strokes.length === 0}
          className="p-2 rounded-xl hover:bg-error/10 text-error transition-colors disabled:opacity-30 cursor-pointer flex items-center gap-1 text-xs font-medium"
          title="Xóa bảng vẽ (Clear)"
        >
          <Trash2 size={16} />
          <span>Xóa bảng</span>
        </button>

        {guideCharacter && (
          <>
            <div className="w-[1px] h-4 bg-outline-variant/40" />
            <button
              onClick={() => setShowGuide(!showGuide)}
              className="p-2 rounded-xl hover:bg-surface-container-high text-on-surface-variant transition-colors cursor-pointer flex items-center gap-1 text-xs font-medium"
              title={showGuide ? 'Ẩn chữ mẫu' : 'Hiện chữ mẫu'}
            >
              {showGuide ? <EyeOff size={16} /> : <Eye size={16} />}
              <span>{showGuide ? 'Ẩn mẫu' : 'Hiện mẫu'}</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
}
