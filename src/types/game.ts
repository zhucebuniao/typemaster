export interface Word {
  word: string;
  meaning: string;
  difficulty: 'easy' | 'medium' | 'hard';
  theme?: string;
}

export interface Sentence {
  sentence: string;
  difficulty: 'easy' | 'medium' | 'hard';
  theme?: string;
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
  currentExp: number;
  streak: number;
  unlockedThemes: string[];
}

export interface FloatingText {
  id: string;
  text: string;
  type: 'score' | 'wpm' | 'perfect' | 'combo';
  x: number;
  y: number;
  color: string;
}

export interface WordPack {
  id: string;
  name: string;
  theme: string;
  difficulty: 'easy' | 'medium' | 'hard';
  words: Word[];
  unlockLevel: number;
  icon: string;
  description: string;
}

export type GameContent = Word | Sentence;