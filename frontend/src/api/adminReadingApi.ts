import axiosClient from './axiosClient';
import type { ReadingVersionDetail } from './readingApi';

export interface AdminVersionSummary {
  id: number;
  jlptLevel: string;
  titleJa: string;
  titleVi?: string | null;
  charCount: number;
  computedLevel?: string | null;
  levelMetrics?: Record<string, any> | null;
  voiceName: string;
  audioStatus: 'PENDING' | 'READY' | 'FAILED' | string;
}

export interface AdminArticleSummary {
  id: number;
  sourceName: string;
  sourceLicense: string;
  sourceUrl: string;
  sourceTitle?: string | null;
  sourcePublishedAt?: string | null;
  category: string;
  facts: string[];
  status: 'REVIEW' | 'PUBLISHED' | 'REJECTED' | string;
  coverImageUrl?: string | null;
  coverImageCredit?: string | null;
  coverImageSource?: 'GEMINI' | 'PEXELS' | 'MANUAL' | string | null;
  createdAt?: string | null;
  publishedAt?: string | null;
  versions: AdminVersionSummary[];
}

export interface IngestReport {
  fetchedItems: number;
  skippedDuplicates: number;
  createdArticles: number;
  createdVersions: number;
  failedItems: number;
  errors: string[];
}

export interface IngestStatus {
  running: boolean;
  targetEvents: number;
  processedEvents: number;
  createdArticles: number;
  createdVersions: number;
  skippedDuplicates: number;
  failedItems: number;
  currentMessage?: string | null;
  startedAt?: string | null;
  finishedAt?: string | null;
  lastReport?: IngestReport | null;
}

export interface AudioGenerationResult {
  versionId: number;
  articleId: number;
  jlptLevel: string;
  voiceName: string;
  audioStatus: string;
  totalSentences: number;
  readySentences: number;
  failedSentences: number;
  totalDurationMs: number;
}

export const adminReadingApi = {
  async listArticles(params: {
    status?: string;
    needsReview?: boolean;
    limit?: number;
  }): Promise<AdminArticleSummary[]> {
    const query = new URLSearchParams();
    if (params.status) query.set('status', params.status);
    if (params.needsReview) query.set('needsReview', 'true');
    query.set('limit', String(params.limit ?? 30));
    const res: any = await axiosClient.get(`/admin/reading/articles?${query.toString()}`);
    return res?.data ?? res ?? [];
  },

  async triggerIngest(params: { maxEvents?: number; source?: string }): Promise<IngestReport> {
    const query = new URLSearchParams();
    if (params.maxEvents) query.set('maxEvents', String(params.maxEvents));
    if (params.source && params.source !== 'ALL') query.set('source', params.source);
    const res: any = await axiosClient.post(`/admin/reading/ingest?${query.toString()}`);
    return res?.data ?? res;
  },

  async startIngestAsync(params: { maxEvents?: number; source?: string }): Promise<IngestStatus> {
    const query = new URLSearchParams();
    if (params.maxEvents) query.set('maxEvents', String(params.maxEvents));
    if (params.source && params.source !== 'ALL') query.set('source', params.source);
    const res: any = await axiosClient.post(`/admin/reading/ingest/start?${query.toString()}`);
    return res?.data ?? res;
  },

  async getIngestStatus(): Promise<IngestStatus> {
    const res: any = await axiosClient.get('/admin/reading/ingest/status');
    return res?.data ?? res;
  },

  async cancelIngest(): Promise<IngestStatus> {
    const res: any = await axiosClient.post('/admin/reading/ingest/cancel');
    return res?.data ?? res;
  },

  async publishArticle(articleId: number, generateAudio = true): Promise<AdminArticleSummary> {
    const res: any = await axiosClient.post(
      `/admin/reading/articles/${articleId}/publish?generateAudio=${generateAudio}`
    );
    return res?.data ?? res;
  },

  async rejectArticle(articleId: number): Promise<AdminArticleSummary> {
    const res: any = await axiosClient.post(`/admin/reading/articles/${articleId}/reject`);
    return res?.data ?? res;
  },

  async reclassifyArticle(articleId: number): Promise<AdminArticleSummary> {
    const res: any = await axiosClient.post(`/admin/reading/articles/${articleId}/reclassify`);
    return res?.data ?? res;
  },

  async generateCoverImage(articleId: number): Promise<AdminArticleSummary> {
    const res: any = await axiosClient.post(`/admin/reading/articles/${articleId}/cover-image`);
    return res?.data ?? res;
  },

  async backfillCoverImages(limit = 40): Promise<{ updatedCount: number }> {
    const res: any = await axiosClient.post(`/admin/reading/articles/backfill-covers?limit=${limit}`);
    return res?.data ?? res;
  },

  async updateCoverImage(
    articleId: number,
    payload: { coverImageUrl: string; coverImageCredit?: string }
  ): Promise<AdminArticleSummary> {
    const res: any = await axiosClient.put(`/admin/reading/articles/${articleId}/cover-image`, payload);
    return res?.data ?? res;
  },

  async getVersionPreview(versionId: number): Promise<ReadingVersionDetail> {
    const res: any = await axiosClient.get(`/admin/reading/versions/${versionId}`);
    return res?.data ?? res;
  },

  async generateVersionAudio(
    versionId: number,
    options?: { voice?: 'Kore' | 'Puck'; force?: boolean }
  ): Promise<AudioGenerationResult> {
    const query = new URLSearchParams();
    if (options?.voice) query.set('voice', options.voice);
    if (options?.force) query.set('force', 'true');
    const qs = query.toString();
    const res: any = await axiosClient.post(
      `/admin/reading/versions/${versionId}/audio${qs ? `?${qs}` : ''}`
    );
    return res?.data ?? res;
  },
};
