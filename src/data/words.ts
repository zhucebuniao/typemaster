import type { Word, Sentence } from '../types/game';

export const easyWords: Word[] = [
  { word: "i need to do it today", meaning: "我今天需要做这件事情", difficulty: "easy" },
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
  { word: "psychological", meaning: "心理的", difficulty: "hard" },
  { word: "philosophical", meaning: "哲学的", difficulty: "hard" },
  { word: "chronological", meaning: "按时间顺序的", difficulty: "hard" },
  { word: "characteristic", meaning: "特征的", difficulty: "hard" },
  { word: "responsibility", meaning: "责任", difficulty: "hard" },
  { word: "approximately", meaning: "大约", difficulty: "hard" },
  { word: "unfortunately", meaning: "不幸地", difficulty: "hard" },
  { word: "consequently", meaning: "因此", difficulty: "hard" },
  { word: "significantly", meaning: "显著地", difficulty: "hard" },
  { word: "independently", meaning: "独立地", difficulty: "hard" },
];

export const codingWords: Word[] = [
  { word: "function", meaning: "函数", difficulty: "medium" },
  { word: "variable", meaning: "变量", difficulty: "medium" },
  { word: "algorithm", meaning: "算法", difficulty: "medium" },
  { word: "interface", meaning: "接口", difficulty: "medium" },
  { word: "component", meaning: "组件", difficulty: "medium" },
  { word: "typescript", meaning: "TypeScript", difficulty: "medium" },
  { word: "javascript", meaning: "JavaScript", difficulty: "medium" },
  { word: "asynchronous", meaning: "异步的", difficulty: "hard" },
  { word: "polymorphism", meaning: "多态性", difficulty: "hard" },
  { word: "encapsulation", meaning: "封装", difficulty: "hard" },
  { word: "inheritance", meaning: "继承", difficulty: "hard" },
  { word: "abstraction", meaning: "抽象", difficulty: "hard" },
  { word: "recursion", meaning: "递归", difficulty: "hard" },
  { word: "optimization", meaning: "优化", difficulty: "hard" },
  { word: "refactoring", meaning: "重构", difficulty: "hard" },
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
  { sentence: "Psychological research demonstrates the extraordinary complexity of human consciousness.", difficulty: "hard" },
  { sentence: "Philosophical debates about responsibility in artificial intelligence are becoming increasingly significant.", difficulty: "hard" },
  { sentence: "Unfortunately, the chronological analysis revealed approximately inconsistent data patterns.", difficulty: "hard" },
];

export const codingSentences: Sentence[] = [
  { sentence: "The function returns a promise that resolves asynchronously.", difficulty: "medium" },
  { sentence: "TypeScript provides static type checking for JavaScript applications.", difficulty: "medium" },
  { sentence: "Component-based architecture improves code reusability and maintainability.", difficulty: "medium" },
  { sentence: "Polymorphism allows objects of different types to be treated uniformly through inheritance.", difficulty: "hard" },
  { sentence: "Encapsulation and abstraction are fundamental principles of object-oriented programming.", difficulty: "hard" },
  { sentence: "Algorithm optimization through recursion requires careful consideration of time complexity.", difficulty: "hard" },
  { sentence: "Refactoring legacy code involves systematic restructuring without changing external behavior.", difficulty: "hard" },
];

export const getAllWords = (): Word[] => {
  return [...easyWords, ...mediumWords, ...hardWords, ...codingWords];
};

export const getAllSentences = (): Sentence[] => {
  return [...easySentences, ...mediumSentences, ...hardSentences, ...codingSentences];
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

export const getCodingWords = (): Word[] => {
  return codingWords;
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

export const getCodingSentences = (): Sentence[] => {
  return codingSentences;
};