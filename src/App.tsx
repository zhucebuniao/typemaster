import { useState, useEffect } from 'react';
import TypingGame from './components/TypingGame';
import TypeTutor from './components/TypeTutor';
import ScoresView from './components/ScoresView';
import ProfileView from './components/ProfileView';
import type { UserProgress } from './types/game';
import { loadUserProgress, saveUserProgress, addMistakeWord, addToLeaderboard } from './utils/storage';
import { getWordsByDifficulty } from './data/words';
import { getExperienceForScore } from './data/levels';

type AppState = 'home' | 'game' | 'scores' | 'profile';
type TabState = 'home' | 'scores' | 'profile';

function App() {
  const [appState, setAppState] = useState<AppState>('home');
  const [currentTab, setCurrentTab] = useState<TabState>('home');
  const [currentText, setCurrentText] = useState<string>('');
  const [userProgress, setUserProgress] = useState<UserProgress>(loadUserProgress());

  useEffect(() => {
    // Load user progress on app start
    const progress = loadUserProgress();
    setUserProgress(progress);
  }, []);

  const startNewGame = () => {
    // For simplicity, use easy words for the game
    const words = getWordsByDifficulty('easy');
    const randomWord = words[Math.floor(Math.random() * words.length)];
    setCurrentText(randomWord.word);
    setAppState('game');
  };

  const handleGameComplete = (wpm: number, accuracy: number) => {
    const score = Math.round(wpm * (accuracy / 100));
    const experience = getExperienceForScore(wpm, accuracy);
    
    // Update user progress
    const newProgress = {
      ...userProgress,
      totalScore: userProgress.totalScore + score,
      experience: userProgress.experience + experience,
      bestWpm: Math.max(userProgress.bestWpm, wpm),
      bestAccuracy: Math.max(userProgress.bestAccuracy, accuracy),
    };

    setUserProgress(newProgress);
    saveUserProgress(newProgress);
    addToLeaderboard({ 
      name: `Player Level ${userProgress.level}`,
      wpm, 
      accuracy, 
      score 
    });
    
    // Return to home after game
    setAppState('home');
  };

  const handleMistake = (char: string) => {
    // For now, we'll create a simple word entry for mistakes
    // In a more complex implementation, this would track actual words
    const mistakeWord = { 
      word: char, 
      meaning: '', 
      difficulty: 'easy' as const 
    };
    addMistakeWord(mistakeWord);
  };

  const handleTabChange = (tab: TabState) => {
    setCurrentTab(tab);
    if (tab === 'home') {
      setAppState('home');
    } else if (tab === 'scores') {
      setAppState('scores');
    } else if (tab === 'profile') {
      setAppState('profile');
    }
  };

  const handleSettings = () => {
    // Future: Open settings modal
    console.log('Settings clicked');
  };

  const handleHighScores = () => {
    setCurrentTab('scores');
    setAppState('scores');
  };

  const handleBackToHome = () => {
    setCurrentTab('home');
    setAppState('home');
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {appState === 'game' && (
        <TypingGame
          targetText={currentText}
          onGameComplete={handleGameComplete}
          onMistake={handleMistake}
        />
      )}
      
      {appState === 'home' && (
        <TypeTutor
          onStartGame={startNewGame}
          onHighScores={handleHighScores}
          onSettings={handleSettings}
          currentTab={currentTab}
          onTabChange={handleTabChange}
        />
      )}
      
      {appState === 'scores' && (
        <ScoresView
          onBack={handleBackToHome}
          currentTab={currentTab}
          onTabChange={handleTabChange}
        />
      )}
      
      {appState === 'profile' && (
        <ProfileView
          onBack={handleBackToHome}
          currentTab={currentTab}
          onTabChange={handleTabChange}
        />
      )}
    </div>
  );
}

export default App;
