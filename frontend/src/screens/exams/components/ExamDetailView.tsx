import React, { useState } from 'react';
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  Clock,
  Eye,
  History,
  Lightbulb,
  MessageSquare,
  Users,
  XCircle,
} from 'lucide-react';
import { useAuthStore } from '../../../store/useAuthStore';
import type { ExamAttemptSummary, ExamComment, JLPTExamPaper } from '../types';
import { getAllCatalogExams } from '../data';
import {
  deleteExamComment,
  fetchExamAttempts,
  fetchExamComments,
  getExamLiveStats,
  getLocalExamAttempts,
  likeExamComment,
  replyExamComment,
  saveExamComment,
} from '../services/examService';
import { ExamDiscussionTab } from './ExamDiscussionTab';

export interface ExamStartConfig {
  selectedSectionIds: ('vocab' | 'grammar_reading' | 'listening')[];
  durationMinutes: number | null; // null = unlimited time
}

interface ExamDetailViewProps {
  exam: JLPTExamPaper;
  userId?: string | number;
  userLevel?: string;
  onBack: () => void;
  onStartSimulator: (config: ExamStartConfig) => void;
  onReviewAttempt: (attempt: ExamAttemptSummary) => void;
  onSelectExam?: (exam: JLPTExamPaper) => void;
}

const SECTION_SKILL_TAGS: Record<'vocab' | 'grammar_reading' | 'listening', string[]> = {
  vocab: [
    '#[Moji-Goi] Cách đọc Hán tự',
    '#[Moji-Goi] Cách viết Kanji',
    '#[Moji-Goi] Điền từ ngữ cảnh',
    '#[Moji-Goi] Câu đồng nghĩa',
  ],
  grammar_reading: [
    '#[Bunpou] Ngữ pháp câu',
    '#[Bunpou] Sắp xếp dấu sao ★',
    '#[Dokkai] Đọc hiểu đoạn văn',
    '#[Dokkai] Tìm thông tin tờ rơi',
  ],
  listening: [
    '#[Choukai] Nghe hiểu nhiệm vụ',
    '#[Choukai] Nghe điểm chính',
    '#[Choukai] Phát ngôn tranh mũi tên',
    '#[Choukai] Phản xạ nhanh',
  ],
};

const DEFAULT_SECTIONS_FALLBACK: {
  id: 'vocab' | 'grammar_reading' | 'listening';
  label: string;
  questionCount: number;
  durationMinutes: number;
}[] = [
  { id: 'vocab', label: 'Phần 1: Từ vựng & Hán tự (文字・語彙)', questionCount: 33, durationMinutes: 20 },
  { id: 'grammar_reading', label: 'Phần 2: Ngữ pháp & Đọc hiểu (文法・読解)', questionCount: 32, durationMinutes: 40 },
  { id: 'listening', label: 'Phần 3: Nghe hiểu (聴解)', questionCount: 24, durationMinutes: 30 },
];

