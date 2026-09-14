import { useState, useCallback } from 'react';
import { Volume2, Check, ArrowRight, RotateCcw, GraduationCap, AlertTriangle, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import {
  GRAMMAR_PATTERNS, GRAMMAR_GRADUATION_QUIZ
} from '../../data/basicGrammarData';
import { speakJapanese } from '../../data/kanaData';
import { playCorrectSound, playWrongSound, playFanfareSound } from '../../utils/audioSfx';

interface BasicGrammarHubProps {
  onChapterComplete?: (chapterId: string, scorePercent: number) => void;
}

export default function BasicGrammarHub({ onChapterComplete }: BasicGrammarHubProps) {
  const [activeTab, setActiveTab] = useState<'patterns' | 'tenses' | 'graduation'>('patterns');

  // Quiz State
  const [quizIdx, setQuizIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizDone, setQuizDone] = useState(false);
  const [wrongQuestions, setWrongQuestions] = useState<typeof GRAMMAR_GRADUATION_QUIZ>([]);
  const [showGraduationModal, setShowGraduationModal] = useState(false);

  const handleAnswerSelect = (optionIdx: number) => {
    if (isAnswered) return;
    setSelectedOption(optionIdx);
    setIsAnswered(true);

    const currentQ = GRAMMAR_GRADUATION_QUIZ[quizIdx];
    if (optionIdx === currentQ.correctIndex) {
      setScore(s => s + 1);
      playCorrectSound();
      if (currentQ.audioText) speakJapanese(currentQ.audioText);
    } else {
      playWrongSound();
      setWrongQuestions(prev => [...prev, currentQ]);
    }
  };

  const handleNextQuestion = () => {
    if (quizIdx + 1 < GRAMMAR_GRADUATION_QUIZ.length) {
      setQuizIdx(i => i + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setQuizDone(true);
      const finalScore = score;
      const pct = Math.round((finalScore / GRAMMAR_GRADUATION_QUIZ.length) * 100);
      if (pct >= 60) {
        setShowGraduationModal(true);
        playFanfareSound();
        if (onChapterComplete) {
          onChapterComplete('chapter-5', pct);
        }
      }
    }
  };

  const handleRestartQuiz = () => {
    setQuizIdx(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setQuizDone(false);
    setWrongQuestions([]);
    setShowGraduationModal(false);
  };

  // Generate and download graduation certificate as PNG using Canvas API
  const downloadCertificate = useCallback(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 900;
    canvas.height = 600;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, 900, 600);
    gradient.addColorStop(0, '#fef7f0');
    gradient.addColorStop(1, '#fff1f2');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 900, 600);

    // Gold border
    ctx.strokeStyle = '#c8a455';
    ctx.lineWidth = 6;
    ctx.strokeRect(20, 20, 860, 560);
    ctx.strokeStyle = '#e8c97a';
    ctx.lineWidth = 2;
    ctx.strokeRect(30, 30, 840, 540);

    // Header decorations
    ctx.fillStyle = '#c01538';
    ctx.font = 'bold 16px "Noto Sans JP", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('🎓 NIPPONMASTER ACADEMY 🎓', 450, 80);

    // Certificate title
    ctx.fillStyle = '#231815';
    ctx.font = 'bold 36px "Noto Sans JP", sans-serif';
    ctx.fillText('BẰNG CHỨNG NHẬN', 450, 140);

    // Subtitle
    ctx.fillStyle = '#c01538';
    ctx.font = 'bold 28px "Noto Sans JP", sans-serif';
    ctx.fillText('TỐT NGHIỆP NHẬP MÔN TIẾNG NHẬT', 450, 190);

    // Divider
    ctx.strokeStyle = '#c8a455';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(200, 215);
    ctx.lineTo(700, 215);
    ctx.stroke();

    // Body text
    ctx.fillStyle = '#5a5450';
    ctx.font = '16px "Noto Sans JP", sans-serif';
    ctx.fillText('Học viện NipponMaster xác nhận bạn đã hoàn thành', 450, 270);
    ctx.fillText('xuất sắc toàn bộ 5 Chương Lộ Trình Nhập Môn Tiếng Nhật', 450, 300);

    // Chapters completed
    ctx.fillStyle = '#2b5f43';
    ctx.font = 'bold 14px "Noto Sans JP", sans-serif';
    const chapters = [
      '📖 Bảng Chữ Cái Kana',
      '📖 Số Đếm & Thời Gian',
      '📖 Chào Hỏi Giao Tiếp',
      '📖 50+ Bộ Thủ Kanji',
      '📖 Cấu Trúc Ngữ Pháp N5',
    ];
    chapters.forEach((ch, i) => {
      ctx.fillText(ch, 450, 345 + i * 26);
    });

    // Score
    const pct = Math.round((score / GRAMMAR_GRADUATION_QUIZ.length) * 100);
    ctx.fillStyle = '#c01538';
    ctx.font = 'bold 20px "Noto Sans JP", sans-serif';
    ctx.fillText(`Điểm thi tốt nghiệp: ${pct}%`, 450, 510);

    // Date
    ctx.fillStyle = '#8c827b';
    ctx.font = '13px "Noto Sans JP", sans-serif';
    ctx.fillText(`Ngày cấp: ${new Date().toLocaleDateString('vi-VN')}`, 450, 545);

    // Download
    const link = document.createElement('a');
    link.download = `NipponMaster_Certificate_${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  }, [score]);

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wider mb-1">
          <span>📖 CHƯƠNG 5 (CHƯƠNG CUỐI)</span>
          <span>•</span>
          <span>SÁCH GIÁO KHOA NHẬP MÔN</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-on-surface tracking-tight">
          Cấu Trúc Câu, Thì Ngữ Pháp & Lễ Tốt Nghiệp Nhập Môn
        </h1>
        <p className="text-sm text-on-surface-variant mt-1">
          Nắm vững mẫu câu `N1 は N2 です`, từ chỉ định, bảng biến đổi thì và hoàn thành Bài Thi Tốt Nghiệp Nhập Môn!
        </p>
      </div>

      {/* Tabs Navigation */}
      <div className="flex flex-wrap gap-2 border-b border-outline-variant/30 pb-3">
        {[
          { id: 'patterns', label: '📖 1. Cấu Trúc Câu Căn Bản' },
          { id: 'tenses', label: '⏱️ 2. Bảng Biến Đổi Thì' },
          { id: 'graduation', label: '🎓 3. Bài Test Tốt Nghiệp (20 câu)' },
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id as any)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
              activeTab === t.id
                ? 'bg-primary text-on-primary shadow-sm scale-102'
                : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        {/* TAB 1: CẤU TRÚC CÂU CĂN BẢN */}
        {activeTab === 'patterns' && (
          <motion.div key="patterns" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
            <div className="space-y-6">
              {GRAMMAR_PATTERNS.map(g => (
                <div key={g.id} className="bg-surface-container-lowest border border-outline-variant/30 rounded-3xl p-6 md:p-8 space-y-5 shadow-sm">
                  <div className="border-b border-outline-variant/20 pb-4">
                    <span className="text-xs font-bold text-primary uppercase tracking-wider">Mẫu Ngữ Pháp</span>
                    <h2 className="text-xl md:text-2xl font-bold text-on-surface font-jp mt-0.5">{g.pattern}</h2>
                    <p className="text-sm font-semibold text-secondary mt-1">{g.title}</p>
                  </div>

                  {/* Structure Diagram Box */}
                  <div className="p-4 rounded-2xl bg-secondary/10 border border-secondary/20">
                    <div className="text-xs font-bold text-secondary uppercase tracking-wider mb-1">📐 Sơ đồ khối cấu trúc câu:</div>
                    <div className="text-sm font-bold font-mono text-on-surface">{g.structureDiagram}</div>
                  </div>

                  <p className="text-xs text-on-surface-variant leading-relaxed">{g.explanation}</p>

                  {/* Usage Notes */}
                  <div className="p-4 rounded-2xl bg-surface-container text-xs space-y-1.5">
                    <div className="font-bold text-on-surface">💡 Lưu ý quan trọng:</div>
                    {g.usageNotes.map((note, i) => (
                      <div key={i} className="text-on-surface-variant">• {note}</div>
                    ))}
                  </div>

                  {/* Examples */}
                  <div className="space-y-3 pt-2">
                    <div className="text-xs font-bold text-on-surface uppercase tracking-wider">Ví dụ minh họa:</div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {g.examples.map((ex, idx) => (
                        <div key={idx} className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/20 space-y-2 flex items-start justify-between">
                          <div className="space-y-1">
                            <div className="font-jp text-lg font-bold text-on-surface">{ex.japanese}</div>
                            <div className="text-xs text-primary">{ex.romaji}</div>
                            <div className="text-xs font-semibold text-on-surface-variant">{ex.meaning}</div>
                          </div>

                          <button
                            onClick={() => speakJapanese(ex.audioText)}
                            className="p-2 rounded-xl bg-primary/10 text-primary hover:bg-primary/20 transition-colors cursor-pointer flex-shrink-0"
                            title="Nghe ví dụ"
                          >
                            <Volume2 size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* TAB 2: BẢNG BIẾN ĐỔI THÌ */}
        {activeTab === 'tenses' && (
          <motion.div key="tenses" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
            <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-3xl p-6 md:p-8 space-y-6 shadow-sm">
              <div>
                <h2 className="text-xl font-bold text-on-surface">⏱️ Bảng Biến Đổi Thì Nhập Môn</h2>
                <p className="text-xs text-on-surface-variant mt-1">So sánh thì Hiện tại ↔ Quá khứ giữa Danh từ (`です`) và Động từ (`ます`).</p>
              </div>

              {/* Matrix Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-surface-container text-on-surface font-bold">
                      <th className="p-3.5 border-b border-outline-variant/30">Loại từ / Thể</th>
                      <th className="p-3.5 border-b border-outline-variant/30">Hiện tại (Khẳng định)</th>
                      <th className="p-3.5 border-b border-outline-variant/30">Hiện tại (Phủ định)</th>
                      <th className="p-3.5 border-b border-outline-variant/30">Quá khứ (Khẳng định)</th>
                      <th className="p-3.5 border-b border-outline-variant/30">Quá khứ (Phủ định)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/20">
                    <tr className="hover:bg-surface-container-low transition-colors">
                      <td className="p-3.5 font-bold text-primary">Danh Từ (Noun)</td>
                      <td className="p-3.5 font-jp font-bold">〜です (desu)</td>
                      <td className="p-3.5 font-jp text-tertiary">〜ではありません</td>
                      <td className="p-3.5 font-jp font-bold text-secondary">〜でした (deshita)</td>
                      <td className="p-3.5 font-jp text-crimson-600">〜ではありませんでした</td>
                    </tr>
                    <tr className="hover:bg-surface-container-low transition-colors">
                      <td className="p-3.5 font-bold text-primary">Động Từ (Verb)</td>
                      <td className="p-3.5 font-jp font-bold">〜ます (masu)</td>
                      <td className="p-3.5 font-jp text-tertiary">〜ません (masen)</td>
                      <td className="p-3.5 font-jp font-bold text-secondary">〜ました (mashita)</td>
                      <td className="p-3.5 font-jp text-crimson-600">〜ませんでした</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="p-4 rounded-2xl bg-surface-container text-xs text-on-surface-variant space-y-1">
                <div className="font-bold text-on-surface">💡 Ví dụ thực tế:</div>
                <p>• 昨日は 雨でした (Hôm qua trời đã mưa — Quá khứ của Danh từ).</p>
                <p>• きのう 勉強しました (Hôm qua tôi đã học — Quá khứ của Động từ ます ➔ ました).</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 3: BÀI TEST TỐT NGHIỆP */}
        {activeTab === 'graduation' && (
          <motion.div key="graduation" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="max-w-2xl mx-auto space-y-6">
            {!quizDone ? (
              <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-3xl p-6 md:p-8 space-y-6 shadow-sm">
                {/* Progress Header */}
                <div className="flex items-center justify-between text-xs font-semibold text-on-surface-variant border-b border-outline-variant/20 pb-4">
                  <div className="flex items-center gap-2">
                    <GraduationCap size={18} className="text-primary" />
                    <span>Bài Thi Tốt Nghiệp: Câu {quizIdx + 1} / {GRAMMAR_GRADUATION_QUIZ.length}</span>
                  </div>
                  <span className="text-secondary font-bold">Điểm: {score}</span>
                </div>

                <div className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-1 rounded-full w-fit">
                  📌 {GRAMMAR_GRADUATION_QUIZ[quizIdx].chapterSource}
                </div>

                {/* Question */}
                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-on-surface leading-relaxed">
                    {GRAMMAR_GRADUATION_QUIZ[quizIdx].question}
                  </h3>
                  {GRAMMAR_GRADUATION_QUIZ[quizIdx].audioText && (
                    <button
                      onClick={() => speakJapanese(GRAMMAR_GRADUATION_QUIZ[quizIdx].audioText!)}
                      className="px-3 py-1.5 rounded-xl bg-secondary/10 text-secondary text-xs font-bold hover:bg-secondary/20 cursor-pointer flex items-center gap-1.5 transition-colors"
                    >
                      <Volume2 size={14} /> Nghe phát âm
                    </button>
                  )}
                </div>

                {/* Options */}
                <div className="space-y-2.5">
                  {GRAMMAR_GRADUATION_QUIZ[quizIdx].options.map((opt, idx) => {
                    let btnStyle = 'bg-surface-container-low border-outline-variant/30 hover:border-primary/50 text-on-surface';
                    if (isAnswered) {
                      if (idx === GRAMMAR_GRADUATION_QUIZ[quizIdx].correctIndex) {
                        btnStyle = 'bg-secondary/15 border-secondary text-secondary font-bold';
                      } else if (idx === selectedOption) {
                        btnStyle = 'bg-crimson-500/15 border-crimson-500 text-crimson-600 font-bold';
                      }
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => handleAnswerSelect(idx)}
                        disabled={isAnswered}
                        className={`w-full p-4 rounded-2xl border text-left text-sm transition-all cursor-pointer flex items-center justify-between ${btnStyle}`}
                      >
                        <span>{opt}</span>
                        {isAnswered && idx === GRAMMAR_GRADUATION_QUIZ[quizIdx].correctIndex && <Check size={18} className="text-secondary" />}
                      </button>
                    );
                  })}
                </div>

                {/* Explanation */}
                {isAnswered && (
                  <div className="p-4 rounded-2xl bg-surface-container border border-outline-variant/30 text-xs text-on-surface space-y-1">
                    <div className="font-bold text-primary">💡 Giải thích:</div>
                    <p>{GRAMMAR_GRADUATION_QUIZ[quizIdx].explanation}</p>
                  </div>
                )}

                {/* Next button */}
                {isAnswered && (
                  <button
                    onClick={handleNextQuestion}
                    className="w-full py-3 rounded-2xl bg-primary text-on-primary font-bold text-sm cursor-pointer hover:bg-primary-container transition-colors flex items-center justify-center gap-2"
                  >
                    <span>{quizIdx + 1 < GRAMMAR_GRADUATION_QUIZ.length ? 'Câu Tiếp Theo' : 'Xem Kết Quả Tốt Nghiệp'}</span>
                    <ArrowRight size={16} />
                  </button>
                )}
              </div>
            ) : (
              /* Quiz Result Screen */
              <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-3xl p-8 text-center space-y-6 shadow-sm">
                <div className="w-20 h-20 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto text-4xl">
                  {Math.round((score / GRAMMAR_GRADUATION_QUIZ.length) * 100) >= 60 ? '🎓' : '💪'}
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-on-surface">Kết Quả Thi Tốt Nghiệp Nhập Môn</h2>
                  <div className="text-4xl font-extrabold text-primary my-2">
                    {Math.round((score / GRAMMAR_GRADUATION_QUIZ.length) * 100)}%
                  </div>
                  <p className="text-sm text-on-surface-variant">
                    Trả lời đúng {score} / {GRAMMAR_GRADUATION_QUIZ.length} câu
                  </p>
                </div>

                {Math.round((score / GRAMMAR_GRADUATION_QUIZ.length) * 100) >= 60 ? (
                  <div className="p-4 rounded-2xl bg-secondary/10 text-secondary text-sm font-bold space-y-2">
                    <div>🎉 CHÚC MỪNG BẠN ĐÃ TỐT NGHIỆP XUẤT SẮC KHÓA NHẬP MÔN!</div>
                    <p className="text-xs font-normal">Bạn đã nắm vững toàn bộ Bảng chữ cái, Số đếm, Thời gian, Aisatsu, 35+ Bộ thủ và Cấu trúc ngữ pháp N5!</p>
                  </div>
                ) : (
                  <div className="p-4 rounded-2xl bg-crimson-500/10 text-crimson-600 text-sm font-semibold">
                    ⚠️ Bạn cần đạt tối thiểu 60% để tốt nghiệp. Ôn lại kiến thức các chương chưa đúng và thử lại nhé!
                  </div>
                )}

                {/* Wrong Questions Review Links */}
                {wrongQuestions.length > 0 && (
                  <div className="text-left space-y-3 pt-4 border-t border-outline-variant/20">
                    <h3 className="text-xs font-bold text-on-surface uppercase tracking-wider flex items-center gap-1.5">
                      <AlertTriangle size={14} className="text-tertiary" />
                      <span>Gợi ý phần cần ôn lại:</span>
                    </h3>
                    <div className="space-y-2">
                      {wrongQuestions.map((wq, i) => (
                        <div key={i} className="p-3 rounded-xl bg-surface-container text-xs flex items-center justify-between gap-2">
                          <div>
                            <span className="text-[10px] font-bold text-primary block">{wq.chapterSource}</span>
                            <span className="text-on-surface font-medium line-clamp-1">{wq.question}</span>
                          </div>
                          <button
                            onClick={() => setActiveTab(wq.targetTab)}
                            className="px-2.5 py-1 rounded-lg bg-primary/10 text-primary font-bold hover:bg-primary/20 flex-shrink-0 cursor-pointer text-xs"
                          >
                            Ôn lại →
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={handleRestartQuiz}
                    className="flex-1 py-3 rounded-2xl bg-surface-container border border-outline-variant/40 text-on-surface font-bold text-sm cursor-pointer hover:bg-surface-container-high flex items-center justify-center gap-2"
                  >
                    <RotateCcw size={16} /> Làm Lại Bài Thi
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Graduation Modal */}
      {showGraduationModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-surface-container-lowest border border-outline-variant/30 rounded-3xl p-8 max-w-md w-full text-center space-y-6 shadow-2xl relative overflow-hidden">
            <div className="text-6xl animate-bounce">🎓</div>
            <div>
              <div className="text-xs font-bold text-primary uppercase tracking-widest">BẰNG CHỨNG NHẬN</div>
              <h3 className="text-2xl font-extrabold text-on-surface mt-1">TỐT NGHIỆP NHẬP MÔN</h3>
              <p className="text-xs text-on-surface-variant mt-2">
                Học viện NipponMaster xác nhận bạn đã hoàn thành xuất sắc toàn bộ 5 Chương Lộ Trình Nhập Môn Tiếng Nhật từ Con Số 0!
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-primary/10 border border-primary/20 text-xs font-bold text-primary">
              🏆 Đủ điều kiện tự tin bước vào Lộ Trình JLPT N5 Chính Thức!
            </div>

            <button
              onClick={downloadCertificate}
              className="w-full py-3 rounded-2xl bg-secondary text-on-secondary font-bold text-sm cursor-pointer hover:bg-secondary/80 transition-colors shadow-md flex items-center justify-center gap-2"
            >
              <Download size={16} /> Tải Bằng Chứng Nhận (.PNG)
            </button>

            <button
              onClick={() => setShowGraduationModal(false)}
              className="w-full py-3.5 rounded-2xl bg-primary text-on-primary font-bold text-sm cursor-pointer hover:bg-primary-container transition-colors shadow-md"
            >
              Nhận Bằng & Tiếp Tục Lộ Trình N5 →
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
}
