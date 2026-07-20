import { JlptLevel } from '../../api/placementApi';

interface LevelTestSelectorProps {
  onSelect: (level: JlptLevel) => void;
}

const LEVELS: { level: JlptLevel; label: string; questions: number; minutes: number; desc: string; emoji: string }[] = [
  { level: 'N5', label: 'N5 — Cơ Bản', questions: 15, minutes: 15, desc: 'Từ vựng Hiragana/Katakana, Kanji sơ cấp, Trợ từ cơ bản', emoji: '🟢' },
  { level: 'N4', label: 'N4 — Sơ Cấp', questions: 20, minutes: 20, desc: 'Ngữ pháp kính ngữ, Thể khả năng, Từ vựng ghép', emoji: '🔵' },
  { level: 'N3', label: 'N3 — Trung Cấp', questions: 20, minutes: 25, desc: 'Cấu trúc câu phức, Từ nối, Đọc hiểu ngắn', emoji: '🟡' },
  { level: 'N2', label: 'N2 — Cao Cấp', questions: 25, minutes: 30, desc: 'Từ vựng chuyên ngành, Ngữ pháp tinh tế, Bài đọc trung bình', emoji: '🟠' },
  { level: 'N1', label: 'N1 — Thượng Thừa', questions: 25, minutes: 30, desc: 'Thành ngữ, Kanji hiếm, Ngữ pháp văn học', emoji: '🔴' },
];

export default function LevelTestSelector({ onSelect }: LevelTestSelectorProps) {
  return (
    <div>
      <h2 style={{ fontFamily: 'Geist, sans-serif', fontSize: 20, fontWeight: 600, color: '#231815', marginBottom: 8 }}>
        Chọn cấp độ bạn muốn kiểm tra
      </h2>
      <p style={{ color: '#5a5450', fontSize: 14, marginBottom: 24 }}>
        Mỗi cấp độ có bộ đề thi riêng. Chọn đúng cấp độ bạn đang hướng tới để nhận đánh giá chính xác nhất.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12 }}>
        {LEVELS.map(({ level, label, questions, minutes, desc, emoji }) => (
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
            <div style={{ fontWeight: 700, fontSize: 15, color: '#231815' }}>{label}</div>
            <div style={{ fontSize: 12, color: '#5a5450', lineHeight: 1.5 }}>{desc}</div>
            <div style={{ display: 'flex', gap: 8, marginTop: 4, flexWrap: 'wrap' }}>
              <span style={{ fontSize: 11, fontWeight: 600, color: '#c01538', background: '#fff1f2', padding: '3px 9px', borderRadius: 99 }}>
                {questions} câu
              </span>
              <span style={{ fontSize: 11, fontWeight: 600, color: '#5a5450', background: '#f1ede6', padding: '3px 9px', borderRadius: 99 }}>
                ⏱ {minutes} phút
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
