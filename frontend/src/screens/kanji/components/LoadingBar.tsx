import { useState, useEffect } from 'react';

interface LoadingBarProps {
  label: string;
  compact?: boolean;
}

export function LoadingBar({ label, compact = false }: LoadingBarProps) {
  const [progress, setProgress] = useState(6);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((p) => p + (92 - p) * 0.07);
    }, 120);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className={`w-full flex flex-col items-center justify-center text-[#78716c] ${compact ? 'py-8' : 'py-16 px-8'}`}>
      <div className="w-full max-w-sm">
        <div className="flex items-center justify-between text-xs font-mono mb-1.5">
          <span className="font-medium">{label}</span>
          <span className="font-bold text-[#b91c1c]">{Math.round(progress)}%</span>
        </div>
        <div className="h-2 w-full bg-[#f5f5f4] border border-[#e7e5e4] overflow-hidden">
          <div
            className="h-full bg-[#b91c1c] transition-[width] duration-200 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}

