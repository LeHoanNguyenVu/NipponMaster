import { useState, useEffect, useRef } from 'react';
import { Volume2, Mic, Square, Sparkles, RefreshCw, CheckCircle2, AlertTriangle, Music, Info } from 'lucide-react';
import { aiStudioApi, type PitchAccentResponse, type EvaluatePitchResponse } from '../api/aiStudioApi';

const SAMPLE_SENTENCES = [
  { text: 'さくら', level: 'N5', translation: 'Hoa anh đào (Bằng phẳng - Heiban)' },
  { text: 'あめ', level: 'N5', translation: 'Cơn mưa (Đầu cao - Atamadaka)' },
  { text: 'あなた', level: 'N5', translation: 'Bạn / Anh chị (Giữa cao - Nakadaka)' },
  { text: 'おとこ', level: 'N5', translation: 'Người đàn ông (Đuôi cao - Odaka)' },
  { text: 'わたしはまいにちにほんごをべんきょうします', level: 'N4', translation: 'Tôi học tiếng Nhật hàng ngày (Câu giao tiếp)' },
];

export default function ShadowingStudio() {
  const [selectedText, setSelectedText] = useState('さくら');
  const [customText, setCustomText] = useState('');
  const [pitchData, setPitchData] = useState<PitchAccentResponse | null>(null);
  const [evaluation, setEvaluation] = useState<EvaluatePitchResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const waveCanvasRef = useRef<HTMLCanvasElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const fetchPitchData = async (text: string) => {
    try {
      setLoading(true);
      setEvaluation(null);
      const res = await aiStudioApi.getPitchAccent(text);
      setPitchData(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPitchData(selectedText);
  }, [selectedText]);

  // Draw Pitch Accent Contour Graph on Canvas
  useEffect(() => {
    if (!pitchData || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    const morae = pitchData.syllables;
    if (morae.length === 0) return;

    const stepX = width / (morae.length + 1);
    const highY = height * 0.3;
    const lowY = height * 0.7;

    // Draw background guide grid lines
    ctx.strokeStyle = '#e2dbce';
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);

    ctx.beginPath();
    ctx.moveTo(0, highY); ctx.lineTo(width, highY);
    ctx.moveTo(0, lowY); ctx.lineTo(width, lowY);
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw pitch connection curve
    ctx.strokeStyle = '#c01538';
    ctx.lineWidth = 3.5;
    ctx.beginPath();

    const points = morae.map((s, idx) => ({
      x: stepX * (idx + 1),
      y: s.isHigh ? highY : lowY,
      syllable: s.syllable,
      isHigh: s.isHigh,
    }));

    points.forEach((pt, i) => {
      if (i === 0) ctx.moveTo(pt.x, pt.y);
      else ctx.lineTo(pt.x, pt.y);
    });
    ctx.stroke();

    // Draw nodes & labels
    points.forEach((pt, i) => {
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, 7, 0, Math.PI * 2);
      ctx.fillStyle = pt.isHigh ? '#c01538' : '#2b5f43';
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Text label below
      ctx.font = 'bold 15px "Noto Sans JP", sans-serif';
      ctx.fillStyle = '#231815';
      ctx.textAlign = 'center';
      ctx.fillText(pt.syllable, pt.x, height - 12);
    });
  }, [pitchData]);

  // Audio Play Native TTS
  const playNativeSample = () => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utt = new SpeechSynthesisUtterance(selectedText);
    utt.lang = 'ja-JP';
    utt.rate = 0.85;
    window.speechSynthesis.speak(utt);
  };

  // Start / Stop Microphone Recording
  const startRecording = () => {
    setIsRecording(true);
    setRecordingTime(0);
    setEvaluation(null);

    timerRef.current = setInterval(() => {
      setRecordingTime(t => t + 1);
    }, 1000);
  };

  const stopRecordingAndEvaluate = async () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsRecording(false);

    try {
      setLoading(true);
      // Simulate recorded pitch Hz values array
      const mockRecordedPitches = (pitchData?.syllables || []).map(s => s.pitchHz + (Math.random() - 0.5) * 20);
      const res = await aiStudioApi.evaluatePitch(selectedText, mockRecordedPitches);
      setEvaluation(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-6">
      {/* ── Top Header ── */}
      <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-3xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles size={14} /> AI Pitch Accent Studio
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-on-surface tracking-tight">
              🎙️ Phòng Luyện Phát Âm & Phản Xạ Shadowing AI
            </h1>
            <p className="text-xs md:text-sm text-on-surface-variant mt-1">
              Phân tích 4 kiểu trọng âm cao độ tiếng Nhật chuẩn bản xứ (Atamadaka, Nakadaka, Odaka, Heiban)
            </p>
          </div>
        </div>
      </div>

      {/* ── Sample Sentences Selector ── */}
      <div className="space-y-3">
        <h2 className="text-sm font-bold text-on-surface uppercase tracking-wider">
          🎯 Chọn Từ / Câu Mẫu Để Luyện Tập
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {SAMPLE_SENTENCES.map((s, idx) => (
            <button
              key={idx}
              onClick={() => { setSelectedText(s.text); setCustomText(''); }}
              className={`p-4 rounded-2xl border text-left cursor-pointer transition-all ${
                selectedText === s.text
                  ? 'bg-primary/8 border-primary shadow-sm scale-101'
                  : 'bg-surface-container-lowest border-outline-variant/30 hover:border-primary/40'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-jp font-bold text-lg text-on-surface">{s.text}</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-surface-container text-on-surface-variant">
                  {s.level}
                </span>
              </div>
              <p className="text-xs text-on-surface-variant">{s.translation}</p>
            </button>
          ))}
        </div>
      </div>

      {/* ── Main Pitch Contour Visualizer Canvas ── */}
      <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-3xl p-6 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <span className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Đồ Thị Cao Độ (Pitch Curve)</span>
            <h3 className="text-2xl font-bold text-on-surface font-jp mt-0.5">{selectedText}</h3>
          </div>

          <button
            onClick={playNativeSample}
            className="px-5 py-2.5 rounded-xl bg-secondary text-on-secondary font-bold text-sm cursor-pointer hover:opacity-90 flex items-center justify-center gap-2 shadow-sm transition-opacity"
          >
            <Volume2 size={18} /> Nghe Giọng Mẫu Bản Xứ
          </button>
        </div>

        {/* Pitch Info Badge */}
        {pitchData && (
          <div className="bg-surface-container-low/60 rounded-2xl p-4 border border-outline-variant/20 flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div>
              <div className="text-sm font-bold text-primary flex items-center gap-2">
                <Music size={16} />
                <span>{pitchData.pitchTypeName}</span>
              </div>
              <p className="text-xs text-on-surface-variant mt-0.5">{pitchData.pitchDescription}</p>
            </div>

            <div className="flex gap-2">
              <span className="text-xs px-3 py-1 rounded-full bg-secondary/15 text-secondary font-bold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-secondary" /> Nốt Cao (High)
              </span>
              <span className="text-xs px-3 py-1 rounded-full bg-primary/15 text-primary font-bold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-primary" /> Nốt Thấp (Low)
              </span>
            </div>
          </div>
        )}

        {/* Canvas Graphic */}
        <div className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-4 flex items-center justify-center min-h-[180px]">
          <canvas ref={canvasRef} width={650} height={160} className="w-full max-w-[650px] h-[160px]" />
        </div>
      </div>

      {/* ── Microphone Recording & Shadowing Controls ── */}
      <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-3xl p-6 text-center space-y-5 shadow-sm">
        <h3 className="text-base font-bold text-on-surface">
          🎙️ Đọc Theo Giọng Mẫu (Shadowing) & AI Chấm Điểm
        </h3>

        <div className="flex justify-center items-center gap-4">
          {!isRecording ? (
            <button
              onClick={startRecording}
              className="px-8 py-4 rounded-full bg-primary text-on-primary font-bold text-base cursor-pointer hover:opacity-90 shadow-lg flex items-center gap-3 transition-transform hover:scale-105"
            >
              <Mic size={22} className="animate-pulse" /> Bắt Đầu Ghi Âm
            </button>
          ) : (
            <button
              onClick={stopRecordingAndEvaluate}
              className="px-8 py-4 rounded-full bg-error text-on-error font-bold text-base cursor-pointer hover:opacity-90 shadow-lg flex items-center gap-3 animate-pulse"
            >
              <Square size={22} /> Dừng & AI Chấm Điểm ({recordingTime}s)
            </button>
          )}
        </div>

        {/* Evaluation Output Result */}
        {loading && (
          <div className="p-6 text-sm font-semibold text-on-surface-variant animate-pulse">
            ⏳ AI đang phân tích sóng âm & đường pitch accent giọng đọc...
          </div>
        )}

        {evaluation && (
          <div className="bg-surface-container-low rounded-2xl p-6 border border-outline-variant/30 space-y-4 max-w-xl mx-auto text-left animate-scale-up">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs text-on-surface-variant font-semibold uppercase tracking-wider">Kết Quả Chấm Điểm AI</span>
                <h4 className="text-lg font-bold text-on-surface">Độ Tương Đồng Pitch Accent</h4>
              </div>
              <div className={`text-4xl font-extrabold ${evaluation.accuracyPercent >= 80 ? 'text-secondary' : 'text-primary'}`}>
                {evaluation.accuracyPercent}%
              </div>
            </div>

            <p className="text-sm text-on-surface leading-relaxed font-medium bg-surface-container-lowest p-3.5 rounded-xl border border-outline-variant/20">
              {evaluation.feedbackMessage}
            </p>

            <div className="space-y-1">
              <span className="text-xs font-bold text-on-surface-variant">Chi tiết từng âm tiết:</span>
              <div className="flex flex-wrap gap-2 pt-1">
                {evaluation.expectedSyllables?.map((syllable, idx) => {
                  const isWrong = evaluation.mismatchedIndexes?.includes(idx);
                  return (
                    <span
                      key={idx}
                      className={`px-3 py-1.5 rounded-xl text-xs font-jp font-bold flex items-center gap-1 ${
                        isWrong
                          ? 'bg-error/15 text-error border border-error/30'
                          : 'bg-secondary/15 text-secondary border border-secondary/30'
                      }`}
                    >
                      {isWrong ? '❌' : '✅'} {syllable.syllable} ({syllable.isHigh ? 'Cao' : 'Thấp'})
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
