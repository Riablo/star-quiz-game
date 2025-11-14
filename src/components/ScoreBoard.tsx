/**
 * 计分板组件
 * 显示玩家分数、连击数等信息
 */

import { motion, AnimatePresence } from 'framer-motion';
import { Player } from '../types/game.types';
import { formatScore } from '../utils/scoreCalculator';

interface ScoreBoardProps {
  player: Player;
  opponent?: Player | null;
  layout?: 'single' | 'split'; // 单人或分屏布局
}

export const ScoreBoard: React.FC<ScoreBoardProps> = ({
  player,
  opponent,
  layout = 'single'
}) => {
  if (layout === 'split' && opponent) {
    // 双人分屏布局
    return (
      <div className="flex gap-4 mb-4">
        {/* 玩家计分板 */}
        <PlayerScoreCard player={player} isPlayer={true} />

        {/* VS */}
        <div className="flex items-center justify-center px-2">
          <span className="text-2xl font-bold text-white/50">VS</span>
        </div>

        {/* 对手计分板 */}
        <PlayerScoreCard player={opponent} isPlayer={false} />
      </div>
    );
  }

  // 单人布局
  return <PlayerScoreCard player={player} isPlayer={true} />;
};

interface PlayerScoreCardProps {
  player: Player;
  isPlayer: boolean;
}

const PlayerScoreCard: React.FC<PlayerScoreCardProps> = ({
  player,
  isPlayer
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex-1 bg-white/10 backdrop-blur-md rounded-2xl p-4"
    >
      <div className="flex items-center justify-between mb-3">
        {/* 昵称 */}
        <div className="flex items-center gap-2">
          <span className="text-2xl">{isPlayer ? '👤' : '🤖'}</span>
          <span className="text-white font-semibold truncate max-w-[120px]">
            {player.nickname}
          </span>
        </div>

        {/* 连击数 */}
        <AnimatePresence>
          {player.combo > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className={`px-3 py-1 rounded-full font-bold ${
                player.combo >= 5
                  ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white'
                  : player.combo >= 3
                  ? 'bg-gradient-to-r from-orange-400 to-red-500 text-white'
                  : 'bg-blue-500 text-white'
              }`}
            >
              🔥 {player.combo}连击
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 分数 */}
      <motion.div
        key={player.score}
        initial={{ scale: 1.2 }}
        animate={{ scale: 1 }}
        className="text-4xl font-bold text-yellow-300"
      >
        {formatScore(player.score)}
      </motion.div>

      {/* 统计信息 */}
      <div className="flex gap-4 mt-2 text-white/70 text-sm">
        <span>✓ {player.answeredCorrect}</span>
        <span>✗ {player.answeredIncorrect}</span>
        <span>🏆 {player.maxCombo}</span>
      </div>
    </motion.div>
  );
};
