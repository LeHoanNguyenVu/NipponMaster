import { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { placementApi } from '../api/placementApi';
import type { JlptLevel, PlacementTestData, PlacementResult } from '../api/placementApi';
import LevelSelector from '../components/onboarding/LevelSelector';
import LevelTestSelector from '../components/onboarding/LevelTestSelector';
import QuizPlayer from '../components/onboarding/QuizPlayer';
import PlacementResultView from '../components/onboarding/PlacementResultView';

type Step =
  | 'hub'               // Trang chọn Option 1 hoặc 2
  | 'level-select'      // Option 1: Chọn trực tiếp
  | 'test-level-pick'   // Option 2 bước 1: Chọn cấp độ muốn test
  | 'quiz'              // Option 2 bước 2: Làm bài
  | 'result'            // Option 2 bước 3: Xem kết quả + đáp án
  | 'confirming';       // Đang gọi API hoàn tất onboarding

interface OnboardingScreenProps {
  onDone: () => void;
}

export default function OnboardingScreen({ onDone }: OnboardingScreenProps) {
  const { user, completeOnboarding } = useAuthStore();
  const [step, setStep] = useState<Step>('hub');
  const [testData, setTestData] = useState<PlacementTestData | null>(null);
  const [testLevel, setTestLevel] = useState<JlptLevel | null>(null);
  const [resultData, setResultData] = useState<PlacementResult | null>(null);
  const [loadingTest, setLoadingTest] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ── Option 1: Chọn trực tiếp ──────────────────────────────────────────────
  const handleDirectSelect = async (level: JlptLevel) => {
    setError(null);
    setStep('confirming');
    try {
      await completeOnboarding(level);
      onDone();
    } catch (err: any) {
      const msg = err?.message || 'Có lỗi xảy ra khi lưu trình độ. Vui lòng thử lại!';
      setError(msg);
      setStep('level-select');
    }
  };

  // ── Option 2: Tải đề thi theo level ───────────────────────────────────────
  const handleLoadTest = async (level: JlptLevel) => {
    setLoadingTest(true);
    setError(null);
    setTestLevel(level);
    try {
      const data = await placementApi.getQuestions(level);
      if (!data || !data.questions || data.questions.length === 0) {
        throw new Error('Đề thi chưa có câu hỏi nào. Vui lòng chọn cấp độ khác!');
      }
      setTestData(data);
      setStep('quiz');
    } catch (err: any) {
      const msg = err?.message || 'Không thể tải đề thi. Vui lòng thử lại!';
      setError(msg);
      setStep('test-level-pick');
    } finally {
      setLoadingTest(false);
    }
  };

  // ── Option 2: Nộp bài → hiện kết quả ────────────────────────────────────
  const handleQuizSubmit = async (answers: { questionId: number; chosenOption: number }[]) => {
    if (!testLevel) return;
    setSubmitting(true);
    setError(null);
    try {
      const result = await placementApi.submitTest(testLevel, answers);
      setResultData(result);
      setStep('result');
    } catch {
      setError('Không thể nộp bài. Vui lòng thử lại!');
    } finally {
      setSubmitting(false);
    }
  };

  // ── Xác nhận level sau khi xem kết quả ───────────────────────────────────
  const handleConfirmLevel = async (level: JlptLevel) => {
    setConfirming(true);
    setError(null);
    try {
      await completeOnboarding(level);
      onDone();
    } catch {
      setError('Có lỗi khi lưu trình độ. Vui lòng thử lại!');
      setConfirming(false);
    }
  };

  const firstName = user?.username?.split(' ').pop() || 'bạn';

  return (
    <div style={{
      minHeight: '100vh', background: 'linear-gradient(135deg, #f7f5f0 0%, #f1ede6 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24,
    }}>
      <div style={{
        width: '100%', maxWidth: 680, background: '#fff',
        borderRadius: 24, boxShadow: '0 20px 60px rgba(35,24,21,0.10)',
        padding: 40, position: 'relative', overflow: 'hidden',
      }}>
        {/* Decorative corner */}
        <div style={{
          position: 'absolute', top: 0, right: 0,
          width: 120, height: 120,
          background: 'linear-gradient(135deg, #c0153812, #fff0)',
          borderRadius: '0 24px 0 120px',
        }} />

        {/* Logo & brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 28 }}>
          <div style={{ width: 38, height: 38, background: '#c01538', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 900, fontSize: 18, fontFamily: '"Noto Sans JP"' }}>
            日
          </div>
          <span style={{ fontWeight: 800, fontSize: 18, color: '#231815', letterSpacing: '-0.02em' }}>NipponMaster</span>
        </div>

        {/* Error */}
        {error && (
          <div style={{ background: '#ffdad6', color: '#93000a', padding: '10px 16px', borderRadius: 10, marginBottom: 16, fontSize: 14 }}>
            ⚠️ {error}
          </div>
        )}

        {/* ── HUB ────────────────────────────────────────────────────── */}
        {step === 'hub' && (
          <div>
            <h1 style={{ fontSize: 26, fontWeight: 800, color: '#231815', lineHeight: 1.3, marginBottom: 8 }}>
              Chào mừng, {firstName}! 🎌
            </h1>
            <p style={{ color: '#5a5450', fontSize: 15, marginBottom: 32, lineHeight: 1.7 }}>
              Trước khi bắt đầu hành trình học tiếng Nhật, hãy cho chúng tôi biết trình độ của bạn để cá nhân hóa lộ trình học tập nhé.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {/* Option 1 */}
              <button
                id="onboarding-option-direct"
                onClick={() => setStep('level-select')}
                style={{
                  display: 'flex', alignItems: 'flex-start', gap: 16,
                  padding: '20px 22px', borderRadius: 16, cursor: 'pointer',
                  border: '2px solid #e2dbce', background: '#fafaf8',
                  textAlign: 'left', transition: 'all 0.18s ease',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = '#c01538';
                  (e.currentTarget as HTMLButtonElement).style.background = '#fff1f2';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = '#e2dbce';
                  (e.currentTarget as HTMLButtonElement).style.background = '#fafaf8';
                }}
              >
                <span style={{ fontSize: 32, flexShrink: 0, marginTop: 2 }}>🎯</span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 16, color: '#231815', marginBottom: 4 }}>
                    Tôi biết trình độ của mình
                  </div>
                  <div style={{ fontSize: 13, color: '#5a5450', lineHeight: 1.6 }}>
                    Chọn thẳng cấp độ JLPT phù hợp (N5 → N1) và bắt đầu học ngay.
                  </div>
                </div>
              </button>

              {/* Option 2 */}
              <button
                id="onboarding-option-test"
                onClick={() => setStep('test-level-pick')}
                style={{
                  display: 'flex', alignItems: 'flex-start', gap: 16,
                  padding: '20px 22px', borderRadius: 16, cursor: 'pointer',
                  border: '2px solid #c01538', background: '#fff1f2',
                  textAlign: 'left', transition: 'all 0.18s ease',
                  boxShadow: '0 4px 16px rgba(192,21,56,0.10)',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLButtonElement).style.background = '#ffe4e8';
                  (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)';
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 8px 24px rgba(192,21,56,0.18)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLButtonElement).style.background = '#fff1f2';
                  (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 4px 16px rgba(192,21,56,0.10)';
                }}
              >
                <span style={{ fontSize: 32, flexShrink: 0, marginTop: 2 }}>📝</span>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    <span style={{ fontWeight: 700, fontSize: 16, color: '#231815' }}>Làm bài kiểm tra trình độ JLPT</span>
                    <span style={{ fontSize: 11, fontWeight: 700, color: '#c01538', background: '#c0153818', padding: '2px 8px', borderRadius: 99 }}>Khuyên dùng</span>
                  </div>
                  <div style={{ fontSize: 13, color: '#5a5450', lineHeight: 1.6 }}>
                    Làm bài thi thử chuẩn JLPT theo từng cấp độ. Nhận đánh giá năng lực và đề xuất lộ trình chính xác nhất.
                  </div>
                </div>
              </button>
            </div>
          </div>
        )}

        {/* ── DIRECT LEVEL SELECT ─────────────────────────────────────── */}
        {step === 'level-select' && (
          <>
            <button
              id="onboarding-back-to-hub"
              onClick={() => setStep('hub')}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#8c827b', fontSize: 14, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 6 }}
            >
              ← Quay lại
            </button>
            <LevelSelector onSelect={handleDirectSelect} isLoading={false} />
          </>
        )}

        {/* ── TEST LEVEL PICKER ───────────────────────────────────────── */}
        {step === 'test-level-pick' && (
          <>
            <button
              id="onboarding-back-to-hub-2"
              onClick={() => setStep('hub')}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#8c827b', fontSize: 14, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 6 }}
            >
              ← Quay lại
            </button>
            {loadingTest ? (
              <div style={{ textAlign: 'center', padding: '60px 0', color: '#5a5450' }}>
                <div style={{ fontSize: 36, marginBottom: 12 }}>⏳</div>
                <p style={{ fontSize: 15 }}>Đang tải đề thi...</p>
              </div>
            ) : (
              <LevelTestSelector onSelect={handleLoadTest} />
            )}
          </>
        )}

        {/* ── QUIZ ────────────────────────────────────────────────────── */}
        {step === 'quiz' && testData && (
          <QuizPlayer
            level={testData.level}
            questions={testData.questions}
            timeLimitMinutes={testData.timeLimitMinutes}
            onSubmit={handleQuizSubmit}
            isSubmitting={submitting}
          />
        )}

        {/* ── RESULT VIEW ─────────────────────────────────────────────── */}
        {step === 'result' && resultData && (
          <>
            <div style={{ marginBottom: 20 }}>
              <h1 style={{ fontSize: 22, fontWeight: 800, color: '#231815', marginBottom: 6 }}>Kết Quả Kiểm Tra Trình Độ 📊</h1>
              <p style={{ color: '#5a5450', fontSize: 14 }}>Xem lại đáp án, chọn trình độ phù hợp và bắt đầu học ngay!</p>
            </div>
            <PlacementResultView
              result={resultData}
              onConfirm={handleConfirmLevel}
              onRetry={() => { setResultData(null); setStep('test-level-pick'); }}
              onTakeTestLevel={handleLoadTest}
              isConfirming={confirming}
            />
          </>
        )}

        {/* ── CONFIRMING ──────────────────────────────────────────────── */}
        {step === 'confirming' && (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🎌</div>
            <p style={{ fontSize: 16, fontWeight: 600, color: '#231815', marginBottom: 8 }}>Đang thiết lập hồ sơ học tập...</p>
            <p style={{ fontSize: 13, color: '#5a5450' }}>Chỉ mất vài giây thôi!</p>
          </div>
        )}
      </div>
    </div>
  );
}
