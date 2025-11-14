/**
 * 题目卡片组件
 * 显示题目和选项，处理用户答题
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Question, Difficulty } from '../types/game.types';

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (answerIndex: number) => void;
  hintUsed?: boolean;
  disabled?: boolean;
}

const difficultyConfig: Record<Difficulty, { label: string; color: string }> = {
  easy: { label: '简单', color: 'bg-green-500' },
  medium: { label: '中等', color: 'bg-yellow-500' },
  hard: { label: '困难', color: 'bg-red-500' }
};

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  questionNumber,
  totalQuestions,
  onAnswer,
  hintUsed = false,
  disabled = false
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [eliminatedOptions, setEliminatedOptions] = useState<number[]>([]);

  // 使用提示道具时，排除两个错误选项
  useEffect(() => {
    if (hintUsed && eliminatedOptions.length === 0) {
      const wrongOptions = question.options
        .map((_, index) => index)
        .filter(index => index !== question.correctAnswer);

      // 随机选择两个错误选项
      const shuffled = [...wrongOptions].sort(() => Math.random() - 0.5);
      setEliminatedOptions(shuffled.slice(0, 2));
    }
  }, [hintUsed, question, eliminatedOptions.length]);

  const handleOptionClick = (index: number) => {
    if (disabled || selectedAnswer !== null || eliminatedOptions.includes(index)) {
      return;
    }

    setSelectedAnswer(index);
    setShowResult(true);

    // 延迟提交答案，显示反馈动画
    setTimeout(() => {
      onAnswer(index);
    }, 1500);
  };

  // 键盘快捷键支持
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (disabled || selectedAnswer !== null) return;

      const key = e.key;
      if (['1', '2', '3', '4'].includes(key)) {
        const index = parseInt(key) - 1;
        if (index < question.options.length && !eliminatedOptions.includes(index)) {
          handleOptionClick(index);
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [disabled, selectedAnswer, question.options.length, eliminatedOptions]);

  const isCorrect = selectedAnswer === question.correctAnswer;

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className="w-full max-w-3xl mx-auto"
    >
      {/* 题目头部 */}
      <div className="bg-white/10 backdrop-blur-md rounded-t-3xl p-6">
        <div className="flex items-center justify-between mb-4">
          {/* 题号 */}
          <div className="text-white/80 text-lg font-semibold">
            题目 {questionNumber} / {totalQuestions}
          </div>

          {/* 难度标签 */}
          <div
            className={`px-4 py-1 rounded-full text-white text-sm font-bold ${
              difficultyConfig[question.difficulty].color
            }`}
          >
            {difficultyConfig[question.difficulty].label}
          </div>
        </div>

        {/* 进度条 */}
        <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{
              width: `${(questionNumber / totalQuestions) * 100}%`
            }}
            className="h-full bg-gradient-to-r from-blue-400 to-purple-500"
          />
        </div>
      </div>

      {/* 题目内容 */}
      <div className="bg-white/20 backdrop-blur-md p-8">
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl md:text-3xl font-bold text-white mb-8 leading-relaxed"
        >
          {question.question}
        </motion.h3>

        {/* 选项列表 */}
        <div className="space-y-4">
          {question.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrectAnswer = index === question.correctAnswer;
            const isEliminated = eliminatedOptions.includes(index);

            let bgClass = 'bg-white/10 hover:bg-white/20';
            let borderClass = 'border-2 border-transparent';
            let textClass = 'text-white';

            if (isEliminated) {
              bgClass = 'bg-gray-500/30';
              textClass = 'text-white/30 line-through';
            } else if (showResult) {
              if (isSelected) {
                if (isCorrect) {
                  bgClass = 'bg-green-500/80';
                  borderClass = 'border-2 border-green-300';
                } else {
                  bgClass = 'bg-red-500/80';
                  borderClass = 'border-2 border-red-300';
                }
              } else if (isCorrectAnswer) {
                bgClass = 'bg-green-500/50';
                borderClass = 'border-2 border-green-300';
              }
            }

            return (
              <motion.button
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={
                  !disabled && !isEliminated && selectedAnswer === null
                    ? { scale: 1.02, x: 10 }
                    : {}
                }
                whileTap={
                  !disabled && !isEliminated && selectedAnswer === null
                    ? { scale: 0.98 }
                    : {}
                }
                onClick={() => handleOptionClick(index)}
                disabled={disabled || isEliminated}
                className={`w-full p-5 rounded-2xl transition-all ${bgClass} ${borderClass} ${
                  isEliminated ? 'cursor-not-allowed' : 'cursor-pointer'
                } text-left relative overflow-hidden`}
              >
                {/* 选项序号 */}
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-white">
                    {index + 1}
                  </div>

                  {/* 选项文字 */}
                  <div className={`flex-1 text-lg font-medium ${textClass}`}>
                    {option}
                  </div>

                  {/* 结果图标 */}
                  <AnimatePresence>
                    {showResult && isSelected && (
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        className="text-3xl"
                      >
                        {isCorrect ? '✓' : '✗'}
                      </motion.div>
                    )}

                    {showResult && !isSelected && isCorrectAnswer && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ repeat: 2 }}
                        className="text-3xl"
                      >
                        ✓
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* 答错时的抖动效果 */}
                {showResult && isSelected && !isCorrect && (
                  <motion.div
                    animate={{ x: [-10, 10, -10, 10, 0] }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0"
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* 题目底部 - 显示解析 */}
      <AnimatePresence>
        {showResult && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white/10 backdrop-blur-md rounded-b-3xl p-6"
          >
            <div className="flex items-start gap-3">
              <div className="text-2xl">💡</div>
              <div>
                <div className="text-white font-semibold mb-1">解析：</div>
                <div className="text-white/80">{question.explanation}</div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
