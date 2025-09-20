import type { Word, Sentence, WordPack } from '../types/game';

// Basic word collections by difficulty
export const easyWords: Word[] = [
  { word: "apple", meaning: "苹果", difficulty: "easy", theme: "food" },
  { word: "cat", meaning: "猫", difficulty: "easy", theme: "animals" },
  { word: "dog", meaning: "狗", difficulty: "easy", theme: "animals" },
  { word: "book", meaning: "书", difficulty: "easy", theme: "education" },
  { word: "water", meaning: "水", difficulty: "easy", theme: "nature" },
  { word: "house", meaning: "房子", difficulty: "easy", theme: "home" },
  { word: "tree", meaning: "树", difficulty: "easy", theme: "nature" },
  { word: "car", meaning: "汽车", difficulty: "easy", theme: "transport" },
  { word: "sun", meaning: "太阳", difficulty: "easy", theme: "nature" },
  { word: "moon", meaning: "月亮", difficulty: "easy", theme: "nature" },
  { word: "hand", meaning: "手", difficulty: "easy", theme: "body" },
  { word: "eye", meaning: "眼睛", difficulty: "easy", theme: "body" },
  { word: "food", meaning: "食物", difficulty: "easy", theme: "food" },
  { word: "time", meaning: "时间", difficulty: "easy", theme: "abstract" },
  { word: "good", meaning: "好的", difficulty: "easy", theme: "adjectives" },
];

export const mediumWords: Word[] = [
  { word: "computer", meaning: "计算机", difficulty: "medium", theme: "technology" },
  { word: "beautiful", meaning: "美丽的", difficulty: "medium", theme: "adjectives" },
  { word: "important", meaning: "重要的", difficulty: "medium", theme: "adjectives" },
  { word: "different", meaning: "不同的", difficulty: "medium", theme: "adjectives" },
  { word: "possible", meaning: "可能的", difficulty: "medium", theme: "adjectives" },
  { word: "education", meaning: "教育", difficulty: "medium", theme: "education" },
  { word: "technology", meaning: "技术", difficulty: "medium", theme: "technology" },
  { word: "development", meaning: "发展", difficulty: "medium", theme: "business" },
  { word: "information", meaning: "信息", difficulty: "medium", theme: "technology" },
  { word: "experience", meaning: "经验", difficulty: "medium", theme: "abstract" },
];

export const hardWords: Word[] = [
  { word: "sophisticated", meaning: "复杂的", difficulty: "hard", theme: "adjectives" },
  { word: "entrepreneurship", meaning: "企业家精神", difficulty: "hard", theme: "business" },
  { word: "extraordinary", meaning: "非凡的", difficulty: "hard", theme: "adjectives" },
  { word: "revolutionary", meaning: "革命性的", difficulty: "hard", theme: "adjectives" },
  { word: "incomprehensible", meaning: "难以理解的", difficulty: "hard", theme: "adjectives" },
];

