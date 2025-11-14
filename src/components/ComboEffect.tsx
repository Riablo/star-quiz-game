/**
 * 连击特效组件
 * 根据连击数显示不同的视觉效果
 */

import { motion, AnimatePresence } from 'framer-motion';

interface ComboEffectProps {
  combo: number;
  score?: number;
}

export const ComboEffect: React.FC<ComboEffectProps> = ({ combo, score }) => {
  if (combo < 2) return null;

  // 根据连击数确定效果级别
  let level: 'low' | 'medium' | 'high' = 'low';
  let bgColor = 'from-blue-500 to-cyan-500';
  let icon = '✨';
  let title = '双连击';

  if (combo >= 5) {
    level = 'high';
    bgColor = 'from-yellow-400 to-orange-500';
    icon = '🔥';
    title = '无敌连击';
  } else if (combo >= 3) {
    level = 'medium';
    bgColor = 'from-orange-400 to-red-500';
    icon = '💥';
    title = '超级连击';
  }

  return (
    <AnimatePresence>
      <motion.div
        key={combo}
        initial={{ opacity: 0, scale: 0.5, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.5, y: -50 }}
        className="fixed inset-0 pointer-events-none flex items-center justify-center z-50"
      >
        {/* 背景光晕 */}
        {level === 'high' && (
          <>
            <motion.div
              animate={{
                scale: [1, 2, 1],
                opacity: [0.3, 0.1, 0.3]
              }}
              transition={{
                duration: 2,
                repeat: Infinity
              }}
              className="absolute inset-0 bg-gradient-radial from-yellow-400/20 to-transparent"
            />

            {/* 烟花粒子 */}
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ x: 0, y: 0, opacity: 1 }}
                animate={{
                  x: Math.cos((i * 30 * Math.PI) / 180) * 200,
                  y: Math.sin((i * 30 * Math.PI) / 180) * 200,
                  opacity: 0
                }}
                transition={{ duration: 1 }}
                className="absolute w-4 h-4 bg-yellow-400 rounded-full"
              />
            ))}
          </>
        )}

        {/* 主要特效卡片 */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{
            duration: 0.5,
            repeat: level === 'high' ? Infinity : 0
          }}
          className={`bg-gradient-to-br ${bgColor} rounded-3xl p-8 shadow-2xl text-center`}
        >
          {/* 图标 */}
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              rotate: [0, 360]
            }}
            transition={{
              duration: 0.6,
              repeat: level === 'high' ? Infinity : 0
            }}
            className="text-8xl mb-4"
          >
            {icon}
          </motion.div>

          {/* 标题 */}
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold text-white mb-2"
          >
            {title}
          </motion.h3>

          {/* 连击数 */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="text-7xl font-bold text-white/90"
          >
            ×{combo}
          </motion.div>

          {/* 得分（如果提供） */}
          {score !== undefined && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-3xl font-bold text-white/80 mt-4"
            >
              +{score}
            </motion.div>
          )}
        </motion.div>

        {/* 边缘光晕效果 */}
        {level === 'medium' && (
          <motion.div
            animate={{
              scale: [1, 1.5],
              opacity: [0.5, 0]
            }}
            transition={{
              duration: 1,
              repeat: Infinity
            }}
            className="absolute inset-0 border-8 border-orange-400 rounded-full"
          />
        )}

        {level === 'low' && (
          <motion.div
            animate={{
              scale: [1, 1.3],
              opacity: [0.3, 0]
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity
            }}
            className="absolute inset-0 border-4 border-blue-400"
          />
        )}
      </motion.div>
    </AnimatePresence>
  );
};

/**
 * 得分飘字效果组件
 * 显示答对时的得分飘字动画
 */
interface ScoreFloatProps {
  score: number;
  x: number;
  y: number;
  onComplete: () => void;
}

export const ScoreFloat: React.FC<ScoreFloatProps> = ({
  score,
  x,
  y,
  onComplete
}) => {
  return (
    <motion.div
      initial={{ x, y, opacity: 1, scale: 1 }}
      animate={{
        x: window.innerWidth / 2,
        y: 100,
        opacity: 0,
        scale: 0.5
      }}
      transition={{
        duration: 1.5,
        ease: 'easeOut'
      }}
      onAnimationComplete={onComplete}
      className="fixed pointer-events-none z-50 text-4xl font-bold text-yellow-300"
      style={{
        textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
      }}
    >
      +{score}
    </motion.div>
  );
};
