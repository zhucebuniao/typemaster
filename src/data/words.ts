import type { Word, Sentence } from '../types/game';

export const easyWords: Word[] = [
  { word: "apple", meaning: "苹果", difficulty: "easy" },
  { word: "cat", meaning: "猫", difficulty: "easy" },
  { word: "dog", meaning: "狗", difficulty: "easy" },
  { word: "book", meaning: "书", difficulty: "easy" },
  { word: "water", meaning: "水", difficulty: "easy" },
  { word: "house", meaning: "房子", difficulty: "easy" },
  { word: "tree", meaning: "树", difficulty: "easy" },
  { word: "car", meaning: "汽车", difficulty: "easy" },
  { word: "sun", meaning: "太阳", difficulty: "easy" },
  { word: "moon", meaning: "月亮", difficulty: "easy" },
  { word: "hand", meaning: "手", difficulty: "easy" },
  { word: "eye", meaning: "眼睛", difficulty: "easy" },
  { word: "food", meaning: "食物", difficulty: "easy" },
  { word: "time", meaning: "时间", difficulty: "easy" },
  { word: "good", meaning: "好的", difficulty: "easy" },
];

export const mediumWords: Word[] = [
  { word: "computer", meaning: "计算机", difficulty: "medium" },
  { word: "beautiful", meaning: "美丽的", difficulty: "medium" },
  { word: "important", meaning: "重要的", difficulty: "medium" },
  { word: "different", meaning: "不同的", difficulty: "medium" },
  { word: "possible", meaning: "可能的", difficulty: "medium" },
  { word: "education", meaning: "教育", difficulty: "medium" },
  { word: "technology", meaning: "技术", difficulty: "medium" },
  { word: "development", meaning: "发展", difficulty: "medium" },
  { word: "information", meaning: "信息", difficulty: "medium" },
  { word: "experience", meaning: "经验", difficulty: "medium" },
];

export const hardWords: Word[] = [
  { word: "sophisticated", meaning: "复杂的", difficulty: "hard" },
  { word: "entrepreneurship", meaning: "企业家精神", difficulty: "hard" },
  { word: "extraordinary", meaning: "非凡的", difficulty: "hard" },
  { word: "revolutionary", meaning: "革命性的", difficulty: "hard" },
  { word: "incomprehensible", meaning: "难以理解的", difficulty: "hard" },
];

export const easySentences: Sentence[] = [
  { sentence: "The cat is sleeping.", difficulty: "easy" },
  { sentence: "I like to read books.", difficulty: "easy" },
  { sentence: "The sun is bright today.", difficulty: "easy" },
  { sentence: "She has a red car.", difficulty: "easy" },
  { sentence: "We eat dinner together.", difficulty: "easy" },
];

export const mediumSentences: Sentence[] = [
  { sentence: "Technology has changed our daily lives significantly.", difficulty: "medium" },
  { sentence: "Education is the foundation of personal development.", difficulty: "medium" },
  { sentence: "The information age brings both opportunities and challenges.", difficulty: "medium" },
];

export const hardSentences: Sentence[] = [
  { sentence: "The entrepreneurial ecosystem requires sophisticated understanding of market dynamics.", difficulty: "hard" },
  { sentence: "Revolutionary technological advancements often create incomprehensible paradigm shifts.", difficulty: "hard" },
];

export const getAllWords = (): Word[] => {
  return [...easyWords, ...mediumWords, ...hardWords];
};

export const getAllSentences = (): Sentence[] => {
  return [...easySentences, ...mediumSentences, ...hardSentences];
};

export const getWordsByDifficulty = (difficulty: 'easy' | 'medium' | 'hard'): Word[] => {
  switch (difficulty) {
    case 'easy':
      return easyWords;
    case 'medium':
      return mediumWords;
    case 'hard':
      return hardWords;
    default:
      return easyWords;
  }
};

export const getSentencesByDifficulty = (difficulty: 'easy' | 'medium' | 'hard'): Sentence[] => {
  switch (difficulty) {
    case 'easy':
      return easySentences;
    case 'medium':
      return mediumSentences;
    case 'hard':
      return hardSentences;
    default:
      return easySentences;
  }
};