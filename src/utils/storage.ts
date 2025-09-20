import type { UserProgress, Word } from '../types/game';

const STORAGE_KEYS = {
  USER_PROGRESS: 'typemaster_user_progress',
  MISTAKE_WORDS: 'typemaster_mistake_words',
  LEADERBOARD: 'typemaster_leaderboard',
} as const;

export const loadUserProgress = (): UserProgress => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.USER_PROGRESS);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Failed to load user progress:', error);
  }
  
  // Default progress
  return {
    level: 1,
    totalScore: 0,
    bestWpm: 0,
    bestAccuracy: 0,
    mistakeWords: [],
    achievementCount: 0,
    experience: 0,
    currentLevelProgress: 0,
    unlockedModes: ['words-easy'],
  };
};

export const saveUserProgress = (progress: UserProgress): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.USER_PROGRESS, JSON.stringify(progress));
  } catch (error) {
    console.error('Failed to save user progress:', error);
  }
};

export const addMistakeWord = (word: Word): void => {
  try {
    const progress = loadUserProgress();
    const existingWord = progress.mistakeWords.find(w => w.word === word.word);
    
    if (!existingWord) {
      progress.mistakeWords.push(word);
      saveUserProgress(progress);
    }
  } catch (error) {
    console.error('Failed to add mistake word:', error);
  }
};

export const removeMistakeWord = (word: string): void => {
  try {
    const progress = loadUserProgress();
    progress.mistakeWords = progress.mistakeWords.filter(w => w.word !== word);
    saveUserProgress(progress);
  } catch (error) {
    console.error('Failed to remove mistake word:', error);
  }
};

export interface LeaderboardEntry {
  name: string;
  wpm: number;
  accuracy: number;
  score: number;
  date: string;
}

export const getLeaderboard = (): LeaderboardEntry[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.LEADERBOARD);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Failed to load leaderboard:', error);
  }
  return [];
};

export const addToLeaderboard = (entry: Omit<LeaderboardEntry, 'date'>): void => {
  try {
    const leaderboard = getLeaderboard();
    const newEntry: LeaderboardEntry = {
      ...entry,
      date: new Date().toISOString(),
    };
    
    leaderboard.push(newEntry);
    leaderboard.sort((a, b) => b.score - a.score);
    
    // Keep only top 10
    const topTen = leaderboard.slice(0, 10);
    localStorage.setItem(STORAGE_KEYS.LEADERBOARD, JSON.stringify(topTen));
  } catch (error) {
    console.error('Failed to add to leaderboard:', error);
  }
};