// Themed word packs for level progression
export const wordPacks: WordPack[] = [
  {
    id: 'animals-easy',
    name: 'Animal Kingdom',
    theme: 'animals',
    difficulty: 'easy',
    unlockLevel: 1,
    icon: '🐾',
    description: 'Learn about animals and pets',
    words: [
      { word: "cat", meaning: "猫", difficulty: "easy", theme: "animals" },
      { word: "dog", meaning: "狗", difficulty: "easy", theme: "animals" },
      { word: "bird", meaning: "鸟", difficulty: "easy", theme: "animals" },
      { word: "fish", meaning: "鱼", difficulty: "easy", theme: "animals" },
      { word: "horse", meaning: "马", difficulty: "easy", theme: "animals" },
      { word: "cow", meaning: "牛", difficulty: "easy", theme: "animals" },
      { word: "pig", meaning: "猪", difficulty: "easy", theme: "animals" },
      { word: "sheep", meaning: "羊", difficulty: "easy", theme: "animals" },
    ]
  },
  {
    id: 'food-easy',
    name: 'Delicious Food',
    theme: 'food',
    difficulty: 'easy',
    unlockLevel: 2,
    icon: '🍎',
    description: 'Essential food vocabulary',
    words: [
      { word: "apple", meaning: "苹果", difficulty: "easy", theme: "food" },
      { word: "bread", meaning: "面包", difficulty: "easy", theme: "food" },
      { word: "milk", meaning: "牛奶", difficulty: "easy", theme: "food" },
      { word: "rice", meaning: "米饭", difficulty: "easy", theme: "food" },
      { word: "meat", meaning: "肉", difficulty: "easy", theme: "food" },
      { word: "egg", meaning: "鸡蛋", difficulty: "easy", theme: "food" },
      { word: "cake", meaning: "蛋糕", difficulty: "easy", theme: "food" },
      { word: "soup", meaning: "汤", difficulty: "easy", theme: "food" },
    ]
  },
  {
    id: 'tech-medium',
    name: 'Digital World',
    theme: 'technology',
    difficulty: 'medium',
    unlockLevel: 5,
    icon: '💻',
    description: 'Modern technology terms',
    words: [
      { word: "computer", meaning: "计算机", difficulty: "medium", theme: "technology" },
      { word: "internet", meaning: "互联网", difficulty: "medium", theme: "technology" },
      { word: "software", meaning: "软件", difficulty: "medium", theme: "technology" },
      { word: "database", meaning: "数据库", difficulty: "medium", theme: "technology" },
      { word: "programming", meaning: "编程", difficulty: "medium", theme: "technology" },
      { word: "artificial", meaning: "人工的", difficulty: "medium", theme: "technology" },
      { word: "algorithm", meaning: "算法", difficulty: "medium", theme: "technology" },
      { word: "digital", meaning: "数字的", difficulty: "medium", theme: "technology" },
    ]
  },
  {
    id: 'business-medium',
    name: 'Business English',
    theme: 'business',
    difficulty: 'medium',
    unlockLevel: 7,
    icon: '💼',
    description: 'Professional business vocabulary',
    words: [
      { word: "management", meaning: "管理", difficulty: "medium", theme: "business" },
      { word: "strategy", meaning: "策略", difficulty: "medium", theme: "business" },
      { word: "marketing", meaning: "市场营销", difficulty: "medium", theme: "business" },
      { word: "investment", meaning: "投资", difficulty: "medium", theme: "business" },
      { word: "profit", meaning: "利润", difficulty: "medium", theme: "business" },
      { word: "customer", meaning: "客户", difficulty: "medium", theme: "business" },
      { word: "project", meaning: "项目", difficulty: "medium", theme: "business" },
      { word: "teamwork", meaning: "团队合作", difficulty: "medium", theme: "business" },
    ]
  },
  {
    id: 'nature-easy',
    name: 'Natural World',
    theme: 'nature',
    difficulty: 'easy',
    unlockLevel: 3,
    icon: '🌳',
    description: 'Nature and environment words',
    words: [
      { word: "tree", meaning: "树", difficulty: "easy", theme: "nature" },
      { word: "flower", meaning: "花", difficulty: "easy", theme: "nature" },
      { word: "grass", meaning: "草", difficulty: "easy", theme: "nature" },
      { word: "mountain", meaning: "山", difficulty: "easy", theme: "nature" },
      { word: "river", meaning: "河", difficulty: "easy", theme: "nature" },
      { word: "ocean", meaning: "海洋", difficulty: "easy", theme: "nature" },
      { word: "forest", meaning: "森林", difficulty: "easy", theme: "nature" },
      { word: "desert", meaning: "沙漠", difficulty: "easy", theme: "nature" },
    ]
  },
  {
    id: 'advanced-hard',
    name: 'Advanced Vocabulary',
    theme: 'advanced',
    difficulty: 'hard',
    unlockLevel: 10,
    icon: '🎓',
    description: 'Challenge yourself with complex words',
    words: [
      { word: "sophisticated", meaning: "复杂的", difficulty: "hard", theme: "advanced" },
      { word: "entrepreneurship", meaning: "企业家精神", difficulty: "hard", theme: "advanced" },
      { word: "extraordinary", meaning: "非凡的", difficulty: "hard", theme: "advanced" },
      { word: "revolutionary", meaning: "革命性的", difficulty: "hard", theme: "advanced" },
      { word: "incomprehensible", meaning: "难以理解的", difficulty: "hard", theme: "advanced" },
      { word: "manifestation", meaning: "表现", difficulty: "hard", theme: "advanced" },
      { word: "philosophical", meaning: "哲学的", difficulty: "hard", theme: "advanced" },
      { word: "consciousness", meaning: "意识", difficulty: "hard", theme: "advanced" },
    ]
  }
];

export const easySentences: Sentence[] = [
  { sentence: "The cat is sleeping.", difficulty: "easy", theme: "animals" },
  { sentence: "I like to read books.", difficulty: "easy", theme: "education" },
  { sentence: "The sun is bright today.", difficulty: "easy", theme: "nature" },
  { sentence: "She has a red car.", difficulty: "easy", theme: "transport" },
  { sentence: "We eat dinner together.", difficulty: "easy", theme: "food" },
];

export const mediumSentences: Sentence[] = [
  { sentence: "Technology has changed our daily lives significantly.", difficulty: "medium", theme: "technology" },
  { sentence: "Education is the foundation of personal development.", difficulty: "medium", theme: "education" },
  { sentence: "The information age brings both opportunities and challenges.", difficulty: "medium", theme: "business" },
];

export const hardSentences: Sentence[] = [
  { sentence: "The entrepreneurial ecosystem requires sophisticated understanding of market dynamics.", difficulty: "hard", theme: "business" },
  { sentence: "Revolutionary technological advancements often create incomprehensible paradigm shifts.", difficulty: "hard", theme: "technology" },
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

export const getWordPacksByLevel = (userLevel: number): WordPack[] => {
  return wordPacks.filter(pack => pack.unlockLevel <= userLevel);
};

export const getAvailableWordPacks = (): WordPack[] => {
  return wordPacks;
};