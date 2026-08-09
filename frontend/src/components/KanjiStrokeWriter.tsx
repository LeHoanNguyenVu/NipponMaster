import { useState, useEffect, useRef, useCallback } from 'react';
import { Loader2, RotateCcw } from 'lucide-react';
import gsap from 'gsap';

interface KanjiStrokeWriterProps {
  character: string;
  size?: number;
  showNumbers?: boolean;
  standalone?: boolean;
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
}: KanjiStrokeWriterProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [totalStrokes, setTotalStrokes] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<gsap.core.Timeline | null>(null);

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

  useEffect(() => {
    if (!character) return;
    setLoading(true);
    setError(false);
    setTotalStrokes(0);

    if (animationRef.current) {
      animationRef.current.kill();
      animationRef.current = null;
    }

    if (containerRef.current) {
      containerRef.current.innerHTML = '';
    }

    const codePoint = character.codePointAt(0);
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

        // Parse SVG string with DOMParser for guaranteed DOM node access
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
          setTotalStrokes(paths.length);

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
              txt.setAttribute('font-family', 'system-ui, sans-serif');
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
  }, [character, showNumbers, animateStrokes]);

  if (!standalone) {
    // Embedded Mode inside KanjiInteractiveCanvas
    return (
      <div className="relative w-full h-full flex items-center justify-center">
        <div ref={containerRef} className="w-full h-full flex items-center justify-center" />
      </div>
    );
  }

  // Standalone Mode (with frame, replay button, grid background)
  return (
    <div className="flex flex-col items-center gap-3 bg-surface-container-lowest p-4 rounded-2xl border border-outline-variant/30 shadow-sm relative font-sans">
      {/* Grid Canvas Box with Replay Button */}
      <div
        className="border-2 border-dashed border-outline-variant/60 rounded-2xl relative flex items-center justify-center bg-surface-container-lowest/60 shadow-inner overflow-hidden"
        style={{ width: size, height: size }}
      >
        {/* Replay Button at Top Right */}
        {!loading && !error && (
          <button
            onClick={animateStrokes}
            disabled={isPlaying}
            title="Phát lại thứ tự nét vẽ (Replay)"
            className="absolute top-2.5 right-2.5 z-20 p-2 rounded-xl bg-surface-container/90 hover:bg-primary/15 text-primary border border-outline-variant/40 shadow-sm transition-all cursor-pointer disabled:opacity-50 flex items-center gap-1 text-xs font-bold"
          >
            <RotateCcw size={14} className={isPlaying ? 'animate-spin' : ''} />
            <span>Phát lại</span>
          </button>
        )}

        {/* Traditional Japanese Grid Lines (Chữ 田) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
          <div className="w-full h-[1px] border-t border-dashed border-outline-variant/60"></div>
          <div className="h-full w-[1px] border-l border-dashed border-outline-variant/60 absolute"></div>
          <div className="w-full h-[1px] border-t border-dotted border-outline-variant/30 rotate-45 absolute"></div>
          <div className="w-full h-[1px] border-t border-dotted border-outline-variant/30 -rotate-45 absolute"></div>
        </div>

        {/* Total Stroke Count Badge */}
        {totalStrokes > 0 && (
          <div className="absolute bottom-2.5 left-2.5 z-20 px-2 py-0.5 rounded-full bg-surface-container/80 text-[11px] font-bold text-on-surface-variant border border-outline-variant/30">
            {totalStrokes} nét
          </div>
        )}

        {/* SVG Container */}
        {loading ? (
          <div className="flex flex-col items-center gap-2 text-primary font-bold text-xs">
            <Loader2 className="animate-spin text-primary" size={28} />
            <span>Đang tải nét vẽ...</span>
          </div>
        ) : error ? (
          <div className="text-center p-3">
            <span className="text-4xl font-jp block mb-1">{character}</span>
            <span className="text-xs text-on-surface-variant font-medium">Chữ mẫu không nét vẽ</span>
          </div>
        ) : (
          <div ref={containerRef} className="w-full h-full p-4 flex items-center justify-center text-on-surface" />
        )}
      </div>
    </div>
  );
}
