/**
 * 结算页组件
 * 显示游戏结果、得分、连击记录等信息
 */

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Player, GameMode, AnsweredQuestion } from '../types/game.types';
import {
  calculateStarRating,
  getRatingText,
  formatScore
} from '../utils/scoreCalculator';
import {
  updateHighScore,
  addLeaderboardEntry,
  incrementGamesPlayed,
  incrementCorrectAnswers
} from '../utils/storage';

interface ResultScreenProps {
  player: Player;
  opponent: Player | null;
  mode: GameMode;
  category: string;
  answeredQuestions: AnsweredQuestion[];
  onPlayAgain: () => void;
  onBackToHome: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({
  player,
  opponent,
  mode,
  category,
  answeredQuestions,
  onPlayAgain,
  onBackToHome
}) => {
  const totalQuestions = answeredQuestions.length;
  const correctRate = totalQuestions > 0 ? player.answeredCorrect / totalQuestions : 0;
  const stars = calculateStarRating(correctRate, player.maxCombo);
  const ratingText = getRatingText(stars);

  useEffect(() => {
    // 保存游戏结果
    const isNewHighScore = updateHighScore(category, player.score);

    // 添加到排行榜
    addLeaderboardEntry({
      id: Date.now().toString(),
      nickname: player.nickname,
      score: player.score,
      maxCombo: player.maxCombo,
      category,
      mode,
      timestamp: Date.now()
    });

    // 更新统计
    incrementGamesPlayed();
    incrementCorrectAnswers(player.answeredCorrect);

    // 显示新纪录提示
    if (isNewHighScore) {
      console.log('🎉 恭喜！创造新纪录！');
    }
  }, [player, category, mode]);

  // 判断胜负（PVP模式）
  const isWinner = opponent ? player.score > opponent.score : true;
  const isDraw = opponent ? player.score === opponent.score : false;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-pink-600 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-2xl"
      >
        {/* 结果标题 */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-8"
        >
          {mode === 'pvp' ? (
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">
              {isDraw ? '🤝 平局！' : isWinner ? '🎉 胜利！' : '💪 加油！'}
            </h2>
          ) : (
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">
              游戏结束！
            </h2>
          )}
          <p className="text-xl text-white/90">{ratingText}</p>
        </motion.div>

        {/* 星级评价 */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4, type: 'spring' }}
          className="text-center mb-8"
        >
          <div className="text-6xl">
            {'⭐'.repeat(stars)}
            {'☆'.repeat(5 - stars)}
          </div>
        </motion.div>

        {/* 分数卡片 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white/20 backdrop-blur-md rounded-3xl p-8 mb-6"
        >
          {/* 玩家分数 */}
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-white mb-2">
              {player.nickname}
            </h3>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.7, type: 'spring' }}
              className="text-6xl font-bold text-yellow-300 mb-4"
            >
              {formatScore(player.score)}
            </motion.div>
          </div>

          {/* 对手分数（PVP模式） */}
          {opponent && (
            <div className="border-t border-white/20 pt-6 text-center">
              <h3 className="text-xl font-bold text-white/80 mb-2">
                {opponent.nickname}
              </h3>
              <div className="text-4xl font-bold text-white/60">
                {formatScore(opponent.score)}
              </div>
            </div>
          )}

          {/* 统计信息 */}
          <div className="mt-6 pt-6 border-t border-white/20 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-3xl font-bold text-white">
                {player.answeredCorrect}
              </div>
              <div className="text-sm text-white/70">答对</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">
                {player.answeredIncorrect}
              </div>
              <div className="text-sm text-white/70">答错</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">
                {Math.round(correctRate * 100)}%
              </div>
              <div className="text-sm text-white/70">正确率</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-yellow-300">
                {player.maxCombo}
              </div>
              <div className="text-sm text-white/70">最高连击</div>
            </div>
          </div>
        </motion.div>

        {/* 按钮组 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="flex gap-4 justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onPlayAgain}
            className="px-8 py-4 bg-gradient-to-r from-green-400 to-emerald-500 text-white text-lg font-bold rounded-full shadow-lg hover:shadow-xl transition-all"
          >
            再来一局 🔄
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onBackToHome}
            className="px-8 py-4 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white text-lg font-bold rounded-full transition-all"
          >
            返回首页 🏠
          </motion.button>
        </motion.div>

        {/* 装饰元素 */}
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 360]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: 'reverse'
          }}
          className="text-center mt-8 text-5xl"
        >
          {isWinner ? '🏆' : '💎'}
        </motion.div>
      </motion.div>
    </div>
  );
};
