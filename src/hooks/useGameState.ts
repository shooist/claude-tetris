import { useState, useCallback } from 'react';
import { GameState, GamePiece, Board } from '@/types/tetris';
import { createEmptyBoard, getInitialPosition, isValidPosition, placePieceOnBoard, findCompletedLines, clearLines, calculateScore, calculateLevel } from '@/utils/gameUtils';
import { getRandomTetromino, rotateTetromino } from '@/utils/tetrominoes';

export function useGameState() {
  const [gameState, setGameState] = useState<GameState>({
    board: createEmptyBoard(),
    currentPiece: null,
    nextPiece: getRandomTetromino(),
    score: 0,
    lines: 0,
    level: 1,
    isPlaying: false,
    isPaused: false,
    gameOver: false,
  });

  // ゲーム開始
  const startGame = useCallback(() => {
    const newPiece: GamePiece = {
      tetromino: gameState.nextPiece!,
      position: getInitialPosition(),
      rotation: 0,
    };

    setGameState(prev => ({
      ...prev,
      board: createEmptyBoard(),
      currentPiece: newPiece,
      nextPiece: getRandomTetromino(),
      score: 0,
      lines: 0,
      level: 1,
      isPlaying: true,
      isPaused: false,
      gameOver: false,
    }));
  }, [gameState.nextPiece]);

  // ゲーム一時停止/再開
  const togglePause = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      isPaused: !prev.isPaused,
    }));
  }, []);

  // ゲームリセット
  const resetGame = useCallback(() => {
    setGameState({
      board: createEmptyBoard(),
      currentPiece: null,
      nextPiece: getRandomTetromino(),
      score: 0,
      lines: 0,
      level: 1,
      isPlaying: false,
      isPaused: false,
      gameOver: false,
    });
  }, []);

  // ピースを左に移動
  const movePieceLeft = useCallback(() => {
    setGameState(prev => {
      if (!prev.currentPiece || prev.isPaused || prev.gameOver) return prev;

      const newPosition = {
        x: prev.currentPiece.position.x - 1,
        y: prev.currentPiece.position.y,
      };

      if (isValidPosition(prev.board, prev.currentPiece, newPosition)) {
        return {
          ...prev,
          currentPiece: {
            ...prev.currentPiece,
            position: newPosition,
          },
        };
      }

      return prev;
    });
  }, []);

  // ピースを右に移動
  const movePieceRight = useCallback(() => {
    setGameState(prev => {
      if (!prev.currentPiece || prev.isPaused || prev.gameOver) return prev;

      const newPosition = {
        x: prev.currentPiece.position.x + 1,
        y: prev.currentPiece.position.y,
      };

      if (isValidPosition(prev.board, prev.currentPiece, newPosition)) {
        return {
          ...prev,
          currentPiece: {
            ...prev.currentPiece,
            position: newPosition,
          },
        };
      }

      return prev;
    });
  }, []);

  // ピースを下に移動
  const movePieceDown = useCallback(() => {
    setGameState(prev => {
      if (!prev.currentPiece || prev.isPaused || prev.gameOver) return prev;

      const newPosition = {
        x: prev.currentPiece.position.x,
        y: prev.currentPiece.position.y + 1,
      };

      if (isValidPosition(prev.board, prev.currentPiece, newPosition)) {
        return {
          ...prev,
          currentPiece: {
            ...prev.currentPiece,
            position: newPosition,
          },
        };
      } else {
        // ピースが着地したので、ボードに配置して新しいピースを生成
        return lockPieceAndSpawnNew(prev);
      }
    });
  }, []);

  // ピースを回転
  const rotatePiece = useCallback(() => {
    setGameState(prev => {
      if (!prev.currentPiece || prev.isPaused || prev.gameOver) return prev;

      const rotatedShape = rotateTetromino(prev.currentPiece.tetromino.shape);
      const rotatedPiece: GamePiece = {
        ...prev.currentPiece,
        tetromino: {
          ...prev.currentPiece.tetromino,
          shape: rotatedShape,
        },
        rotation: (prev.currentPiece.rotation + 1) % 4,
      };

      if (isValidPosition(prev.board, rotatedPiece)) {
        return {
          ...prev,
          currentPiece: rotatedPiece,
        };
      }

      return prev;
    });
  }, []);

  // ハードドロップ（一番下まで一気に落とす）
  const hardDrop = useCallback(() => {
    setGameState(prev => {
      if (!prev.currentPiece || prev.isPaused || prev.gameOver) return prev;

      let newY = prev.currentPiece.position.y;
      
      // 一番下まで移動できる位置を探す
      while (isValidPosition(prev.board, prev.currentPiece, {
        x: prev.currentPiece.position.x,
        y: newY + 1,
      })) {
        newY++;
      }

      const newPiece: GamePiece = {
        ...prev.currentPiece,
        position: {
          x: prev.currentPiece.position.x,
          y: newY,
        },
      };

      // 即座にピースを配置
      return lockPieceAndSpawnNew({
        ...prev,
        currentPiece: newPiece,
      });
    });
  }, []);

  // ピースを固定して新しいピースを生成する内部関数
  const lockPieceAndSpawnNew = (state: GameState): GameState => {
    if (!state.currentPiece) return state;

    // ピースをボードに配置
    const newBoard = placePieceOnBoard(state.board, state.currentPiece);
    
    // 完成したラインを検出
    const completedLines = findCompletedLines(newBoard);
    
    // ラインを削除
    const clearedBoard = completedLines.length > 0 ? clearLines(newBoard, completedLines) : newBoard;
    
    // スコアとレベルを更新
    const newLines = state.lines + completedLines.length;
    const newScore = state.score + calculateScore(completedLines.length, state.level);
    const newLevel = calculateLevel(newLines);

    // 新しいピースを生成
    const newPiece: GamePiece = {
      tetromino: state.nextPiece!,
      position: getInitialPosition(),
      rotation: 0,
    };

    // ゲームオーバーチェック
    const gameOver = !isValidPosition(clearedBoard, newPiece);

    return {
      ...state,
      board: clearedBoard,
      currentPiece: gameOver ? null : newPiece,
      nextPiece: getRandomTetromino(),
      score: newScore,
      lines: newLines,
      level: newLevel,
      gameOver,
      isPlaying: !gameOver,
    };
  };

  // 現在の表示用ボード（現在のピースも含む）を取得
  const getDisplayBoard = useCallback((): Board => {
    if (!gameState.currentPiece) {
      return gameState.board;
    }

    return placePieceOnBoard(gameState.board, gameState.currentPiece);
  }, [gameState.board, gameState.currentPiece]);

  return {
    gameState,
    startGame,
    togglePause,
    resetGame,
    movePieceLeft,
    movePieceRight,
    movePieceDown,
    rotatePiece,
    hardDrop,
    getDisplayBoard,
  };
}