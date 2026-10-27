# -*- coding: utf-8 -*-
import sys
sys.stdout.reconfigure(encoding='utf-8')

FILE_PATH = 'frontend/src/screens/Kanji.tsx'

with open(FILE_PATH, 'r', encoding='utf-8') as f:
    content = f.read()

# ----------------------------------------------------------------------
# 1. LEVEL ACCESS RESTRICTION (Point 1)
# ----------------------------------------------------------------------
OLD_LEVEL_INIT = '''  // Cấp độ đang học (Mặc định theo level tài khoản của User: N3 / N4 / N5)
  const [selectedLevel, setSelectedLevel] = useState<string>(() => {
    const userLvl = user?.jlptLevel ? user.jlptLevel.toUpperCase() : 'N3';
    return ['N3', 'N4', 'N5'].includes(userLvl) ? userLvl : 'N3';
  });

  // Xếp hạng cấp độ JLPT: STARTER < N5 < N4 < N3 < N2 < N1
  // Nếu học viên có level cao hơn cấp độ đang xem (VD: User N3 xem N4/N5), toàn bộ chương sẽ tự động mở khóa
  const JLPT_RANK: Record<string, number> = { STARTER: 0, N5: 1, N4: 2, N3: 3, N2: 4, N1: 5 };
  const userRank = JLPT_RANK[user?.jlptLevel?.toUpperCase() || ''] || 0;
  const currentLevelRank = JLPT_RANK[selectedLevel?.toUpperCase() || ''] || 0;
  const isLowerLevel = userRank > currentLevelRank;'''

NEW_LEVEL_INIT = '''  // Xếp hạng cấp độ JLPT: STARTER: 1, N5: 1, N4: 2, N3: 3, N2: 4, N1: 5
  const JLPT_RANK: Record<string, number> = { STARTER: 1, N5: 1, N4: 2, N3: 3, N2: 4, N1: 5 };
  const userLevel = (user?.jlptLevel || localStorage.getItem('nippon_user_level') || 'N4').toUpperCase();
  const userRank = user?.role === 'ADMIN' ? 5 : (JLPT_RANK[userLevel] || 2);

  // Danh sách cấp độ học viên được phép xem & truy cập (chỉ hiển thị và cho phép truy cập các level <= level tài khoản)
  const availableLevels = (['N5', 'N4', 'N3'] as const).filter((lvl) => JLPT_RANK[lvl] <= userRank);

  // Cấp độ đang học: Mặc định theo level tài khoản, và bị khóa nếu vượt quá quyền truy cập
  const [selectedLevel, setSelectedLevel] = useState<string>(() => {
    const target = ['N5', 'N4', 'N3'].includes(userLevel) ? userLevel : 'N4';
    return availableLevels.includes(target as any) ? target : (availableLevels[availableLevels.length - 1] || 'N4');
  });

  // Tự động kiểm soát quyền truy cập: Nếu user đang ở level N4 mà cố truy cập N3, tự động chuyển về N4
  useEffect(() => {
    if (!availableLevels.includes(selectedLevel as any)) {
      setSelectedLevel(availableLevels[availableLevels.length - 1] || 'N4');
      setSelectedChapterId(0);
    }
  }, [availableLevels, selectedLevel]);

  const currentLevelRank = JLPT_RANK[selectedLevel?.toUpperCase() || ''] || 0;
  const isLowerLevel = userRank > currentLevelRank;'''

if OLD_LEVEL_INIT in content:
    content = content.replace(OLD_LEVEL_INIT, NEW_LEVEL_INIT, 1)
    print("✓ Successfully replaced LEVEL_INIT with strict access restriction.")
else:
    print("❌ Failed to find OLD_LEVEL_INIT")

