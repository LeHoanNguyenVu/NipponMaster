import axiosClient from './axiosClient';

export interface SyllablePitch {
  syllable: string;
  isHigh: boolean;
  pitchHz: number;
}

export interface PitchAccentResponse {
  text: string;
  romaji: string;
  pitchType: 'ATAMADAKA' | 'NAKADAKA' | 'ODAKA' | 'HEIBAN';
  pitchTypeName: string;
  pitchDescription: string;
  syllables: SyllablePitch[];
}

export interface EvaluatePitchResponse {
  accuracyPercent: number;
  feedbackMessage: string;
  mismatchedIndexes: number[];
  expectedSyllables: SyllablePitch[];
}

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
  getPitchAccent: async (text: string): Promise<PitchAccentResponse> => {
    const res = await axiosClient.get('/ai/speaking/pitch-accent', { params: { text } });
    return res.data.data;
  },

  evaluatePitch: async (text: string, userRecordedPitches?: number[]): Promise<EvaluatePitchResponse> => {
    const res = await axiosClient.post('/ai/speaking/evaluate-pitch', { text, userRecordedPitches });
    return res.data.data;
  },

  breakdownSentence: async (text: string): Promise<BreakdownResponse> => {
    const res = await axiosClient.post('/ai/reading/sentence-breakdown', { text });
    return res.data.data;
  },
};
