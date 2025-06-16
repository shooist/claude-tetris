import { Tetromino, TetrominoType } from '@/types/tetris';

// テトロミノの基本形状定義
const TETROMINO_SHAPES: Record<TetrominoType, number[][]> = {
  I: [
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  O: [
    [0, 0, 0, 0],
    [0, 1, 1, 0],
    [0, 1, 1, 0],
    [0, 0, 0, 0],
  ],
  T: [
    [0, 0, 0, 0],
    [0, 1, 0, 0],
    [1, 1, 1, 0],
    [0, 0, 0, 0],
  ],
  S: [
    [0, 0, 0, 0],
    [0, 1, 1, 0],
    [1, 1, 0, 0],
    [0, 0, 0, 0],
  ],
  Z: [
    [0, 0, 0, 0],
    [1, 1, 0, 0],
    [0, 1, 1, 0],
    [0, 0, 0, 0],
  ],
  J: [
    [0, 0, 0, 0],
    [1, 0, 0, 0],
    [1, 1, 1, 0],
    [0, 0, 0, 0],
  ],
  L: [
    [0, 0, 0, 0],
    [0, 0, 1, 0],
    [1, 1, 1, 0],
    [0, 0, 0, 0],
  ],
};

// テトロミノの色定義
const TETROMINO_COLORS: Record<TetrominoType, string> = {
  I: '#00f5ff', // シアン
  O: '#ffff00', // 黄色
  T: '#a000ff', // 紫
  S: '#00ff00', // 緑
  Z: '#ff0000', // 赤
  J: '#0000ff', // 青
  L: '#ff8000', // オレンジ
};

// テトロミノを作成する関数
export function createTetromino(type: TetrominoType): Tetromino {
  return {
    type,
    shape: TETROMINO_SHAPES[type],
    color: TETROMINO_COLORS[type],
  };
}

// ランダムなテトロミノを生成する関数
export function getRandomTetromino(): Tetromino {
  const types: TetrominoType[] = ['I', 'O', 'T', 'S', 'Z', 'J', 'L'];
  const randomType = types[Math.floor(Math.random() * types.length)];
  return createTetromino(randomType);
}

// テトロミノを回転させる関数
export function rotateTetromino(shape: number[][]): number[][] {
  const size = shape.length;
  const rotated: number[][] = Array(size).fill(null).map(() => Array(size).fill(0));
  
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      rotated[col][size - 1 - row] = shape[row][col];
    }
  }
  
  return rotated;
}

// テトロミノの全回転パターンを取得する関数
export function getAllRotations(tetromino: Tetromino): number[][][] {
  const rotations: number[][][] = [tetromino.shape];
  let currentShape = tetromino.shape;
  
  // 3回回転して4つの回転パターンを生成
  for (let i = 0; i < 3; i++) {
    currentShape = rotateTetromino(currentShape);
    rotations.push(currentShape);
  }
  
  return rotations;
}

// テトロミノの色を数値に変換する関数（ボード表示用）
export function getTetrominoColorCode(type: TetrominoType): number {
  const colorCodes: Record<TetrominoType, number> = {
    I: 1,
    O: 2,
    T: 3,
    S: 4,
    Z: 5,
    J: 6,
    L: 7,
  };
  return colorCodes[type];
}