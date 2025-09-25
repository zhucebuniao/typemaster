import { useState } from 'react';
import type { GameResult, TypingGameState } from '../types';
import { mockChallenges } from '../data/words';
import TypingChallenge from '../components/TypingChallenge';
import GameResults from '../components/GameResults';

interface GamePageProps {
  onGameComplete: (result: GameResult) => void;
}

export default function GamePage({ onGameComplete }: GamePageProps) {
  const [selectedChallenge, setSelectedChallenge] = useState(mockChallenges[0]);
  const [gameState, setGameState] = useState<TypingGameState>({
    currentWord: null,
    currentInput: '',
    startTime: null,
    endTime: null,
    mistakes: 0,
    correctChars: 0,
    totalChars: 0,
    isActive: false,
    isCompleted: false
  });
  const [gameResult, setGameResult] = useState<GameResult | null>(null);

  const startGame = () => {
    const firstWord = selectedChallenge.words[0];
    setGameState({
      currentWord: firstWord,
      currentInput: '',
      startTime: Date.now(),
      endTime: null,
      mistakes: 0,
      correctChars: 0,
      totalChars: 0,
      isActive: true,
      isCompleted: false
    });
    setGameResult(null);
  };

  const handleGameComplete = (result: GameResult) => {
    setGameResult(result);
    setGameState(prev => ({ ...prev, isCompleted: true, isActive: false }));
    onGameComplete(result);
  };

  const resetGame = () => {
    setGameState({
      currentWord: null,
      currentInput: '',
      startTime: null,
      endTime: null,
      mistakes: 0,
      correctChars: 0,
      totalChars: 0,
      isActive: false,
      isCompleted: false
    });
    setGameResult(null);
  };

  return (
    <div className="px-4 py-6 space-y-6">
      {/* Header */}
      <section className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">打字游戏</h2>
        <p className="text-gray-600">提升你的英语打字速度和准确率</p>
      </section>

      {!gameState.isActive && !gameState.isCompleted && (
        <>
          {/* Challenge Selection */}
          <section className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">选择挑战</h3>
            <div className="space-y-3">
              {mockChallenges.map((challenge) => (
                <button
                  key={challenge.id}
                  onClick={() => setSelectedChallenge(challenge)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                    selectedChallenge.id === challenge.id
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-800">{challenge.title}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      challenge.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
                      challenge.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {challenge.difficulty === 'easy' ? '简单' : 
                       challenge.difficulty === 'medium' ? '中等' : '困难'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{challenge.description}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>⏱️ {challenge.timeLimit}秒</span>
                    <span>🎯 目标{challenge.targetWpm}WPM</span>
                    <span>📝 {challenge.words.length}个单词</span>
                  </div>
                </button>
              ))}
            </div>
          </section>

          {/* Challenge Details */}
          <section className="card">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">🎮</span>
              <h3 className="text-lg font-semibold text-gray-800">{selectedChallenge.title}</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center">
                <div className="text-xl font-bold text-primary-600">{selectedChallenge.timeLimit}</div>
                <div className="text-sm text-gray-500">秒时限</div>
              </div>
              
              <div className="text-center">
                <div className="text-xl font-bold text-accent-600">{selectedChallenge.targetWpm}</div>
                <div className="text-sm text-gray-500">目标WPM</div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium text-gray-700">将练习的单词：</h4>
              <div className="flex flex-wrap gap-2">
                {selectedChallenge.words.slice(0, 6).map((word) => (
                  <span key={word.id} className="px-2 py-1 bg-gray-100 rounded text-sm">
                    {word.word}
                  </span>
                ))}
                {selectedChallenge.words.length > 6 && (
                  <span className="px-2 py-1 bg-gray-100 rounded text-sm text-gray-500">
                    +{selectedChallenge.words.length - 6}个
                  </span>
                )}
              </div>
            </div>
          </section>

          {/* Start Button */}
          <section>
            <button
              onClick={startGame}
              className="w-full py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all active:scale-95 transform btn-touch"
            >
              <span className="text-lg">🚀 开始挑战</span>
            </button>
          </section>
        </>
      )}

      {gameState.isActive && (
        <TypingChallenge
          challenge={selectedChallenge}
          gameState={gameState}
          onGameStateChange={setGameState}
          onGameComplete={handleGameComplete}
        />
      )}

      {gameState.isCompleted && gameResult && (
        <GameResults
          result={gameResult}
          challenge={selectedChallenge}
          onPlayAgain={resetGame}
          onSelectNewChallenge={resetGame}
        />
      )}
    </div>
  );
}