# Level Selector Tabs
OLD_TABS = '''            {/* Level Selector Tabs: N5, N4 & N3 */}
            <div className="flex items-center gap-2 mt-3">
              {(['N5', 'N4', 'N3'] as const).map((lvl) => {
                const isCur = selectedLevel === lvl;
                const isUserLvl = user?.jlptLevel?.toUpperCase() === lvl;
                return (
                  <button
                    key={lvl}
                    onClick={() => {
                      if (selectedLevel !== lvl) {
                        setSelectedLevel(lvl);
                        setSelectedChapterId(0);
                      }
                    }}
                    className={`px-3 py-1.5 text-xs font-mono font-bold border transition-all cursor-pointer flex items-center gap-1.5 ${
                      isCur
                        ? 'bg-[#b91c1c] text-white border-[#b91c1c] shadow-xs'
                        : 'bg-white text-[#44403c] border-[#e7e5e4] hover:border-[#a8a29e] hover:bg-[#fafaf9]'
                    }`}
                  >
                    <span>JLPT {lvl}</span>
                    {lvl === 'N3' ? (
                      <span className={`text-[10px] ${isCur ? 'text-red-100' : 'text-[#78716c]'}`}>
                        (20 Chương)
                      </span>
                    ) : lvl === 'N4' ? (
                      <span className={`text-[10px] ${isCur ? 'text-red-100' : 'text-[#78716c]'}`}>
                        (9 Chương)
                      </span>
                    ) : (
                      <span className={`text-[10px] ${isCur ? 'text-red-100' : 'text-[#78716c]'}`}>
                        (15 Chương)
                      </span>
                    )}
                    {isUserLvl && (
                      <span className={`text-[9px] px-1 py-0.2 rounded-xs font-sans ${isCur ? 'bg-red-800 text-red-100' : 'bg-red-100 text-red-700'}`}>
                        Mục tiêu
                      </span>
                    )}
                  </button>
                );
              })}
            </div>'''

NEW_TABS = '''            {/* Level Selector Tabs: Chỉ hiển thị các cấp độ học viên đủ điều kiện truy cập theo tài khoản */}
            <div className="flex items-center gap-2 mt-3">
              {availableLevels.map((lvl) => {
                const isCur = selectedLevel === lvl;
                const isUserLvl = userLevel === lvl;
                return (
                  <button
                    key={lvl}
                    onClick={() => {
                      if (selectedLevel !== lvl) {
                        setSelectedLevel(lvl);
                        setSelectedChapterId(0);
                      }
                    }}
                    className={`px-3 py-1.5 text-xs font-mono font-bold border transition-all cursor-pointer flex items-center gap-1.5 ${
                      isCur
                        ? 'bg-[#b91c1c] text-white border-[#b91c1c] shadow-xs'
                        : 'bg-white text-[#44403c] border-[#e7e5e4] hover:border-[#a8a29e] hover:bg-[#fafaf9]'
                    }`}
                  >
                    <span>JLPT {lvl}</span>
                    {lvl === 'N3' ? (
                      <span className={`text-[10px] ${isCur ? 'text-red-100' : 'text-[#78716c]'}`}>
                        (20 Chương)
                      </span>
                    ) : lvl === 'N4' ? (
                      <span className={`text-[10px] ${isCur ? 'text-red-100' : 'text-[#78716c]'}`}>
                        (9 Chương)
                      </span>
                    ) : (
                      <span className={`text-[10px] ${isCur ? 'text-red-100' : 'text-[#78716c]'}`}>
                        (15 Chương)
                      </span>
                    )}
                    {isUserLvl && (
                      <span className={`text-[9px] px-1 py-0.2 rounded-xs font-sans ${isCur ? 'bg-red-800 text-red-100' : 'bg-red-100 text-red-700'}`}>
                        Mục tiêu
                      </span>
                    )}
                  </button>
                );
              })}
            </div>'''

if OLD_TABS in content:
    content = content.replace(OLD_TABS, NEW_TABS, 1)
    print("✓ Successfully updated Level Selector Tabs to only show availableLevels.")
else:
    print("❌ Failed to find OLD_TABS")

# ----------------------------------------------------------------------
# 2. AUDIO PLAYBACK FUNCTION (Point 2)
# ----------------------------------------------------------------------
OLD_SPEAK = '''  const speakJapanese = (text: string) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const clean = text.replace(/\\[|\\]/g, '').replace(/Kanji đúng là:.*$/g, '').trim();
      const utterance = new SpeechSynthesisUtterance(clean);
      utterance.lang = 'ja-JP';
      utterance.rate = 0.88;
      window.speechSynthesis.speak(utterance);
    }
  };'''

