import React from 'react';
import ModernCard from './ui/ModernCard';
import ModernButton from './ui/ModernButton';
import type { UserProgress } from '../types/game';
import { getLeaderboard } from '../utils/storage';

interface StatsDisplayProps {
  userProgress: UserProgress;
  onBack: () => void;
}

const StatsDisplay: React.FC<StatsDisplayProps> = ({ userProgress, onBack }) => {
  const leaderboard = getLeaderboard();

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-4xl lg:text-5xl font-bold gradient-text">
            Your Neural Progress
          </h1>
          <p className="text-gray-300 text-lg">
            Track your journey to typing mastery with AI-powered insights
          </p>
        </div>
        
        <ModernButton
          variant="outline"
          size="lg"
          onClick={onBack}
          icon={<span>←</span>}
          className="mt-4 sm:mt-0"
        >
          Back to Journey
        </ModernButton>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {/* Best WPM */}
        <ModernCard className="text-center" glow>
          <div className="space-y-3">
            <div className="text-4xl lg:text-5xl font-bold text-green-400">
              {userProgress.bestWpm}
            </div>
            <div className="text-sm text-gray-400 uppercase tracking-wider font-medium">
              Best WPM
            </div>
            <div className="text-xs text-green-400">
              {userProgress.bestWpm >= 60 ? '🚀 Lightning Fast!' : 
               userProgress.bestWpm >= 40 ? '⚡ Very Good!' : 
               userProgress.bestWpm >= 20 ? '👍 Getting Better!' : '📈 Keep Practicing!'}
            </div>
          </div>
        </ModernCard>

        {/* Best Accuracy */}
        <ModernCard className="text-center" glow>
          <div className="space-y-3">
            <div className="text-4xl lg:text-5xl font-bold text-blue-400">
              {userProgress.bestAccuracy}%
            </div>
            <div className="text-sm text-gray-400 uppercase tracking-wider font-medium">
              Accuracy
            </div>
            <div className="text-xs text-blue-400">
              {userProgress.bestAccuracy >= 95 ? '🎯 Perfect!' : 
               userProgress.bestAccuracy >= 85 ? '👌 Excellent!' : 
               userProgress.bestAccuracy >= 70 ? '✅ Good!' : '📊 Room to grow!'}
            </div>
          </div>
        </ModernCard>

        {/* Total Score */}
        <ModernCard className="text-center" glow>
          <div className="space-y-3">
            <div className="text-4xl lg:text-5xl font-bold text-purple-400">
              {userProgress.totalScore}
            </div>
            <div className="text-sm text-gray-400 uppercase tracking-wider font-medium">
              Neural Score
            </div>
            <div className="text-xs text-purple-400">
              🧠 AI-Enhanced Points
            </div>
          </div>
        </ModernCard>

        {/* Level */}
        <ModernCard className="text-center" glow>
          <div className="space-y-3">
            <div className="text-4xl lg:text-5xl font-bold text-yellow-400">
              {userProgress.level}
            </div>
            <div className="text-sm text-gray-400 uppercase tracking-wider font-medium">
              Neural Level
            </div>
            <div className="text-xs text-yellow-400">
              🎮 Experience: {userProgress.experience}
            </div>
          </div>
        </ModernCard>
      </div>

      {/* Leaderboard and Mistakes */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Leaderboard */}
        <ModernCard>
          <div className="space-y-6">
            <h3 className="text-2xl font-bold gradient-text flex items-center space-x-2">
              <span>🏆</span>
              <span>Neural Champions</span>
            </h3>
            
            {leaderboard.length > 0 ? (
              <div className="space-y-3">
                {leaderboard.slice(0, 10).map((entry, index) => (
                  <div 
                    key={index}
                    className="flex items-center justify-between p-4 bg-black/20 rounded-modern border border-white/10 hover:border-white/20 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="text-lg font-bold text-yellow-400">
                        #{index + 1}
                      </div>
                      <div>
                        <div className="font-semibold text-white">{entry.wpm} WPM</div>
                        <div className="text-sm text-gray-400">{entry.accuracy}% accuracy</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-purple-400">{entry.score}</div>
                      <div className="text-xs text-gray-400">points</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-400">
                <div className="text-6xl mb-4">🎯</div>
                <h4 className="text-xl font-semibold text-white mb-2">No Champions Yet!</h4>
                <p className="text-gray-400">Complete a typing session to see your ranking and compete for the top spot.</p>
              </div>
            )}
          </div>
        </ModernCard>

        {/* Mistake Words */}
        <ModernCard>
          <div className="space-y-6">
            <h3 className="text-2xl font-bold gradient-text flex items-center space-x-2">
              <span>🧠</span>
              <span>Learning Opportunities</span>
            </h3>
            
            {userProgress.mistakeWords.length > 0 ? (
              <div className="space-y-2 max-h-80 overflow-y-auto custom-scrollbar">
                {userProgress.mistakeWords.slice(0, 20).map((word, index) => (
                  <div 
                    key={index}
                    className="flex items-center justify-between p-3 bg-red-500/10 rounded-modern border border-red-500/30 hover:border-red-400 transition-colors"
                  >
                    <span className="font-mono text-red-300">{typeof word === 'string' ? word : (word as any).word || 'Unknown'}</span>
                    <span className="text-xs text-red-400">Practice More</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-400">
                <div className="text-6xl mb-4">✨</div>
                <h4 className="text-xl font-semibold text-white mb-2">Perfect Performance!</h4>
                <p className="text-gray-400">No mistakes recorded yet. Keep up the excellent work!</p>
              </div>
            )}
          </div>
        </ModernCard>
      </div>
    </div>
  );
};

export default StatsDisplay;