import { useEffect, useCallback } from 'react';

interface KeyboardControlsProps {
  onMoveLeft: () => void;
  onMoveRight: () => void;
  onMoveDown: () => void;
  onRotate: () => void;
  onHardDrop: () => void;
  onPause: () => void;
  isPlaying: boolean;
  isPaused: boolean;
}

export function useKeyboardControls({
  onMoveLeft,
  onMoveRight,
  onMoveDown,
  onRotate,
  onHardDrop,
  onPause,
  isPlaying,
  isPaused,
}: KeyboardControlsProps) {
  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    // ゲームが動いていない時は操作を無効にする
    if (!isPlaying) return;
    
    // 一時停止中でも一時停止の解除は可能
    if (isPaused && event.key !== 'Escape' && event.key !== 'p' && event.key !== 'P') {
      return;
    }

    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        if (!isPaused) onMoveLeft();
        break;
      
      case 'ArrowRight':
        event.preventDefault();
        if (!isPaused) onMoveRight();
        break;
      
      case 'ArrowDown':
        event.preventDefault();
        if (!isPaused) onMoveDown();
        break;
      
      case 'ArrowUp':
        event.preventDefault();
        if (!isPaused) onRotate();
        break;
      
      case ' ': // スペースキー
        event.preventDefault();
        if (!isPaused) onHardDrop();
        break;
      
      case 'Escape':
      case 'p':
      case 'P':
        event.preventDefault();
        onPause();
        break;
      
      default:
        break;
    }
  }, [onMoveLeft, onMoveRight, onMoveDown, onRotate, onHardDrop, onPause, isPlaying, isPaused]);

  useEffect(() => {
    // キーボードイベントリスナーを追加
    window.addEventListener('keydown', handleKeyPress);
    
    // クリーンアップ関数
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  // 長押し対応のためのキーリピート制御
  useEffect(() => {
    let leftInterval: NodeJS.Timeout | null = null;
    let rightInterval: NodeJS.Timeout | null = null;
    let downInterval: NodeJS.Timeout | null = null;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isPlaying || isPaused) return;

      switch (event.key) {
        case 'ArrowLeft':
          if (!leftInterval) {
            leftInterval = setInterval(() => {
              onMoveLeft();
            }, 150); // 150ms間隔でリピート
          }
          break;
        
        case 'ArrowRight':
          if (!rightInterval) {
            rightInterval = setInterval(() => {
              onMoveRight();
            }, 150);
          }
          break;
        
        case 'ArrowDown':
          if (!downInterval) {
            downInterval = setInterval(() => {
              onMoveDown();
            }, 50); // 下移動は高速リピート
          }
          break;
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowLeft':
          if (leftInterval) {
            clearInterval(leftInterval);
            leftInterval = null;
          }
          break;
        
        case 'ArrowRight':
          if (rightInterval) {
            clearInterval(rightInterval);
            rightInterval = null;
          }
          break;
        
        case 'ArrowDown':
          if (downInterval) {
            clearInterval(downInterval);
            downInterval = null;
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      
      // 全てのインターバルをクリア
      if (leftInterval) clearInterval(leftInterval);
      if (rightInterval) clearInterval(rightInterval);
      if (downInterval) clearInterval(downInterval);
    };
  }, [onMoveLeft, onMoveRight, onMoveDown, isPlaying, isPaused]);
}