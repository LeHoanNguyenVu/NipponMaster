import { useEffect, useState } from 'react';
import { Volume2 } from 'lucide-react';

interface NewspaperVisualProps {
  category: string;
  jlptLevel: string;
  sourceName?: string;
  audioStatus?: string;
  coverImageUrl?: string | null;
  coverImageCredit?: string | null;
  alt?: string;
  variant?: 'hero' | 'thumb' | 'article';
}

const CATEGORY_ART: Record<
  string,
  { bg: string; kanji: string; labelJa: string; accent: string }
> = {
  SOCIETY: {
    bg: 'from-[#1f2937] via-[#2b3748] to-[#111827]',
    kanji: '社会',
    labelJa: 'SOCIETY',
    accent: 'bg-[#b91c1c]',
  },
  LIFE: {
    bg: 'from-[#1c3a32] via-[#264d42] to-[#122621]',
    kanji: '生活',
    labelJa: 'LIFESTYLE',
    accent: 'bg-[#0f766e]',
  },
  ECONOMY: {
    bg: 'from-[#2c2538] via-[#3a314a] to-[#191522]',
    kanji: '経済',
    labelJa: 'ECONOMY',
    accent: 'bg-[#b45309]',
  },
  SCI_TECH: {
    bg: 'from-[#172a46] via-[#1f3b63] to-[#0f1c30]',
    kanji: '科学',
    labelJa: 'SCI & TECH',
    accent: 'bg-[#1d4ed8]',
  },
  SPORTS: {
    bg: 'from-[#3b1d22] via-[#54262d] to-[#231013]',
    kanji: '運動',
    labelJa: 'SPORTS',
    accent: 'bg-[#dc2626]',
  },
  CULTURE: {
    bg: 'from-[#3a281d] via-[#523929] to-[#221710]',
    kanji: '文化',
    labelJa: 'CULTURE',
    accent: 'bg-[#a16207]',
  },
  WEATHER: {
    bg: 'from-[#193545] via-[#21485e] to-[#10222d]',
    kanji: '気象',
    labelJa: 'WEATHER',
    accent: 'bg-[#0284c7]',
  },
};

function isSafeHttpsUrl(url?: string | null): boolean {
  if (!url) return false;
  try {
    return new URL(url).protocol === 'https:';
  } catch {
    return false;
  }
}

export function formatRelativeTime(isoDate?: string | null, lang: 'vi' | 'en' = 'vi'): string {
  if (!isoDate) return lang === 'en' ? 'Updated today' : 'Cập nhật hôm nay';
  const ts = Date.parse(isoDate);
  if (Number.isNaN(ts)) return lang === 'en' ? 'Updated today' : 'Cập nhật hôm nay';
  const diffMin = Math.max(1, Math.floor((Date.now() - ts) / 60000));
  if (diffMin < 60) {
    return lang === 'en' ? `Updated ${diffMin}m ago` : `Cập nhật ${diffMin} phút trước`;
  }
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) {
    return lang === 'en' ? `Updated ${diffHr}h ago` : `Cập nhật ${diffHr} giờ trước`;
  }
  const diffDay = Math.floor(diffHr / 24);
  return lang === 'en' ? `Updated ${diffDay}d ago` : `Cập nhật ${diffDay} ngày trước`;
}

/**
 * Ảnh bìa bài báo (ưu tiên ảnh Hybrid hợp pháp từ Gemini AI / Pexels / Admin;
 * tự fallback về đồ họa báo chí NHK khi chưa có ảnh hoặc ảnh lỗi).
 */
