import type { LevelSystem } from '../types/game';

export const LEVEL_SYSTEM: LevelSystem[] = [
  {
    level: 1,
    name: 'Beginner',
    description: 'Start your typing journey',
    requiredExperience: 0,
    unlockedModes: ['words-easy'],
    icon: '🌱',
    color: 'from-green-400 to-emerald-500'
  },
  {
    level: 2,
    name: 'Novice',
    description: 'Building confidence',
    requiredExperience: 100,
    unlockedModes: ['words-easy', 'sentences-easy'],
    icon: '🌿',
    color: 'from-green-500 to-emerald-600'
  },
  {
    level: 3,
    name: 'Apprentice',
    description: 'Getting stronger',
    requiredExperience: 300,
    unlockedModes: ['words-easy', 'sentences-easy', 'words-medium'],
    icon: '🌲',
    color: 'from-blue-400 to-blue-600'
  },
  {
    level: 4,
    name: 'Skilled',
    description: 'Showing real progress',
    requiredExperience: 600,
    unlockedModes: ['words-easy', 'sentences-easy', 'words-medium', 'sentences-medium'],
    icon: '⭐',
    color: 'from-yellow-400 to-orange-500'
  },
  {
    level: 5,
    name: 'Expert',
    description: 'Mastering the craft',
    requiredExperience: 1000,
    unlockedModes: ['words-easy', 'sentences-easy', 'words-medium', 'sentences-medium', 'words-hard'],
    icon: '🔥',
    color: 'from-orange-500 to-red-500'
  },
  {
    level: 6,
    name: 'Master',
    description: 'True typing mastery',
    requiredExperience: 1500,
    unlockedModes: ['words-easy', 'sentences-easy', 'words-medium', 'sentences-medium', 'words-hard', 'sentences-hard', 'coding'],
    icon: '👑',
    color: 'from-purple-500 to-pink-500'
  }
];

export const getExperienceForScore = (wpm: number, accuracy: number): number => {
  // Base experience calculation
  const baseExp = Math.floor(wpm * (accuracy / 100));
  
  // Bonus for high accuracy
  const accuracyBonus = accuracy >= 95 ? 20 : accuracy >= 90 ? 10 : 0;
  
  // Bonus for high WPM
  const speedBonus = wpm >= 60 ? 15 : wpm >= 40 ? 10 : wpm >= 25 ? 5 : 0;
  
  return Math.max(baseExp + accuracyBonus + speedBonus, 1);
};

export const getLevelInfo = (experience: number): LevelSystem => {
  for (let i = LEVEL_SYSTEM.length - 1; i >= 0; i--) {
    if (experience >= LEVEL_SYSTEM[i].requiredExperience) {
      return LEVEL_SYSTEM[i];
    }
  }
  return LEVEL_SYSTEM[0];
};

export const getNextLevelInfo = (experience: number): LevelSystem | null => {
  const currentLevel = getLevelInfo(experience);
  const nextLevelIndex = LEVEL_SYSTEM.findIndex(level => level.level === currentLevel.level) + 1;
  return nextLevelIndex < LEVEL_SYSTEM.length ? LEVEL_SYSTEM[nextLevelIndex] : null;
};

export const getProgressToNextLevel = (experience: number): number => {
  const currentLevel = getLevelInfo(experience);
  const nextLevel = getNextLevelInfo(experience);
  
  if (!nextLevel) return 100; // Max level reached
  
  const progressRange = nextLevel.requiredExperience - currentLevel.requiredExperience;
  const currentProgress = experience - currentLevel.requiredExperience;
  
  return Math.min(Math.max((currentProgress / progressRange) * 100, 0), 100);
};