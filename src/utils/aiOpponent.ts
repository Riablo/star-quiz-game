/**
 * AI对手模拟工具
 * 用于在PVP模式下模拟对手行为
 */

import { Difficulty, AIConfig, PowerUpType } from '../types/game.types';

/**
 * AI难度配置
 */
const AI_CONFIGS: Record<Difficulty, AIConfig> = {
  easy: {
    difficulty: 'easy',
    accuracyRate: 0.85,
    minThinkTime: 2,
    maxThinkTime: 6,
    powerUpUseProbability: 0.15
  },
  medium: {
    difficulty: 'medium',
    accuracyRate: 0.70,
    minThinkTime: 1.5,
    maxThinkTime: 5,
    powerUpUseProbability: 0.25
  },
  hard: {
    difficulty: 'hard',
    accuracyRate: 0.50,
    minThinkTime: 1,
    maxThinkTime: 4,
    powerUpUseProbability: 0.10
  }
};

/**
 * 根据题目难度获取AI配置
 * @param difficulty 题目难度
 * @returns AI配置
 */
export const getAIConfig = (difficulty: Difficulty): AIConfig => {
  return AI_CONFIGS[difficulty];
};

/**
 * AI答题模拟
 * @param difficulty 题目难度
 * @param correctAnswer 正确答案索引
 * @param optionsCount 选项数量
 * @returns AI的答案和用时
 */
export const simulateAIAnswer = (
  difficulty: Difficulty,
  correctAnswer: number,
  optionsCount: number = 4
): { answer: number; timeSpent: number; isCorrect: boolean } => {
  const config = getAIConfig(difficulty);

  // 随机思考时间（模拟真实玩家）
  const timeSpent =
    config.minThinkTime +
    Math.random() * (config.maxThinkTime - config.minThinkTime);

  // 根据正确率决定是否答对
  const isCorrect = Math.random() < config.accuracyRate;

  let answer: number;
  if (isCorrect) {
    answer = correctAnswer;
  } else {
    // 答错时随机选择其他选项
    const wrongOptions = Array.from(
      { length: optionsCount },
      (_, i) => i
    ).filter(i => i !== correctAnswer);
    answer = wrongOptions[Math.floor(Math.random() * wrongOptions.length)];
  }

  return {
    answer,
    timeSpent: Math.round(timeSpent * 10) / 10, // 保留一位小数
    isCorrect
  };
};

/**
 * AI是否使用道具
 * @param difficulty 当前题目难度
 * @param scoreDifference 与玩家的分差（正数表示领先，负数表示落后）
 * @param availablePowerUps 可用道具
 * @returns 是否使用道具和道具类型
 */
export const shouldAIUsePowerUp = (
  difficulty: Difficulty,
  scoreDifference: number,
  availablePowerUps: Record<PowerUpType, number>
): { shouldUse: boolean; powerUpType?: PowerUpType } => {
  const config = getAIConfig(difficulty);

  // 基础使用概率
  let useProbability = config.powerUpUseProbability;

  // 如果落后很多，增加使用道具的概率
  if (scoreDifference < -50) {
    useProbability += 0.2;
  } else if (scoreDifference < -20) {
    useProbability += 0.1;
  }

  // 如果领先很多，降低使用道具的概率
  if (scoreDifference > 50) {
    useProbability -= 0.1;
  }

  // 确保概率在0-1之间
  useProbability = Math.max(0, Math.min(1, useProbability));

  // 决定是否使用
  if (Math.random() > useProbability) {
    return { shouldUse: false };
  }

  // 选择使用哪个道具
  const availableTypes = (
    Object.entries(availablePowerUps) as [PowerUpType, number][]
  )
    .filter(([_, count]) => count > 0)
    .map(([type]) => type);

  if (availableTypes.length === 0) {
    return { shouldUse: false };
  }

  // 根据情况选择道具
  let powerUpType: PowerUpType;

  if (scoreDifference < -30 && availableTypes.includes('extraTime')) {
    // 落后时倾向使用加时
    powerUpType = 'extraTime';
  } else if (difficulty === 'hard' && availableTypes.includes('hint')) {
    // 困难题目倾向使用提示
    powerUpType = 'hint';
  } else if (availableTypes.includes('skip')) {
    // 其他情况倾向跳过
    powerUpType = 'skip';
  } else {
    // 随机选择
    powerUpType =
      availableTypes[Math.floor(Math.random() * availableTypes.length)];
  }

  return { shouldUse: true, powerUpType };
};

/**
 * 生成AI昵称
 * @returns 随机AI昵称
 */
export const generateAINickname = (): string => {
  const prefixes = [
    '智能',
    '超级',
    '神秘',
    '闪电',
    '幸运',
    '传奇',
    '王者',
    '冠军'
  ];

  const suffixes = [
    '挑战者',
    '玩家',
    '高手',
    '大师',
    '粉丝',
    '达人',
    '专家',
    '战士'
  ];

  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
  const number = Math.floor(Math.random() * 9000) + 1000;

  return `${prefix}${suffix}${number}`;
};

/**
 * AI答题延迟模拟（返回Promise，用于异步等待）
 * @param timeSpent AI思考时间
 * @returns Promise
 */
export const aiAnswerDelay = (timeSpent: number): Promise<void> => {
  return new Promise(resolve => {
    setTimeout(resolve, timeSpent * 1000);
  });
};

/**
 * 计算AI答题进度（用于显示进度条）
 * @param elapsedTime 已用时间
 * @param totalTime 总思考时间
 * @returns 进度百分比（0-100）
 */
export const calculateAIProgress = (
  elapsedTime: number,
  totalTime: number
): number => {
  return Math.min(100, (elapsedTime / totalTime) * 100);
};
