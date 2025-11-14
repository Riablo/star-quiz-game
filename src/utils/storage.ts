/**
 * 本地存储工具
 * 用于持久化游戏数据
 */

import { LocalStorageData, LeaderboardEntry } from '../types/game.types';

const STORAGE_KEY = 'star-quiz-game-data';

/**
 * 默认数据
 */
const DEFAULT_DATA: LocalStorageData = {
  nickname: '',
  highScores: {},
  leaderboard: [],
  soundEnabled: true,
  gamesPlayed: 0,
  totalCorrectAnswers: 0
};

/**
 * 获取存储的数据
 */
export const getStorageData = (): LocalStorageData => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      return { ...DEFAULT_DATA, ...JSON.parse(data) };
    }
  } catch (error) {
    console.error('Failed to load storage data:', error);
  }
  return DEFAULT_DATA;
};

/**
 * 保存数据到存储
 */
export const saveStorageData = (data: Partial<LocalStorageData>): void => {
  try {
    const currentData = getStorageData();
    const newData = { ...currentData, ...data };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
  } catch (error) {
    console.error('Failed to save storage data:', error);
  }
};

/**
 * 保存昵称
 */
export const saveNickname = (nickname: string): void => {
  saveStorageData({ nickname });
};

/**
 * 获取昵称
 */
export const getNickname = (): string => {
  return getStorageData().nickname;
};

/**
 * 更新最高分
 */
export const updateHighScore = (category: string, score: number): boolean => {
  const data = getStorageData();
  const currentHighScore = data.highScores[category] || 0;

  if (score > currentHighScore) {
    saveStorageData({
      highScores: {
        ...data.highScores,
        [category]: score
      }
    });
    return true; // 打破记录
  }

  return false;
};

/**
 * 获取最高分
 */
export const getHighScore = (category: string): number => {
  const data = getStorageData();
  return data.highScores[category] || 0;
};

/**
 * 添加排行榜记录
 */
export const addLeaderboardEntry = (entry: LeaderboardEntry): void => {
  const data = getStorageData();
  const leaderboard = [...data.leaderboard, entry];

  // 按分数排序，保留前50条
  leaderboard.sort((a, b) => b.score - a.score);
  const topLeaderboard = leaderboard.slice(0, 50);

  saveStorageData({ leaderboard: topLeaderboard });
};

/**
 * 获取排行榜（可按分类过滤）
 */
export const getLeaderboard = (
  category?: string,
  limit: number = 10
): LeaderboardEntry[] => {
  const data = getStorageData();
  let leaderboard = data.leaderboard;

  if (category && category !== 'all-stars') {
    leaderboard = leaderboard.filter(entry => entry.category === category);
  }

  return leaderboard.slice(0, limit);
};

/**
 * 增加游戏次数
 */
export const incrementGamesPlayed = (): void => {
  const data = getStorageData();
  saveStorageData({ gamesPlayed: data.gamesPlayed + 1 });
};

/**
 * 增加正确答案数
 */
export const incrementCorrectAnswers = (count: number): void => {
  const data = getStorageData();
  saveStorageData({ totalCorrectAnswers: data.totalCorrectAnswers + count });
};

/**
 * 切换音效设置
 */
export const toggleSound = (): boolean => {
  const data = getStorageData();
  const newValue = !data.soundEnabled;
  saveStorageData({ soundEnabled: newValue });
  return newValue;
};

/**
 * 获取音效设置
 */
export const getSoundEnabled = (): boolean => {
  return getStorageData().soundEnabled;
};

/**
 * 清空所有数据
 */
export const clearAllData = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear storage data:', error);
  }
};

/**
 * 获取游戏统计
 */
export const getGameStats = () => {
  const data = getStorageData();
  return {
    gamesPlayed: data.gamesPlayed,
    totalCorrectAnswers: data.totalCorrectAnswers,
    averageScore:
      data.leaderboard.length > 0
        ? Math.round(
            data.leaderboard.reduce((sum, entry) => sum + entry.score, 0) /
              data.leaderboard.length
          )
        : 0
  };
};
