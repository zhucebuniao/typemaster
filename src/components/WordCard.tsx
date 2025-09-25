import { useState } from 'react';
import type { Word } from '../types';

interface WordCardProps {
  word: Word;
  isFavorited: boolean;
  onToggleFavorite: () => void;
}

export default function WordCard({ word, isFavorited, onToggleFavorite }: WordCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-100 text-green-700';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700';
      case 'hard':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return '简单';
      case 'medium':
        return '中等';
      case 'hard':
        return '困难';
      default:
        return difficulty;
    }
  };

  const playPronunciation = () => {
    // In a real app, this would use Web Speech API or audio files
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(word.word);
      utterance.lang = 'en-US';
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="card hover:shadow-md transition-shadow">
      <div className="space-y-3">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="word-display">{word.word}</h3>
              <button
                onClick={playPronunciation}
                className="p-1 rounded-full hover:bg-gray-100 transition-colors btn-touch"
                aria-label="播放发音"
              >
                🔊
              </button>
            </div>
            
            <div className="flex items-center gap-2 mb-2">
              <span className="text-gray-500 text-sm font-mono">{word.phonetic}</span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(word.difficulty)}`}>
                {getDifficultyLabel(word.difficulty)}
              </span>
            </div>
          </div>
          
          <button
            onClick={onToggleFavorite}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors btn-touch"
            aria-label={isFavorited ? '取消收藏' : '添加收藏'}
          >
            <span className={`text-xl ${isFavorited ? 'text-yellow-500' : 'text-gray-300'}`}>
              {isFavorited ? '⭐' : '☆'}
            </span>
          </button>
        </div>

        {/* Definition */}
        <div className="definition-text">
          {word.definition}
        </div>

        {/* Expandable Example */}
        <div className="space-y-2">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 text-sm text-primary-600 hover:text-primary-700 transition-colors"
          >
            <span>{isExpanded ? '收起' : '查看'}例句</span>
            <span className={`transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
              ▼
            </span>
          </button>
          
          {isExpanded && (
            <div className="pl-4 border-l-2 border-primary-200">
              <p className="example-text">{word.example}</p>
            </div>
          )}
        </div>

        {/* Category Tag */}
        <div className="flex justify-between items-center pt-2 border-t border-gray-100">
          <span className="text-xs text-gray-500 capitalize">#{word.category}</span>
          
          {/* Quick Actions */}
          <div className="flex gap-2">
            <button
              className="text-xs text-primary-600 hover:text-primary-700 px-2 py-1 rounded hover:bg-primary-50 transition-colors"
              onClick={() => {
                // In a real app, this would start a typing practice with this word
                console.log('Practice typing:', word.word);
              }}
            >
              练习打字
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}