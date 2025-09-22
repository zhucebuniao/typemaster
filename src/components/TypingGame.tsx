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
      let className = 'text-4xl font-light ';
      
      if (index < currentInput.length) {
        if (currentInput[index] === char) {
          className += 'text-white';
        } else {
          className += 'text-red-400';
        }
      } else if (index === currentInput.length) {
        className += 'text-white bg-white/30 animate-pulse';
      } else {
        className += 'text-gray-500';
      }
      
      return (
        <span key={index} className="relative inline-block">
          {char === ' ' ? (
            <span className="inline-block w-8 border-b-2 border-gray-400 mx-1 h-12 align-bottom"></span>
          ) : (
            <span className={className + ' tracking-[0.15em]'}>{char}</span>
          )}
        </span>
      );
    });
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col">
      {/* Progress Bar */}
      <div className="w-full h-1 bg-slate-700">
        <div 
          className="h-full bg-green-500 transition-all duration-300 ease-out"
          style={{ width: `${(currentInput.length / targetText.length) * 100}%` }}
        ></div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 py-16">
        {/* Chinese Text */}
        <div className="text-center mb-16">
          <h2 className="text-2xl text-gray-300 font-light tracking-wide mb-2">
            {getChineseText(targetText)}
          </h2>
        </div>

        {/* English Text with Underlines for Spaces */}
        <div className="text-center mb-24 max-w-4xl">
          <div className="leading-relaxed flex flex-wrap justify-center items-baseline">
            {renderText()}
          </div>
        </div>

        {/* Hidden Input Field */}
        <input
          ref={inputRef}
          type="text"
          value={currentInput}
          onChange={handleInputChange}
          className="opacity-0 absolute -left-9999px"
          autoFocus
          placeholder="Start typing..."
        />
      </div>

      {/* Bottom Navigation */}
      <div className="bg-slate-800/50 border-t border-slate-700 py-4">
        <div className="flex justify-center items-center space-x-8 text-sm text-gray-400">
          <div className="flex items-center space-x-2">
            <kbd className="px-2 py-1 bg-slate-700 rounded text-xs">Ctrl</kbd>
            <span>+</span>
            <kbd className="px-2 py-1 bg-slate-700 rounded text-xs">H</kbd>
            <span className="ml-2">重新开始</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <kbd className="px-2 py-1 bg-slate-700 rounded text-xs">Ctrl</kbd>
            <span>+</span>
            <kbd className="px-2 py-1 bg-slate-700 rounded text-xs">J</kbd>
            <span className="ml-2">重新练习</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <kbd className="px-2 py-1 bg-slate-700 rounded text-xs">Space</kbd>
            <span className="ml-2">单词练习提示</span>
          </div>

          {/* Restart Button */}
          <button
            onClick={handleRestart}
            className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors duration-200 text-white text-sm"
          >
            重新开始
          </button>
        </div>
      </div>
    </div>
  );
};

export default TypingGame;