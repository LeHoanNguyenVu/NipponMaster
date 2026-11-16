import { useEffect, useState } from 'react';
import { Bot, Database, Gauge, RefreshCw, Play, CheckCircle2, XCircle, Zap } from 'lucide-react';
import axiosClient from '../../api/axiosClient';

interface AiMetricsSnapshot {
  translateTotal: number;
  translateCacheHits: number;
  translateDictHits: number;
  translateAiCalls: number;
  translateFallbacks: number;
  translateRateLimited: number;
  translateCacheOrDictHitRatePercent: number;
  translateP50Ms: number;
  translateP95Ms: number;
  chatTotal: number;
  chatRagHits: number;
  chatRagHitRatePercent: number;
  chatErrors: number;
  chatRateLimited: number;
  chatP50Ms: number;
  chatP95Ms: number;
  upstream429Count: number;
  lastUpstream429At?: string;
}

interface RagStats {
  pgvectorEnabled: boolean;
  syncRunning: boolean;
  totalChunks: number;
  embeddedChunks: number;
  countBySourceType: Record<string, number>;
}

interface EvalReport {
  totalQueries: number;
  passedQueries: number;
  accuracyPercent: number;
  avgLatencyMs: number;
  p95LatencyMs: number;
  cases: Array<{
    query: string;
    expectedKeyword: string;
    passed: boolean;
    latencyMs: number;
    topTitle?: string;
    topScore: number;
  }>;
}

