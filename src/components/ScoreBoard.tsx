interface ScoreBoardProps {
  score: number;
  level: number;
  lines: number;
}

export default function ScoreBoard({ score, level, lines }: ScoreBoardProps) {
  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-gray-600 p-4 rounded-xl shadow-xl">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center py-2 px-4 rounded-lg mb-4">
        <h2 className="text-xl font-bold">スコア</h2>
      </div>
      
      <div className="space-y-4">
        <div className="bg-gray-700/50 rounded-lg p-3 border border-gray-600">
          <div className="flex justify-between items-center">
            <span className="text-gray-300 font-medium">得点</span>
            <div className="text-right">
              <span className="font-mono text-2xl text-yellow-400 font-bold drop-shadow-lg">
                {score.toLocaleString()}
              </span>
              <div className="text-xs text-gray-400">points</div>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-700/50 rounded-lg p-3 border border-gray-600">
          <div className="flex justify-between items-center">
            <span className="text-gray-300 font-medium">レベル</span>
            <div className="text-right">
              <span className="font-mono text-2xl text-green-400 font-bold drop-shadow-lg">
                {level}
              </span>
              <div className="text-xs text-gray-400">level</div>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-700/50 rounded-lg p-3 border border-gray-600">
          <div className="flex justify-between items-center">
            <span className="text-gray-300 font-medium">ライン</span>
            <div className="text-right">
              <span className="font-mono text-2xl text-blue-400 font-bold drop-shadow-lg">
                {lines}
              </span>
              <div className="text-xs text-gray-400">lines</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* プログレスバー（次のレベルまでの進捗） */}
      <div className="mt-4 bg-gray-700 rounded-full h-2 overflow-hidden">
        <div 
          className="bg-gradient-to-r from-green-400 to-blue-500 h-full transition-all duration-300"
          style={{ width: `${(lines % 10) * 10}%` }}
        />
      </div>
      <div className="text-center text-xs text-gray-400 mt-1">
        次のレベルまで {10 - (lines % 10)} ライン
      </div>
    </div>
  );
}