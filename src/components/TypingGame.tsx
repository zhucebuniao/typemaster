import React, { useState, useEffect, useRef } from 'react';
import { useGameStats } from '../hooks/useGameStats';
import ModernCard from './ui/ModernCard';
import ModernButton from './ui/ModernButton';

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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.ctrlKey && e.key === 'r') {
      e.preventDefault();
      handleRestart();
    }
    if (e.key === 'Escape') {
      e.preventDefault();
      // This would return to menu - we can implement this later
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

  // Generate Chinese text based on English text
  const getChineseText = (englishText: string) => {
    const chineseTranslations: { [key: string]: string } = {
      'apple': '苹果',
      'car': '汽车',
      'cat': '猫',
      'dog': '狗',
      'house': '房子',
      'book': '书',
      'water': '水',
      'food': '食物',
      'tree': '树',
      'sun': '太阳',
      'moon': '月亮',
      'hand': '手',
      'eye': '眼睛',
      'time': '时间',
      'good': '好的',
      'i need to do it today': '我今天需要做这件事情',
      'hello world': '你好世界',
      'good morning': '早上好'
    };
    
    // For single words, we can still use the reference phrase from the image
    return chineseTranslations[englishText.toLowerCase()] || '我今天需要做这件事情';
  };

  const renderText = () => {
    return targetText.split('').map((char, index) => {
      let className = 'text-3xl lg:text-4xl xl:text-5xl font-mono transition-all duration-200 ';
      
      if (index < currentInput.length) {
        if (currentInput[index] === char) {
          className += 'text-green-400 drop-shadow-lg';
        } else {
          className += 'text-red-400 animate-pulse';
        }
      } else if (index === currentInput.length) {
        className += 'text-white bg-gradient-to-r from-blue-500 to-purple-500 shadow-glow-blue animate-pulse';
      } else {
        className += 'text-gray-500';
      }
      
      return (
        <span key={index} className="relative inline-block">
          {char === ' ' ? (
            <span className="inline-block w-6 lg:w-8 border-b-2 border-gray-400 mx-2 h-8 lg:h-12 align-bottom"></span>
          ) : (
            <span className={className + ' tracking-wider px-1'}>{char}</span>
          )}
        </span>
      );
    });
  };

  return (
    <div className="min-h-screen text-white flex flex-col relative">
      {/* Modern progress indicator */}
      <div className="w-full h-2 bg-black/50 relative overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-500 ease-out relative"
          style={{ width: `${(currentInput.length / targetText.length) * 100}%` }}
        >
          <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
        </div>
      </div>

      {/* Stats header */}
      <div className="w-full glass-modern border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">{stats.wpm}</div>
                <div className="text-xs text-gray-400 uppercase tracking-wide">WPM</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">{stats.accuracy}%</div>
                <div className="text-xs text-gray-400 uppercase tracking-wide">Accuracy</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">{Math.floor(stats.timeElapsed / 1000)}s</div>
                <div className="text-xs text-gray-400 uppercase tracking-wide">Time</div>
              </div>
            </div>
            
            <ModernButton
              variant="outline"
              size="sm"
              onClick={handleRestart}
              icon={<span>🔄</span>}
            >
              Restart
            </ModernButton>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 max-w-6xl mx-auto w-full">
        {/* Chinese translation card */}
        <ModernCard className="mb-12 max-w-3xl w-full text-center" hover={false}>
          <h2 className="text-2xl lg:text-3xl font-medium text-gray-300 tracking-wide">
            {getChineseText(targetText)}
          </h2>
        </ModernCard>

        {/* Main typing area */}
        <ModernCard className="w-full max-w-5xl" hover={false}>
          <div className="space-y-8">
            {/* English text display */}
            <div className="text-center">
              <div className="text-3xl lg:text-4xl xl:text-5xl leading-relaxed flex flex-wrap justify-center items-baseline font-mono">
                {renderText()}
              </div>
            </div>
            
            {/* Input area */}
            <div className="border-t border-white/10 pt-8">
              <div className="relative max-w-2xl mx-auto">
                <input
                  ref={inputRef}
                  type="text"
                  value={currentInput}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  className="w-full px-6 py-4 bg-black/30 border border-white/20 rounded-modern-lg text-white text-lg placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300"
                  placeholder="Start typing here..."
                  autoFocus
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <div className="flex items-center space-x-2 text-sm">
                    <span>{currentInput.length}</span>
                    <span>/</span>
                    <span>{targetText.length}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ModernCard>
      </div>

      {/* Modern bottom navigation */}
      <div className="glass-modern border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400">
            <div className="flex items-center space-x-2">
              <kbd className="px-2 py-1 bg-black/40 rounded text-xs border border-white/20">Ctrl</kbd>
              <span>+</span>
              <kbd className="px-2 py-1 bg-black/40 rounded text-xs border border-white/20">R</kbd>
              <span className="ml-2">Restart</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <kbd className="px-2 py-1 bg-black/40 rounded text-xs border border-white/20">Esc</kbd>
              <span className="ml-2">Return to Menu</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <kbd className="px-2 py-1 bg-black/40 rounded text-xs border border-white/20">Space</kbd>
              <span className="ml-2">Word Break</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypingGame;