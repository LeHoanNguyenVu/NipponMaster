import type { JlptLevel } from '../../api/placementApi';
import { useTranslation } from 'react-i18next';

interface LevelTestSelectorProps {
  onSelect: (level: JlptLevel) => void;
}

const LEVELS: { level: JlptLevel; defaultLabel: string; questions: number; minutes: number; defaultDesc: string; emoji: string }[] = [
  { level: 'N5', defaultLabel: 'N5 — Cơ Bản', questions: 15, minutes: 15, defaultDesc: 'Từ vựng Hiragana/Katakana, Kanji sơ cấp, Trợ từ cơ bản', emoji: '🟢' },
  { level: 'N4', defaultLabel: 'N4 — Sơ Cấp', questions: 15, minutes: 15, defaultDesc: 'Ngữ pháp kính ngữ, Thể khả năng, Từ vựng ghép', emoji: '🔵' },
  { level: 'N3', defaultLabel: 'N3 — Trung Cấp', questions: 15, minutes: 20, defaultDesc: 'Cấu trúc câu phức, Từ nối, Đọc hiểu ngắn', emoji: '🟡' },
  { level: 'N2', defaultLabel: 'N2 — Cao Cấp', questions: 15, minutes: 25, defaultDesc: 'Từ vựng chuyên ngành, Ngữ pháp tinh tế, Bài đọc trung bình', emoji: '🟠' },
  { level: 'N1', defaultLabel: 'N1 — Thượng Thừa', questions: 15, minutes: 30, defaultDesc: 'Thành ngữ, Kanji hiếm, Ngữ pháp văn học', emoji: '🔴' },
];

export default function LevelTestSelector({ onSelect }: LevelTestSelectorProps) {
  const { t } = useTranslation(['onboarding', 'common']);

  return (
    <div>
      <h2 style={{ fontFamily: 'var(--font-ui)', fontSize: 20, fontWeight: 600, color: '#231815', marginBottom: 8 }}>
        {t('onboarding:levelTest.title', 'Chọn cấp độ bạn muốn kiểm tra')}
      </h2>
      <p style={{ color: '#5a5450', fontSize: 14, marginBottom: 24 }}>
        {t('onboarding:levelTest.subtitle', 'Mỗi cấp độ có bộ đề thi riêng. Chọn đúng cấp độ bạn đang hướng tới để nhận đánh giá chính xác nhất.')}
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12 }}>
        {LEVELS.map(({ level, defaultLabel, questions, minutes, defaultDesc, emoji }) => (
          <button
            key={level}
            id={`test-level-${level}`}
            onClick={() => onSelect(level)}
            style={{
              display: 'flex', flexDirection: 'column', gap: 8,
              padding: '18px 16px', borderRadius: 16, cursor: 'pointer',
              border: '2px solid #e2dbce', background: '#fff',
              textAlign: 'left', transition: 'all 0.18s ease',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = '#c01538';
              (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-3px)';
              (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 8px 24px rgba(192,21,56,0.12)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = '#e2dbce';
              (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
              (e.currentTarget as HTMLButtonElement).style.boxShadow = 'none';
            }}
          >
            <div style={{ fontSize: 28 }}>{emoji}</div>
            <div style={{ fontWeight: 700, fontSize: 15, color: '#231815' }}>
              {t(`onboarding:levelTest.levels.${level}.label`, defaultLabel)}
            </div>
            <div style={{ fontSize: 12, color: '#5a5450', lineHeight: 1.5 }}>
              {t(`onboarding:levelTest.levels.${level}.desc`, defaultDesc)}
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 4, flexWrap: 'wrap' }}>
              <span style={{ fontSize: 11, fontWeight: 600, color: '#c01538', background: '#fff1f2', padding: '3px 9px', borderRadius: 99 }}>
                {t('onboarding:levelTest.questionsCount', { count: questions, defaultValue: `${questions} câu` })}
              </span>
              <span style={{ fontSize: 11, fontWeight: 600, color: '#5a5450', background: '#f1ede6', padding: '3px 9px', borderRadius: 99 }}>
                {t('onboarding:levelTest.minutesCount', { count: minutes, defaultValue: `⏱ ${minutes} phút` })}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
