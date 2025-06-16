import { Board, Position, GamePiece } from '@/types/tetris';

// 空のボードを作成する関数
export function createEmptyBoard(): Board {
  return Array(20).fill(null).map(() => Array(10).fill(0));
}

// ゲームピースの初期位置を取得する関数
export function getInitialPosition(): Position {
  return { x: 3, y: 0 }; // ボード上部の中央付近
}

// ピースがボード上の有効な位置にあるかチェックする関数
export function isValidPosition(
  board: Board,
  piece: GamePiece,
  newPosition?: Position
): boolean {
  const position = newPosition || piece.position;
  const shape = piece.tetromino.shape;
  
  for (let row = 0; row < shape.length; row++) {
    for (let col = 0; col < shape[row].length; col++) {
      if (shape[row][col] !== 0) {
        const boardX = position.x + col;
        const boardY = position.y + row;
        
        // ボードの境界をチェック
        if (boardX < 0 || boardX >= 10 || boardY >= 20) {
          return false;
        }
        
        // ボード上部のチェック（ゲームオーバー判定で使用）
        if (boardY < 0) {
          continue;
        }
        
        // 既存のピースとの衝突をチェック
        if (board[boardY][boardX] !== 0) {
          return false;
        }
      }
    }
  }
  
  return true;
}

// ピースをボードに配置する関数
export function placePieceOnBoard(board: Board, piece: GamePiece): Board {
  const newBoard = board.map(row => [...row]);
  const { position, tetromino } = piece;
  const colorCode = getColorCodeForTetromino(tetromino.type);
  
  for (let row = 0; row < tetromino.shape.length; row++) {
    for (let col = 0; col < tetromino.shape[row].length; col++) {
      if (tetromino.shape[row][col] !== 0) {
        const boardX = position.x + col;
        const boardY = position.y + row;
        
        if (boardY >= 0 && boardY < 20 && boardX >= 0 && boardX < 10) {
          newBoard[boardY][boardX] = colorCode;
        }
      }
    }
  }
  
  return newBoard;
}

// 完成したラインを検出する関数
export function findCompletedLines(board: Board): number[] {
  const completedLines: number[] = [];
  
  for (let row = 0; row < board.length; row++) {
    if (board[row].every(cell => cell !== 0)) {
      completedLines.push(row);
    }
  }
  
  return completedLines;
}

// 完成したラインを削除し、上のラインを下に移動する関数
export function clearLines(board: Board, linesToClear: number[]): Board {
  const newBoard = board.filter((_, index) => !linesToClear.includes(index));
  
  // 削除した分だけ空のラインを上部に追加
  const emptyLines = Array(linesToClear.length)
    .fill(null)
    .map(() => Array(10).fill(0));
  
  return [...emptyLines, ...newBoard];
}

// テトロミノタイプに対応する色コードを取得する関数
function getColorCodeForTetromino(type: string): number {
  const colorMap: Record<string, number> = {
    'I': 1,
    'O': 2,
    'T': 3,
    'S': 4,
    'Z': 5,
    'J': 6,
    'L': 7,
  };
  return colorMap[type] || 1;
}

// スコア計算関数
export function calculateScore(linesCleared: number, level: number): number {
  const baseScores = [0, 40, 100, 300, 1200]; // 0, 1, 2, 3, 4ライン消去時の基本スコア
  return baseScores[linesCleared] * (level + 1);
}

// レベル計算関数
export function calculateLevel(totalLines: number): number {
  return Math.floor(totalLines / 10) + 1;
}

// 落下速度計算関数（ミリ秒）
export function getDropSpeed(level: number): number {
  return Math.max(50, 1000 - (level - 1) * 50);
}