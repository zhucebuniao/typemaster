import React from 'react';

interface ProfileViewProps {
  onBack: () => void;
  currentTab: 'home' | 'scores' | 'profile';
  onTabChange: (tab: 'home' | 'scores' | 'profile') => void;
}

const ProfileView: React.FC<ProfileViewProps> = ({ onBack, currentTab, onTabChange }) => {
  return (
    <div className="flex flex-col h-screen justify-between bg-white dark:bg-gray-900">
      {/* Header */}
      <header className="flex items-center justify-between p-4 sm:p-6 safe-area-top">
        <button 
          className="w-12 h-12 mobile-touch-target flex items-center justify-center rounded-full bg-indigo-500/10 dark:bg-indigo-500/20 text-slate-800 dark:text-slate-200 hover:bg-indigo-500/20 dark:hover:bg-indigo-500/30 transition-colors touch-active"
          onClick={onBack}
        >
          <span className="material-symbols-outlined text-xl sm:text-2xl">
            arrow_back
          </span>
        </button>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">Profile</h1>
        <div className="w-12"></div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center px-4 sm:px-6 text-center">
        <div className="mb-6 sm:mb-8">
          <span className="material-symbols-outlined text-6xl sm:text-8xl text-indigo-500">
            person
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-2 px-4">Your Profile</h2>
        <p className="text-slate-600 dark:text-slate-400 max-w-sm mx-auto mb-8 sm:mb-10 px-4">
          Manage your typing progress and personal settings.
        </p>
        <div className="w-full max-w-xs space-y-3 sm:space-y-4 px-4">
          <div className="bg-slate-100 dark:bg-slate-800 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <span className="text-slate-700 dark:text-slate-300">Level</span>
              <span className="font-bold text-indigo-500">1</span>
            </div>
          </div>
          <div className="bg-slate-100 dark:bg-slate-800 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <span className="text-slate-700 dark:text-slate-300">Best WPM</span>
              <span className="font-bold text-indigo-500">--</span>
            </div>
          </div>
          <div className="bg-slate-100 dark:bg-slate-800 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <span className="text-slate-700 dark:text-slate-300">Games Played</span>
              <span className="font-bold text-indigo-500">0</span>
            </div>
          </div>
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
            <span className="material-symbols-outlined text-2xl sm:text-3xl">
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
            <span 
              className="material-symbols-outlined text-2xl sm:text-3xl" 
              style={{ fontVariationSettings: currentTab === 'profile' ? "'FILL' 1" : "'FILL' 0" }}
            >
              person
            </span>
            <span className="text-xs font-medium mobile-text-sm">Profile</span>
          </button>
        </nav>
      </footer>
    </div>
  );
};

export default ProfileView;