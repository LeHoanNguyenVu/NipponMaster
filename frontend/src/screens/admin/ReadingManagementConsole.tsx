import { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  Newspaper,
  RefreshCw,
  DownloadCloud,
  CheckCircle2,
  XCircle,
  Volume2,
  Sparkles,
  ExternalLink,
  AlertTriangle,
  Loader2,
  Eye,
  X,
  Image as ImageIcon,
  Wand2,
  ChevronDown,
  ChevronUp,
  EyeOff,
  Search,
  RotateCcw,
  Play,
  Square,
} from 'lucide-react';
import {
  adminReadingApi,
  type AdminArticleSummary,
  type AdminVersionSummary,
  type IngestStatus,
} from '../../api/adminReadingApi';
import type { ReadingVersionDetail } from '../../api/readingApi';

type StatusTab = 'REVIEW' | 'PUBLISHED' | 'REJECTED' | 'ALL';

const CATEGORY_VI: Record<string, string> = {
  SOCIETY: 'Xã hội',
  LIFE: 'Đời sống',
  ECONOMY: 'Kinh tế',
  SCI_TECH: 'Khoa học - CN',
  SPORTS: 'Thể thao',
  CULTURE: 'Văn hóa',
  WEATHER: 'Thời tiết',
};

const RSS_SOURCES = [
  { value: 'ALL', label: 'Tất cả nguồn (mặc định)' },
  { value: 'GOV_ONLINE', label: 'Chính phủ Nhật (PDL 1.0)' },
  { value: 'DIGITAL_AGENCY', label: 'Cơ quan Số (PDL 1.0)' },
  { value: 'KANKOCHO', label: 'Cục Du lịch (PDL 1.0)' },
  { value: 'MAFF', label: 'Bộ Nông Lâm (PDL 1.0)' },
  { value: 'NHK_TOP', label: 'NHK Thời sự (Facts)' },
  { value: 'NHK_CULTURE', label: 'NHK Văn hóa (Facts)' },
  { value: 'NHK_ECONOMY', label: 'NHK Kinh tế (Facts)' },
  { value: 'NHK_SCITECH', label: 'NHK Khoa học (Facts)' },
];

function isSafeHttpsUrl(url?: string | null): boolean {
  if (!url) return false;
  try {
    return new URL(url).protocol === 'https:';
  } catch {
    return false;
  }
}

function formatAdminError(err: any, fallback: string): string {
  const raw = typeof err === 'string' ? err : err?.message || err?.error || '';
  if (raw.includes('403') || raw.includes('401')) {
    return 'Phiên đăng nhập thiếu quyền ADMIN hoặc đã hết hạn (HTTP 403). Vui lòng đăng nhập lại.';
  }
  if (raw.includes('404')) {
    return `${fallback} (Backend chưa khởi động lại để nạp API mới).`;
  }
  return raw ? `${fallback} (${raw})` : fallback;
}

function pickPrimaryHeadline(art: AdminArticleSummary): { vi: string; ja: string } {
  const versions = art.versions || [];
  const preferred =
    versions.find((v) => v.jlptLevel === 'N3') ||
    versions.find((v) => v.jlptLevel === 'N1') ||
    versions[0];
  return {
    vi: preferred?.titleVi?.trim() || art.sourceTitle || `Sự kiện #${art.id}`,
    ja: preferred?.titleJa?.trim() || art.sourceTitle || '',
  };
}

