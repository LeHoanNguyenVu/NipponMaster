import { BarChart3, BookOpen, Headphones, ArrowUpRight } from 'lucide-react';
import type { ScreenType } from '../../App';

interface SkillMatrixSectionProps {
  levelDisplay: string;
  kanjiLearned: number;
  kanjiTotal: number;
  grammarLearned: number;
  grammarTotal: number;
  listeningCompleted: number;
  listeningTotal: number;
  onNavigate: (screen: ScreenType) => void;
}

export default function SkillMatrixSection({
  levelDisplay,
  kanjiLearned,
  kanjiTotal,
  grammarLearned,
  grammarTotal,
  listeningCompleted,
  listeningTotal,
  onNavigate,
}: SkillMatrixSectionProps) {
  const grammarPct = grammarTotal > 0 ? Math.min(100, Math.round((grammarLearned / grammarTotal) * 100)) : 0;
  const kanjiPct = kanjiTotal > 0 ? Math.min(100, Math.round((kanjiLearned / kanjiTotal) * 100)) : 0;
  const listeningPct = listeningTotal > 0 ? Math.min(100, Math.round((listeningCompleted / listeningTotal) * 100)) : 0;

  return (
    <section className="space-y-3.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BarChart3 size={20} className="text-primary" />
          <h2 className="text-lg md:text-xl font-extrabold text-on-surface tracking-tight">
            Tiến Độ Các Chức Năng Học Tập ({levelDisplay})
          </h2>
        </div>
        <span className="text-xs font-semibold text-outline">Bấm vào thẻ để chuyển đến bài học</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Bảng Chữ Cái & Âm Đọc */}
        <div 
          onClick={() => onNavigate('beginner')}
          className="group p-5 rounded-3xl bg-gradient-to-br from-emerald-500/10 via-surface-container-lowest to-surface-container-lowest border border-emerald-500/30 hover:border-emerald-500 hover:shadow-lg transition-all cursor-pointer space-y-3 relative overflow-hidden"
        >
          <div className="flex items-center justify-between">
            <div className="w-11 h-11 rounded-2xl bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 flex items-center justify-center font-bold text-lg shadow-2xs border border-emerald-500/30">
              あ
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-black text-emerald-600 dark:text-emerald-400">100%</span>
              <ArrowUpRight size={15} className="text-outline group-hover:text-emerald-500 transition-colors" />
            </div>
          </div>
          <div>
            <h3 className="text-sm font-bold text-on-surface group-hover:text-emerald-600 transition-colors">
              Bảng Chữ Cái & Nhập Môn
            </h3>
            <p className="text-xs text-outline mt-0.5">Hiragana, Katakana & Biến âm</p>
          </div>
          <div className="w-full h-1.5 rounded-full bg-surface-container-high overflow-hidden">
            <div className="h-full rounded-full bg-emerald-500 transition-all duration-500" style={{ width: '100%' }} />
          </div>
        </div>

        {/* Card 2: Chữ Hán / 214 Bộ Thủ */}
        <div 
          onClick={() => onNavigate('kanji')}
          className="group p-5 rounded-3xl bg-gradient-to-br from-amber-500/10 via-surface-container-lowest to-surface-container-lowest border border-amber-500/30 hover:border-amber-500 hover:shadow-lg transition-all cursor-pointer space-y-3 relative overflow-hidden"
        >
          <div className="flex items-center justify-between">
            <div className="w-11 h-11 rounded-2xl bg-amber-500/15 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold text-lg shadow-2xs border border-amber-500/30">
              漢
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-black text-amber-600 dark:text-amber-400">{kanjiPct}%</span>
              <ArrowUpRight size={15} className="text-outline group-hover:text-amber-500 transition-colors" />
            </div>
          </div>
          <div>
            <h3 className="text-sm font-bold text-on-surface group-hover:text-amber-600 transition-colors">
              Chữ Hán & 214 Bộ Thủ
            </h3>
            <p className="text-xs text-outline mt-0.5">{kanjiLearned} / {kanjiTotal} bộ thủ đã thuộc</p>
          </div>
          <div className="w-full h-1.5 rounded-full bg-surface-container-high overflow-hidden">
            <div className="h-full rounded-full bg-amber-500 transition-all duration-500" style={{ width: `${Math.max(6, kanjiPct)}%` }} />
          </div>
        </div>

        {/* Card 3: Ngữ Pháp */}
        <div 
          onClick={() => onNavigate('grammar')}
          className="group p-5 rounded-3xl bg-gradient-to-br from-primary/10 via-surface-container-lowest to-surface-container-lowest border border-primary/30 hover:border-primary hover:shadow-lg transition-all cursor-pointer space-y-3 relative overflow-hidden"
        >
          <div className="flex items-center justify-between">
            <div className="w-11 h-11 rounded-2xl bg-primary/15 text-primary flex items-center justify-center font-bold shadow-2xs border border-primary/30">
              <BookOpen size={20} />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-black text-primary">{grammarPct}%</span>
              <ArrowUpRight size={15} className="text-outline group-hover:text-primary transition-colors" />
            </div>
          </div>
          <div>
            <h3 className="text-sm font-bold text-on-surface group-hover:text-primary transition-colors">
              Ngữ Pháp Trọng Tâm
            </h3>
            <p className="text-xs text-outline mt-0.5">{grammarLearned} / {grammarTotal} bài học đã xem</p>
          </div>
          <div className="w-full h-1.5 rounded-full bg-surface-container-high overflow-hidden">
            <div className="h-full rounded-full bg-primary transition-all duration-500" style={{ width: `${Math.max(6, grammarPct)}%` }} />
          </div>
        </div>

        {/* Card 4: Luyện Nghe Tình Huống */}
        <div 
          onClick={() => onNavigate('listening')}
          className="group p-5 rounded-3xl bg-gradient-to-br from-sky-500/10 via-surface-container-lowest to-surface-container-lowest border border-sky-500/30 hover:border-sky-500 hover:shadow-lg transition-all cursor-pointer space-y-3 relative overflow-hidden"
        >
          <div className="flex items-center justify-between">
            <div className="w-11 h-11 rounded-2xl bg-sky-500/15 text-sky-600 dark:text-sky-400 flex items-center justify-center font-bold shadow-2xs border border-sky-500/30">
              <Headphones size={20} />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-black text-sky-600 dark:text-sky-400">{listeningPct}%</span>
              <ArrowUpRight size={15} className="text-outline group-hover:text-sky-500 transition-colors" />
            </div>
          </div>
          <div>
            <h3 className="text-sm font-bold text-on-surface group-hover:text-sky-600 transition-colors">
              Luyện Nghe & Shadowing
            </h3>
            <p className="text-xs text-outline mt-0.5">{listeningCompleted} / {listeningTotal} bài nghe hoàn thành</p>
          </div>
          <div className="w-full h-1.5 rounded-full bg-surface-container-high overflow-hidden">
            <div className="h-full rounded-full bg-sky-500 transition-all duration-500" style={{ width: `${Math.max(6, listeningPct)}%` }} />
          </div>
        </div>
      </div>
    </section>
  );
}
