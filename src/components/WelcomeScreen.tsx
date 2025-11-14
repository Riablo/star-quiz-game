/**
 * 欢迎页组件
 * 显示游戏标题、昵称输入，并提供开始按钮
 */

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { generateRandomNickname } from '../utils/nameGenerator';
import { getNickname, saveNickname } from '../utils/storage';

interface WelcomeScreenProps {
  onStart: (nickname: string) => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  const [nickname, setNickname] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // 从本地存储加载昵称，或生成随机昵称
    const savedNickname = getNickname();
    setNickname(savedNickname || generateRandomNickname());
  }, []);

  const handleStart = () => {
    if (nickname.trim()) {
      saveNickname(nickname.trim());
      onStart(nickname.trim());
    }
  };

  const handleRandomNickname = () => {
    setNickname(generateRandomNickname());
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-pink-600 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        {/* 游戏标题 */}
        <motion.div
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
          className="mb-12"
        >
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-4 drop-shadow-2xl">
            🌟 明星我最懂
          </h1>
          <p className="text-xl md:text-2xl text-white/90">
            测试你对明星的了解程度！
          </p>
        </motion.div>

        {/* 昵称输入区域 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <div className="bg-white/20 backdrop-blur-md rounded-2xl p-8 max-w-md mx-auto">
            <label className="block text-white text-lg mb-4 font-semibold">
              你的昵称
            </label>

            <div className="flex gap-2 mb-4">
              {isEditing ? (
                <input
                  type="text"
                  value={nickname}
                  onChange={e => setNickname(e.target.value)}
                  onBlur={() => setIsEditing(false)}
                  onKeyDown={e => e.key === 'Enter' && handleStart()}
                  autoFocus
                  maxLength={20}
                  className="flex-1 px-4 py-3 text-lg rounded-xl bg-white/90 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-white/50"
                  placeholder="输入你的昵称"
                />
              ) : (
                <div
                  onClick={() => setIsEditing(true)}
                  className="flex-1 px-4 py-3 text-lg rounded-xl bg-white/90 text-gray-800 cursor-pointer hover:bg-white transition-colors flex items-center justify-center font-medium"
                >
                  {nickname || '点击输入昵称'}
                </div>
              )}

              <button
                onClick={handleRandomNickname}
                className="px-4 py-3 bg-white/30 hover:bg-white/40 text-white rounded-xl transition-all transform hover:scale-105"
                title="随机昵称"
              >
                🎲
              </button>
            </div>

            <p className="text-white/70 text-sm">
              点击昵称编辑，或点击骰子随机生成
            </p>
          </div>
        </motion.div>

        {/* 开始按钮 */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleStart}
          disabled={!nickname.trim()}
          className="px-12 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-2xl font-bold rounded-full shadow-2xl hover:shadow-3xl transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          开始游戏 🎮
        </motion.button>

        {/* 装饰性元素 */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: 'reverse'
          }}
          className="mt-12 text-6xl"
        >
          ⭐
        </motion.div>
      </motion.div>
    </div>
  );
};
