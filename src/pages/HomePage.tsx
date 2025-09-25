import type { UserProgress } from '../types';

interface HomePageProps {
  userProgress: UserProgress;
  onStartGame: () => void;
  onStartLearning: () => void;
}

export default function HomePage({ userProgress, onStartGame, onStartLearning }: HomePageProps) {
  const today = new Date();
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('zh-CN', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      weekday: 'long'
    });
  };

  const dailyGoal = {
    target: 20,
    completed: Math.floor(userProgress.totalWordsLearned * 0.3) // Mock daily progress
  };

  const dailyProgress = Math.min((dailyGoal.completed / dailyGoal.target) * 100, 100);

  return (
    <div className="px-4 py-6 space-y-6">
      {/* Welcome Section */}
      <section className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-gray-800">欢迎回来！</h2>
        <p className="text-gray-600">{formatDate(today)}</p>
      </section>

      {/* Daily Goal */}
      <section className="card">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-800">今日目标</h3>
          <span className="text-2xl">🎯</span>
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">学习单词</span>
            <span className="font-medium text-gray-800">
              {dailyGoal.completed}/{dailyGoal.target}
            </span>
          </div>
          
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ width: `${dailyProgress}%` }}
            />
          </div>
          
          <p className="text-sm text-gray-500">
            {dailyGoal.completed >= dailyGoal.target 
              ? '🎉 今日目标已完成！' 
              : `还需学习 ${dailyGoal.target - dailyGoal.completed} 个单词`
            }
          </p>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800 px-2">快速开始</h3>
        
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={onStartLearning}
            className="card hover:shadow-md transition-shadow active:scale-95 transform transition-transform"
          >
            <div className="text-center space-y-3">
              <div className="text-3xl">📚</div>
              <div>
                <div className="font-semibold text-gray-800">词库学习</div>
                <div className="text-sm text-gray-500">学习新单词</div>
              </div>
            </div>
          </button>
          
          <button
            onClick={onStartGame}
            className="card hover:shadow-md transition-shadow active:scale-95 transform transition-transform"
          >
            <div className="text-center space-y-3">
              <div className="text-3xl">🎮</div>
              <div>
                <div className="font-semibold text-gray-800">打字游戏</div>
                <div className="text-sm text-gray-500">提升打字速度</div>
              </div>
            </div>
          </button>
        </div>
      </section>

      {/* Progress Overview */}
      <section className="card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">学习概览</h3>
          <span className="text-2xl">📊</span>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center space-y-1">
            <div className="text-2xl font-bold text-primary-600">
              {userProgress.totalWordsLearned}
            </div>
            <div className="text-sm text-gray-500">已学单词</div>
          </div>
          
          <div className="text-center space-y-1">
            <div className="text-2xl font-bold text-accent-600">
              {userProgress.averageWpm}
            </div>
            <div className="text-sm text-gray-500">平均WPM</div>
          </div>
          
          <div className="text-center space-y-1">
            <div className="text-2xl font-bold text-primary-600">
              {userProgress.averageAccuracy}%
            </div>
            <div className="text-sm text-gray-500">准确率</div>
          </div>
          
          <div className="text-center space-y-1">
            <div className="text-2xl font-bold text-accent-600">
              {userProgress.totalGamesPlayed}
            </div>
            <div className="text-sm text-gray-500">游戏次数</div>
          </div>
        </div>
      </section>

      {/* Achievement Preview */}
      <section className="card">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-800">最新成就</h3>
          <span className="text-2xl">🏆</span>
        </div>
        
        <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-primary-50 to-primary-100 rounded-lg">
          <span className="text-2xl">🌟</span>
          <div className="flex-1">
            <div className="font-medium text-primary-800">初学者</div>
            <div className="text-sm text-primary-600">完成第一个单词练习</div>
          </div>
        </div>
      </section>
    </div>
  );
}