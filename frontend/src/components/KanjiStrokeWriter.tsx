import { useState, useEffect, useRef, useCallback } from 'react';
import { Loader2, RotateCcw, AlertCircle } from 'lucide-react';
import gsap from 'gsap';

interface KanjiStrokeWriterProps {
  character: string;
  size?: number;
  showNumbers?: boolean;
  standalone?: boolean;
  onStrokesLoaded?: (count: number) => void;
}

const STROKE_COLORS = [
  '#1e88e5', // 1: Blue
  '#e53935', // 2: Red
  '#43a047', // 3: Green
  '#fb8c00', // 4: Orange
  '#8e24aa', // 5: Purple
  '#00acc1', // 6: Cyan
  '#d81b60', // 7: Pink
  '#3949ab', // 8: Indigo
  '#00897b', // 9: Teal
  '#fdd835', // 10: Yellow
  '#6d4c41', // 11: Brown
  '#546e7a', // 12: Blue-Grey
];

export default function KanjiStrokeWriter({
  character,
  size = 220,
  showNumbers = true,
  standalone = true,
  onStrokesLoaded,
}: KanjiStrokeWriterProps) {
  // Support multi-character words (e.g. ペン, 食べる, 友達)
  const chars = Array.from(character || '').filter((c) => c.trim().length > 0);
  const [selectedCharIndex, setSelectedCharIndex] = useState<number>(0);

  const activeChar = chars[selectedCharIndex] || chars[0] || 'あ';

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<gsap.core.Timeline | null>(null);

  // Reset selectedCharIndex when character prop changes
  useEffect(() => {
    setSelectedCharIndex(0);
  }, [character]);

  // Animation executor
  const animateStrokes = useCallback(() => {
    if (!containerRef.current) return;

    if (animationRef.current) {
      animationRef.current.kill();
    }

    const activePaths = containerRef.current.querySelectorAll('.fg-paths path');
    if (activePaths.length === 0) return;

    setIsPlaying(true);
    const tl = gsap.timeline({
      onComplete: () => setIsPlaying(false),
    });
    animationRef.current = tl;

    // Hide all foreground paths initially using strokeDashoffset
    activePaths.forEach((pathNode) => {
      const path = pathNode as SVGPathElement;
      const length = path.getTotalLength();
      path.style.strokeDasharray = `${length}`;
      path.style.strokeDashoffset = `${length}`;
      path.style.opacity = '1';
    });

    // Draw stroke by stroke sequentially
    activePaths.forEach((pathNode, idx) => {
      const path = pathNode as SVGPathElement;
      tl.to(
        path,
        {
          strokeDashoffset: 0,
          duration: 0.55,
          ease: 'power1.out',
        },
        idx === 0 ? '+=0.1' : '+=0.08'
      );
    });
  }, []);

  // Fetch & Render KanjiVG SVG for the active character
  useEffect(() => {
    if (!activeChar) return;
    setLoading(true);
    setError(false);

    if (animationRef.current) {
      animationRef.current.kill();
      animationRef.current = null;
    }

    if (containerRef.current) {
      containerRef.current.innerHTML = '';
    }

    const codePoint = activeChar.codePointAt(0);
    if (!codePoint) {
      setLoading(false);
      setError(true);
      return;
    }

    // KanjiVG format: 5 digits lowercase hex
    const hex = codePoint.toString(16).toLowerCase().padStart(5, '0');
    const url = `https://cdn.jsdelivr.net/gh/KanjiVG/kanjivg@master/kanji/${hex}.svg`;

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load Kanji SVG');
        return res.text();
      })
      .then((svgText) => {
        if (!containerRef.current) return;

        const parser = new DOMParser();
        const doc = parser.parseFromString(svgText, 'image/svg+xml');
        const svgEl = doc.querySelector('svg');

        if (!svgEl) {
          setError(true);
          return;
        }

        svgEl.setAttribute('width', '100%');
        svgEl.setAttribute('height', '100%');
        svgEl.setAttribute('viewBox', '0 0 109 109');

        const originalStrokeGroup = svgEl.querySelector('[id^="kvg:StrokePaths_"]');
        if (originalStrokeGroup) {
          // 1. Create a faint background trace guide
          const bgGroup = originalStrokeGroup.cloneNode(true) as HTMLElement;
          bgGroup.setAttribute('id', 'bg-guide-paths');
          bgGroup.setAttribute(
            'style',
            'fill:none;stroke:#d1c7bd;stroke-width:4;stroke-linecap:round;stroke-linejoin:round;opacity:0.35;'
          );

          // 2. Multi-color stroke paths for the foreground
          originalStrokeGroup.setAttribute('class', 'fg-paths');
          const paths = originalStrokeGroup.querySelectorAll('path');
          if (onStrokesLoaded) {
            onStrokesLoaded(paths.length);
          }

          paths.forEach((path, i) => {
            const color = STROKE_COLORS[i % STROKE_COLORS.length];
            path.setAttribute(
              'style',
              `fill:none;stroke:${color};stroke-width:4.5;stroke-linecap:round;stroke-linejoin:round;`
            );
          });

          // Insert background guide BEFORE foreground stroke paths
          originalStrokeGroup.parentNode?.insertBefore(bgGroup, originalStrokeGroup);
        }

        // 3. Style colored stroke numbers 1, 2, 3...
        const numbersGroup = svgEl.querySelector('[id^="kvg:StrokeNumbers_"]');
        if (numbersGroup) {
          if (!showNumbers) {
            numbersGroup.setAttribute('style', 'display:none;');
          } else {
            const texts = numbersGroup.querySelectorAll('text');
            texts.forEach((txt, i) => {
              const color = STROKE_COLORS[i % STROKE_COLORS.length];
              txt.setAttribute('fill', color);
              txt.setAttribute('font-size', '6.5px');
              txt.setAttribute('font-weight', '800');
              txt.setAttribute('font-family', 'var(--font-ui), "Times New Roman", serif');
              txt.setAttribute('opacity', '0.95');
            });
          }
        }

        // Append SVG directly to DOM container
        containerRef.current.innerHTML = '';
        containerRef.current.appendChild(svgEl);
        setError(false);

        // Instantly trigger animation
        setTimeout(() => {
          animateStrokes();
        }, 50);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [activeChar, showNumbers, animateStrokes, onStrokesLoaded]);

  // Embedded Mini Mode
  if (!standalone) {
    return (
      <div className="flex flex-col items-center gap-1.5 w-full h-full justify-center">
        {/* Multi-character Selector Tabs */}
        {chars.length > 1 && (
          <div className="flex items-center gap-1 bg-surface-container-lowest/80 p-0.5 rounded-lg border border-outline-variant/30 max-w-full overflow-x-auto">
            {chars.map((c, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedCharIndex(idx);
                }}
                className={`px-1.5 py-0.5 rounded text-[10px] font-black transition-all cursor-pointer ${
                  selectedCharIndex === idx
                    ? 'bg-amber-500 text-white shadow-2xs'
                    : 'text-outline hover:text-on-surface hover:bg-surface-container-low'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        )}

        <div className="relative w-full flex-1 flex items-center justify-center min-h-[64px]">
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="w-5 h-5 text-amber-600 animate-spin" />
            </div>
          )}
          {error ? (
            <div className="flex flex-col items-center justify-center p-1 text-center">
              <span className="text-2xl font-black text-amber-700 font-serif">{activeChar}</span>
              <span className="text-[10px] text-outline mt-0.5">Thứ tự nét viết chuẩn</span>
            </div>
          ) : (
            <div ref={containerRef} className="w-full h-full flex items-center justify-center" />
          )}
        </div>
      </div>
    );
  }

  // Standalone Full Screen Mode
  return (
    <div
      style={{ width: size }}
      className="relative flex flex-col items-center bg-white border border-[#e7e5e4] p-3 select-none"
    >
      {/* Multi-character Selector Pills */}
      {chars.length > 1 && (
        <div className="flex items-center gap-1.5 mb-2 bg-[#fafaf9] p-1 border border-[#e7e5e4] w-full overflow-x-auto">
          {chars.map((c, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedCharIndex(idx)}
              className={`px-2 py-0.5 text-xs font-mono font-bold transition-all cursor-pointer ${
                selectedCharIndex === idx
                  ? 'bg-[#1c1917] text-white shadow-xs'
                  : 'text-[#78716c] hover:text-[#1c1917]'
              }`}
            >
              {c} ({idx + 1})
            </button>
          ))}
        </div>
      )}

      {/* SVG Canvas Area with explicit fixed dimensions */}
      <div
        style={{ width: size - 24, height: size - 24 }}
        className="relative flex items-center justify-center bg-[#fafaf9] border border-[#f5f5f4]"
      >
        {loading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 z-10">
            <Loader2 className="w-6 h-6 text-[#b91c1c] animate-spin mb-1.5" />
            <p className="text-[11px] text-[#78716c] font-mono">Đang nạp nét viết...</p>
          </div>
        )}

        {error ? (
          <div className="flex flex-col items-center justify-center text-center p-2">
            <span className="text-4xl font-black text-[#1c1917] font-serif mb-1">{activeChar}</span>
            <div className="flex items-center gap-1 text-[11px] text-[#78716c]">
              <AlertCircle size={12} />
              <span>Nét viết tiêu chuẩn</span>
            </div>
          </div>
        ) : (
          <div ref={containerRef} className="w-full h-full flex items-center justify-center" />
        )}
      </div>

      {/* Control Footer - clean centered button without redundant stroke count */}
      <div className="w-full flex items-center justify-center mt-3 pt-2 border-t border-[#e7e5e4]">
        <button
          onClick={animateStrokes}
          disabled={loading || isPlaying}
          className="w-full py-1.5 bg-[#b91c1c]/10 hover:bg-[#b91c1c] text-[#b91c1c] hover:text-white text-xs font-mono font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
        >
          <RotateCcw size={12} className={isPlaying ? 'animate-spin' : ''} />
          <span>Vẽ lại</span>
        </button>
      </div>
    </div>
  );
}