export const ExamDetailView: React.FC<ExamDetailViewProps> = ({
  exam,
  userId,
  userLevel = 'N5',
  onBack,
  onStartSimulator,
  onReviewAttempt,
  onSelectExam,
}) => {
  const { user } = useAuthStore();
  const isTeacher = user?.role === 'TEACHER' || user?.role === 'ADMIN';
  const currentAuthorName = user?.fullName || user?.username || 'Học viên';
  const currentUserRole: 'teacher' | 'student' = isTeacher ? 'teacher' : 'student';

  const [activeTab, setActiveTab] = useState<'practice' | 'full_test' | 'history' | 'discussion'>('practice');
  const [checkedSections, setCheckedSections] = useState<
    Record<'vocab' | 'grammar_reading' | 'listening', boolean>
  >({
    vocab: false,
    grammar_reading: false,
    listening: false,
  });
  const [selectedTimeLimit, setSelectedTimeLimit] = useState<string>('');

  const hasInteractiveQuestions = Boolean(
    exam.hasInteractiveData &&
    exam.sections &&
    exam.sections.length > 0 &&
    exam.sections.some((s) => s.questions.length > 0)
  );

  const suggestedInteractiveExam = React.useMemo(() => {
    if (hasInteractiveQuestions) return null;
    const all = getAllCatalogExams();
    return (
      all.find(
        (p) =>
          p.level === exam.level &&
          p.id !== exam.id &&
          p.hasInteractiveData &&
          p.sections &&
          p.sections.length > 0
      ) || null
    );
  }, [exam.level, exam.id, hasInteractiveQuestions]);

  // Real-time live stats & comments
  const liveStats = getExamLiveStats(exam.id);
  const [comments, setComments] = useState<ExamComment[]>(() => {
    return fetchExamComments(exam.id);
  });

  // Real-time attempts history initialized synchronously with local data
  const [attempts, setAttempts] = useState<ExamAttemptSummary[]>(() => {
    return getLocalExamAttempts(exam.id);
  });

  React.useEffect(() => {
    fetchExamAttempts(exam.id, userId).then((list) => {
      setAttempts(list);
    });
  }, [exam.id, userId]);

  const latestAttempt = attempts[0];

  const toggleSection = (secId: 'vocab' | 'grammar_reading' | 'listening') => {
    setCheckedSections((prev) => ({
      ...prev,
      [secId]: !prev[secId],
    }));
  };

  const handleStartPractice = () => {
    const chosen = (['vocab', 'grammar_reading', 'listening'] as const).filter(
      (id) => checkedSections[id]
    );
    const finalSections: ('vocab' | 'grammar_reading' | 'listening')[] =
      chosen.length > 0 ? chosen : ['vocab', 'grammar_reading', 'listening'];
    const parsedMinutes = selectedTimeLimit ? parseInt(selectedTimeLimit, 10) : null;

    onStartSimulator({
      selectedSectionIds: finalSections,
      durationMinutes: parsedMinutes,
    });
  };

  const handleStartFullTest = () => {
    onStartSimulator({
      selectedSectionIds: ['vocab', 'grammar_reading', 'listening'],
      durationMinutes: exam.totalMinutes,
    });
  };

  const sectionsToRender =
    exam.sections && exam.sections.length > 0
      ? exam.sections.map((s, idx) => ({
          id: s.id,
          label: `Phần ${idx + 1}: ${s.shortTitleVi} (${s.titleJp})`,
          questionCount: s.questions.length,
          durationMinutes: s.durationMinutes,
        }))
      : DEFAULT_SECTIONS_FALLBACK;

  return (
    <div className="space-y-6 pb-16">
      {/* Back button */}
      <div>
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-bold text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
        >
          <ArrowLeft size={16} />
          <span>Quay lại danh sách đề thi</span>
        </button>
      </div>

      {/* Header Info */}
      <div className="rounded-xl border border-outline-variant/30 bg-surface-container-low p-6 space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full bg-primary/15 text-primary text-[11px] font-bold uppercase tracking-wider">
            {exam.level}
          </span>
          {exam.tags?.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant text-[11px] font-medium"
            >
              {tag}
            </span>
          ))}
        </div>

        <h1 className="font-headline font-bold text-xl sm:text-2xl text-on-surface tracking-tight">
          {exam.title}
        </h1>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-on-surface-variant font-mono">
          <span className="flex items-center gap-1.5">
            <Clock size={14} className="text-primary" />
            Thời gian: {exam.totalMinutes} phút
          </span>
          <span>•</span>
          <span>{exam.sectionCount || 3} phần thi</span>
          <span>•</span>
          <span>{exam.questionCount || 89} câu hỏi</span>
          <span>•</span>
          <span className="flex items-center gap-1.5">
            <Users size={14} className="text-secondary" />
            {liveStats.totalAttempts} lượt thi thực tế
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5">
            <MessageSquare size={14} className="text-primary" />
            {comments.length} bình luận
          </span>
        </div>

        {latestAttempt && (
          <div className="pt-2 border-t border-outline-variant/20 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-on-surface-variant">Kết quả gần nhất:</span>
              <strong className="text-primary text-sm font-headline">
                {latestAttempt.totalScore} / 180 điểm
              </strong>
              <span
                className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                  latestAttempt.passed
                    ? 'bg-secondary/15 text-secondary'
                    : 'bg-error/15 text-error'
                }`}
              >
                {latestAttempt.passed ? 'ĐÃ ĐẠT (合格)' : 'CHƯA ĐẠT (不合格)'}
              </span>
            </div>
            <button
              type="button"
              onClick={() => onReviewAttempt(latestAttempt)}
              className="text-primary hover:underline font-bold flex items-center gap-1 cursor-pointer"
            >
              <Eye size={13} />
              Xem lại bài làm lần cuối
            </button>
          </div>
        )}
      </div>

      {/* Tabs Header (Study4 style) */}
      <div className="border-b border-outline-variant/30 flex items-center gap-8">
        <button
          type="button"
          onClick={() => setActiveTab('practice')}
          className={`pb-3 font-headline font-bold text-sm transition-all cursor-pointer relative ${
            activeTab === 'practice'
              ? 'text-primary'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          Luyện tập
          {activeTab === 'practice' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
          )}
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('full_test')}
          className={`pb-3 font-headline font-bold text-sm transition-all cursor-pointer relative ${
            activeTab === 'full_test'
              ? 'text-primary'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          Làm full test
          {activeTab === 'full_test' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
          )}
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('history')}
          className={`pb-3 font-headline font-bold text-sm transition-all cursor-pointer relative flex items-center gap-1.5 ${
            activeTab === 'history'
              ? 'text-primary'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          <History size={15} />
          Lịch sử ({attempts.length})
          {activeTab === 'history' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
          )}
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('discussion')}
          className={`pb-3 font-headline font-bold text-sm transition-all cursor-pointer relative flex items-center gap-1.5 ${
            activeTab === 'discussion'
              ? 'text-primary'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          <MessageSquare size={15} />
          Thảo luận ({comments.length})
          {activeTab === 'discussion' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
          )}
        </button>
      </div>

      {/* Tabs Content */}
      <div>
        {/* TAB 1: LUYỆN TẬP */}
        {activeTab === 'practice' && (
          <div className="space-y-6">
            <div className="p-4 rounded-xl bg-secondary/10 border border-secondary/25 text-xs text-on-surface leading-relaxed flex items-start gap-2.5">
              <Lightbulb className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
              <div>
                <strong>Pro tips:</strong> Hình thức luyện tập từng phần và chọn mức thời gian phù hợp
                sẽ giúp bạn tập trung vào giải đúng các câu hỏi thay vì phải chịu áp lực hoàn thành cả bài thi.
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-headline font-bold text-sm text-on-surface">
                Chọn phần thi bạn muốn làm:
              </h3>

              <div className="space-y-3">
                {sectionsToRender.map((sec) => {
                  const isChecked = checkedSections[sec.id];
                  const tags = SECTION_SKILL_TAGS[sec.id] || [];

                  return (
                    <div
                      key={sec.id}
                      onClick={() => toggleSection(sec.id)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer ${
                        isChecked
                          ? 'border-primary bg-primary/5 shadow-2xs'
                          : 'border-outline-variant/30 bg-surface-container-lowest hover:border-outline-variant/60'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {}}
                          className="mt-0.5 w-4 h-4 rounded text-primary focus:ring-primary border-outline-variant"
                        />
                        <div className="space-y-2 flex-1">
                          <div className="font-bold text-sm text-on-surface">
                            {sec.label} ({sec.questionCount} câu hỏi)
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {tags.map((tag) => (
                              <span
                                key={tag}
                                className="px-2 py-0.5 rounded text-[11px] font-mono bg-surface-container-high text-on-surface-variant"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="space-y-2">
              <label className="font-headline font-bold text-sm text-on-surface block">
                Giới hạn thời gian (Để trống để làm bài không giới hạn):
              </label>
              <select
                value={selectedTimeLimit}
                onChange={(e) => setSelectedTimeLimit(e.target.value)}
                className="w-full sm:w-80 rounded-lg border border-outline-variant/40 bg-surface-container-lowest px-3 py-2 text-xs sm:text-sm text-on-surface focus:outline-none focus:border-primary"
              >
                <option value="">-- Chọn thời gian (Không giới hạn) --</option>
                <option value="15">15 phút</option>
                <option value="20">20 phút (Chuẩn phần Từ vựng N5)</option>
                <option value="30">30 phút (Chuẩn phần Nghe hiểu N5)</option>
                <option value="40">40 phút (Chuẩn phần Ngữ pháp N5)</option>
                <option value="60">60 phút</option>
                <option value="90">90 phút (Thời gian full đề)</option>
              </select>
            </div>

            {!hasInteractiveQuestions && (
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs space-y-2.5">
                <div className="flex items-center gap-2 font-bold text-sm text-amber-800 dark:text-amber-300">
                  <AlertCircle size={18} />
                  <span>Đề thi đang trong tiến trình số hóa câu hỏi tương tác</span>
                </div>
                <p className="leading-relaxed text-on-surface-variant">
                  Bộ đề <strong>{exam.title}</strong> hiện được lưu trữ dữ liệu đề gốc Japan Foundation ({exam.sourcePdfName || 'PDF'}). 
                  Các câu hỏi trắc nghiệm tương tác đang được hoàn thiện.
                </p>
                {suggestedInteractiveExam && onSelectExam && (
                  <div className="pt-1">
                    <button
                      type="button"
                      onClick={() => onSelectExam(suggestedInteractiveExam)}
                      className="px-4 py-2 rounded-lg bg-primary text-on-primary font-bold text-xs hover:opacity-95 transition-all cursor-pointer shadow-xs inline-flex items-center gap-1.5"
                    >
                      👉 Chuyển sang làm {suggestedInteractiveExam.title} (Có đề tương tác)
                    </button>
                  </div>
                )}
              </div>
            )}

            <div>
              <button
                type="button"
                onClick={handleStartPractice}
                disabled={!hasInteractiveQuestions}
                className={`px-6 py-2.5 rounded-lg font-headline font-bold text-xs uppercase tracking-wider transition-all shadow-xs ${
                  hasInteractiveQuestions
                    ? 'bg-primary text-on-primary hover:opacity-95 cursor-pointer'
                    : 'bg-surface-container text-on-surface-variant/50 cursor-not-allowed border border-outline-variant/30'
                }`}
              >
                {hasInteractiveQuestions ? 'Luyện tập ngay' : 'Đang cập nhật câu hỏi tương tác'}
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: LÀM FULL TEST */}
        {activeTab === 'full_test' && (
          <div className="rounded-xl border border-outline-variant/30 bg-surface-container-lowest p-6 space-y-4">
            <div className="space-y-1">
              <h3 className="font-headline font-bold text-base text-on-surface">
                Chế độ thi thử Full Test (Mô phỏng kỳ thi thật)
              </h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Bài thi bao gồm đầy đủ {exam.sectionCount || 3} phần thi ({exam.questionCount || 89} câu hỏi)
                với đồng hồ bấm giờ chuẩn {exam.totalMinutes} phút. Hệ thống sẽ tự động chấm điểm theo
                thang điểm 180 của Japan Foundation và đánh giá Đạt / Chưa đạt.
              </p>
            </div>

            {!hasInteractiveQuestions && (
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs space-y-2.5">
                <div className="flex items-center gap-2 font-bold text-sm text-amber-800 dark:text-amber-300">
                  <AlertCircle size={18} />
                  <span>Đề thi đang trong tiến trình số hóa câu hỏi tương tác</span>
                </div>
                <p className="leading-relaxed text-on-surface-variant">
                  Bộ đề <strong>{exam.title}</strong> hiện được lưu trữ dữ liệu đề gốc Japan Foundation ({exam.sourcePdfName || 'PDF'}). 
                  Các câu hỏi trắc nghiệm tương tác đang được ban biên tập hoàn thiện.
                </p>
                {suggestedInteractiveExam && onSelectExam && (
                  <div className="pt-1">
                    <button
                      type="button"
                      onClick={() => onSelectExam(suggestedInteractiveExam)}
                      className="px-4 py-2 rounded-lg bg-primary text-on-primary font-bold text-xs hover:opacity-95 transition-all cursor-pointer shadow-xs inline-flex items-center gap-1.5"
                    >
                      👉 Chuyển sang làm {suggestedInteractiveExam.title} (Có đề tương tác)
                    </button>
                  </div>
                )}
              </div>
            )}

            <div className="p-4 rounded-lg bg-surface-container-low border border-outline-variant/20 space-y-2 text-xs text-on-surface-variant">
              <div className="flex items-center justify-between">
                <span>Tổng thời gian làm bài:</span>
                <strong className="text-on-surface">{exam.totalMinutes} phút</strong>
              </div>
              <div className="flex items-center justify-between">
                <span>Tổng số câu hỏi:</span>
                <strong className="text-on-surface">{exam.questionCount || 89} câu</strong>
              </div>
              <div className="flex items-center justify-between">
                <span>Điểm đạt chuẩn:</span>
                <strong className="text-primary">{exam.passScore || 80} / 180 điểm</strong>
              </div>
              <div className="flex items-center justify-between">
                <span>Điểm liệt từng phần:</span>
                <span className="text-on-surface">Kiến thức/Đọc: 38 điểm • Nghe: 19 điểm</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={handleStartFullTest}
                disabled={!hasInteractiveQuestions}
                className={`px-6 py-2.5 rounded-lg font-headline font-bold text-xs uppercase tracking-wider transition-all shadow-xs ${
                  hasInteractiveQuestions
                    ? 'bg-primary text-on-primary hover:opacity-95 cursor-pointer'
                    : 'bg-surface-container text-on-surface-variant/50 cursor-not-allowed border border-outline-variant/30'
                }`}
              >
                {hasInteractiveQuestions
                  ? `Bắt đầu làm bài thi (${exam.totalMinutes} phút)`
                  : 'Đang cập nhật câu hỏi tương tác'}
              </button>
            </div>
          </div>
        )}

        {/* TAB 3: LỊCH SỬ THI */}
        {activeTab === 'history' && (
          <div className="space-y-4">
            {attempts.length === 0 ? (
              <div className="py-12 px-4 text-center border border-dashed border-outline-variant/40 rounded-xl bg-surface-container-lowest flex flex-col items-center justify-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant shadow-xs">
                  <AlertCircle className="w-6 h-6 text-primary" />
                </div>
                <div className="text-sm font-bold text-on-surface">
                  Chưa có lịch sử làm đề này
                </div>
                <p className="text-xs text-on-surface-variant max-w-md leading-relaxed">
                  Bạn chưa thực hiện lần thi nào cho đề này. Hãy bắt đầu luyện tập hoặc làm Full Test để lưu kết quả và xem lại phân tích chi tiết!
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {attempts.map((att, idx) => (
                  <div
                    key={att.completedAt + idx}
                    className="p-4 rounded-xl border border-outline-variant/30 bg-surface-container-lowest flex flex-wrap items-center justify-between gap-4 shadow-xs"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-on-surface">
                          Lần {attempts.length - idx}:
                        </span>
                        <span className="text-sm font-bold text-primary">
                          {att.totalScore} / 180 điểm
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded text-[11px] font-bold flex items-center gap-1 ${
                            att.passed ? 'bg-secondary/15 text-secondary' : 'bg-error/15 text-error'
                          }`}
                        >
                          {att.passed ? <CheckCircle2 size={12} /> : <XCircle size={12} />}
                          {att.passed ? 'ĐẠT' : 'CHƯA ĐẠT'}
                        </span>
                      </div>
                      <div className="text-xs text-on-surface-variant mt-1 space-y-0.5">
                        <div>
                          Ngày làm: {new Date(att.completedAt).toLocaleDateString('vi-VN')} • Đúng {att.correctCount}/{att.totalQuestions} câu
                        </div>
                        <div className="font-mono text-[11px] text-on-surface-variant">
                          • Kiến thức & Đọc hiểu: <strong>{att.vocabScore + att.grammarReadingScore} / 120</strong> (Từ vựng: {att.vocabScore} + Ngữ pháp: {att.grammarReadingScore} • Điểm liệt: ≥ 38)
                          <span className="mx-1.5">•</span>
                          • Nghe hiểu: <strong>{att.listeningScore} / 60</strong> (Điểm liệt: ≥ 19)
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => onReviewAttempt(att)}
                      className="px-3.5 py-1.5 rounded-lg border border-primary text-primary hover:bg-primary hover:text-on-primary font-bold text-xs transition-colors flex items-center gap-1.5 cursor-pointer shrink-0"
                    >
                      <Eye size={14} />
                      Xem lại bài làm
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 4: THẢO LUẬN (Rich Media Comments Matching Grammar Module) */}
        {activeTab === 'discussion' && (
          <ExamDiscussionTab
            examId={exam.id}
            comments={comments}
            currentUserId={user?.id || userId}
            currentAuthorName={currentAuthorName}
            currentUserLevel={userLevel}
            currentUserRole={currentUserRole}
            isTeacher={isTeacher}
            onPostComment={(newComment) => {
              const updated = saveExamComment(newComment);
              setComments(updated);
            }}
            onLikeComment={(commentId) => {
              const updated = likeExamComment(exam.id, commentId);
              setComments(updated);
            }}
            onReplyComment={(commentId, reply) => {
              const updated = replyExamComment(exam.id, commentId, reply);
              setComments(updated);
            }}
            onDeleteComment={(commentId, isReply, parentId) => {
              const updated = deleteExamComment(exam.id, commentId, isReply, parentId);
              setComments(updated);
            }}
          />
        )}
      </div>
    </div>
  );
};
