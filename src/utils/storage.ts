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
      const progress = JSON.parse(stored);
      // Ensure backward compatibility with v1.0 data
      return {
        level: progress.level || 1,
        totalScore: progress.totalScore || 0,
        bestWpm: progress.bestWpm || 0,
        bestAccuracy: progress.bestAccuracy || 0,
        mistakeWords: progress.mistakeWords || [],
        achievementCount: progress.achievementCount || 0,
        currentExp: progress.currentExp || 0,
        streak: progress.streak || 0,
        unlockedThemes: progress.unlockedThemes || ['animals', 'food']
      };
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
    currentExp: 0,
    streak: 0,
    unlockedThemes: ['animals', 'food']
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

// Level progression utilities
export const calculateLevelFromExp = (exp: number): number => {
  // Every 100 exp = 1 level, with exponential scaling
  return Math.floor(Math.sqrt(exp / 50)) + 1;
};

export const getExpRequiredForLevel = (level: number): number => {
  return Math.pow(level - 1, 2) * 50;
};

export const getExpToNextLevel = (currentExp: number): number => {
  const currentLevel = calculateLevelFromExp(currentExp);
  const nextLevelExp = getExpRequiredForLevel(currentLevel + 1);
  return nextLevelExp - currentExp;
};

export const updateUserProgressWithGameResults = (
  wpm: number, 
  accuracy: number, 
  correctWords: number,
  timeElapsed: number
): { leveledUp: boolean; newLevel: number } => {
  try {
    const progress = loadUserProgress();
    
    // Calculate score and exp gain
    const baseScore = Math.round(wpm * accuracy / 100 * correctWords);
    const timeBonus = Math.max(0, Math.round((60 - timeElapsed) / 10)); // Bonus for speed
    const accuracyBonus = accuracy >= 95 ? 20 : 0; // Perfect accuracy bonus
    
    const totalScore = baseScore + timeBonus + accuracyBonus;
    const expGain = Math.round(totalScore * 0.8); // 80% of score becomes exp
    
    const oldLevel = progress.level;
    const newExp = progress.currentExp + expGain;
    const newLevel = calculateLevelFromExp(newExp);
    
    // Update progress
    const updatedProgress: UserProgress = {
      ...progress,
      totalScore: progress.totalScore + totalScore,
      bestWpm: Math.max(progress.bestWpm, wpm),
      bestAccuracy: Math.max(progress.bestAccuracy, accuracy),
      currentExp: newExp,
      level: newLevel,
      streak: accuracy >= 90 ? progress.streak + 1 : 0, // Maintain streak with 90%+ accuracy
    };
    
    // Unlock new themes based on level
    const newThemes = [...progress.unlockedThemes];
    if (newLevel >= 3 && !newThemes.includes('nature')) newThemes.push('nature');
    if (newLevel >= 5 && !newThemes.includes('technology')) newThemes.push('technology');
    if (newLevel >= 7 && !newThemes.includes('business')) newThemes.push('business');
    if (newLevel >= 10 && !newThemes.includes('advanced')) newThemes.push('advanced');
    
    updatedProgress.unlockedThemes = newThemes;
    
    saveUserProgress(updatedProgress);
    
    return {
      leveledUp: newLevel > oldLevel,
      newLevel: newLevel
    };
  } catch (error) {
    console.error('Failed to update user progress:', error);
    return { leveledUp: false, newLevel: 1 };
  }
};