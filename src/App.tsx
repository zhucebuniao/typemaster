import { useState, useEffect } from 'react';
import TypingGame from './components/TypingGame';
import GameModeSelector, { type GameMode } from './components/GameModeSelector';
import StatsDisplay from './components/StatsDisplay';
import type { UserProgress } from './types/game';
import { loadUserProgress, saveUserProgress, addMistakeWord, addToLeaderboard } from './utils/storage';
import { getWordsByDifficulty, getSentencesByDifficulty, getCodingWords, getCodingSentences } from './data/words';
import { getExperienceForScore, getLevelInfo } from './data/levels';

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
    if (mode.id === 'coding') {
      // Randomly choose between coding words and sentences
      const useWords = Math.random() > 0.5;
      if (useWords) {
        const words = getCodingWords();
        const randomWord = words[Math.floor(Math.random() * words.length)];
        return randomWord.word;
      } else {
        const sentences = getCodingSentences();
        const randomSentence = sentences[Math.floor(Math.random() * sentences.length)];
        return randomSentence.sentence;
      }
    } else if (mode.id.startsWith('words-')) {
      // For demo purposes, always show "i need to do it today" for easy words
      if (mode.difficulty === 'easy') {
        return "i need to do it today";
      }
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

  const handleGameComplete = (wpm: number, accuracy: number) => {
    // Calculate experience gain
    const experienceGain = getExperienceForScore(wpm, accuracy);
    const newExperience = userProgress.experience + experienceGain;
    const oldLevel = getLevelInfo(userProgress.experience);
    const newLevel = getLevelInfo(newExperience);
    
    // Calculate score based on WPM and accuracy
    const score = Math.round(wpm * (accuracy / 100) * 10);
    
    // Update user progress
    const newProgress: UserProgress = {
      ...userProgress,
      bestWpm: Math.max(userProgress.bestWpm, wpm),
      bestAccuracy: Math.max(userProgress.bestAccuracy, accuracy),
      totalScore: userProgress.totalScore + score,
      experience: newExperience,
      level: newLevel.level,
      currentLevelProgress: 0, // Will be calculated in storage
      unlockedModes: newLevel.unlockedModes,
    };
    
    // Check for level up
    if (newLevel.level > oldLevel.level) {
      // Show level up notification (could add this to UI later)
      console.log(`Level Up! Welcome to ${newLevel.name}`);
    }
    
    setUserProgress(newProgress);
    saveUserProgress(newProgress);

    // Add to leaderboard
    addToLeaderboard({
      name: `Player Level ${newLevel.level}`,
      wpm,
      accuracy,
      score,
    });

    // Show completion message
    setTimeout(() => {
      const playAgain = window.confirm(
        `Great job! You achieved ${wpm} WPM with ${accuracy}% accuracy and scored ${score} points!\n\nWould you like to play again?`
      );
      
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
    <header className="w-full glass-dark shadow-apple-lg border-b border-apple-separator">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 sm:space-x-6">
            <h1 className="text-3xl sm:text-4xl font-black font-orbitron tracking-wide">
              <span className="bg-gradient-to-r from-cyber-electric via-cyan-300 to-cyber-neon bg-clip-text text-transparent drop-shadow-lg">
                TYPE
              </span>
              <span className="text-cyber-text drop-shadow-lg">MASTER</span>
            </h1>
            <div className="hidden sm:flex items-center">
              <span className="px-4 py-2 text-sm font-bold bg-gradient-to-r from-cyber-neon to-cyber-electric text-white rounded-full shadow-cyber-glow animate-cyber-pulse tracking-wider">
                v2.0 CYBER
              </span>
            </div>
          </div>
          
          <nav className="flex items-center space-x-2">
            {appState !== 'menu' && (
              <button
                onClick={() => setAppState('menu')}
                className="flex items-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-2.5 text-apple-text-secondary hover:text-apple-text hover:bg-white/10 rounded-apple transition-all duration-300 hover:shadow-apple backdrop-blur-sm border border-transparent hover:border-white/20"
              >
                <span className="text-base sm:text-lg">🏠</span>
                <span className="font-medium text-sm sm:text-base hidden sm:inline">Home</span>
              </button>
            )}
            <button
              onClick={() => setAppState('stats')}
              className={`flex items-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-2.5 rounded-apple transition-all duration-300 hover:shadow-apple backdrop-blur-sm border font-medium text-sm sm:text-base ${
                appState === 'stats' 
                  ? 'bg-apple-primary/20 text-apple-primary border-apple-primary/30 shadow-apple-primary/25 shadow-lg' 
                  : 'text-apple-text-secondary hover:text-apple-text hover:bg-white/10 border-transparent hover:border-white/20'
              }`}
            >
              <span className="text-base sm:text-lg">📊</span>
              <span className="hidden sm:inline">Stats</span>
            </button>
            
            <div className="flex items-center space-x-2 sm:space-x-4 ml-2 sm:ml-4 pl-2 sm:pl-4 border-l border-apple-separator">
              <div className="flex items-center space-x-2 sm:space-x-3 glass-card px-3 sm:px-4 py-2 rounded-apple shadow-apple">
                <div className="flex items-center space-x-1 sm:space-x-2">
                  <span className="w-2 h-2 bg-apple-success rounded-full animate-pulse"></span>
                  <span className="text-xs sm:text-sm font-semibold text-apple-success">Level {userProgress.level}</span>
                </div>
                <span className="text-apple-text-secondary hidden sm:inline">•</span>
                <div className="flex items-center space-x-1">
                  <span className="text-xs sm:text-sm font-semibold text-apple-warning">{userProgress.totalScore}</span>
                  <span className="text-xs text-apple-text-secondary hidden sm:inline">pts</span>
                </div>
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
    <div className="min-h-screen bg-cyber-bg text-cyber-text relative overflow-x-hidden">
      {/* Background decorative elements - Cyber theme */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyber-electric/5 rounded-full blur-3xl animate-cyber-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-cyber-neon/5 rounded-full blur-3xl animate-neon-pulse"></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-cyber-green/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative z-10">
        {renderHeader()}
        <main className="py-6 sm:py-12">
          {renderContent()}
        </main>
        
        {/* Enhanced Footer */}
        <footer className="mt-12 sm:mt-20 relative">
          <div className="absolute inset-0 glass-dark"></div>
          <div className="relative border-t border-apple-separator">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 text-center">
              <div className="mb-6">
                <h3 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-apple-primary to-apple-secondary bg-clip-text text-transparent mb-2">
                  Typemaster
                </h3>
                <p className="text-apple-text-secondary max-w-2xl mx-auto leading-relaxed text-sm sm:text-base px-4">
                  Master your typing skills and enhance your vocabulary with our modern, interactive typing game.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-8 text-sm text-apple-text-secondary mb-6">
                <span className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-apple-success rounded-full animate-pulse"></span>
                  <span>© 2024 Typemaster</span>
                </span>
                <span className="hidden sm:block">•</span>
                <span>2D Typing & English Learning Game</span>
              </div>
              
              <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 text-xs text-apple-text-secondary">
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
