import { useState } from 'react';
import { Volume2, Play, Lightbulb } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';
import type { KanaChar } from '../../../data/kanaData';
import {
  SEION_ROW_ORDER,
  DAKUON_ROW_ORDER,
  HANDAKUON_ROW_ORDER,
  YOON_ROW_ORDER,
  EXTENDED_SOUND_RULES,
  getKanaRowLabel,
  groupByRow,
  speakJapanese,
} from '../../../data/kanaData';
import type { OverviewGridProps } from '../types';

export default function OverviewGrid({
  kanaType,
  onToggleType,
  getChars,
  onStartLesson,
  gridRef,
}: OverviewGridProps) {
  const { t, i18n } = useTranslation(['beginner']);
  const currentLang = i18n.language || 'vi';
  const [selectedChar, setSelectedChar] = useState<KanaChar | null>(null);
  const [activeRuleTab, setActiveRuleTab] = useState<string>('sokuon');
  const chars = getChars();

  const handleCellClick = (c: KanaChar) => {
    setSelectedChar(c);
    speakJapanese(c.char);
  };

  const renderSection = (title: string, data: KanaChar[], rowOrder: string[]) => {
    const grouped = groupByRow(data);
    return (
      <div className="mb-8">
        <h3 className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-3 font-serif">
          {title}
        </h3>
        {rowOrder.map((row) => {
          const rowChars = grouped.get(row);
          if (!rowChars) return null;
          return (
            <div key={row} className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-on-surface-variant">
                  {getKanaRowLabel(row, currentLang)}
                </span>
                <button
                  onClick={() => onStartLesson(row)}
                  className="text-xs font-semibold text-primary hover:text-primary-container cursor-pointer flex items-center gap-1 transition-colors px-2.5 py-1 border border-primary/30 hover:bg-primary/10"
                  style={{ borderRadius: '2px' }}
                >
                  <Play size={12} fill="currentColor" /> {t('beginner:alphabet.startButton')}
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {rowChars.map((c) => (
                  <button
                    key={c.char}
                    data-kana-cell
                    onClick={() => handleCellClick(c)}
                    className={`w-14 h-16 md:w-16 md:h-[72px] border-2 flex flex-col items-center justify-center gap-0.5 cursor-pointer transition-all hover:scale-102 hover:shadow-flat-sm ${
                      selectedChar?.char === c.char
                        ? 'border-primary bg-primary/8 shadow-flat-sm scale-102'
                        : 'border-outline-variant/40 bg-surface-container-lowest hover:border-primary/50'
                    }`}
                    style={{ borderRadius: '2px' }}
                  >
                    <span
                      className={`text-xl md:text-2xl font-bold font-jp ${
                        selectedChar?.char === c.char ? 'text-primary' : 'text-on-surface'
                      }`}
                    >
                      {c.char}
                    </span>
                    <span className="text-[10px] text-on-surface-variant font-medium">{c.romaji}</span>
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const currentRule =
    EXTENDED_SOUND_RULES.find((r) => r.id === activeRuleTab) || EXTENDED_SOUND_RULES[0];

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Left: Grid + Sound Rules */}
      <div className="flex-1 min-w-0">
        {/* Toggle Hiragana / Katakana */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={onToggleType}
            className={`px-4 py-2 text-sm font-bold transition-all cursor-pointer border ${
              kanaType === 'hiragana'
                ? 'bg-primary text-on-primary border-primary shadow-flat-sm'
                : 'bg-surface-container border-outline-variant/30 text-on-surface-variant hover:bg-surface-container-high'
            }`}
            style={{ borderRadius: '2px' }}
          >
            あ {t('beginner:alphabet.subTabs.hiragana')}
          </button>
          <button
            onClick={onToggleType}
            className={`px-4 py-2 text-sm font-bold transition-all cursor-pointer border ${
              kanaType === 'katakana'
                ? 'bg-primary text-on-primary border-primary shadow-flat-sm'
                : 'bg-surface-container border-outline-variant/30 text-on-surface-variant hover:bg-surface-container-high'
            }`}
            style={{ borderRadius: '2px' }}
          >
            ア {t('beginner:alphabet.subTabs.katakana')}
          </button>
        </div>

        {/* Kana Table Sections */}
        <div ref={gridRef}>
          {renderSection(t('beginner:alphabet.sections.seion'), chars.seion, SEION_ROW_ORDER)}
          {renderSection(t('beginner:alphabet.sections.dakuon'), chars.dakuon, DAKUON_ROW_ORDER)}
          {renderSection(t('beginner:alphabet.sections.handakuon'), chars.handakuon, HANDAKUON_ROW_ORDER)}
          {renderSection(t('beginner:alphabet.sections.yoon'), chars.yoon, YOON_ROW_ORDER)}
        </div>

        {/* ── BỔ SUNG QUY TẮC ÂM ĐỌC MỞ RỘNG ── */}
        <div className="mt-10 pt-8 border-t border-outline-variant/30">
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb size={20} className="text-amber-500" />
            <h2 className="text-lg font-bold text-on-surface tracking-tight font-serif">
              {t('beginner:alphabet.sections.extendedRules')}
            </h2>
          </div>
          <p className="text-xs text-on-surface-variant mb-5">
            {t('beginner:alphabet.sections.extendedRulesDesc')}
          </p>

          {/* Rule Tabs */}
          <div className="flex flex-wrap gap-2 mb-4">
            {EXTENDED_SOUND_RULES.map((rule) => (
              <button
                key={rule.id}
                onClick={() => setActiveRuleTab(rule.id)}
                className={`px-3.5 py-2 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 border ${
                  activeRuleTab === rule.id
                    ? 'bg-amber-600 text-white border-amber-600 shadow-flat-sm'
                    : 'bg-surface-container border-outline-variant/30 text-on-surface-variant hover:bg-surface-container-high'
                }`}
                style={{ borderRadius: '2px' }}
              >
                <span>{rule.badge}</span>
                <span>{rule.name}</span>
              </button>
            ))}
          </div>

          {/* Rule Detail Card */}
          <div
            className="bg-surface-container-lowest border border-outline-variant/40 p-5 md:p-6 shadow-sm"
            style={{ borderRadius: '2px' }}
          >
            <div className="flex items-start justify-between gap-4 mb-3">
              <div>
                <h3 className="text-base font-bold text-on-surface flex items-center gap-2">
                  <span>{currentRule.name}</span>
                  <span
                    className="text-xs px-2 py-0.5 border border-amber-500/30 bg-amber-500/10 text-amber-700 font-semibold"
                    style={{ borderRadius: '2px' }}
                  >
                    {currentRule.subtitle}
                  </span>
                </h3>
                <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
                  {currentRule.description}
                </p>
              </div>
            </div>

            {/* Formula box */}
            <div
              className="p-3 bg-amber-500/8 border border-amber-500/20 mb-4"
              style={{ borderRadius: '2px' }}
            >
              <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider block mb-1">
                {t('beginner:alphabet.formulaLabel')}
              </span>
              <span className="text-xs font-semibold text-on-surface font-mono">
                {currentRule.formula}
              </span>
            </div>

            {/* Notes */}
            <div className="space-y-1 mb-5">
              {currentRule.notes.map((n, i) => (
                <div key={i} className="text-xs text-on-surface-variant flex items-start gap-1.5">
                  <span className="text-amber-500 font-bold">•</span>
                  <span>{n}</span>
                </div>
              ))}
            </div>

            {/* Examples grid */}
            <div>
              <h4 className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2.5">
                {t('beginner:alphabet.examplesLabel')}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {currentRule.examples.map((ex, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl bg-surface-container/60 border border-outline-variant/20 hover:border-amber-500/40 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold font-jp text-on-surface">{ex.word}</span>
                        <span className="text-xs font-mono text-primary font-semibold">[{ex.romaji}]</span>
                      </div>
                      <button
                        onClick={() => speakJapanese(ex.word)}
                        className="p-1.5 rounded-lg bg-surface-container-high hover:bg-primary hover:text-white cursor-pointer transition-colors"
                        title="Nghe phát âm"
                      >
                        <Volume2 size={14} />
                      </button>
                    </div>
                    <div className="text-xs text-on-surface-variant font-medium">{ex.meaning}</div>

                    {ex.contrastWith && (
                      <div className="mt-2 pt-2 border-t border-outline-variant/30 flex items-center justify-between text-[11px] text-on-surface-variant">
                        <div>
                          <span className="text-error font-semibold">Phân biệt: </span>
                          <span className="font-jp font-bold text-on-surface">{ex.contrastWith.word}</span>{' '}
                          ({ex.contrastWith.romaji}) — {ex.contrastWith.meaning}
                        </div>
                        <button
                          onClick={() => speakJapanese(ex.contrastWith!.word)}
                          className="p-1 rounded hover:bg-surface-container-high cursor-pointer ml-1"
                          title="Nghe đối chiếu"
                        >
                          <Volume2 size={12} className="text-error" />
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right: Selected Char Detail Panel */}
      <AnimatePresence>
        {selectedChar && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="w-full lg:w-80 flex-shrink-0"
          >
            <div className="sticky top-4 bg-surface-container-lowest rounded-2xl border border-outline-variant/30 p-6 shadow-sm">
              <div className="text-center mb-5">
                <div className="text-7xl font-bold font-jp text-primary mb-2">{selectedChar.char}</div>
                <div className="text-xl font-bold text-on-surface">{selectedChar.romaji}</div>
                <div className="text-xs text-on-surface-variant mt-1">
                  {selectedChar.strokeCount} nét •{' '}
                  {selectedChar.category === 'seion'
                    ? 'Âm trong'
                    : selectedChar.category === 'dakuon'
                    ? 'Âm đục'
                    : selectedChar.category === 'handakuon'
                    ? 'Bán đục'
                    : 'Âm ghép'}
                </div>
              </div>

              <button
                onClick={() => speakJapanese(selectedChar.char)}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-secondary/10 text-secondary font-semibold text-sm cursor-pointer hover:bg-secondary/20 transition-colors mb-4"
              >
                <Volume2 size={16} /> Nghe phát âm
              </button>

              <div className="bg-surface-container rounded-xl p-4 mb-4">
                <div className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-2">
                  Ví dụ từ vựng
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-bold font-jp text-on-surface">
                    {selectedChar.exampleWord}
                  </span>
                  <button
                    onClick={() => speakJapanese(selectedChar.exampleWord)}
                    className="p-1.5 rounded-lg hover:bg-surface-container-high cursor-pointer"
                  >
                    <Volume2 size={14} className="text-on-surface-variant" />
                  </button>
                </div>
                <div className="text-sm text-on-surface-variant mt-1">
                  <span className="font-medium">{selectedChar.exampleReading}</span> —{' '}
                  {selectedChar.exampleMeaning}
                </div>
              </div>

              <button
                onClick={() => onStartLesson(selectedChar.row)}
                className="w-full py-3 rounded-xl bg-primary text-on-primary font-bold text-sm cursor-pointer hover:bg-primary-container transition-colors flex items-center justify-center gap-2"
              >
                <Play size={14} fill="currentColor" /> Bắt đầu học {getKanaRowLabel(selectedChar.row)}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

