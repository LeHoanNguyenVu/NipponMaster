import { useState, useEffect, useRef } from 'react';
import { Loader2, RotateCcw } from 'lucide-react';
import gsap from 'gsap';

interface KanjiStrokeWriterProps {
  character: string;
}

export default function KanjiStrokeWriter({ character }: KanjiStrokeWriterProps) {
  const [svgContent, setSvgContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (!character) return;
    setLoading(true);
    setError(false);
    setSvgContent('');
    
    if (animationRef.current) {
      animationRef.current.kill();
      animationRef.current = null;
    }

    const codePoint = character.codePointAt(0);
    if (!codePoint) {
      setLoading(false);
      setError(true);
      return;
    }
    
    // Construct KanjiVG file name (5 digits hex code padded with zeros)
    const hex = codePoint.toString(16).toLowerCase().padStart(5, '0');
    const url = `https://cdn.jsdelivr.net/gh/KanjiVG/kanjivg@master/kanji/${hex}.svg`;

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load Kanji SVG');
        return res.text();
      })
      .then((text) => {
        const svgStartIndex = text.indexOf('<svg');
        if (svgStartIndex !== -1) {
          setSvgContent(text.substring(svgStartIndex));
        } else {
          setSvgContent(text);
        }
        setError(false);
      })
      .catch((err) => {
        console.error(err);
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [character]);

  const animateStrokes = () => {
    if (!containerRef.current) return;
    
    // Kill any existing timeline
    if (animationRef.current) {
      animationRef.current.kill();
    }

    // Select the foreground paths (we'll style them as active)
    const activePaths = containerRef.current.querySelectorAll('.fg-paths path');
    if (activePaths.length === 0) return;

    // Create a new timeline
    const tl = gsap.timeline();
    animationRef.current = tl;

    // Reset all foreground paths to hidden
    activePaths.forEach((pathNode) => {
      const path = pathNode as SVGPathElement;
      const length = path.getTotalLength();
      path.style.strokeDasharray = `${length}`;
      path.style.strokeDashoffset = `${length}`;
      // Make it visible (in case it was hidden)
      path.style.opacity = '1';
    });

    // Animate each path in order
    activePaths.forEach((pathNode) => {
      const path = pathNode as SVGPathElement;
      
      tl.to(path, {
        strokeDashoffset: 0,
        duration: 0.65,
        ease: 'power1.out',
      }, '+=0.1'); // brief delay between strokes
    });
  };

  useEffect(() => {
    if (svgContent && containerRef.current) {
      const svgEl = containerRef.current.querySelector('svg');
      if (svgEl) {
        svgEl.setAttribute('width', '100%');
        svgEl.setAttribute('height', '100%');
        svgEl.setAttribute('viewBox', '0 0 109 109');
        
        // Find stroke paths group
        const originalStrokeGroup = svgEl.querySelector('[id^="kvg:StrokePaths_"]');
        if (originalStrokeGroup) {
          // 1. Create a background guide group (faint gray)
          const bgGroup = originalStrokeGroup.cloneNode(true) as HTMLElement;
          bgGroup.setAttribute('id', 'bg-guide-paths');
          bgGroup.setAttribute('style', 'fill:none;stroke:var(--color-outline-variant, #e5e5e5);stroke-width:3;stroke-linecap:round;stroke-linejoin:round;opacity:0.35;');
          
          // 2. Format the original stroke group as the foreground drawing group (crimson/primary)
          originalStrokeGroup.setAttribute('class', 'fg-paths');
          originalStrokeGroup.setAttribute('style', 'fill:none;stroke:var(--color-primary, #c01538);stroke-width:3.5;stroke-linecap:round;stroke-linejoin:round;');
          
          // Insert the bg guide group BEFORE the active fg paths group so it stays underneath
          originalStrokeGroup.parentNode?.insertBefore(bgGroup, originalStrokeGroup);
        }

        // Style the stroke order numbers
        const numbersGroup = svgEl.querySelector('[id^="kvg:StrokeNumbers_"]');
        if (numbersGroup) {
          numbersGroup.setAttribute('style', 'font-size:5.5px;fill:var(--color-primary, #c01538);opacity:0.8;font-family:ui-sans-serif, system-ui;font-weight:700;');
          // Reposition numbers slightly or leave them as is
        }
      }

      // Trigger animation with a minor delay
      const timer = setTimeout(() => {
        animateStrokes();
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [svgContent]);

  return (
    <div className="flex flex-col items-center gap-4 bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant/30 shadow-sm relative overflow-hidden">
      {/* Grid Canvas Frame */}
      <div className="w-48 h-48 border-2 border-dashed border-outline-variant/60 rounded-xl relative flex items-center justify-center bg-surface-container-lowest/50 shadow-inner">
        {/* Traditional Grid lines */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-full h-[1px] border-t border-dashed border-outline-variant/20"></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="h-full w-[1px] border-l border-dashed border-outline-variant/20"></div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="animate-spin text-primary" size={32} />
            <span className="text-xs text-on-surface-variant font-medium">Đang tải nét vẽ...</span>
          </div>
        ) : error ? (
          <div className="text-center p-3">
            <span className="text-3xl font-jp mb-1 block">✍️</span>
            <span className="text-xs text-on-surface-variant font-medium block">Không có dữ liệu nét vẽ</span>
          </div>
        ) : (
          <div 
            ref={containerRef} 
            className="w-44 h-44 flex items-center justify-center text-on-surface"
            dangerouslySetInnerHTML={{ __html: svgContent }}
          />
        )}
      </div>

      {/* Control Buttons */}
      {!loading && !error && svgContent && (
        <div className="flex items-center gap-2">
          <button
            onClick={animateStrokes}
            className="px-3 py-1.5 bg-primary/10 hover:bg-primary/20 text-primary text-xs font-bold rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
            title="Vẽ lại"
          >
            <RotateCcw size={14} />
            Vẽ lại
          </button>
        </div>
      )}
    </div>
  );
}
