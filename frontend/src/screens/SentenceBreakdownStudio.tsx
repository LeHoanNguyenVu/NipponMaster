import { useState, useEffect } from 'react';
import { Sparkles, Info, CheckCircle2, HelpCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { aiStudioApi, type BreakdownResponse, type SyntaxToken } from '../api/aiStudioApi';

const SAMPLE_PASSAGES = [
  { id: 'n5', defaultLabel: 'Sơ cấp N5', text: '私は毎日日本語を勉強します。' },
  { id: 'n4', defaultLabel: 'Trung cấp N4', text: '来週のテストのために、図書館で友達と一緒に勉強する予定です。' },
  { id: 'n3', defaultLabel: 'Trung cấp N3', text: '日本の文化に興味があるので、将来は日本で仕事をしたいと思っています。' },
  { id: 'n2n1', defaultLabel: 'Cao cấp N2-N1', text: '経済のグローバル化に伴い、異文化コミュニケーション能力の重要性がますます高まっている。' },
];

const ROLE_BADGE_STYLE: Record<string, { bg: string; text: string; border: string; defaultLabel: string }> = {
  SUBJECT: { bg: 'bg-blue-500/10', text: 'text-blue-600', border: 'border-blue-500/30', defaultLabel: '主語 (Chủ ngữ)' },
  PREDICATE: { bg: 'bg-rose-500/10', text: 'text-rose-600', border: 'border-rose-500/30', defaultLabel: '述語 (Vị ngữ)' },
  COMPLEMENT: { bg: 'bg-amber-500/10', text: 'text-amber-600', border: 'border-amber-500/30', defaultLabel: '補語/助詞 (Trợ từ)' },
  OBJECT: { bg: 'bg-emerald-500/10', text: 'text-emerald-600', border: 'border-emerald-500/30', defaultLabel: '目的語 (Tân ngữ)' },
  MODIFIER: { bg: 'bg-purple-500/10', text: 'text-purple-600', border: 'border-purple-500/30', defaultLabel: '修飾語 (Bổ nghĩa)' },
};

export default function SentenceBreakdownStudio({ initialSentence }: { initialSentence?: string }) {
  const { t } = useTranslation(['translation', 'common']);
  const [inputText, setInputText] = useState(initialSentence && initialSentence.trim() ? initialSentence : '私は毎日日本語を勉強します。');
  const [breakdown, setBreakdown] = useState<BreakdownResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [hoveredToken, setHoveredToken] = useState<SyntaxToken | null>(null);

  const getRoleLabel = (key: string) => t(`translation:studio.roles.${key}`, ROLE_BADGE_STYLE[key]?.defaultLabel || key);

  const handleBreakdown = async (textToAnalyze: string) => {
    try {
      setLoading(true);
      const res = await aiStudioApi.breakdownSentence(textToAnalyze);
      setBreakdown(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleBreakdown(inputText);
  }, []);

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-6">
      {/* ── Header ── */}
      <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-3xl p-6 shadow-sm">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary/10 text-secondary rounded-full text-xs font-bold uppercase tracking-wider mb-2">
          <Sparkles size={14} /> {t('translation:studio.badge', 'AI Syntax Parser & Reading Studio')}
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-on-surface tracking-tight">
          {t('translation:studio.title', '📄 Studio Phân Tích Cú Pháp & Cấu Trúc Câu JLPT')}
        </h1>
        <p className="text-xs md:text-sm text-on-surface-variant mt-1">
          {t('translation:studio.subtitle', 'Tự động phân tách Chủ ngữ / Vị ngữ, chèn Furigana trên đầu Kanji & tra cứu từ điển khi rê chuột')}
        </p>
      </div>

      {/* ── Sample Passages & Input ── */}
      <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-3xl p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-on-surface uppercase tracking-wider">
            {t('translation:studio.inputLabel', 'Nhập Hoặc Chọn Bài Đọc Tiếng Nhật')}
          </label>
          <div className="flex gap-2 flex-wrap">
            {SAMPLE_PASSAGES.map((s) => (
              <button
                key={s.id}
                onClick={() => { setInputText(s.text); handleBreakdown(s.text); }}
                className="px-2.5 py-1 rounded-lg bg-surface-container text-on-surface-variant text-xs font-semibold hover:bg-surface-container-high cursor-pointer transition-colors"
              >
                {t(`translation:studio.samples.${s.id}`, s.defaultLabel)}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <textarea
            rows={3}
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            placeholder={t('translation:studio.inputPlaceholder', 'Dán câu hoặc đoạn văn tiếng Nhật ở đây...')}
            className="flex-1 p-4 rounded-2xl border border-outline-variant/40 bg-surface-container-lowest text-on-surface font-jp text-base focus:outline-none focus:border-primary resize-none"
          />
          <button
            onClick={() => handleBreakdown(inputText)}
            disabled={loading || !inputText.trim()}
            className="px-6 py-3 rounded-2xl bg-primary text-on-primary font-bold text-sm cursor-pointer hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2 self-end sm:self-stretch shadow-md transition-opacity"
          >
            {loading ? t('translation:studio.analyzing', '⏳ Đang phân tích...') : t('translation:studio.analyzeBtn', '🤖 AI Phân Tích Cú Pháp')}
          </button>
        </div>
      </div>

      {/* ── Breakdown Display Area ── */}
      {breakdown && (
        <div className="space-y-6">
          {/* Color Role Legend */}
          <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-4 flex flex-wrap items-center gap-3">
            <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mr-2">
              {t('translation:studio.legendTitle', 'Chú giải màu sắc:')}
            </span>
            {Object.entries(ROLE_BADGE_STYLE).map(([key, style]) => (
              <span key={key} className={`text-xs font-bold px-3 py-1 rounded-full border ${style.bg} ${style.text} ${style.border}`}>
                {getRoleLabel(key)}
              </span>
            ))}
          </div>

          {/* Interactive Sentence Tokens Box */}
          <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
            <h3 className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">
              {t('translation:studio.sectionTokens', '1. Phân Tách Cụm Từ & Furigana Rê Chuột Tra Cứu')}
            </h3>

            <div className="flex flex-wrap gap-3 items-end leading-loose font-jp text-2xl">
              {breakdown.tokens?.map((token, idx) => {
                const style = ROLE_BADGE_STYLE[token.role] || ROLE_BADGE_STYLE.MODIFIER;
                return (
                  <div
                    key={idx}
                    onMouseEnter={() => setHoveredToken(token)}
                    className={`relative group px-3 py-2 rounded-2xl border-2 cursor-pointer transition-all hover:scale-105 shadow-xs ${style.bg} ${style.border}`}
                  >
                    {/* Ruby Furigana */}
                    <ruby className="font-bold text-on-surface">
                      {token.surface}
                      {token.furigana && token.furigana !== token.surface && (
                        <rt className="text-xs text-primary font-semibold tracking-normal">{token.furigana}</rt>
                      )}
                    </ruby>
                    <div className={`text-[10px] font-bold mt-1 font-sans ${style.text}`}>
                      {getRoleLabel(token.role).split(' ')[0]}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Hovered Token Detail Popover Card */}
            {hoveredToken ? (
              <div className="bg-surface-container-low rounded-2xl p-5 border border-outline-variant/30 space-y-2 animate-fade-in">
                <div className="flex items-center justify-between">
                  <div className="flex items-baseline gap-3">
                    <span className="text-2xl font-bold font-jp text-primary">{hoveredToken.surface}</span>
                    <span className="text-sm font-semibold text-on-surface-variant">[{hoveredToken.furigana}]</span>
                    {hoveredToken.kanjiSinoVietnamese !== '-' && (
                      <span className="text-xs font-bold px-2 py-0.5 rounded bg-tertiary/15 text-tertiary">
                        {t('translation:studio.sinoVietnamese', 'Hán Việt:')} {hoveredToken.kanjiSinoVietnamese}
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-semibold text-on-surface-variant">{hoveredToken.partOfSpeech}</span>
                </div>
                <p className="text-sm text-on-surface font-medium">{hoveredToken.meaning}</p>
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-surface-container/50 border border-outline-variant/20 text-xs text-on-surface-variant flex items-center gap-2">
                <HelpCircle size={16} /> {t('translation:studio.hoverHint', 'Rê chuột vào bất kỳ từ nào ở trên để xem Furigana, âm Hán Việt và nghĩa từ điển chi tiết.')}
              </div>
            )}
          </div>

          {/* Full Translation & Grammar Notes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-3xl p-6 shadow-sm space-y-2">
              <h4 className="text-xs font-bold text-secondary uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 size={16} /> {t('translation:studio.fullTranslationTitle', 'Bản Dịch Tiếng Việt Chuẩn')}
              </h4>
              <p className="text-base text-on-surface font-semibold leading-relaxed">
                "{breakdown.fullVietnameseTranslation}"
              </p>
            </div>

            <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-3xl p-6 shadow-sm space-y-2">
              <h4 className="text-xs font-bold text-tertiary uppercase tracking-wider flex items-center gap-1.5">
                <Info size={16} /> {t('translation:studio.grammarNotesTitle', 'Ghi Chú Cấu Trúc Ngữ Pháp')}
              </h4>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                {breakdown.grammarNotes}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
