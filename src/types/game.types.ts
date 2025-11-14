/**
 * 游戏类型定义文件
 * 包含所有游戏相关的TypeScript类型和接口
 */

// 难度级别
export type Difficulty = 'easy' | 'medium' | 'hard';

// 游戏模式
export type GameMode = 'single' | 'pvp';

// 道具类型
export type PowerUpType = 'hint' | 'skip' | 'extraTime';

// 游戏阶段
export type GameStage =
  | 'welcome'           // 欢迎页
  | 'modeSelection'     // 模式选择
  | 'categorySelection' // 题库选择
  | 'playing'           // 游戏进行中
  | 'result';           // 结算页

// 答题状态
export type AnswerStatus = 'unanswered' | 'correct' | 'incorrect' | 'timeout';

/**
 * 题目接口
 */
export interface Question {
  id: string;
  category: string;
  difficulty: Difficulty;
  question: string;
  options: string[];
  correctAnswer: number; // 正确答案的索引（0-3）
  explanation: string;
}

/**
 * 题库分类接口
 */
export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string; // Tailwind gradient class
  questionCount: number;
}

/**
 * 玩家信息接口
 */
export interface Player {
  id: string;
  nickname: string;
  score: number;
  combo: number;
  maxCombo: number;
  isAI: boolean;
  answeredCorrect: number;
  answeredIncorrect: number;
}

/**
 * 游戏状态接口
 */
export interface GameState {
  stage: GameStage;
  mode: GameMode;
  category: string;
  currentQuestionIndex: number;
  questions: Question[];
  player: Player;
  opponent: Player | null; // PVP模式下的对手
  powerUps: Record<PowerUpType, number>;
  answeredQuestions: AnsweredQuestion[];
  timeLeft: number;
  isPaused: boolean;
  eventCard: EventCard | null; // 当前激活的随机事件
}

/**
 * 已回答的题目记录
 */
export interface AnsweredQuestion {
  questionId: string;
  userAnswer: number;
  isCorrect: boolean;
  timeSpent: number; // 答题用时（秒）
  scoreEarned: number;
  comboAtTime: number;
}

/**
 * 分数计算结果
 */
export interface ScoreCalculation {
  baseScore: number;        // 基础分
  speedMultiplier: number;  // 速度倍数
  comboMultiplier: number;  // 连击倍数
  eventMultiplier: number;  // 事件倍数
  finalScore: number;       // 最终得分
  breakdown: string[];      // 分数组成说明
}

/**
 * 随机事件卡片
 */
export interface EventCard {
  id: string;
  type: 'doubleScore' | 'swapScores' | 'speedChallenge';
  name: string;
  icon: string;
  description: string;
  duration: number; // 持续题目数
  remainingQuestions: number;
  effect: {
    scoreMultiplier?: number;
    timeLimit?: number;
  };
}

/**
 * 排行榜记录
 */
export interface LeaderboardEntry {
  id: string;
  nickname: string;
  score: number;
  maxCombo: number;
  category: string;
  mode: GameMode;
  timestamp: number;
}

/**
 * 本地存储数据结构
 */
export interface LocalStorageData {
  nickname: string;
  highScores: Record<string, number>; // category -> score
  leaderboard: LeaderboardEntry[];
  soundEnabled: boolean;
  gamesPlayed: number;
  totalCorrectAnswers: number;
}

/**
 * AI对手配置
 */
export interface AIConfig {
  difficulty: Difficulty;
  accuracyRate: number; // 正确率
  minThinkTime: number; // 最小思考时间（秒）
  maxThinkTime: number; // 最大思考时间（秒）
  powerUpUseProbability: number; // 使用道具概率
}

/**
 * 倒计时配置
 */
export interface TimerConfig {
  totalTime: number;
  warningTime: number; // 警告时间阈值（黄色）
  criticalTime: number; // 危险时间阈值（红色）
}
