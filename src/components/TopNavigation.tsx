import type { NavigationTab, UserProgress } from '../types';

interface TopNavigationProps {
  userProgress: UserProgress;
  currentTab: NavigationTab;
}

export default function TopNavigation({ userProgress, currentTab }: TopNavigationProps) {
  const getTitle = () => {
    switch (currentTab) {
      case 'home':
        return 'TypeMaster';
      case 'vocabulary':
        return '词库学习';
      case 'game':
        return '打字游戏';
      case 'profile':
        return '个人中心';
      default:
        return 'TypeMaster';
    }
  };

  const progressPercentage = (userProgress.experience % 1000) / 10; // Assuming 1000 exp per level

  return (
    <header className="fixed top-0 left-0 right-0 z-10 bg-white border-b border-gray-200 px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">TM</span>
          </div>
          <h1 className="text-lg font-semibold text-gray-900">{getTitle()}</h1>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Level and Progress */}
          <div className="text-right">
            <div className="text-xs text-gray-500">等级 {userProgress.level}</div>
            <div className="w-16 h-1 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-primary-500 to-primary-600 transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
          
          {/* Streak indicator */}
          <div className="flex items-center gap-1 bg-accent-50 px-2 py-1 rounded-full">
            <span className="text-accent-600">🔥</span>
            <span className="text-xs font-medium text-accent-700">{userProgress.streak}</span>
          </div>
        </div>
      </div>
    </header>
  );
}