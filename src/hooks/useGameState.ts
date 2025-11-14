/**
 * 游戏状态管理Hook
 * 使用useReducer管理复杂的游戏状态
 */

import { useReducer, useCallback } from 'react';
import {
  GameState,
  GameMode,
  GameStage,
  Player,
  PowerUpType,
  Question,
  AnsweredQuestion,
  EventCard
} from '../types/game.types';
import { calculateScore } from '../utils/scoreCalculator';
import { generateAINickname } from '../utils/aiOpponent';

// ==================== Action类型定义 ====================

type GameAction =
  | { type: 'SET_STAGE'; payload: GameStage }
  | { type: 'SET_MODE'; payload: GameMode }
  | { type: 'SET_CATEGORY'; payload: string }
  | { type: 'SET_QUESTIONS'; payload: Question[] }
  | { type: 'SET_PLAYER_NICKNAME'; payload: string }
  | { type: 'START_GAME' }
  | { type: 'ANSWER_QUESTION'; payload: { answer: number; timeSpent: number } }
  | { type: 'AI_ANSWER'; payload: { answer: number; timeSpent: number } }
  | { type: 'NEXT_QUESTION' }
  | { type: 'USE_POWERUP'; payload: PowerUpType }
  | { type: 'SET_EVENT'; payload: EventCard | null }
  | { type: 'UPDATE_EVENT' }
  | { type: 'SWAP_SCORES' }
  | { type: 'PAUSE_GAME' }
  | { type: 'RESUME_GAME' }
  | { type: 'RESET_GAME' };

// ==================== 初始状态 ====================

const createInitialPlayer = (nickname: string, isAI: boolean = false): Player => ({
  id: isAI ? 'ai' : 'player',
  nickname,
  score: 0,
  combo: 0,
  maxCombo: 0,
  isAI,
  answeredCorrect: 0,
  answeredIncorrect: 0
});

const initialState: GameState = {
  stage: 'welcome',
  mode: 'single',
  category: '',
  currentQuestionIndex: 0,
  questions: [],
  player: createInitialPlayer('玩家'),
  opponent: null,
  powerUps: {
    hint: 3,
    skip: 3,
    extraTime: 3
  },
  answeredQuestions: [],
  timeLeft: 10,
  isPaused: false,
  eventCard: null
};

// ==================== Reducer函数 ====================

const gameReducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case 'SET_STAGE':
      return { ...state, stage: action.payload };

    case 'SET_MODE':
      return {
        ...state,
        mode: action.payload,
        opponent:
          action.payload === 'pvp'
            ? createInitialPlayer(generateAINickname(), true)
            : null
      };

    case 'SET_CATEGORY':
      return { ...state, category: action.payload };

    case 'SET_QUESTIONS':
      return { ...state, questions: action.payload };

    case 'SET_PLAYER_NICKNAME':
      return {
        ...state,
        player: { ...state.player, nickname: action.payload }
      };

    case 'START_GAME':
      return {
        ...state,
        stage: 'playing',
        currentQuestionIndex: 0,
        answeredQuestions: [],
        player: { ...state.player, score: 0, combo: 0, maxCombo: 0, answeredCorrect: 0, answeredIncorrect: 0 },
        opponent: state.opponent
          ? { ...state.opponent, score: 0, combo: 0, maxCombo: 0, answeredCorrect: 0, answeredIncorrect: 0 }
          : null,
        powerUps: { hint: 3, skip: 3, extraTime: 3 }
      };

    case 'ANSWER_QUESTION': {
      const { answer, timeSpent } = action.payload;
      const currentQuestion = state.questions[state.currentQuestionIndex];
      const isCorrect = answer === currentQuestion.correctAnswer;

      // 计算新的连击数
      const newCombo = isCorrect ? state.player.combo + 1 : 0;

      // 计算分数
      const eventMultiplier = state.eventCard?.effect.scoreMultiplier || 1;
      const scoreCalc = isCorrect
        ? calculateScore(
            currentQuestion.difficulty,
            timeSpent,
            newCombo,
            eventMultiplier
          )
        : { finalScore: 0 } as any;

      // 创建答题记录
      const answeredQuestion: AnsweredQuestion = {
        questionId: currentQuestion.id,
        userAnswer: answer,
        isCorrect,
        timeSpent,
        scoreEarned: scoreCalc.finalScore,
        comboAtTime: newCombo
      };

      return {
        ...state,
        player: {
          ...state.player,
          score: state.player.score + scoreCalc.finalScore,
          combo: newCombo,
          maxCombo: Math.max(state.player.maxCombo, newCombo),
          answeredCorrect: state.player.answeredCorrect + (isCorrect ? 1 : 0),
          answeredIncorrect: state.player.answeredIncorrect + (isCorrect ? 0 : 1)
        },
        answeredQuestions: [...state.answeredQuestions, answeredQuestion]
      };
    }

    case 'AI_ANSWER': {
      if (!state.opponent) return state;

      const { answer, timeSpent } = action.payload;
      const currentQuestion = state.questions[state.currentQuestionIndex];
      const isCorrect = answer === currentQuestion.correctAnswer;

      const newCombo = isCorrect ? state.opponent.combo + 1 : 0;
      const eventMultiplier = state.eventCard?.effect.scoreMultiplier || 1;
      const scoreCalc = isCorrect
        ? calculateScore(
            currentQuestion.difficulty,
            timeSpent,
            newCombo,
            eventMultiplier
          )
        : { finalScore: 0 } as any;

      return {
        ...state,
        opponent: {
          ...state.opponent,
          score: state.opponent.score + scoreCalc.finalScore,
          combo: newCombo,
          maxCombo: Math.max(state.opponent.maxCombo, newCombo),
          answeredCorrect: state.opponent.answeredCorrect + (isCorrect ? 1 : 0),
          answeredIncorrect: state.opponent.answeredIncorrect + (isCorrect ? 0 : 1)
        }
      };
    }

    case 'NEXT_QUESTION': {
      const nextIndex = state.currentQuestionIndex + 1;

      if (nextIndex >= state.questions.length) {
        // 游戏结束
        return { ...state, stage: 'result' };
      }

      return {
        ...state,
        currentQuestionIndex: nextIndex
      };
    }

    case 'USE_POWERUP': {
      const powerUpType = action.payload;
      const currentCount = state.powerUps[powerUpType];

      if (currentCount <= 0) return state;

      return {
        ...state,
        powerUps: {
          ...state.powerUps,
          [powerUpType]: currentCount - 1
        }
      };
    }

    case 'SET_EVENT':
      return { ...state, eventCard: action.payload };

    case 'UPDATE_EVENT': {
      if (!state.eventCard) return state;

      const remainingQuestions = state.eventCard.remainingQuestions - 1;

      if (remainingQuestions <= 0 || state.eventCard.type === 'swapScores') {
        return { ...state, eventCard: null };
      }

      return {
        ...state,
        eventCard: {
          ...state.eventCard,
          remainingQuestions
        }
      };
    }

    case 'SWAP_SCORES': {
      if (!state.opponent) return state;

      return {
        ...state,
        player: { ...state.player, score: state.opponent.score },
        opponent: { ...state.opponent, score: state.player.score }
      };
    }

    case 'PAUSE_GAME':
      return { ...state, isPaused: true };

    case 'RESUME_GAME':
      return { ...state, isPaused: false };

    case 'RESET_GAME':
      return { ...initialState };

    default:
      return state;
  }
};

