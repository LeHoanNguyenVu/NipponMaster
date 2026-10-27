# -*- coding: utf-8 -*-
import sys
sys.stdout.reconfigure(encoding='utf-8')

filepath = 'frontend/src/screens/Kanji.tsx'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Radical breakdown: remove CIRCLED_NUMS and pink badge
old_radical_code = """                                            const CIRCLED_NUMS = ['①', '②', '③', '④', '⑤', '⑥', '⑦', '⑧', '⑨', '⑩'];
                                            const isGrid = components.length > 2;

                                            if (isGrid) {
                                              return (
                                                <div className="grid grid-cols-3 gap-2.5 max-w-[240px] justify-items-center mx-auto">
                                                  {components.map((comp, pIdx) => (
                                                    <div
                                                      key={pIdx}
                                                      className="relative w-12 h-12 sm:w-13 sm:h-13 flex items-center justify-center bg-white border-2 border-[#e7e5e4] shadow-xs hover:border-[#b91c1c] transition-colors"
                                                    >
                                                      <span className="absolute top-1 left-1.5 text-xs sm:text-sm font-mono font-extrabold text-[#b91c1c] bg-[#fef2f2] px-1 py-0.5 border border-red-200 select-none leading-none rounded-xs">
                                                        {CIRCLED_NUMS[pIdx] || `${pIdx + 1}`}
                                                      </span>
                                                      <span className="text-2xl sm:text-3xl font-serif font-bold text-[#b91c1c] leading-none select-none mt-1">
                                                        {comp}
                                                      </span>
                                                    </div>
                                                  ))}
                                                </div>
                                              );
                                            }

                                            return (
                                              <div className="flex items-center justify-center gap-2.5 sm:gap-3 flex-nowrap">
                                                {components.map((comp, pIdx) => (
                                                  <Fragment key={pIdx}>
                                                    <div className="relative w-14 h-14 sm:w-16 sm:h-16 flex-shrink-0 flex items-center justify-center bg-white border-2 border-[#e7e5e4] shadow-xs hover:border-[#b91c1c] transition-colors">
                                                      <span className="absolute top-1.5 left-2 text-xs sm:text-sm font-mono font-extrabold text-[#b91c1c] bg-[#fef2f2] px-1 py-0.5 border border-red-200 select-none leading-none rounded-xs">
                                                        {CIRCLED_NUMS[pIdx] || `${pIdx + 1}`}
                                                      </span>
                                                      <span className="text-3xl sm:text-4xl font-serif font-bold text-[#b91c1c] leading-none select-none mt-1">
                                                        {comp}
                                                      </span>
                                                    </div>"""

new_radical_code = """                                            const isGrid = components.length > 2;

                                            if (isGrid) {
                                              return (
                                                <div className="grid grid-cols-3 gap-2.5 max-w-[240px] justify-items-center mx-auto">
                                                  {components.map((comp, pIdx) => (
                                                    <div
                                                      key={pIdx}
                                                      className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center bg-white border-2 border-[#e7e5e4] shadow-xs hover:border-[#b91c1c] transition-colors"
                                                    >
                                                      <span className="text-2xl sm:text-3xl font-serif font-bold text-[#b91c1c] leading-none select-none">
                                                        {comp}
                                                      </span>
                                                    </div>
                                                  ))}
                                                </div>
                                              );
                                            }

                                            return (
                                              <div className="flex items-center justify-center gap-2.5 sm:gap-3 flex-nowrap">
                                                {components.map((comp, pIdx) => (
                                                  <Fragment key={pIdx}>
                                                    <div className="w-14 h-14 sm:w-16 sm:h-16 flex-shrink-0 flex items-center justify-center bg-white border-2 border-[#e7e5e4] shadow-xs hover:border-[#b91c1c] transition-colors">
                                                      <span className="text-3xl sm:text-4xl font-serif font-bold text-[#b91c1c] leading-none select-none">
                                                        {comp}
                                                      </span>
                                                    </div>"""

if old_radical_code in content:
    content = content.replace(old_radical_code, new_radical_code)
    print("✓ Replaced radical breakdown code (removed pink badges)")
else:
    print("✗ old_radical_code not found directly, checking normalized line endings...")
    c_norm = content.replace('\r\n', '\n')
    o_norm = old_radical_code.replace('\r\n', '\n')
    n_norm = new_radical_code.replace('\r\n', '\n')
    if o_norm in c_norm:
        content = c_norm.replace(o_norm, n_norm)
        print("✓ Replaced radical breakdown code with normalized newlines")
    else:
        print("✗ Still not found in normalized content")

# 2. Audio button in CLOZE_DIALOGUE
old_audio_btn = """                                            {/* Nút bấm nghe audio phát âm đoạn hội thoại */}
                                            <button
                                              type="button"
                                              onClick={() => handlePlayDialogueAudio(utt, parsedData.blanks)}
                                              title="Bấm để nghe phát âm tiếng Nhật đoạn này"
                                              className="p-1 rounded-full text-[#78716c] hover:text-[#b91c1c] hover:bg-red-50 border border-transparent hover:border-red-200 transition-all cursor-pointer shadow-2xs active:scale-90 flex items-center justify-center"
                                            >
                                              <Volume2 className="w-3.5 h-3.5" />
                                            </button>"""

