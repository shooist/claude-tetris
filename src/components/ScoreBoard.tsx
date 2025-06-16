interface ScoreBoardProps {
  score: number;
  level: number;
  lines: number;
}

export default function ScoreBoard({ score, level, lines }: ScoreBoardProps) {
  return (
    <div className="bg-gray-800 border-2 border-gray-600 p-4 rounded-lg">
      <h2 className="text-xl font-bold mb-4 text-center">スコア</h2>
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-300">得点:</span>
          <span className="font-mono text-yellow-400">{score.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-300">レベル:</span>
          <span className="font-mono text-green-400">{level}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-300">ライン:</span>
          <span className="font-mono text-blue-400">{lines}</span>
        </div>
      </div>
    </div>
  );
}