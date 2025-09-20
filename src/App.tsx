import { useState, useEffect } from 'react';
import TypingGame from './components/TypingGame';
import GameModeSelector, { type GameMode } from './components/GameModeSelector';
import StatsDisplay from './components/StatsDisplay';
import type { UserProgress } from './types/game';
import { loadUserProgress, saveUserProgress, addMistakeWord, addToLeaderboard } from './utils/storage';
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
    if (mode.id.startsWith('words-')) {
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
    // Calculate score based on WPM and accuracy
    const score = Math.round(wpm * (accuracy / 100) * 10);
    
    // Update user progress
    const newProgress: UserProgress = {
      ...userProgress,
      bestWpm: Math.max(userProgress.bestWpm, wpm),
      bestAccuracy: Math.max(userProgress.bestAccuracy, accuracy),
      totalScore: userProgress.totalScore + score,
      level: Math.floor((userProgress.totalScore + score) / 1000) + 1,
    };
    
    setUserProgress(newProgress);
    saveUserProgress(newProgress);

    // Add to leaderboard
    addToLeaderboard({
      name: 'Player', // In a real app, this would be user input
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
    <header className="w-full bg-game-surface shadow-lg">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-white">
              <span className="text-blue-400">Type</span>master
            </h1>
            <span className="text-sm text-gray-400">v1.0 MVP</span>
          </div>
          
          <nav className="flex items-center space-x-4">
            {appState !== 'menu' && (
              <button
                onClick={() => setAppState('menu')}
                className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
              >
                🏠 Home
              </button>
            )}
            <button
              onClick={() => setAppState('stats')}
              className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
            >
              📊 Stats
            </button>
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <span>Level {userProgress.level}</span>
              <span>•</span>
              <span>{userProgress.totalScore} pts</span>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );

  const renderContent = () => {
    switch (appState) {
      case 'menu':
        return <GameModeSelector onModeSelect={handleModeSelect} />;
      case 'game':
        return currentText ? (
          <TypingGame
            targetText={currentText}
            onGameComplete={handleGameComplete}
            onMistake={handleMistake}
          />
        ) : (
          <div className="text-center text-white">Loading...</div>
        );
      case 'stats':
        return (
          <StatsDisplay
            userProgress={userProgress}
            onBack={() => setAppState('menu')}
          />
        );
      default:
        return <GameModeSelector onModeSelect={handleModeSelect} />;
    }
  };

  return (
    <div className="min-h-screen bg-game-bg text-white">
      {renderHeader()}
      <main className="py-8">
        {renderContent()}
      </main>
      
      {/* Footer */}
      <footer className="mt-16 py-8 border-t border-gray-700">
        <div className="max-w-6xl mx-auto px-6 text-center text-gray-400">
          <p>© 2024 Typemaster - 2D Typing & English Learning Game</p>
          <p className="text-sm mt-2">
            Built with React, TypeScript, and Tailwind CSS • Deployed on Vercel
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