export default function ReadingManagementConsole() {
  const [allArticles, setAllArticles] = useState<AdminArticleSummary[]>([]);
  const [statusTab, setStatusTab] = useState<StatusTab>('REVIEW');
  const [didAutoSelectTab, setDidAutoSelectTab] = useState<boolean>(false);
  const [needsReviewOnly, setNeedsReviewOnly] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  const [selectedSource, setSelectedSource] = useState<string>('ALL');
  const [maxEvents, setMaxEvents] = useState<number>(2);
  const [ingestStatus, setIngestStatus] = useState<IngestStatus | null>(null);

  const [expandedArticleId, setExpandedArticleId] = useState<number | null>(null);
  const [editingCoverArticleId, setEditingCoverArticleId] = useState<number | null>(null);
  const [coverUrlDraft, setCoverUrlDraft] = useState<string>('');
  const [coverCreditDraft, setCoverCreditDraft] = useState<string>('');

  const [busyKey, setBusyKey] = useState<string | null>(null);
  const [notice, setNotice] = useState<{ text: string; isError?: boolean } | null>(null);

  // Modal xem trước bài đọc & chỉ số JLPT
  const [previewTarget, setPreviewTarget] = useState<{
    article: AdminArticleSummary;
    version: AdminVersionSummary;
  } | null>(null);
  const [previewDetail, setPreviewDetail] = useState<ReadingVersionDetail | null>(null);
  const [previewLoading, setPreviewLoading] = useState<boolean>(false);
  const [previewError, setPreviewError] = useState<string | null>(null);

  // Trình phát nghe thử audio Gemini TTS trực tiếp ngay trong trang Quản trị
  const [playingAudio, setPlayingAudio] = useState<{
    versionId: number;
    sentenceIdx: number;
    total: number;
  } | null>(null);
  const [audioLoadingId, setAudioLoadingId] = useState<number | null>(null);
  const audioElRef = useRef<HTMLAudioElement | null>(null);
  const playSessionRef = useRef<number>(0);

  const lastCreatedCountRef = useRef<number>(0);

  const stopPreviewAudio = () => {
    playSessionRef.current += 1;
    if (audioElRef.current) {
      audioElRef.current.onended = null;
      audioElRef.current.onerror = null;
      audioElRef.current.pause();
      audioElRef.current.src = '';
      audioElRef.current = null;
    }
    setPlayingAudio(null);
  };

  useEffect(() => {
    return () => stopPreviewAudio();
  }, []);

  const loadArticles = async (silent = false) => {
    if (!silent) setLoading(true);
    try {
      const list = await adminReadingApi.listArticles({ status: 'ALL', limit: 60 });
      const arr = Array.isArray(list) ? list : [];
      setAllArticles(arr);
      if (!didAutoSelectTab) {
        const hasPending = arr.some((a) => a.status === 'REVIEW');
        setStatusTab(hasPending ? 'REVIEW' : 'PUBLISHED');
        setDidAutoSelectTab(true);
      }
    } catch (err: any) {
      setNotice({
        text: formatAdminError(err, 'Không thể tải danh sách bài đọc quản trị'),
        isError: true,
      });
    } finally {
      if (!silent) setLoading(false);
    }
  };

  useEffect(() => {
    loadArticles();
    adminReadingApi
      .getIngestStatus()
      .then((st) => {
        if (st?.running) {
          lastCreatedCountRef.current = st.createdArticles || 0;
          setIngestStatus(st);
        }
      })
      .catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Tự động poll tiến độ mỗi 2.5s khi pipeline ingest chạy nền (không bao giờ bị Network Error timeout)
  useEffect(() => {
    if (!ingestStatus?.running) return;
    const timer = window.setInterval(async () => {
      try {
        const st = await adminReadingApi.getIngestStatus();
        setIngestStatus(st);
        if ((st.createdArticles || 0) > lastCreatedCountRef.current) {
          lastCreatedCountRef.current = st.createdArticles || 0;
          await loadArticles(true);
        }
        if (!st.running) {
          const rep = st.lastReport;
          const created = rep?.createdArticles ?? st.createdArticles ?? 0;
          const versions = rep?.createdVersions ?? st.createdVersions ?? 0;
          const dup = rep?.skippedDuplicates ?? st.skippedDuplicates ?? 0;
          setNotice({
            text:
              created > 0
                ? `Đã lấy xong ${created} sự kiện mới (${versions} bài N5/N3/N1) vào mục Chờ duyệt · Bỏ qua trùng ${dup}.`
                : st.currentMessage || `Hoàn tất: không có tin mới nào (bỏ qua trùng ${dup}).`,
            isError: created === 0 && (rep?.failedItems ?? 0) > 0,
          });
          if (created > 0) setStatusTab('REVIEW');
          await loadArticles(true);
        }
      } catch {
        // Bỏ qua lỗi mạng thoáng qua khi poll
      }
    }, 2500);
    return () => window.clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ingestStatus?.running]);

  const counts = useMemo(() => {
    let review = 0;
    let published = 0;
    let rejected = 0;
    for (const a of allArticles) {
      if (a.status === 'REVIEW') review++;
      else if (a.status === 'PUBLISHED') published++;
      else if (a.status === 'REJECTED') rejected++;
    }
    return { review, published, rejected, all: allArticles.length };
  }, [allArticles]);

  const visibleArticles = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return allArticles.filter((art) => {
      if (statusTab !== 'ALL' && art.status !== statusTab) return false;
      if (needsReviewOnly) {
        const hasFlag = (art.versions || []).some((v) => v.levelMetrics?.needsReview === true);
        if (!hasFlag) return false;
      }
      if (q) {
        const head = pickPrimaryHeadline(art);
        const hay = `#${art.id} ${head.vi} ${head.ja} ${art.sourceTitle || ''} ${art.sourceName}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [allArticles, statusTab, needsReviewOnly, searchQuery]);

  const openVersionPreview = async (article: AdminArticleSummary, version: AdminVersionSummary) => {
    setPreviewTarget({ article, version });
    setPreviewDetail(null);
    setPreviewError(null);
    setPreviewLoading(true);
    try {
      const detail = await adminReadingApi.getVersionPreview(version.id);
      setPreviewDetail(detail);
    } catch (err: any) {
      setPreviewError(formatAdminError(err, 'Không tải được nội dung xem trước'));
    } finally {
      setPreviewLoading(false);
    }
  };

  const handleStartIngest = async () => {
    setNotice(null);
    try {
      lastCreatedCountRef.current = 0;
      const st = await adminReadingApi.startIngestAsync({
        maxEvents,
        source: selectedSource,
      });
      setIngestStatus(st);
    } catch (err: any) {
      setNotice({
        text: formatAdminError(err, 'Không thể khởi động tiến trình lấy tin AI'),
        isError: true,
      });
    }
  };

  const handlePublish = async (articleId: number) => {
    setBusyKey(`pub-${articleId}`);
    setNotice(null);
    try {
      await adminReadingApi.publishArticle(articleId, true);
      setNotice({ text: `Đã xuất bản bài #${articleId} lên trang Luyện Đọc và tự kích hoạt tạo giọng đọc nền.` });
      await loadArticles(true);
    } catch (err: any) {
      setNotice({ text: formatAdminError(err, `Xuất bản bài #${articleId} thất bại`), isError: true });
    } finally {
      setBusyKey(null);
    }
  };

  const handleReject = async (articleId: number, wasPublished: boolean) => {
    setBusyKey(`rej-${articleId}`);
    setNotice(null);
    try {
      await adminReadingApi.rejectArticle(articleId);
      setNotice({
        text: wasPublished
          ? `Đã ẩn bài #${articleId} khỏi trang Luyện Đọc của học viên.`
          : `Đã chuyển bài #${articleId} vào mục Đã từ chối.`,
      });
      await loadArticles(true);
    } catch (err: any) {
      setNotice({ text: formatAdminError(err, `Cập nhật trạng thái bài #${articleId} thất bại`), isError: true });
    } finally {
      setBusyKey(null);
    }
  };

  const handleReclassify = async (articleId: number) => {
    setBusyKey(`rec-${articleId}`);
    setNotice(null);
    try {
      await adminReadingApi.reclassifyArticle(articleId);
      setNotice({ text: `Đã chấm lại cấp độ JLPT cho bài #${articleId}.` });
      await loadArticles(true);
    } catch (err: any) {
      setNotice({ text: formatAdminError(err, `Chấm lại cấp độ bài #${articleId} thất bại`), isError: true });
    } finally {
      setBusyKey(null);
    }
  };

  const handleGenerateCoverImage = async (articleId: number) => {
    setBusyKey(`img-${articleId}`);
    setNotice(null);
    try {
      const updated = await adminReadingApi.generateCoverImage(articleId);
      setNotice({ text: `Đã tạo ảnh bìa riêng (${updated.coverImageSource || 'HYBRID'}) cho toàn bộ phiên bản bài #${articleId}.` });
      await loadArticles(true);
    } catch (err: any) {
      setNotice({ text: formatAdminError(err, `Tạo ảnh bìa bài #${articleId} thất bại`), isError: true });
    } finally {
      setBusyKey(null);
    }
  };

  const handleBackfillCovers = async () => {
    setBusyKey('backfill-covers');
    setNotice(null);
    try {
      const res = await adminReadingApi.backfillCoverImages(40);
      const count = res?.updatedCount ?? 0;
      setNotice({
        text:
          count > 0
            ? `Đã tự động điền ảnh bìa không trùng cho ${count} phiên bản bài báo.`
            : 'Tất cả phiên bản bài báo hiện đã có ảnh bìa riêng.',
      });
      await loadArticles(true);
    } catch (err: any) {
      setNotice({ text: formatAdminError(err, 'Bù ảnh bìa tự động thất bại'), isError: true });
    } finally {
      setBusyKey(null);
    }
  };

  const openCoverEditor = (art: AdminArticleSummary) => {
    setExpandedArticleId(art.id);
    if (editingCoverArticleId === art.id) {
      setEditingCoverArticleId(null);
      return;
    }
    setEditingCoverArticleId(art.id);
    setCoverUrlDraft(art.coverImageUrl || '');
    setCoverCreditDraft(art.coverImageCredit || '');
  };

  const handleSaveManualCover = async (articleId: number, clear = false) => {
    setBusyKey(`img-${articleId}`);
    setNotice(null);
    try {
      await adminReadingApi.updateCoverImage(articleId, {
        coverImageUrl: clear ? '' : coverUrlDraft.trim(),
        coverImageCredit: clear ? '' : coverCreditDraft.trim(),
      });
      setNotice({
        text: clear ? `Đã gỡ ảnh bìa bài #${articleId}.` : `Đã lưu URL ảnh bìa thủ công cho bài #${articleId}.`,
      });
      setEditingCoverArticleId(null);
      await loadArticles(true);
    } catch (err: any) {
      setNotice({ text: formatAdminError(err, `Lưu ảnh bìa bài #${articleId} thất bại`), isError: true });
    } finally {
      setBusyKey(null);
    }
  };

  const handleGenerateAudio = async (
    versionId: number,
    options?: { voice?: 'Kore' | 'Puck'; force?: boolean }
  ) => {
    stopPreviewAudio();
    setBusyKey(`aud-${versionId}`);
    setNotice(null);
    try {
      const res = await adminReadingApi.generateVersionAudio(versionId, options);
      setNotice({
        text: `Audio ${res.jlptLevel} (${res.voiceName}): ${res.audioStatus} (${res.readySentences}/${res.totalSentences} câu).`,
        isError: res.failedSentences > 0,
      });
      await loadArticles(true);
    } catch (err: any) {
      setNotice({ text: formatAdminError(err, `Tạo audio phiên bản #${versionId} thất bại`), isError: true });
    } finally {
      setBusyKey(null);
    }
  };

  const playAudioSequence = (
    versionId: number,
    items: Array<{ idx: number; url: string }>,
    startPos = 0,
    singleOnly = false
  ) => {
    stopPreviewAudio();
    if (items.length === 0 || startPos < 0 || startPos >= items.length) return;

    const sessionId = playSessionRef.current;
    const playAt = (pos: number) => {
      if (playSessionRef.current !== sessionId || pos >= items.length) {
        if (playSessionRef.current === sessionId) setPlayingAudio(null);
        return;
      }
      const cur = items[pos];
      setPlayingAudio({ versionId, sentenceIdx: cur.idx, total: items.length });
      const el = new Audio(cur.url);
      audioElRef.current = el;
      el.onended = () => {
        if (playSessionRef.current !== sessionId) return;
        if (singleOnly) {
          setPlayingAudio(null);
        } else {
          playAt(pos + 1);
        }
      };
      el.onerror = () => {
        if (playSessionRef.current !== sessionId) return;
        setNotice({
          text: `Không phát được file audio câu ${cur.idx + 1} (kiểm tra kết nối Supabase Storage).`,
          isError: true,
        });
        setPlayingAudio(null);
      };
      el.play().catch(() => {
        if (playSessionRef.current !== sessionId) return;
        setNotice({
          text: 'Trình duyệt chặn phát tự động hoặc tệp audio không khả dụng.',
          isError: true,
        });
        setPlayingAudio(null);
      });
    };

    playAt(startPos);
  };

  const handleListenVersion = async (versionId: number) => {
    if (playingAudio?.versionId === versionId) {
      stopPreviewAudio();
      return;
    }
    setAudioLoadingId(versionId);
    setNotice(null);
    try {
      const detail =
        previewDetail && previewDetail.versionId === versionId
          ? previewDetail
          : await adminReadingApi.getVersionPreview(versionId);
      const playable = (detail.sentences || [])
        .filter((s) => isSafeHttpsUrl(s.audioUrl))
        .map((s) => ({ idx: s.idx, url: s.audioUrl! }));
      if (playable.length === 0) {
        setNotice({
          text: `Phiên bản #${versionId} chưa có file audio sẵn sàng. Bấm "Tạo Audio" trước.`,
          isError: true,
        });
        return;
      }
      playAudioSequence(versionId, playable, 0, false);
    } catch (err: any) {
      setNotice({ text: formatAdminError(err, `Không tải được audio phiên bản #${versionId}`), isError: true });
    } finally {
      setAudioLoadingId(null);
    }
  };

  const isIngesting = Boolean(ingestStatus?.running);
  const isAnyBusy = isIngesting || busyKey !== null;

  return (
    <div className="space-y-5">
      {/* 1. Compact Header + 4 Clickable Status KPI Cards */}
      <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/40 p-5 space-y-4 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-extrabold text-on-surface flex items-center gap-2">
              <Newspaper className="text-primary" size={20} />
              Biên Tập & Duyệt Báo Luyện Đọc
            </h2>
            <p className="text-xs text-outline mt-0.5">
              Tin mới tự động viết lại 3 cấp (N5 · N3 · N1) vào mục <strong>Chờ duyệt</strong> → bấm <strong>Duyệt & Xuất bản</strong> để hiển thị cho học viên.
            </p>
          </div>

          <button
            type="button"
            onClick={() => loadArticles()}
            disabled={loading}
            className="px-3 py-1.5 rounded-xl bg-surface-container-low border border-outline-variant/50 text-xs font-bold text-on-surface flex items-center gap-1.5 hover:bg-surface-container cursor-pointer disabled:opacity-50"
          >
            <RefreshCw size={13} className={loading ? 'animate-spin' : ''} />
            Làm mới
          </button>
        </div>

        {/* 4 Status Filter KPI Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {(
            [
              {
                id: 'REVIEW',
                label: 'Chờ duyệt',
                count: counts.review,
                activeCls: 'border-amber-500 bg-amber-500/10 text-amber-800 dark:text-amber-300',
                dotCls: 'bg-amber-500',
              },
              {
                id: 'PUBLISHED',
                label: 'Đang hiển thị',
                count: counts.published,
                activeCls: 'border-emerald-600 bg-emerald-500/10 text-emerald-800 dark:text-emerald-300',
                dotCls: 'bg-emerald-600',
              },
              {
                id: 'REJECTED',
                label: 'Đã ẩn / Từ chối',
                count: counts.rejected,
                activeCls: 'border-outline bg-surface-container text-on-surface',
                dotCls: 'bg-outline',
              },
              {
                id: 'ALL',
                label: 'Tất cả sự kiện',
                count: counts.all,
                activeCls: 'border-primary bg-primary/8 text-primary',
                dotCls: 'bg-primary',
              },
            ] as const
          ).map((card) => {
            const active = statusTab === card.id;
            return (
              <button
                key={card.id}
                type="button"
                onClick={() => setStatusTab(card.id)}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                  active
                    ? `${card.activeCls} shadow-2xs`
                    : 'border-outline-variant/40 bg-surface-container-low/40 text-on-surface-variant hover:bg-surface-container-low'
                }`}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className={`w-2 h-2 rounded-full shrink-0 ${card.dotCls}`} />
                  <span className="text-xs font-bold truncate">{card.label}</span>
                </div>
                <span className="text-lg font-extrabold tabular-nums ml-2">{card.count}</span>
              </button>
            );
          })}
        </div>

        {/* 2. Single-Row Ingest & Tools Bar */}
        <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-outline-variant/30">
          <select
            value={selectedSource}
            onChange={(e) => setSelectedSource(e.target.value)}
            aria-label="Chọn nguồn RSS"
            disabled={isAnyBusy}
            className="px-3 py-1.5 rounded-xl bg-surface-container-low border border-outline-variant/50 text-xs font-semibold text-on-surface focus:outline-none focus:border-primary disabled:opacity-50"
          >
            {RSS_SOURCES.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>

          <select
            value={maxEvents}
            onChange={(e) => setMaxEvents(Number(e.target.value))}
            aria-label="Số sự kiện tối đa"
            disabled={isAnyBusy}
            className="px-3 py-1.5 rounded-xl bg-surface-container-low border border-outline-variant/50 text-xs font-semibold text-on-surface focus:outline-none focus:border-primary disabled:opacity-50"
          >
            {[1, 2, 3, 5].map((n) => (
              <option key={n} value={n}>
                {n} sự kiện ({n * 3} bài)
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={handleStartIngest}
            disabled={isAnyBusy}
            className="px-3.5 py-1.5 rounded-xl bg-primary text-on-primary text-xs font-bold inline-flex items-center gap-1.5 hover:opacity-95 disabled:opacity-50 cursor-pointer shadow-xs"
          >
            {isIngesting ? <Loader2 size={14} className="animate-spin" /> : <DownloadCloud size={14} />}
            {isIngesting ? 'Đang lấy tin nền...' : 'Lấy tin & Viết bài AI'}
          </button>

          <button
            type="button"
            onClick={handleBackfillCovers}
            disabled={isAnyBusy}
            title="Tự động điền ảnh Nhật Bản không trùng cho các bài còn thiếu"
            className="px-3 py-1.5 rounded-xl bg-surface-container-low border border-outline-variant/50 text-on-surface text-xs font-semibold inline-flex items-center gap-1.5 hover:border-primary hover:text-primary disabled:opacity-50 cursor-pointer transition-colors"
          >
            {busyKey === 'backfill-covers' ? <Loader2 size={13} className="animate-spin" /> : <Wand2 size={13} />}
            Bù ảnh thiếu
          </button>

          <div className="flex-1 min-w-[160px] flex items-center justify-end gap-2 ml-auto">
            <div className="relative w-full sm:w-52">
              <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-outline" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm tiêu đề hoặc #id..."
                className="w-full pl-8 pr-2.5 py-1.5 rounded-xl bg-surface-container-low border border-outline-variant/50 text-xs text-on-surface focus:outline-none focus:border-primary"
              />
            </div>

            <label className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-on-surface-variant cursor-pointer select-none whitespace-nowrap">
              <input
                type="checkbox"
                checked={needsReviewOnly}
                onChange={(e) => setNeedsReviewOnly(e.target.checked)}
                className="rounded border-outline-variant accent-primary"
              />
              Cần rà soát JLPT
            </label>
          </div>
        </div>

        {/* Live Async Ingest Progress Banner */}
        {isIngesting && ingestStatus && (
          <div className="px-4 py-3 rounded-xl bg-primary/8 border border-primary/25 text-xs flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2 font-semibold text-primary">
              <Loader2 size={15} className="animate-spin shrink-0" />
              <span>{ingestStatus.currentMessage || 'Đang chạy pipeline AI ở nền...'}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[11px] text-on-surface-variant font-mono">
                Đã tạo {ingestStatus.createdArticles}/{ingestStatus.targetEvents} sự kiện · Bỏ qua trùng {ingestStatus.skippedDuplicates}
              </span>
              <button
                type="button"
                onClick={async () => {
                  try {
                    const stopped = await adminReadingApi.cancelIngest();
                    setIngestStatus(stopped);
                    setNotice({ text: 'Đã dừng tiến trình lấy tin.' });
                    await loadArticles(true);
                  } catch {}
                }}
                className="px-2.5 py-1 rounded-lg bg-error/10 text-error border border-error/30 hover:bg-error hover:text-white text-[11px] font-bold cursor-pointer transition-colors"
              >
                Dừng
              </button>
            </div>
          </div>
        )}

        {/* Toast / Notice */}
        {notice && (
          <div
            className={`px-3.5 py-2.5 rounded-xl text-xs font-semibold border flex items-center justify-between gap-2 ${
              notice.isError
                ? 'bg-error-container/30 border-error/40 text-error'
                : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-300'
            }`}
          >
            <div className="flex items-center gap-2">
              {notice.isError ? <AlertTriangle size={14} className="shrink-0" /> : <CheckCircle2 size={14} className="shrink-0" />}
              <span>{notice.text}</span>
            </div>
            <button
              type="button"
              onClick={() => setNotice(null)}
              aria-label="Đóng thông báo"
              className="opacity-60 hover:opacity-100 cursor-pointer"
            >
              <X size={13} />
            </button>
          </div>
        )}

        {!isIngesting && ingestStatus?.lastReport?.errors && ingestStatus.lastReport.errors.length > 0 && (
          <details className="px-3.5 py-2 rounded-xl bg-amber-500/10 border border-amber-500/25 text-xs text-amber-800 dark:text-amber-300">
            <summary className="font-bold cursor-pointer select-none">
              Ghi chú từ lần lấy tin gần nhất ({ingestStatus.lastReport.errors.length})
            </summary>
            <ul className="mt-1.5 space-y-0.5 pl-4 list-disc">
              {ingestStatus.lastReport.errors.map((e, i) => (
                <li key={i}>{e}</li>
              ))}
            </ul>
          </details>
        )}
      </div>

      {/* 3. Clean Scannable Editorial List */}
      {loading ? (
        <div className="p-10 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 text-center text-xs text-outline">
          Đang tải danh sách bài đọc...
        </div>
      ) : visibleArticles.length === 0 ? (
        <div className="p-10 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 text-center space-y-2">
          <Newspaper size={26} className="mx-auto text-outline" />
          <p className="text-sm font-bold text-on-surface">
            {statusTab === 'REVIEW'
              ? 'Không còn bài nào đang chờ duyệt'
              : 'Chưa có bài đọc nào trong mục này'}
          </p>
          <p className="text-xs text-outline">
            {statusTab === 'REVIEW'
              ? 'Bấm "Lấy tin & Viết bài AI" phía trên để kéo thêm sự kiện mới, hoặc chuyển sang tab "Đang hiển thị".'
              : 'Thử đổi bộ lọc hoặc bấm "Lấy tin & Viết bài AI".'}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {visibleArticles.map((art) => {
            const head = pickPrimaryHeadline(art);
            const isExpanded = expandedArticleId === art.id;
            const safeUrl = isSafeHttpsUrl(art.sourceUrl) ? art.sourceUrl : null;
            const sortedVersions = [...(art.versions || [])].sort((a, b) => {
              const order: Record<string, number> = { N5: 1, N4: 2, N3: 3, N2: 4, N1: 5 };
              return (order[a.jlptLevel] ?? 9) - (order[b.jlptLevel] ?? 9);
            });

            return (
              <div
                key={art.id}
                className="bg-surface-container-lowest rounded-2xl border border-outline-variant/40 overflow-hidden shadow-2xs transition-colors hover:border-outline-variant/70"
              >
                {/* Main Scannable Row */}
                <div className="p-4 flex flex-col md:flex-row md:items-center gap-4">
                  {/* Left: Cover Thumbnail */}
                  <button
                    type="button"
                    onClick={() => openCoverEditor(art)}
                    title="Bấm để đổi hoặc sửa URL ảnh bìa"
                    className="relative w-full md:w-32 h-36 md:h-20 rounded-xl overflow-hidden bg-surface-container border border-outline-variant/40 shrink-0 group cursor-pointer"
                  >
                    {isSafeHttpsUrl(art.coverImageUrl) ? (
                      <img
                        src={art.coverImageUrl!}
                        alt={head.vi}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-outline gap-1">
                        <ImageIcon size={18} />
                        <span className="text-[10px] font-semibold">Chưa có ảnh</span>
                      </div>
                    )}
                    <span className="absolute inset-x-0 bottom-0 py-0.5 bg-black/55 text-white text-[10px] font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                      Đổi ảnh
                    </span>
                  </button>

                  {/* Center: Readable Title + Meta + Clickable JLPT Preview Chips */}
                  <div className="flex-1 min-w-0 space-y-1.5">
                    <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
                      <span className="font-mono font-bold text-outline">#{art.id}</span>
                      <span
                        className={`px-2 py-0.5 rounded-full font-bold ${
                          art.status === 'PUBLISHED'
                            ? 'bg-emerald-500/12 text-emerald-700 dark:text-emerald-300'
                            : art.status === 'REJECTED'
                            ? 'bg-surface-container text-outline'
                            : 'bg-amber-500/15 text-amber-800 dark:text-amber-300'
                        }`}
                      >
                        {art.status === 'PUBLISHED'
                          ? 'Đang hiển thị'
                          : art.status === 'REJECTED'
                          ? 'Đã ẩn / Từ chối'
                          : 'Chờ duyệt'}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-medium">
                        {CATEGORY_VI[art.category] || art.category}
                      </span>
                      <span className="text-outline">· {art.sourceName}</span>
                    </div>

                    <div className="text-sm font-bold text-on-surface leading-snug line-clamp-1">
                      {head.vi}
                    </div>
                    {head.ja && (
                      <div className="font-jp text-xs text-on-surface-variant line-clamp-1">
                        {head.ja}
                      </div>
                    )}

                    {/* Clickable JLPT Version Chips -> Opens Reading Preview Immediately */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      {sortedVersions.map((v) => {
                        const needsRev = v.levelMetrics?.needsReview === true;
                        const audioDot =
                          v.audioStatus === 'READY'
                            ? 'text-emerald-600'
                            : v.audioStatus === 'FAILED'
                            ? 'text-error'
                            : 'text-amber-600';
                        return (
                          <button
                            key={v.id}
                            type="button"
                            onClick={() => openVersionPreview(art, v)}
                            title={`Xem trước bản ${v.jlptLevel} (${v.charCount} ký tự · Audio: ${v.audioStatus})`}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-surface-container-low hover:bg-primary/10 hover:border-primary/40 border border-outline-variant/50 text-[11px] font-bold text-on-surface transition-colors cursor-pointer"
                          >
                            <Eye size={11} className="text-outline" />
                            <span>{v.jlptLevel}</span>
                            <Volume2 size={11} className={audioDot} />
                            {needsRev && (
                              <span
                                className="w-1.5 h-1.5 rounded-full bg-amber-500"
                                title="Cần rà soát cấp độ JLPT"
                              />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Right: Only 2 Clear Contextual Primary Actions + Expand Toggle */}
                  <div className="flex flex-wrap md:flex-col items-stretch justify-end gap-1.5 shrink-0 md:min-w-[146px]">
                    {art.status === 'REVIEW' && (
                      <>
                        <button
                          type="button"
                          onClick={() => handlePublish(art.id)}
                          disabled={isAnyBusy}
                          className="px-3.5 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold inline-flex items-center justify-center gap-1.5 hover:bg-emerald-700 disabled:opacity-50 cursor-pointer shadow-xs"
                        >
                          {busyKey === `pub-${art.id}` ? (
                            <Loader2 size={13} className="animate-spin" />
                          ) : (
                            <CheckCircle2 size={13} />
                          )}
                          Duyệt & Xuất bản
                        </button>
                        <button
                          type="button"
                          onClick={() => handleReject(art.id, false)}
                          disabled={isAnyBusy}
                          className="px-3 py-1.5 rounded-xl bg-surface-container-low text-error hover:bg-error/10 border border-error/25 text-xs font-semibold inline-flex items-center justify-center gap-1.5 disabled:opacity-50 cursor-pointer"
                        >
                          {busyKey === `rej-${art.id}` ? (
                            <Loader2 size={13} className="animate-spin" />
                          ) : (
                            <XCircle size={13} />
                          )}
                          Từ chối
                        </button>
                      </>
                    )}

                    {art.status === 'PUBLISHED' && (
                      <button
                        type="button"
                        onClick={() => handleReject(art.id, true)}
                        disabled={isAnyBusy}
                        className="px-3 py-1.5 rounded-xl bg-surface-container-low text-on-surface-variant hover:text-error hover:border-error/40 border border-outline-variant/50 text-xs font-semibold inline-flex items-center justify-center gap-1.5 disabled:opacity-50 cursor-pointer"
                      >
                        {busyKey === `rej-${art.id}` ? (
                          <Loader2 size={13} className="animate-spin" />
                        ) : (
                          <EyeOff size={13} />
                        )}
                        Ẩn bài
                      </button>
                    )}

                    {art.status === 'REJECTED' && (
                      <button
                        type="button"
                        onClick={() => handlePublish(art.id)}
                        disabled={isAnyBusy}
                        className="px-3 py-1.5 rounded-xl bg-emerald-600/10 text-emerald-700 border border-emerald-600/30 hover:bg-emerald-600 hover:text-white text-xs font-bold inline-flex items-center justify-center gap-1.5 disabled:opacity-50 cursor-pointer"
                      >
                        {busyKey === `pub-${art.id}` ? (
                          <Loader2 size={13} className="animate-spin" />
                        ) : (
                          <RotateCcw size={13} />
                        )}
                        Duyệt lại
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => setExpandedArticleId(isExpanded ? null : art.id)}
                      className="px-3 py-1.5 rounded-xl text-xs font-semibold text-on-surface-variant hover:bg-surface-container inline-flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <span>{isExpanded ? 'Thu gọn' : 'Chi tiết'}</span>
                      {isExpanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                    </button>
                  </div>
                </div>

                {/* Expandable Secondary Tools Drawer (Hidden by Default for Cleanliness) */}
                {isExpanded && (
                  <div className="px-4 pb-4 pt-3 border-t border-outline-variant/30 bg-surface-container-low/40 space-y-3">
                    {/* Secondary Article Actions Row */}
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleGenerateCoverImage(art.id)}
                          disabled={isAnyBusy}
                          className="px-2.5 py-1.5 rounded-lg bg-surface-container-lowest border border-outline-variant/50 text-[11px] font-bold text-on-surface hover:border-primary hover:text-primary inline-flex items-center gap-1 cursor-pointer disabled:opacity-50"
                        >
                          {busyKey === `img-${art.id}` ? <Loader2 size={12} className="animate-spin" /> : <Wand2 size={12} />}
                          Tạo lại 3 ảnh Hybrid
                        </button>
                        <button
                          type="button"
                          onClick={() => openCoverEditor(art)}
                          disabled={isAnyBusy}
                          className="px-2.5 py-1.5 rounded-lg bg-surface-container-lowest border border-outline-variant/50 text-[11px] font-bold text-on-surface hover:border-primary hover:text-primary inline-flex items-center gap-1 cursor-pointer disabled:opacity-50"
                        >
                          <ImageIcon size={12} />
                          Dán URL ảnh tay
                        </button>
                        <button
                          type="button"
                          onClick={() => handleReclassify(art.id)}
                          disabled={isAnyBusy}
                          className="px-2.5 py-1.5 rounded-lg bg-surface-container-lowest border border-outline-variant/50 text-[11px] font-bold text-on-surface hover:border-primary hover:text-primary inline-flex items-center gap-1 cursor-pointer disabled:opacity-50"
                        >
                          {busyKey === `rec-${art.id}` ? <Loader2 size={12} className="animate-spin" /> : <Sparkles size={12} />}
                          Chấm lại JLPT
                        </button>
                      </div>

                      {safeUrl && (
                        <a
                          href={safeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] font-semibold text-primary hover:underline"
                        >
                          Mở nguồn gốc ({art.sourceLicense}) <ExternalLink size={11} />
                        </a>
                      )}
                    </div>

                    {/* Inline Manual Cover Editor */}
                    {editingCoverArticleId === art.id && (
                      <div className="p-3 rounded-xl bg-surface-container-lowest border border-outline-variant/50 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                        <input
                          type="url"
                          value={coverUrlDraft}
                          onChange={(e) => setCoverUrlDraft(e.target.value)}
                          placeholder="Dán URL ảnh https://..."
                          className="flex-1 px-3 py-1.5 rounded-lg bg-surface-container-low border border-outline-variant/50 text-xs text-on-surface focus:outline-none focus:border-primary"
                        />
                        <input
                          type="text"
                          value={coverCreditDraft}
                          onChange={(e) => setCoverCreditDraft(e.target.value)}
                          placeholder="Ghi nguồn ảnh (tùy chọn)"
                          className="sm:w-48 px-3 py-1.5 rounded-lg bg-surface-container-low border border-outline-variant/50 text-xs text-on-surface focus:outline-none focus:border-primary"
                        />
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleSaveManualCover(art.id, false)}
                            disabled={isAnyBusy}
                            className="px-3 py-1.5 rounded-lg bg-primary text-on-primary text-xs font-bold cursor-pointer disabled:opacity-50"
                          >
                            Lưu
                          </button>
                          {art.coverImageUrl && (
                            <button
                              type="button"
                              onClick={() => handleSaveManualCover(art.id, true)}
                              disabled={isAnyBusy}
                              className="px-2.5 py-1.5 rounded-lg bg-error/10 text-error text-xs font-bold cursor-pointer disabled:opacity-50"
                            >
                              Gỡ
                            </button>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Compact Version Audio & Metrics Table */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
                      {sortedVersions.map((v) => {
                        const altVoice: 'Kore' | 'Puck' = v.voiceName === 'Puck' ? 'Kore' : 'Puck';
                        const overlap =
                          typeof v.levelMetrics?.ngramOverlap8 === 'number'
                            ? `${(v.levelMetrics.ngramOverlap8 * 100).toFixed(1)}%`
                            : '—';
                        return (
                          <div
                            key={v.id}
                            className="p-3 rounded-xl bg-surface-container-lowest border border-outline-variant/40 space-y-2"
                          >
                            <div className="flex items-center justify-between gap-1">
                              <span className="text-xs font-extrabold text-primary">
                                {v.jlptLevel}
                                {v.computedLevel ? ` · Chấm ${v.computedLevel}` : ''}
                              </span>
                              <span
                                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                  v.audioStatus === 'READY'
                                    ? 'bg-emerald-500/12 text-emerald-700'
                                    : v.audioStatus === 'FAILED'
                                    ? 'bg-error/12 text-error'
                                    : 'bg-amber-500/12 text-amber-700'
                                }`}
                              >
                                Audio: {v.audioStatus}
                              </span>
                            </div>

                            <div className="text-[11px] text-outline flex flex-wrap gap-x-2.5">
                              <span>{v.charCount} ký tự</span>
                              <span>Giọng {v.voiceName}</span>
                              <span>8-gram {overlap}</span>
                            </div>

                            <div className="flex flex-wrap items-center gap-1.5 pt-1">
                              <button
                                type="button"
                                onClick={() => openVersionPreview(art, v)}
                                className="px-2 py-1 rounded-md bg-surface-container text-on-surface hover:bg-primary hover:text-on-primary text-[11px] font-bold inline-flex items-center gap-1 cursor-pointer"
                              >
                                <Eye size={11} />
                                Xem
                              </button>
                              {v.audioStatus === 'READY' ? (
                                <button
                                  type="button"
                                  onClick={() => handleListenVersion(v.id)}
                                  disabled={audioLoadingId === v.id || isAnyBusy}
                                  className={`px-2 py-1 rounded-md text-[11px] font-bold inline-flex items-center gap-1 cursor-pointer disabled:opacity-50 transition-colors ${
                                    playingAudio?.versionId === v.id
                                      ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                                      : 'bg-primary/10 text-primary hover:bg-primary hover:text-on-primary'
                                  }`}
                                >
                                  {audioLoadingId === v.id ? (
                                    <Loader2 size={11} className="animate-spin" />
                                  ) : playingAudio?.versionId === v.id ? (
                                    <Square size={10} className="fill-current" />
                                  ) : (
                                    <Play size={11} className="fill-current" />
                                  )}
                                  {playingAudio?.versionId === v.id
                                    ? `Dừng (${playingAudio.sentenceIdx + 1}/${playingAudio.total})`
                                    : 'Nghe thử'}
                                </button>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => handleGenerateAudio(v.id, { force: false })}
                                  disabled={isAnyBusy}
                                  className="px-2 py-1 rounded-md bg-primary/10 text-primary hover:bg-primary hover:text-on-primary text-[11px] font-bold inline-flex items-center gap-1 cursor-pointer disabled:opacity-50"
                                >
                                  {busyKey === `aud-${v.id}` ? (
                                    <Loader2 size={11} className="animate-spin" />
                                  ) : (
                                    <Volume2 size={11} />
                                  )}
                                  Tạo Audio
                                </button>
                              )}
                              <button
                                type="button"
                                onClick={() => handleGenerateAudio(v.id, { voice: altVoice, force: true })}
                                disabled={isAnyBusy}
                                className="px-2 py-1 rounded-md bg-surface-container text-on-surface-variant hover:text-on-surface text-[11px] font-semibold cursor-pointer disabled:opacity-50"
                              >
                                Giọng {altVoice}
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Facts Firewall (Optional Expand) */}
                    {art.facts && art.facts.length > 0 && (
                      <details className="text-xs text-on-surface-variant">
                        <summary className="font-semibold cursor-pointer select-none text-outline hover:text-on-surface">
                          Xem {art.facts.length} dữ kiện gốc đã trích xuất (tường lửa bản quyền)
                        </summary>
                        <ul className="mt-1.5 space-y-0.5 list-disc pl-5">
                          {art.facts.map((f, idx) => (
                            <li key={idx}>{f}</li>
                          ))}
                        </ul>
                      </details>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Modal Xem trước bài đọc (Portal ra document.body) */}
      {previewTarget &&
        createPortal(
          <div
            className="fixed inset-0 z-[100] bg-black/55 backdrop-blur-[1px] flex items-center justify-center p-4"
            onClick={() => {
              stopPreviewAudio();
              setPreviewTarget(null);
            }}
          >
            <div
              className="bg-surface-container-lowest border border-outline-variant/60 rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="px-5 py-4 border-b border-outline-variant/40 flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2 py-0.5 rounded-md bg-primary text-on-primary text-xs font-bold">
                      {previewTarget.version.jlptLevel}
                    </span>
                    {previewTarget.version.computedLevel && (
                      <span className="px-2 py-0.5 rounded-md bg-surface-container text-on-surface text-xs font-mono font-bold">
                        Chấm: {previewTarget.version.computedLevel}
                      </span>
                    )}
                    {previewTarget.version.levelMetrics?.needsReview === true && (
                      <span className="px-2 py-0.5 rounded-md bg-amber-500/15 text-amber-800 border border-amber-500/30 text-xs font-bold">
                        Cần rà soát cấp độ
                      </span>
                    )}
                  </div>
                  <h3 className="font-jp text-lg font-bold text-on-surface mt-1.5">
                    {previewTarget.version.titleJa}
                  </h3>
                  {previewTarget.version.titleVi && (
                    <p className="text-xs text-on-surface-variant">{previewTarget.version.titleVi}</p>
                  )}
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  {previewDetail &&
                    previewDetail.sentences.some((s) => isSafeHttpsUrl(s.audioUrl)) && (
                      <button
                        type="button"
                        onClick={() => handleListenVersion(previewDetail.versionId)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer transition-colors ${
                          playingAudio?.versionId === previewDetail.versionId
                            ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                            : 'bg-primary text-on-primary hover:opacity-95'
                        }`}
                      >
                        {playingAudio?.versionId === previewDetail.versionId ? (
                          <Square size={11} className="fill-current" />
                        ) : (
                          <Play size={12} className="fill-current" />
                        )}
                        {playingAudio?.versionId === previewDetail.versionId
                          ? `Dừng (${playingAudio.sentenceIdx + 1}/${playingAudio.total})`
                          : 'Nghe toàn bài'}
                      </button>
                    )}
                  <button
                    type="button"
                    onClick={() => {
                      stopPreviewAudio();
                      setPreviewTarget(null);
                    }}
                    aria-label="Đóng xem trước"
                    className="p-1.5 rounded-xl text-outline hover:bg-surface-container cursor-pointer"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              <div className="p-5 overflow-y-auto space-y-4">
                {previewTarget.version.levelMetrics && (
                  <div className="p-3 rounded-xl bg-amber-500/8 border border-amber-500/25 text-xs space-y-1">
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-on-surface-variant">
                      <span>
                        8-gram:{' '}
                        <strong>
                          {typeof previewTarget.version.levelMetrics.ngramOverlap8 === 'number'
                            ? `${(previewTarget.version.levelMetrics.ngramOverlap8 * 100).toFixed(1)}%`
                            : '—'}
                        </strong>
                      </span>
                      <span>
                        LCS: <strong>{previewTarget.version.levelMetrics.longestCommonSubstring ?? '—'}</strong>
                      </span>
                      {previewTarget.version.levelMetrics.llmSecondOpinion && (
                        <span>
                          LLM: <strong>{previewTarget.version.levelMetrics.llmSecondOpinion}</strong>
                        </span>
                      )}
                      {typeof previewTarget.version.levelMetrics.avgSentenceLength === 'number' && (
                        <span>
                          Câu TB: <strong>{previewTarget.version.levelMetrics.avgSentenceLength} ký tự</strong>
                        </span>
                      )}
                    </div>
                    {Array.isArray(previewTarget.version.levelMetrics.harderThanTargetWords) &&
                      previewTarget.version.levelMetrics.harderThanTargetWords.length > 0 && (
                        <div className="text-amber-900 dark:text-amber-300">
                          <span className="font-semibold">Từ vượt cấp: </span>
                          <span className="font-jp">
                            {previewTarget.version.levelMetrics.harderThanTargetWords.join('、')}
                          </span>
                        </div>
                      )}
                  </div>
                )}

                {previewLoading ? (
                  <div className="py-8 text-center text-xs text-outline flex items-center justify-center gap-2">
                    <Loader2 size={15} className="animate-spin text-primary" />
                    Đang tải nội dung bài đọc...
                  </div>
                ) : previewError ? (
                  <div className="p-4 rounded-xl bg-error-container/30 border border-error/40 text-xs text-error">
                    {previewError}
                  </div>
                ) : previewDetail ? (
                  <div className="space-y-2.5">
                    {previewDetail.sentences.map((s) => {
                      const hasAudio = isSafeHttpsUrl(s.audioUrl);
                      const isPlayingThis =
                        playingAudio?.versionId === previewDetail.versionId &&
                        playingAudio.sentenceIdx === s.idx;
                      return (
                        <div
                          key={s.idx}
                          className={`p-3 rounded-xl border transition-colors flex items-start gap-2.5 ${
                            isPlayingThis
                              ? 'bg-primary/8 border-primary/50'
                              : 'bg-surface-container-low/60 border-outline-variant/30'
                          }`}
                        >
                          {hasAudio && (
                            <button
                              type="button"
                              onClick={() => {
                                if (isPlayingThis) {
                                  stopPreviewAudio();
                                } else {
                                  playAudioSequence(
                                    previewDetail.versionId,
                                    [{ idx: s.idx, url: s.audioUrl! }],
                                    0,
                                    true
                                  );
                                }
                              }}
                              aria-label={isPlayingThis ? 'Dừng câu này' : `Nghe câu ${s.idx + 1}`}
                              className={`mt-0.5 p-1.5 rounded-lg shrink-0 cursor-pointer transition-colors ${
                                isPlayingThis
                                  ? 'bg-primary text-on-primary'
                                  : 'bg-surface-container text-primary hover:bg-primary hover:text-on-primary'
                              }`}
                            >
                              {isPlayingThis ? (
                                <Square size={11} className="fill-current" />
                              ) : (
                                <Play size={11} className="fill-current" />
                              )}
                            </button>
                          )}
                          <div className="space-y-1 min-w-0 flex-1">
                            <p className="font-jp text-base text-on-surface leading-relaxed">{s.text}</p>
                            {s.translationVi && (
                              <p className="text-xs text-on-surface-variant">{s.translationVi}</p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : null}
              </div>

              {/* Footer quick approve right inside preview modal if REVIEW */}
              {previewTarget.article.status === 'REVIEW' && (
                <div className="px-5 py-3 border-t border-outline-variant/40 bg-surface-container-low/40 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={async () => {
                      const id = previewTarget.article.id;
                      setPreviewTarget(null);
                      await handleReject(id, false);
                    }}
                    className="px-3.5 py-1.5 rounded-xl border border-error/30 text-error text-xs font-bold hover:bg-error/10 cursor-pointer"
                  >
                    Từ chối
                  </button>
                  <button
                    type="button"
                    onClick={async () => {
                      const id = previewTarget.article.id;
                      setPreviewTarget(null);
                      await handlePublish(id);
                    }}
                    className="px-4 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 cursor-pointer"
                  >
                    Duyệt & Xuất bản ngay
                  </button>
                </div>
              )}
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
