import { useState, useEffect, useRef, useCallback } from 'react';
import type { PlacementQuestion, JlptLevel } from '../../api/placementApi';

interface QuizPlayerProps {
  level: JlptLevel;
  questions: PlacementQuestion[];
  timeLimitMinutes: number;
  onSubmit: (answers: { questionId: number; chosenOption: number }[]) => void;
  isSubmitting: boolean;
}

const SECTION_LABEL: Record<string, string> = { VOCAB: 'Từ Vựng & Kanji', GRAMMAR: 'Ngữ Pháp', READING: 'Đọc Hiểu' };
const OPTION_LABELS = ['A', 'B', 'C', 'D'];

export default function QuizPlayer({ level, questions, timeLimitMinutes, onSubmit, isSubmitting }: QuizPlayerProps) {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [timeLeft, setTimeLeft] = useState(timeLimitMinutes * 60);
  const [submitted, setSubmitted] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const handleSubmit = useCallback(() => {
    if (submitted) return;
    setSubmitted(true);
    if (intervalRef.current) clearInterval(intervalRef.current);
    const answerList = questions.map(q => ({
      questionId: q.id,
      chosenOption: answers[q.id] ?? -1,
    }));
    onSubmit(answerList);
  }, [submitted, questions, answers, onSubmit]);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) { handleSubmit(); return 0; }
        return t - 1;
      });
    }, 1000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [handleSubmit]);

  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;
  const timerColor = timeLeft <= 60 ? '#ba1a1a' : timeLeft <= 180 ? '#92541a' : '#2b5f43';
  const q = questions[current];
  const answeredCount = Object.keys(answers).length;
  const progress = (answeredCount / questions.length) * 100;

  const handleAnswer = (optionIdx: number) => {
    setAnswers(prev => ({ ...prev, [q.id]: optionIdx }));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 0 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, flexWrap: 'wrap', gap: 8 }}>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <span style={{ fontWeight: 700, fontSize: 15, color: '#231815' }}>Bài Test {level}</span>
          <span style={{ fontSize: 12, color: '#5a5450', background: '#f1ede6', padding: '2px 10px', borderRadius: 99 }}>
            {SECTION_LABEL[q?.section] || q?.section}
          </span>
        </div>
        <div style={{
          fontWeight: 700, fontSize: 18, color: timerColor,
          background: `${timerColor}12`, padding: '6px 16px', borderRadius: 99,
          fontVariantNumeric: 'tabular-nums', letterSpacing: 1,
          border: timeLeft <= 60 ? '2px solid #ba1a1a44' : '2px solid transparent',
          transition: 'all 0.3s',
        }}>
          ⏱ {String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')}
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ height: 6, background: '#e2dbce', borderRadius: 99, marginBottom: 20, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${progress}%`, background: '#c01538', borderRadius: 99, transition: 'width 0.3s ease' }} />
      </div>

      {/* Question nav dots */}
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 20 }}>
        {questions.map((qItem, idx) => {
          const isAnswered = answers[qItem.id] !== undefined;
          const isCurrent = idx === current;
          return (
            <button
              key={qItem.id}
              id={`quiz-nav-${idx}`}
              onClick={() => setCurrent(idx)}
              title={`Câu ${idx + 1}`}
              style={{
                width: 30, height: 30, borderRadius: 8, border: 'none', cursor: 'pointer',
                fontSize: 12, fontWeight: 600, transition: 'all 0.15s',
                background: isCurrent ? '#c01538' : isAnswered ? '#2b5f43' : '#e2dbce',
                color: isCurrent || isAnswered ? '#fff' : '#5a5450',
                transform: isCurrent ? 'scale(1.15)' : 'scale(1)',
              }}
            >
              {idx + 1}
            </button>
          );
        })}
      </div>

      {/* Question */}
      {q && (
        <div style={{ flex: 1 }}>
          <p style={{ fontWeight: 600, fontSize: 16, color: '#231815', lineHeight: 1.7, marginBottom: 20, whiteSpace: 'pre-wrap', fontFamily: '"Noto Sans JP", sans-serif' }}>
            <span style={{ fontSize: 13, color: '#8c827b', marginRight: 8 }}>Câu {current + 1}/{questions.length}</span>
            {q.questionText}
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {q.options.map((opt, idx) => {
              const isSelected = answers[q.id] === idx;
              return (
                <button
                  key={idx}
                  id={`quiz-option-${idx}`}
                  onClick={() => handleAnswer(idx)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 14,
                    padding: '13px 18px', borderRadius: 12, cursor: 'pointer',
                    border: isSelected ? '2.5px solid #c01538' : '2px solid #e2dbce',
                    background: isSelected ? '#fff1f2' : '#fff',
                    textAlign: 'left', transition: 'all 0.15s ease',
                    fontFamily: '"Noto Sans JP", sans-serif', fontSize: 14,
                  }}
                  onMouseEnter={e => { if (!isSelected) (e.currentTarget as HTMLButtonElement).style.borderColor = '#c0153866'; }}
                  onMouseLeave={e => { if (!isSelected) (e.currentTarget as HTMLButtonElement).style.borderColor = '#e2dbce'; }}
                >
                  <span style={{
                    width: 30, height: 30, borderRadius: 8, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: 700, fontSize: 13,
                    background: isSelected ? '#c01538' : '#f1ede6',
                    color: isSelected ? '#fff' : '#5a5450',
                    transition: 'all 0.15s',
                  }}>
                    {OPTION_LABELS[idx]}
                  </span>
                  <span style={{ color: '#231815', lineHeight: 1.5 }}>{opt}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Footer nav */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 24, paddingTop: 16, borderTop: '1px solid #e2dbce' }}>
        <button
          id="quiz-prev"
          onClick={() => setCurrent(c => Math.max(0, c - 1))}
          disabled={current === 0}
          style={{ padding: '10px 20px', borderRadius: 10, border: '1.5px solid #e2dbce', background: '#fff', color: '#5a5450', cursor: current === 0 ? 'not-allowed' : 'pointer', opacity: current === 0 ? 0.4 : 1, fontWeight: 600, fontSize: 14 }}
        >
          ← Câu trước
        </button>

        <span style={{ fontSize: 13, color: '#8c827b' }}>
          {answeredCount}/{questions.length} câu đã trả lời
        </span>

        {current < questions.length - 1 ? (
          <button
            id="quiz-next"
            onClick={() => setCurrent(c => Math.min(questions.length - 1, c + 1))}
            style={{ padding: '10px 20px', borderRadius: 10, border: 'none', background: '#231815', color: '#fff', cursor: 'pointer', fontWeight: 600, fontSize: 14 }}
          >
            Câu tiếp →
          </button>
        ) : (
          <button
            id="quiz-submit"
            onClick={handleSubmit}
            disabled={isSubmitting || submitted}
            style={{
              padding: '10px 24px', borderRadius: 10, border: 'none',
              background: isSubmitting ? '#8c827b' : '#c01538',
              color: '#fff', cursor: isSubmitting ? 'wait' : 'pointer',
              fontWeight: 700, fontSize: 14, transition: 'background 0.2s',
            }}
          >
            {isSubmitting ? '⏳ Đang chấm...' : '✓ Nộp bài'}
          </button>
        )}
      </div>
    </div>
  );
}
