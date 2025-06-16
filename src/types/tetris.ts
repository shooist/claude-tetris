export type TetrominoType = 'I' | 'O' | 'T' | 'S' | 'Z' | 'J' | 'L';

export interface Position {
  x: number;
  y: number;
}

export interface Tetromino {
  type: TetrominoType;
  shape: number[][];
  color: string;
}

export interface GamePiece {
  tetromino: Tetromino;
  position: Position;
  rotation: number;
}

export type Board = number[][];

export interface GameState {
  board: Board;
  currentPiece: GamePiece | null;
  nextPiece: Tetromino | null;
  score: number;
  lines: number;
  level: number;
  isPlaying: boolean;
  isPaused: boolean;
  gameOver: boolean;
}