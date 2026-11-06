// ─── KANJI MODULE TYPES & DTOs ──────────────────────────────────────────────

export interface RoadmapChapter {
  id: number;
  chapterNumber: number;
  jlptLevel: string;
  titleJa: string;
  titleVi: string;
  titleEn: string;
  kanjiCount: number;
  displayOrder: number;
  illustrationUrl: string;
  description: string;
  isUnlocked: boolean;
  highestScore: number;
  isPassed: boolean;
}

export interface AchievementStage {
  id: number;
  stage: number;
  title: string;
  description: string;
  passPercentage: number;
  testDataJson: string;
  displayOrder: number;
}

export interface RoadmapResponse {
  level: string;
  totalChapters: number;
  completedChapters: number;
  totalKanji: number;
  learnedKanji: number;
  chapters: RoadmapChapter[];
  achievementTests: AchievementStage[];
}

export interface ChapterKanjiItem {
  id: number;
  character: string;
  onReading?: string;
  kunReading?: string;
  romaji?: string;
  hanViet?: string;
  meaning: string;
  strokeCount: number;
  strokeGuide?: string;
  radical?: string;
  mnemonicHint?: string;
  mnemonicIcon?: string;
  mnemonicTitle?: string;
  exampleSentence?: string;
  exampleMeaning?: string;
  relatedWords?: string;
  chapterOrder?: number;
  imageUrl?: string;
}

export interface ChapterVocab {
  id: number;
  word: string;
  reading: string;
  romaji: string;
  meaningVi: string;
  meaningEn: string;
  displayOrder: number;
}

export interface ChapterExercise {
  id: number;
  exerciseType: 'READING' | 'WRITING';
  questionText: string;
  targetWord: string;
  correctAnswer: string;
  optionsJson?: string;
  explanation?: string;
  displayOrder: number;
}

export interface ChapterMinigame {
  id: number;
  gameType: string;
  title: string;
  instruction: string;
  imageUrl?: string;
  gameDataJson: string;
  displayOrder: number;
}

export interface UserChapterProgress {
  isUnlocked: boolean;
  highestScore: number;
  isPassed: boolean;
}

export interface ChapterDetailResponse {
  chapter: RoadmapChapter;
  kanjis: ChapterKanjiItem[];
  vocabularies: ChapterVocab[];
  readingExercises: ChapterExercise[];
  writingExercises: ChapterExercise[];
  minigames: ChapterMinigame[];
  userProgress?: UserChapterProgress | null;
}

export interface SubmitResult {
  score: number;
  isPassed: boolean;
  unlockedNextChapter: boolean;
  nextChapterId?: number;
  nextChapterNumber?: number;
  message: string;
}

export interface TestHistoryItem {
  id: string;
  date: string;
  score: number;
  correctCount: number;
  totalQuestions: number;
  isPassed: boolean;
  answers: Record<number, string>;
}

// Xếp hạng cấp độ JLPT: STARTER: 1, N5: 1, N4: 2, N3: 3, N2: 4, N1: 5
export const JLPT_RANK: Record<string, number> = {
  STARTER: 1,
  N5: 1,
  N4: 2,
  N3: 3,
  N2: 4,
  N1: 5,
};


export interface MinigameWordFound {
  word: string;
  hiragana: string;
  meaning: string;
}

export interface MinigameQuestionItem {
  id: number;
  prompt?: string;
  promptJa?: string;
  promptVi?: string;
  meaningVi?: string;
  sentence?: string;
  wrongKanji?: string;
  correctKanji?: string;
  options?: string[];
  before?: string;
  after?: string;
  targetWord?: string;
  hiragana?: string;
  meaning?: string;
  explanation?: string;
  answer?: string;
  combine?: string;
  blankReading?: string;
  formula?: string;
  counter?: string;
  items?: string[];
  item?: string;
}

export interface MinigameGroupItem {
  kana: string;
  questions?: MinigameQuestionItem[];
}

export interface MinigameBlankItem {
  id: number;
  num?: number | string;
  answer: string;
  acceptedAnswers?: string[];
  targetWord?: string;
  hiragana?: string;
  meaning?: string;
  explanation?: string;
}

export interface MinigameDialogueItem {
  speaker?: string;
  name?: string;
  text: string;
  audio?: string;
}

export interface MinigamePuzzleItem {
  id: number;
  answer: string;
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  words?: string[];
}

export interface MinigameExample {
  prompt?: string;
  formula?: string;
  item?: string;
  kanji?: string;
  reading?: string;
  items?: string;
  answer?: string;
  label?: string;
}

export interface MinigameProblemItem {
  id: number;
  items: string;
  options?: string[];
  answer: string;
}

export interface MinigameSectionItem {
  id: number;
  label: string;
  options?: string[];
  answer: string;
}

export interface ParsedMinigameData {
  grid?: string[][];
  answer?: string;
  suggestedChoices?: string[];
  hanViet?: string;
  meaning?: string;
  wordsFound?: MinigameWordFound[];
  groups?: MinigameGroupItem[];
  questions?: MinigameQuestionItem[];
  wordBank?: string[];
  colA?: string[];
  colB?: string[];
  dialogue?: MinigameDialogueItem[];
  blanks?: MinigameBlankItem[];
  puzzles?: MinigamePuzzleItem[];
  example?: MinigameExample;
  problems?: MinigameProblemItem[];
  sections?: MinigameSectionItem[];
}
