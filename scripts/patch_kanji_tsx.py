import sys
sys.stdout.reconfigure(encoding='utf-8')

FILE_PATH = 'frontend/src/screens/Kanji.tsx'

with open(FILE_PATH, 'r', encoding='utf-8') as f:
    content = f.read()

# ----------------------------------------------------------------------
# 1. RADICAL BREAKDOWN (Issue 2)
# ----------------------------------------------------------------------
OLD_RADICAL = '''                                        <div className="flex items-center justify-center gap-2.5 sm:gap-3 flex-nowrap w-full my-1.5">
                                          {(() => {
                                            const components = activeKanji.strokeGuide
                                              ? activeKanji.strokeGuide.split(/->|\\+/).map((p) => p.trim()).filter(Boolean)
                                              : [activeKanji.character];
                                            const isMulti = components.length > 2;

                                            return components.map((comp, pIdx) => (
                                              <Fragment key={pIdx}>
                                                <div
                                                  className={`${
                                                    isMulti ? 'w-12 h-12 sm:w-13 sm:h-13' : 'w-14 h-14 sm:w-16 sm:h-16'
                                                  } flex-shrink-0 flex items-center justify-center bg-white border-2 border-[#e7e5e4] shadow-xs hover:border-[#b91c1c] transition-colors`}
                                                >
                                                  <span
                                                    className={`${
                                                      isMulti ? 'text-2xl sm:text-3xl' : 'text-3xl sm:text-4xl'
                                                    } font-serif font-bold text-[#b91c1c] leading-none select-none`}
                                                  >
                                                    {comp}
                                                  </span>
                                                </div>
                                                {pIdx < components.length - 1 && (
                                                  <span className="text-xl sm:text-2xl font-mono font-bold text-[#a8a29e] flex-shrink-0 select-none px-0.5">
                                                    +
                                                  </span>
                                                )}
                                              </Fragment>
                                            ));
                                          })()}
                                        </div>'''

NEW_RADICAL = '''                                        <div className="w-full flex items-center justify-center my-1.5">
                                          {(() => {
                                            const rawComponents = activeKanji.strokeGuide
                                              ? activeKanji.strokeGuide.split(/->|\\+/).map((p) => p.trim()).filter(Boolean)
                                              : [activeKanji.character];

                                            // Expand multipliers e.g. "口 x 4" -> ["口", "口", "口", "口"]
                                            const components: string[] = [];
                                            for (const raw of rawComponents) {
                                              const match = raw.match(/^(.+?)\\s*[xX*×]\\s*(\\d+)$/);
                                              if (match) {
                                                const char = match[1].trim();
                                                const count = Math.min(Math.max(parseInt(match[2], 10), 1), 6);
                                                for (let i = 0; i < count; i++) {
                                                  components.push(char);
                                                }
                                              } else {
                                                components.push(raw);
                                              }
                                            }

                                            const CIRCLED_NUMS = ['①', '②', '③', '④', '⑤', '⑥', '⑦', '⑧', '⑨', '⑩'];
                                            const isGrid = components.length > 2;

                                            if (isGrid) {
                                              return (
                                                <div className="grid grid-cols-3 gap-2.5 max-w-[240px] justify-items-center mx-auto">
                                                  {components.map((comp, pIdx) => (
                                                    <div
                                                      key={pIdx}
                                                      className="relative w-12 h-12 sm:w-13 sm:h-13 flex items-center justify-center bg-white border-2 border-[#e7e5e4] shadow-xs hover:border-[#b91c1c] transition-colors"
                                                    >
                                                      <span className="absolute top-0.5 left-1 text-[10px] font-mono font-bold text-[#a8a29e] select-none leading-none">
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
                                                      <span className="absolute top-1 left-1.5 text-[10px] font-mono font-bold text-[#a8a29e] select-none leading-none">
                                                        {CIRCLED_NUMS[pIdx] || `${pIdx + 1}`}
                                                      </span>
                                                      <span className="text-3xl sm:text-4xl font-serif font-bold text-[#b91c1c] leading-none select-none mt-1">
                                                        {comp}
                                                      </span>
                                                    </div>
                                                    {pIdx < components.length - 1 && (
                                                      <span className="text-xl sm:text-2xl font-mono font-bold text-[#a8a29e] flex-shrink-0 select-none px-0.5">
                                                        +
                                                      </span>
                                                    )}
                                                  </Fragment>
                                                ))}
                                              </div>
                                            );
                                          })()}
                                        </div>'''

