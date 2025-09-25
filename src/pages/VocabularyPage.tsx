import { useState, useMemo } from 'react';
import { mockWords } from '../data/words';
import WordCard from '../components/WordCard';

interface VocabularyPageProps {
  favoriteWords: string[];
  onToggleFavorite: (wordId: string) => void;
}

export default function VocabularyPage({ favoriteWords, onToggleFavorite }: VocabularyPageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<'all' | 'easy' | 'medium' | 'hard'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  const filteredWords = useMemo(() => {
    let filtered = mockWords;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(word => 
        word.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
        word.definition.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Difficulty filter
    if (selectedDifficulty !== 'all') {
      filtered = filtered.filter(word => word.difficulty === selectedDifficulty);
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(word => word.category === selectedCategory);
    }

    // Favorites filter
    if (showFavoritesOnly) {
      filtered = filtered.filter(word => favoriteWords.includes(word.id));
    }

    return filtered;
  }, [searchTerm, selectedDifficulty, selectedCategory, showFavoritesOnly, favoriteWords]);

  const categories = Array.from(new Set(mockWords.map(word => word.category)));

  const difficulties = [
    { value: 'all', label: '全部', color: 'gray' },
    { value: 'easy', label: '简单', color: 'green' },
    { value: 'medium', label: '中等', color: 'yellow' },
    { value: 'hard', label: '困难', color: 'red' }
  ];

  return (
    <div className="px-4 py-6 space-y-6">
      {/* Header */}
      <section className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">词库学习</h2>
        <p className="text-gray-600">共 {mockWords.length} 个单词 · 已学 {favoriteWords.length} 个</p>
      </section>

      {/* Search Bar */}
      <section className="relative">
        <input
          type="text"
          placeholder="搜索单词或释义..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-3 pl-10 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          🔍
        </div>
      </section>

      {/* Filters */}
      <section className="space-y-4">
        {/* Difficulty Filter */}
        <div className="space-y-2">
          <h3 className="font-medium text-gray-700">难度级别</h3>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {difficulties.map((diff) => (
              <button
                key={diff.value}
                onClick={() => setSelectedDifficulty(diff.value as 'all' | 'easy' | 'medium' | 'hard')}
                className={`flex-shrink-0 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  selectedDifficulty === diff.value
                    ? 'bg-primary-100 text-primary-700'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {diff.label}
              </button>
            ))}
          </div>
        </div>

        {/* Category Filter */}
        <div className="space-y-2">
          <h3 className="font-medium text-gray-700">分类</h3>
          <div className="flex gap-2 overflow-x-auto pb-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`flex-shrink-0 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-primary-100 text-primary-700'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              全部
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`flex-shrink-0 px-3 py-1.5 rounded-full text-sm font-medium transition-colors capitalize ${
                  selectedCategory === category
                    ? 'bg-primary-100 text-primary-700'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Favorites Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
              showFavoritesOnly
                ? 'bg-accent-100 text-accent-700'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <span className="text-lg">⭐</span>
            <span className="text-sm font-medium">仅显示收藏</span>
          </button>
        </div>
      </section>

      {/* Results Count */}
      <section className="flex justify-between items-center">
        <p className="text-sm text-gray-500">
          找到 {filteredWords.length} 个单词
        </p>
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className="text-sm text-primary-600 hover:text-primary-700"
          >
            清除搜索
          </button>
        )}
      </section>

      {/* Word List */}
      <section className="space-y-4">
        {filteredWords.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">🔍</div>
            <p className="text-gray-500">没有找到匹配的单词</p>
            <p className="text-sm text-gray-400 mt-2">试试调整搜索条件</p>
          </div>
        ) : (
          filteredWords.map((word) => (
            <WordCard
              key={word.id}
              word={word}
              isFavorited={favoriteWords.includes(word.id)}
              onToggleFavorite={() => onToggleFavorite(word.id)}
            />
          ))
        )}
      </section>
    </div>
  );
}