// ==================== Hook主体 ====================

export const useGameState = () => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  // ==================== Action创建函数 ====================

  const setStage = useCallback((stage: GameStage) => {
    dispatch({ type: 'SET_STAGE', payload: stage });
  }, []);

  const setMode = useCallback((mode: GameMode) => {
    dispatch({ type: 'SET_MODE', payload: mode });
  }, []);

  const setCategory = useCallback((category: string) => {
    dispatch({ type: 'SET_CATEGORY', payload: category });
  }, []);

  const setQuestions = useCallback((questions: Question[]) => {
    dispatch({ type: 'SET_QUESTIONS', payload: questions });
  }, []);

  const setPlayerNickname = useCallback((nickname: string) => {
    dispatch({ type: 'SET_PLAYER_NICKNAME', payload: nickname });
  }, []);

  const startGame = useCallback(() => {
    dispatch({ type: 'START_GAME' });
  }, []);

  const answerQuestion = useCallback((answer: number, timeSpent: number) => {
    dispatch({ type: 'ANSWER_QUESTION', payload: { answer, timeSpent } });
  }, []);

  const aiAnswer = useCallback((answer: number, timeSpent: number) => {
    dispatch({ type: 'AI_ANSWER', payload: { answer, timeSpent } });
  }, []);

  const nextQuestion = useCallback(() => {
    dispatch({ type: 'NEXT_QUESTION' });
  }, []);

  const usePowerUp = useCallback((powerUpType: PowerUpType) => {
    dispatch({ type: 'USE_POWERUP', payload: powerUpType });
  }, []);

  const setEvent = useCallback((event: EventCard | null) => {
    dispatch({ type: 'SET_EVENT', payload: event });
  }, []);

  const updateEvent = useCallback(() => {
    dispatch({ type: 'UPDATE_EVENT' });
  }, []);

  const swapScores = useCallback(() => {
    dispatch({ type: 'SWAP_SCORES' });
  }, []);

  const pauseGame = useCallback(() => {
    dispatch({ type: 'PAUSE_GAME' });
  }, []);

  const resumeGame = useCallback(() => {
    dispatch({ type: 'RESUME_GAME' });
  }, []);

  const resetGame = useCallback(() => {
    dispatch({ type: 'RESET_GAME' });
  }, []);

  // ==================== 辅助方法 ====================

  const getCurrentQuestion = useCallback(() => {
    return state.questions[state.currentQuestionIndex] || null;
  }, [state.questions, state.currentQuestionIndex]);

  const isLastQuestion = useCallback(() => {
    return state.currentQuestionIndex >= state.questions.length - 1;
  }, [state.currentQuestionIndex, state.questions.length]);

  const getProgress = useCallback(() => {
    return {
      current: state.currentQuestionIndex + 1,
      total: state.questions.length,
      percentage: Math.round(
        ((state.currentQuestionIndex + 1) / state.questions.length) * 100
      )
    };
  }, [state.currentQuestionIndex, state.questions.length]);

  return {
    // 状态
    ...state,

    // Actions
    setStage,
    setMode,
    setCategory,
    setQuestions,
    setPlayerNickname,
    startGame,
    answerQuestion,
    aiAnswer,
    nextQuestion,
    usePowerUp,
    setEvent,
    updateEvent,
    swapScores,
    pauseGame,
    resumeGame,
    resetGame,

    // 辅助方法
    getCurrentQuestion,
    isLastQuestion,
    getProgress
  };
};
