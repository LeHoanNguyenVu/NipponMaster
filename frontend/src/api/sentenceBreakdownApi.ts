import axiosClient from './axiosClient';

export interface SentenceAnalyzeRequest {
  sentence: string;
}

export interface TokenDto {
  surface: string;
  baseForm: string;
  reading: string;
  partOfSpeech: string;
  partOfSpeechLabel: string;
  explanation: string;
  jlptLevel: string;
}

export interface MatchedGrammarDto {
  grammarId: number;
  pattern: string;
  structure: string;
  meaning: string;
  explanation: string;
  jlptLevel: string;
}

export interface SentenceAnalyzeResponse {
  originalSentence: string;
  translatedSentence: string;
  furiganaRubyHtml: string;
  tokens: TokenDto[];
  matchedGrammars: MatchedGrammarDto[];
}

export const sentenceBreakdownApi = {
  analyzeSentence: async (sentence: string): Promise<SentenceAnalyzeResponse> => {
    const response = await axiosClient.post<SentenceAnalyzeResponse>('/api/v1/sentence-breakdown/analyze', { sentence });
    return response.data;
  }
};
