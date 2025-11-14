/**
 * 分数计算器工具
 * 负责游戏中的所有分数计算逻辑
 */

import { Difficulty, ScoreCalculation } from '../types/game.types';

/**
 * 基础分数配置
 */
const BASE_SCORES: Record<Difficulty, number> = {
  easy: 10,
  medium: 20,
  hard: 50
};

/**
 * 计算速度倍数
 * @param timeSpent 答题用时（秒）
 * @returns 速度倍数
 */
const calculateSpeedMultiplier = (timeSpent: number): number => {
  if (timeSpent < 3) return 1.5;  // 超快：×1.5
  if (timeSpent <= 7) return 1.0; // 正常：×1.0
  return 0.5;                      // 较慢：×0.5
};

/**
 * 计算连击倍数
 * @param combo 当前连击数
 * @returns 连击倍数
 */
const calculateComboMultiplier = (combo: number): number => {
  if (combo >= 5) return 5;   // 5连及以上：×5
  if (combo >= 3) return 3;   // 3-4连：×3
  if (combo >= 2) return 2;   // 2连：×2
  return 1;                    // 无连击：×1
};

/**
 * 获取速度描述
 */
const getSpeedDescription = (timeSpent: number): string => {
  if (timeSpent < 3) return '⚡ 闪电速度';
  if (timeSpent <= 7) return '✓ 正常速度';
  return '🐢 稍微慢了';
};

/**
 * 获取连击描述
 */
const getComboDescription = (combo: number): string => {
  if (combo >= 5) return '🔥 无敌连击';
  if (combo >= 3) return '💥 超级连击';
  if (combo >= 2) return '✨ 双连击';
  return '';
};

/**
 * 计算答题得分
 * @param difficulty 题目难度
 * @param timeSpent 答题用时（秒）
 * @param combo 当前连击数
 * @param eventMultiplier 事件倍数（默认1.0）
 * @returns 分数计算结果
 */
export const calculateScore = (
  difficulty: Difficulty,
  timeSpent: number,
  combo: number,
  eventMultiplier: number = 1.0
): ScoreCalculation => {
  const baseScore = BASE_SCORES[difficulty];
  const speedMultiplier = calculateSpeedMultiplier(timeSpent);
  const comboMultiplier = calculateComboMultiplier(combo);

  // 最终得分 = 基础分 × 速度倍数 × 连击倍数 × 事件倍数
  const finalScore = Math.round(
    baseScore * speedMultiplier * comboMultiplier * eventMultiplier
  );

  // 构建分数组成说明
  const breakdown: string[] = [];
  breakdown.push(`基础分: ${baseScore}分`);

  if (speedMultiplier !== 1.0) {
    breakdown.push(`${getSpeedDescription(timeSpent)} ×${speedMultiplier}`);
  }

  if (combo >= 2) {
    breakdown.push(`${getComboDescription(combo)} ×${comboMultiplier}`);
  }

  if (eventMultiplier > 1.0) {
    breakdown.push(`⭐ 事件加成 ×${eventMultiplier}`);
  }

  return {
    baseScore,
    speedMultiplier,
    comboMultiplier,
    eventMultiplier,
    finalScore,
    breakdown
  };
};

/**
 * 格式化分数显示（添加千位分隔符）
 * @param score 分数
 * @returns 格式化后的分数字符串
 */
export const formatScore = (score: number): string => {
  return score.toLocaleString('zh-CN');
};

/**
 * 计算星级评价
 * @param correctRate 正确率（0-1）
 * @param maxCombo 最大连击数
 * @returns 星级（1-5）
 */
export const calculateStarRating = (
  correctRate: number,
  maxCombo: number
): number => {
  let stars = 1;

  // 基于正确率
  if (correctRate >= 0.9) stars = 5;
  else if (correctRate >= 0.75) stars = 4;
  else if (correctRate >= 0.6) stars = 3;
  else if (correctRate >= 0.4) stars = 2;

  // 连击加成（最大+1星）
  if (maxCombo >= 5 && stars < 5) stars += 1;

  return stars;
};

/**
 * 生成评价文本
 * @param stars 星级
 * @returns 评价文本
 */
export const getRatingText = (stars: number): string => {
  const ratings = [
    '继续加油！💪',
    '还不错哦！👍',
    '做得很好！😊',
    '太棒了！🎉',
    '完美表现！🏆'
  ];
  return ratings[stars - 1] || ratings[0];
};
