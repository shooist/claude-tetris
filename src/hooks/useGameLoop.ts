import { useEffect, useRef, useCallback } from 'react';
import { getDropSpeed } from '@/utils/gameUtils';

interface GameLoopProps {
  isPlaying: boolean;
  isPaused: boolean;
  level: number;
  onTick: () => void;
}

export function useGameLoop({ isPlaying, isPaused, level, onTick }: GameLoopProps) {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const lastTickTime = useRef<number>(0);

  // タイマーをクリアする関数
  const clearGameTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  // ゲームループを開始する関数
  const startGameLoop = useCallback(() => {
    clearGameTimer();
    
    const dropSpeed = getDropSpeed(level);
    lastTickTime.current = Date.now();
    
    intervalRef.current = setInterval(() => {
      const now = Date.now();
      // 前回のティックから十分な時間が経過している場合のみ実行
      if (now - lastTickTime.current >= dropSpeed) {
        onTick();
        lastTickTime.current = now;
      }
    }, Math.min(dropSpeed, 50)); // 最小50msでチェック
  }, [level, onTick, clearGameTimer]);

  // ゲーム状態の変化に応じてタイマーを制御
  useEffect(() => {
    if (isPlaying && !isPaused) {
      startGameLoop();
    } else {
      clearGameTimer();
    }

    return () => {
      clearGameTimer();
    };
  }, [isPlaying, isPaused, startGameLoop, clearGameTimer]);

  // レベルが変化した時にタイマーを再開
  useEffect(() => {
    if (isPlaying && !isPaused) {
      startGameLoop();
    }
  }, [level, isPlaying, isPaused, startGameLoop]);

  // コンポーネントがアンマウントされた時のクリーンアップ
  useEffect(() => {
    return () => {
      clearGameTimer();
    };
  }, [clearGameTimer]);

  return {
    startGameLoop,
    clearGameTimer,
  };
}