if OLD_RADICAL in content:
    content = content.replace(OLD_RADICAL, NEW_RADICAL, 1)
    print("✓ Successfully replaced RADICAL breakdown with 3xN numbered matrix.")
else:
    print("❌ Failed to find OLD_RADICAL in Kanji.tsx")

# ----------------------------------------------------------------------
# 2. RECIPE_CLOZE (Issue 3 - Authentic Shortcake recipe simulation)
# ----------------------------------------------------------------------
OLD_RECIPE = '''                            {/* Dạng RECIPE_CLOZE: Điền từ công thức làm bánh (Chương 3) */}
                            {(game.gameType === 'RECIPE_CLOZE' || (parsedData.blanks && !parsedData.dialogue && parsedData.wordBank)) && (
                              <div className="space-y-6">
                                <div className="p-5 sm:p-6 bg-white border border-[#e7e5e4] shadow-xs">
                                  <div className="flex flex-wrap items-center justify-between mb-4 pb-2 border-b border-[#e7e5e4]">
                                    <span className="text-xs font-mono font-bold text-[#b91c1c] uppercase tracking-wider">
                                      🎂 Công thức làm bánh: Điền từ thích hợp vào các ô trống (① ~ ⑩)
                                    </span>
                                    <span className="text-[11px] font-mono text-[#78716c]">
                                      {parsedData.blanks?.length || 0} ô cần điền
                                    </span>
                                  </div>

                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                                    {parsedData.blanks?.map((b: any) => {
                                      const key = `rec_${game.id}_${b.id}`;
                                      const val = showSolutions[game.id] ? b.answer : (minigameInputs[key] || '');
                                      const isChecked = checkedGames[game.id] || showSolutions[game.id];
                                      const isCorrect = val.trim() === b.answer;
                                      const isActive = activeBlankKey === key;

                                      let boxStyle = 'border-[#78716c] bg-white';
                                      if (isChecked) {
                                        boxStyle = isCorrect ? 'border-[#15803d] bg-green-50 text-[#15803d]' : 'border-[#dc2626] bg-red-50 text-[#dc2626]';
                                      } else if (isActive) {
                                        boxStyle = 'border-[#b91c1c] ring-2 ring-[#fca5a5] bg-[#fff5f5]';
                                      }

                                      return (
                                        <div key={b.id} className="p-3 bg-[#fafaf9] border border-[#e7e5e4] flex items-center justify-between gap-3">
                                          <div className="flex items-center gap-2.5">
                                            <span className="font-mono font-bold text-sm text-[#b91c1c]">{b.num}</span>
                                            <span className="text-xs text-[#44403c] font-medium">{b.meaning}</span>
                                          </div>
                                          <div className="flex items-center gap-1.5">
                                            <input
                                              type="text"
                                              value={val}
                                              readOnly={showSolutions[game.id]}
                                              onFocus={() => setActiveBlankKey(key)}
                                              onClick={() => setActiveBlankKey(key)}
                                              onChange={(e) => {
                                                const newVal = e.target.value;
                                                setMinigameInputs(prev => ({ ...prev, [key]: newVal }));
                                              }}
                                              className={`w-24 px-2 py-1.5 text-center font-serif font-bold text-sm border-2 transition-all outline-none shadow-xs ${boxStyle}`}
                                              placeholder="Điền từ"
                                            />
                                            {isChecked && !isCorrect && (
                                              <span className="text-xs font-mono font-bold text-[#15803d]">
                                                {b.answer}
                                              </span>
                                            )}
                                          </div>
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>

                                {/* Word Bank */}
                                {Array.isArray(parsedData.wordBank) && parsedData.wordBank.length > 0 && (
                                  <div className="p-4 bg-white border border-[#e7e5e4] shadow-xs">
                                    <div className="text-xs font-mono font-bold text-[#78716c] uppercase mb-2">
                                      Ngân hàng từ vựng nguyên liệu (Chọn ô rồi bấm từ để điền):
                                    </div>
                                    <div className="flex flex-wrap items-center gap-2">
                                      {getShuffledBank(parsedData.wordBank, (game.id * 7919 + 1013) + (shuffleSeeds[game.id] || 0) * 37).map((word: string) => (
                                        <button
                                          key={word}
                                          onClick={() => {
                                            let targetKey = activeBlankKey;
                                            if (!targetKey) {
                                              const firstEmpty = parsedData.blanks?.find((b: any) => !minigameInputs[`rec_${game.id}_${b.id}`]);
                                              if (firstEmpty) targetKey = `rec_${game.id}_${firstEmpty.id}`;
                                              else if (parsedData.blanks?.length > 0) targetKey = `rec_${game.id}_${parsedData.blanks[0].id}`;
                                            }
                                            if (targetKey) {
                                              setMinigameInputs(prev => ({ ...prev, [targetKey!]: word }));
                                              const currentId = parseInt(targetKey.split('_')[2], 10);
                                              if (currentId < (parsedData.blanks?.length || 0)) {
                                                setActiveBlankKey(`rec_${game.id}_${currentId + 1}`);
                                              }
                                            }
                                          }}
                                          className="px-3 py-1.5 bg-[#fafaf9] hover:bg-[#b91c1c] text-[#1c1917] hover:text-white border border-[#e7e5e4] text-xs font-serif font-bold transition-all shadow-2xs hover:scale-105 cursor-pointer"
                                        >
                                          {word}
                                        </button>
                                      ))}
                                    </div>
                                  </div>
                                )}

                                {/* Action buttons */}
                                <div className="flex items-center gap-2 pt-3 border-t border-[#e7e5e4]">
                                  <button
                                    onClick={() => setCheckedGames(prev => ({ ...prev, [game.id]: true }))}
                                    className="px-4 py-2 bg-[#b91c1c] hover:bg-[#991b1b] text-white text-xs font-mono font-bold uppercase tracking-wider cursor-pointer"
                                  >
                                    Kiểm tra đáp án
                                  </button>
                                  <button
                                    onClick={() => setShowSolutions(prev => ({ ...prev, [game.id]: !prev[game.id] }))}
                                    className="px-3.5 py-2 bg-white text-[#44403c] border border-[#e7e5e4] text-xs font-mono font-bold cursor-pointer"
                                  >
                                    {showSolutions[game.id] ? 'Ẩn đáp án' : 'Hiện đáp án'}
                                  </button>
                                  <button
                                    onClick={() => {
                                      const cleared = { ...minigameInputs };
                                      parsedData.blanks?.forEach((b: any) => {
                                        delete cleared[`rec_${game.id}_${b.id}`];
                                      });
                                      setMinigameInputs(cleared);
                                      setCheckedGames(prev => ({ ...prev, [game.id]: false }));
                                      setShowSolutions(prev => ({ ...prev, [game.id]: false }));
                                      setActiveBlankKey(null);
                                      setShuffleSeeds(prev => ({ ...prev, [game.id]: (prev[game.id] || 0) + 1 }));
                                    }}
                                    className="px-3 py-2 text-xs font-mono text-[#78716c] hover:text-[#b91c1c] cursor-pointer"
                                  >
                                    Làm lại
                                  </button>
                                </div>
                              </div>
                            )}'''

