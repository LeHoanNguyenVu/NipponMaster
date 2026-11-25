import axiosClient from './axiosClient';

export type ReadingLevel = 'N5' | 'N4' | 'N3' | 'N2' | 'N1';
export type ReadingCategory =
  | 'SOCIETY'
  | 'LIFE'
  | 'ECONOMY'
  | 'SCI_TECH'
  | 'SPORTS'
  | 'CULTURE'
  | 'WEATHER';

export interface ReadingToken {
  s: string; // surface
  r: string; // reading (hiragana)
  l: string; // lemma
  pos: string;
  lv?: string | null;
}

export interface ReadingSentence {
  idx: number;
  text: string;
  translationVi?: string | null;
  tokens?: ReadingToken[];
  audioUrl?: string | null;
  durationMs?: number | null;
}

export interface ReadingKeyVocab {
  word: string;
  reading: string;
  meaningVi: string;
  jlptLevel?: string;
}

export interface ReadingArticleCard {
  versionId: number;
  articleId: number;
  jlptLevel: ReadingLevel;
  computedLevel?: string | null;
  category: ReadingCategory;
  titleJa: string;
  titleVi?: string | null;
  charCount: number;
  estimatedMinutes: number;
  voiceName: string;
  audioStatus: 'PENDING' | 'READY' | 'FAILED';
  sourceName: string;
  sourceLicense: 'PDL_1_0' | 'FACTS_ONLY' | string;
  coverImageUrl?: string | null;
  coverImageCredit?: string | null;
  publishedAt?: string | null;
  completed: boolean;
}

export interface ReadingArticleListResponse {
  items: ReadingArticleCard[];
  page: number;
  size: number;
  totalItems: number;
  totalPages: number;
}

export interface OtherLevelLink {
  versionId: number;
  jlptLevel: ReadingLevel;
  titleJa: string;
  audioStatus: string;
}

export interface ReadingVersionDetail {
  versionId: number;
  articleId: number;
  jlptLevel: ReadingLevel;
  computedLevel?: string | null;
  category: ReadingCategory;
  titleJa: string;
  titleVi?: string | null;
  charCount: number;
  estimatedMinutes: number;
  voiceName: string;
  audioStatus: 'PENDING' | 'READY' | 'FAILED';
  sourceName: string;
  sourceLicense: 'PDL_1_0' | 'FACTS_ONLY' | string;
  sourceUrl: string;
  coverImageUrl?: string | null;
  coverImageCredit?: string | null;
  publishedAt?: string | null;
  sentences: ReadingSentence[];
  keyVocab: ReadingKeyVocab[];
  otherLevels: OtherLevelLink[];
  completed: boolean;
}

export interface CompleteReadingResponse {
  versionId: number;
  completed: boolean;
  totalCompleted: number;
}

interface ApiEnvelope<T> {
  success: boolean;
  message?: string;
  data: T;
}

export const readingApi = {
  async listArticles(params: {
    level?: string;
    category?: string;
    page?: number;
    size?: number;
  }): Promise<ReadingArticleListResponse> {
    const query = new URLSearchParams();
    if (params.level && params.level !== 'ALL') query.set('level', params.level);
    if (params.category && params.category !== 'ALL') query.set('category', params.category);
    if (params.page !== undefined) query.set('page', String(params.page));
    if (params.size !== undefined) query.set('size', String(params.size));
    const res = (await axiosClient.get(`/reading/articles?${query.toString()}`)) as unknown as ApiEnvelope<ReadingArticleListResponse>;
    return res.data;
  },

  async getRecommended(level?: string): Promise<ReadingArticleCard | null> {
    const query = level && level !== 'ALL' ? `?level=${encodeURIComponent(level)}` : '';
    const res = (await axiosClient.get(`/reading/recommended${query}`)) as unknown as ApiEnvelope<ReadingArticleCard | null>;
    return res?.data ?? null;
  },

  async getVersionDetail(versionId: number): Promise<ReadingVersionDetail> {
    const res = (await axiosClient.get(`/reading/versions/${versionId}`)) as unknown as ApiEnvelope<ReadingVersionDetail>;
    return res.data;
  },

  async completeVersion(versionId: number, readingSeconds?: number): Promise<CompleteReadingResponse> {
    const res = (await axiosClient.post(`/reading/versions/${versionId}/complete`, {
      readingSeconds: readingSeconds ?? null,
    })) as unknown as ApiEnvelope<CompleteReadingResponse>;
    return res.data;
  },

  async quickTranslate(text: string, targetLang: 'vi' | 'en' = 'vi'): Promise<string> {
    const res = (await axiosClient.post('/translate/fast', {
      text,
      sourceLang: 'ja',
      targetLang,
    })) as unknown as ApiEnvelope<{ translatedText?: string }>;
    return res?.data?.translatedText || '';
  },
};
