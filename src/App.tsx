import { useState, useEffect } from 'react';
import type { NavigationTab, AppState } from './types';
import HomePage from './pages/HomePage';
import VocabularyPage from './pages/VocabularyPage';
import GamePage from './pages/GamePage';
import ProfilePage from './pages/ProfilePage';
import BottomNavigation from './components/BottomNavigation';
import TopNavigation from './components/TopNavigation';
import { mockAchievements } from './data/words';

function App() {
  const [appState, setAppState] = useState<AppState>({
    currentTab: 'home',
    userProgress: {
      totalWordsLearned: 45,
      totalGamesPlayed: 23,
      averageWpm: 32,
      averageAccuracy: 87,
      streak: 3,
      lastActiveDate: new Date().toISOString(),
      level: 5,
      experience: 1250
    },
    achievements: mockAchievements,
    favoriteWords: ['2', '5', '7'],
    gameHistory: []
  });

  const switchTab = (tab: NavigationTab) => {
    setAppState(prev => ({ ...prev, currentTab: tab }));
  };

  // Function to update user progress (future use)
  // const updateUserProgress = (updates: Partial<UserProgress>) => {
  //   setAppState(prev => ({
  //     ...prev,
  //     userProgress: { ...prev.userProgress, ...updates }
  //   }));
  // };

  const toggleFavorite = (wordId: string) => {
    setAppState(prev => ({
      ...prev,
      favoriteWords: prev.favoriteWords.includes(wordId)
        ? prev.favoriteWords.filter(id => id !== wordId)
        : [...prev.favoriteWords, wordId]
    }));
  };

  // Handle swipe gestures for navigation
  useEffect(() => {
    let startX = 0;
    let startY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!startX || !startY) return;

      const endX = e.changedTouches[0].clientX;
      const endY = e.changedTouches[0].clientY;
      
      const diffX = startX - endX;
      const diffY = startY - endY;

      // Only horizontal swipes with sufficient distance
      if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
        const tabs: NavigationTab[] = ['home', 'vocabulary', 'game', 'profile'];
        const currentIndex = tabs.indexOf(appState.currentTab);
        
        if (diffX > 0 && currentIndex < tabs.length - 1) {
          // Swipe left - next tab
          switchTab(tabs[currentIndex + 1]);
        } else if (diffX < 0 && currentIndex > 0) {
          // Swipe right - previous tab
          switchTab(tabs[currentIndex - 1]);
        }
      }

      startX = 0;
      startY = 0;
    };

    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [appState.currentTab]);

  const renderCurrentPage = () => {
    switch (appState.currentTab) {
      case 'home':
        return (
          <HomePage 
            userProgress={appState.userProgress}
            onStartGame={() => switchTab('game')}
            onStartLearning={() => switchTab('vocabulary')}
          />
        );
      case 'vocabulary':
        return (
          <VocabularyPage 
            favoriteWords={appState.favoriteWords}
            onToggleFavorite={toggleFavorite}
          />
        );
      case 'game':
        return (
          <GamePage 
            onGameComplete={(result) => {
              setAppState(prev => ({
                ...prev,
                gameHistory: [...prev.gameHistory, result]
              }));
            }}
          />
        );
      case 'profile':
        return (
          <ProfilePage 
            userProgress={appState.userProgress}
            achievements={appState.achievements}
            gameHistory={appState.gameHistory}
          />
        );
      default:
        return <HomePage userProgress={appState.userProgress} onStartGame={() => switchTab('game')} onStartLearning={() => switchTab('vocabulary')} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <TopNavigation 
        userProgress={appState.userProgress}
        currentTab={appState.currentTab}
      />
      
      <main className="flex-1 pb-20 pt-16 overflow-auto">
        {renderCurrentPage()}
      </main>
      
      <BottomNavigation 
        currentTab={appState.currentTab}
        onTabChange={switchTab}
      />
    </div>
  );
}

export default App;