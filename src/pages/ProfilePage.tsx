import type { UserProgress, Achievement, GameResult } from '../types';

interface ProfilePageProps {
  userProgress: UserProgress;
  achievements: Achievement[];
  gameHistory: GameResult[];
}

export default function ProfilePage({ userProgress, achievements, gameHistory }: ProfilePageProps) {
  const unlockedAchievements = achievements.filter(a => a.unlockedAt);
  const progressAchievements = achievements.filter(a => !a.unlockedAt && a.progress !== undefined);

  const recentGames = gameHistory.slice(-5).reverse();
  
  const getAverageStats = () => {
    if (gameHistory.length === 0) return { avgWpm: 0, avgAccuracy: 0 };
    
    const totalWpm = gameHistory.reduce((sum, game) => sum + game.wpm, 0);
    const totalAccuracy = gameHistory.reduce((sum, game) => sum + game.accuracy, 0);
    
    return {
      avgWpm: Math.round(totalWpm / gameHistory.length),
      avgAccuracy: Math.round(totalAccuracy / gameHistory.length)
    };
  };

  const { avgWpm, avgAccuracy } = getAverageStats();

  const getLevelProgress = () => {
    const currentLevelExp = userProgress.experience % 1000;
    const progressPercentage = (currentLevelExp / 1000) * 100;
    const expToNext = 1000 - currentLevelExp;
    
    return { progressPercentage, expToNext };
  };

  const { progressPercentage, expToNext } = getLevelProgress();

  return (
    <div className="px-4 py-6 space-y-6">
      {/* Profile Header */}
      <section className="card text-center">
        <div className="mb-4">
          <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-3">
            <span className="text-2xl text-white">👨‍💻</span>
          </div>
          <h2 className="text-xl font-bold text-gray-800">学习者</h2>
          <p className="text-gray-600">等级 {userProgress.level} · {userProgress.experience} 经验值</p>
        </div>

        {/* Level Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>下一等级</span>
            <span>{expToNext} EXP</span>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </section>

      {/* Stats Overview */}
      <section className="card">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">📊</span>
          <h3 className="text-lg font-semibold text-gray-800">学习统计</h3>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl">
            <div className="text-2xl font-bold text-primary-600">{userProgress.totalWordsLearned}</div>
            <div className="text-sm text-primary-700">已学单词</div>
          </div>
          
          <div className="text-center p-4 bg-gradient-to-br from-accent-50 to-accent-100 rounded-xl">
            <div className="text-2xl font-bold text-accent-600">{userProgress.totalGamesPlayed}</div>
            <div className="text-sm text-accent-700">游戏次数</div>
          </div>
          
          <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
            <div className="text-2xl font-bold text-green-600">{avgWpm || userProgress.averageWpm}</div>
            <div className="text-sm text-green-700">平均WPM</div>
          </div>
          
          <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
            <div className="text-2xl font-bold text-blue-600">{avgAccuracy || userProgress.averageAccuracy}%</div>
            <div className="text-sm text-blue-700">平均准确率</div>
          </div>
        </div>

        {/* Streak */}
        <div className="mt-4 p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl">
          <div className="flex items-center justify-center gap-2">
            <span className="text-2xl">🔥</span>
            <div className="text-center">
              <div className="font-bold text-orange-700">连续学习 {userProgress.streak} 天</div>
              <div className="text-sm text-orange-600">继续保持！</div>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="card">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">🏆</span>
          <h3 className="text-lg font-semibold text-gray-800">成就徽章</h3>
        </div>

        {/* Unlocked Achievements */}
        {unlockedAchievements.length > 0 && (
          <div className="mb-4">
            <h4 className="font-medium text-gray-700 mb-2">已获得 ({unlockedAchievements.length})</h4>
            <div className="grid grid-cols-2 gap-3">
              {unlockedAchievements.map((achievement) => (
                <div key={achievement.id} className="p-3 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg border border-yellow-200">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg">{achievement.icon}</span>
                    <span className="font-medium text-yellow-800 text-sm">{achievement.title}</span>
                  </div>
                  <p className="text-xs text-yellow-700">{achievement.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Progress Achievements */}
        {progressAchievements.length > 0 && (
          <div>
            <h4 className="font-medium text-gray-700 mb-2">进行中 ({progressAchievements.length})</h4>
            <div className="space-y-3">
              {progressAchievements.map((achievement) => (
                <div key={achievement.id} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg grayscale">{achievement.icon}</span>
                    <div className="flex-1">
                      <div className="font-medium text-gray-800 text-sm">{achievement.title}</div>
                      <p className="text-xs text-gray-600">{achievement.description}</p>
                    </div>
                  </div>
                  {achievement.progress !== undefined && achievement.maxProgress && (
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>{achievement.progress} / {achievement.maxProgress}</span>
                        <span>{Math.round((achievement.progress / achievement.maxProgress) * 100)}%</span>
                      </div>
                      <div className="progress-bar h-1">
                        <div 
                          className="h-full bg-gradient-to-r from-gray-400 to-gray-500 transition-all duration-300"
                          style={{ width: `${(achievement.progress / achievement.maxProgress) * 100}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Recent Games */}
      {gameHistory.length > 0 && (
        <section className="card">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">📈</span>
            <h3 className="text-lg font-semibold text-gray-800">最近游戏</h3>
          </div>
          
          <div className="space-y-3">
            {recentGames.map((game, index) => (
              <div key={game.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-800">
                    游戏 #{gameHistory.length - index}
                  </div>
                  <div className="text-xs text-gray-500">
                    {new Date(game.timestamp).toLocaleDateString('zh-CN')}
                  </div>
                </div>
                
                <div className="flex gap-4 text-sm">
                  <div className="text-center">
                    <div className="font-medium text-primary-600">{game.wpm}</div>
                    <div className="text-xs text-gray-500">WPM</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="font-medium text-accent-600">{game.accuracy}%</div>
                    <div className="text-xs text-gray-500">准确率</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Settings */}
      <section className="card">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">⚙️</span>
          <h3 className="text-lg font-semibold text-gray-800">设置</h3>
        </div>
        
        <div className="space-y-3">
          <button className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
            <span className="text-gray-700">音效设置</span>
            <span className="text-gray-400">→</span>
          </button>
          
          <button className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
            <span className="text-gray-700">震动反馈</span>
            <span className="text-gray-400">→</span>
          </button>
          
          <button className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
            <span className="text-gray-700">数据导出</span>
            <span className="text-gray-400">→</span>
          </button>
          
          <button className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
            <span className="text-gray-700">关于应用</span>
            <span className="text-gray-400">→</span>
          </button>
        </div>
      </section>
    </div>
  );
}