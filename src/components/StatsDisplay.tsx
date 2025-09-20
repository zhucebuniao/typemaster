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
    <div className="w-full max-w-6xl mx-auto p-8">
      <div className="bg-gradient-to-br from-game-surface via-game-surface to-slate-800 rounded-3xl shadow-2xl border border-slate-700/50 overflow-hidden backdrop-blur-sm">
        <div className="p-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8">
            <div>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent mb-2">
                Your Statistics
              </h2>
              <p className="text-gray-400 text-lg">Track your progress and achievements</p>
            </div>
            <button
              onClick={onBack}
              className="mt-4 sm:mt-0 relative group px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white rounded-xl transition-all duration-300 font-semibold shadow-lg hover:shadow-blue-500/25 hover:shadow-xl transform hover:scale-105"
            >
              <span className="relative z-10 flex items-center space-x-2">
                <span>←</span>
                <span>Back to Game</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-blue-600/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-2xl blur opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative p-6 bg-gradient-to-br from-game-bg to-slate-800/80 rounded-2xl border border-blue-500/20 backdrop-blur-sm text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                  {userProgress.level}
                </div>
                <div className="text-sm text-gray-400 font-medium tracking-wider">LEVEL</div>
                <div className="mt-2 w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full transition-all duration-1000"
                    style={{ width: `${Math.min((userProgress.totalScore % 100), 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>
            
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl blur opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative p-6 bg-gradient-to-br from-game-bg to-slate-800/80 rounded-2xl border border-green-500/20 backdrop-blur-sm text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-2">
                  {userProgress.bestWpm}
                </div>
                <div className="text-sm text-gray-400 font-medium tracking-wider">BEST WPM</div>
                <div className="mt-2 text-xs text-green-400">
                  {userProgress.bestWpm > 0 ? '🚀 Personal Best' : '🎯 Start typing!'}
                </div>
              </div>
            </div>
            
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-2xl blur opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative p-6 bg-gradient-to-br from-game-bg to-slate-800/80 rounded-2xl border border-yellow-500/20 backdrop-blur-sm text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent mb-2">
                  {userProgress.bestAccuracy}%
                </div>
                <div className="text-sm text-gray-400 font-medium tracking-wider">ACCURACY</div>
                <div className="mt-2 text-xs text-yellow-400">
                  {userProgress.bestAccuracy >= 95 ? '🎯 Excellent!' : userProgress.bestAccuracy >= 85 ? '👍 Good!' : '📈 Keep improving!'}
                </div>
              </div>
            </div>
            
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl blur opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative p-6 bg-gradient-to-br from-game-bg to-slate-800/80 rounded-2xl border border-purple-500/20 backdrop-blur-sm text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                  {userProgress.totalScore}
                </div>
                <div className="text-sm text-gray-400 font-medium tracking-wider">TOTAL SCORE</div>
                <div className="mt-2 text-xs text-purple-400">
                  🏆 Keep going!
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {/* Mistake Words */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-pink-500/10 rounded-2xl blur"></div>
              <div className="relative bg-gradient-to-br from-game-bg to-slate-800/80 rounded-2xl p-6 border border-slate-600/50 backdrop-blur-sm">
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center space-x-2">
                  <span>📚</span>
                  <span>Vocabulary Review ({userProgress.mistakeWords.length})</span>
                </h3>
                {userProgress.mistakeWords.length > 0 ? (
                  <div className="space-y-3 max-h-80 overflow-y-auto">
                    {userProgress.mistakeWords.map((word, index) => (
                      <div
                        key={index}
                        className="group p-4 bg-gradient-to-r from-red-900/20 to-pink-900/20 rounded-xl border border-red-500/30 hover:border-red-500/50 transition-all duration-300"
                      >
                        <div className="flex justify-between items-center">
                          <div className="flex-1">
                            <span className="font-mono text-lg text-white font-semibold">{word.word}</span>
                            <p className="text-gray-400 mt-1 text-sm">{word.meaning}</p>
                          </div>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              word.difficulty === 'easy'
                                ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
                                : word.difficulty === 'medium'
                                ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white'
                                : 'bg-gradient-to-r from-red-500 to-pink-500 text-white'
                            }`}
                          >
                            {word.difficulty}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-400">
                    <div className="text-6xl mb-4">🎉</div>
                    <h4 className="text-xl font-semibold text-white mb-2">Perfect Performance!</h4>
                    <p className="text-gray-400">No mistakes yet! Keep practicing to maintain your streak.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Leaderboard */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-2xl blur"></div>
              <div className="relative bg-gradient-to-br from-game-bg to-slate-800/80 rounded-2xl p-6 border border-slate-600/50 backdrop-blur-sm">
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center space-x-2">
                  <span>🏆</span>
                  <span>Local Leaderboard</span>
                </h3>
                {leaderboard.length > 0 ? (
                  <div className="space-y-3 max-h-80 overflow-y-auto">
                    {leaderboard.map((entry, index) => (
                      <div
                        key={index}
                        className={`group p-4 rounded-xl border transition-all duration-300 ${
                          index === 0
                            ? 'bg-gradient-to-r from-yellow-900/40 to-orange-900/40 border-yellow-500/50 shadow-yellow-500/20 shadow-lg'
                            : index === 1
                            ? 'bg-gradient-to-r from-gray-700/40 to-gray-600/40 border-gray-500/50 shadow-gray-500/20 shadow-lg'
                            : index === 2
                            ? 'bg-gradient-to-r from-amber-900/40 to-orange-900/40 border-amber-500/50 shadow-amber-500/20 shadow-lg'
                            : 'bg-gradient-to-r from-game-bg/60 to-slate-800/60 border-slate-600/30 hover:border-slate-500/50'
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <div className="flex items-center space-x-3">
                            <span className={`text-2xl font-bold w-8 ${
                              index === 0 ? 'text-yellow-400' : 
                              index === 1 ? 'text-gray-300' : 
                              index === 2 ? 'text-amber-500' : 'text-gray-500'
                            }`}>
                              {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}.`}
                            </span>
                            <span className="text-white font-semibold text-lg">{entry.name}</span>
                          </div>
                          <div className="flex items-center space-x-4 text-sm">
                            <div className="text-center">
                              <div className="text-green-400 font-bold">{entry.wpm}</div>
                              <div className="text-xs text-gray-500">WPM</div>
                            </div>
                            <div className="text-center">
                              <div className="text-blue-400 font-bold">{entry.accuracy}%</div>
                              <div className="text-xs text-gray-500">ACC</div>
                            </div>
                            <div className="text-center">
                              <div className="text-yellow-400 font-bold">{entry.score}</div>
                              <div className="text-xs text-gray-500">PTS</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-400">
                    <div className="text-6xl mb-4">🏆</div>
                    <h4 className="text-xl font-semibold text-white mb-2">No Champions Yet!</h4>
                    <p className="text-gray-400">Complete a game to see your ranking and compete for the top spot.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsDisplay;