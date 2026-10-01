import axiosClient from './axiosClient';

export type SyntaxRole = 'SUBJECT' | 'PREDICATE' | 'COMPLEMENT' | 'OBJECT' | 'MODIFIER';

export interface SyntaxToken {
  surface: string;
  furigana: string;
  romaji: string;
  partOfSpeech: string;
  role: SyntaxRole;
  kanjiSinoVietnamese: string;
  meaning: string;
}

export interface BreakdownResponse {
  originalText: string;
  formattedRubyHtml: string;
  tokens: SyntaxToken[];
  fullVietnameseTranslation: string;
  grammarNotes: string;
}

export const aiStudioApi = {
  breakdownSentence: async (text: string): Promise<BreakdownResponse> => {
    const res = await axiosClient.post('/ai/reading/sentence-breakdown', { text });
    return res.data.data;
  },
};
