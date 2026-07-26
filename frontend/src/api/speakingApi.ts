import axiosClient from './axiosClient';

export interface SpeakingScenario {
  id: string;
  title: string;
  titleJp: string;
  description: string;
  icon: string;
  level: string;
  aiGreeting: string;
  aiGreetingReading: string;
  suggestedPhrases: string[];
}

export interface ConversationEntry {
  role: 'user' | 'ai';
  message: string;
}

export interface CorrectionItem {
  original: string;
  corrected: string;
  explanation: string;
  type: 'grammar' | 'vocabulary' | 'pronunciation';
}

export interface ScoreBreakdown {
  pronunciation: number;
  grammar: number;
  vocabulary: number;
  overall: number;
  feedback: string;
}

export interface SpeakingTurnResponse {
  aiReply: string;
  aiReplyReading: string;
  aiReplyMeaning: string;
  corrections: CorrectionItem[];
  score: ScoreBreakdown;
  suggestedNextPhrases: string[];
  conversationComplete: boolean;
}

export const speakingApi = {
  getScenarios: (): Promise<any> =>
    axiosClient.get('/speaking/scenarios'),

  startScenario: (scenarioId: string, level: string = 'N5'): Promise<any> =>
    axiosClient.post('/speaking/start', { scenarioId, level }),

  sendTurn: (scenarioId: string, userMessage: string, conversationHistory: ConversationEntry[]): Promise<any> =>
    axiosClient.post('/speaking/turn', { scenarioId, userMessage, conversationHistory }),
};
