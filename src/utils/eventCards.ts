/**
 * 随机事件卡片工具
 * 用于生成和管理PVP模式中的随机事件
 */

import { EventCard } from '../types/game.types';

/**
 * 所有可能的事件卡片
 */
const EVENT_CARDS: Omit<EventCard, 'remainingQuestions'>[] = [
  {
    id: 'double_score',
    type: 'doubleScore',
    name: '⚡ 双倍狂欢',
    icon: '⚡',
    description: '接下来3题分数翻倍！',
    duration: 3,
    effect: {
      scoreMultiplier: 2
    }
  },
  {
    id: 'swap_scores',
    type: 'swapScores',
    name: '🔄 命运轮盘',
    icon: '🔄',
    description: '两人分数互换！',
    duration: 0,
    effect: {}
  },
  {
    id: 'speed_challenge',
    type: 'speedChallenge',
    name: '🚀 极速挑战',
    icon: '🚀',
    description: '接下来3题限时5秒，答对×3',
    duration: 3,
    effect: {
      timeLimit: 5,
      scoreMultiplier: 3
    }
  }
];

/**
 * 随机生成事件卡片
 * @returns 事件卡片或null
 */
export const generateRandomEvent = (): EventCard | null => {
  // 30%概率触发事件
  if (Math.random() > 0.3) {
    return null;
  }

  const template =
    EVENT_CARDS[Math.floor(Math.random() * EVENT_CARDS.length)];

  return {
    ...template,
    remainingQuestions: template.duration
  };
};

/**
 * 检查是否应该触发事件（每5题检查一次）
 * @param questionIndex 当前题目索引
 * @returns 是否应该触发
 */
export const shouldTriggerEvent = (questionIndex: number): boolean => {
  // 第5、10、15题可能触发事件
  return questionIndex > 0 && questionIndex % 5 === 0;
};

/**
 * 更新事件剩余题数
 * @param event 当前事件
 * @returns 更新后的事件（如果剩余题数为0则返回null）
 */
export const updateEventProgress = (
  event: EventCard
): EventCard | null => {
  if (event.type === 'swapScores') {
    // 分数互换是即时事件，立即失效
    return null;
  }

  const remainingQuestions = event.remainingQuestions - 1;

  if (remainingQuestions <= 0) {
    return null;
  }

  return {
    ...event,
    remainingQuestions
  };
};

/**
 * 获取事件描述文本
 * @param event 事件卡片
 * @returns 描述文本
 */
export const getEventDescription = (event: EventCard): string => {
  if (event.remainingQuestions > 0) {
    return `${event.description} (剩余${event.remainingQuestions}题)`;
  }
  return event.description;
};