NEW_SPEAK = '''  const speakJapanese = (text: string) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const clean = text.replace(/\\[|\\]/g, '').replace(/Kanji đúng là:.*$/g, '').trim();
      const utterance = new SpeechSynthesisUtterance(clean);
      utterance.lang = 'ja-JP';
      utterance.rate = 0.88;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Phát âm thanh tiếng Nhật chuẩn cho lời thoại có ô đục lỗ
  const handlePlayDialogueAudio = (utt: any, blanks?: any[]) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      let speakText = utt.text || '';
      if (blanks && blanks.length > 0) {
        speakText = speakText.replace(/\\[blank:(\\d+)\\]/g, (_match: string, idStr: string) => {
          const bId = parseInt(idStr, 10);
          const b = blanks.find((item: any) => item.id === bId);
          if (!b) return '';
          return b.hiragana || b.targetWord || b.answer || '';
        });
      }
      speakText = speakText.replace(/\\[|\\]/g, '').replace(/[\\n\\r]+/g, ' ').trim();
      const utterance = new SpeechSynthesisUtterance(speakText);
      utterance.lang = 'ja-JP';
      utterance.rate = 0.88;
      const voices = window.speechSynthesis.getVoices();
      const jaVoice = voices.find((v) => v.lang.startsWith('ja') || v.lang.includes('JP'));
      if (jaVoice) utterance.voice = jaVoice;
      window.speechSynthesis.speak(utterance);
    }
  };'''

if OLD_SPEAK in content:
    content = content.replace(OLD_SPEAK, NEW_SPEAK, 1)
    print("✓ Successfully added handlePlayDialogueAudio.")
else:
    print("❌ Failed to find OLD_SPEAK")

# ----------------------------------------------------------------------
# 3. ADD AUDIO BUTTON IN CLOZE_DIALOGUE (Point 2)
# ----------------------------------------------------------------------
OLD_SPEAKER = '''                                        <div key={uIdx} className="flex items-start gap-3.5 pb-3 border-b border-[#f5f5f4] last:border-b-0 last:pb-0">
                                          <div className="flex-shrink-0 mt-1">
                                            <span className={`inline-flex items-center justify-center px-2.5 py-1 text-xs font-mono font-bold tracking-wider ${
                                              isInterviewer ? 'bg-[#44403c] text-white' : 'bg-[#b91c1c] text-white shadow-2xs'
                                            }`}>
                                              {utt.speaker}
                                            </span>
                                          </div>
                                          <div className="flex-1 min-w-0">'''

NEW_SPEAKER = '''                                        <div key={uIdx} className="flex items-start gap-3.5 pb-3 border-b border-[#f5f5f4] last:border-b-0 last:pb-0">
                                          <div className="flex-shrink-0 mt-1 flex flex-col items-center gap-1.5">
                                            <span className={`inline-flex items-center justify-center px-2.5 py-1 text-xs font-mono font-bold tracking-wider ${
                                              isInterviewer ? 'bg-[#44403c] text-white' : 'bg-[#b91c1c] text-white shadow-2xs'
                                            }`}>
                                              {utt.speaker}
                                            </span>
                                            {/* Nút bấm nghe audio phát âm đoạn hội thoại */}
                                            <button
                                              type="button"
                                              onClick={() => handlePlayDialogueAudio(utt, parsedData.blanks)}
                                              title="Bấm để nghe phát âm tiếng Nhật đoạn này"
                                              className="p-1 rounded-full text-[#78716c] hover:text-[#b91c1c] hover:bg-red-50 border border-transparent hover:border-red-200 transition-all cursor-pointer shadow-2xs active:scale-90 flex items-center justify-center"
                                            >
                                              <Volume2 className="w-3.5 h-3.5" />
                                            </button>
                                          </div>
                                          <div className="flex-1 min-w-0">'''

if OLD_SPEAKER in content:
    content = content.replace(OLD_SPEAKER, NEW_SPEAKER, 1)
    print("✓ Successfully added audio button to CLOZE_DIALOGUE speakers.")
else:
    print("❌ Failed to find OLD_SPEAKER")

# ----------------------------------------------------------------------
# 4. LARGER NUMBER BADGES (Point 3)
# ----------------------------------------------------------------------
# 4.1 Cấu thành bộ thủ:
OLD_RAD_BADGE_GRID = '''                                                      <span className="absolute top-0.5 left-1 text-[10px] font-mono font-bold text-[#a8a29e] select-none leading-none">
                                                        {CIRCLED_NUMS[pIdx] || `${pIdx + 1}`}
                                                      </span>'''

