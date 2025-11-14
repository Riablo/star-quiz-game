/**
 * 游戏主界面组件
 * 整合所有游戏元素，处理游戏流程
 */

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTimer } from '../hooks/useTimer';
import { Question, PowerUpType, EventCard } from '../types/game.types';
import { ScoreBoard } from './ScoreBoard';
import { PowerUpPanel } from './PowerUpPanel';
import { QuestionCard } from './QuestionCard';
import { CountdownTimer } from './CountdownTimer';
import { ComboEffect } from './ComboEffect';
import { simulateAIAnswer } from '../utils/aiOpponent';
import {
  shouldTriggerEvent,
  generateRandomEvent
} from '../utils/eventCards';

interface GameScreenProps {
  questions: Question[];
  currentQuestionIndex: number;
  player: any;
  opponent: any;
  powerUps: Record<PowerUpType, number>;
  mode: 'single' | 'pvp';
  eventCard: EventCard | null;
  onAnswer: (answer: number, timeSpent: number) => void;
  onAIAnswer: (answer: number, timeSpent: number) => void;
  onNextQuestion: () => void;
  onUsePowerUp: (type: PowerUpType) => void;
  onSetEvent: (event: EventCard | null) => void;
  onUpdateEvent: () => void;
  onSwapScores: () => void;
  onPause: () => void;
}

export const GameScreen: React.FC<GameScreenProps> = ({
  questions,
  currentQuestionIndex,
  player,
  opponent,
  powerUps,
  mode,
  eventCard,
  onAnswer,
  onAIAnswer,
  onNextQuestion,
  onUsePowerUp,
  onSetEvent,
  onUpdateEvent,
  onSwapScores,
  onPause
}) => {
  const [hintUsed, setHintUsed] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [answerStartTime, setAnswerStartTime] = useState(Date.now());
  const [showCombo, setShowCombo] = useState(false);
  const [aiAnswering, setAiAnswering] = useState(false);
  const lastScore = 0;

  const currentQuestion = questions[currentQuestionIndex];

  // 获取倒计时配置（考虑事件效果）
  const timerDuration = eventCard?.effect.timeLimit || 10;

  // 倒计时Hook
  const timer = useTimer({
    initialTime: timerDuration,
    warningThreshold: 7,
    criticalThreshold: 3,
    onTimeout: handleTimeout
  });

  // 超时处理
  function handleTimeout() {
    if (!answered) {
      const timeSpent = (Date.now() - answerStartTime) / 1000;
      handleAnswer(-1, timeSpent); // -1表示超时未答
    }
  }

  // 处理答题
  const handleAnswer = useCallback(
    (answerIndex: number, timeSpent?: number) => {
      if (answered) return;

      setAnswered(true);
      timer.pause();

      const actualTimeSpent = timeSpent ?? (Date.now() - answerStartTime) / 1000;

      // 提交答案
      onAnswer(answerIndex, actualTimeSpent);

      // 显示连击效果
      if (player.combo >= 2) {
        setShowCombo(true);
        setTimeout(() => setShowCombo(false), 2000);
      }

      // 处理下一题
      setTimeout(() => {
        handleNextQuestion();
      }, 2000);
    },
    [answered, timer, answerStartTime, onAnswer, player.combo]
  );

  // 处理下一题
  const handleNextQuestion = () => {
    setAnswered(false);
    setHintUsed(false);

    // 检查是否触发随机事件（PVP模式）
    if (mode === 'pvp' && shouldTriggerEvent(currentQuestionIndex + 1)) {
      const newEvent = generateRandomEvent();
      if (newEvent) {
        onSetEvent(newEvent);

        // 如果是分数互换事件，立即执行
        if (newEvent.type === 'swapScores') {
          onSwapScores();
          setTimeout(() => onSetEvent(null), 3000);
        }
      }
    }

    // 更新事件进度
    if (eventCard) {
      onUpdateEvent();
    }

    onNextQuestion();
  };

  // AI答题模拟（PVP模式）
  useEffect(() => {
    if (mode === 'pvp' && !answered && !aiAnswering) {
      setAiAnswering(true);

      const aiResult = simulateAIAnswer(
        currentQuestion.difficulty,
        currentQuestion.correctAnswer,
        currentQuestion.options.length
      );

      // AI延迟答题
      const aiDelay = aiResult.timeSpent * 1000;
      setTimeout(() => {
        if (!answered) {
          onAIAnswer(aiResult.answer, aiResult.timeSpent);
        }
        setAiAnswering(false);
      }, aiDelay);
    }
  }, [
    mode,
    currentQuestion,
    answered,
    aiAnswering,
    onAIAnswer
  ]);

  // 初始化每道题
  useEffect(() => {
    setAnswerStartTime(Date.now());
    timer.reset(timerDuration);
    timer.start();
  }, [currentQuestionIndex, timerDuration]);

  // 道具使用处理
  const handleUsePowerUp = (type: PowerUpType) => {
    if (answered) return;

    onUsePowerUp(type);

    switch (type) {
      case 'hint':
        setHintUsed(true);
        break;
      case 'skip':
        handleAnswer(-2, 0); // -2表示跳过
        break;
      case 'extraTime':
        timer.addTime(5);
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-pink-600 p-4 flex flex-col">
      {/* 顶部栏 */}
      <div className="max-w-6xl mx-auto w-full mb-6">
        <div className="flex justify-between items-start">
          {/* 计分板 */}
          <div className="flex-1">
            <ScoreBoard
              player={player}
              opponent={opponent}
              layout={mode === 'pvp' ? 'split' : 'single'}
            />
          </div>

          {/* 暂停按钮 */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onPause}
            className="ml-4 w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center text-white text-xl transition-all"
          >
            ⏸️
          </motion.button>
        </div>
      </div>

      {/* 主游戏区域 */}
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-4xl">
          {/* 倒计时 */}
          <div className="flex justify-center mb-6">
            <CountdownTimer
              timeLeft={timer.timeLeft}
              totalTime={timerDuration}
              status={timer.getStatus()}
            />
          </div>

          {/* 道具面板 */}
          <PowerUpPanel
            powerUps={powerUps}
            onUsePowerUp={handleUsePowerUp}
            disabled={answered}
          />

          {/* 题目卡片 */}
          <AnimatePresence mode="wait">
            <QuestionCard
              key={currentQuestion.id}
              question={currentQuestion}
              questionNumber={currentQuestionIndex + 1}
              totalQuestions={questions.length}
              onAnswer={answer => handleAnswer(answer)}
              hintUsed={hintUsed}
              disabled={answered}
            />
          </AnimatePresence>
        </div>
      </div>

      {/* 连击特效 */}
      <AnimatePresence>
        {showCombo && <ComboEffect combo={player.combo} score={lastScore} />}
      </AnimatePresence>

      {/* 事件卡片提示 */}
      <AnimatePresence>
        {eventCard && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-24 left-1/2 transform -translate-x-1/2 z-40"
          >
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-4 shadow-2xl">
              <div className="flex items-center gap-3 text-white">
                <div className="text-3xl">{eventCard.icon}</div>
                <div>
                  <div className="font-bold">{eventCard.name}</div>
                  <div className="text-sm opacity-90">
                    {eventCard.description}
                  </div>
                  {eventCard.remainingQuestions > 0 && (
                    <div className="text-xs opacity-75 mt-1">
                      剩余 {eventCard.remainingQuestions} 题
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
