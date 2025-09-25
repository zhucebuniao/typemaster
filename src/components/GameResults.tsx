import type { GameResult, GameChallenge } from '../types';

interface GameResultsProps {
  result: GameResult;
  challenge: GameChallenge;
  onPlayAgain: () => void;
  onSelectNewChallenge: () => void;
}

export default function GameResults({ result, challenge, onPlayAgain, onSelectNewChallenge }: GameResultsProps) {
  const getPerformanceLevel = () => {
    if (result.wpm >= challenge.targetWpm && result.accuracy >= 95) {
      return { level: 'excellent', icon: '🏆', color: 'text-yellow-600', bg: 'bg-yellow-50' };
    } else if (result.wpm >= challenge.targetWpm * 0.8 && result.accuracy >= 85) {
      return { level: 'good', icon: '🎯', color: 'text-green-600', bg: 'bg-green-50' };
    } else if (result.wpm >= challenge.targetWpm * 0.6 && result.accuracy >= 70) {
      return { level: 'fair', icon: '📈', color: 'text-blue-600', bg: 'bg-blue-50' };
    } else {
      return { level: 'needs_improvement', icon: '💪', color: 'text-orange-600', bg: 'bg-orange-50' };
    }
  };

  const performance = getPerformanceLevel();

  const getPerformanceMessage = () => {
    switch (performance.level) {
      case 'excellent':
        return '太棒了！你超越了目标，表现卓越！';
      case 'good':
        return '很好！你的表现接近目标，继续加油！';
      case 'fair':
        return '不错的开始！多练习一定会更好！';
      case 'needs_improvement':
      default:
        return '不要灰心！每次练习都是进步的机会！';
    }
  };

  const shareResult = () => {
    if (navigator.share) {
      navigator.share({
        title: 'TypeMaster 打字游戏成绩',
        text: `我在 ${challenge.title} 中取得了 ${result.wpm}WPM 的成绩，准确率 ${result.accuracy}%！`,
        url: window.location.href
      });
    } else {
      // Fallback to clipboard
      const text = `我在 TypeMaster 的 ${challenge.title} 中取得了 ${result.wpm}WPM 的成绩，准确率 ${result.accuracy}%！`;
      navigator.clipboard.writeText(text).then(() => {
        alert('成绩已复制到剪贴板！');
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <section className="text-center">
        <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-2xl ${performance.bg} mb-4`}>
          <span className="text-3xl">{performance.icon}</span>
          <div>
            <h2 className={`text-xl font-bold ${performance.color}`}>游戏完成！</h2>
            <p className={`text-sm ${performance.color}`}>{getPerformanceMessage()}</p>
          </div>
        </div>
      </section>

      {/* Results Stats */}
      <section className="card">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">游戏成绩</h3>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="text-center p-4 bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl">
            <div className="text-3xl font-bold text-primary-600">{result.wpm}</div>
            <div className="text-sm text-primary-700">WPM</div>
            <div className="text-xs text-gray-500 mt-1">
              目标: {challenge.targetWpm}
            </div>
          </div>
          
          <div className="text-center p-4 bg-gradient-to-br from-accent-50 to-accent-100 rounded-xl">
            <div className="text-3xl font-bold text-accent-600">{result.accuracy}%</div>
            <div className="text-sm text-accent-700">准确率</div>
            <div className="text-xs text-gray-500 mt-1">
              错误: {result.mistakes}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-xl font-bold text-gray-800">{Math.round(result.timeSpent)}</div>
            <div className="text-sm text-gray-500">用时(秒)</div>
          </div>
          
          <div className="text-center">
            <div className="text-xl font-bold text-gray-800">{challenge.words.length}</div>
            <div className="text-sm text-gray-500">总单词数</div>
          </div>
        </div>
      </section>

      {/* Performance Analysis */}
      <section className="card">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">表现分析</h3>
        
        <div className="space-y-4">
          {/* WPM Progress */}
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>打字速度</span>
              <span>{result.wpm} / {challenge.targetWpm} WPM</span>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{ width: `${Math.min((result.wpm / challenge.targetWpm) * 100, 100)}%` }}
              />
            </div>
          </div>

          {/* Accuracy Progress */}
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>准确率</span>
              <span>{result.accuracy}%</span>
            </div>
            <div className="progress-bar">
              <div 
                className="h-full bg-gradient-to-r from-accent-500 to-accent-600 transition-all duration-300"
                style={{ width: `${result.accuracy}%` }}
              />
            </div>
          </div>
        </div>

        {/* Improvement Tips */}
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <h4 className="font-medium text-blue-800 mb-2">💡 提升建议</h4>
          <div className="text-sm text-blue-700 space-y-1">
            {result.accuracy < 85 && (
              <p>• 放慢速度，专注于准确性，准确性比速度更重要</p>
            )}
            {result.wpm < challenge.targetWpm && (
              <p>• 多练习常用单词，提高肌肉记忆</p>
            )}
            {result.mistakes > 5 && (
              <p>• 在输入前先看清楚单词的每个字母</p>
            )}
            <p>• 保持良好的坐姿和手指位置</p>
          </div>
        </div>
      </section>

      {/* Actions */}
      <section className="space-y-3">
        <button
          onClick={onPlayAgain}
          className="w-full py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all active:scale-95 transform btn-touch"
        >
          🔄 再玩一次
        </button>
        
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={onSelectNewChallenge}
            className="py-3 bg-white border-2 border-gray-200 text-gray-700 font-medium rounded-xl hover:border-gray-300 hover:bg-gray-50 transition-all btn-touch"
          >
            🎯 选择新挑战
          </button>
          
          <button
            onClick={shareResult}
            className="py-3 bg-gradient-to-r from-accent-500 to-accent-600 text-white font-medium rounded-xl hover:from-accent-600 hover:to-accent-700 transition-all btn-touch"
          >
            🔗 分享成绩
          </button>
        </div>
      </section>
    </div>
  );
}