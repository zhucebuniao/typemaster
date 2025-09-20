import React from 'react';
import type { UserProgress } from '../types/game';
import { getLeaderboard } from '../utils/storage';

interface StatsDisplayProps {
  userProgress: UserProgress;
  onBack: () => void;
}

const StatsDisplay: React.FC<StatsDisplayProps> = ({ userProgress, onBack }) => {
  const leaderboard = getLeaderboard();

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-white">Your Statistics</h2>
        <button
          onClick={onBack}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          Back to Game
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="p-4 bg-game-surface rounded-lg text-center">
          <div className="text-2xl font-bold text-blue-400">{userProgress.level}</div>
          <div className="text-sm text-gray-400">Level</div>
        </div>
        <div className="p-4 bg-game-surface rounded-lg text-center">
          <div className="text-2xl font-bold text-green-400">{userProgress.bestWpm}</div>
          <div className="text-sm text-gray-400">Best WPM</div>
        </div>
        <div className="p-4 bg-game-surface rounded-lg text-center">
          <div className="text-2xl font-bold text-yellow-400">{userProgress.bestAccuracy}%</div>
          <div className="text-sm text-gray-400">Best Accuracy</div>
        </div>
        <div className="p-4 bg-game-surface rounded-lg text-center">
          <div className="text-2xl font-bold text-purple-400">{userProgress.totalScore}</div>
          <div className="text-sm text-gray-400">Total Score</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Mistake Words */}
        <div className="bg-game-surface rounded-lg p-6">
          <h3 className="text-xl font-semibold text-white mb-4">
            Vocabulary Review ({userProgress.mistakeWords.length})
          </h3>
          {userProgress.mistakeWords.length > 0 ? (
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {userProgress.mistakeWords.map((word, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-3 bg-game-bg rounded border border-red-500/30"
                >
                  <div>
                    <span className="font-mono text-white">{word.word}</span>
                    <span className="text-gray-400 ml-3">{word.meaning}</span>
                  </div>
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      word.difficulty === 'easy'
                        ? 'bg-green-400/20 text-green-400'
                        : word.difficulty === 'medium'
                        ? 'bg-yellow-400/20 text-yellow-400'
                        : 'bg-red-400/20 text-red-400'
                    }`}
                  >
                    {word.difficulty}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-400">
              <div className="text-4xl mb-2">🎉</div>
              <p>No mistakes yet! Keep practicing!</p>
            </div>
          )}
        </div>

        {/* Leaderboard */}
        <div className="bg-game-surface rounded-lg p-6">
          <h3 className="text-xl font-semibold text-white mb-4">
            Local Leaderboard
          </h3>
          {leaderboard.length > 0 ? (
            <div className="space-y-2">
              {leaderboard.map((entry, index) => (
                <div
                  key={index}
                  className={`flex justify-between items-center p-3 rounded ${
                    index === 0
                      ? 'bg-yellow-900/30 border border-yellow-500/50'
                      : index === 1
                      ? 'bg-gray-700/30 border border-gray-500/50'
                      : index === 2
                      ? 'bg-amber-900/30 border border-amber-500/50'
                      : 'bg-game-bg'
                  }`}
                >
                  <div className="flex items-center">
                    <span className="text-lg font-bold text-gray-400 w-8">
                      {index + 1}.
                    </span>
                    <span className="text-white font-medium">{entry.name}</span>
                  </div>
                  <div className="flex gap-4 text-sm">
                    <span className="text-green-400">{entry.wpm} WPM</span>
                    <span className="text-blue-400">{entry.accuracy}%</span>
                    <span className="text-yellow-400">{entry.score} pts</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-400">
              <div className="text-4xl mb-2">🏆</div>
              <p>No scores yet. Complete a game to see your ranking!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatsDisplay;