import React, { useState, useEffect, useRef } from 'react';
import { useGameStats } from '../hooks/useGameStats';
import FloatingTextComponent from './FloatingText';
import type { FloatingText } from '../types/game';

interface TypingGameProps {
  targetText: string;
  onGameComplete: (wpm: number, accuracy: number, correctWords: number, timeElapsed: number) => void;
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
  const [floatingTexts, setFloatingTexts] = useState<FloatingText[]>([]);
  const [lastWpm, setLastWpm] = useState(0);
  const [combo, setCombo] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Add floating text animation
  const addFloatingText = (text: string, type: FloatingText['type']) => {
    const id = Date.now().toString() + Math.random().toString(36).substr(2, 9);
    const rect = inputRef.current?.getBoundingClientRect();
    const x = (rect?.left || 0) + Math.random() * (rect?.width || 300);
    const y = (rect?.top || 0) - 50;
    
    const newFloatingText: FloatingText = {
      id,
      text,
      type,
      x,
      y,
      color: type === 'perfect' ? '#facc15' : type === 'wpm' ? '#3b82f6' : '#10b981'
    };
    
    setFloatingTexts(prev => [...prev, newFloatingText]);
  };

  const removeFloatingText = (id: string) => {
    setFloatingTexts(prev => prev.filter(text => text.id !== id));
  };

  useEffect(() => {
    if (targetText && !hasStarted) {
      startGame(targetText);
      setHasStarted(true);
    }
  }, [targetText, hasStarted, startGame]);

  useEffect(() => {
    if (currentInput === targetText && isGameActive) {
      // Game completed
      const perfectScore = stats.accuracy === 100;
      if (perfectScore) {
        addFloatingText('Perfect!', 'perfect');
      }
      
      onGameComplete(stats.wpm, stats.accuracy, stats.correctWords, stats.timeElapsed);
    }
  }, [currentInput, targetText, isGameActive, stats, onGameComplete]);

  // Track WPM improvements for animations
  useEffect(() => {
    if (stats.wpm > lastWpm && stats.wpm > 0 && isGameActive) {
      if (stats.wpm >= lastWpm + 10) {
        addFloatingText(`+${Math.round(stats.wpm - lastWpm)} WPM`, 'wpm');
      }
      setLastWpm(stats.wpm);
    }
  }, [stats.wpm, lastWpm, isGameActive]);

  // Track accuracy and combo
  useEffect(() => {
    if (isGameActive && currentInput.length > 0) {
      const lastChar = currentInput[currentInput.length - 1];
      const expectedChar = targetText[currentInput.length - 1];
      
      if (lastChar === expectedChar) {
        setCombo(prev => {
          const newCombo = prev + 1;
          if (newCombo > 0 && newCombo % 10 === 0) {
            addFloatingText(`${newCombo} Combo!`, 'combo');
          }
          return newCombo;
        });
      } else {
        setCombo(0);
      }
    }
  }, [currentInput, targetText, isGameActive]);

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
    <div className="w-full max-w-6xl mx-auto p-8">
      <div className="bg-gradient-to-br from-game-surface via-game-surface to-slate-800 rounded-3xl shadow-2xl border border-slate-700/50 overflow-hidden backdrop-blur-sm">
        <div className="p-8">
          {/* Stats Display */}
          <div className="grid grid-cols-3 gap-6 mb-8">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl blur opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative text-center p-6 bg-gradient-to-br from-game-bg to-slate-800/80 rounded-2xl border border-green-500/20 backdrop-blur-sm">
                <div className="text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-2">
                  {stats.wpm}
                </div>
                <div className="text-sm text-gray-400 font-medium tracking-wider">WPM</div>
              </div>
            </div>
            
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-2xl blur opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative text-center p-6 bg-gradient-to-br from-game-bg to-slate-800/80 rounded-2xl border border-blue-500/20 backdrop-blur-sm">
                <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                  {stats.accuracy}%
                </div>
                <div className="text-sm text-gray-400 font-medium tracking-wider">ACCURACY</div>
                {/* Combo indicator */}
                {combo > 5 && (
                  <div className="absolute -top-2 -right-2 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-combo-pulse">
                    🔥{combo}
                  </div>
                )}
              </div>
            </div>
            
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-2xl blur opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative text-center p-6 bg-gradient-to-br from-game-bg to-slate-800/80 rounded-2xl border border-yellow-500/20 backdrop-blur-sm">
                <div className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent mb-2">
                  {Math.round(stats.timeElapsed)}s
                </div>
                <div className="text-sm text-gray-400 font-medium tracking-wider">TIME</div>
              </div>
            </div>
          </div>

          {/* Text Display */}
          <div className="mb-8 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10 rounded-2xl blur"></div>
            <div className="relative p-8 bg-gradient-to-br from-game-bg to-slate-800/80 rounded-2xl min-h-[160px] font-mono text-xl leading-relaxed border border-slate-600/50 backdrop-blur-sm">
              <div className="break-words">
                {renderText()}
              </div>
            </div>
          </div>

          {/* Input Field */}
          <div className="mb-8 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur opacity-50"></div>
            <input
              ref={inputRef}
              type="text"
              value={currentInput}
              onChange={handleInputChange}
              className="relative w-full p-6 bg-gradient-to-br from-game-bg to-slate-800/80 border-2 border-gray-600/50 rounded-2xl text-white font-mono text-xl focus:outline-none focus:border-blue-400/80 focus:ring-2 focus:ring-blue-400/30 backdrop-blur-sm transition-all duration-300 placeholder-gray-500"
              placeholder="Start typing to begin your challenge..."
              disabled={!isGameActive && currentInput === targetText}
              autoFocus
            />
          </div>

          {/* Control Buttons */}
          <div className="flex gap-6 justify-center">
            <button
              onClick={handleRestart}
              className="relative group px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white rounded-2xl transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-blue-500/25 hover:shadow-2xl transform hover:scale-105"
            >
              <span className="relative z-10">🔄 Restart</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-blue-600/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
            
            {currentInput === targetText && (
              <button
                onClick={() => window.location.reload()}
                className="relative group px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-500 hover:to-emerald-600 text-white rounded-2xl transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-green-500/25 hover:shadow-2xl transform hover:scale-105"
              >
                <span className="relative z-10">🎉 Next Challenge</span>
                <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-emerald-600/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            )}
          </div>

          {/* Mistakes Display */}
          {mistakes.length > 0 && (
            <div className="mt-8 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-pink-500/20 rounded-2xl blur opacity-75"></div>
              <div className="relative p-6 bg-gradient-to-br from-red-900/40 to-pink-900/40 border-2 border-red-500/50 rounded-2xl backdrop-blur-sm">
                <div className="flex items-center space-x-2 mb-3">
                  <span className="text-2xl">⚠️</span>
                  <div className="text-lg text-red-400 font-semibold">Common Mistakes</div>
                </div>
                <div className="text-red-300 font-mono text-lg leading-relaxed">
                  {mistakes.join(', ')}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Floating Text Animations */}
      <FloatingTextComponent 
        floatingTexts={floatingTexts}
        onAnimationComplete={removeFloatingText}
      />
    </div>
  );
};

export default TypingGame;