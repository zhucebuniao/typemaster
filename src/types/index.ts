// Word-related types
export interface Word {
  id: string;
  word: string;
  phonetic: string;
  definition: string;
  example: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  isFavorited?: boolean;
}

// Game-related types
export interface GameResult {
  id: string;
  wordId: string;
  timestamp: number;
  wpm: number; // words per minute
  accuracy: number; // percentage
  timeSpent: number; // seconds
  mistakes: number;
}

export interface GameChallenge {
  id: string;
  title: string;
  description: string;
  words: Word[];
  timeLimit: number; // seconds
  targetWpm: number;
  difficulty: 'easy' | 'medium' | 'hard';
}

// User progress types
export interface UserProgress {
  totalWordsLearned: number;
  totalGamesPlayed: number;
  averageWpm: number;
  averageAccuracy: number;
  streak: number; // consecutive days
  lastActiveDate: string;
  level: number;
  experience: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: number;
  progress?: number;
  maxProgress?: number;
}

// Navigation types
export type NavigationTab = 'home' | 'vocabulary' | 'game' | 'profile';

// App state types
export interface AppState {
  currentTab: NavigationTab;
  userProgress: UserProgress;
  achievements: Achievement[];
  favoriteWords: string[]; // word IDs
  gameHistory: GameResult[];
}

// Game state types
export interface TypingGameState {
  currentWord: Word | null;
  currentInput: string;
  startTime: number | null;
  endTime: number | null;
  mistakes: number;
  correctChars: number;
  totalChars: number;
  isActive: boolean;
  isCompleted: boolean;
}