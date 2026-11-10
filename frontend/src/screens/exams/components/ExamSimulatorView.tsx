import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AlertTriangle, ArrowLeft, CheckCircle2, Clock, RotateCcw, X } from 'lucide-react';
import type { ExamAttemptSummary, JLPTExamPaper, JLPTExamSection } from '../types';
import type { ExamStartConfig } from './ExamDetailView';
import { ExamPassageCard } from './ExamPassageCard';
import { ExamQuestionCard } from './ExamQuestionCard';

interface ExamSimulatorViewProps {
  exam: JLPTExamPaper;
  startConfig: ExamStartConfig;
  initialAnswers?: Record<string, number>;
  isReviewMode?: boolean;
  onExit: () => void;
  onSaveAttempt: (summary: ExamAttemptSummary) => void;
}

function scrollToSimulatorTop() {
  const mainEl = document.querySelector('main');
  if (mainEl) {
    mainEl.scrollTo({ top: 0, behavior: 'smooth' });
  }
  if (typeof window !== 'undefined') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.documentElement.scrollTo({ top: 0, behavior: 'smooth' });
    document.body.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

export const ExamSimulatorView: React.FC<ExamSimulatorViewProps> = ({
  exam,
  startConfig,
  initialAnswers = {},
  isReviewMode = false,
  onExit,
  onSaveAttempt,
}) => {
  const sectionTopRef = useRef<HTMLDivElement>(null);

  const activeSections = useMemo(() => {
    const filtered = exam.sections.filter((sec) =>
      startConfig.selectedSectionIds.includes(sec.id)
    );
    return filtered.length > 0 ? filtered : exam.sections;
  }, [exam.sections, startConfig.selectedSectionIds]);

  const [activeSectionId, setActiveSectionId] = useState<'vocab' | 'grammar_reading' | 'listening'>(
    () => activeSections[0]?.id || 'vocab'
  );
  const [answers, setAnswers] = useState<Record<string, number>>(initialAnswers);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(isReviewMode);
  const [showIncompleteModal, setShowIncompleteModal] = useState<boolean>(false);
  const [showConfirmSubmitModal, setShowConfirmSubmitModal] = useState<boolean>(false);

  const isUnlimitedTime = startConfig.durationMinutes === null;
  const initialSeconds = (startConfig.durationMinutes ?? exam.totalMinutes) * 60;
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);

  // Auto scroll to top when changing section tab
  const handleSwitchSection = (secId: 'vocab' | 'grammar_reading' | 'listening') => {
    setActiveSectionId(secId);
    setTimeout(() => {
      scrollToSimulatorTop();
      sectionTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 20);
  };

  useEffect(() => {
    scrollToSimulatorTop();
    sectionTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [activeSectionId]);

  useEffect(() => {
    if (isSubmitted || isUnlimitedTime || isReviewMode) return;
    const timer = window.setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          window.clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [isSubmitted, isUnlimitedTime, isReviewMode]);

  useEffect(() => {
    if (showIncompleteModal || showConfirmSubmitModal) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prevOverflow;
      };
    }
  }, [showIncompleteModal, showConfirmSubmitModal]);

  const activeSection: JLPTExamSection | undefined = useMemo(() => {
    return activeSections.find((s) => s.id === activeSectionId) || activeSections[0];
  }, [activeSections, activeSectionId]);

  const allQuestions = useMemo(
    () => activeSections.flatMap((s) => s.questions || []),
    [activeSections]
  );

  const answeredCount = useMemo(
    () => allQuestions.filter((q) => answers[q.id] !== undefined).length,
    [allQuestions, answers]
  );

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    if (isSubmitted && !isReviewMode) return;
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  // Standard JLPT Scoring (Thang điểm 180 Japan Foundation)
  const scoreReport = useMemo(() => {
    const calcSection = (secId: 'vocab' | 'grammar_reading' | 'listening') => {
      const sec = exam.sections.find((s) => s.id === secId);
      if (!sec) return { correct: 0, total: 0, rawScore: 0, scaled: 0 };
      const qList = sec.questions;
      let correct = 0;
      let rawPoints = 0;
      let maxPoints = 0;
      for (const q of qList) {
        maxPoints += q.pointWeight || 1;
        if (answers[q.id] === q.correctAnswer) {
          correct++;
          rawPoints += q.pointWeight || 1;
        }
      }
      const scaled = maxPoints > 0 ? Math.round((rawPoints / maxPoints) * sec.maxScore) : 0;
      return { correct, total: qList.length, rawScore: rawPoints, scaled };
    };

    const vocabRes = calcSection('vocab');
    const grammarReadingRes = calcSection('grammar_reading');
    const listeningRes = calcSection('listening');

    const totalScore = vocabRes.scaled + grammarReadingRes.scaled + listeningRes.scaled;
    const totalCorrect = vocabRes.correct + grammarReadingRes.correct + listeningRes.correct;

    const languageKnowledgeReadingTotal = vocabRes.scaled + grammarReadingRes.scaled;
    const isLanguageReadingPass = languageKnowledgeReadingTotal >= (exam.minLanguageReadingScore || 38);
    const isListeningPass = listeningRes.scaled >= (exam.minListeningScore || 19);
    const isTotalScorePass = totalScore >= (exam.passScore || 80);

    const passed = isLanguageReadingPass && isListeningPass && isTotalScorePass;

    return {
      vocab: vocabRes,
      grammarReading: grammarReadingRes,
      listening: listeningRes,
      languageKnowledgeReadingTotal,
      totalScore,
      totalCorrect,
      passed,
      isLanguageReadingPass,
      isListeningPass,
      isTotalScorePass,
    };
  }, [exam, answers]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const unansweredQuestions = useMemo(() => {
    return allQuestions.filter((q) => answers[q.id] === undefined);
  }, [allQuestions, answers]);

  const handleSubmitExam = () => {
    if (unansweredQuestions.length > 0) {
      setShowIncompleteModal(true);
      return;
    }
    setShowConfirmSubmitModal(true);
  };

  const handleForceSubmit = () => {
    if (isSubmitted) return;
    setShowIncompleteModal(false);
    setShowConfirmSubmitModal(false);
    setIsSubmitted(true);
    const summary: ExamAttemptSummary = {
      examId: exam.id,
      completedAt: new Date().toISOString(),
      vocabScore: scoreReport.vocab.scaled,
      grammarReadingScore: scoreReport.grammarReading.scaled,
      listeningScore: scoreReport.listening.scaled,
      totalScore: scoreReport.totalScore,
      passed: scoreReport.passed,
      correctCount: scoreReport.totalCorrect,
      totalQuestions: allQuestions.length,
      userAnswers: answers,
    };
    onSaveAttempt(summary);
    scrollToSimulatorTop();
  };

  const handleJumpToMissingQuestion = (
    secId: 'vocab' | 'grammar_reading' | 'listening',
    qId: string
  ) => {
    setShowIncompleteModal(false);
    if (activeSectionId !== secId) {
      setActiveSectionId(secId);
    }
    setTimeout(() => {
      scrollToQuestion(qId);
    }, 120);
  };

  const handleResetExam = () => {
    setAnswers({});
    setIsSubmitted(false);
    setShowIncompleteModal(false);
    setShowConfirmSubmitModal(false);
    setSecondsLeft(initialSeconds);
    scrollToSimulatorTop();
  };

  const scrollToQuestion = (qId: string) => {
    const el = document.getElementById(`exam-q-${qId}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  if (!activeSection || activeSections.length === 0 || allQuestions.length === 0) {
    return (
      <div className="py-16 px-4 text-center border border-dashed border-outline-variant/40 rounded-2xl bg-surface-container-lowest max-w-xl mx-auto space-y-4 my-8">
        <div className="w-14 h-14 rounded-full bg-amber-500/15 text-amber-600 flex items-center justify-center mx-auto">
          <AlertTriangle size={28} />
        </div>
        <div className="space-y-1">
          <h3 className="text-base font-bold text-on-surface">
            Đề thi chưa có câu hỏi tương tác
          </h3>
          <p className="text-xs text-on-surface-variant leading-relaxed">
            Dữ liệu câu hỏi tương tác cho đề thi <strong>{exam.title}</strong> hiện đang được số hóa. 
            Bạn hãy chọn các đề có huy hiệu <strong>✨ Sẵn sàng làm bài</strong> (ví dụ: Đề thi N2 Kỳ tháng 12/2019) để bắt đầu thi thử trực tuyến.
          </p>
        </div>
        <button
          type="button"
          onClick={onExit}
          className="px-5 py-2.5 rounded-lg bg-primary text-on-primary text-xs font-bold uppercase tracking-wider hover:opacity-95 transition-all cursor-pointer shadow-xs"
        >
          Quay lại danh sách đề thi
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-5 pb-12">
      {/* Top Sticky Exam Control Bar */}
      <div className="sticky top-0 z-30 rounded-xl bg-surface-container-lowest/95 backdrop-blur-md border border-outline-variant/35 shadow-sm p-3.5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => {
                if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
                  window.speechSynthesis.cancel();
                }
                onExit();
              }}
              className="p-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface transition-colors cursor-pointer"
              title="Quay lại chi tiết đề thi"
            >
              <ArrowLeft size={18} />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-primary text-on-primary font-bold text-xs">
                  {exam.level}
                </span>
                <h2 className="font-headline font-bold text-sm sm:text-base text-on-surface">
                  {exam.title} {isReviewMode && '(Xem lại bài làm)'}
                </h2>
              </div>
              <p className="text-xs text-on-surface-variant">
                Đã làm: <strong className="text-primary">{answeredCount}</strong> / {allQuestions.length} câu
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div
              className={`px-3 py-1.5 rounded-lg border flex items-center gap-1.5 font-mono font-bold text-xs ${
                !isUnlimitedTime && secondsLeft < 300 && !isSubmitted
                  ? 'bg-error/15 border-error text-error animate-pulse'
                  : 'bg-surface-container-low border-outline-variant/25 text-on-surface'
              }`}
            >
              <Clock size={15} className="text-primary" />
              <span>
                {isReviewMode
                  ? 'XEM LẠI BÀI'
                  : isSubmitted
                    ? 'ĐÃ NỘP BÀI'
                    : isUnlimitedTime
                      ? 'Không giới hạn'
                      : formatTime(secondsLeft)}
              </span>
            </div>

            {!isSubmitted ? (
              <button
                type="button"
                onClick={handleSubmitExam}
                className="px-4 py-2 rounded-lg bg-primary text-on-primary font-bold text-xs uppercase tracking-wider shadow-xs hover:opacity-95 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <CheckCircle2 size={15} />
                Nộp bài & Chấm điểm
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
                      window.speechSynthesis.cancel();
                    }
                    onExit();
                  }}
                  className="px-3.5 py-2 rounded-lg bg-primary text-on-primary font-bold text-xs uppercase tracking-wider hover:opacity-90 transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
                  title="Quay lại trang chi tiết đề thi"
                >
                  <ArrowLeft size={14} />
                  Về trang chi tiết
                </button>

                {!isReviewMode && (
                  <button
                    type="button"
                    onClick={handleResetExam}
                    className="px-3.5 py-2 rounded-lg bg-surface-container-high text-on-surface font-bold text-xs uppercase tracking-wider hover:bg-surface-container-highest transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <RotateCcw size={14} />
                    Làm lại
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Section Switcher Tabs: Auto-scrolls to top when clicked */}
        {activeSections.length > 1 && (
          <div className="mt-3 pt-2.5 border-t border-outline-variant/20 grid grid-cols-1 sm:grid-cols-3 gap-2">
            {activeSections.map((sec) => {
              const isActive = sec.id === activeSectionId;
              const secAnswered = sec.questions.filter((q) => answers[q.id] !== undefined).length;
              return (
                <button
                  key={sec.id}
                  type="button"
                  onClick={() => handleSwitchSection(sec.id)}
                  className={`px-3.5 py-2 rounded-lg border text-left transition-all flex items-center justify-between gap-2 cursor-pointer ${
                    isActive
                      ? 'bg-primary text-on-primary border-primary shadow-2xs'
                      : 'bg-surface-container-low hover:bg-surface-container border-outline-variant/20 text-on-surface'
                  }`}
                >
                  <div className="min-w-0">
                    <div className="text-xs font-bold truncate">{sec.shortTitleVi}</div>
                    <div
                      className={`text-[11px] font-japanese truncate ${
                        isActive ? 'text-on-primary/85' : 'text-on-surface-variant'
                      }`}
                    >
                      {sec.titleJp}
                    </div>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-bold shrink-0 ${
                      isActive
                        ? 'bg-white/20 text-on-primary'
                        : 'bg-surface-container-high text-on-surface-variant'
                    }`}
                  >
                    {secAnswered}/{sec.questions.length}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Top Anchor for Smooth Section Scrolling */}
      <div ref={sectionTopRef} id="exam-section-top-anchor" className="scroll-mt-32" />

      {/* Scorecard Banner (When Submitted or Review Mode) */}
      {isSubmitted && (
        <div className="rounded-xl border border-primary/35 bg-surface-container-lowest p-5 shadow-sm space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div
                className={`w-14 h-14 rounded-xl flex flex-col items-center justify-center font-headline font-bold ${
                  scoreReport.passed
                    ? 'bg-secondary text-on-secondary'
                    : 'bg-error text-on-error'
                }`}
              >
                <span className="text-[10px] uppercase tracking-widest">JLPT</span>
                <span className="text-base">{scoreReport.passed ? '合格' : '不合格'}</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-headline font-bold text-on-surface">
                    Kết quả chấm điểm: {scoreReport.totalScore} / {exam.totalMaxScore} điểm
                  </h3>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase ${
                      scoreReport.passed
                        ? 'bg-secondary/15 text-secondary border border-secondary/30'
                        : 'bg-error/15 text-error border border-error/30'
                    }`}
                  >
                    {scoreReport.passed ? 'ĐẠT (PASSED)' : 'CHƯA ĐẠT'}
                  </span>
                </div>
                <p className="text-xs text-on-surface-variant mt-0.5">
                  Đúng: <strong>{scoreReport.totalCorrect}</strong>/{allQuestions.length} câu • Điểm chuẩn đỗ {exam.level}: ≥ {exam.passScore}/180
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onExit}
                className="px-4 py-2.5 rounded-lg bg-primary text-on-primary font-bold text-xs hover:opacity-95 transition-all flex items-center gap-2 cursor-pointer shadow-xs"
              >
                <ArrowLeft size={15} />
                Quay lại trang chi tiết đề thi
              </button>
            </div>
          </div>

          {/* Official JLPT Scoring Groups Breakdown (Chuẩn Phase 4 & Japan Foundation) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-3 border-t border-outline-variant/20 text-xs">
            {/* Group 1: Language Knowledge & Reading (120 points) */}
            <div className={`p-3.5 rounded-xl border space-y-2 ${
              scoreReport.isLanguageReadingPass
                ? 'bg-surface-container-low border-outline-variant/25'
                : 'bg-error/10 border-error/30'
            }`}>
              <div className="flex items-center justify-between">
                <span className="font-bold text-on-surface">
                  1. Kiến thức ngôn ngữ & Đọc hiểu (言語知識・読解):
                </span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                  scoreReport.isLanguageReadingPass
                    ? 'bg-secondary/15 text-secondary'
                    : 'bg-error text-on-error'
                }`}>
                  {scoreReport.isLanguageReadingPass ? 'Đạt chuẩn' : 'Bị điểm liệt'}
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <strong className="text-base text-primary font-headline">
                  {scoreReport.languageKnowledgeReadingTotal} / 120 điểm
                </strong>
                <span className="text-[11px] text-on-surface-variant font-mono">
                  (Điểm liệt: ≥ 38/120)
                </span>
              </div>
              <div className="text-[11px] text-on-surface-variant border-t border-outline-variant/15 pt-1.5 flex justify-between">
                <span>Từ vựng: {scoreReport.vocab.scaled}/60 ({scoreReport.vocab.correct}/{scoreReport.vocab.total} câu)</span>
                <span>Ngữ pháp & Đọc: {scoreReport.grammarReading.scaled}/60 ({scoreReport.grammarReading.correct}/{scoreReport.grammarReading.total} câu)</span>
              </div>
            </div>

            {/* Group 2: Listening (60 points) */}
            <div className={`p-3.5 rounded-xl border space-y-2 ${
              scoreReport.isListeningPass
                ? 'bg-surface-container-low border-outline-variant/25'
                : 'bg-error/10 border-error/30'
            }`}>
              <div className="flex items-center justify-between">
                <span className="font-bold text-on-surface">
                  2. Nghe hiểu (聴解):
                </span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                  scoreReport.isListeningPass
                    ? 'bg-secondary/15 text-secondary'
                    : 'bg-error text-on-error'
                }`}>
                  {scoreReport.isListeningPass ? 'Đạt chuẩn' : 'Bị điểm liệt'}
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <strong className="text-base text-primary font-headline">
                  {scoreReport.listening.scaled} / 60 điểm
                </strong>
                <span className="text-[11px] text-on-surface-variant font-mono">
                  (Điểm liệt: ≥ 19/60)
                </span>
              </div>
              <div className="text-[11px] text-on-surface-variant border-t border-outline-variant/15 pt-1.5">
                Đúng {scoreReport.listening.correct}/{scoreReport.listening.total} câu hội thoại
              </div>
            </div>
          </div>

          {/* Failure diagnosis callout if not passed */}
          {!scoreReport.passed && (
            <div className="p-3 rounded-lg bg-error/10 border border-error/25 text-xs text-error space-y-1">
              <strong className="block font-bold">Lý do chưa đạt (不合格):</strong>
              <ul className="list-disc list-inside space-y-0.5 text-[11px]">
                {!scoreReport.isTotalScorePass && (
                  <li>Tổng điểm đạt {scoreReport.totalScore}/180 điểm (Yêu cầu điểm chuẩn đỗ ≥ {exam.passScore}/180).</li>
                )}
                {!scoreReport.isLanguageReadingPass && (
                  <li>Bị điểm liệt phần Kiến thức ngôn ngữ & Đọc hiểu: {scoreReport.languageKnowledgeReadingTotal}/120 điểm (Yêu cầu tối thiểu ≥ 38/120).</li>
                )}
                {!scoreReport.isListeningPass && (
                  <li>Bị điểm liệt phần Nghe hiểu: {scoreReport.listening.scaled}/60 điểm (Yêu cầu tối thiểu ≥ 19/60).</li>
                )}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Main Two-Column Exam Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        <div className="lg:col-span-8 xl:col-span-9 space-y-6">
          {activeSection.mondaiGroups.map((mondai) => {
            const mondaiQuestions = activeSection.questions.filter(
              (q) => q.mondaiNumber === mondai.mondaiNumber
            );

            // Passages inside this Mondai (e.g. Cloze passage or Reading passage)
            const passages = mondai.passages || [];

            // Questions that belong to a passage
            const handledQuestionIds = new Set<string>();

            return (
              <div key={mondai.mondaiNumber} className="space-y-4">
                {/* Mondai Header */}
                <div className="rounded-lg bg-surface-container border-l-4 border-primary p-3.5">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-headline font-bold text-sm text-primary">
                      {mondai.titleVi}
                    </h3>
                    <span className="text-xs font-japanese font-bold text-on-surface-variant">
                      {mondai.titleJp}
                    </span>
                  </div>
                  <p className="font-japanese text-xs sm:text-sm text-on-surface mt-1">
                    {mondai.instructionJp}
                  </p>
                </div>

                {/* 1. Passages with their grouped sub-questions rendered continuously */}
                {passages.map((passage) => {
                  const subQuestions = mondaiQuestions.filter((q) =>
                    passage.questionIds.includes(q.id)
                  );
                  subQuestions.forEach((q) => handledQuestionIds.add(q.id));

                  return (
                    <ExamPassageCard
                      key={passage.id}
                      passage={passage}
                      questions={subQuestions}
                      answers={answers}
                      isSubmitted={isSubmitted}
                      onSelectOption={handleSelectOption}
                    />
                  );
                })}

                {/* 2. Standalone questions in this Mondai (e.g. Kanji readings, vocab, star questions, listening) */}
                {mondaiQuestions
                  .filter((q) => !handledQuestionIds.has(q.id))
                  .map((q) => (
                    <div key={q.id} id={`exam-q-${q.id}`}>
                      <ExamQuestionCard
                        question={q}
                        selectedOption={answers[q.id]}
                        isSubmitted={isSubmitted}
                        onSelectOption={(optIdx) => handleSelectOption(q.id, optIdx)}
                      />
                    </div>
                  ))}
              </div>
            );
          })}
        </div>

        {/* Right Sticky Question Navigator */}
        <div className="lg:col-span-4 xl:col-span-3 sticky top-20 space-y-4">
          <div className="rounded-xl border border-outline-variant/30 bg-surface-container-lowest p-4 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-headline font-bold text-xs text-on-surface uppercase tracking-wider">
                Bảng câu hỏi ({activeSection.shortTitleVi})
              </span>
              <span className="text-xs font-mono font-bold text-primary">
                {activeSection.questions.filter((q) => answers[q.id] !== undefined).length} /{' '}
                {activeSection.questions.length}
              </span>
            </div>

            <div className="grid grid-cols-5 gap-1.5 max-h-[calc(100vh-220px)] overflow-y-auto no-scrollbar pr-0.5">
              {activeSection.questions.map((q, idx) => {
                const isAnswered = answers[q.id] !== undefined;
                const isCorrect = isSubmitted && answers[q.id] === q.correctAnswer;
                const isWrong = isSubmitted && isAnswered && answers[q.id] !== q.correctAnswer;

                let colorClasses =
                  'bg-surface-container hover:bg-surface-container-high text-on-surface border-outline-variant/30';
                if (isSubmitted) {
                  if (isCorrect) colorClasses = 'bg-secondary text-on-secondary border-secondary font-bold';
                  else if (isWrong) colorClasses = 'bg-error text-on-error border-error font-bold';
                  else colorClasses = 'bg-surface-container text-on-surface-variant border-outline-variant/30';
                } else if (isAnswered) {
                  colorClasses = 'bg-primary text-on-primary border-primary font-bold shadow-2xs';
                }

                return (
                  <button
                    key={q.id}
                    type="button"
                    onClick={() => scrollToQuestion(q.id)}
                    className={`h-8 rounded text-xs border font-mono transition-all flex items-center justify-center cursor-pointer ${colorClasses}`}
                    title={`Câu ${idx + 1}`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            <div className="pt-2 border-t border-outline-variant/20 flex items-center justify-between text-[11px] text-on-surface-variant">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded bg-primary inline-block" /> Đã chọn
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded bg-surface-container border border-outline-variant/40 inline-block" /> Chưa làm
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Pop-up cảnh báo sót câu hỏi chưa làm (teleported to body to prevent clipping) */}
      {showIncompleteModal && typeof document !== 'undefined' && createPortal(
        <div className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-surface-container-lowest border border-outline-variant/35 rounded-2xl max-w-lg w-full shadow-2xl p-6 overflow-hidden flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-150 relative">
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-3 pb-3 border-b border-outline-variant/20">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center shrink-0">
                  <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <h3 className="font-headline font-bold text-base sm:text-lg text-on-surface">
                    Chưa hoàn thành toàn bộ bài thi!
                  </h3>
                  <p className="text-xs text-on-surface-variant">
                    Bạn còn câu hỏi chưa chọn đáp án, nộp ngay có thể bị mất điểm.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowIncompleteModal(false)}
                className="p-1 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Statistics Banner */}
            <div className="mt-4 p-3 rounded-xl bg-amber-500/10 border border-amber-500/25 flex items-center justify-between text-xs">
              <span className="text-on-surface">
                Đã làm: <strong className="text-primary font-bold">{answeredCount}</strong> / {allQuestions.length} câu
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-error/15 text-error font-bold text-xs">
                Còn thiếu {unansweredQuestions.length} câu
              </span>
            </div>

            {/* List of missed questions grouped by Section */}
            <div className="my-4 overflow-y-auto pr-1 space-y-3 max-h-[40vh] no-scrollbar">
              <span className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider block">
                Danh sách các câu chưa làm (bấm vào câu để làm ngay):
              </span>
              {activeSections.map((sec) => {
                const missingInSec = sec.questions.filter((q) => answers[q.id] === undefined);
                if (missingInSec.length === 0) return null;
                return (
                  <div
                    key={sec.id}
                    className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/20 space-y-2"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-on-surface">
                        {sec.shortTitleVi} ({sec.titleJp})
                      </span>
                      <span className="text-[11px] font-semibold text-error">
                        Thiếu {missingInSec.length} câu
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-0.5">
                      {missingInSec.map((q) => (
                        <button
                          key={q.id}
                          type="button"
                          onClick={() => handleJumpToMissingQuestion(sec.id, q.id)}
                          className="px-2.5 py-1 rounded-md bg-surface-container-lowest border border-error/35 text-error hover:bg-error hover:text-white text-xs font-bold transition-all cursor-pointer shadow-2xs"
                          title={`Bấm để chuyển ngay đến câu ${q.number}`}
                        >
                          Câu {q.number}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Modal Actions */}
            <div className="pt-3 border-t border-outline-variant/20 flex items-center justify-end">
              <button
                type="button"
                onClick={() => setShowIncompleteModal(false)}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-primary text-on-primary font-bold text-xs shadow-xs hover:opacity-95 transition-all cursor-pointer text-center"
              >
                Tiếp tục làm bài
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* Pop-up xác nhận khi đã làm đủ 100% câu hỏi (teleported to body) */}
      {showConfirmSubmitModal && typeof document !== 'undefined' && createPortal(
        <div className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-surface-container-lowest border border-outline-variant/35 rounded-2xl max-w-md w-full shadow-2xl p-6 overflow-hidden flex flex-col animate-in zoom-in-95 duration-150 relative">
            <div className="flex items-center gap-3 pb-3 border-b border-outline-variant/20">
              <div className="w-10 h-10 rounded-xl bg-secondary/15 border border-secondary/30 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <h3 className="font-headline font-bold text-base sm:text-lg text-on-surface">
                  Xác nhận nộp bài thi
                </h3>
                <p className="text-xs text-on-surface-variant">
                  Bạn đã hoàn thành 100% câu hỏi ({allQuestions.length}/{allQuestions.length} câu)
                </p>
              </div>
            </div>

            <p className="my-4 text-sm font-medium text-on-surface leading-relaxed">
              Bạn có chắc chắn muốn nộp bài và tiến hành xem kết quả không?
            </p>

            <div className="pt-3 border-t border-outline-variant/20 flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setShowConfirmSubmitModal(false)}
                className="px-4 py-2.5 rounded-xl border border-outline-variant/40 hover:bg-surface-container text-on-surface font-bold text-xs transition-colors cursor-pointer"
              >
                Kiểm tra lại
              </button>
              <button
                type="button"
                onClick={handleForceSubmit}
                className="px-5 py-2.5 rounded-xl bg-primary text-on-primary font-bold text-xs shadow-xs hover:opacity-95 transition-all cursor-pointer"
              >
                Xác nhận nộp bài
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};
