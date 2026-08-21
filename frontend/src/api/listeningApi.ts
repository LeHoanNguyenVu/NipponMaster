import axiosClient from './axiosClient';

export interface ListeningScenarioSummary {
  id: string;
  title: string;
  titleJp: string;
  level: 'N5' | 'N4' | 'N3' | 'N2' | 'N1';
  category: 'DINING' | 'TRAVEL' | 'WORK' | 'HEALTH' | 'SHOPPING' | 'LIFE';
  durationMin: number;
  difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  ambienceType: 'KONBINI' | 'RAMEN' | 'STATION' | 'CLINIC' | 'OFFICE' | 'CAFE' | 'STREET';
  characterName: string;
  characterRole: string;
  characterAvatar: string;
  description: string;
  keyVocabCount: number;
  totalTurns: number;
}

export interface DialogueOption {
  optionId: string;
  japaneseText: string;
  romajiText: string;
  vietnameseText: string;
  nextNodeId: string;
  etiquetteRating: 'PERFECT' | 'POLITE' | 'CASUAL' | 'RUDE';
  score: number;
  feedback: string;
}

export interface ListeningQuiz {
  quizId: string;
  questionJp: string;
  questionVi: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface DialogueNode {
  nodeId: string;
  speaker: 'NPC' | 'USER' | 'ANNOUNCER';
  speakerName: string;
  japaneseText: string;
  furiganaText: string;
  romajiText: string;
  vietnameseText: string;
  audioSpeedHint: 'SLOW' | 'NORMAL' | 'FAST';
  culturalNote?: string;
  options: DialogueOption[];
  quiz?: ListeningQuiz;
  isEnding: boolean;
  endingType?: 'SUCCESS' | 'EXCELLENT' | 'RETRY';
}

export interface KeyVocabulary {
  word: string;
  reading: string;
  meaning: string;
  level: string;
}

export interface ListeningScenarioDetail {
  summary: ListeningScenarioSummary;
  initialNodeId: string;
  nodes: Record<string, DialogueNode>;
  keyVocabularies: KeyVocabulary[];
  grammarPoints: string[];
}

export interface SubmitListeningSessionRequest {
  scenarioId: string;
  visitedNodeIds: string[];
  quizCorrectCount: number;
  quizTotalCount: number;
  etiquetteScoreTotal: number;
  durationSeconds: number;
}

export interface SubmitListeningSessionResponse {
  scenarioId: string;
  totalScore: number;
  listeningAccuracyPercent: number;
  etiquetteScorePercent: number;
  earnedXp: number;
  earnedCoins: number;
  performanceRank: 'S' | 'A' | 'B' | 'C';
  badgeUnlocked?: string;
  feedbackMessage: string;
}

export const listeningApi = {
  getScenarios: async (level?: string, category?: string, keyword?: string): Promise<ListeningScenarioSummary[]> => {
    const res: any = await axiosClient.get('/listening/scenarios', {
      params: { level, category, keyword },
    });
    return Array.isArray(res?.data) ? res.data : (Array.isArray(res) ? res : []);
  },

  getScenarioDetail: async (id: string): Promise<ListeningScenarioDetail> => {
    const res: any = await axiosClient.get(`/listening/scenarios/${id}`);
    return res?.data ?? res;
  },

  submitSession: async (payload: SubmitListeningSessionRequest): Promise<SubmitListeningSessionResponse> => {
    const res: any = await axiosClient.post('/listening/submit-session', payload);
    return res?.data ?? res;
  },
};
