import type { Word, Achievement, GameChallenge } from '../types';

export const mockWords: Word[] = [
  {
    id: '1',
    word: 'hello',
    phonetic: '/həˈloʊ/',
    definition: '用于问候或引起注意的感叹词',
    example: 'Hello, how are you today?',
    difficulty: 'easy',
    category: 'greetings'
  },
  {
    id: '2',
    word: 'beautiful',
    phonetic: '/ˈbjuːtɪfəl/',
    definition: '美丽的，漂亮的',
    example: 'The sunset was beautiful tonight.',
    difficulty: 'medium',
    category: 'adjectives'
  },
  {
    id: '3',
    word: 'knowledge',
    phonetic: '/ˈnɒlɪdʒ/',
    definition: '知识，学问',
    example: 'Knowledge is power in the modern world.',
    difficulty: 'medium',
    category: 'abstract'
  },
  {
    id: '4',
    word: 'opportunity',
    phonetic: '/ˌɒpəˈtuːnɪti/',
    definition: '机会，时机',
    example: 'This job is a great opportunity for growth.',
    difficulty: 'hard',
    category: 'abstract'
  },
  {
    id: '5',
    word: 'understand',
    phonetic: '/ˌʌndəˈstænd/',
    definition: '理解，明白',
    example: 'I understand your concerns about the project.',
    difficulty: 'medium',
    category: 'verbs'
  },
  {
    id: '6',
    word: 'important',
    phonetic: '/ɪmˈpɔːtənt/',
    definition: '重要的，重大的',
    example: 'It is important to arrive on time.',
    difficulty: 'medium',
    category: 'adjectives'
  },
  {
    id: '7',
    word: 'education',
    phonetic: '/ˌedʒuˈkeɪʃən/',
    definition: '教育，培养',
    example: 'Education is the key to success.',
    difficulty: 'hard',
    category: 'abstract'
  },
  {
    id: '8',
    word: 'computer',
    phonetic: '/kəmˈpjuːtə/',
    definition: '计算机，电脑',
    example: 'I use my computer for work every day.',
    difficulty: 'easy',
    category: 'technology'
  }
];

export const mockAchievements: Achievement[] = [
  {
    id: 'first_word',
    title: '初学者',
    description: '完成第一个单词练习',
    icon: '🌟',
  },
  {
    id: 'speed_demon',
    title: '打字高手',
    description: '达到50WPM的打字速度',
    icon: '⚡',
    progress: 32,
    maxProgress: 50
  },
  {
    id: 'perfect_game',
    title: '完美主义者',
    description: '完成一次100%准确率的游戏',
    icon: '🎯',
  },
  {
    id: 'streak_master',
    title: '坚持达人',
    description: '连续学习7天',
    icon: '🔥',
    progress: 3,
    maxProgress: 7
  },
  {
    id: 'vocabulary_master',
    title: '词汇大师',
    description: '学习100个单词',
    icon: '📚',
    progress: 45,
    maxProgress: 100
  }
];

export const mockChallenges: GameChallenge[] = [
  {
    id: 'beginner',
    title: '新手挑战',
    description: '适合初学者的简单单词练习',
    words: mockWords.filter(w => w.difficulty === 'easy'),
    timeLimit: 60,
    targetWpm: 20,
    difficulty: 'easy'
  },
  {
    id: 'intermediate',
    title: '进阶挑战',
    description: '中等难度的词汇练习',
    words: mockWords.filter(w => w.difficulty === 'medium'),
    timeLimit: 90,
    targetWpm: 35,
    difficulty: 'medium'
  },
  {
    id: 'expert',
    title: '专家挑战',
    description: '高难度词汇的终极考验',
    words: mockWords.filter(w => w.difficulty === 'hard'),
    timeLimit: 120,
    targetWpm: 50,
    difficulty: 'hard'
  }
];