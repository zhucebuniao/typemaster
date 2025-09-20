import React from 'react';
import type { UserProgress } from '../types/game';
import { getExpRequiredForLevel, getExpToNextLevel } from '../utils/storage';

interface LevelProgressBarProps {
  userProgress: UserProgress;
  className?: string;
}

const LevelProgressBar: React.FC<LevelProgressBarProps> = ({ 
  userProgress, 
  className = "" 
}) => {
  const currentLevelExp = getExpRequiredForLevel(userProgress.level);
  const nextLevelExp = getExpRequiredForLevel(userProgress.level + 1);
  const progressInLevel = userProgress.currentExp - currentLevelExp;
  const expNeededForLevel = nextLevelExp - currentLevelExp;
  const progressPercentage = Math.max(0, Math.min(100, (progressInLevel / expNeededForLevel) * 100));

  return (
    <div className={`${className}`}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-semibold text-white">Level {userProgress.level}</span>
          {userProgress.streak > 0 && (
            <div className="flex items-center space-x-1 px-2 py-1 bg-orange-500/20 rounded-full">
              <span className="text-xs">🔥</span>
              <span className="text-xs font-bold text-orange-400">{userProgress.streak}</span>
            </div>
          )}
        </div>
        <div className="text-xs text-gray-400">
          {Math.round(progressInLevel)}/{expNeededForLevel} XP
        </div>
      </div>
      
      <div className="relative">
        <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full transition-all duration-1000 relative"
            style={{ width: `${progressPercentage}%` }}
          >
            {/* Animated shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 animate-pulse" />
          </div>
        </div>
        
        {/* Level milestone markers */}
        <div className="absolute top-0 left-0 w-full h-full flex justify-between items-center px-1">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={`w-1 h-5 rounded-full ${
                (i / 4) * 100 <= progressPercentage 
                  ? 'bg-cyan-400 shadow-cyan-400/50 shadow-lg' 
                  : 'bg-gray-600'
              }`}
            />
          ))}
        </div>
      </div>
      
      <div className="flex justify-between text-xs text-gray-500 mt-1">
        <span>Total XP: {userProgress.currentExp}</span>
        <span>Next level: {getExpToNextLevel(userProgress.currentExp)} XP</span>
      </div>
    </div>
  );
};

export default LevelProgressBar;