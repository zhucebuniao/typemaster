import React from 'react';

export interface GameMode {
  id: string;
  name: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  icon: string;
}

interface GameModeSelectorProps {
  onModeSelect: (mode: GameMode) => void;
}

const gameModes: GameMode[] = [
  {
    id: 'words-easy',
    name: 'Easy Words',
    description: 'Practice with simple, common words',
    difficulty: 'easy',
    icon: '🌱',
  },
  {
    id: 'words-medium',
    name: 'Medium Words',
    description: 'Challenge yourself with longer words',
    difficulty: 'medium',
    icon: '🌿',
  },
  {
    id: 'words-hard',
    name: 'Hard Words',
    description: 'Master complex vocabulary',
    difficulty: 'hard',
    icon: '🌳',
  },
  {
    id: 'sentences-easy',
    name: 'Easy Sentences',
    description: 'Type complete sentences with simple grammar',
    difficulty: 'easy',
    icon: '📝',
  },
  {
    id: 'sentences-medium',
    name: 'Medium Sentences',
    description: 'Practice with more complex sentence structures',
    difficulty: 'medium',
    icon: '📄',
  },
  {
    id: 'sentences-hard',
    name: 'Hard Sentences',
    description: 'Challenge yourself with advanced content',
    difficulty: 'hard',
    icon: '📚',
  },
];

const GameModeSelector: React.FC<GameModeSelectorProps> = ({ onModeSelect }) => {
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

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent mb-4">
          Choose Your Challenge
        </h2>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
          Select a game mode to start improving your typing skills and enhance your vocabulary
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {gameModes.map((mode) => (
          <button
            key={mode.id}
            onClick={() => onModeSelect(mode)}
            className={`relative p-8 rounded-2xl border-2 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl ${getDifficultyColor(
              mode.difficulty
            )} ${getDifficultyBg(mode.difficulty)} group backdrop-blur-sm overflow-hidden`}
          >
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
        ))}
      </div>
    </div>
  );
};

export default GameModeSelector;