new_audio_btn = """                                            {/* Nút bấm nghe audio phát âm đoạn hội thoại */}
                                            <button
                                              type="button"
                                              onClick={() => handlePlayDialogueAudio(`dialogue_${game.id}_${uIdx}`, utt, parsedData.blanks)}
                                              title={playingAudioId === `dialogue_${game.id}_${uIdx}` ? "Bấm để dừng phát âm" : "Bấm để nghe phát âm tiếng Nhật đoạn này"}
                                              className={`p-1.5 rounded-full border transition-all cursor-pointer shadow-2xs active:scale-90 flex items-center justify-center ${
                                                playingAudioId === `dialogue_${game.id}_${uIdx}`
                                                  ? 'text-white bg-[#b91c1c] border-[#b91c1c] ring-2 ring-red-300 animate-pulse'
                                                  : 'text-[#78716c] hover:text-[#b91c1c] hover:bg-red-50 border-transparent hover:border-red-200'
                                              }`}
                                            >
                                              <Volume2 className="w-3.5 h-3.5" />
                                            </button>"""

content_norm = content.replace('\r\n', '\n')
o_audio = old_audio_btn.replace('\r\n', '\n')
n_audio = new_audio_btn.replace('\r\n', '\n')
if o_audio in content_norm:
    content = content_norm.replace(o_audio, n_audio)
    print("✓ Replaced dialogue audio button with toggle & active animation")
else:
    print("✗ old_audio_btn not found")

# 3. Enlarge blanks in CLOZE_DIALOGUE
old_cloze_blank = """                                                      <span key={tIdx} className="inline-flex flex-col items-center mx-1.5 align-middle select-none">
                                                        <span className="text-xs sm:text-sm font-mono font-extrabold text-[#b91c1c] mb-1 bg-[#fef2f2] px-1.5 py-0.5 rounded border border-red-200 shadow-2xs select-none">
                                                          {blank.num || `[${blankId}]`}
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
                                                            setMinigameInputs(prev => ({ ...prev, [key]: newVal }));
                                                            if (newVal.length >= 1 && blankId < (parsedData.blanks?.length || 0)) {
                                                              setActiveBlankKey(`cloze_${game.id}_${blankId + 1}`);
                                                            }
                                                          }}
                                                          placeholder=""
                                                          className={`w-11 h-11 text-center font-serif font-bold text-2xl border-2 transition-all outline-none rounded-none shadow-xs cursor-pointer ${boxStyle}`}
                                                        />"""

new_cloze_blank = """                                                      <span key={tIdx} className="inline-flex flex-col items-center mx-1.5 align-middle select-none">
                                                        <span className="text-sm sm:text-base font-mono font-black text-[#b91c1c] mb-1 bg-[#fef2f2] px-2 py-0.5 rounded border border-red-300 shadow-xs select-none min-w-[28px] text-center">
                                                          {blank.num || `[${blankId}]`}
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
                                                            setMinigameInputs(prev => ({ ...prev, [key]: newVal }));
                                                            if (newVal.length >= 1 && blankId < (parsedData.blanks?.length || 0)) {
                                                              setActiveBlankKey(`cloze_${game.id}_${blankId + 1}`);
                                                            }
                                                          }}
                                                          placeholder=""
                                                          className={`w-12 h-12 text-center font-serif font-bold text-2xl sm:text-3xl border-2 transition-all outline-none rounded-none shadow-xs cursor-pointer ${boxStyle}`}
                                                        />"""

content_norm = content.replace('\r\n', '\n')
o_cloze = old_cloze_blank.replace('\r\n', '\n')
n_cloze = new_cloze_blank.replace('\r\n', '\n')
if o_cloze in content_norm:
    content = content_norm.replace(o_cloze, n_cloze)
    print("✓ Enlarged cloze dialogue blanks and input boxes")
else:
    print("✗ old_cloze_blank not found")

# 4. Enlarge recipe cloze blank number
old_rec_blank = """                                  <span key={bId} className="inline-flex items-center gap-1 mx-1 align-middle">
                                    <span className="inline-flex items-center justify-center font-mono text-sm sm:text-base font-extrabold text-[#b91c1c] bg-[#fef2f2] border border-red-200 px-1.5 py-0.5 rounded shadow-2xs select-none">{b.num}</span>"""

new_rec_blank = """                                  <span key={bId} className="inline-flex items-center gap-1.5 mx-1.5 align-middle">
                                    <span className="inline-flex items-center justify-center font-mono text-base sm:text-lg font-black text-[#b91c1c] bg-[#fef2f2] border border-red-300 px-2 py-0.5 rounded shadow-xs select-none min-w-[30px]">{b.num}</span>"""

content_norm = content.replace('\r\n', '\n')
o_rec = old_rec_blank.replace('\r\n', '\n')
n_rec = new_rec_blank.replace('\r\n', '\n')
if o_rec in content_norm:
    content = content_norm.replace(o_rec, n_rec)
    print("✓ Enlarged recipe cloze blank badge")
else:
    print("✗ old_rec_blank not found")

# 5. Enlarge radical combine question badge
old_rad_badge = """                                          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#fafaf9] border border-[#e7e5e4] text-xs font-mono font-bold text-[#78716c]">
                                            {q.id}
                                          </span>"""

new_rad_badge = """                                          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#b91c1c] text-white text-sm font-mono font-black shadow-xs flex-shrink-0">
                                            {q.id}
                                          </span>"""

content_norm = content.replace('\r\n', '\n')
o_rad = old_rad_badge.replace('\r\n', '\n')
n_rad = new_rad_badge.replace('\r\n', '\n')
if o_rad in content_norm:
    content = content_norm.replace(o_rad, n_rad)
    print("✓ Enlarged radical combine question badge")
else:
    print("✗ old_rad_badge not found")

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Saved updated Kanji.tsx successfully.")
