import { useState, useEffect, useRef, useCallback } from 'react';
import type { GameChallenge, GameResult, TypingGameState } from '../types';

interface TypingChallengeProps {
  challenge: GameChallenge;
  gameState: TypingGameState;
  onGameStateChange: (state: TypingGameState) => void;
  onGameComplete: (result: GameResult) => void;
}

export default function TypingChallenge({ 
  challenge, 
  gameState, 
  onGameStateChange, 
  onGameComplete 
}: TypingChallengeProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(challenge.timeLimit);
  const [showError, setShowError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const currentWord = challenge.words[currentWordIndex];

  const completeGame = useCallback(() => {
    const endTime = Date.now();
    const timeSpent = gameState.startTime ? (endTime - gameState.startTime) / 1000 : 0;
    const wordsTyped = currentWordIndex + (gameState.currentInput === currentWord?.word ? 1 : 0);
    const wpm = Math.round((wordsTyped / timeSpent) * 60);
    const accuracy = gameState.totalChars > 0 ? Math.round((gameState.correctChars / gameState.totalChars) * 100) : 0;

    const result: GameResult = {
      id: Date.now().toString(),
      wordId: challenge.id,
      timestamp: endTime,
      wpm: wpm,
      accuracy: accuracy,
      timeSpent: timeSpent,
      mistakes: gameState.mistakes
    };

    onGameComplete(result);
  }, [challenge.id, currentWordIndex, currentWord?.word, gameState.startTime, gameState.currentInput, gameState.totalChars, gameState.correctChars, gameState.mistakes, onGameComplete]);

  useEffect(() => {
    if (gameState.isActive && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            completeGame();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [gameState.isActive, timeLeft, completeGame]);

  useEffect(() => {
    if (gameState.isActive && inputRef.current) {
      inputRef.current.focus();
    }
  }, [gameState.isActive, currentWordIndex]);

  const handleInputChange = (value: string) => {
    if (!gameState.isActive || !currentWord) return;

    const newState = { ...gameState, currentInput: value };

    // Check if word is completed correctly
    if (value === currentWord.word) {
      // Word completed successfully
      const nextIndex = currentWordIndex + 1;
      
      if (nextIndex >= challenge.words.length) {
        // All words completed
        completeGame();
        return;
      } else {
        // Move to next word
        setCurrentWordIndex(nextIndex);
        newState.currentInput = '';
        newState.correctChars += currentWord.word.length;
        newState.totalChars += currentWord.word.length;
      }
    } else if (value.length > currentWord.word.length || 
               !currentWord.word.startsWith(value)) {
      // Input is wrong
      if (!showError) {
        setShowError(true);
        // Vibration feedback for mobile
        if (navigator.vibrate) {
          navigator.vibrate(100);
        }
        setTimeout(() => setShowError(false), 600);
      }
      newState.mistakes += 1;
      newState.totalChars += 1;
    } else {
      // Input is correct so far
      newState.correctChars += value.length - gameState.currentInput.length;
      newState.totalChars += value.length - gameState.currentInput.length;
    }

    onGameStateChange(newState);
  };

  const getCharacterColor = (char: string, index: number) => {
    if (index < gameState.currentInput.length) {
      return gameState.currentInput[index] === char ? 'text-green-600 bg-green-100' : 'text-red-600 bg-red-100';
    } else if (index === gameState.currentInput.length) {
      return 'bg-primary-200'; // Cursor position
    }
    return 'text-gray-400';
  };

  const progressPercentage = (currentWordIndex / challenge.words.length) * 100;
  const timeProgress = ((challenge.timeLimit - timeLeft) / challenge.timeLimit) * 100;

  return (
    <div className={`space-y-6 ${showError ? 'shake' : ''}`}>
      {/* Progress and Stats */}
      <section className="card">
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <div className="text-xl font-bold text-primary-600">{timeLeft}</div>
            <div className="text-sm text-gray-500">剩余时间</div>
          </div>
          
          <div className="text-center">
            <div className="text-xl font-bold text-accent-600">{currentWordIndex + 1}</div>
            <div className="text-sm text-gray-500">/ {challenge.words.length}</div>
          </div>
          
          <div className="text-center">
            <div className="text-xl font-bold text-secondary-600">{gameState.mistakes}</div>
            <div className="text-sm text-gray-500">错误</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="progress-bar mb-2">
          <div 
            className="progress-fill"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>

        {/* Time Progress */}
        <div className="progress-bar">
          <div 
            className="h-full bg-gradient-to-r from-accent-500 to-secondary-500 transition-all duration-1000"
            style={{ width: `${timeProgress}%` }}
          />
        </div>
      </section>

      {/* Current Word Display */}
      <section className="card text-center">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">当前单词</h3>
          <div className="text-4xl font-bold mb-2 font-mono tracking-wider">
            {currentWord?.word.split('').map((char, index) => (
              <span
                key={index}
                className={`${getCharacterColor(char, index)} px-1 py-2 rounded transition-all duration-150`}
              >
                {char}
              </span>
            ))}
          </div>
          <div className="text-gray-500 mb-2">{currentWord?.phonetic}</div>
          <div className="definition-text max-w-md mx-auto">{currentWord?.definition}</div>
        </div>
      </section>

      {/* Input Area */}
      <section className="card">
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">
            输入当前单词：
          </label>
          <input
            ref={inputRef}
            type="text"
            value={gameState.currentInput}
            onChange={(e) => handleInputChange(e.target.value)}
            className={`w-full px-4 py-3 text-xl font-mono border-2 rounded-xl focus:outline-none transition-all ${
              showError 
                ? 'border-red-500 bg-red-50' 
                : 'border-gray-200 focus:border-primary-500'
            }`}
            placeholder="开始输入..."
            disabled={!gameState.isActive}
            autoComplete="off"
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck="false"
          />
          
          {/* Keyboard Hint */}
          <div className="text-center text-sm text-gray-500">
            {gameState.currentInput.length === 0 && "💡 提示：确保输入法为英文状态"}
          </div>
        </div>
      </section>

      {/* Word Queue Preview */}
      <section className="card">
        <h4 className="font-medium text-gray-700 mb-3">即将练习：</h4>
        <div className="flex gap-2 overflow-x-auto">
          {challenge.words.slice(currentWordIndex + 1, currentWordIndex + 6).map((word) => (
            <span
              key={word.id}
              className="flex-shrink-0 px-3 py-2 bg-gray-100 rounded-lg text-sm font-mono"
            >
              {word.word}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}