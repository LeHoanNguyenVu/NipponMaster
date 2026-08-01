import { useState } from 'react';
import type { PlacementResult, JlptLevel, Section } from '../../api/placementApi';

interface Props {
  result: PlacementResult;
  onConfirm: (level: JlptLevel) => void;
  onRetry: () => void;
  onTakeTestLevel?: (level: JlptLevel) => void;
  isConfirming: boolean;
}

const SECTION_LABEL: Record<Section, string> = {
  VOCAB: 'Từ Vựng & Kanji',
  GRAMMAR: 'Ngữ Pháp',
  READING: 'Đọc Hiểu',
};

const SECTION_EMOJI: Record<Section, string> = {
  VOCAB: '📖',
  GRAMMAR: '✍️',
  READING: '📄',
};

const LEVEL_COLOR: Record<JlptLevel, string> = {
  N5: '#2b5f43', N4: '#1d6b9b', N3: '#7c5c2e', N2: '#8b1a1a', N1: '#5a1a7a',
};

export default function PlacementResultView({ result, onConfirm, onRetry, onTakeTestLevel, isConfirming }: Props) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [chosenLevel, setChosenLevel] = useState<JlptLevel>(result.recommendedLevel);
  const [filterTab, setFilterTab] = useState<'all' | 'wrong' | 'correct'>('all');

  const pct = result.scorePercent;
  const scoreColor = pct >= 80 ? '#2b5f43' : pct >= 50 ? '#7c5c2e' : '#ba1a1a';
  const scoreEmoji = pct >= 80 ? '🎉' : pct >= 50 ? '📚' : '💪';
  const isNeedsLowerTest = pct < 40 || result.recommendedLevel !== result.targetLevel;

  // Circle progress for overall score
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (pct / 100) * circumference;

  const wrongCount = result.questionReviews ? result.questionReviews.filter(q => !q.isCorrect).length : 0;
  const correctCount = result.questionReviews ? result.questionReviews.filter(q => q.isCorrect).length : 0;

  const filteredReviews = (result.questionReviews || []).filter(q => {
    if (filterTab === 'wrong') return !q.isCorrect;
    if (filterTab === 'correct') return q.isCorrect;
    return true;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
      {/* ── SCORE SUMMARY ─────────────────────────────────────────── */}
      <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', alignItems: 'stretch' }}>
        {/* Score circle */}
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          padding: '24px 28px', borderRadius: 20, background: '#fff',
          border: '2px solid #e2dbce', flexShrink: 0, minWidth: 160,
        }}>
          <svg width={120} height={120} style={{ transform: 'rotate(-90deg)' }}>
            <circle cx={60} cy={60} r={radius} fill="none" stroke="#e2dbce" strokeWidth={9} />
            <circle
              cx={60} cy={60} r={radius} fill="none"
              stroke={scoreColor} strokeWidth={9}
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              style={{ transition: 'stroke-dashoffset 1s ease' }}
            />
          </svg>
          <div style={{ marginTop: -108, marginBottom: 88, textAlign: 'center', position: 'relative', zIndex: 1 }}>
            <div style={{ fontSize: 28, fontWeight: 800, color: scoreColor }}>{pct.toFixed(0)}%</div>
            <div style={{ fontSize: 12, color: '#8c827b' }}>{result.score}/{result.totalQuestions} câu</div>
          </div>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#231815', textAlign: 'center' }}>
            Bài Test {result.targetLevel}
          </div>
        </div>

        {/* Feedback & recommendation */}
        <div style={{ flex: 1, minWidth: 200 }}>
          <div style={{
            padding: '20px 22px', borderRadius: 16,
            background: `${scoreColor}0d`, border: `1.5px solid ${scoreColor}33`,
            marginBottom: 14,
          }}>
            <p style={{ fontSize: 14, color: '#231815', lineHeight: 1.75, margin: 0 }}>
              {scoreEmoji} {result.overallFeedback}
            </p>
          </div>
          <div style={{
            padding: '14px 18px', borderRadius: 14, background: '#fff',
            border: '1.5px solid #e2dbce', display: 'flex', alignItems: 'center', gap: 12,
          }}>
            <span style={{ fontSize: 20 }}>🎯</span>
            <div>
              <div style={{ fontSize: 12, color: '#8c827b', marginBottom: 2 }}>Đề xuất phù hợp</div>
              <div style={{ fontWeight: 800, fontSize: 17, color: LEVEL_COLOR[result.recommendedLevel] }}>
                Trình độ {result.recommendedLevel}
              </div>
            </div>
          </div>
          <p style={{ fontSize: 13, color: '#5a5450', marginTop: 10, lineHeight: 1.6 }}>
            💡 {result.actionSuggestion}
          </p>
        </div>
      </div>

      {/* ── DIAGNOSTIC REASON CARD ─────────────────────────────────── */}
      {(result.diagnosticSummary || result.levelDropReason) && (
        <div style={{
          padding: '20px 22px', borderRadius: 18,
          background: pct < 40 ? '#fff5f5' : '#f7f5f0',
          border: pct < 40 ? '1.5px solid #f87171' : '1.5px solid #e2dbce',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
            <span style={{ fontSize: 20 }}>🔬</span>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: '#231815', margin: 0 }}>
              Phân Tích Chẩn Đoán Lỗi Sai & Đánh Giá Năng Lực
            </h3>
          </div>
          {result.diagnosticSummary && (
            <p style={{ fontSize: 13, color: '#5a5450', fontWeight: 600, marginBottom: 8, lineHeight: 1.6 }}>
              📌 {result.diagnosticSummary}
            </p>
          )}
          {result.levelDropReason && (
            <p style={{ fontSize: 13, color: '#231815', lineHeight: 1.7, margin: 0 }}>
              {result.levelDropReason}
            </p>
          )}
          {isNeedsLowerTest && onTakeTestLevel && (
            <div style={{ marginTop: 14 }}>
              <button
                id="diagnostic-take-test-btn"
                onClick={() => onTakeTestLevel(result.recommendedLevel)}
                style={{
                  padding: '10px 18px', borderRadius: 10, border: 'none',
                  background: '#c01538', color: '#fff', fontWeight: 700, fontSize: 13, cursor: 'pointer',
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  boxShadow: '0 4px 12px rgba(192,21,56,0.2)',
                }}
              >
                📝 Làm bài test {result.recommendedLevel} để đo lại chính xác
              </button>
            </div>
          )}
        </div>
      )}

      {/* ── SKILL BREAKDOWN CHART ─────────────────────────────────── */}
      {result.sectionScores && Object.keys(result.sectionScores).length > 0 && (
        <div style={{ padding: '20px 22px', borderRadius: 18, background: '#fff', border: '1.5px solid #e2dbce' }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: '#5a5450', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 18 }}>
            Phân Tích Kỹ Năng
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {(Object.entries(result.sectionScores) as [Section, any][]).map(([section, score]) => (
              <div key={section}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: '#231815' }}>
                    {SECTION_EMOJI[section]} {SECTION_LABEL[section]}
                  </span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: scoreColor }}>
                    {score.correct}/{score.total} ({score.percent.toFixed(0)}%)
                  </span>
                </div>
                <div style={{ height: 8, background: '#f1ede6', borderRadius: 99, overflow: 'hidden' }}>
                  <div style={{
                    height: '100%',
                    width: `${score.percent}%`,
                    background: score.percent >= 80 ? '#2b5f43' : score.percent >= 50 ? '#7c5c2e' : '#ba1a1a',
                    borderRadius: 99,
                    transition: 'width 0.8s ease',
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── LEVEL CONFIRMATION ────────────────────────────────────── */}
      <div style={{ padding: '20px 22px', borderRadius: 18, background: '#f7f5f0', border: '1.5px solid #e2dbce' }}>
        <h3 style={{ fontSize: 14, fontWeight: 700, color: '#5a5450', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 14 }}>
          Xác nhận trình độ học tập của bạn
        </h3>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
          {(['N5', 'N4', 'N3', 'N2', 'N1'] as JlptLevel[]).map(lv => (
            <button
              key={lv}
              id={`confirm-level-${lv}`}
              onClick={() => setChosenLevel(lv)}
              style={{
                padding: '8px 18px', borderRadius: 10, fontWeight: 700, fontSize: 14, cursor: 'pointer',
                border: chosenLevel === lv ? `2.5px solid ${LEVEL_COLOR[lv]}` : '2px solid #e2dbce',
                background: chosenLevel === lv ? `${LEVEL_COLOR[lv]}12` : '#fff',
                color: chosenLevel === lv ? LEVEL_COLOR[lv] : '#5a5450',
                transition: 'all 0.15s',
              }}
            >
              {lv} {lv === result.recommendedLevel ? '⭐' : ''}
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button
            id="confirm-level-btn"
            onClick={() => onConfirm(chosenLevel)}
            disabled={isConfirming}
            style={{
              flex: 1, padding: '12px 0', borderRadius: 12, border: 'none',
              background: isConfirming ? '#8c827b' : '#c01538',
              color: '#fff', fontWeight: 700, fontSize: 15, cursor: isConfirming ? 'wait' : 'pointer',
              transition: 'background 0.2s',
            }}
          >
            {isConfirming ? '⏳ Đang lưu...' : `🎌 Bắt đầu học ${chosenLevel}!`}
          </button>
          <button
            id="retry-test-btn"
            onClick={onRetry}
            disabled={isConfirming}
            style={{
              padding: '12px 20px', borderRadius: 12,
              border: '1.5px solid #e2dbce', background: '#fff',
              color: '#5a5450', fontWeight: 600, fontSize: 14, cursor: 'pointer',
            }}
          >
            Làm lại {result.targetLevel}
          </button>
        </div>
      </div>

      {/* ── ANSWER ACCORDION WITH FILTER TABS ─────────────────────── */}
      {result.questionReviews && result.questionReviews.length > 0 && (
        <div style={{ borderRadius: 18, border: '1.5px solid #e2dbce', overflow: 'hidden' }}>
          <div style={{
            padding: '16px 22px', background: '#f7f5f0', borderBottom: '1px solid #e2dbce',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12,
          }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: '#5a5450', textTransform: 'uppercase', letterSpacing: '0.06em', margin: 0 }}>
              📋 Đáp Án Chi Tiết ({filteredReviews.length}/{result.questionReviews.length} câu)
            </h3>
            {/* Filter buttons */}
            <div style={{ display: 'flex', gap: 6 }}>
              <button
                id="filter-all-btn"
                onClick={() => setFilterTab('all')}
                style={{
                  padding: '5px 12px', borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: 'pointer',
                  border: filterTab === 'all' ? '1.5px solid #231815' : '1px solid #e2dbce',
                  background: filterTab === 'all' ? '#231815' : '#fff',
                  color: filterTab === 'all' ? '#fff' : '#5a5450',
                }}
              >
                Tất cả ({result.questionReviews.length})
              </button>
              <button
                id="filter-wrong-btn"
                onClick={() => setFilterTab('wrong')}
                style={{
                  padding: '5px 12px', borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: 'pointer',
                  border: filterTab === 'wrong' ? '1.5px solid #ba1a1a' : '1px solid #e2dbce',
                  background: filterTab === 'wrong' ? '#ba1a1a' : '#fff',
                  color: filterTab === 'wrong' ? '#fff' : '#ba1a1a',
                }}
              >
                ❌ Câu sai ({wrongCount})
              </button>
              <button
                id="filter-correct-btn"
                onClick={() => setFilterTab('correct')}
                style={{
                  padding: '5px 12px', borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: 'pointer',
                  border: filterTab === 'correct' ? '1.5px solid #2b5f43' : '1px solid #e2dbce',
                  background: filterTab === 'correct' ? '#2b5f43' : '#fff',
                  color: filterTab === 'correct' ? '#fff' : '#2b5f43',
                }}
              >
                ✓ Câu đúng ({correctCount})
              </button>
            </div>
          </div>

          <div style={{ background: '#fff' }}>
            {filteredReviews.length === 0 ? (
              <div style={{ padding: 24, textAlign: 'center', color: '#8c827b', fontSize: 13 }}>
                Không có câu hỏi nào khớp với bộ lọc này.
              </div>
            ) : (
              filteredReviews.map((review, idx) => {
                const isOpen = openIdx === idx;
                return (
                  <div key={review.questionId} style={{ borderBottom: idx < filteredReviews.length - 1 ? '1px solid #f1ede6' : 'none' }}>
                    {/* Accordion header */}
                    <button
                      id={`answer-accordion-${idx}`}
                      onClick={() => setOpenIdx(isOpen ? null : idx)}
                      style={{
                        width: '100%', padding: '14px 22px', display: 'flex', alignItems: 'center',
                        gap: 12, background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left',
                        transition: 'background 0.15s',
                      }}
                      onMouseEnter={e => (e.currentTarget.style.background = '#f7f5f0')}
                      onMouseLeave={e => (e.currentTarget.style.background = 'none')}
                    >
                      <span style={{
                        width: 26, height: 26, borderRadius: 8, flexShrink: 0,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 14, fontWeight: 700,
                        background: review.isCorrect ? '#2b5f4318' : '#ba1a1a18',
                        color: review.isCorrect ? '#2b5f43' : '#ba1a1a',
                      }}>
                        {review.isCorrect ? '✓' : '✗'}
                      </span>
                      <span style={{ flex: 1, fontSize: 13, color: '#231815', lineHeight: 1.5, fontFamily: '"Noto Sans JP", sans-serif' }}>
                        <b style={{ color: '#8c827b', marginRight: 6 }}>Câu {idx + 1}.</b>
                        {review.questionText.split('\n')[0].slice(0, 80)}{review.questionText.length > 80 ? '…' : ''}
                      </span>
                      <span style={{ fontSize: 12, color: '#8c827b', transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}>▼</span>
                    </button>

                    {/* Accordion body */}
                    {isOpen && (
                      <div style={{ padding: '0 22px 18px', borderTop: '1px solid #f1ede6' }}>
                        {/* Full question */}
                        <p style={{ fontSize: 14, color: '#231815', lineHeight: 1.75, marginBottom: 14, fontFamily: '"Noto Sans JP", sans-serif', whiteSpace: 'pre-wrap', paddingTop: 12 }}>
                          {review.questionText}
                        </p>
                        {/* Options */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 7, marginBottom: 14 }}>
                          {review.options.map((opt, oi) => {
                            const isCorrect = oi === review.correctOption;
                            const isChosen = oi === review.chosenOption;
                            let bg = '#f7f5f0', border = '#e2dbce', color = '#5a5450';
                            if (isCorrect) { bg = '#2b5f4312'; border = '#2b5f43'; color = '#2b5f43'; }
                            else if (isChosen && !isCorrect) { bg = '#ba1a1a10'; border = '#ba1a1a'; color = '#ba1a1a'; }
                            return (
                              <div key={oi} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 14px', borderRadius: 10, background: bg, border: `1.5px solid ${border}` }}>
                                <span style={{ fontWeight: 700, fontSize: 12, color, flexShrink: 0 }}>
                                  {['A', 'B', 'C', 'D'][oi]}
                                </span>
                                <span style={{ fontSize: 13, color, fontFamily: '"Noto Sans JP", sans-serif', flex: 1 }}>{opt}</span>
                                {isCorrect && <span style={{ fontSize: 12, color: '#2b5f43', fontWeight: 700 }}>✓ Đúng</span>}
                                {isChosen && !isCorrect && <span style={{ fontSize: 12, color: '#ba1a1a', fontWeight: 700 }}>✗ Bạn chọn</span>}
                              </div>
                            );
                          })}
                        </div>
                        {/* Explanation */}
                        {review.explanation && (
                          <div style={{ padding: '12px 16px', borderRadius: 12, background: '#f1ede6', border: '1px solid #d9cfbe' }}>
                            <p style={{ fontSize: 12, fontWeight: 700, color: '#5a5450', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6 }}>💡 Giải thích</p>
                            <p style={{ fontSize: 13, color: '#231815', lineHeight: 1.7, margin: 0 }}>{review.explanation}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}
