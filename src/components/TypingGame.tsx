import React, { useState, useEffect, useRef } from 'react';
import { useGameStats } from '../hooks/useGameStats';

interface TypingGameProps {
  targetText: string;
  onGameComplete: (wpm: number, accuracy: number) => void;
  onMistake?: (char: string) => void;
}

const TypingGame: React.FC<TypingGameProps> = ({ 
  targetText, 
  onGameComplete, 
  onMistake 
}) => {
  const { 
    stats, 
    currentInput, 
    isGameActive, 
    mistakes, 
    startGame, 
    updateInput, 
    resetGame 
  } = useGameStats();
  
  const [hasStarted, setHasStarted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (targetText && !hasStarted) {
      startGame(targetText);
      setHasStarted(true);
    }
  }, [targetText, hasStarted, startGame]);

  useEffect(() => {
    if (currentInput === targetText && isGameActive) {
      onGameComplete(stats.wpm, stats.accuracy);
    }
  }, [currentInput, targetText, isGameActive, stats.wpm, stats.accuracy, onGameComplete]);

  useEffect(() => {
    if (mistakes.length > 0 && onMistake) {
      onMistake(mistakes[mistakes.length - 1]);
    }
  }, [mistakes, onMistake]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= targetText.length) {
      updateInput(value);
    }
  };

  const handleRestart = () => {
    resetGame();
    setHasStarted(false);
    if (inputRef.current) {
      inputRef.current.value = '';
      inputRef.current.focus();
    }
  };

  const renderText = () => {
    return targetText.split('').map((char, index) => {
      let className = 'text-lg ';
      
      if (index < currentInput.length) {
        if (currentInput[index] === char) {
          className += 'text-green-400 bg-green-400/20';
        } else {
          className += 'text-red-400 bg-red-400/20';
        }
      } else if (index === currentInput.length) {
        className += 'text-gray-300 bg-blue-400/30 animate-pulse';
      } else {
        className += 'text-gray-500';
      }
      
      return (
        <span key={index} className={className}>
          {char === ' ' ? '␣' : char}
        </span>
      );
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-game-surface rounded-lg shadow-xl">
      {/* Stats Display */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center p-3 bg-game-bg rounded-lg">
          <div className="text-2xl font-bold text-green-400">{stats.wpm}</div>
          <div className="text-sm text-gray-400">WPM</div>
        </div>
        <div className="text-center p-3 bg-game-bg rounded-lg">
          <div className="text-2xl font-bold text-blue-400">{stats.accuracy}%</div>
          <div className="text-sm text-gray-400">Accuracy</div>
        </div>
        <div className="text-center p-3 bg-game-bg rounded-lg">
          <div className="text-2xl font-bold text-yellow-400">
            {Math.round(stats.timeElapsed)}s
          </div>
          <div className="text-sm text-gray-400">Time</div>
        </div>
      </div>

      {/* Text Display */}
      <div className="mb-6 p-4 bg-game-bg rounded-lg min-h-[120px] font-mono text-lg leading-relaxed">
        <div className="break-words">
          {renderText()}
        </div>
      </div>

      {/* Input Field */}
      <div className="mb-4">
        <input
          ref={inputRef}
          type="text"
          value={currentInput}
          onChange={handleInputChange}
          className="w-full p-3 bg-game-bg border border-gray-600 rounded-lg text-white font-mono text-lg focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
          placeholder="Start typing..."
          disabled={!isGameActive && currentInput === targetText}
          autoFocus
        />
      </div>

      {/* Control Buttons */}
      <div className="flex gap-4 justify-center">
        <button
          onClick={handleRestart}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
        >
          Restart
        </button>
        {currentInput === targetText && (
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors font-medium"
          >
            Next Challenge
          </button>
        )}
      </div>

      {/* Mistakes Display */}
      {mistakes.length > 0 && (
        <div className="mt-4 p-3 bg-red-900/30 border border-red-500/50 rounded-lg">
          <div className="text-sm text-red-400 mb-1">Common mistakes:</div>
          <div className="text-red-300 font-mono">
            {mistakes.join(', ')}
          </div>
        </div>
      )}
    </div>
  );
};

export default TypingGame;