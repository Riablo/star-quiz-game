/**
 * 题库选择组件
 * 显示所有可用的题库分类，支持卡片翻转动画
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import { categories } from '../data/questions';
import { getHighScore } from '../utils/storage';

interface CategorySelectionProps {
  onSelectCategory: (categoryId: string) => void;
  onBack: () => void;
}

export const CategorySelection: React.FC<CategorySelectionProps> = ({
  onSelectCategory,
  onBack
}) => {
  const [flippedCard, setFlippedCard] = useState<string | null>(null);

  const handleCardClick = (categoryId: string) => {
    if (flippedCard === categoryId) {
      // 如果已经翻转，则选择该分类
      onSelectCategory(categoryId);
    } else {
      // 否则翻转卡片显示详情
      setFlippedCard(categoryId);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-pink-600 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="w-full max-w-6xl"
      >
        {/* 标题 */}
        <motion.h2
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-4xl md:text-5xl font-bold text-white text-center mb-12"
        >
          选择题库分类
        </motion.h2>

        {/* 题库卡片网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {categories.map((category, index) => {
            const isFlipped = flippedCard === category.id;
            const highScore = getHighScore(category.id);

            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="h-64 perspective-1000"
              >
                <motion.div
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{ duration: 0.6 }}
                  onClick={() => handleCardClick(category.id)}
                  className="relative w-full h-full cursor-pointer preserve-3d"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* 卡片正面 */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${category.color} rounded-3xl p-6 shadow-2xl flex flex-col items-center justify-center backface-hidden`}
                    style={{ backfaceVisibility: 'hidden' }}
                  >
                    {/* 图标 */}
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 10 }}
                      className="text-7xl mb-4"
                    >
                      {category.icon}
                    </motion.div>

                    {/* 名称 */}
                    <h3 className="text-2xl font-bold text-white mb-2 text-center">
                      {category.name}
                    </h3>

                    {/* 题目数量 */}
                    <p className="text-white/80 text-sm">
                      {category.questionCount} 道题目
                    </p>

                    {/* 点击提示 */}
                    <motion.p
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="text-white/60 text-xs mt-4"
                    >
                      点击查看详情
                    </motion.p>
                  </div>

                  {/* 卡片背面 */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${category.color} rounded-3xl p-6 shadow-2xl backface-hidden`}
                    style={{
                      backfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)'
                    }}
                  >
                    <div className="h-full flex flex-col justify-between text-white">
                      {/* 详细信息 */}
                      <div>
                        <div className="text-4xl mb-3">{category.icon}</div>
                        <h3 className="text-xl font-bold mb-4">
                          {category.name}
                        </h3>

                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>题目数量：</span>
                            <span className="font-semibold">
                              {category.questionCount}
                            </span>
                          </div>

                          <div className="flex justify-between">
                            <span>最高分：</span>
                            <span className="font-semibold">
                              {highScore > 0 ? highScore : '暂无记录'}
                            </span>
                          </div>

                          <div className="flex justify-between">
                            <span>难度分布：</span>
                            <span className="font-semibold">混合</span>
                          </div>
                        </div>
                      </div>

                      {/* 开始按钮 */}
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full py-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl font-bold transition-colors"
                      >
                        开始挑战 →
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* 提示文本 */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center text-white/80 mb-6"
        >
          点击卡片查看详情，再次点击开始游戏
        </motion.p>

        {/* 返回按钮 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
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
