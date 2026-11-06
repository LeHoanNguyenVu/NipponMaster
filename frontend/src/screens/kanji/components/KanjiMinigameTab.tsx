import React from 'react';
import { Maximize2, Volume2 } from 'lucide-react';
import type { ChapterMinigame, ParsedMinigameData } from '../types';
import { BookImage } from './BookImage';
import { getShuffledBank, toCircledNum } from '../themes';
import { resolveKanjiAssetUrl } from '../../../utils/mediaUrl';

interface KanjiMinigameTabProps {
  minigames: ChapterMinigame[];
  chapterNumber: number;
  minigameInputs: Record<string, string>;
  setMinigameInputs: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  activeBlankKey: string | null;
  setActiveBlankKey: React.Dispatch<React.SetStateAction<string | null>>;
  checkedGames: Record<number, boolean>;
  setCheckedGames: React.Dispatch<React.SetStateAction<Record<number, boolean>>>;
  showSolutions: Record<number, boolean>;
  setShowSolutions: React.Dispatch<React.SetStateAction<Record<number, boolean>>>;
  shuffleSeeds: Record<number, number>;
  setShuffleSeeds: React.Dispatch<React.SetStateAction<Record<number, number>>>;
  playingAudioId: string | null;
  handlePlayDialogueAudio: (
    audioId: string,
    utt: { audio?: string; text?: string },
    blanks?: Array<{ id: number; hiragana?: string; targetWord?: string; answer?: string }>
  ) => void;
  onOpenModal: (url: string, title: string) => void;
}