NEW_RAD_BADGE_GRID = '''                                                      <span className="absolute top-1 left-1.5 text-xs sm:text-sm font-mono font-extrabold text-[#b91c1c] bg-[#fef2f2] px-1 py-0.5 border border-red-200 select-none leading-none rounded-xs">
                                                        {CIRCLED_NUMS[pIdx] || `${pIdx + 1}`}
                                                      </span>'''

OLD_RAD_BADGE_FLEX = '''                                                      <span className="absolute top-1 left-1.5 text-[10px] font-mono font-bold text-[#a8a29e] select-none leading-none">
                                                        {CIRCLED_NUMS[pIdx] || `${pIdx + 1}`}
                                                      </span>'''

NEW_RAD_BADGE_FLEX = '''                                                      <span className="absolute top-1.5 left-2 text-xs sm:text-sm font-mono font-extrabold text-[#b91c1c] bg-[#fef2f2] px-1 py-0.5 border border-red-200 select-none leading-none rounded-xs">
                                                        {CIRCLED_NUMS[pIdx] || `${pIdx + 1}`}
                                                      </span>'''

if OLD_RAD_BADGE_GRID in content:
    content = content.replace(OLD_RAD_BADGE_GRID, NEW_RAD_BADGE_GRID, 1)
    print("✓ Successfully enlarged grid radical badge numbers.")

if OLD_RAD_BADGE_FLEX in content:
    content = content.replace(OLD_RAD_BADGE_FLEX, NEW_RAD_BADGE_FLEX, 1)
    print("✓ Successfully enlarged flex radical badge numbers.")

# 4.2 CLOZE_DIALOGUE blanks:
OLD_CLOZE_BLANK_NUM = '''                                                        <span className="text-[11px] font-mono font-bold text-[#b91c1c] -mb-1">
                                                          {blank.num || `[${blankId}]`}
                                                        </span>'''

NEW_CLOZE_BLANK_NUM = '''                                                        <span className="text-xs sm:text-sm font-mono font-extrabold text-[#b91c1c] mb-1 bg-[#fef2f2] px-1.5 py-0.5 rounded border border-red-200 shadow-2xs select-none">
                                                          {blank.num || `[${blankId}]`}
                                                        </span>'''

if OLD_CLOZE_BLANK_NUM in content:
    content = content.replace(OLD_CLOZE_BLANK_NUM, NEW_CLOZE_BLANK_NUM, 1)
    print("✓ Successfully enlarged CLOZE_DIALOGUE blank badge numbers.")
else:
    print("❌ Failed to find OLD_CLOZE_BLANK_NUM")

# 4.3 RECIPE_CLOZE blanks:
OLD_REC_BLANK_NUM = '''                                    <span className="font-mono text-xs font-bold text-[#b91c1c] select-none">{b.num}</span>'''

NEW_REC_BLANK_NUM = '''                                    <span className="inline-flex items-center justify-center font-mono text-sm sm:text-base font-extrabold text-[#b91c1c] bg-[#fef2f2] border border-red-200 px-1.5 py-0.5 rounded shadow-2xs select-none">{b.num}</span>'''

if OLD_REC_BLANK_NUM in content:
    content = content.replace(OLD_REC_BLANK_NUM, NEW_REC_BLANK_NUM, 1)
    print("✓ Successfully enlarged RECIPE_CLOZE blank badge numbers.")
else:
    print("❌ Failed to find OLD_REC_BLANK_NUM")

# 4.4 Dạng 5 question badge:
OLD_Q_BADGE = '''                                            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#fafaf9] border border-[#e7e5e4] text-[10px] font-mono text-[#78716c] flex-shrink-0 mt-0.5">
                                              {q.id}
                                            </span>'''

NEW_Q_BADGE = '''                                            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#b91c1c] text-white text-xs sm:text-sm font-mono font-extrabold shadow-xs flex-shrink-0 mt-0.5">
                                              {q.id}
                                            </span>'''

if OLD_Q_BADGE in content:
    content = content.replace(OLD_Q_BADGE, NEW_Q_BADGE, 1)
    print("✓ Successfully enlarged Question badge numbers.")
else:
    print("❌ Failed to find OLD_Q_BADGE")

with open(FILE_PATH, 'w', encoding='utf-8') as f:
    f.write(content)

print("Done patching Kanji.tsx for Round 2.")