NEW_RECIPE = '''                            {/* Dạng RECIPE_CLOZE: Mô phỏng chính xác phiếu công thức làm bánh từ giáo trình */}
                            {(game.gameType === 'RECIPE_CLOZE' || (parsedData.blanks && !parsedData.dialogue && parsedData.wordBank)) && (() => {
                              const renderInlineBlank = (bId: number) => {
                                const b = parsedData.blanks?.find((item: any) => item.id === bId);
                                if (!b) return null;
                                const key = `rec_${game.id}_${b.id}`;
                                const val = showSolutions[game.id] ? b.answer : (minigameInputs[key] || '');
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
                                  <span key={bId} className="inline-flex items-center gap-1 mx-1 align-middle">
                                    <span className="font-mono text-xs font-bold text-[#b91c1c] select-none">{b.num}</span>
                                    <input
                                      type="text"
                                      value={val}
                                      readOnly={showSolutions[game.id]}
                                      onFocus={() => setActiveBlankKey(key)}
                                      onClick={() => setActiveBlankKey(key)}
                                      onChange={(e) => {
                                        const newVal = e.target.value;
                                        setMinigameInputs(prev => ({ ...prev, [key]: newVal }));
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
                                                Ô {parsedData.blanks?.find((b: any) => `rec_${game.id}_${b.id}` === activeBlankKey)?.num || ''}
                                              </span>
                                            )}
                                          </div>

                                          <div className="grid grid-cols-2 gap-2">
                                            {getShuffledBank(parsedData.wordBank || [], (game.id * 7919 + 1013) + (shuffleSeeds[game.id] || 0) * 37).map((word: string) => (
                                              <button
                                                key={word}
                                                onClick={() => {
                                                  let targetKey = activeBlankKey;
                                                  if (!targetKey) {
                                                    const firstEmpty = parsedData.blanks?.find((b: any) => !minigameInputs[`rec_${game.id}_${b.id}`]);
                                                    if (firstEmpty) targetKey = `rec_${game.id}_${firstEmpty.id}`;
                                                    else if (parsedData.blanks?.length > 0) targetKey = `rec_${game.id}_${parsedData.blanks[0].id}`;
                                                  }
                                                  if (targetKey) {
                                                    setMinigameInputs(prev => ({ ...prev, [targetKey!]: word }));
                                                    const currentId = parseInt(targetKey.split('_')[2], 10);
                                                    const nextBlank = parsedData.blanks?.find((b: any) => b.id > currentId && !minigameInputs[`rec_${game.id}_${b.id}`]);
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
                                        onClick={() => setCheckedGames(prev => ({ ...prev, [game.id]: true }))}
                                        className="px-4 py-2.5 bg-[#b91c1c] hover:bg-[#991b1b] text-white text-xs font-mono font-bold uppercase tracking-wider cursor-pointer shadow-xs"
                                      >
                                        ✓ Kiểm tra đáp án
                                      </button>
                                      <button
                                        onClick={() => setShowSolutions(prev => ({ ...prev, [game.id]: !prev[game.id] }))}
                                        className="px-3.5 py-2.5 bg-white text-[#44403c] border border-[#e7e5e4] text-xs font-mono font-bold cursor-pointer hover:bg-[#fafaf9]"
                                      >
                                        💡 {showSolutions[game.id] ? 'Ẩn đáp án' : 'Hiện đáp án'}
                                      </button>
                                      <button
                                        onClick={() => {
                                          const cleared = { ...minigameInputs };
                                          parsedData.blanks?.forEach((b: any) => {
                                            delete cleared[`rec_${game.id}_${b.id}`];
                                          });
                                          setMinigameInputs(cleared);
                                          setCheckedGames(prev => ({ ...prev, [game.id]: false }));
                                          setShowSolutions(prev => ({ ...prev, [game.id]: false }));
                                          setActiveBlankKey(null);
                                          setShuffleSeeds(prev => ({ ...prev, [game.id]: (prev[game.id] || 0) + 1 }));
                                        }}
                                        className="px-3 py-2 text-xs font-mono text-[#78716c] hover:text-[#b91c1c] cursor-pointer"
                                      >
                                        Làm lại
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              );
                            })()}'''