export function KanjiMinigameTab({
  minigames,
  chapterNumber,
  minigameInputs,
  setMinigameInputs,
  activeBlankKey,
  setActiveBlankKey,
  checkedGames,
  setCheckedGames,
  showSolutions,
  setShowSolutions,
  shuffleSeeds,
  setShuffleSeeds,
  playingAudioId,
  handlePlayDialogueAudio,
  onOpenModal,
}: KanjiMinigameTabProps) {
  return (
    <div className="space-y-8">
      {minigames?.map((game) => {
        let parsedData: ParsedMinigameData = {};
        try {
          parsedData = JSON.parse(game.gameDataJson);
        } catch {
          parsedData = {};
        }

        return (
          <div key={game.id} className="bg-white border border-[#e7e5e4] p-6 shadow-xs">
            {/* Header minigame */}
            <div className="flex items-start justify-between pb-3 border-b border-[#e7e5e4] mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-mono uppercase bg-[#1c1917] text-white px-2 py-0.5 font-bold">
                    {game.gameType}
                  </span>
                  <span className="text-[11px] font-mono text-[#b91c1c] font-bold">
                    CHƯƠNG {chapterNumber}
                  </span>
                </div>
                <h3 className="font-serif font-bold text-xl text-[#1c1917]">
                  {game.title}
                </h3>
                <p className="text-xs text-[#78716c] mt-1">{game.instruction}</p>
              </div>
            </div>

            {/* Tranh minh họa riêng của từng bài tập (Cropped từ sách) */}
            {game.imageUrl && (
              <div className="mb-6 border border-[#e7e5e4] bg-[#fafaf9] p-3 flex flex-col items-center group relative">
                <BookImage src={game.imageUrl} alt={game.title} />
                <button
                  type="button"
                  onClick={() => onOpenModal(resolveKanjiAssetUrl(game.imageUrl!), game.title)}
                  className="mt-2.5 px-3 py-1 bg-white hover:bg-[#b91c1c] text-[#44403c] hover:text-white border border-[#e7e5e4] text-xs font-mono font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Phóng to tranh bài tập này</span>
                </button>
              </div>
            )}

            {/* Giao diện tương tác câu đố */}
            <div className="space-y-4 bg-[#fafaf9] p-5 border border-[#e7e5e4]">
              {/* DẠNG 0: KANJI_ELIMINATION (熟語消去パズル - Ô lưới 6×6 tìm từ ghép & tìm chữ Hán còn lại) */}
              {(game.gameType === 'KANJI_ELIMINATION' || Boolean(parsedData.grid)) && (() => {
                const key = `elim_${game.id}`;
                const val = (showSolutions[game.id] ? parsedData.answer : minigameInputs[key]) || '';
                const isChecked = checkedGames[game.id] || showSolutions[game.id];
                const isCorrect = val.trim() === parsedData.answer;

                return (
                  <div className="space-y-6">
                    {/* Bảng ô lưới 6x6 chữ Hán */}
                    <div className="p-5 bg-white border border-[#e7e5e4] shadow-xs flex flex-col items-center">
                      <div className="text-xs font-mono font-bold text-[#78716c] uppercase mb-4 text-center">
                        Bảng 36 Chữ Hán (Gạch bỏ 15 từ ghép quen thuộc để tìm chữ Hán duy nhất còn lại):
                      </div>

                      <div className="inline-grid grid-cols-6 gap-2 sm:gap-3 p-3 bg-[#fafaf9] border-2 border-[#e7e5e4] shadow-xs">
                        {parsedData.grid?.map((row: string[], rIdx: number) =>
                          row.map((kanji: string, cIdx: number) => {
                            const isRemaining = kanji === parsedData.answer;
                            const isTarget = isChecked && isRemaining;
                            const isEliminated = isChecked && !isRemaining;

                            return (
                              <div
                                key={`${rIdx}-${cIdx}`}
                                className={`w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center font-serif text-xl sm:text-2xl font-bold border transition-all ${
                                  isTarget
                                    ? 'bg-[#b91c1c] text-white border-[#b91c1c] scale-110 shadow-md ring-4 ring-red-200 z-10'
                                    : isEliminated
                                      ? 'bg-[#f5f5f4] text-[#a8a29e] border-[#e7e5e4] line-through opacity-50'
                                      : 'bg-white text-[#1c1917] border-[#d6d3d1] hover:border-[#b91c1c] hover:bg-[#fff5f5]'
                                }`}
                              >
                                {kanji}
                              </div>
                            );
                          })
                        )}
                      </div>

                      {/* Khu vực trả lời chữ Hán còn lại */}
                      <div className="mt-6 w-full max-w-md p-4 bg-[#fef2f2] border border-red-200 text-center space-y-3">
                        <div className="text-sm font-serif font-bold text-[#1c1917]">
                          Chữ Hán cuối cùng còn lại duy nhất là:
                        </div>

                        <div className="flex items-center justify-center gap-3">
                          <input
                            type="text"
                            value={val}
                            maxLength={1}
                            readOnly={showSolutions[game.id]}
                            onChange={(e) => setMinigameInputs((prev) => ({ ...prev, [key]: e.target.value }))}
                            placeholder="?"
                            className={`w-14 h-14 text-center font-serif font-bold text-3xl border-2 transition-all outline-none shadow-sm ${
                              isChecked
                                ? isCorrect
                                  ? 'border-[#15803d] bg-green-50 text-[#15803d]'
                                  : 'border-[#dc2626] bg-red-50 text-[#dc2626]'
                                : 'border-[#b91c1c] bg-white text-[#b91c1c]'
                            }`}
                          />

                          {/* Gợi ý bấm nhanh */}
                          {Array.isArray(parsedData.suggestedChoices) && (
                            <div className="flex items-center gap-1.5 flex-wrap">
                              {parsedData.suggestedChoices.map((c: string) => (
                                <button
                                  key={c}
                                  type="button"
                                  onClick={() => setMinigameInputs((prev) => ({ ...prev, [key]: c }))}
                                  className="w-10 h-10 flex items-center justify-center bg-white hover:bg-[#b91c1c] text-[#1c1917] hover:text-white border border-[#e7e5e4] font-serif font-bold text-lg transition-all shadow-2xs hover:scale-105 cursor-pointer"
                                >
                                  {c}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>

                        {isChecked && (
                          <div className={`mt-2 text-xs font-mono font-bold ${isCorrect ? 'text-[#15803d]' : 'text-[#dc2626]'}`}>
                            {isCorrect
                              ? `✓ Chính xác! Chữ duy nhất còn sót lại là「${parsedData.answer}」(Âm Hán: ${parsedData.hanViet || ''} - ${parsedData.meaning || ''})`
                              : `✗ Chưa chính xác. Đáp án đúng là chữ「${parsedData.answer}」`}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Danh sách 15 từ ghép tìm thấy trong bảng */}
                    {Array.isArray(parsedData.wordsFound) && (
                      <div className="p-4 bg-white border border-[#e7e5e4] shadow-xs">
                        <div className="text-xs font-mono font-bold text-[#78716c] uppercase mb-3 flex items-center justify-between">
                          <span>🔍 Danh sách 15 từ ghép trong bảng ô chữ (Gạch bỏ 35 chữ):</span>
                          <span className="text-[11px] text-[#b91c1c] font-normal">15 từ ghép</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                          {parsedData.wordsFound.map((w, idx) => (
                            <div key={idx} className="p-2.5 bg-[#fafaf9] border border-[#e7e5e4] text-xs flex items-center justify-between">
                              <span className="font-serif font-bold text-sm text-[#1c1917]">{w.word} ({w.hiragana})</span>
                              <span className="text-[11px] text-[#78716c]">{w.meaning}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Action buttons */}
                    <div className="flex items-center gap-2 pt-3 border-t border-[#e7e5e4]">
                      <button
                        type="button"
                        onClick={() => setCheckedGames((prev) => ({ ...prev, [game.id]: true }))}
                        className="px-4 py-2 bg-[#b91c1c] hover:bg-[#991b1b] text-white text-xs font-mono font-bold uppercase tracking-wider cursor-pointer"
                      >
                        Kiểm tra đáp án
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowSolutions((prev) => ({ ...prev, [game.id]: !prev[game.id] }))}
                        className="px-3.5 py-2 bg-white text-[#44403c] border border-[#e7e5e4] text-xs font-mono font-bold cursor-pointer"
                      >
                        {showSolutions[game.id] ? 'Ẩn đáp án' : 'Hiện đáp án'}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setMinigameInputs((prev) => ({ ...prev, [key]: '' }));
                          setCheckedGames((prev) => ({ ...prev, [game.id]: false }));
                          setShowSolutions((prev) => ({ ...prev, [game.id]: false }));
                        }}
                        className="px-3 py-2 text-xs font-mono text-[#78716c] hover:text-[#b91c1c] cursor-pointer"
                      >
                        Làm lại
                      </button>
                    </div>
                  </div>
                );
              })()}

              {/* DẠNG: KATAKANA_HOMOPHONE (同音異字 - Phân biệt chữ Hán theo Katakana) */}
              {(game.gameType === 'KATAKANA_HOMOPHONE' || Boolean(parsedData.groups)) && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {parsedData.groups?.map((grp, gIdx) => (
                      <div key={gIdx} className="p-4 bg-white border border-[#e7e5e4] shadow-xs space-y-3">
                        <div className="flex items-center justify-between pb-2 border-b border-[#f5f5f4]">
                          <span className="inline-flex items-center px-3 py-1 bg-[#1c1917] text-white text-xs font-mono font-bold tracking-wider">
                            {grp.kana}
                          </span>
                          <span className="text-[11px] font-mono text-[#78716c]">
                            {grp.questions?.length} câu hỏi
                          </span>
                        </div>

                        <div className="space-y-3">
                          {grp.questions?.map((q) => {
                            const key = `homo_${game.id}_${q.id}`;
                            const val = (showSolutions[game.id] ? q.answer : minigameInputs[key]) || '';
                            const isChecked = checkedGames[game.id] || showSolutions[game.id];
                            const isCorrect = val.trim() === q.answer;
                            const isActive = activeBlankKey === key;

                            let boxStyle = 'border-[#78716c] bg-white text-[#1c1917] hover:border-[#b91c1c]';
                            if (isChecked) {
                              boxStyle = isCorrect
                                ? 'border-[#15803d] bg-green-50 text-[#15803d] font-bold shadow-xs'
                                : 'border-[#dc2626] bg-red-50 text-[#dc2626] font-bold shadow-xs';
                            } else if (isActive) {
                              boxStyle = 'border-[#b91c1c] ring-2 ring-[#fca5a5] bg-[#fff5f5] text-[#b91c1c]';
                            }

                            const parts = q.sentence ? q.sentence.split('[blank]') : ['', ''];

                            return (
                              <div key={q.id} className="p-2.5 bg-[#fafaf9] border border-[#f5f5f4]">
                                <div className="flex flex-wrap items-center gap-1.5 text-sm sm:text-base font-serif text-[#1c1917] leading-relaxed">
                                  <span>{parts[0]}</span>
                                  <input
                                    type="text"
                                    value={val}
                                    maxLength={1}
                                    readOnly={showSolutions[game.id]}
                                    onFocus={() => setActiveBlankKey(key)}
                                    onClick={() => setActiveBlankKey(key)}
                                    onChange={(e) => {
                                      const newVal = e.target.value;
                                      setMinigameInputs((prev) => ({ ...prev, [key]: newVal }));
                                    }}
                                    className={`w-10 h-10 text-center font-serif font-bold text-xl border-2 transition-all outline-none rounded-none shadow-xs cursor-pointer ${boxStyle}`}
                                  />
                                  <span>{parts[1]}</span>
                                </div>

                                {isChecked && (
                                  <div className="mt-2 pt-1.5 border-t border-[#e7e5e4] flex flex-wrap items-center justify-between text-xs gap-1">
                                    <span className={`font-mono font-bold ${isCorrect ? 'text-[#15803d]' : 'text-[#dc2626]'}`}>
                                      {isCorrect ? `✓「${q.answer}」` : `✗ Đúng:「${q.answer}」`}
                                    </span>
                                    <span className="text-[#44403c] font-serif font-bold text-[11px]">
                                      {q.targetWord} ({q.hiragana}) — {q.meaning}
                                    </span>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Ngân hàng chữ Hán */}
                  {Array.isArray(parsedData.wordBank) && parsedData.wordBank.length > 0 && (
                    <div className="p-4 bg-white border border-[#e7e5e4] shadow-xs">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-mono font-bold text-[#78716c] uppercase">
                          Ngân hàng chữ Hán (Chọn ô trống rồi bấm chữ để điền nhanh):
                        </span>
                        {activeBlankKey && (
                          <span className="text-xs font-mono text-[#b91c1c] font-bold bg-[#fef2f2] px-2 py-0.5 border border-red-200">
                            Đang chọn ô {activeBlankKey.split('_').slice(2).join('.')}
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        {getShuffledBank<string>(
                          parsedData.wordBank,
                          game.id * 7919 + 1013 + (shuffleSeeds[game.id] || 0) * 37
                        ).map((kanji: string) => (
                          <button
                            key={kanji}
                            type="button"
                            onClick={() => {
                              let targetKey = activeBlankKey;
                              if (!targetKey) {
                                for (const grp of parsedData.groups || []) {
                                  for (const q of grp.questions || []) {
                                    const k = `homo_${game.id}_${q.id}`;
                                    if (!minigameInputs[k]) {
                                      targetKey = k;
                                      break;
                                    }
                                  }
                                  if (targetKey) break;
                                }
                              }
                              if (targetKey) {
                                setMinigameInputs((prev) => ({ ...prev, [targetKey!]: kanji }));
                              }
                            }}
                            className="min-w-[44px] h-11 px-2.5 flex items-center justify-center bg-[#fafaf9] hover:bg-[#b91c1c] text-[#1c1917] hover:text-white border border-[#e7e5e4] text-xl sm:text-2xl font-serif font-bold transition-all shadow-2xs hover:scale-105 cursor-pointer"
                          >
                            {kanji}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action buttons */}
                  <div className="flex items-center gap-2 pt-3 border-t border-[#e7e5e4]">
                    <button
                      type="button"
                      onClick={() => setCheckedGames((prev) => ({ ...prev, [game.id]: true }))}
                      className="px-4 py-2.5 bg-[#b91c1c] hover:bg-[#991b1b] text-white text-xs font-mono font-bold uppercase tracking-wider cursor-pointer"
                    >
                      Kiểm tra đáp án
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowSolutions((prev) => ({ ...prev, [game.id]: !prev[game.id] }))}
                      className="px-3.5 py-2.5 bg-white text-[#44403c] border border-[#e7e5e4] text-xs font-mono font-bold cursor-pointer"
                    >
                      {showSolutions[game.id] ? 'Ẩn đáp án' : 'Hiện đáp án'}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const cleared = { ...minigameInputs };
                        parsedData.groups?.forEach((g) => {
                          g.questions?.forEach((q) => {
                            delete cleared[`homo_${game.id}_${q.id}`];
                          });
                        });
                        setMinigameInputs(cleared);
                        setCheckedGames((prev) => ({ ...prev, [game.id]: false }));
                        setShowSolutions((prev) => ({ ...prev, [game.id]: false }));
                        setActiveBlankKey(null);
                        setShuffleSeeds((prev) => ({ ...prev, [game.id]: (prev[game.id] || 0) + 1 }));
                      }}
                      className="px-3.5 py-2.5 text-xs font-mono text-[#78716c] hover:text-[#b91c1c] cursor-pointer"
                    >
                      Làm lại
                    </button>
                  </div>
                </div>
              )}

              {/* DẠNG: KANJI_CORRECTION (誤字訂正 - Sửa lỗi sai chính tả chữ Hán) */}
              {game.gameType === 'KANJI_CORRECTION' && (
                <div className="space-y-6">
                  <div className="space-y-3.5">
                    {parsedData.questions?.map((q) => {
                      const key = `corr_${game.id}_${q.id}`;
                      const val = (showSolutions[game.id] ? q.correctKanji : minigameInputs[key]) || '';
                      const isChecked = checkedGames[game.id] || showSolutions[game.id];
                      const isCorrect = val.trim() === q.correctKanji;
                      const isActive = activeBlankKey === key;

                      let boxStyle = 'border-[#78716c] bg-white text-[#1c1917] hover:border-[#b91c1c]';
                      if (isChecked) {
                        boxStyle = isCorrect
                          ? 'border-[#15803d] bg-green-50 text-[#15803d] font-bold shadow-xs'
                          : 'border-[#dc2626] bg-red-50 text-[#dc2626] font-bold shadow-xs';
                      } else if (isActive) {
                        boxStyle = 'border-[#b91c1c] ring-2 ring-[#fca5a5] bg-[#fff5f5] text-[#b91c1c]';
                      }

                      const sentParts = q.sentence && q.wrongKanji ? q.sentence.split(q.wrongKanji) : [q.sentence || '', ''];

                      return (
                        <div key={q.id} className="p-4 bg-white border border-[#e7e5e4] shadow-xs space-y-2">
                          <div className="flex flex-wrap items-center justify-between gap-3 text-base font-serif text-[#1c1917]">
                            <div className="flex items-center gap-2 flex-1">
                              <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#1c1917] text-white text-xs font-mono font-bold flex-shrink-0">
                                {q.id}
                              </span>
                              {Array.isArray(q.options) && q.options.length >= 2 ? (
                                <span className="leading-loose">
                                  {q.before}
                                  <span className="inline-flex items-center gap-1 mx-1 align-middle">
                                    {q.options.map((opt: string) => {
                                      const picked = val === opt;
                                      let optStyle = 'border-[#d6d3d1] bg-white text-[#1c1917] hover:border-[#b91c1c]';
                                      if (isChecked && opt === q.correctKanji) optStyle = 'border-[#15803d] bg-green-50 text-[#15803d] font-bold';
                                      else if (isChecked && picked) optStyle = 'border-[#dc2626] bg-red-50 text-[#dc2626] font-bold line-through';
                                      else if (picked) optStyle = 'border-[#b91c1c] bg-[#fff5f5] text-[#b91c1c] font-bold ring-2 ring-[#fca5a5]';
                                      return (
                                        <button
                                          key={opt}
                                          type="button"
                                          disabled={isChecked}
                                          onClick={() => setMinigameInputs((prev) => ({ ...prev, [key]: opt }))}
                                          className={`px-2.5 py-1 border-2 text-lg font-serif whitespace-nowrap transition-all cursor-pointer ${optStyle}`}
                                        >
                                          {opt}
                                        </button>
                                      );
                                    })}
                                  </span>
                                  {q.after}
                                </span>
                              ) : (
                                <span className="leading-relaxed">
                                  {sentParts[0]}
                                  <span className="font-bold text-[#dc2626] underline decoration-wavy decoration-[#dc2626] underline-offset-4 px-1 bg-red-50 border border-red-200">
                                    {q.wrongKanji}
                                  </span>
                                  {sentParts.slice(1).join(q.wrongKanji)}
                                </span>
                              )}
                            </div>

                            <div className={`${Array.isArray(q.options) && q.options.length >= 2 ? 'hidden' : 'flex'} items-center gap-2 flex-shrink-0`}>
                              <span className="text-xs font-mono font-bold text-[#78716c]">Chữ đúng:</span>
                              <input
                                type="text"
                                value={val}
                                maxLength={Math.max(q.correctKanji?.length || 1, 4)}
                                readOnly={showSolutions[game.id]}
                                onFocus={() => setActiveBlankKey(key)}
                                onClick={() => setActiveBlankKey(key)}
                                onChange={(e) => {
                                  const newVal = e.target.value;
                                  setMinigameInputs((prev) => ({ ...prev, [key]: newVal }));
                                  if (newVal.length >= (q.correctKanji?.length || 1) && q.id < (parsedData.questions?.length || 0)) {
                                    setActiveBlankKey(`corr_${game.id}_${q.id + 1}`);
                                  }
                                }}
                                className={`${(q.correctKanji?.length || 1) > 1 ? 'min-w-[88px] px-2.5 text-lg' : 'w-11 text-2xl'} h-11 text-center font-serif font-bold border-2 transition-all outline-none rounded-none shadow-xs cursor-pointer ${boxStyle}`}
                              />
                            </div>
                          </div>

                          {isChecked && (
                            <div className="mt-2 pt-2 border-t border-[#f5f5f4] flex flex-wrap items-center justify-between text-xs gap-2">
                              <span className={`font-mono font-bold ${isCorrect ? 'text-[#15803d]' : 'text-[#dc2626]'}`}>
                                {isCorrect ? `✓ Đúng:「${q.correctKanji}」` : `✗ Chữ sai「${val || q.wrongKanji}」-> Đúng là「${q.correctKanji}」`}
                              </span>
                              <span className="text-[#44403c] font-serif font-bold">
                                {q.targetWord} ({q.hiragana}) — {q.meaning}
                              </span>
                              {q.explanation && (
                                <div className="w-full text-[11px] text-[#78716c] italic mt-0.5">
                                  {q.explanation}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Ngân hàng chữ Hán */}
                  {Array.isArray(parsedData.wordBank) && parsedData.wordBank.length > 0 && !parsedData.questions?.some((q) => Array.isArray(q.options)) && (
                    <div className="p-4 bg-white border border-[#e7e5e4] shadow-xs">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-mono font-bold text-[#78716c] uppercase">
                          Ngân hàng chữ Hán sửa lỗi (Chọn ô trống rồi bấm chữ để điền):
                        </span>
                        {activeBlankKey && (
                          <span className="text-xs font-mono text-[#b91c1c] font-bold bg-[#fef2f2] px-2 py-0.5 border border-red-200">
                            Đang chọn câu {activeBlankKey.split('_')[2]}
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        {getShuffledBank<string>(
                          parsedData.wordBank,
                          game.id * 7919 + 1013 + (shuffleSeeds[game.id] || 0) * 37
                        ).map((kanji: string) => (
                          <button
                            key={kanji}
                            type="button"
                            onClick={() => {
                              let targetKey = activeBlankKey;
                              if (!targetKey) {
                                const firstEmpty = parsedData.questions?.find((q) => !minigameInputs[`corr_${game.id}_${q.id}`]);
                                if (firstEmpty) targetKey = `corr_${game.id}_${firstEmpty.id}`;
                                else if (parsedData.questions && parsedData.questions.length > 0) targetKey = `corr_${game.id}_${parsedData.questions[0].id}`;
                              }
                              if (targetKey) {
                                setMinigameInputs((prev) => ({ ...prev, [targetKey!]: kanji }));
                                const currentId = parseInt(targetKey.split('_')[2], 10);
                                if (currentId < (parsedData.questions?.length || 0)) {
                                  setActiveBlankKey(`corr_${game.id}_${currentId + 1}`);
                                }
                              }
                            }}
                            className="w-11 h-11 flex items-center justify-center bg-[#fafaf9] hover:bg-[#b91c1c] text-[#1c1917] hover:text-white border border-[#e7e5e4] text-2xl font-serif font-bold transition-all shadow-2xs hover:scale-105 cursor-pointer"
                          >
                            {kanji}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action buttons */}
                  <div className="flex items-center gap-2 pt-3 border-t border-[#e7e5e4]">
                    <button
                      type="button"
                      onClick={() => setCheckedGames((prev) => ({ ...prev, [game.id]: true }))}
                      className="px-4 py-2.5 bg-[#b91c1c] hover:bg-[#991b1b] text-white text-xs font-mono font-bold uppercase tracking-wider cursor-pointer"
                    >
                      Kiểm tra đáp án
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowSolutions((prev) => ({ ...prev, [game.id]: !prev[game.id] }))}
                      className="px-3.5 py-2.5 bg-white text-[#44403c] border border-[#e7e5e4] text-xs font-mono font-bold cursor-pointer"
                    >
                      {showSolutions[game.id] ? 'Ẩn đáp án' : 'Hiện đáp án'}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const cleared = { ...minigameInputs };
                        parsedData.questions?.forEach((q) => {
                          delete cleared[`corr_${game.id}_${q.id}`];
                        });
                        setMinigameInputs(cleared);
                        setCheckedGames((prev) => ({ ...prev, [game.id]: false }));
                        setShowSolutions((prev) => ({ ...prev, [game.id]: false }));
                        setActiveBlankKey(null);
                        setShuffleSeeds((prev) => ({ ...prev, [game.id]: (prev[game.id] || 0) + 1 }));
                      }}
                      className="px-3.5 py-2.5 text-xs font-mono text-[#78716c] hover:text-[#b91c1c] cursor-pointer"
                    >
                      Làm lại
                    </button>
                  </div>
                </div>
              )}

              {/* Dạng 1: RADICAL_COMBINE / SENTENCE_CLOZE */}
              {((game.gameType === 'RADICAL_COMBINE' || game.gameType === 'SENTENCE_CLOZE') ||
                (Boolean(parsedData.questions) &&
                  Boolean(parsedData.wordBank) &&
                  !parsedData.puzzles &&
                  !parsedData.grid &&
                  game.gameType !== 'KANJI_CORRECTION')) && (
                <div className="space-y-6">
                  {/* Bảng hiển thị 2 cột Ⓐ và Ⓑ (Chỉ hiện khi có colA & colB) */}
                  {parsedData.colA && parsedData.colB && (
                    <div className="p-4 bg-white border border-[#e7e5e4] shadow-xs flex flex-col gap-3 w-full min-w-0 overflow-hidden">
                      <div className="flex flex-wrap items-start gap-2.5 min-w-0">
                        <span className="w-7 h-7 rounded-full bg-[#1c1917] text-white flex items-center justify-center text-xs font-mono font-bold flex-shrink-0">
                          Ⓐ
                        </span>
                        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 min-w-0 flex-1">
                          {parsedData.colA?.map((r: string, idx: number) => (
                            <span key={idx} className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center bg-[#fafaf9] border border-[#e7e5e4] text-lg sm:text-xl font-serif font-bold text-[#b91c1c] flex-shrink-0">
                              {r}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="text-center text-xl font-mono font-bold text-[#a8a29e] leading-none">+</div>

                      <div className="flex flex-wrap items-start gap-2.5 min-w-0">
                        <span className="w-7 h-7 rounded-full bg-[#1c1917] text-white flex items-center justify-center text-xs font-mono font-bold flex-shrink-0">
                          Ⓑ
                        </span>
                        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 min-w-0 flex-1">
                          {parsedData.colB?.map((r: string, idx: number) => (
                            <span key={idx} className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center bg-[#fafaf9] border border-[#e7e5e4] text-lg sm:text-xl font-serif font-bold text-[#1c1917] flex-shrink-0">
                              {r}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Danh sách các câu bài tập */}
                  <div className="space-y-3.5">
                    {parsedData.questions?.map((q) => {
                      const key = `rad_${game.id}_${q.id}`;
                      const val = (showSolutions[game.id] ? q.answer : minigameInputs[key]) || '';
                      const isChecked = checkedGames[game.id] || showSolutions[game.id];
                      const isCorrect = val.trim() === q.answer;
                      const isActive = activeBlankKey === key;

                      let boxStyle = 'border-[#78716c] bg-white text-[#1c1917] hover:border-[#b91c1c]';
                      if (isChecked) {
                        boxStyle = isCorrect ? 'border-[#15803d] bg-green-50 text-[#15803d] font-bold shadow-xs' : 'border-[#dc2626] bg-red-50 text-[#dc2626] font-bold shadow-xs';
                      } else if (isActive) {
                        boxStyle = 'border-[#b91c1c] ring-2 ring-[#fca5a5] bg-[#fff5f5] text-[#b91c1c]';
                      }

                      const sentenceText = q.sentence || q.prompt || '';
                      const parts = sentenceText.includes('[blank]') ? sentenceText.split('[blank]') : [sentenceText, ''];
                      const isMultiChar = (q.answer?.length || 1) > 1;

                      return (
                        <div key={q.id} className="p-4 bg-white border border-[#e7e5e4] shadow-xs">
                          <div className="flex flex-wrap items-center gap-2 text-base font-serif text-[#1c1917] leading-loose">
                            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#b91c1c] text-white text-sm font-mono font-black shadow-xs flex-shrink-0">
                              {q.id}
                            </span>
                            <span>{parts[0]}</span>
                            <input
                              type="text"
                              value={val}
                              maxLength={q.answer?.length || 4}
                              readOnly={showSolutions[game.id]}
                              onFocus={() => setActiveBlankKey(key)}
                              onClick={() => setActiveBlankKey(key)}
                              onChange={(e) => {
                                const newVal = e.target.value;
                                setMinigameInputs((prev) => ({ ...prev, [key]: newVal }));
                                if (newVal.length >= (q.answer?.length || 1) && q.id < (parsedData.questions?.length || 0)) {
                                  setActiveBlankKey(`rad_${game.id}_${q.id + 1}`);
                                }
                              }}
                              className={`${isMultiChar ? 'min-w-[120px] px-3' : 'w-11'} h-11 text-center font-serif font-bold ${isMultiChar ? 'text-lg' : 'text-2xl'} border-2 transition-all outline-none rounded-none shadow-xs cursor-pointer ${boxStyle}`}
                            />
                            <span>{parts[1]}</span>
                          </div>

                          {isChecked && (
                            <div className="mt-3 pt-2 border-t border-[#f5f5f4] flex flex-wrap items-center justify-between text-xs gap-2">
                              <div className={`font-mono font-bold ${isCorrect ? 'text-[#15803d]' : 'text-[#dc2626]'}`}>
                                {isCorrect ? `✓ Đáp án:「${q.answer}」` : `✗ Chữ đúng:「${q.answer}」`}
                                {q.combine && <span className="ml-1 text-[#78716c]">({q.combine})</span>}
                                {q.blankReading && (
                                  <span className="ml-2 font-serif text-[#166534] bg-green-50 px-2 py-0.5 border border-green-200">
                                    〔読み方: {q.blankReading}〕
                                  </span>
                                )}
                              </div>
                              <div className="text-[#44403c] font-serif font-bold">
                                {q.targetWord} {q.hiragana && `(${q.hiragana})`} {q.meaning && `— ${q.meaning}`}
                              </div>
                              {q.explanation && (
                                <div className="w-full text-[11px] text-[#78716c] italic">
                                  {q.explanation}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Ngân hàng chữ Hán kết quả */}
                  {Array.isArray(parsedData.wordBank) && parsedData.wordBank.length > 0 && (
                    <div className="p-4 bg-white border border-[#e7e5e4] shadow-xs">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-mono font-bold text-[#78716c] uppercase">
                          Chữ Hán kết quả (Chọn ô trống rồi bấm chữ để điền nhanh):
                        </span>
                        {activeBlankKey && (
                          <span className="text-xs font-mono text-[#b91c1c] font-bold bg-[#fef2f2] px-2 py-0.5 border border-red-200">
                            Đang chọn câu {activeBlankKey.split('_')[2]}
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        {getShuffledBank<string>(
                          parsedData.wordBank,
                          game.id * 7919 + 1013 + (shuffleSeeds[game.id] || 0) * 37
                        ).map((kanji: string) => (
                          <button
                            key={kanji}
                            type="button"
                            onClick={() => {
                              let targetKey = activeBlankKey;
                              if (!targetKey) {
                                const firstEmpty = parsedData.questions?.find((q) => !minigameInputs[`rad_${game.id}_${q.id}`]);
                                if (firstEmpty) targetKey = `rad_${game.id}_${firstEmpty.id}`;
                                else if (parsedData.questions && parsedData.questions.length > 0) targetKey = `rad_${game.id}_${parsedData.questions[0].id}`;
                              }
                              if (targetKey) {
                                setMinigameInputs((prev) => ({ ...prev, [targetKey!]: kanji }));
                                const currentId = parseInt(targetKey.split('_')[2], 10);
                                if (currentId < (parsedData.questions?.length || 0)) {
                                  setActiveBlankKey(`rad_${game.id}_${currentId + 1}`);
                                }
                              }
                            }}
                            className="min-w-[44px] h-11 px-3 flex items-center justify-center bg-[#fafaf9] hover:bg-[#b91c1c] text-[#1c1917] hover:text-white border border-[#e7e5e4] text-base sm:text-lg font-serif font-bold transition-all shadow-2xs hover:scale-105 cursor-pointer"
                          >
                            {kanji}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action buttons */}
                  <div className="flex items-center gap-2 pt-3 border-t border-[#e7e5e4]">
                    <button
                      type="button"
                      onClick={() => setCheckedGames((prev) => ({ ...prev, [game.id]: true }))}
                      className="px-4 py-2.5 bg-[#b91c1c] hover:bg-[#991b1b] text-white text-xs font-mono font-bold uppercase tracking-wider cursor-pointer"
                    >
                      Kiểm tra đáp án
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowSolutions((prev) => ({ ...prev, [game.id]: !prev[game.id] }))}
                      className="px-3.5 py-2.5 bg-white text-[#44403c] border border-[#e7e5e4] text-xs font-mono font-bold cursor-pointer"
                    >
                      {showSolutions[game.id] ? 'Ẩn đáp án' : 'Hiện đáp án'}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const cleared = { ...minigameInputs };
                        parsedData.questions?.forEach((q) => {
                          delete cleared[`rad_${game.id}_${q.id}`];
                        });
                        setMinigameInputs(cleared);
                        setCheckedGames((prev) => ({ ...prev, [game.id]: false }));
                        setShowSolutions((prev) => ({ ...prev, [game.id]: false }));
                        setActiveBlankKey(null);
                        setShuffleSeeds((prev) => ({ ...prev, [game.id]: (prev[game.id] || 0) + 1 }));
                      }}
                      className="px-3.5 py-2.5 text-xs font-mono text-[#78716c] hover:text-[#b91c1c] cursor-pointer"
                    >
                      Làm lại
                    </button>
                  </div>
                </div>
              )}

              {/* Dạng CLOZE_DIALOGUE: Đoạn văn đục lỗ hội thoại thực tế (Chương 1) */}
              {(game.gameType === 'CLOZE_DIALOGUE' || Boolean(parsedData.dialogue)) && (
                <div className="space-y-6">
                  {/* Khung bài đọc hội thoại đục lỗ tương tác */}
                  <div className="p-5 sm:p-6 bg-[#fffdfa] border border-[#e7e5e4] shadow-xs space-y-4">
                    <div className="pb-3 border-b border-[#e7e5e4] flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-[#b91c1c] uppercase tracking-wider flex items-center gap-1.5">
                        <span>📝</span>
                        <span>Hội thoại phỏng vấn (Điền chữ Hán vào các ô vuông bên dưới):</span>
                      </span>
                      <span className="text-[11px] font-mono text-[#78716c]">
                        {parsedData.blanks?.length || 0} ô trống cần điền
                      </span>
                    </div>

                    <div className="space-y-4">
                      {parsedData.dialogue?.map((utt, uIdx) => {
                        const isInterviewer = utt.speaker === 'I' || utt.speaker?.includes('インタビュアー');
                        return (
                          <div key={uIdx} className="flex items-start gap-3.5 pb-3 border-b border-[#f5f5f4] last:border-b-0 last:pb-0">
                            <div className="flex-shrink-0 mt-1 flex flex-col items-center gap-1.5">
                              <span
                                className={`inline-flex items-center justify-center px-2.5 py-1 text-xs font-mono font-bold tracking-wider ${
                                  isInterviewer ? 'bg-[#44403c] text-white' : 'bg-[#b91c1c] text-white shadow-2xs'
                                }`}
                              >
                                {utt.speaker}
                              </span>
                              {/* Nút bấm nghe audio phát âm đoạn hội thoại */}
                              <button
                                type="button"
                                onClick={() => handlePlayDialogueAudio(`dialogue_${game.id}_${uIdx}`, utt, parsedData.blanks)}
                                title={playingAudioId === `dialogue_${game.id}_${uIdx}` ? 'Bấm để dừng phát âm' : 'Bấm để nghe phát âm tiếng Nhật đoạn này'}
                                className={`p-1.5 rounded-full border transition-all cursor-pointer shadow-2xs active:scale-90 flex items-center justify-center ${
                                  playingAudioId === `dialogue_${game.id}_${uIdx}`
                                    ? 'text-white bg-[#b91c1c] border-[#b91c1c] ring-2 ring-red-300 animate-pulse'
                                    : 'text-[#78716c] hover:text-[#b91c1c] hover:bg-red-50 border-transparent hover:border-red-200'
                                }`}
                              >
                                <Volume2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-[11px] font-mono text-[#78716c] mb-1 font-semibold">
                                {utt.name}
                              </div>
                              <div className="leading-loose text-base font-serif text-[#1c1917]">
                                {utt.text.split('\n').map((paragraph: string, pIdx: number) => (
                                  <div key={pIdx} className="my-1.5 leading-relaxed">
                                    {paragraph.split(/(\[blank:\d+\])/g).map((token: string, tIdx: number) => {
                                      const match = token.match(/\[blank:(\d+)\]/);
                                      if (!match) return <span key={tIdx}>{token}</span>;
                                      const blankId = parseInt(match[1], 10);
                                      const blank = parsedData.blanks?.find((b) => b.id === blankId);
                                      if (!blank) return null;
                                      const key = `cloze_${game.id}_${blank.id}`;
                                      const val = (showSolutions[game.id] ? blank.answer : minigameInputs[key]) || '';
                                      const isChecked = checkedGames[game.id] || showSolutions[game.id];
                                      const isCorrect = blank.acceptedAnswers ? blank.acceptedAnswers.includes(val.trim()) : val.trim() === blank.answer;
                                      const isActive = activeBlankKey === key;

                                      let boxStyle = 'border-[#78716c] bg-white text-[#1c1917] hover:border-[#b91c1c]';
                                      if (isChecked) {
                                        boxStyle = isCorrect
                                          ? 'border-[#15803d] bg-green-50 text-[#15803d] font-bold shadow-xs'
                                          : 'border-[#dc2626] bg-red-50 text-[#dc2626] font-bold shadow-xs';
                                      } else if (isActive) {
                                        boxStyle = 'border-[#b91c1c] ring-2 ring-[#fca5a5] bg-[#fff5f5] text-[#b91c1c]';
                                      }

                                      return (
                                        <span key={tIdx} className="inline-flex flex-col items-center mx-1.5 align-middle select-none">
                                          <span className="text-2xl sm:text-3xl font-serif font-black text-[#b91c1c] mb-1 select-none leading-none drop-shadow-2xs">
                                            {toCircledNum(blank.num || blankId)}
                                          </span>
                                          <input
                                            type="text"
                                            value={val}
                                            maxLength={2}
                                            readOnly={showSolutions[game.id]}
                                            onFocus={() => setActiveBlankKey(key)}
                                            onClick={() => setActiveBlankKey(key)}
                                            onChange={(e) => {
                                              const newVal = e.target.value;
                                              setMinigameInputs((prev) => ({ ...prev, [key]: newVal }));
                                              if (newVal.length >= 1 && blankId < (parsedData.blanks?.length || 0)) {
                                                setActiveBlankKey(`cloze_${game.id}_${blankId + 1}`);
                                              }
                                            }}
                                            placeholder=""
                                            className={`w-12 h-12 text-center font-serif font-bold text-2xl sm:text-3xl border-2 transition-all outline-none rounded-none shadow-xs cursor-pointer ${boxStyle}`}
                                          />
                                          {isChecked && !isCorrect && (
                                            <span className="text-[11px] font-mono font-bold text-[#15803d] mt-0.5">
                                              {blank.answer}
                                            </span>
                                          )}
                                        </span>
                                      );
                                    })}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Ngân hàng chữ Hán (Word Bank) */}
                  {Array.isArray(parsedData.wordBank) && parsedData.wordBank.length > 0 && (
                    <div className="p-4 bg-white border border-[#e7e5e4] shadow-xs">
                      <div className="flex flex-wrap items-center justify-between mb-2.5 gap-2">
                        <span className="text-xs font-mono font-bold text-[#78716c] uppercase tracking-wider flex items-center gap-1.5">
                          <span>🔤</span>
                          <span>Ngân hàng chữ Hán (Chọn ô trống ở trên rồi bấm chữ Hán để điền nhanh):</span>
                        </span>
                        {activeBlankKey && (
                          <span className="text-xs font-mono text-[#b91c1c] font-bold bg-[#fef2f2] px-2 py-0.5 border border-red-200">
                            Đang chọn ô {parsedData.blanks?.find((b) => `cloze_${game.id}_${b.id}` === activeBlankKey)?.num || ''}
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        {getShuffledBank<string>(
                          parsedData.wordBank,
                          game.id * 7919 + 1013 + (shuffleSeeds[game.id] || 0) * 37
                        ).map((kanji: string) => (
                          <button
                            key={kanji}
                            type="button"
                            onClick={() => {
                              let targetKey = activeBlankKey;
                              if (!targetKey) {
                                const firstEmpty = parsedData.blanks?.find((b) => !minigameInputs[`cloze_${game.id}_${b.id}`]);
                                if (firstEmpty) targetKey = `cloze_${game.id}_${firstEmpty.id}`;
                                else if (parsedData.blanks && parsedData.blanks.length > 0) targetKey = `cloze_${game.id}_${parsedData.blanks[0].id}`;
                              }
                              if (targetKey) {
                                setMinigameInputs((prev) => ({ ...prev, [targetKey!]: kanji }));
                                const currentId = parseInt(targetKey.split('_')[2], 10);
                                const nextBlank = parsedData.blanks?.find((b) => b.id > currentId && !minigameInputs[`cloze_${game.id}_${b.id}`]);
                                if (nextBlank) setActiveBlankKey(`cloze_${game.id}_${nextBlank.id}`);
                                else if (currentId < (parsedData.blanks?.length || 0)) setActiveBlankKey(`cloze_${game.id}_${currentId + 1}`);
                              }
                            }}
                            className="w-11 h-11 flex items-center justify-center bg-[#fafaf9] hover:bg-[#b91c1c] text-[#1c1917] hover:text-white border border-[#e7e5e4] text-2xl font-serif font-bold transition-all shadow-2xs hover:scale-105 cursor-pointer active:scale-95"
                          >
                            {kanji}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Thanh nút bấm hành động */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#e7e5e4]">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setCheckedGames((prev) => ({ ...prev, [game.id]: true }))}
                        className="px-4 py-2.5 bg-[#b91c1c] hover:bg-[#991b1b] text-white text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer shadow-xs"
                      >
                        <span>✓</span>
                        <span>Kiểm tra đáp án</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowSolutions((prev) => ({ ...prev, [game.id]: !prev[game.id] }))}
                        className="px-3.5 py-2.5 bg-white hover:bg-[#fafaf9] text-[#44403c] border border-[#e7e5e4] text-xs font-mono font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <span>💡</span>
                        <span>{showSolutions[game.id] ? 'Ẩn đáp án' : 'Hiện đáp án'}</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const cleared = { ...minigameInputs };
                          parsedData.blanks?.forEach((b) => {
                            delete cleared[`cloze_${game.id}_${b.id}`];
                          });
                          setMinigameInputs(cleared);
                          setCheckedGames((prev) => ({ ...prev, [game.id]: false }));
                          setShowSolutions((prev) => ({ ...prev, [game.id]: false }));
                          setActiveBlankKey(null);
                          setShuffleSeeds((prev) => ({ ...prev, [game.id]: (prev[game.id] || 0) + 1 }));
                        }}
                        className="px-3.5 py-2.5 text-xs font-mono text-[#78716c] hover:text-[#b91c1c] transition-colors cursor-pointer"
                      >
                        Làm lại
                      </button>
                    </div>

                    {checkedGames[game.id] && (
                      <div className="text-xs font-mono font-bold px-3 py-1.5 rounded-none border border-[#15803d] bg-green-50 text-[#15803d]">
                        Kết quả: {parsedData.blanks?.filter((b) => {
                          const v = minigameInputs[`cloze_${game.id}_${b.id}`] || '';
                          return b.acceptedAnswers ? b.acceptedAnswers.includes(v.trim()) : v.trim() === b.answer;
                        }).length} / {parsedData.blanks?.length} câu đúng
                      </div>
                    )}
                  </div>

                  {/* Bảng tra cứu từ vựng chi tiết của các câu đục lỗ */}
                  <div className="mt-4 pt-3 border-t border-[#e7e5e4]">
                    <div className="text-xs font-mono font-bold text-[#78716c] uppercase mb-2.5">
                      Bảng chi tiết {parsedData.blanks?.length} từ vựng trong bài tập:
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                      {parsedData.blanks?.map((b) => (
                        <div key={b.id} className="p-3 bg-white border border-[#e7e5e4] text-xs shadow-2xs">
                          <div className="flex items-center justify-between mb-1.5 pb-1 border-b border-[#f5f5f4]">
                            <span className="font-serif font-bold text-lg text-[#b91c1c]">{toCircledNum(b.num || '')}</span>
                            <span className="font-serif font-bold text-sm text-[#1c1917]">{b.targetWord} ({b.hiragana})</span>
                          </div>
                          <div className="text-[11px] text-[#44403c] font-medium">{b.meaning}</div>
                          {b.explanation && (
                            <div className="text-[10px] text-[#78716c] mt-1 italic">{b.explanation}</div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Dạng KANJI_CROSS: Ô chữ chữ thập 4 hướng (Chương 2) */}
              {(game.gameType === 'KANJI_CROSS' || Boolean(parsedData.puzzles)) && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {parsedData.puzzles?.map((puz) => {
                      const key = `cross_${game.id}_${puz.id}`;
                      const val = (showSolutions[game.id] ? puz.answer : minigameInputs[key]) || '';
                      const isChecked = checkedGames[game.id] || showSolutions[game.id];
                      const isCorrect = val.trim() === puz.answer;
                      const isActive = activeBlankKey === key;

                      let boxStyle = 'border-[#78716c] bg-white text-[#1c1917] hover:border-[#b91c1c]';
                      if (isChecked) {
                        boxStyle = isCorrect
                          ? 'border-[#15803d] bg-green-50 text-[#15803d] font-bold'
                          : 'border-[#dc2626] bg-red-50 text-[#dc2626] font-bold';
                      } else if (isActive) {
                        boxStyle = 'border-[#b91c1c] ring-2 ring-[#fca5a5] bg-[#fff5f5] text-[#b91c1c]';
                      }

                      return (
                        <div key={puz.id} className="p-5 bg-white border border-[#e7e5e4] shadow-xs flex flex-col items-center">
                          <div className="text-xs font-mono font-bold text-[#78716c] mb-3 self-start flex items-center justify-between w-full">
                            <span>CÂU {puz.id}: Tìm chữ Hán tâm điểm</span>
                            {isChecked && (
                              <span className={`text-[11px] font-bold ${isCorrect ? 'text-[#15803d]' : 'text-[#dc2626]'}`}>
                                {isCorrect ? '✓ Đúng' : `✗ Đáp án: ${puz.answer}`}
                              </span>
                            )}
                          </div>

                          {/* Khung ô chữ chữ thập */}
                          <div className="grid grid-cols-3 gap-2 my-2">
                            {Boolean(puz.top) && (
                              <>
                                <div></div>
                                <div className="w-12 h-12 flex items-center justify-center text-2xl font-serif font-bold text-[#1c1917] bg-[#fafaf9] border border-[#e7e5e4]">
                                  {puz.top}
                                </div>
                                <div></div>
                              </>
                            )}

                            <div className={`w-12 h-12 flex items-center justify-center text-2xl font-serif font-bold text-[#1c1917] ${puz.left ? 'bg-[#fafaf9] border border-[#e7e5e4]' : ''}`}>
                              {puz.left || ''}
                            </div>
                            <input
                              type="text"
                              value={val}
                              maxLength={1}
                              readOnly={showSolutions[game.id]}
                              onFocus={() => setActiveBlankKey(key)}
                              onClick={() => setActiveBlankKey(key)}
                              onChange={(e) => {
                                const newVal = e.target.value;
                                setMinigameInputs((prev) => ({ ...prev, [key]: newVal }));
                              }}
                              className={`w-12 h-12 text-center font-serif font-bold text-2xl border-2 transition-all outline-none rounded-none shadow-xs cursor-pointer ${boxStyle}`}
                            />
                            <div className={`w-12 h-12 flex items-center justify-center text-2xl font-serif font-bold text-[#1c1917] ${puz.right ? 'bg-[#fafaf9] border border-[#e7e5e4]' : ''}`}>
                              {puz.right || ''}
                            </div>

                            {Boolean(puz.bottom) && (
                              <>
                                <div></div>
                                <div className="w-12 h-12 flex items-center justify-center text-2xl font-serif font-bold text-[#1c1917] bg-[#fafaf9] border border-[#e7e5e4]">
                                  {puz.bottom}
                                </div>
                                <div></div>
                              </>
                            )}
                          </div>

                          {isChecked && (
                            <div className="mt-3 w-full pt-2 border-t border-[#f5f5f4] text-center">
                              <div className="text-xs font-serif text-[#44403c]">
                                {puz.words?.join(' · ')}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Word Bank for Kanji Cross */}
                  {Array.isArray(parsedData.wordBank) && parsedData.wordBank.length > 0 && (
                    <div className="p-4 bg-white border border-[#e7e5e4] shadow-xs">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-mono font-bold text-[#78716c] uppercase">
                          Ngân hàng chữ Hán (Chọn ô tâm điểm rồi bấm chữ):
                        </span>
                        {activeBlankKey && (
                          <span className="text-xs font-mono text-[#b91c1c] font-bold">
                            Đang chọn Câu {activeBlankKey.split('_')[2]}
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        {getShuffledBank<string>(
                          parsedData.wordBank,
                          game.id * 7919 + 1013 + (shuffleSeeds[game.id] || 0) * 37
                        ).map((kanji: string) => (
                          <button
                            key={kanji}
                            type="button"
                            onClick={() => {
                              let targetKey = activeBlankKey;
                              if (!targetKey) {
                                const firstEmpty = parsedData.puzzles?.find((p) => !minigameInputs[`cross_${game.id}_${p.id}`]);
                                if (firstEmpty) targetKey = `cross_${game.id}_${firstEmpty.id}`;
                                else if (parsedData.puzzles && parsedData.puzzles.length > 0) targetKey = `cross_${game.id}_${parsedData.puzzles[0].id}`;
                              }
                              if (targetKey) {
                                setMinigameInputs((prev) => ({ ...prev, [targetKey!]: kanji }));
                                const currentId = parseInt(targetKey.split('_')[2], 10);
                                if (currentId < (parsedData.puzzles?.length || 0)) {
                                  setActiveBlankKey(`cross_${game.id}_${currentId + 1}`);
                                }
                              }
                            }}
                            className="w-11 h-11 flex items-center justify-center bg-[#fafaf9] hover:bg-[#b91c1c] text-[#1c1917] hover:text-white border border-[#e7e5e4] text-2xl font-serif font-bold transition-all shadow-2xs hover:scale-105 cursor-pointer"
                          >
                            {kanji}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action buttons */}
                  <div className="flex items-center gap-2 pt-3 border-t border-[#e7e5e4]">
                    <button
                      type="button"
                      onClick={() => setCheckedGames((prev) => ({ ...prev, [game.id]: true }))}
                      className="px-4 py-2 bg-[#b91c1c] hover:bg-[#991b1b] text-white text-xs font-mono font-bold uppercase tracking-wider cursor-pointer"
                    >
                      Kiểm tra đáp án
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowSolutions((prev) => ({ ...prev, [game.id]: !prev[game.id] }))}
                      className="px-3.5 py-2 bg-white text-[#44403c] border border-[#e7e5e4] text-xs font-mono font-bold cursor-pointer"
                    >
                      {showSolutions[game.id] ? 'Ẩn đáp án' : 'Hiện đáp án'}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const cleared = { ...minigameInputs };
                        parsedData.puzzles?.forEach((p) => {
                          delete cleared[`cross_${game.id}_${p.id}`];
                        });
                        setMinigameInputs(cleared);
                        setCheckedGames((prev) => ({ ...prev, [game.id]: false }));
                        setShowSolutions((prev) => ({ ...prev, [game.id]: false }));
                        setActiveBlankKey(null);
                        setShuffleSeeds((prev) => ({ ...prev, [game.id]: (prev[game.id] || 0) + 1 }));
                      }}
                      className="px-3 py-2 text-xs font-mono text-[#78716c] hover:text-[#b91c1c] cursor-pointer"
                    >
                      Làm lại
                    </button>
                  </div>
                </div>
              )}

              {/* Dạng RECIPE_CLOZE: Mô phỏng chính xác phiếu công thức làm bánh từ giáo trình */}
              {(game.gameType === 'RECIPE_CLOZE' || (parsedData.blanks && !parsedData.dialogue && parsedData.wordBank)) && (() => {
                const renderInlineBlank = (bId: number) => {
                  const b = parsedData.blanks?.find((item) => item.id === bId);
                  if (!b) return null;
                  const key = `rec_${game.id}_${b.id}`;
                  const val = (showSolutions[game.id] ? b.answer : minigameInputs[key]) || '';
                  const isChecked = checkedGames[game.id] || showSolutions[game.id];
                  const isCorrect = val.trim() === b.answer;
                  const isActive = activeBlankKey === key;

                  let boxStyle = 'border-[#78716c] bg-white text-[#1c1917] hover:border-[#b91c1c]';
                  if (isChecked) {
                    boxStyle = isCorrect
                      ? 'border-[#15803d] bg-green-50 text-[#15803d] font-bold shadow-xs'
                      : 'border-[#dc2626] bg-red-50 text-[#dc2626] font-bold shadow-xs';
                  } else if (isActive) {
                    boxStyle = 'border-[#b91c1c] ring-2 ring-[#fca5a5] bg-[#fff5f5] text-[#b91c1c]';
                  }

                  return (
                    <span key={bId} className="inline-flex items-center gap-1.5 mx-1.5 align-middle">
                      <span className="inline-flex items-center justify-center text-xl sm:text-2xl font-serif font-black text-[#b91c1c] select-none leading-none mr-1">{toCircledNum(b.num ?? b.id)}</span>
                      <input
                        type="text"
                        value={val}
                        readOnly={showSolutions[game.id]}
                        onFocus={() => setActiveBlankKey(key)}
                        onClick={() => setActiveBlankKey(key)}
                        onChange={(e) => {
                          const newVal = e.target.value;
                          setMinigameInputs((prev) => ({ ...prev, [key]: newVal }));
                          if (newVal.length >= 1 && bId < (parsedData.blanks?.length || 0)) {
                            setActiveBlankKey(`rec_${game.id}_${bId + 1}`);
                          }
                        }}
                        placeholder="____"
                        className={`w-20 sm:w-24 px-1.5 py-1 text-center font-serif font-bold text-sm border-b-2 outline-none transition-all cursor-pointer ${boxStyle}`}
                      />
                      {isChecked && !isCorrect && (
                        <span className="text-xs font-mono font-bold text-[#15803d]">
                          {b.answer}
                        </span>
                      )}
                    </span>
                  );
                };

                return (
                  <div className="space-y-6">
                    {/* Phiếu công thức mô phỏng giáo trình chuẩn 2 cột */}
                    <div className="p-5 sm:p-7 bg-[#fffdfa] border-2 border-[#d6d3d1] shadow-sm">
                      {/* Tiêu đề công thức chuẩn sách giáo trình */}
                      <div className="text-center pb-4 mb-5 border-b-2 border-[#e7e5e4]">
                        <div className="text-[11px] font-mono font-bold text-[#78716c] uppercase tracking-wider mb-1">
                          【3】 から言葉を選んで（ ）に書き、レシピを完成させてください。
                        </div>
                        <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#1c1917] tracking-wide flex items-center justify-center gap-2">
                          <span>🍓</span>
                          <span>〜 いちごのショートケーキ 〜</span>
                          <span>🍰</span>
                        </h3>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                        {/* CỘT NỘI DUNG CÔNG THỨC (8 cột) */}
                        <div className="lg:col-span-8 space-y-6 font-serif text-[#1c1917] leading-relaxed">
                          {/* PHẦN 1: NGUYÊN LIỆU (材料) */}
                          <div className="bg-[#fafaf9] p-4 border border-[#e7e5e4]">
                            <div className="text-sm font-bold text-[#b91c1c] border-b border-[#e7e5e4] pb-1.5 mb-3 flex items-center">
                              <span>■ </span>
                              {renderInlineBlank(1)}
                              <span className="text-xs font-mono text-[#78716c] font-normal ml-2">（ざいりょう）</span>
                            </div>

                            <div className="space-y-3 pl-2 text-sm sm:text-base">
                              <div>
                                <div className="font-bold text-[#78716c] text-xs font-mono mb-1">〈スポンジ (Cốt bánh)〉</div>
                                <ul className="list-disc list-inside space-y-1.5 pl-1">
                                  <li>{renderInlineBlank(2)} 2こ</li>
                                  <li>{renderInlineBlank(3)} 60グラム、さとう 60グラム</li>
                                  <li>バター 20グラム、{renderInlineBlank(4)} 大さじ1、バニラオイル 少々</li>
                                </ul>
                              </div>

                              <div className="pt-2 border-t border-[#f5f5f4]">
                                <div className="font-bold text-[#78716c] text-xs font-mono mb-1">〈デコレーション (Trang trí)〉</div>
                                <ul className="list-disc list-inside space-y-1 pl-1">
                                  <li>生クリーム 3/4カップ、さとう 20グラム</li>
                                  <li>いちご 200グラム、ホワイトリキュール 大さじ1</li>
                                </ul>
                                <div className="text-xs font-sans text-[#78716c] italic mt-1.5 pl-5">
                                  ※ない場合は、ほかの {renderInlineBlank(5)} を使う。
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* PHẦN 2: CÁCH LÀM (作り方) */}
                          <div className="bg-[#fafaf9] p-4 border border-[#e7e5e4]">
                            <div className="text-sm font-bold text-[#b91c1c] border-b border-[#e7e5e4] pb-1.5 mb-3">
                              ■ 作り方（つくりかた）
                            </div>

                            <div className="space-y-3.5 pl-1 text-sm sm:text-base">
                              <div>
                                <div className="font-bold text-[#78716c] text-xs font-mono mb-1">〈スポンジ〉</div>
                                <ol className="space-y-2 pl-1">
                                  <li>① 小麦粉、さとう、バターを {renderInlineBlank(6)}。小麦粉とさとうはふるっておく。</li>
                                  <li>② ボールに卵を入れ、さとうもくわえて、まぜる。</li>
                                  <li>③ 牛乳、バニラオイル、バターを入れてさらにまぜる。</li>
                                  <li>④ 生地を {renderInlineBlank(7)} に入れたら、オーブンで約10分 {renderInlineBlank(8)}。</li>
                                  <li className="text-xs font-sans text-[#78716c] italic pl-4">
                                    ※前もって200 {renderInlineBlank(9)} に {renderInlineBlank(10)}。
                                  </li>
                                  <li>⑤ スポンジが焼けたら、しばらく冷ます。</li>
                                </ol>
                              </div>

                              <div className="pt-2 border-t border-[#f5f5f4]">
                                <div className="font-bold text-[#78716c] text-xs font-mono mb-1">〈デコレーション〉</div>
                                <ol className="space-y-1.5 pl-1">
                                  <li>⑥ ボールに材料を入れてあわ立て、ホイップクリームを作る。</li>
                                  <li>⑦ スポンジの間に切ったいちごをならべ、ケーキ全体にホイップクリームをぬる。</li>
                                  <li>⑧ ケーキにいちごをかざる。完成！</li>
                                </ol>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* CỘT PHẢI: NGÂN HÀNG TỪ VỰNG DỌC CHUẨN GIÁO TRÌNH (4 cột) */}
                        <div className="lg:col-span-4 flex flex-col justify-between space-y-4">
                          <div className="p-4 bg-white border-2 border-[#e7e5e4] shadow-xs">
                            <div className="text-xs font-mono font-bold text-[#b91c1c] uppercase tracking-wider mb-3 pb-2 border-b border-[#f5f5f4] flex items-center justify-between">
                              <span>🔤 Từ vựng cần chọn</span>
                              {activeBlankKey && (
                                <span className="text-[10px] text-[#b91c1c] font-bold bg-[#fef2f2] px-1.5 py-0.5 border border-red-200">
                                  Ô {parsedData.blanks?.find((b) => `rec_${game.id}_${b.id}` === activeBlankKey)?.num || ''}
                                </span>
                              )}
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                              {getShuffledBank<string>(
                                parsedData.wordBank || [],
                                game.id * 7919 + 1013 + (shuffleSeeds[game.id] || 0) * 37
                              ).map((word: string) => (
                                <button
                                  key={word}
                                  type="button"
                                  onClick={() => {
                                    let targetKey = activeBlankKey;
                                    if (!targetKey) {
                                      const firstEmpty = parsedData.blanks?.find((b) => !minigameInputs[`rec_${game.id}_${b.id}`]);
                                      if (firstEmpty) targetKey = `rec_${game.id}_${firstEmpty.id}`;
                                      else if (parsedData.blanks && parsedData.blanks.length > 0) targetKey = `rec_${game.id}_${parsedData.blanks[0].id}`;
                                    }
                                    if (targetKey) {
                                      setMinigameInputs((prev) => ({ ...prev, [targetKey!]: word }));
                                      const currentId = parseInt(targetKey.split('_')[2], 10);
                                      const nextBlank = parsedData.blanks?.find((b) => b.id > currentId && !minigameInputs[`rec_${game.id}_${b.id}`]);
                                      if (nextBlank) setActiveBlankKey(`rec_${game.id}_${nextBlank.id}`);
                                      else if (currentId < (parsedData.blanks?.length || 0)) setActiveBlankKey(`rec_${game.id}_${currentId + 1}`);
                                    }
                                  }}
                                  className="py-2.5 px-2 bg-[#fafaf9] hover:bg-[#b91c1c] text-[#1c1917] hover:text-white border border-[#e7e5e4] text-sm font-serif font-bold transition-all shadow-2xs hover:scale-105 cursor-pointer text-center"
                                >
                                  {word}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div className="p-4 bg-[#fef2f2] border border-red-200 text-center">
                            <div className="text-3xl mb-1">🍰</div>
                            <div className="text-xs font-serif font-bold text-[#b91c1c]">Bánh kem dâu tây</div>
                            <div className="text-[11px] font-mono text-[#78716c]">Độ khó: 10 ô trống</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#e7e5e4]">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setCheckedGames((prev) => ({ ...prev, [game.id]: true }))}
                          className="px-4 py-2.5 bg-[#b91c1c] hover:bg-[#991b1b] text-white text-xs font-mono font-bold uppercase tracking-wider cursor-pointer shadow-xs"
                        >
                          ✓ Kiểm tra đáp án
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowSolutions((prev) => ({ ...prev, [game.id]: !prev[game.id] }))}
                          className="px-3.5 py-2.5 bg-white text-[#44403c] border border-[#e7e5e4] text-xs font-mono font-bold cursor-pointer hover:bg-[#fafaf9]"
                        >
                          💡 {showSolutions[game.id] ? 'Ẩn đáp án' : 'Hiện đáp án'}
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            const cleared = { ...minigameInputs };
                            parsedData.blanks?.forEach((b) => {
                              delete cleared[`rec_${game.id}_${b.id}`];
                            });
                            setMinigameInputs(cleared);
                            setCheckedGames((prev) => ({ ...prev, [game.id]: false }));
                            setShowSolutions((prev) => ({ ...prev, [game.id]: false }));
                            setActiveBlankKey(null);
                            setShuffleSeeds((prev) => ({ ...prev, [game.id]: (prev[game.id] || 0) + 1 }));
                          }}
                          className="px-3 py-2 text-xs font-mono text-[#78716c] hover:text-[#b91c1c] cursor-pointer"
                        >
                          Làm lại
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* Dạng 1: ORDERING (Sắp xếp từ bé đến lớn) */}
              {game.gameType === 'ORDERING' && (
                <div className="space-y-4">
                  {parsedData.example && (
                    <div className="p-3 bg-[#f5f5f4] border border-[#e7e5e4] text-xs font-mono flex items-center justify-between">
                      <span className="font-bold text-[#1c1917]">
                        📌 {parsedData.example.prompt || 'Ví dụ mẫu (れい)'}
                      </span>
                      <span className="font-bold text-[#15803d] bg-white px-2 py-0.5 border border-[#e7e5e4]">
                        {parsedData.example.formula || '三 < 四 < 八'}
                      </span>
                    </div>
                  )}

                  {parsedData.questions?.map((q) => {
                    const key = `ord_${game.id}_${q.id}`;
                    const selectedOpt = minigameInputs[key];
                    const correctFormula = q.formula || q.answer;
                    let options: string[];
                    if (Array.isArray(q.options) && q.options.length > 0) {
                      options = q.options;
                    } else if (Array.isArray(q.items) && q.items.length >= 3) {
                      const revFormula = [...q.items].reverse().join(' < ');
                      const mixFormula = [q.items[1], q.items[0], q.items[2]].join(' < ');
                      options = [correctFormula || '', revFormula, mixFormula];
                    } else {
                      options = [correctFormula || ''];
                    }

                    return (
                      <div key={q.id} className="bg-white p-4 border border-[#e7e5e4]">
                        <div className="flex items-center justify-between mb-2">
                          <div className="text-sm font-serif font-bold text-[#1c1917]">
                            {q.prompt}
                          </div>
                          {Array.isArray(q.items) && q.items.length > 0 && (
                            <span className="text-xs font-mono text-[#78716c]">
                              Sắp xếp: [ {q.items.join(', ')} ]
                            </span>
                          )}
                        </div>
                        <div className="flex flex-wrap items-center gap-2 mt-2">
                          {options.map((opt) => {
                            const isSelected = selectedOpt === opt;
                            const isCorrect = opt === correctFormula;
                            let style = 'bg-[#fafaf9] text-[#44403c] border-[#e7e5e4] hover:bg-white';
                            if (selectedOpt) {
                              if (isCorrect) style = 'bg-[#15803d] text-white border-[#15803d] font-bold';
                              else if (isSelected) style = 'bg-[#dc2626] text-white border-[#dc2626] font-bold';
                              else style = 'opacity-40 bg-[#f5f5f4] border-[#e7e5e4] text-[#a8a29e]';
                            }

                            return (
                              <button
                                key={opt}
                                type="button"
                                onClick={() =>
                                  setMinigameInputs((prev) => ({
                                    ...prev,
                                    [key]: opt,
                                  }))
                                }
                                className={`px-3.5 py-1.5 text-xs font-mono border transition-all cursor-pointer ${style}`}
                              >
                                {opt}
                              </button>
                            );
                          })}
                        </div>
                        {selectedOpt && (
                          <div className="mt-2.5 pt-2 border-t border-[#f5f5f4] flex flex-col gap-1">
                            <div className="text-xs font-mono text-[#15803d] font-bold">
                              ✓ {q.formula ? 'Thứ tự đúng:' : 'Đáp án đúng:'} {correctFormula}
                            </div>
                            {q.explanation && (
                              <div className="text-xs text-[#78716c] font-sans">
                                {q.explanation}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Dạng 2: COUNTING (Đếm đồ vật trong tranh) */}
              {game.gameType === 'COUNTING' && (
                <div className="space-y-4">
                  {parsedData.example && (
                    <div className="p-3 bg-[#f5f5f4] border border-[#e7e5e4] text-xs font-mono flex items-center justify-between">
                      <span className="font-bold text-[#1c1917]">
                        📌 {parsedData.example.item}
                      </span>
                      <span className="font-bold text-[#15803d] bg-white px-2 py-0.5 border border-[#e7e5e4]">
                        {parsedData.example.kanji} ({parsedData.example.reading})
                      </span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {parsedData.questions?.map((q) => {
                      const key = `count_${game.id}_${q.id}`;
                      const selectedOpt = minigameInputs[key];

                      return (
                        <div key={q.id} className="bg-white p-3.5 border border-[#e7e5e4]">
                          <div className="text-xs font-serif font-bold text-[#1c1917] mb-2">
                            {q.item}
                          </div>
                          <div className="flex flex-wrap items-center gap-2">
                            {q.options?.map((opt: string) => {
                              const isSelected = selectedOpt === opt;
                              const isCorrect = opt === q.answer;
                              let style = 'bg-[#fafaf9] text-[#44403c] border-[#e7e5e4] hover:bg-white';
                              if (selectedOpt) {
                                if (isCorrect) style = 'bg-[#15803d] text-white border-[#15803d] font-bold';
                                else if (isSelected) style = 'bg-[#dc2626] text-white border-[#dc2626] font-bold';
                                else style = 'opacity-40 bg-[#f5f5f4] border-[#e7e5e4] text-[#a8a29e]';
                              }

                              return (
                                <button
                                  key={opt}
                                  type="button"
                                  onClick={() =>
                                    setMinigameInputs((prev) => ({
                                      ...prev,
                                      [key]: opt,
                                    }))
                                  }
                                  className={`px-3 py-1.5 text-xs font-serif border transition-all cursor-pointer ${style}`}
                                >
                                  {opt}
                                </button>
                              );
                            })}
                          </div>
                          {selectedOpt && (
                            <div className="text-[11px] text-[#15803d] font-bold mt-2 font-mono">
                              ✓ Đáp án: {q.answer}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Dạng 3: CALCULATION (Tính tiền) */}
              {game.gameType === 'CALCULATION' && (
                <div className="space-y-4">
                  {parsedData.example && (
                    <div className="p-3 bg-[#f5f5f4] border border-[#e7e5e4] text-xs font-mono flex items-center justify-between">
                      <span className="font-bold text-[#1c1917]">
                        📌 {parsedData.example.items}
                      </span>
                      <span className="font-bold text-[#15803d] bg-white px-2 py-0.5 border border-[#e7e5e4]">
                        {parsedData.example.answer}
                      </span>
                    </div>
                  )}

                  <div className="space-y-3">
                    {parsedData.problems?.map((p) => {
                      const key = `calc_${game.id}_${p.id}`;
                      const selectedOpt = minigameInputs[key];

                      return (
                        <div key={p.id} className="bg-white p-3.5 border border-[#e7e5e4]">
                          <div className="text-xs font-serif font-bold text-[#1c1917] mb-2">
                            {p.items}
                          </div>
                          <div className="flex flex-wrap items-center gap-2">
                            {p.options?.map((opt: string) => {
                              const isSelected = selectedOpt === opt;
                              const isCorrect = opt === p.answer;
                              let style = 'bg-[#fafaf9] text-[#44403c] border-[#e7e5e4] hover:bg-white';
                              if (selectedOpt) {
                                if (isCorrect) style = 'bg-[#15803d] text-white border-[#15803d] font-bold';
                                else if (isSelected) style = 'bg-[#dc2626] text-white border-[#dc2626] font-bold';
                                else style = 'opacity-40 bg-[#f5f5f4] border-[#e7e5e4] text-[#a8a29e]';
                              }

                              return (
                                <button
                                  key={opt}
                                  type="button"
                                  onClick={() =>
                                    setMinigameInputs((prev) => ({
                                      ...prev,
                                      [key]: opt,
                                    }))
                                  }
                                  className={`px-3 py-1.5 text-xs font-mono border transition-all cursor-pointer ${style}`}
                                >
                                  {opt}
                                </button>
                              );
                            })}
                          </div>
                          {selectedOpt && (
                            <div className="text-[11px] text-[#15803d] font-bold mt-2 font-mono">
                              ✓ Tổng tiền đúng: {p.answer}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Dạng 4: POSTCARD_FILL (Bưu thiếp) */}
              {game.gameType === 'POSTCARD_FILL' && (
                <div className="space-y-4">
                  {parsedData.example && (
                    <div className="p-3 bg-[#f5f5f4] border border-[#e7e5e4] text-xs font-mono flex items-center justify-between">
                      <span className="font-bold text-[#1c1917]">
                        📌 {parsedData.example.label}
                      </span>
                      <span className="font-bold text-[#15803d] bg-white px-2 py-0.5 border border-[#e7e5e4]">
                        {parsedData.example.answer}
                      </span>
                    </div>
                  )}

                  <div className="space-y-3">
                    {parsedData.sections?.map((s) => {
                      const key = `post_${game.id}_${s.id}`;
                      const selectedOpt = minigameInputs[key];

                      return (
                        <div key={s.id} className="bg-white p-3.5 border border-[#e7e5e4]">
                          <div className="text-xs font-serif font-bold text-[#1c1917]">
                            {s.label}
                          </div>
                          <div className="flex flex-wrap items-center gap-2 mt-2">
                            {s.options?.map((opt: string) => {
                              const isSelected = selectedOpt === opt;
                              const isCorrect = opt === s.answer;
                              let style = 'bg-[#fafaf9] text-[#44403c] border-[#e7e5e4] hover:bg-white';
                              if (selectedOpt) {
                                if (isCorrect) style = 'bg-[#15803d] text-white border-[#15803d] font-bold';
                                else if (isSelected) style = 'bg-[#dc2626] text-white border-[#dc2626] font-bold';
                                else style = 'opacity-40 bg-[#f5f5f4] border-[#e7e5e4] text-[#a8a29e]';
                              }

                              return (
                                <button
                                  key={opt}
                                  type="button"
                                  onClick={() =>
                                    setMinigameInputs((prev) => ({
                                      ...prev,
                                      [key]: opt,
                                    }))
                                  }
                                  className={`px-3 py-1.5 text-xs font-mono border transition-all cursor-pointer ${style}`}
                                >
                                  {opt}
                                </button>
                              );
                            })}
                          </div>
                          {selectedOpt && (
                            <div className="text-[11px] text-[#15803d] font-bold mt-2 font-mono">
                              ✓ Điền chuẩn: {s.answer}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Dạng 5: Trắc nghiệm tình huống chuẩn format (Dòng 1 tiếng Nhật, Dòng 2 tiếng Việt in nghiêng, Nút thuần Nhật) */}
              {((game.gameType === 'MULTIPLE_CHOICE' ||
                game.gameType === 'DIALOGUE_CHOICE' ||
                ![
                  'RADICAL_COMBINE',
                  'CLOZE_DIALOGUE',
                  'RECIPE_CLOZE',
                  'KANJI_CROSS',
                  'ORDERING',
                  'COUNTING',
                  'CALENDAR',
                  'ROUTE_CALC',
                  'WORD_CHAIN',
                  'SPEECH_BUBBLE_CLOZE',
                  'DOCTOR_CLOZE',
                  'POSTCARD_FILL',
                ].includes(game.gameType)) &&
                parsedData.questions &&
                parsedData.questions.length > 0 &&
                Boolean(parsedData.questions[0].prompt || parsedData.questions[0].promptJa) &&
                Boolean(parsedData.questions[0].options) &&
                !parsedData.questions[0].formula &&
                !parsedData.questions[0].counter) && (
                <div className="space-y-4">
                  {parsedData.example && (
                    <div className="p-3 bg-[#f5f5f4] border border-[#e7e5e4] text-xs font-mono flex items-center justify-between">
                      <span className="font-bold text-[#1c1917]">
                        📌 {parsedData.example.prompt || parsedData.example.item || 'Ví dụ mẫu (れい)'}
                      </span>
                      <span className="font-bold text-[#15803d] bg-white px-2 py-0.5 border border-[#e7e5e4]">
                        {parsedData.example.answer || parsedData.example.kanji || ''}
                      </span>
                    </div>
                  )}

                  <div className="space-y-3">
                    {parsedData.questions.map((q) => {
                      const key = `q_${game.id}_${q.id}`;
                      const selectedOpt = minigameInputs[key];

                      // Tách chuẩn dòng chính tiếng Nhật và dòng phụ tiếng Việt in nghiêng
                      const mainPrompt = q.promptJa || q.prompt;
                      const subVi = q.promptVi || q.meaningVi || (q.promptJa && q.prompt !== q.promptJa ? q.prompt : null);

                      return (
                        <div key={q.id} className="bg-white p-4 border border-[#e7e5e4] shadow-xs">
                          <div className="mb-2.5">
                            <div className="text-xs sm:text-sm font-serif font-bold text-[#1c1917] flex items-start gap-2">
                              <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#b91c1c] text-white text-xs sm:text-sm font-mono font-extrabold shadow-xs flex-shrink-0 mt-0.5">
                                {q.id}
                              </span>
                              <span className="leading-relaxed flex-1">{mainPrompt}</span>
                              <button
                                type="button"
                                onClick={() => handlePlayDialogueAudio(`mc_${game.id}_${q.id}`, { text: mainPrompt })}
                                title={playingAudioId === `mc_${game.id}_${q.id}` ? 'Bấm để dừng phát âm' : 'Bấm để nghe phát âm tiếng Nhật câu này'}
                                className={`p-1.5 rounded-full border transition-all cursor-pointer shadow-2xs active:scale-90 flex items-center justify-center flex-shrink-0 ${
                                  playingAudioId === `mc_${game.id}_${q.id}`
                                    ? 'text-white bg-[#b91c1c] border-[#b91c1c] ring-2 ring-red-300 animate-pulse'
                                    : 'text-[#78716c] hover:text-[#b91c1c] hover:bg-red-50 border-transparent hover:border-red-200'
                                }`}
                              >
                                <Volume2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                            {subVi && (
                              <div className="text-xs italic text-[#78716c] font-sans pl-7 mt-0.5">
                                {subVi}
                              </div>
                            )}
                          </div>

                          <div className="flex flex-wrap items-center gap-2 pl-7">
                            {q.options?.map((opt: string) => {
                              // Nút đáp án thuần tiếng Nhật, loại bỏ phần dịch chú thích trong ngoặc
                              const cleanOpt = opt.replace(/\s*\(.*?\)\s*$/, '').trim();
                              const cleanAns = (q.answer || '').replace(/\s*\(.*?\)\s*$/, '').trim();

                              const isSelected = selectedOpt === cleanOpt || selectedOpt === opt;
                              const isCorrect = cleanOpt === cleanAns || opt === q.answer;
                              let style = 'bg-[#fafaf9] text-[#44403c] border-[#e7e5e4] hover:bg-white hover:border-[#a8a29e]';
                              if (selectedOpt) {
                                if (isCorrect) style = 'bg-[#15803d] text-white border-[#15803d] font-bold shadow-xs';
                                else if (isSelected) style = 'bg-[#dc2626] text-white border-[#dc2626] font-bold shadow-xs';
                                else style = 'opacity-40 bg-[#f5f5f4] border-[#e7e5e4] text-[#a8a29e]';
                              }

                              return (
                                <button
                                  key={opt}
                                  type="button"
                                  onClick={() =>
                                    setMinigameInputs((prev) => ({
                                      ...prev,
                                      [key]: cleanOpt,
                                    }))
                                  }
                                  className={`px-3.5 py-2 text-xs sm:text-sm font-serif border transition-all cursor-pointer ${style}`}
                                >
                                  {cleanOpt}
                                </button>
                              );
                            })}
                          </div>

                          {selectedOpt && (
                            <div className="mt-3 pt-2.5 border-t border-[#f5f5f4] flex flex-col gap-1 pl-7">
                              <div className="text-xs font-mono font-bold text-[#15803d] flex items-center gap-1.5">
                                <span>✓ Đáp án đúng:</span>
                                <span className="underline decoration-2">
                                  {(q.answer || '').replace(/\s*\(.*?\)\s*$/, '').trim()}
                                </span>
                              </div>
                              {q.explanation && (
                                <div className="text-[11px] font-sans text-[#78716c] bg-[#fafaf9] p-2 border border-[#f5f5f4] rounded">
                                  💡 {q.explanation}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Thanh công cụ làm lại trắc nghiệm */}
                  <div className="flex items-center justify-end pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        const cleared = { ...minigameInputs };
                        parsedData.questions?.forEach((q) => {
                          delete cleared[`q_${game.id}_${q.id}`];
                        });
                        setMinigameInputs(cleared);
                      }}
                      className="px-3.5 py-1.5 text-xs font-mono text-[#78716c] hover:text-[#b91c1c] border border-[#e7e5e4] bg-[#fafaf9] hover:bg-white cursor-pointer transition-colors shadow-2xs"
                    >
                      🔄 Làm lại bài trắc nghiệm này
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

