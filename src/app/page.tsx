'use client';

import { useState } from 'react';
import GameBoard from '@/components/GameBoard';
import ScoreBoard from '@/components/ScoreBoard';
import NextPiece from '@/components/NextPiece';
import GameControls from '@/components/GameControls';
import { createEmptyBoard } from '@/utils/gameUtils';
import { getRandomTetromino } from '@/utils/tetrominoes';

export default function Home() {
  const [board] = useState(createEmptyBoard());
  const [score] = useState(0);
  const [level] = useState(1);
  const [lines] = useState(0);
  const [nextPiece] = useState(getRandomTetromino());
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const handleStart = () => {
    setIsPlaying(true);
    setIsPaused(false);
  };

  const handlePause = () => {
    setIsPaused(!isPaused);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setIsPaused(false);
  };

  return (
    <main className="min-h-screen bg-gray-900 p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-white">テトリス</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* 左サイドバー */}
          <div className="space-y-4">
            <ScoreBoard score={score} level={level} lines={lines} />
            <NextPiece piece={nextPiece} />
          </div>
          
          {/* メインゲームボード */}
          <div className="lg:col-span-2 flex justify-center">
            <GameBoard board={board} />
          </div>
          
          {/* 右サイドバー */}
          <div>
            <GameControls
              onStart={handleStart}
              onPause={handlePause}
              onReset={handleReset}
              isPlaying={isPlaying}
              isPaused={isPaused}
            />
          </div>
        </div>
      </div>
    </main>
  );
}