/**
 * ExamBuilderStudio.tsx — Trình Soạn Thảo Đề Thi JLPT & Bulk Question Import (Excel/JSON)
 * Dành cho Role TEACHER (Giảng viên).
 */
import { useState } from 'react';
import { 
  FileText, Upload, Plus, Trash2, CheckCircle2, 
  Download, ArrowLeft, Save, Sparkles, HelpCircle, ArrowUp, ArrowDown, Eye
} from 'lucide-react';
import { teacherApi, type ExamPayload, type ExamQuestionPayload } from '../api/teacherApi';

interface ExamBuilderStudioProps {
  onBack?: () => void;
  onSuccess?: () => void;
  initialExam?: ExamPayload;
}

export default function ExamBuilderStudio({ onBack, onSuccess, initialExam }: ExamBuilderStudioProps) {
  const [activeTab, setActiveTab] = useState<'manual' | 'bulk'>('manual');

  // Exam Meta State
  const [examId, setExamId] = useState<number | undefined>(initialExam?.id);
  const [title, setTitle] = useState(initialExam?.title || '');
  const [description, setDescription] = useState(initialExam?.description || '');
  const [jlptLevel, setJlptLevel] = useState<'N5' | 'N4' | 'N3' | 'N2' | 'N1'>(initialExam?.jlptLevel || 'N5');
  const [examType, setExamType] = useState<'VOCABULARY' | 'GRAMMAR' | 'READING' | 'LISTENING' | 'FULL'>(initialExam?.examType || 'FULL');
  const [durationMinutes, setDurationMinutes] = useState(initialExam?.durationMinutes || 60);
  const [totalScore, setTotalScore] = useState(initialExam?.totalScore || 100);
  const [isPublished, setIsPublished] = useState(initialExam?.isPublished || false);
  const [isShuffleQuestions, setIsShuffleQuestions] = useState(initialExam?.isShuffleQuestions || false);
  const [isShuffleOptions, setIsShuffleOptions] = useState(initialExam?.isShuffleOptions || false);

  // Questions List State
  const [questions, setQuestions] = useState<ExamQuestionPayload[]>(initialExam?.questions || []);
  const [activeQuestionIdx, setActiveQuestionIdx] = useState<number | null>(questions.length > 0 ? 0 : null);

  // Saving / Loading State
  const [saving, setSaving] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Bulk Import State
  const [rawInput, setRawInput] = useState('');
  const [parsedPreview, setParsedPreview] = useState<(ExamQuestionPayload & { isValid: boolean; errorMsg?: string })[]>([]);
  const [importFileName, setImportFileName] = useState('');

  // ════════════════════════════════════════════════
  // QUESTION MANAGEMENT (MANUAL)
  // ════════════════════════════════════════════════
  const handleAddQuestion = () => {
    const newQ: ExamQuestionPayload = {
      content: '',
      optionA: '',
      optionB: '',
      optionC: '',
      optionD: '',
      correctAnswer: 'A',
      explanation: '',
      score: 1,
      orderIndex: questions.length + 1,
    };
    setQuestions(prev => [...prev, newQ]);
    setActiveQuestionIdx(questions.length);
  };

  const handleUpdateQuestion = (idx: number, field: keyof ExamQuestionPayload, value: any) => {
    setQuestions(prev => {
      const copy = [...prev];
      copy[idx] = { ...copy[idx], [field]: value };
      return copy;
    });
  };

  const handleDeleteQuestion = (idx: number) => {
    setQuestions(prev => prev.filter((_, i) => i !== idx));
    if (activeQuestionIdx === idx) {
      setActiveQuestionIdx(questions.length > 1 ? 0 : null);
    } else if (activeQuestionIdx !== null && activeQuestionIdx > idx) {
      setActiveQuestionIdx(activeQuestionIdx - 1);
    }
  };

  const handleMoveQuestion = (idx: number, direction: 'up' | 'down') => {
    if (direction === 'up' && idx === 0) return;
    if (direction === 'down' && idx === questions.length - 1) return;
    const targetIdx = direction === 'up' ? idx - 1 : idx + 1;

    setQuestions(prev => {
      const copy = [...prev];
      const temp = copy[idx];
      copy[idx] = copy[targetIdx];
      copy[targetIdx] = temp;
      return copy;
    });
    setActiveQuestionIdx(targetIdx);
  };

  // ════════════════════════════════════════════════
  // SAVE EXAM API
  // ════════════════════════════════════════════════
  const handleSaveExam = async (publish: boolean) => {
    if (!title.trim()) {
      setFeedbackMsg({ type: 'error', text: 'Vui lòng nhập Tiêu đề bài thi!' });
      return;
    }
    if (questions.length === 0) {
      setFeedbackMsg({ type: 'error', text: 'Đề thi phải có ít nhất 1 câu hỏi!' });
      return;
    }

    // Validate incomplete questions
    const invalidQ = questions.findIndex(q => !q.content.trim() || !q.optionA.trim() || !q.optionB.trim() || !q.optionC.trim() || !q.optionD.trim());
    if (invalidQ !== -1) {
      setFeedbackMsg({ type: 'error', text: `Câu hỏi số ${invalidQ + 1} chưa điền đủ nội dung và 4 đáp án!` });
      setActiveQuestionIdx(invalidQ);
      return;
    }

    setSaving(true);
    setFeedbackMsg(null);

    const payload: ExamPayload = {
      id: examId,
      title: title.trim(),
      description: description.trim(),
      jlptLevel,
      examType,
      durationMinutes: Number(durationMinutes),
      totalScore: Number(totalScore),
      isPublished: publish,
      isShuffleQuestions,
      isShuffleOptions,
      questions: questions.map((q, i) => ({
        ...q,
        orderIndex: i + 1,
      })),
    };

    try {
      let saved: ExamPayload;
      if (examId) {
        saved = await teacherApi.updateExam(examId, payload);
      } else {
        saved = await teacherApi.createExam(payload);
      }
      setExamId(saved.id);
      setIsPublished(publish);
      setFeedbackMsg({
        type: 'success',
        text: `Đã ${publish ? 'xuất bản' : 'lưu nháp'} đề thi thành công! (${questions.length} câu hỏi)`,
      });
      if (onSuccess) setTimeout(onSuccess, 1500);
    } catch (err: any) {
      setFeedbackMsg({ type: 'error', text: err.message || 'Lỗi khi lưu đề thi!' });
    } finally {
      setSaving(false);
    }
  };

  // ════════════════════════════════════════════════
  // OPTIMIZATION 2: EXPORT EXAM PRINT DOC (.doc/HTML)
  // ════════════════════════════════════════════════
  const exportExamToPrintDoc = () => {
    if (questions.length === 0) {
      setFeedbackMsg({ type: 'error', text: 'Chưa có câu hỏi nào để xuất file in!' });
      return;
    }

    let htmlContent = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head><meta charset='utf-8'><title>${title}</title>
      <style>
        body { font-family: 'Times New Roman', serif; padding: 40px; color: #000; line-height: 1.6; }
        .header { text-align: center; border-bottom: 2px solid #000; padding-bottom: 15px; margin-bottom: 30px; }
        .title { font-size: 20pt; font-weight: bold; text-transform: uppercase; }
        .meta { font-size: 11pt; font-style: italic; margin-top: 5px; }
        .q-box { margin-bottom: 20px; page-break-inside: avoid; }
        .q-title { font-size: 13pt; font-weight: bold; }
        .opts { margin-left: 20px; font-size: 12pt; display: grid; grid-template-columns: 1fr 1fr; }
        .key-section { page-break-before: always; margin-top: 40px; border-top: 2px dashed #000; padding-top: 20px; }
        .key-table { width: 100%; border-collapse: collapse; margin-top: 15px; }
        .key-table th, .key-table td { border: 1px solid #000; padding: 6px 10px; text-align: center; font-size: 11pt; }
      </style>
      </head>
      <body>
        <div class='header'>
          <div class='title'>KỲ THI THỬ JLPT ${jlptLevel} — NIPPONMASTER</div>
          <div class='meta'>Đề thi: <strong>${title}</strong> | Thời gian làm bài: ${durationMinutes} phút | Số câu hỏi: ${questions.length}</div>
        </div>
        <div class='content'>
    `;

    questions.forEach((q, i) => {
      htmlContent += `
        <div class='q-box'>
          <div class='q-title'>Câu ${i + 1}: ${q.content}</div>
          <div class='opts'>
            <div>A. ${q.optionA}</div>
            <div>B. ${q.optionB}</div>
            <div>C. ${q.optionC}</div>
            <div>D. ${q.optionD}</div>
          </div>
        </div>
      `;
    });

    // Answer Key Page
    htmlContent += `
        </div>
        <div class='key-section'>
          <h2 style='text-align: center;'>BẢNG ĐÁP ÁN & HƯỚNG DẪN GIẢI CHI TIẾT</h2>
          <table class='key-table'>
            <thead>
              <tr><th>Câu hỏi</th><th>Đáp án đúng</th><th>Điểm</th><th>Giải thích chi tiết</th></tr>
            </thead>
            <tbody>
    `;

    questions.forEach((q, i) => {
      htmlContent += `
        <tr>
          <td>Câu ${i + 1}</td>
          <td><strong>${q.correctAnswer}</strong></td>
          <td>${q.score || 1}</td>
          <td style='text-align: left;'>${q.explanation || '—'}</td>
        </tr>
      `;
    });

    htmlContent += `
            </tbody>
          </table>
        </div>
      </body>
      </html>
    `;

    const blob = new Blob(['\ufeff' + htmlContent], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `DeThi_JLPT_${jlptLevel}_${Date.now()}.doc`;
    a.click();
    URL.revokeObjectURL(url);
    setFeedbackMsg({ type: 'success', text: 'Đã xuất file Word (.doc) in đề thi thành công!' });
  };

  // ════════════════════════════════════════════════
  // BULK IMPORT PARSER (JSON / CSV)
  // ════════════════════════════════════════════════
  const parseBulkInput = (content: string) => {
    setRawInput(content);
    const parsedRows: (ExamQuestionPayload & { isValid: boolean; errorMsg?: string })[] = [];

    try {
      // Try JSON format first
      if (content.trim().startsWith('[') || content.trim().startsWith('{')) {
        const json = JSON.parse(content);
        const list = Array.isArray(json) ? json : json.questions || [json];
        
        list.forEach((item: any, idx: number) => {
          const contentStr = item.content || item.question || '';
          const optA = item.optionA || item.options?.[0] || '';
          const optB = item.optionB || item.options?.[1] || '';
          const optC = item.optionC || item.options?.[2] || '';
          const optD = item.optionD || item.options?.[3] || '';
          let correct = (item.correctAnswer || item.correct || 'A').toString().toUpperCase();
          if (['0', '1', '2', '3'].includes(correct)) {
            correct = ['A', 'B', 'C', 'D'][parseInt(correct, 10)];
          }

          const isValid = Boolean(contentStr && optA && optB && optC && optD && ['A', 'B', 'C', 'D'].includes(correct));
          const errorMsg = !isValid ? 'Thiếu nội dung câu hỏi hoặc 4 đáp án / Đáp án đúng chưa chuẩn' : undefined;

          parsedRows.push({
            content: contentStr,
            optionA: optA,
            optionB: optB,
            optionC: optC,
            optionD: optD,
            correctAnswer: (['A', 'B', 'C', 'D'].includes(correct) ? correct : 'A') as any,
            explanation: item.explanation || '',
            score: item.score || 1,
            orderIndex: idx + 1,
            isValid,
            errorMsg,
          });
        });
      } else {
        // Parse CSV / TSV format
        const lines = content.split('\n').filter(l => l.trim().length > 0);
        lines.forEach((line, idx) => {
          // Skip header row if contains "content" or "question"
          if (idx === 0 && (line.toLowerCase().includes('content') || line.toLowerCase().includes('câu hỏi'))) return;

          const cols = line.split(/,|\t|\|/).map(c => c.trim().replace(/^"(.*)"$/, '$1'));
          if (cols.length < 5) return;

          const contentStr = cols[0] || '';
          const optA = cols[1] || '';
          const optB = cols[2] || '';
          const optC = cols[3] || '';
          const optD = cols[4] || '';
          let correct = (cols[5] || 'A').toUpperCase();
          if (!['A', 'B', 'C', 'D'].includes(correct)) correct = 'A';

          const isValid = Boolean(contentStr && optA && optB && optC && optD);
          parsedRows.push({
            content: contentStr,
            optionA: optA,
            optionB: optB,
            optionC: optC,
            optionD: optD,
            correctAnswer: correct as any,
            explanation: cols[6] || '',
            score: 1,
            orderIndex: idx + 1,
            isValid,
          });
        });
      }
    } catch (e: any) {
      // Direct syntax error
    }

    setParsedPreview(parsedRows);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImportFileName(file.name);
    const reader = new FileReader();
    reader.onload = (evt) => {
      const text = evt.target?.result as string;
      if (text) parseBulkInput(text);
    };
    reader.readAsText(file);
  };

  const handleConfirmImport = () => {
    const validRows = parsedPreview.filter(r => r.isValid).map(({ isValid, errorMsg, ...q }) => q);
    if (validRows.length === 0) {
      setFeedbackMsg({ type: 'error', text: 'Không tìm thấy câu hỏi hợp lệ nào để import!' });
      return;
    }

    setQuestions(prev => [...prev, ...validRows.map((q, i) => ({ ...q, orderIndex: prev.length + i + 1 }))]);
    setFeedbackMsg({ type: 'success', text: `Đã import thành công ${validRows.length} câu hỏi vào đề thi!` });
    setActiveTab('manual');
    setRawInput('');
    setParsedPreview([]);
    setImportFileName('');
    setActiveQuestionIdx(questions.length);
  };

  const downloadSampleTemplate = () => {
    const sampleData = [
      {
        question: "「おはようございます」の意味は何ですか？",
        optionA: "Chào buổi sáng",
        optionB: "Xin lỗi",
        optionC: "Cảm ơn",
        optionD: "Tạm biệt",
        correctAnswer: "A",
        explanation: "おはようございます là lời chào buổi sáng lịch sự."
      },
      {
        question: "漢字「山」の読み方はどれですか？",
        optionA: "かわ",
        optionB: "やま",
        optionC: "うみ",
        optionD: "もり",
        correctAnswer: "B",
        explanation: "Chữ Hán 山 (Sơn - Ngọn núi) đọc là やま (yama)."
      }
    ];

    const jsonStr = JSON.stringify(sampleData, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'NipponMaster_Exam_Template.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const activeQuestion = activeQuestionIdx !== null ? questions[activeQuestionIdx] : null;

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto space-y-6 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-outline-variant/30 pb-4">
        <div className="flex items-center gap-3">
          {onBack && (
            <button
              onClick={onBack}
              className="p-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface-variant cursor-pointer"
            >
              <ArrowLeft size={18} />
            </button>
          )}
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-widest">
              <Sparkles size={14} /> EXAM BUILDER STUDIO
            </div>
            <h1 className="text-2xl font-extrabold text-on-surface mt-0.5 flex items-center gap-2">
              {examId ? 'Chỉnh Sửa Đề Thi JLPT' : 'Tạo Đề Thi JLPT Mới'}
              {isPublished && (
                <span className="px-2 py-0.5 rounded-full text-[10px] bg-secondary/15 text-secondary font-bold">
                  Đã xuất bản
                </span>
              )}
            </h1>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          <button
            onClick={exportExamToPrintDoc}
            className="px-3.5 py-2.5 rounded-xl bg-tertiary/15 text-tertiary border border-tertiary/30 font-bold text-xs cursor-pointer hover:bg-tertiary/25 transition-colors flex items-center justify-center gap-1.5"
          >
            <Download size={15} /> Xuất File Word In Đề (.doc)
          </button>
          <button
            onClick={() => handleSaveExam(false)}
            disabled={saving}
            className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-surface-container border border-outline-variant/40 text-on-surface font-bold text-xs cursor-pointer hover:bg-surface-container-high transition-colors flex items-center justify-center gap-2"
          >
            <Save size={15} /> Lưu Nháp
          </button>
          <button
            onClick={() => handleSaveExam(true)}
            disabled={saving}
            className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl bg-primary text-on-primary font-bold text-xs cursor-pointer hover:bg-primary-container transition-colors shadow-md flex items-center justify-center gap-2"
          >
            <CheckCircle2 size={15} /> Xuất Bản Đề Thi
          </button>
        </div>
      </div>

      {/* Feedback Message */}
      {feedbackMsg && (
        <div className={`p-4 rounded-2xl text-xs font-bold flex items-center justify-between animate-fade-in ${
          feedbackMsg.type === 'success' ? 'bg-secondary/15 border border-secondary text-secondary' : 'bg-error/15 border border-error text-error'
        }`}>
          <span>{feedbackMsg.text}</span>
          <button onClick={() => setFeedbackMsg(null)} className="underline cursor-pointer">Đóng</button>
        </div>
      )}

      {/* Exam Meta Configuration Card */}
      <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-3xl p-6 space-y-4 shadow-sm">
        <h3 className="text-xs font-bold text-on-surface uppercase tracking-wider flex items-center gap-2">
          <FileText size={16} className="text-primary" /> Thông tin tổng quan đề thi
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <label className="text-xs font-bold text-on-surface mb-1 block">Tên đề thi *</label>
            <input
              type="text"
              placeholder="Ví dụ: Đề Thi Thử JLPT N5 — Đề Số 01 (Tổng Hợp)"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-outline-variant bg-surface text-sm font-semibold focus:outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-on-surface mb-1 block">Cấp độ JLPT</label>
            <select
              value={jlptLevel}
              onChange={e => setJlptLevel(e.target.value as any)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-outline-variant bg-surface text-sm font-bold"
            >
              {['N5', 'N4', 'N3', 'N2', 'N1'].map(lvl => (
                <option key={lvl} value={lvl}>{lvl}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="text-xs font-bold text-on-surface mb-1 block">Loại bài thi</label>
            <select
              value={examType}
              onChange={e => setExamType(e.target.value as any)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-outline-variant bg-surface text-sm font-bold"
            >
              <option value="FULL">Tổng hợp (FULL)</option>
              <option value="VOCABULARY">Từ vựng (VOCABULARY)</option>
              <option value="GRAMMAR">Ngữ pháp (GRAMMAR)</option>
              <option value="READING">Đọc hiểu (READING)</option>
              <option value="LISTENING">Nghe hiểu (LISTENING)</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-bold text-on-surface mb-1 block">Thời gian làm bài (Phút)</label>
            <input
              type="number"
              min={5}
              value={durationMinutes}
              onChange={e => setDurationMinutes(Number(e.target.value))}
              className="w-full px-3.5 py-2.5 rounded-xl border border-outline-variant bg-surface text-sm font-semibold"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-on-surface mb-1 block">Tổng điểm tối đa</label>
            <input
              type="number"
              min={10}
              value={totalScore}
              onChange={e => setTotalScore(Number(e.target.value))}
              className="w-full px-3.5 py-2.5 rounded-xl border border-outline-variant bg-surface text-sm font-semibold"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-on-surface mb-1 block">Mô tả chi tiết bài thi</label>
          <textarea
            placeholder="Ví dụ: Đề thi tổng hợp kiến thức từ vựng, chữ hán và ngữ pháp N5 dành cho học viên..."
            value={description}
            onChange={e => setDescription(e.target.value)}
            rows={2}
            className="w-full px-3.5 py-2.5 rounded-xl border border-outline-variant bg-surface text-xs font-medium focus:outline-none focus:border-primary"
          />
        </div>

        {/* Shuffle Settings */}
        <div className="flex flex-wrap gap-6 pt-2 border-t border-outline-variant/20">
          <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-on-surface">
            <input
              type="checkbox"
              checked={isShuffleQuestions}
              onChange={e => setIsShuffleQuestions(e.target.checked)}
              className="w-4 h-4 rounded text-primary accent-primary cursor-pointer"
            />
            <span>🔀 Tự động trộn thứ tự câu hỏi khi làm bài</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-on-surface">
            <input
              type="checkbox"
              checked={isShuffleOptions}
              onChange={e => setIsShuffleOptions(e.target.checked)}
              className="w-4 h-4 rounded text-primary accent-primary cursor-pointer"
            />
            <span>🔀 Tự động đảo ngẫu nhiên 4 đáp án (A, B, C, D)</span>
          </label>
        </div>
      </div>

      {/* Tabs Selector: Manual vs Bulk */}
      <div className="flex gap-2 border-b border-outline-variant/30 pb-3">
        {[
          { id: 'manual', label: `✍️ Soạn Thủ Công (${questions.length} câu)`, icon: FileText },
          { id: 'bulk', label: '📥 Import Hàng Loạt (Excel / JSON)', icon: Upload },
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id as any)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === t.id
                ? 'bg-primary text-on-primary shadow-sm'
                : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* TAB 1: MANUAL QUESTION BUILDER */}
      {activeTab === 'manual' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Questions List & Navigator */}
          <div className="col-span-1 lg:col-span-4 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-on-surface uppercase tracking-wider">
                Danh sách câu hỏi ({questions.length})
              </h3>
              <button
                onClick={handleAddQuestion}
                className="px-3 py-1.5 rounded-lg bg-primary text-on-primary text-xs font-bold cursor-pointer hover:bg-primary-container transition-colors flex items-center gap-1"
              >
                <Plus size={14} /> Thêm câu
              </button>
            </div>

            {questions.length === 0 ? (
              <div className="text-center py-10 border border-dashed border-outline-variant/60 rounded-2xl p-4 text-xs text-on-surface-variant space-y-2">
                <p>Chưa có câu hỏi nào trong đề thi.</p>
                <button
                  onClick={handleAddQuestion}
                  className="px-3 py-1.5 rounded-lg bg-primary/10 text-primary font-bold hover:bg-primary/20 cursor-pointer"
                >
                  + Thêm câu hỏi đầu tiên
                </button>
              </div>
            ) : (
              <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
                {questions.map((q, i) => {
                  const isActive = activeQuestionIdx === i;
                  const isValid = q.content.trim() && q.optionA.trim() && q.optionB.trim();

                  return (
                    <div
                      key={i}
                      onClick={() => setActiveQuestionIdx(i)}
                      className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center gap-3 ${
                        isActive
                          ? 'bg-primary/10 border-primary text-on-surface shadow-sm'
                          : 'bg-surface-container-lowest border-outline-variant/30 hover:border-outline-variant'
                      }`}
                    >
                      <span className="w-7 h-7 rounded-lg bg-surface-container-high flex items-center justify-center text-xs font-bold text-on-surface-variant flex-shrink-0">
                        {i + 1}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold font-jp line-clamp-1">
                          {q.content || <span className="italic text-on-surface-variant font-normal">(Chưa nhập nội dung...)</span>}
                        </div>
                        <div className="text-[10px] text-on-surface-variant mt-0.5 flex items-center gap-2">
                          <span>Đáp án đúng: <strong>{q.correctAnswer}</strong></span>
                          {!isValid && <span className="text-error font-bold">• Thiếu thông tin</span>}
                        </div>
                      </div>

                      {/* Controls */}
                      <div className="flex items-center gap-1 flex-shrink-0" onClick={e => e.stopPropagation()}>
                        <button
                          onClick={() => handleMoveQuestion(i, 'up')}
                          disabled={i === 0}
                          className="p-1 rounded hover:bg-surface-container text-on-surface-variant disabled:opacity-30 cursor-pointer"
                        >
                          <ArrowUp size={12} />
                        </button>
                        <button
                          onClick={() => handleMoveQuestion(i, 'down')}
                          disabled={i === questions.length - 1}
                          className="p-1 rounded hover:bg-surface-container text-on-surface-variant disabled:opacity-30 cursor-pointer"
                        >
                          <ArrowDown size={12} />
                        </button>
                        <button
                          onClick={() => handleDeleteQuestion(i)}
                          className="p-1 rounded hover:bg-error/15 text-error cursor-pointer"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right Column: Active Question Form Editor */}
          <div className="col-span-1 lg:col-span-8 bg-surface-container-lowest border border-outline-variant/30 rounded-3xl p-6 space-y-5 shadow-sm">
            {activeQuestion && activeQuestionIdx !== null ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-outline-variant/20 pb-3">
                  <h3 className="text-sm font-bold text-on-surface uppercase tracking-wider flex items-center gap-2">
                    <span>Soạn câu hỏi số {activeQuestionIdx + 1}</span>
                  </h3>
                  <span className="text-xs font-medium text-on-surface-variant">Thứ tự: #{activeQuestionIdx + 1}</span>
                </div>

                {/* Question Content */}
                <div>
                  <label className="text-xs font-bold text-on-surface mb-1 block">Nội dung câu hỏi (Tiếng Nhật/Việt) *</label>
                  <textarea
                    placeholder="Ví dụ: 「おはようございます」の意味は何ですか？"
                    value={activeQuestion.content}
                    onChange={e => handleUpdateQuestion(activeQuestionIdx, 'content', e.target.value)}
                    rows={3}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-outline-variant bg-surface text-sm font-jp font-semibold focus:outline-none focus:border-primary"
                  />
                </div>

                {/* 4 Options Grid */}
                <div className="space-y-3">
                  <label className="text-xs font-bold text-on-surface block">4 Đáp án Lựa chọn & Chọn Đáp Án Đúng *</label>

                  {[
                    { key: 'optionA', label: 'Đáp án A', choice: 'A' },
                    { key: 'optionB', label: 'Đáp án B', choice: 'B' },
                    { key: 'optionC', label: 'Đáp án C', choice: 'C' },
                    { key: 'optionD', label: 'Đáp án D', choice: 'D' },
                  ].map(opt => (
                    <div key={opt.key} className="flex items-center gap-3">
                      <label className="flex items-center gap-1.5 cursor-pointer flex-shrink-0">
                        <input
                          type="radio"
                          name={`correct_${activeQuestionIdx}`}
                          checked={activeQuestion.correctAnswer === opt.choice}
                          onChange={() => handleUpdateQuestion(activeQuestionIdx, 'correctAnswer', opt.choice)}
                          className="w-4 h-4 text-primary accent-primary cursor-pointer"
                        />
                        <span className={`w-6 h-6 rounded-lg text-xs font-bold flex items-center justify-center ${
                          activeQuestion.correctAnswer === opt.choice ? 'bg-primary text-on-primary' : 'bg-surface-container text-on-surface-variant'
                        }`}>
                          {opt.choice}
                        </span>
                      </label>

                      <input
                        type="text"
                        placeholder={`Nhập ${opt.label}...`}
                        value={(activeQuestion as any)[opt.key]}
                        onChange={e => handleUpdateQuestion(activeQuestionIdx, opt.key as any, e.target.value)}
                        className={`flex-1 px-3.5 py-2 rounded-xl border text-xs font-jp font-semibold focus:outline-none ${
                          activeQuestion.correctAnswer === opt.choice
                            ? 'border-primary bg-primary/5'
                            : 'border-outline-variant bg-surface focus:border-primary'
                        }`}
                      />
                    </div>
                  ))}
                </div>

                {/* Explanation & Points */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 pt-2">
                  <div className="sm:col-span-3">
                    <label className="text-xs font-bold text-on-surface mb-1 block">Lời giải chi tiết (Hướng dẫn chọn đáp án)</label>
                    <input
                      type="text"
                      placeholder="Ví dụ: Lời chào lịch sự dùng vào buổi sáng..."
                      value={activeQuestion.explanation || ''}
                      onChange={e => handleUpdateQuestion(activeQuestionIdx, 'explanation', e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-outline-variant bg-surface text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-on-surface mb-1 block">Điểm số câu này</label>
                    <input
                      type="number"
                      min={1}
                      value={activeQuestion.score || 1}
                      onChange={e => handleUpdateQuestion(activeQuestionIdx, 'score', Number(e.target.value))}
                      className="w-full px-3.5 py-2 rounded-xl border border-outline-variant bg-surface text-xs font-bold"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-20 text-on-surface-variant text-xs space-y-2">
                <HelpCircle size={32} className="mx-auto text-outline" />
                <p>Chọn một câu hỏi bên danh sách trái để chỉnh sửa hoặc bấm <strong>"Thêm câu"</strong>.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: BULK IMPORT EXCEL / JSON */}
      {activeTab === 'bulk' && (
        <div className="space-y-6">
          <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-3xl p-6 space-y-4 shadow-sm">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div>
                <h3 className="text-sm font-bold text-on-surface uppercase tracking-wider flex items-center gap-2">
                  <Upload size={16} className="text-primary" /> Upload File JSON / CSV / Text câu hỏi
                </h3>
                <p className="text-xs text-on-surface-variant mt-0.5">
                  Tải file mẫu định dạng quy chuẩn để chuẩn bị hàng loạt câu hỏi cho kỳ thi.
                </p>
              </div>

              <button
                onClick={downloadSampleTemplate}
                className="px-3.5 py-2 rounded-xl bg-surface-container border border-outline-variant/40 text-on-surface text-xs font-bold cursor-pointer hover:bg-surface-container-high flex items-center gap-1.5 flex-shrink-0"
              >
                <Download size={14} /> Tải File Mẫu (.JSON)
              </button>
            </div>

            {/* Drag & Drop Upload Zone */}
            <div className="border-2 border-dashed border-outline-variant/60 rounded-2xl p-6 text-center space-y-3 bg-surface-container-low hover:bg-surface-container transition-colors relative">
              <input
                type="file"
                accept=".json,.csv,.txt"
                onChange={handleFileUpload}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
              />
              <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto">
                <Upload size={22} />
              </div>
              <div>
                <div className="text-xs font-bold text-on-surface">
                  {importFileName ? `Đã chọn: ${importFileName}` : 'Kéo & Thả file .JSON / .CSV vào đây hoặc Bấm để chọn file'}
                </div>
                <div className="text-[10px] text-on-surface-variant mt-1">
                  Hỗ trợ định dạng JSON Array hoặc CSV 6 cột (Content, OptA, OptB, OptC, OptD, Correct)
                </div>
              </div>
            </div>

            {/* Direct Paste Alternative */}
            <div>
              <label className="text-xs font-bold text-on-surface mb-1 block">Hoặc Dán trực tiếp nội dung JSON / CSV vào ô dưới:</label>
              <textarea
                placeholder={`[\n  {\n    "question": "「こんにちは」の意味は何ですか？",\n    "optionA": "Xin chào",\n    "optionB": "Cảm ơn",\n    "optionC": "Xin lỗi",\n    "optionD": "Tạm biệt",\n    "correctAnswer": "A"\n  }\n]`}
                value={rawInput}
                onChange={e => parseBulkInput(e.target.value)}
                rows={5}
                className="w-full px-3.5 py-2.5 rounded-xl border border-outline-variant bg-surface font-mono text-xs focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          {/* Live Preview & Validation Grid */}
          {parsedPreview.length > 0 && (
            <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-3xl p-6 space-y-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-on-surface uppercase tracking-wider flex items-center gap-2">
                    <Eye size={16} className="text-secondary" /> Kết quả Xem Trước Dữ Liệu ({parsedPreview.length} câu)
                  </h3>
                  <div className="text-xs text-on-surface-variant mt-0.5">
                    Hợp lệ: <strong className="text-secondary">{parsedPreview.filter(p => p.isValid).length}</strong> • Lỗi: <strong className="text-error">{parsedPreview.filter(p => !p.isValid).length}</strong>
                  </div>
                </div>

                <button
                  onClick={handleConfirmImport}
                  disabled={parsedPreview.filter(p => p.isValid).length === 0}
                  className="px-4 py-2.5 rounded-xl bg-secondary text-on-secondary font-bold text-xs cursor-pointer hover:bg-secondary/80 transition-colors shadow-md flex items-center gap-2 disabled:opacity-40"
                >
                  <CheckCircle2 size={16} /> Import {parsedPreview.filter(p => p.isValid).length} Câu Vào Đề Thi
                </button>
              </div>

              {/* Preview List */}
              <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1">
                {parsedPreview.map((item, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-2xl border text-xs flex items-center gap-3 ${
                      item.isValid ? 'bg-secondary/5 border-secondary/20' : 'bg-error/10 border-error/30'
                    }`}
                  >
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 ${
                      item.isValid ? 'bg-secondary text-on-secondary' : 'bg-error text-on-error'
                    }`}>
                      {idx + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold font-jp line-clamp-1">{item.content || '(Thiếu nội dung câu hỏi)'}</div>
                      <div className="text-[10px] text-on-surface-variant mt-0.5">
                        A: {item.optionA} | B: {item.optionB} | C: {item.optionC} | D: {item.optionD} — Đã chọn: <strong>{item.correctAnswer}</strong>
                      </div>
                    </div>
                    <span className={`text-[10px] font-bold flex-shrink-0 ${item.isValid ? 'text-secondary' : 'text-error'}`}>
                      {item.isValid ? '✅ Hợp lệ' : '⚠️ Lỗi dữ liệu'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
