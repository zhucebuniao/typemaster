import React from 'react';
import ModernCard from './ui/ModernCard';
import ModernButton from './ui/ModernButton';
import type { UserProgress } from '../types/game';
import { getLevelInfo } from '../data/levels';

export interface GameMode {
  id: string;
  name: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  icon: string;
  requiredLevel?: number;
  type?: 'words' | 'sentences' | 'coding';
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
    type: 'words',
  },
  {
    id: 'sentences-easy',
    name: 'Easy Sentences',
    description: 'Type complete sentences with simple grammar',
    difficulty: 'easy',
    icon: '📝',
    requiredLevel: 2,
    type: 'sentences',
  },
  {
    id: 'words-medium',
    name: 'Medium Words',
    description: 'Challenge yourself with longer words',
    difficulty: 'medium',
    icon: '🌿',
    requiredLevel: 3,
    type: 'words',
  },
  {
    id: 'sentences-medium',
    name: 'Medium Sentences',
    description: 'Practice with more complex sentence structures',
    difficulty: 'medium',
    icon: '📄',
    requiredLevel: 4,
    type: 'sentences',
  },
  {
    id: 'words-hard',
    name: 'Hard Words',
    description: 'Master complex vocabulary',
    difficulty: 'hard',
    icon: '🌳',
    requiredLevel: 5,
    type: 'words',
  },
  {
    id: 'sentences-hard',
    name: 'Hard Sentences',
    description: 'Conquer challenging sentence structures',
    difficulty: 'hard',
    icon: '📜',
    requiredLevel: 5,
    type: 'sentences',
  },
  {
    id: 'coding',
    name: 'Coding Terms',
    description: 'Practice programming vocabulary and syntax',
    difficulty: 'hard',
    icon: '💻',
    requiredLevel: 6,
    type: 'coding',
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
        return 'from-green-500 to-emerald-500';
      case 'medium':
        return 'from-yellow-500 to-orange-500';
      case 'hard':
        return 'from-red-500 to-pink-500';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return '🟢';
      case 'medium':
        return '🟡';
      case 'hard':
        return '🔴';
      default:
        return '⚪';
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-12">
      {/* Hero section */}
      <div className="text-center space-y-6">
        <div className="space-y-4">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black font-display tracking-tight">
            <span className="gradient-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              START YOUR
            </span>
            <br />
            <span className="gradient-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              NEURAL JOURNEY
            </span>
          </h1>
          
          <p className="text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Master the keyboard with AI-powered learning and next-generation UX
          </p>
        </div>
        
        {/* Level indicator */}
        <ModernCard className="max-w-md mx-auto" hover={false}>
          <div className="flex items-center justify-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-lg font-semibold text-green-400">Level {currentLevel.level}</span>
            </div>
            <div className="w-px h-6 bg-gray-600"></div>
            <span className="text-gray-300">{currentLevel.name}</span>
          </div>
        </ModernCard>
      </div>
      
      {/* Game modes grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
        {gameModes.map((mode) => {
          const locked = isModeLocked(mode);
          return (
            <ModernCard
              key={mode.id}
              className={`group relative overflow-hidden ${locked ? 'opacity-60' : ''}`}
              hover={!locked}
              glow={!locked}
              disabled={locked}
              onClick={() => !locked && onModeSelect(mode)}
            >
              <div className="relative z-10 space-y-4">
                {/* Mode header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="text-3xl">{mode.icon}</div>
                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:gradient-text transition-all duration-300">
                        {mode.name}
                      </h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-sm">{getDifficultyIcon(mode.difficulty)}</span>
                        <span className={`text-sm font-medium bg-gradient-to-r ${getDifficultyColor(mode.difficulty)} bg-clip-text text-transparent`}>
                          {mode.difficulty.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {locked && (
                    <div className="flex items-center space-x-1 px-2 py-1 bg-red-500/20 rounded-lg border border-red-500/30">
                      <span className="text-red-400 text-sm">🔒</span>
                      <span className="text-xs text-red-300">Level {mode.requiredLevel}</span>
                    </div>
                  )}
                </div>
                
                {/* Mode description */}
                <p className="text-gray-300 text-sm leading-relaxed">
                  {mode.description}
                </p>
                
                {/* Hover effect overlay */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className={`absolute inset-0 bg-gradient-to-br ${getDifficultyColor(mode.difficulty)} opacity-5 rounded-modern-lg`}></div>
                </div>
              </div>
              
              {/* Locked overlay */}
              {locked && (
                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm rounded-modern-lg flex items-center justify-center">
                  <div className="text-center text-gray-400">
                    <div className="text-2xl mb-2">🔒</div>
                    <div className="text-sm font-medium">Requires Level {mode.requiredLevel}</div>
                  </div>
                </div>
              )}
              
              {/* Gradient border effect */}
              {!locked && (
                <div className={`absolute inset-0 bg-gradient-to-r ${getDifficultyColor(mode.difficulty)} opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-modern-lg blur-xl`}></div>
              )}
            </ModernCard>
          );
        })}
      </div>
      
      {/* Quick action section */}
      <div className="text-center space-y-6">
        <ModernCard className="max-w-2xl mx-auto" hover={false}>
          <div className="space-y-4">
            <h3 className="text-2xl font-bold gradient-text">
              Ready to Begin?
            </h3>
            <p className="text-gray-300">
              Start with Easy Words to build your foundation, or choose any unlocked mode that matches your skill level.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <ModernButton
                variant="primary"
                size="lg"
                onClick={() => onModeSelect(gameModes[0])}
                icon={<span>🚀</span>}
              >
                Quick Start
              </ModernButton>
              <ModernButton
                variant="outline"
                size="lg"
                onClick={() => {
                  // Future: Open tutorial or settings
                  console.log('Tutorial clicked');
                }}
                icon={<span>📚</span>}
              >
                Tutorial
              </ModernButton>
            </div>
          </div>
        </ModernCard>
      </div>
    </div>
  );
};

export default GameModeSelector;