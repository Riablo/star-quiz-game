/**
 * 道具面板组件
 * 显示可用道具并处理道具使用
 */

import { motion } from 'framer-motion';
import { PowerUpType } from '../types/game.types';

interface PowerUpPanelProps {
  powerUps: Record<PowerUpType, number>;
  onUsePowerUp: (type: PowerUpType) => void;
  disabled?: boolean;
}

const powerUpConfig = {
  hint: {
    icon: '💡',
    name: '提示',
    description: '排除两个错误选项',
    color: 'from-yellow-400 to-orange-500'
  },
  skip: {
    icon: '⏭️',
    name: '跳过',
    description: '跳过当前题目',
    color: 'from-blue-400 to-cyan-500'
  },
  extraTime: {
    icon: '⏰',
    name: '加时',
    description: '增加5秒答题时间',
    color: 'from-green-400 to-emerald-500'
  }
};

export const PowerUpPanel: React.FC<PowerUpPanelProps> = ({
  powerUps,
  onUsePowerUp,
  disabled = false
}) => {
  return (
    <div className="flex gap-3 justify-center mb-4">
      {(Object.entries(powerUpConfig) as [PowerUpType, typeof powerUpConfig[PowerUpType]][]).map(
        ([type, config]) => {
          const count = powerUps[type];
          const isAvailable = count > 0 && !disabled;

          return (
            <motion.button
              key={type}
              whileHover={isAvailable ? { scale: 1.1 } : {}}
              whileTap={isAvailable ? { scale: 0.9 } : {}}
              onClick={() => isAvailable && onUsePowerUp(type)}
              disabled={!isAvailable}
              className={`relative w-20 h-20 rounded-xl shadow-lg transition-all ${
                isAvailable
                  ? `bg-gradient-to-br ${config.color} hover:shadow-xl cursor-pointer`
                  : 'bg-gray-400/50 cursor-not-allowed opacity-50'
              }`}
              title={`${config.name}: ${config.description}`}
            >
              {/* 图标 */}
              <div className="text-3xl">{config.icon}</div>

              {/* 剩余次数徽章 */}
              {count > 0 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-md"
                >
                  {count}
                </motion.div>
              )}

              {/* 名称 */}
              <div className="text-xs text-white font-semibold mt-1">
                {config.name}
              </div>
            </motion.button>
          );
        }
      )}
    </div>
  );
};