if OLD_RECIPE in content:
    content = content.replace(OLD_RECIPE, NEW_RECIPE, 1)
    print("✓ Successfully replaced RECIPE_CLOZE with authentic textbook simulation.")
else:
    print("❌ Failed to find OLD_RECIPE in Kanji.tsx")

# ----------------------------------------------------------------------
# 3. DẠNG 5 EXCLUSION & QUESTION FORMAT (Issues 1 & 4)
# ----------------------------------------------------------------------
OLD_DANG5 = '''                            {/* Dạng 5: Trắc nghiệm tình huống & Câu hỏi tương tác (PICTURE_MATCH / Generic questions) */}
                            {((game.gameType === 'PICTURE_MATCH' || !['ORDERING', 'COUNTING'].includes(game.gameType)) &&
                              parsedData.questions &&
                              parsedData.questions.length > 0 &&
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
                                  {parsedData.questions.map((q: any) => {
                                    const key = `q_${game.id}_${q.id}`;
                                    const selectedOpt = minigameInputs[key];

                                    return (
                                      <div key={q.id} className="bg-white p-4 border border-[#e7e5e4] shadow-xs">
                                        <div className="text-xs sm:text-sm font-serif font-bold text-[#1c1917] mb-2.5 flex items-center gap-2">
                                          <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#fafaf9] border border-[#e7e5e4] text-[10px] font-mono text-[#78716c]">
                                            {q.id}
                                          </span>
                                          <span>{q.prompt}</span>
                                        </div>
                                        <div className="flex flex-wrap items-center gap-2">
                                          {q.options?.map((opt: string) => {
                                            const isSelected = selectedOpt === opt;
                                            const isCorrect = opt === q.answer;
                                            let style = 'bg-[#fafaf9] text-[#44403c] border-[#e7e5e4] hover:bg-white hover:border-[#a8a29e]';
                                            if (selectedOpt) {
                                              if (isCorrect) style = 'bg-[#15803d] text-white border-[#15803d] font-bold shadow-xs';
                                              else if (isSelected) style = 'bg-[#dc2626] text-white border-[#dc2626] font-bold shadow-xs';
                                              else style = 'opacity-40 bg-[#f5f5f4] border-[#e7e5e4] text-[#a8a29e]';
                                            }

                                            return (
                                              <button
                                                key={opt}
                                                onClick={() =>
                                                  setMinigameInputs({
                                                    ...minigameInputs,
                                                    [key]: opt,
                                                  })
                                                }
                                                className={`px-3.5 py-2 text-xs sm:text-sm font-serif border transition-all cursor-pointer ${style}`}
                                              >
                                                {opt}
                                              </button>
                                            );
                                          })}
                                        </div>
                                        {selectedOpt && (
                                          <div className="mt-3 pt-2.5 border-t border-[#f5f5f4] flex flex-col gap-1">
                                            <div className="text-xs font-mono font-bold text-[#15803d] flex items-center gap-1.5">
                                              <span>✓ Đáp án đúng:</span>
                                              <span className="underline decoration-2">{q.answer}</span>
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
                              </div>
                            )}'''