export default function NewspaperVisual({
  category,
  jlptLevel,
  sourceName,
  audioStatus,
  coverImageUrl,
  coverImageCredit,
  alt,
  variant = 'thumb',
}: NewspaperVisualProps) {
  const art = CATEGORY_ART[category] || CATEGORY_ART.SOCIETY;
  const [imgFailed, setImgFailed] = useState(false);

  useEffect(() => {
    setImgFailed(false);
  }, [coverImageUrl]);

  const showRealImage = !imgFailed && isSafeHttpsUrl(coverImageUrl);

  if (variant === 'thumb') {
    if (showRealImage) {
      return (
        <div
          className="relative w-24 h-16 sm:w-28 sm:h-[70px] shrink-0 overflow-hidden bg-surface-container select-none"
          style={{ borderRadius: '2px' }}
        >
          <img
            src={coverImageUrl!}
            alt={alt || art.labelJa}
            loading="lazy"
            onError={() => setImgFailed(true)}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
          <span
            className={`absolute top-1 left-1 px-1.5 py-0.5 text-[9px] font-bold tracking-wide text-white shadow-xs ${art.accent}`}
          >
            {jlptLevel}
          </span>
        </div>
      );
    }

    return (
      <div
        className={`relative w-24 h-16 sm:w-28 sm:h-[70px] shrink-0 overflow-hidden bg-gradient-to-br ${art.bg} text-white select-none flex flex-col justify-between p-1.5`}
        style={{ borderRadius: '2px' }}
      >
        <span className="absolute -right-1 -bottom-2 font-jp text-3xl font-black text-white/12 leading-none pointer-events-none">
          {art.kanji}
        </span>
        <div className="flex items-center justify-between gap-1 z-10">
          <span className={`px-1.5 py-0.5 text-[10px] font-bold tracking-wide ${art.accent}`}>
            {jlptLevel}
          </span>
          {audioStatus === 'READY' && <Volume2 size={11} className="text-white/80" />}
        </div>
        <span className="font-jp text-[10px] font-semibold text-white/75 tracking-wider z-10">
          {art.kanji}
        </span>
      </div>
    );
  }

  const heightCls = variant === 'hero' ? 'aspect-[16/10]' : 'aspect-[16/9] max-h-[340px]';

  if (showRealImage) {
    return (
      <figure className="space-y-1">
        <div
          className={`relative w-full ${heightCls} overflow-hidden bg-surface-container select-none`}
          style={{ borderRadius: '2px' }}
        >
          <img
            src={coverImageUrl!}
            alt={alt || art.labelJa}
            loading={variant === 'article' ? 'eager' : 'lazy'}
            onError={() => setImgFailed(true)}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          />
          <div className="absolute top-3 left-3 flex items-center gap-1.5 z-10">
            <span className="px-2 py-0.5 bg-white/95 text-[#111827] text-[10px] font-extrabold tracking-widest uppercase shadow-xs">
              NIPPON NEWS
            </span>
            <span className={`px-2 py-0.5 text-[11px] font-bold text-white shadow-xs ${art.accent}`}>
              {jlptLevel}
            </span>
          </div>
          {audioStatus === 'READY' && (
            <span className="absolute top-3 right-3 inline-flex items-center gap-1 px-2 py-0.5 bg-black/55 text-[10px] font-semibold text-white/95 backdrop-blur-[1px]">
              <Volume2 size={11} />
              Audio
            </span>
          )}
        </div>
        {coverImageCredit && (
          <figcaption className="text-[10px] text-outline text-right">
            {coverImageCredit}
          </figcaption>
        )}
      </figure>
    );
  }

  return (
    <div
      className={`relative w-full ${variant === 'hero' ? 'aspect-[16/10]' : 'h-40 sm:h-48'} overflow-hidden bg-gradient-to-br ${art.bg} text-white select-none flex flex-col justify-between p-4 sm:p-5`}
      style={{ borderRadius: '2px' }}
    >
      {/* Subtle press grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, #fff 0px, #fff 1px, transparent 1px, transparent 22px)',
        }}
      />
      <span className="absolute right-4 -bottom-4 font-jp text-7xl sm:text-8xl font-black text-white/12 leading-none pointer-events-none">
        {art.kanji}
      </span>

      <div className="flex items-center justify-between gap-2 z-10">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 bg-white text-[#111827] text-[10px] font-extrabold tracking-widest uppercase">
            NIPPON NEWS
          </span>
          <span className={`px-2 py-0.5 text-[11px] font-bold ${art.accent}`}>{jlptLevel}</span>
        </div>
        {audioStatus === 'READY' && (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-black/35 text-[10px] font-semibold text-white/90">
            <Volume2 size={11} />
            Audio
          </span>
        )}
      </div>

      <div className="z-10 flex items-end justify-between gap-2">
        <div>
          <div className="text-[10px] uppercase tracking-[0.2em] text-white/65 font-semibold">
            {art.labelJa}
          </div>
          <div className="font-jp text-lg sm:text-xl font-bold text-white/95 tracking-wide">
            {art.kanji}ニュース
          </div>
        </div>
        {sourceName && (
          <span className="text-[10px] font-mono text-white/65 tracking-wider">{sourceName}</span>
        )}
      </div>
    </div>
  );
}
