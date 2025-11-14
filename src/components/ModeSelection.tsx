/**
 * 模式选择组件
 * 让玩家选择单人挑战或双人PK模式
 */

import { motion } from 'framer-motion';
import { GameMode } from '../types/game.types';

interface ModeSelectionProps {
  onSelectMode: (mode: GameMode) => void;
  onBack: () => void;
}

const modes = [
  {
    mode: 'single' as GameMode,
    title: '单人挑战',
    icon: '🎯',
    description: '独自挑战题库，追求高分',
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    mode: 'pvp' as GameMode,
    title: '双人PK',
    icon: '⚔️',
    description: '与AI对手实时对决',
    gradient: 'from-red-500 to-orange-500'
  }
];

export const ModeSelection: React.FC<ModeSelectionProps> = ({
  onSelectMode,
  onBack
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-pink-600 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="w-full max-w-4xl"
      >
        {/* 标题 */}
        <motion.h2
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-4xl md:text-5xl font-bold text-white text-center mb-12"
        >
          选择游戏模式
        </motion.h2>

        {/* 模式卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {modes.map((item, index) => (
            <motion.div
              key={item.mode}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ scale: 1.05, y: -10 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onSelectMode(item.mode)}
              className={`bg-gradient-to-br ${item.gradient} rounded-3xl p-8 cursor-pointer shadow-2xl hover:shadow-3xl transition-all`}
            >
              <div className="text-center text-white">
                {/* 图标 */}
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: 'reverse'
                  }}
                  className="text-7xl mb-4"
                >
                  {item.icon}
                </motion.div>

                {/* 标题 */}
                <h3 className="text-3xl font-bold mb-3">{item.title}</h3>

                {/* 描述 */}
                <p className="text-lg text-white/90">{item.description}</p>

                {/* 装饰元素 */}
                <div className="mt-6 flex justify-center gap-2">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="w-2 h-2 bg-white/50 rounded-full"
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 返回按钮 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center"
        >
          <button
            onClick={onBack}
            className="px-8 py-3 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white rounded-full transition-all transform hover:scale-105"
          >
            ← 返回
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};