export default function AiTelemetryConsole() {
  const [metrics, setMetrics] = useState<AiMetricsSnapshot | null>(null);
  const [ragStats, setRagStats] = useState<RagStats | null>(null);
  const [evalReport, setEvalReport] = useState<EvalReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [evaluating, setEvaluating] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const res: any = await axiosClient.get('/admin/ai/metrics');
      const data = res.data ?? res;
      setMetrics(data.metrics);
      setRagStats(data.ragStats);
    } catch {
      setNotice('Chưa tải được dữ liệu giám sát AI (hãy chắc chắn backend đã nạp Phase 7).');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const triggerSync = async () => {
    setSyncing(true);
    setNotice(null);
    try {
      await axiosClient.post('/ai/rag/sync?async=true');
      setNotice('Đã kích hoạt đồng bộ tăng dần kho vector RAG ở chế độ nền.');
      await loadData();
    } catch {
      setNotice('Không kích hoạt được đồng bộ RAG.');
    } finally {
      setSyncing(false);
    }
  };

  const runEvaluation = async () => {
    setEvaluating(true);
    setNotice(null);
    try {
      const res: any = await axiosClient.post('/ai/rag/evaluate');
      setEvalReport(res.data ?? res);
    } catch {
      setNotice('Chạy bộ đánh giá 30 câu RAG thất bại.');
    } finally {
      setEvaluating(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-extrabold text-on-surface flex items-center gap-2">
            <Bot className="text-primary" size={22} />
            Giám Sát Module AI & Kho Tri Thức RAG
          </h2>
          <p className="text-xs text-on-surface-variant">
            Theo dõi độ trễ p50/p95, tỷ lệ Cache Hit, hạn mức người dùng và độ chính xác RAG.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={loadData}
            disabled={loading}
            className="px-3 py-2 rounded-xl bg-surface-container-low border border-outline-variant/50 text-xs font-bold text-on-surface flex items-center gap-1.5 hover:bg-surface-container cursor-pointer"
          >
            <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
            Làm mới
          </button>
          <button
            onClick={triggerSync}
            disabled={syncing || ragStats?.syncRunning}
            className="px-3 py-2 rounded-xl bg-secondary text-on-secondary text-xs font-bold flex items-center gap-1.5 hover:opacity-95 disabled:opacity-50 cursor-pointer"
          >
            <Database size={14} />
            {ragStats?.syncRunning ? 'Đang đồng bộ...' : 'Đồng bộ RAG'}
          </button>
          <button
            onClick={runEvaluation}
            disabled={evaluating}
            className="px-3 py-2 rounded-xl bg-primary text-on-primary text-xs font-bold flex items-center gap-1.5 hover:opacity-95 disabled:opacity-50 cursor-pointer"
          >
            <Play size={14} />
            {evaluating ? 'Đang chấm 30 câu...' : 'Đánh giá RAG (30 câu)'}
          </button>
        </div>
      </div>

      {notice && (
        <div className="p-3 rounded-2xl bg-primary/10 border border-primary/25 text-xs font-semibold text-primary">
          {notice}
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Translate Metrics */}
        <div className="bg-surface-container-lowest p-5 rounded-3xl border border-outline-variant/40 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-on-surface-variant">Dịch Nhanh AI</span>
            <Zap size={18} className="text-primary" />
          </div>
          <div className="text-2xl font-extrabold text-on-surface">
            {metrics?.translateTotal ?? 0} lượt
          </div>
          <div className="text-xs text-on-surface-variant space-y-1">
            <div>Cache/Dict Hit Rate: <strong className="text-primary">{metrics?.translateCacheOrDictHitRatePercent ?? 0}%</strong></div>
            <div>Latency p50 / p95: <strong>{metrics?.translateP50Ms ?? 0}ms / {metrics?.translateP95Ms ?? 0}ms</strong></div>
            <div>AI calls: {metrics?.translateAiCalls ?? 0} · Rate-limited: {metrics?.translateRateLimited ?? 0}</div>
          </div>
        </div>

        {/* Sensei Chat Metrics */}
        <div className="bg-surface-container-lowest p-5 rounded-3xl border border-outline-variant/40 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-on-surface-variant">Sensei AI Chat</span>
            <Gauge size={18} className="text-secondary" />
          </div>
          <div className="text-2xl font-extrabold text-on-surface">
            {metrics?.chatTotal ?? 0} tin nhắn
          </div>
          <div className="text-xs text-on-surface-variant space-y-1">
            <div>RAG Hit Rate: <strong className="text-secondary">{metrics?.chatRagHitRatePercent ?? 0}%</strong></div>
            <div>Latency p50 / p95: <strong>{metrics?.chatP50Ms ?? 0}ms / {metrics?.chatP95Ms ?? 0}ms</strong></div>
            <div>Lỗi: {metrics?.chatErrors ?? 0} · Rate-limited: {metrics?.chatRateLimited ?? 0} · Gemini 429: {metrics?.upstream429Count ?? 0}</div>
          </div>
        </div>

        {/* RAG Vector Store Stats */}
        <div className="bg-surface-container-lowest p-5 rounded-3xl border border-outline-variant/40 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-on-surface-variant">Vector DB (pgvector)</span>
            <Database size={18} className="text-emerald-600" />
          </div>
          <div className="text-2xl font-extrabold text-on-surface">
            {(ragStats?.embeddedChunks ?? 0).toLocaleString('vi-VN')} vectors
          </div>
          <div className="text-xs text-on-surface-variant space-y-1">
            <div>Extension pgvector: <strong>{ragStats?.pgvectorEnabled ? 'Đang bật' : 'Chưa bật'}</strong></div>
            <div className="flex flex-wrap gap-1 pt-1">
              {ragStats?.countBySourceType &&
                Object.entries(ragStats.countBySourceType).map(([k, v]) => (
                  <span key={k} className="px-2 py-0.5 rounded-lg bg-surface-container-low text-[10px] font-mono">
                    {k}: {v}
                  </span>
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* RAG Benchmark Report */}
      {evalReport && (
        <div className="bg-surface-container-lowest p-5 rounded-3xl border border-outline-variant/40 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-sm font-bold text-on-surface">
              Kết quả đánh giá 30 câu chuẩn RAG: {evalReport.passedQueries}/{evalReport.totalQueries} đạt ({evalReport.accuracyPercent}%)
            </h3>
            <span className="text-xs text-outline font-mono">
              Avg: {evalReport.avgLatencyMs}ms · p95: {evalReport.p95LatencyMs}ms
            </span>
          </div>
          <div className="max-h-72 overflow-y-auto divide-y divide-outline-variant/25">
            {evalReport.cases.map((c, idx) => (
              <div key={idx} className="py-2 flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2 min-w-0">
                  {c.passed ? (
                    <CheckCircle2 size={14} className="text-emerald-600 shrink-0" />
                  ) : (
                    <XCircle size={14} className="text-error shrink-0" />
                  )}
                  <span className="truncate font-medium text-on-surface">{c.query}</span>
                </div>
                <div className="flex items-center gap-3 shrink-0 text-outline font-mono">
                  <span className="truncate max-w-[180px]">{c.topTitle || '—'}</span>
                  <span>{c.latencyMs}ms</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

