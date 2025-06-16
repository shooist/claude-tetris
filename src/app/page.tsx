'use client';

import GameBoard from '@/components/GameBoard';
import ScoreBoard from '@/components/ScoreBoard';
import NextPiece from '@/components/NextPiece';
import GameControls from '@/components/GameControls';
import { useGameState } from '@/hooks/useGameState';
import { useKeyboardControls } from '@/hooks/useKeyboardControls';
import { useGameLoop } from '@/hooks/useGameLoop';

export default function Home() {
  const {
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
  } = useGameState();

  // ゲームループを設定（自動落下）
  useGameLoop({
    isPlaying: gameState.isPlaying,
    isPaused: gameState.isPaused,
    level: gameState.level,
    onTick: movePieceDown,
  });

  // キーボード操作を設定
  useKeyboardControls({
    onMoveLeft: movePieceLeft,
    onMoveRight: movePieceRight,
    onMoveDown: movePieceDown,
    onRotate: rotatePiece,
    onHardDrop: hardDrop,
    onPause: togglePause,
    isPlaying: gameState.isPlaying,
    isPaused: gameState.isPaused,
  });

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4">
      <div className="max-w-6xl mx-auto">
        {/* ヘッダー */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-2">
            🎮 テトリス
          </h1>
          <p className="text-gray-400">Next.jsで作った本格テトリスゲーム</p>
        </div>
        
        {/* ゲームオーバー表示 */}
        {gameState.gameOver && (
          <div className="text-center mb-6">
            <div className="bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-4 rounded-xl inline-block shadow-2xl border border-red-500">
              <h2 className="text-3xl font-bold mb-2">🎯 ゲームオーバー</h2>
              <div className="bg-black/20 rounded-lg p-3 mt-3">
                <p className="text-lg">最終スコア: <span className="font-mono text-yellow-300">{gameState.score.toLocaleString()}</span></p>
                <p className="text-sm opacity-90">レベル {gameState.level} / {gameState.lines} ライン消去</p>
              </div>
              <p className="text-xs mt-2 opacity-75">お疲れ様でした！ リセットボタンで再挑戦</p>
            </div>
          </div>
        )}

        {/* 一時停止表示 */}
        {gameState.isPlaying && gameState.isPaused && (
          <div className="text-center mb-6">
            <div className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white px-6 py-3 rounded-xl inline-block shadow-xl border border-yellow-500">
              <h2 className="text-xl font-bold">⏸️ 一時停止中</h2>
              <p className="text-sm">P キーまたは Esc キーで再開</p>
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* 左サイドバー */}
          <div className="space-y-4">
            <ScoreBoard score={gameState.score} level={gameState.level} lines={gameState.lines} />
            <NextPiece piece={gameState.nextPiece} />
          </div>
          
          {/* メインゲームボード */}
          <div className="lg:col-span-2 flex justify-center">
            <GameBoard board={getDisplayBoard()} />
          </div>
          
          {/* 右サイドバー */}
          <div>
            <GameControls
              onStart={startGame}
              onPause={togglePause}
              onReset={resetGame}
              isPlaying={gameState.isPlaying}
              isPaused={gameState.isPaused}
            />
          </div>
        </div>
      </div>
    </main>
  );
}