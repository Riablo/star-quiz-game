/**
 * 排行榜组件
 * 显示历史最高分记录
 */

import { motion } from 'framer-motion';
import { getLeaderboard } from '../utils/storage';
import { formatScore } from '../utils/scoreCalculator';

interface LeaderboardProps {
  category?: string;
  limit?: number;
}

export const Leaderboard: React.FC<LeaderboardProps> = ({
  category,
  limit = 10
}) => {
  const entries = getLeaderboard(category, limit);

  if (entries.length === 0) {
    return (
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center text-white/70">
        暂无排行榜记录
      </div>
    );
  }

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6">
      <h3 className="text-2xl font-bold text-white mb-6 text-center">
        🏆 排行榜
      </h3>

      <div className="space-y-3">
        {entries.map((entry, index) => (
          <motion.div
            key={entry.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`flex items-center gap-4 p-4 rounded-xl transition-all ${
              index < 3
                ? 'bg-gradient-to-r from-yellow-400/20 to-orange-400/20'
                : 'bg-white/5 hover:bg-white/10'
            }`}
          >
            {/* 排名 */}
            <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center">
              {index === 0 && <span className="text-4xl">🥇</span>}
              {index === 1 && <span className="text-4xl">🥈</span>}
              {index === 2 && <span className="text-4xl">🥉</span>}
              {index > 2 && (
                <span className="text-2xl font-bold text-white/60">
                  {index + 1}
                </span>
              )}
            </div>

            {/* 昵称 */}
            <div className="flex-1 min-w-0">
              <div className="text-white font-semibold truncate">
                {entry.nickname}
              </div>
              <div className="text-white/60 text-sm">
                连击 {entry.maxCombo} • {new Date(entry.timestamp).toLocaleDateString()}
              </div>
            </div>

            {/* 分数 */}
            <div className="flex-shrink-0 text-right">
              <div className="text-2xl font-bold text-yellow-300">
                {formatScore(entry.score)}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
