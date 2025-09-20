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
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Choose Your Challenge</h2>
        <p className="text-gray-400">Select a game mode to start improving your typing skills</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {gameModes.map((mode) => (
          <button
            key={mode.id}
            onClick={() => onModeSelect(mode)}
            className={`p-6 rounded-lg border-2 transition-all duration-200 hover:scale-105 ${getDifficultyColor(
              mode.difficulty
            )} ${getDifficultyBg(mode.difficulty)} group`}
          >
            <div className="text-4xl mb-3">{mode.icon}</div>
            <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-gray-100">
              {mode.name}
            </h3>
            <p className="text-sm text-gray-400 group-hover:text-gray-300">
              {mode.description}
            </p>
            <div className="mt-3">
              <span
                className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                  mode.difficulty === 'easy'
                    ? 'bg-green-400/20 text-green-400'
                    : mode.difficulty === 'medium'
                    ? 'bg-yellow-400/20 text-yellow-400'
                    : 'bg-red-400/20 text-red-400'
                }`}
              >
                {mode.difficulty.toUpperCase()}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default GameModeSelector;