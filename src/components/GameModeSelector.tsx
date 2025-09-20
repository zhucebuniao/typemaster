import React from 'react';
import { getAvailableWordPacks } from '../data/words';
import type { UserProgress, WordPack } from '../types/game';

export interface GameMode {
  id: string;
  name: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  icon: string;
  type?: 'words' | 'sentences' | 'wordpack';
  wordPack?: WordPack;
}

interface GameModeSelectorProps {
  onModeSelect: (mode: GameMode) => void;
  userProgress: UserProgress;
}

const gameModes: GameMode[] = [
  {
    id: 'words-easy',
    name: 'Easy Words',
    description: 'Practice with simple, common words',
    difficulty: 'easy',
    icon: '🌱',
    type: 'words'
  },
  {
    id: 'words-medium',
    name: 'Medium Words',
    description: 'Challenge yourself with longer words',
    difficulty: 'medium',
    icon: '🌿',
    type: 'words'
  },
  {
    id: 'words-hard',
    name: 'Hard Words',
    description: 'Master complex vocabulary',
    difficulty: 'hard',
    icon: '🌳',
    type: 'words'
  },
  {
    id: 'sentences-easy',
    name: 'Easy Sentences',
    description: 'Type complete sentences with simple grammar',
    difficulty: 'easy',
    icon: '📝',
    type: 'sentences'
  },
  {
    id: 'sentences-medium',
    name: 'Medium Sentences',
    description: 'Practice with more complex sentence structures',
    difficulty: 'medium',
    icon: '📄',
    type: 'sentences'
  },
  {
    id: 'sentences-hard',
    name: 'Hard Sentences',
    description: 'Challenge yourself with advanced content',
    difficulty: 'hard',
    icon: '📚',
    type: 'sentences'
  },
];

const GameModeSelector: React.FC<GameModeSelectorProps> = ({ onModeSelect, userProgress }) => {
  const allWordPacks = getAvailableWordPacks();

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'border-green-400 hover:border-green-300';
      case 'medium':
        return 'border-yellow-400 hover:border-yellow-300';
      case 'hard':
        return 'border-red-400 hover:border-red-300';
      default:
        return 'border-gray-400 hover:border-gray-300';
    }
  };

  const getDifficultyBg = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-900/30';
      case 'medium':
        return 'bg-yellow-900/30';
      case 'hard':
        return 'bg-red-900/30';
      default:
        return 'bg-gray-900/30';
    }
  };

  const isWordPackUnlocked = (wordPack: WordPack) => {
    return userProgress.level >= wordPack.unlockLevel;
  };

  const wordPackModes: GameMode[] = allWordPacks.map(pack => ({
    id: `wordpack-${pack.id}`,
    name: pack.name,
    description: pack.description,
    difficulty: pack.difficulty,
    icon: pack.icon,
    type: 'wordpack',
    wordPack: pack
  }));

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-6">
          <div className="flex items-center space-x-4">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
              Choose Your Challenge
            </h2>
            <div className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full">
              <span className="text-white font-bold">Level {userProgress.level}</span>
            </div>
          </div>
        </div>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
          Select a game mode to start improving your typing skills and enhance your vocabulary
        </p>
      </div>

      {/* Classic Modes */}
      <div className="mb-12">
        <h3 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
          <span>🎯</span>
          <span>Classic Modes</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {gameModes.map((mode) => (
            <ModeCard 
              key={mode.id} 
              mode={mode} 
              onSelect={onModeSelect}
              isUnlocked={true}
              getDifficultyColor={getDifficultyColor}
              getDifficultyBg={getDifficultyBg}
            />
          ))}
        </div>
      </div>

      {/* Themed Word Packs */}
      <div>
        <h3 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
          <span>📚</span>
          <span>Themed Word Packs</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {wordPackModes.map((mode) => (
            <ModeCard 
              key={mode.id} 
              mode={mode} 
              onSelect={onModeSelect}
              isUnlocked={isWordPackUnlocked(mode.wordPack!)}
              getDifficultyColor={getDifficultyColor}
              getDifficultyBg={getDifficultyBg}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

interface ModeCardProps {
  mode: GameMode;
  onSelect: (mode: GameMode) => void;
  isUnlocked: boolean;
  getDifficultyColor: (difficulty: string) => string;
  getDifficultyBg: (difficulty: string) => string;
}

const ModeCard: React.FC<ModeCardProps> = ({ 
  mode, 
  onSelect, 
  isUnlocked, 
  getDifficultyColor, 
  getDifficultyBg 
}) => {
  const handleClick = () => {
    if (isUnlocked) {
      onSelect(mode);
    }
  };

  const opacity = isUnlocked ? 'opacity-100' : 'opacity-50';
  const cursor = isUnlocked ? 'cursor-pointer' : 'cursor-not-allowed';
  const transform = isUnlocked ? 'hover:scale-[1.02]' : '';

  return (
    <button
      onClick={handleClick}
      disabled={!isUnlocked}
      className={`relative p-8 rounded-2xl border-2 transition-all duration-300 hover:shadow-2xl ${getDifficultyColor(
        mode.difficulty
      )} ${getDifficultyBg(mode.difficulty)} group backdrop-blur-sm overflow-hidden ${opacity} ${cursor} ${transform}`}
    >
      {/* Lock overlay for locked packs */}
      {!isUnlocked && (
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-10 rounded-2xl">
          <div className="text-center">
            <div className="text-4xl mb-2">🔒</div>
            <div className="text-white font-bold">
              Level {mode.wordPack?.unlockLevel} Required
            </div>
          </div>
        </div>
      )}
      
      {/* Gradient overlay for modern effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Icon with glow effect */}
      <div className="relative z-10">
        <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300 filter drop-shadow-lg">
          {mode.icon}
        </div>
        
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-gray-100 transition-colors duration-300">
          {mode.name}
        </h3>
        
        <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 leading-relaxed mb-4">
          {mode.description}
        </p>
        
        <div className="flex justify-center">
          <span
            className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg ${
              mode.difficulty === 'easy'
                ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-green-500/25'
                : mode.difficulty === 'medium'
                ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-yellow-500/25'
                : 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-red-500/25'
            } group-hover:shadow-xl transition-shadow duration-300`}
          >
            {mode.difficulty}
          </span>
        </div>
      </div>
      
      {/* Subtle border glow effect */}
      <div className={`absolute inset-0 rounded-2xl transition-all duration-300 ${
        mode.difficulty === 'easy'
          ? 'group-hover:shadow-[0_0_30px_rgba(34,197,94,0.3)]'
          : mode.difficulty === 'medium'
          ? 'group-hover:shadow-[0_0_30px_rgba(245,158,11,0.3)]'
          : 'group-hover:shadow-[0_0_30px_rgba(239,68,68,0.3)]'
      }`} />
    </button>
  );
};

export default GameModeSelector;