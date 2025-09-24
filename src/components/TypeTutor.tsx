import React from 'react';

interface TypeTutorProps {
  onStartGame: () => void;
  onHighScores: () => void;
  onSettings: () => void;
  currentTab: 'home' | 'scores' | 'profile';
  onTabChange: (tab: 'home' | 'scores' | 'profile') => void;
}

const TypeTutor: React.FC<TypeTutorProps> = ({
  onStartGame,
  onHighScores,
  onSettings,
  currentTab,
  onTabChange,
}) => {
  return (
    <div className="flex flex-col h-screen justify-between bg-white dark:bg-gray-900">
      {/* Header */}
      <header className="flex items-center justify-between p-4 sm:p-6 safe-area-top">
        <div className="w-12"></div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">TypeTutor</h1>
        <button 
          className="w-12 h-12 mobile-touch-target flex items-center justify-center rounded-full bg-indigo-500/10 dark:bg-indigo-500/20 text-slate-800 dark:text-slate-200 hover:bg-indigo-500/20 dark:hover:bg-indigo-500/30 transition-colors touch-active"
          onClick={onSettings}
        >
          <span className="material-symbols-outlined text-xl sm:text-2xl">
            settings
          </span>
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center px-4 sm:px-6 text-center">
        <div className="mb-6 sm:mb-8">
          <span className="material-symbols-outlined text-6xl sm:text-8xl text-indigo-500">
            keyboard
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-2 px-4">Welcome to TypeTutor</h2>
        <p className="text-slate-600 dark:text-slate-400 max-w-sm mx-auto mb-8 sm:mb-10 px-4">
          Improve your English typing skills with fun and engaging games.
        </p>
        <div className="w-full max-w-xs space-y-3 sm:space-y-4 px-4">
          <button 
            className="w-full bg-indigo-500 text-white font-bold mobile-button py-4 px-6 rounded-xl shadow-lg shadow-indigo-500/20 hover:bg-indigo-600 transition-all duration-300 touch-active"
            onClick={onStartGame}
          >
            Start New Game
          </button>
          <button 
            className="w-full bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-500 font-bold mobile-button py-4 px-6 rounded-xl hover:bg-indigo-500/20 dark:hover:bg-indigo-500/30 transition-all duration-300 touch-active"
            onClick={onHighScores}
          >
            High Scores
          </button>
        </div>
      </main>

      {/* Footer Navigation */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-gray-900 safe-area-bottom">
        <nav className="flex justify-around p-2 sm:p-3">
          <button
            className={`flex flex-col items-center justify-center gap-1 mobile-nav-button p-2 rounded-lg transition-colors touch-active ${
              currentTab === 'home'
                ? 'text-indigo-500'
                : 'text-slate-500 dark:text-slate-400 hover:text-indigo-500 dark:hover:text-indigo-500'
            }`}
            onClick={() => onTabChange('home')}
          >
            <span 
              className="material-symbols-outlined text-2xl sm:text-3xl" 
              style={{ fontVariationSettings: currentTab === 'home' ? "'FILL' 1" : "'FILL' 0" }}
            >
              home
            </span>
            <span className="text-xs font-medium mobile-text-sm">Home</span>
          </button>
          
          <button
            className={`flex flex-col items-center justify-center gap-1 mobile-nav-button p-2 rounded-lg transition-colors touch-active ${
              currentTab === 'scores'
                ? 'text-indigo-500'
                : 'text-slate-500 dark:text-slate-400 hover:text-indigo-500 dark:hover:text-indigo-500'
            }`}
            onClick={() => onTabChange('scores')}
          >
            <span className="material-symbols-outlined text-2xl sm:text-3xl">
              leaderboard
            </span>
            <span className="text-xs font-medium mobile-text-sm">Scores</span>
          </button>
          
          <button
            className={`flex flex-col items-center justify-center gap-1 mobile-nav-button p-2 rounded-lg transition-colors touch-active ${
              currentTab === 'profile'
                ? 'text-indigo-500'
                : 'text-slate-500 dark:text-slate-400 hover:text-indigo-500 dark:hover:text-indigo-500'
            }`}
            onClick={() => onTabChange('profile')}
          >
            <span className="material-symbols-outlined text-2xl sm:text-3xl">
              person
            </span>
            <span className="text-xs font-medium mobile-text-sm">Profile</span>
          </button>
        </nav>
      </footer>
    </div>
  );
};

export default TypeTutor;