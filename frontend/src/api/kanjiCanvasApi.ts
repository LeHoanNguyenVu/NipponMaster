import axiosClient from './axiosClient';

export interface Point {
  x: number;
  y: number;
}

export interface DrawnStroke {
  points: Point[];
}

export interface KanjiRecognizeRequest {
  targetKanji?: string;
  drawnStrokes: DrawnStroke[];
  canvasWidth?: number;
  canvasHeight?: number;
}

export interface StrokeFeedback {
  strokeIndex: number;
  isCorrectOrder: boolean;
  isCorrectDirection: boolean;
  comment: string;
}

export interface MatchedKanji {
  character: string;
  meaning: string;
  onReading: string;
  kunReading: string;
  strokeCount: number;
  jlptLevel: string;
  confidencePercent: number;
}

export interface KanjiRecognizeResponse {
  accuracyScore: number;
  strokeCountMatched: boolean;
  feedback: string;
  strokeFeedbacks: StrokeFeedback[];
  topMatches: MatchedKanji[];
}

export const kanjiCanvasApi = {
  recognizeDrawnKanji: (payload: KanjiRecognizeRequest): Promise<any> =>
    axiosClient.post('/kanjis/canvas/recognize', payload),

  evaluateTargetKanji: (payload: KanjiRecognizeRequest): Promise<any> =>
    axiosClient.post('/kanjis/canvas/evaluate', payload),
};
