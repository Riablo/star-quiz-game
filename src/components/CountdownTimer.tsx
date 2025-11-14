/**
 * 倒计时组件
 * 显示圆形进度条倒计时，根据时间变化颜色
 */

import { motion } from 'framer-motion';

interface CountdownTimerProps {
  timeLeft: number;
  totalTime: number;
  status: 'normal' | 'warning' | 'critical';
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({
  timeLeft,
  totalTime,
  status
}) => {
  const progress = (timeLeft / totalTime) * 100;
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  // 根据状态确定颜色
  const colorConfig = {
    normal: {
      stroke: '#10b981', // green
      glow: 'drop-shadow(0 0 10px rgba(16, 185, 129, 0.5))'
    },
    warning: {
      stroke: '#f59e0b', // yellow
      glow: 'drop-shadow(0 0 10px rgba(245, 158, 11, 0.5))'
    },
    critical: {
      stroke: '#ef4444', // red
      glow: 'drop-shadow(0 0 20px rgba(239, 68, 68, 0.8))'
    }
  };

  const config = colorConfig[status];

  return (
    <motion.div
      animate={
        status === 'critical'
          ? {
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }
          : {}
      }
      transition={
        status === 'critical'
          ? {
              duration: 0.5,
              repeat: Infinity
            }
          : {}
      }
      className="relative w-32 h-32"
    >
      {/* SVG圆形进度条 */}
      <svg
        className="transform -rotate-90"
        width="128"
        height="128"
        style={{ filter: config.glow }}
      >
        {/* 背景圆 */}
        <circle
          cx="64"
          cy="64"
          r={radius}
          stroke="rgba(255, 255, 255, 0.2)"
          strokeWidth="8"
          fill="none"
        />

        {/* 进度圆 */}
        <motion.circle
          cx="64"
          cy="64"
          r={radius}
          stroke={config.stroke}
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 0.1 }}
        />
      </svg>

      {/* 时间文字 */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.div
          key={Math.ceil(timeLeft)}
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className={`text-4xl font-bold ${
            status === 'critical'
              ? 'text-red-400'
              : status === 'warning'
              ? 'text-yellow-400'
              : 'text-green-400'
          }`}
        >
          {Math.ceil(timeLeft)}
        </motion.div>
        <div className="text-white/60 text-xs mt-1">秒</div>
      </div>

      {/* 脉冲效果（危险状态） */}
      {status === 'critical' && (
        <motion.div
          animate={{
            scale: [1, 1.5],
            opacity: [0.5, 0]
          }}
          transition={{
            duration: 1,
            repeat: Infinity
          }}
          className="absolute inset-0 rounded-full border-4 border-red-400"
        />
      )}
    </motion.div>
  );
};
