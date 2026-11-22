import { useState } from 'react';
import { BookMarked, ChevronDown, ChevronUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { ReadingKeyVocab } from '../../../api/readingApi';

interface KeyVocabPanelProps {
  keyVocab: ReadingKeyVocab[];
}

export default function KeyVocabPanel({ keyVocab }: KeyVocabPanelProps) {
  const { t } = useTranslation('reading');
  const [expanded, setExpanded] = useState(true);

  if (!keyVocab || keyVocab.length === 0) return null;

  return (
    <section
      className="bg-surface-container-lowest border border-outline-variant/60 mb-6"
      style={{ borderRadius: '2px' }}
    >
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-surface-container-low/60 transition-colors cursor-pointer"
      >
        <div className="flex items-center gap-2">
          <BookMarked size={16} className="text-primary" />
          <span className="text-sm font-bold text-on-surface font-serif">
            {t('reader.keyVocabTitle')}
          </span>
          <span
            className="text-[11px] px-2 py-0.5 bg-surface-container text-on-surface-variant font-serif"
            style={{ borderRadius: '2px' }}
          >
            {t('reader.keyVocabCount', { count: keyVocab.length })}
          </span>
        </div>
        {expanded ? <ChevronUp size={16} className="text-outline" /> : <ChevronDown size={16} className="text-outline" />}
      </button>

      {expanded && (
        <div className="px-4 pb-4 pt-1 border-t border-outline-variant/40 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {keyVocab.map((kv, idx) => (
            <div
              key={`${kv.word}-${idx}`}
              className="p-2.5 bg-surface-bright border border-outline-variant/40 flex items-start justify-between gap-2"
              style={{ borderRadius: '2px' }}
            >
              <div className="min-w-0">
                <div className="flex items-baseline gap-2 flex-wrap">
                  <span className="font-jp font-bold text-base text-on-surface">{kv.word}</span>
                  {kv.reading && kv.reading !== kv.word && (
                    <span className="font-jp text-xs text-outline">({kv.reading})</span>
                  )}
                </div>
                <p className="text-xs text-on-surface-variant mt-0.5 font-serif">{kv.meaningVi}</p>
              </div>
              {kv.jlptLevel && (
                <span
                  className="shrink-0 text-[10px] font-bold px-1.5 py-0.5 bg-primary/10 text-primary border border-primary/20"
                  style={{ borderRadius: '2px' }}
                >
                  {kv.jlptLevel}
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