NEW_DANG5 = '''                            {/* Dạng 5: Trắc nghiệm tình huống chuẩn format (Dòng 1 tiếng Nhật, Dòng 2 tiếng Việt in nghiêng, Nút thuần Nhật) */}
                            {(![
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
                            ].includes(game.gameType) &&
                              parsedData.questions &&
                              parsedData.questions.length > 0 &&
                              Boolean(parsedData.questions[0].prompt) &&
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
                                  {parsedData.questions.map((q: any) => {
                                    const key = `q_${game.id}_${q.id}`;
                                    const selectedOpt = minigameInputs[key];

                                    // Tách chuẩn dòng chính tiếng Nhật và dòng phụ tiếng Việt in nghiêng
                                    const mainPrompt = q.promptJa || q.prompt;
                                    const subVi = q.promptVi || q.meaningVi || (q.promptJa && q.prompt !== q.promptJa ? q.prompt : null);

                                    return (
                                      <div key={q.id} className="bg-white p-4 border border-[#e7e5e4] shadow-xs">
                                        <div className="mb-2.5">
                                          <div className="text-xs sm:text-sm font-serif font-bold text-[#1c1917] flex items-start gap-2">
                                            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#fafaf9] border border-[#e7e5e4] text-[10px] font-mono text-[#78716c] flex-shrink-0 mt-0.5">
                                              {q.id}
                                            </span>
                                            <span className="leading-relaxed">{mainPrompt}</span>
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
                                            const cleanOpt = opt.replace(/\\s*\\(.*?\\)\\s*$/, '').trim();
                                            const cleanAns = (q.answer || '').replace(/\\s*\\(.*?\\)\\s*$/, '').trim();

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
                                                onClick={() =>
                                                  setMinigameInputs({
                                                    ...minigameInputs,
                                                    [key]: cleanOpt,
                                                  })
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
                                                {(q.answer || '').replace(/\\s*\\(.*?\\)\\s*$/, '').trim()}
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
                              </div>
                            )}'''

if OLD_DANG5 in content:
    content = content.replace(OLD_DANG5, NEW_DANG5, 1)
    print("✓ Successfully updated Dạng 5 exclusion and format.")
else:
    print("❌ Failed to find OLD_DANG5 in Kanji.tsx")

with open(FILE_PATH, 'w', encoding='utf-8') as f:
    f.write(content)

print("Done patching Kanji.tsx.")
