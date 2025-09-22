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
        return 'border-cyber-green/60 hover:border-cyber-green/80 shadow-green-glow hover:shadow-green-glow';
      case 'medium':
        return 'border-cyber-orange/60 hover:border-cyber-orange/80 shadow-orange-glow hover:shadow-orange-glow';
      case 'hard':
        return 'border-cyber-red/60 hover:border-cyber-red/80 shadow-red-glow hover:shadow-red-glow';
      default:
        return 'border-cyber-border hover:border-cyber-text-muted';
    }
  };

  const getDifficultyBg = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-cyber-green/10 hover:bg-cyber-green/15';
      case 'medium':
        return 'bg-cyber-orange/10 hover:bg-cyber-orange/15';
      case 'hard':
        return 'bg-cyber-red/10 hover:bg-cyber-red/15';
      default:
        return 'bg-cyber-card/50';
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
      <div className="text-center mb-8 sm:mb-12">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-black font-orbitron bg-gradient-to-r from-cyber-electric via-cyan-300 to-cyber-neon bg-clip-text text-transparent mb-4 sm:mb-6 drop-shadow-2xl tracking-wide">
          START YOUR TYPING JOURNEY
        </h2>
        <p className="text-xl sm:text-2xl md:text-3xl text-cyber-text-muted max-w-4xl mx-auto leading-relaxed px-2 mb-2 font-light">
          Master the keyboard, one word at a time.
        </p>
        <div className="flex items-center justify-center space-x-3 mt-6">
          <div className="px-6 py-3 bg-gradient-to-r from-cyber-electric/20 to-cyber-neon/20 rounded-full border border-cyber-electric/40 backdrop-blur-sm animate-cyber-pulse">
            <span className="text-base font-bold text-cyber-electric">Level {currentLevel.level}</span>
            <span className="text-base text-cyber-text-muted ml-3">- {currentLevel.name}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
        {gameModes.map((mode) => {
          const isLocked = isModeLocked(mode);
          return (
            <button
              key={mode.id}
              onClick={() => !isLocked && onModeSelect(mode)}
              disabled={isLocked}
              className={`relative p-8 sm:p-10 rounded-2xl transition-all duration-300 group overflow-hidden backdrop-blur-xl border-2 ${
                isLocked 
                  ? 'opacity-50 cursor-not-allowed border-cyber-border bg-cyber-card/30' 
                  : `hover:scale-[1.03] active:scale-95 transform hover:shadow-2xl ${getDifficultyColor(mode.difficulty)} ${getDifficultyBg(mode.difficulty)}`
              }`}
            >
              {/* Lock overlay */}
              {isLocked && (
                <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-20 rounded-2xl backdrop-blur-sm">
                  <div className="text-center">
                    <div className="text-4xl sm:text-5xl mb-3 filter drop-shadow-lg">🔒</div>
                    <div className="text-sm sm:text-base font-bold text-cyber-text-muted">
                      Requires Level {mode.requiredLevel}
                    </div>
                  </div>
                </div>
              )}
              
              {/* Cyber gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyber-electric/5 via-transparent to-cyber-neon/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Icon with enhanced glow effect */}
              <div className="relative z-10">
                <div className={`text-6xl sm:text-7xl mb-6 sm:mb-8 transform transition-all duration-500 filter drop-shadow-2xl ${
                  !isLocked ? 'group-hover:scale-110 group-hover:-rotate-12' : ''
                }`}>
                  {mode.icon}
                </div>
                
                <h3 className={`text-2xl sm:text-3xl font-black font-orbitron mb-4 sm:mb-6 transition-all duration-300 tracking-wide uppercase ${
                  isLocked ? 'text-cyber-text-muted' : 'text-cyber-text group-hover:text-white group-hover:drop-shadow-lg'
                }`}>
                  {mode.name}
                </h3>
                
                <p className={`transition-colors duration-300 leading-relaxed mb-6 sm:mb-8 text-base sm:text-lg ${
                  isLocked ? 'text-cyber-text-muted/70' : 'text-cyber-text-muted group-hover:text-cyber-text-muted/90'
                }`}>
                  {mode.description}
                </p>
                
                <div className="flex justify-center">
                  <span
                    className={`inline-flex items-center px-6 py-3 rounded-full text-sm font-black uppercase tracking-widest transition-all duration-300 ${
                      isLocked
                        ? 'bg-cyber-border text-cyber-text-muted'
                        : mode.difficulty === 'easy'
                        ? 'bg-gradient-to-r from-cyber-green to-green-300 text-black shadow-green-glow group-hover:shadow-green-glow'
                        : mode.difficulty === 'medium'
                        ? 'bg-gradient-to-r from-cyber-orange to-yellow-300 text-black shadow-orange-glow group-hover:shadow-orange-glow'
                        : 'bg-gradient-to-r from-cyber-red to-red-300 text-white shadow-red-glow group-hover:shadow-red-glow'
                    }`}
                  >
                    {mode.difficulty}
                  </span>
                </div>
              </div>
              
              {/* Enhanced border glow effect */}
              {!isLocked && (
                <div className={`absolute inset-0 rounded-2xl transition-all duration-500 group-hover:animate-glow-expand ${
                  mode.difficulty === 'easy'
                    ? 'group-hover:shadow-[0_0_40px_rgba(57,255,20,0.4)]'
                    : mode.difficulty === 'medium'
                    ? 'group-hover:shadow-[0_0_40px_rgba(255,140,0,0.4)]'
                    : 'group-hover:shadow-[0_0_40px_rgba(255,7,58,0.4)]'
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