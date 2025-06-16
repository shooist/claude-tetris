'use client';

import GameBoard from '@/components/GameBoard';
import ScoreBoard from '@/components/ScoreBoard';
import NextPiece from '@/components/NextPiece';
import GameControls from '@/components/GameControls';
import { useGameState } from '@/hooks/useGameState';

export default function Home() {
  const {
    gameState,
    startGame,
    togglePause,
    resetGame,
    getDisplayBoard,
  } = useGameState();

  return (
    <main className="min-h-screen bg-gray-900 p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-white">テトリス</h1>
        
        {/* ゲームオーバー表示 */}
        {gameState.gameOver && (
          <div className="text-center mb-4">
            <div className="bg-red-600 text-white px-6 py-3 rounded-lg inline-block">
              <h2 className="text-2xl font-bold">ゲームオーバー</h2>
              <p className="text-sm">最終スコア: {gameState.score.toLocaleString()}</p>
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