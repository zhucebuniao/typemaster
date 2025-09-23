import { useState, useEffect } from 'react';
import TypingGame from './components/TypingGame';
import GameModeSelector, { type GameMode } from './components/GameModeSelector';
import StatsDisplay from './components/StatsDisplay';
import ModernCard from './components/ui/ModernCard';
import ModernButton from './components/ui/ModernButton';
import ParticleBackground from './components/ui/ParticleBackground';
import FloatingActionButton from './components/ui/FloatingActionButton';
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
    handleGameStart(mode);
  };
  
  const handleGameStart = (mode: GameMode) => {
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
    <header className="relative">
      {/* Animated background */}
      <div className="absolute inset-0 mesh-gradient-1 opacity-20"></div>
      <div className="absolute inset-0 glass-modern"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          {/* Modern logo */}
          <div className="flex items-center space-x-6">
            <div className="group">
              <h1 className="text-4xl sm:text-5xl font-display font-black tracking-tight">
                <span className="gradient-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  TYPE
                </span>
                <span className="text-white ml-2">MASTER</span>
              </h1>
              <div className="h-1 w-full bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
            </div>
            
            {/* Version badge */}
            <div className="hidden sm:block">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-500/30 animate-pulse-glow">
                v3.0 Neural
              </span>
            </div>
          </div>
          
          {/* Navigation */}
          <nav className="flex items-center space-x-4">
            {appState !== 'menu' && (
              <ModernButton
                variant="ghost"
                size="md"
                onClick={() => setAppState('menu')}
                icon={<span className="text-xl">🏠</span>}
                className="hover:bg-blue-500/20"
              >
                <span className="hidden sm:inline ml-2">Home</span>
              </ModernButton>
            )}
            
            <ModernButton
              variant={appState === 'stats' ? 'primary' : 'ghost'}
              size="md"
              onClick={() => setAppState('stats')}
              icon={<span className="text-xl">📊</span>}
              className={appState === 'stats' ? 'shadow-glow-blue' : 'hover:bg-purple-500/20'}
            >
              <span className="hidden sm:inline ml-2">Stats</span>
            </ModernButton>
            
            {/* User progress display */}
            <ModernCard className="p-3" hover={false}>
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-semibold text-green-400">Level {userProgress.level}</span>
                </div>
                <div className="w-px h-4 bg-gray-600"></div>
                <div className="flex items-center space-x-1">
                  <span className="text-sm font-semibold text-yellow-400">{userProgress.totalScore}</span>
                  <span className="text-xs text-gray-400">pts</span>
                </div>
              </div>
            </ModernCard>
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
    <div className="min-h-screen text-white font-display overflow-x-hidden">
      {/* Particle background */}
      <ParticleBackground density="medium" />
      
      {/* Main content */}
      <div className="relative z-10">
        {renderHeader()}
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="animate-fade-in-up">
            {renderContent()}
          </div>
        </main>
        
        {/* Modern footer */}
        <footer className="relative mt-20">
          <div className="absolute inset-0 mesh-gradient-2 opacity-10"></div>
          <div className="relative glass-modern border-t border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
              <ModernCard className="max-w-4xl mx-auto" hover={false}>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold gradient-text mb-3">
                      Typemaster Neural
                    </h3>
                    <p className="text-gray-300 text-lg">
                      Master your typing skills with AI-powered learning and next-generation UX
                    </p>
                  </div>
                  
                  <div className="text-sm text-gray-400 space-y-2">
                    <div>© 2024 Typemaster • Neural-Enhanced Typing Experience</div>
                    <div className="flex items-center justify-center space-x-6 text-xs">
                      <span className="flex items-center space-x-1">
                        <span>⚛️</span>
                        <span>React 19</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <span>🎨</span>
                        <span>Tailwind 4.0</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <span>📘</span>
                        <span>TypeScript</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <span>⚡</span>
                        <span>Vite</span>
                      </span>
                    </div>
                  </div>
                </div>
              </ModernCard>
            </div>
          </div>
        </footer>
      </div>
      
      {/* Floating action buttons */}
      {appState === 'menu' && (
        <FloatingActionButton
          position="bottom-right"
          variant="primary"
          tooltip="Quick Start"
          onClick={() => {
            const easyMode: GameMode = { 
              id: 'words-easy', 
              name: 'Easy Words', 
              description: 'Practice with simple, common words',
              difficulty: 'easy', 
              type: 'words',
              icon: '🌱',
              requiredLevel: 1
            };
            handleGameStart(easyMode);
          }}
        >
          <span className="text-xl">🚀</span>
        </FloatingActionButton>
      )}
      
      {(appState === 'game' || appState === 'stats') && (
        <FloatingActionButton
          position="bottom-left"
          variant="secondary"
          tooltip="Settings"
          onClick={() => {
            // Future: Open settings modal
            console.log('Settings clicked');
          }}
        >
          <span className="text-xl">⚙️</span>
        </FloatingActionButton>
      )}
    </div>
  );
}

export default App;
