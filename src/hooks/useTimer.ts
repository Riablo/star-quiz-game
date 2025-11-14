/**
 * 倒计时Hook
 * 提供精确的倒计时功能，支持暂停、重置、加时等操作
 */

import { useState, useEffect, useRef, useCallback } from 'react';

interface UseTimerOptions {
  initialTime: number; // 初始时间（秒）
  onTick?: (timeLeft: number) => void; // 每次tick的回调
  onWarning?: () => void; // 警告时间回调（7秒）
  onCritical?: () => void; // 危险时间回调（3秒）
  onTimeout?: () => void; // 超时回调
  warningThreshold?: number; // 警告时间阈值（默认7秒）
  criticalThreshold?: number; // 危险时间阈值（默认3秒）
}

interface UseTimerReturn {
  timeLeft: number;
  isRunning: boolean;
  isPaused: boolean;
  progress: number; // 进度百分比（0-100）
  start: () => void;
  pause: () => void;
  resume: () => void;
  reset: (newTime?: number) => void;
  addTime: (seconds: number) => void;
  getStatus: () => 'normal' | 'warning' | 'critical';
}

/**
 * 倒计时Hook
 */
export const useTimer = (options: UseTimerOptions): UseTimerReturn => {
  const {
    initialTime,
    onTick,
    onWarning,
    onCritical,
    onTimeout,
    warningThreshold = 7,
    criticalThreshold = 3
  } = options;

  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const intervalRef = useRef<number | null>(null);
  const warningTriggeredRef = useRef(false);
  const criticalTriggeredRef = useRef(false);

  /**
   * 清理定时器
   */
  const clearTimer = useCallback(() => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  /**
   * 开始倒计时
   */
  const start = useCallback(() => {
    setIsRunning(true);
    setIsPaused(false);
    warningTriggeredRef.current = false;
    criticalTriggeredRef.current = false;
  }, []);

  /**
   * 暂停倒计时
   */
  const pause = useCallback(() => {
    setIsPaused(true);
    clearTimer();
  }, [clearTimer]);

  /**
   * 恢复倒计时
   */
  const resume = useCallback(() => {
    setIsPaused(false);
  }, []);

  /**
   * 重置倒计时
   */
  const reset = useCallback(
    (newTime?: number) => {
      clearTimer();
      setTimeLeft(newTime ?? initialTime);
      setIsRunning(false);
      setIsPaused(false);
      warningTriggeredRef.current = false;
      criticalTriggeredRef.current = false;
    },
    [clearTimer, initialTime]
  );

  /**
   * 增加时间
   */
  const addTime = useCallback((seconds: number) => {
    setTimeLeft(prev => Math.max(0, prev + seconds));
  }, []);

  /**
   * 获取当前状态
   */
  const getStatus = useCallback((): 'normal' | 'warning' | 'critical' => {
    if (timeLeft <= criticalThreshold) return 'critical';
    if (timeLeft <= warningThreshold) return 'warning';
    return 'normal';
  }, [timeLeft, warningThreshold, criticalThreshold]);

  /**
   * 倒计时效果
   */
  useEffect(() => {
    if (!isRunning || isPaused) {
      clearTimer();
      return;
    }

    intervalRef.current = window.setInterval(() => {
      setTimeLeft(prev => {
        const newTime = Math.max(0, prev - 0.1); // 每100ms减少0.1秒

        // 触发tick回调
        if (onTick) {
          onTick(newTime);
        }

        // 警告时间回调
        if (
          newTime <= warningThreshold &&
          newTime > criticalThreshold &&
          !warningTriggeredRef.current
        ) {
          warningTriggeredRef.current = true;
          if (onWarning) onWarning();
        }

        // 危险时间回调
        if (
          newTime <= criticalThreshold &&
          newTime > 0 &&
          !criticalTriggeredRef.current
        ) {
          criticalTriggeredRef.current = true;
          if (onCritical) onCritical();
        }

        // 超时回调
        if (newTime === 0) {
          clearTimer();
          setIsRunning(false);
          if (onTimeout) onTimeout();
        }

        return newTime;
      });
    }, 100); // 每100ms更新一次

    return clearTimer;
  }, [
    isRunning,
    isPaused,
    onTick,
    onWarning,
    onCritical,
    onTimeout,
    warningThreshold,
    criticalThreshold,
    clearTimer
  ]);

  /**
   * 计算进度百分比
   */
  const progress = (timeLeft / initialTime) * 100;

  return {
    timeLeft,
    isRunning,
    isPaused,
    progress,
    start,
    pause,
    resume,
    reset,
    addTime,
    getStatus
  };
};
