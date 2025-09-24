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

  // Calculate level progress (simple mock based on current input)
  const levelProgress = Math.min(Math.round((currentInput.length / targetText.length) * 100), 100);
  
  // Format time in minutes and seconds
  const timeElapsed = Math.floor(stats.timeElapsed);
  const minutes = Math.floor(timeElapsed / 60);
  const seconds = timeElapsed % 60;
  
  // Generate placeholder with underscores
  const placeholder = targetText.split('').map(() => '_').join(' ');
  
  // Calculate score (simple formula)
  const score = Math.round(stats.wpm * (stats.accuracy / 100));

  const handleBackToMenu = () => {
    // This would return to menu - we can implement this later
    console.log('Return to menu clicked');
  };

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col justify-between overflow-x-hidden bg-white dark:bg-gray-900">
      <div className="flex flex-col flex-grow">
        {/* Header */}
        <header className="flex items-center p-4">
          <button 
            className="text-gray-600 dark:text-gray-400"
            onClick={handleBackToMenu}
          >
            <svg fill="currentColor" height="24px" viewBox="0 0 256 256" width="24px" xmlns="http://www.w3.org/2000/svg">
              <path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"></path>
            </svg>
          </button>
          <h1 className="flex-1 text-center text-lg font-bold text-gray-900 dark:text-white tracking-tight pr-6">
            Typing Game
          </h1>
        </header>
        
        {/* Main Content */}
        <main className="flex-grow flex flex-col justify-center px-4">
          {/* Level Progress */}
          <div className="space-y-2 mb-8">
            <div className="flex justify-between items-center text-sm font-medium text-gray-600 dark:text-gray-400">
              <p>Level 1</p>
              <p>{levelProgress}/100</p>
            </div>
            <div className="w-full bg-indigo-200 dark:bg-indigo-800 rounded-full h-2">
              <div 
                className="bg-indigo-500 h-2 rounded-full transition-all duration-500" 
                style={{ width: `${levelProgress}%` }}
              ></div>
            </div>
          </div>
          
          {/* Word Display */}
          <div className="text-center space-y-4">
            <h2 className="text-5xl font-bold text-gray-900 dark:text-white tracking-tighter">
              {targetText}
            </h2>
            <input 
              ref={inputRef}
              className="w-full bg-gray-100 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 focus:ring-indigo-500 focus:border-indigo-500 rounded-lg h-16 text-center text-2xl tracking-widest text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500" 
              placeholder={placeholder}
              type="text"
              value={currentInput}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              autoFocus
            />
          </div>
          
          {/* Timer Display */}
          <div className="flex justify-center gap-4 mt-8">
            <div className="text-center">
              <div className="flex items-center justify-center bg-indigo-100 dark:bg-indigo-900 rounded-lg w-24 h-24">
                <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                  {minutes.toString().padStart(2, '0')}
                </p>
              </div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mt-2">Minutes</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center bg-indigo-100 dark:bg-indigo-900 rounded-lg w-24 h-24">
                <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                  {seconds.toString().padStart(2, '0')}
                </p>
              </div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mt-2">Seconds</p>
            </div>
          </div>
          
          {/* Score */}
          <p className="text-center text-base font-medium text-gray-600 dark:text-gray-400 mt-8">
            Score: {score}
          </p>
        </main>
      </div>
      
      {/* Bottom Navigation */}
      <footer className="sticky bottom-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-t border-gray-200 dark:border-gray-700 safe-area-bottom">
        <nav className="flex justify-around items-center p-2 sm:p-3">
          <button className="flex flex-col items-center gap-1 text-gray-500 dark:text-gray-400 mobile-nav-button touch-active" onClick={handleBackToMenu}>
            <svg fill="currentColor" height="24px" viewBox="0 0 256 256" width="24px" xmlns="http://www.w3.org/2000/svg">
              <path d="M218.83,103.77l-80-75.48a1.14,1.14,0,0,1-.11-.11,16,16,0,0,0-21.53,0l-.11.11L37.17,103.77A16,16,0,0,0,32,115.55V208a16,16,0,0,0,16,16H96a16,16,0,0,0,16-16V160h32v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V115.55A16,16,0,0,0,218.83,103.77ZM208,208H160V160a16,16,0,0,0-16-16H112a16,16,0,0,0-16,16v48H48V115.55l.11-.1L128,40l79.9,75.43.11.10Z"></path>
            </svg>
            <p className="text-xs font-medium mobile-text-sm">Home</p>
          </button>
          <div className="flex flex-col items-center gap-1 text-indigo-500">
            <div className="bg-indigo-500 text-white rounded-full p-2 sm:p-3">
              <svg fill="currentColor" height="24px" viewBox="0 0 256 256" width="24px" xmlns="http://www.w3.org/2000/svg">
                <path d="M112.51,154.2a8,8,0,0,1-8.51-13.62L134.46,128,104,115.42a8,8,0,0,1,8.51-13.62l35.1,14.63a8,8,0,0,1,0,13.14Z"></path><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Z"></path>
              </svg>
            </div>
            <p className="text-xs font-bold mobile-text-sm">Play</p>
          </div>
          <button className="flex flex-col items-center gap-1 text-gray-500 dark:text-gray-400 mobile-nav-button touch-active">
            <svg fill="currentColor" height="24px" viewBox="0 0 256 256" width="24px" xmlns="http://www.w3.org/2000/svg">
              <path d="M232,64H208V56a16,16,0,0,0-16-16H64A16,16,0,0,0,48,56v8H24A16,16,0,0,0,8,80V96a40,40,0,0,0,40,40h3.65A80.13,80.13,0,0,0,120,191.61V216H96a8,8,0,0,0,0,16h64a8,8,0,0,0,0-16H136V191.58c31.94-3.23,58.44-25.64,68.08-55.58H208a40,40,0,0,0,40-40V80A16,16,0,0,0,232,64ZM48,120A24,24,0,0,1,24,96V80H48v32q0,4,.39,8Zm144-8.9c0,35.52-28.49,64.64-63.51,64.9H128a64,64,0,0,1-64-64V56H192ZM232,96a24,24,0,0,1-24,24h-.5a81.81,81.81,0,0,0,.5-8.9V80h24Z"></path>
            </svg>
            <p className="text-xs font-medium mobile-text-sm">Scores</p>
          </button>
          <button className="flex flex-col items-center gap-1 text-gray-500 dark:text-gray-400 mobile-nav-button touch-active">
            <svg fill="currentColor" height="24px" viewBox="0 0 256 256" width="24px" xmlns="http://www.w3.org/2000/svg">
              <path d="M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Zm88-29.84q.06-2.16,0-4.32l14.92-18.64a8,8,0,0,0,1.48-7.06,107.21,107.21,0,0,0-10.88-26.25,8,8,0,0,0-6-3.93l-23.72-2.64q-1.48-1.56-3-3L186,40.54a8,8,0,0,0-3.94-6,107.71,107.71,0,0,0-26.25-10.87,8,8,0,0,0-7.06,1.49L130.16,40Q128,40,125.84,40L107.2,25.11a8,8,0,0,0-7.06-1.48A107.6,107.6,0,0,0,73.89,34.51a8,8,0,0,0-3.93,6L67.32,64.27q-1.56,1.49-3,3L40.54,70a8,8,0,0,0-6,3.94,107.71,107.71,0,0,0-10.87,26.25,8,8,0,0,0,1.49,7.06L40,125.84Q40,128,40,130.16L25.11,148.8a8,8,0,0,0-1.48,7.06,107.21,107.21,0,0,0,10.88,26.25,8,8,0,0,0,6,3.93l23.72,2.64q1.49,1.56,3,3L70,215.46a8,8,0,0,0,3.94,6,107.71,107.71,0,0,0,26.25,10.87,8,8,0,0,0,7.06-1.49L125.84,216q2.16.06,4.32,0l18.64,14.92a8,8,0,0,0,7.06,1.48,107.21,107.21,0,0,0,26.25-10.88,8,8,0,0,0,3.93-6l2.64-23.72q1.56-1.48,3-3L215.46,186a8,8,0,0,0,6-3.94,107.71,107.71,0,0,0,10.87-26.25,8,8,0,0,0-1.49-7.06Zm-16.1-6.5a73.93,73.93,0,0,1,0,8.68,8,8,0,0,0,1.74,5.48l14.19,17.73a91.57,91.57,0,0,1-6.23,15L187,173.11a8,8,0,0,0-5.1,2.64,74.11,74.11,0,0,1-6.14,6.14,8,8,0,0,0-2.64,5.1l-2.51,22.58a91.32,91.32,0,0,1-15,6.23l-17.74-14.19a8,8,0,0,0-5-1.75h-.48a73.93,73.93,0,0,1-8.68,0,8,8,0,0,0-5.48,1.74L100.45,215.8a91.57,91.57,0,0,1-15-6.23L82.89,187a8,8,0,0,0-2.64-5.1,74.11,74.11,0,0,1-6.14-6.14,8,8,0,0,0-5.1-2.64L46.43,170.6a91.32,91.32,0,0,1-6.23-15l14.19-17.74a8,8,0,0,0,1.74-5.48,73.93,73.93,0,0,1,0-8.68,8,8,0,0,0-1.74-5.48L40.2,100.45a91.57,91.57,0,0,1,6.23-15L69,82.89a8,8,0,0,0,5.1-2.64,74.11,74.11,0,0,1,6.14-6.14A8,8,0,0,0,82.89,69L85.4,46.43a91.32,91.32,0,0,1,15-6.23l17.74,14.19a8,8,0,0,0,5.48,1.74,73.93,73.93,0,0,1,8.68,0,8,8,0,0,0,5.48-1.74L155.55,40.2a91.57,91.57,0,0,1,15,6.23L173.11,69a8,8,0,0,0,2.64,5.1,74.11,74.11,0,0,1,6.14,6.14,8,8,0,0,0,5.1,2.64l22.58,2.51a91.32,91.32,0,0,1,6.23,15l-14.19,17.74A8,8,0,0,0,199.87,123.66Z"></path>
            </svg>
            <p className="text-xs font-medium mobile-text-sm">Settings</p>
          </button>
        </nav>
      </footer>
    </div>
  );
};

export default TypingGame;