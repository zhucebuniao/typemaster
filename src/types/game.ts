export interface Word {
  word: string;
  meaning: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface Sentence {
  sentence: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface GameStats {
  wpm: number;
  accuracy: number;
  totalWords: number;
  correctWords: number;
  incorrectWords: number;
  timeElapsed: number;
}

export interface UserProgress {
  level: number;
  totalScore: number;
  bestWpm: number;
  bestAccuracy: number;
  mistakeWords: Word[];
  achievementCount: number;
}

export type GameContent = Word | Sentence;