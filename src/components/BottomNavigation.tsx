import type { NavigationTab } from '../types';

interface BottomNavigationProps {
  currentTab: NavigationTab;
  onTabChange: (tab: NavigationTab) => void;
}

export default function BottomNavigation({ currentTab, onTabChange }: BottomNavigationProps) {
  const tabs = [
    {
      id: 'home' as NavigationTab,
      label: '首页',
      icon: '🏠',
      activeIcon: '🏠'
    },
    {
      id: 'vocabulary' as NavigationTab,
      label: '学习',
      icon: '📚',
      activeIcon: '📖'
    },
    {
      id: 'game' as NavigationTab,
      label: '游戏',
      icon: '🎮',
      activeIcon: '🎯'
    },
    {
      id: 'profile' as NavigationTab,
      label: '个人',
      icon: '👤',
      activeIcon: '👨‍💻'
    }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-2 safe-area-inset-bottom">
      <div className="flex justify-around">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`nav-item ${currentTab === tab.id ? 'active' : ''}`}
            aria-label={tab.label}
          >
            <span className="text-xl">
              {currentTab === tab.id ? tab.activeIcon : tab.icon}
            </span>
            <span className="text-xs font-medium">{tab.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}