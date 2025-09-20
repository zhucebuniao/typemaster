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
  experience: number;
  currentLevelProgress: number;
  unlockedModes: string[];
}

export interface LevelSystem {
  level: number;
  name: string;
  description: string;
  requiredExperience: number;
  unlockedModes: string[];
  icon: string;
  color: string;
}

export interface FloatingAnimation {
  id: string;
  text: string;
  x: number;
  y: number;
  color: string;
  type: 'success' | 'error' | 'combo' | 'level-up';
}

export type GameContent = Word | Sentence;