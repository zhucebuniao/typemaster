import { useState, useEffect } from 'react';
import TypingGame from './components/TypingGame';
import GameModeSelector, { type GameMode } from './components/GameModeSelector';
import StatsDisplay from './components/StatsDisplay';
import type { UserProgress } from './types/game';
import LevelProgressBar from './components/LevelProgressBar';
import { loadUserProgress, addMistakeWord, addToLeaderboard, updateUserProgressWithGameResults } from './utils/storage';
import { getWordsByDifficulty, getSentencesByDifficulty } from './data/words';

type AppState = 'menu' | 'game' | 'stats';

function App() {
  const [appState, setAppState] = useState<AppState>('menu');
  const [currentMode, setCurrentMode] = useState<GameMode | null>(null);
  const [currentText, setCurrentText] = useState<string>('');
  const [userProgress, setUserProgress] = useState<UserProgress>(loadUserProgress());

  useEffect(() => {
    // Load user progress on app start
    const progress = loadUserProgress();
    setUserProgress(progress);
  }, []);

  const getRandomContent = (mode: GameMode): string => {
    if (mode.type === 'wordpack' && mode.wordPack) {
      // Use word from the specific word pack
      const words = mode.wordPack.words;
      const randomWord = words[Math.floor(Math.random() * words.length)];
      return randomWord.word;
    } else if (mode.id.startsWith('words-')) {
      const words = getWordsByDifficulty(mode.difficulty);
      const randomWord = words[Math.floor(Math.random() * words.length)];
      return randomWord.word;
    } else {
      const sentences = getSentencesByDifficulty(mode.difficulty);
      const randomSentence = sentences[Math.floor(Math.random() * sentences.length)];
      return randomSentence.sentence;
    }
  };

  const handleModeSelect = (mode: GameMode) => {
    setCurrentMode(mode);
    const text = getRandomContent(mode);
    setCurrentText(text);
    setAppState('game');
  };

  const handleGameComplete = (wpm: number, accuracy: number, correctWords: number, timeElapsed: number) => {
    // Use new level progression system
    const { leveledUp, newLevel } = updateUserProgressWithGameResults(wpm, accuracy, correctWords, timeElapsed);
    
    // Calculate score for leaderboard
    const score = Math.round(wpm * (accuracy / 100) * correctWords);
    
    // Refresh user progress from storage
    const updatedProgress = loadUserProgress();
    setUserProgress(updatedProgress);

    // Add to leaderboard
    addToLeaderboard({
      name: 'Player', // In a real app, this would be user input
      wpm,
      accuracy,
      score,
    });

    // Show completion message with level up notification
    setTimeout(() => {
      let message = `Great job! You achieved ${wpm} WPM with ${accuracy}% accuracy and scored ${score} points!`;
      
      if (leveledUp) {
        message += `\n🎉 LEVEL UP! You are now Level ${newLevel}!`;
      }
      
      message += '\n\nWould you like to play again?';
      
      const playAgain = window.confirm(message);
      
      if (playAgain) {
        const text = getRandomContent(currentMode!);
        setCurrentText(text);
      } else {
        setAppState('menu');
      }
    }, 500);
  };

  const handleMistake = (char: string) => {
    if (currentMode && currentMode.id.startsWith('words-')) {
      // Find the word that contains this character
      const words = getWordsByDifficulty(currentMode.difficulty);
      const mistakeWord = words.find(word => word.word.includes(char));
      if (mistakeWord) {
        addMistakeWord(mistakeWord);
        
        // Update local state
        const progress = loadUserProgress();
        setUserProgress(progress);
      }
    }
  };

  const renderHeader = () => (
    <header className="w-full bg-gradient-to-r from-game-surface via-game-surface to-slate-800 shadow-2xl border-b border-slate-700/50 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-6 py-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <h1 className="text-3xl font-bold">
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-500 bg-clip-text text-transparent">
                Type
              </span>
              <span className="text-white">master</span>
            </h1>
            <div className="flex items-center">
              <span className="px-3 py-1 text-xs font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full shadow-lg">
                v1.1
              </span>
            </div>
          </div>
          
          <nav className="flex items-center space-x-2">
            {appState !== 'menu' && (
              <button
                onClick={() => setAppState('menu')}
                className="flex items-center space-x-2 px-4 py-2.5 text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300 hover:shadow-lg backdrop-blur-sm border border-transparent hover:border-white/20"
              >
                <span className="text-lg">🏠</span>
                <span className="font-medium">Home</span>
              </button>
            )}
            <button
              onClick={() => setAppState('stats')}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl transition-all duration-300 hover:shadow-lg backdrop-blur-sm border font-medium ${
                appState === 'stats' 
                  ? 'bg-blue-500/20 text-blue-300 border-blue-500/30 shadow-blue-500/25 shadow-lg' 
                  : 'text-gray-300 hover:text-white hover:bg-white/10 border-transparent hover:border-white/20'
              }`}
            >
              <span className="text-lg">📊</span>
              <span>Stats</span>
            </button>
            
            <div className="flex items-center space-x-4 ml-4 pl-4 border-l border-gray-600">
              <div className="min-w-[200px]">
                <LevelProgressBar userProgress={userProgress} />
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );

  const renderContent = () => {
    switch (appState) {
      case 'menu':
        return <GameModeSelector onModeSelect={handleModeSelect} userProgress={userProgress} />;
      case 'game':
        return currentText ? (
          <TypingGame
            targetText={currentText}
            onGameComplete={handleGameComplete}
            onMistake={handleMistake}
          />
        ) : (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
              <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-purple-500 rounded-full animate-spin animation-delay-75"></div>
            </div>
            <p className="mt-6 text-xl text-gray-300 font-medium">Loading your challenge...</p>
            <p className="mt-2 text-sm text-gray-500">Preparing the perfect typing experience</p>
          </div>
        );
      case 'stats':
        return (
          <StatsDisplay
            userProgress={userProgress}
            onBack={() => setAppState('menu')}
          />
        );
      default:
        return <GameModeSelector onModeSelect={handleModeSelect} userProgress={userProgress} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-game-bg via-slate-900 to-game-bg text-white relative overflow-x-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-cyan-500/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative z-10">
        {renderHeader()}
        <main className="py-12">
          {renderContent()}
        </main>
        
        {/* Enhanced Footer */}
        <footer className="mt-20 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-slate-800/50 via-game-surface/50 to-slate-800/50 backdrop-blur-sm"></div>
          <div className="relative border-t border-gradient-to-r from-transparent via-gray-600 to-transparent">
            <div className="max-w-6xl mx-auto px-6 py-12 text-center">
              <div className="mb-6">
                <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                  Typemaster
                </h3>
                <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed">
                  Master your typing skills and enhance your vocabulary with our modern, interactive typing game.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-8 text-sm text-gray-500 mb-6">
                <span className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  <span>© 2024 Typemaster</span>
                </span>
                <span className="hidden sm:block">•</span>
                <span>2D Typing & English Learning Game</span>
              </div>
              
              <div className="flex flex-wrap justify-center items-center space-x-6 text-xs text-gray-600">
                <span className="flex items-center space-x-1">
                  <span>⚛️</span>
                  <span>React</span>
                </span>
                <span className="flex items-center space-x-1">
                  <span>🎨</span>
                  <span>Tailwind CSS</span>
                </span>
                <span className="flex items-center space-x-1">
                  <span>📘</span>
                  <span>TypeScript</span>
                </span>
                <span className="flex items-center space-x-1">
                  <span>▲</span>
                  <span>Vercel</span>
                </span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
