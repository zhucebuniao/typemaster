import React from 'react';
import type { UserProgress } from '../types/game';
import { getLevelInfo } from '../data/levels';

export interface GameMode {
  id: string;
  name: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  icon: string;
  requiredLevel?: number;
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
    requiredLevel: 1,
  },
  {
    id: 'sentences-easy',
    name: 'Easy Sentences',
    description: 'Type complete sentences with simple grammar',
    difficulty: 'easy',
    icon: '📝',
    requiredLevel: 2,
  },
  {
    id: 'words-medium',
    name: 'Medium Words',
    description: 'Challenge yourself with longer words',
    difficulty: 'medium',
    icon: '🌿',
    requiredLevel: 3,
  },
  {
    id: 'sentences-medium',
    name: 'Medium Sentences',
    description: 'Practice with more complex sentence structures',
    difficulty: 'medium',
    icon: '📄',
    requiredLevel: 4,
  },
  {
    id: 'words-hard',
    name: 'Hard Words',
    description: 'Master complex vocabulary',
    difficulty: 'hard',
    icon: '🌳',
    requiredLevel: 5,
  },
  {
    id: 'sentences-hard',
    name: 'Hard Sentences',
    description: 'Conquer challenging sentence structures',
    difficulty: 'hard',
    icon: '📜',
    requiredLevel: 5,
  },
  {
    id: 'coding',
    name: 'Coding Terms',
    description: 'Practice programming vocabulary and syntax',
    difficulty: 'hard',
    icon: '💻',
    requiredLevel: 6,
  },
];

const GameModeSelector: React.FC<GameModeSelectorProps> = ({ onModeSelect, userProgress }) => {
  const currentLevel = getLevelInfo(userProgress.experience);
  
  const isModeLocked = (mode: GameMode): boolean => {
    return mode.requiredLevel ? currentLevel.level < mode.requiredLevel : false;
  };
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'border-apple-success/60 hover:border-apple-success/80';
      case 'medium':
        return 'border-apple-warning/60 hover:border-apple-warning/80';
      case 'hard':
        return 'border-apple-error/60 hover:border-apple-error/80';
      default:
        return 'border-apple-separator hover:border-apple-text-secondary';
    }
  };

  const getDifficultyBg = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-apple-success/10 hover:bg-apple-success/15';
      case 'medium':
        return 'bg-apple-warning/10 hover:bg-apple-warning/15';
      case 'hard':
        return 'bg-apple-error/10 hover:bg-apple-error/15';
      default:
        return 'bg-apple-card-light/50';
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
      <div className="text-center mb-8 sm:mb-12">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-apple-primary via-apple-secondary to-blue-400 bg-clip-text text-transparent mb-3 sm:mb-4">
          Choose Your Challenge
        </h2>
        <p className="text-sm sm:text-base md:text-lg text-apple-text-secondary max-w-2xl mx-auto leading-relaxed px-2">
          Level {currentLevel.level} - {currentLevel.name}
        </p>
        <p className="text-xs sm:text-sm text-apple-text-secondary/80 mt-2 px-2">
          Select a game mode to start improving your typing skills
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
        {gameModes.map((mode) => {
          const isLocked = isModeLocked(mode);
          return (
            <button
              key={mode.id}
              onClick={() => !isLocked && onModeSelect(mode)}
              disabled={isLocked}
              className={`relative p-6 sm:p-8 rounded-apple-xl transition-all duration-300 group overflow-hidden glass-card border ${
                isLocked 
                  ? 'opacity-60 cursor-not-allowed border-apple-separator bg-apple-card' 
                  : `hover:scale-[1.02] active:scale-[0.98] hover:shadow-apple-lg ${getDifficultyColor(mode.difficulty)} ${getDifficultyBg(mode.difficulty)}`
              }`}
            >
              {/* Lock overlay */}
              {isLocked && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-20 rounded-apple-xl backdrop-blur-sm">
                  <div className="text-center">
                    <div className="text-3xl sm:text-4xl mb-2">🔒</div>
                    <div className="text-xs sm:text-sm font-semibold text-apple-text-secondary">
                      Requires Level {mode.requiredLevel}
                    </div>
                  </div>
                </div>
              )}
              
              {/* Gradient overlay for modern effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Icon with glow effect */}
              <div className="relative z-10">
                <div className={`text-4xl sm:text-5xl mb-3 sm:mb-4 transform transition-transform duration-300 filter drop-shadow-lg ${
                  !isLocked ? 'group-hover:scale-110' : ''
                }`}>
                  {mode.icon}
                </div>
                
                <h3 className={`text-lg sm:text-xl font-bold mb-2 sm:mb-3 transition-colors duration-300 ${
                  isLocked ? 'text-apple-text-secondary' : 'text-apple-text group-hover:text-gray-100'
                }`}>
                  {mode.name}
                </h3>
                
                <p className={`transition-colors duration-300 leading-relaxed mb-3 sm:mb-4 text-sm sm:text-base ${
                  isLocked ? 'text-apple-text-secondary/70' : 'text-apple-text-secondary group-hover:text-apple-text-secondary/90'
                }`}>
                  {mode.description}
                </p>
                
                <div className="flex justify-center">
                  <span
                    className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-apple transition-shadow duration-300 ${
                      isLocked
                        ? 'bg-apple-separator text-apple-text-secondary'
                        : mode.difficulty === 'easy'
                        ? 'bg-gradient-to-r from-apple-success to-green-400 text-white shadow-apple-success/25 group-hover:shadow-apple-lg'
                        : mode.difficulty === 'medium'
                        ? 'bg-gradient-to-r from-apple-warning to-yellow-400 text-white shadow-apple-warning/25 group-hover:shadow-apple-lg'
                        : 'bg-gradient-to-r from-apple-error to-red-400 text-white shadow-apple-error/25 group-hover:shadow-apple-lg'
                    }`}
                  >
                    {mode.difficulty}
                  </span>
                </div>
              </div>
              
              {/* Subtle border glow effect */}
              {!isLocked && (
                <div className={`absolute inset-0 rounded-apple-xl transition-all duration-300 ${
                  mode.difficulty === 'easy'
                    ? 'group-hover:shadow-[0_0_30px_rgba(52,199,89,0.3)]'
                    : mode.difficulty === 'medium'
                    ? 'group-hover:shadow-[0_0_30px_rgba(255,159,10,0.3)]'
                    : 'group-hover:shadow-[0_0_30px_rgba(255,59,48,0.3)]'
                }`} />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default GameModeSelector;