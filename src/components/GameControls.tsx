interface GameControlsProps {
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  isPlaying: boolean;
  isPaused: boolean;
}

export default function GameControls({ onStart, onPause, onReset, isPlaying, isPaused }: GameControlsProps) {
  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-gray-600 p-4 rounded-xl shadow-xl">
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-center py-2 px-4 rounded-lg mb-4">
        <h3 className="text-lg font-bold">ゲーム操作</h3>
      </div>
      
      <div className="space-y-3">
        {!isPlaying ? (
          <button
            onClick={onStart}
            className="w-full px-4 py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            🎮 スタート
          </button>
        ) : (
          <button
            onClick={onPause}
            className="w-full px-4 py-3 bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            {isPaused ? '▶️ 再開' : '⏸️ 一時停止'}
          </button>
        )}
        <button
          onClick={onReset}
          className="w-full px-4 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          🔄 リセット
        </button>
      </div>
      
      <div className="mt-6 bg-gray-700/50 rounded-lg p-3 border border-gray-600">
        <p className="mb-3 font-semibold text-gray-200 text-center">🎮 操作方法</p>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-gray-800 rounded p-2 border border-gray-600">
            <div className="text-yellow-400 font-mono">← →</div>
            <div className="text-gray-300">左右移動</div>
          </div>
          <div className="bg-gray-800 rounded p-2 border border-gray-600">
            <div className="text-yellow-400 font-mono">↓</div>
            <div className="text-gray-300">高速落下</div>
          </div>
          <div className="bg-gray-800 rounded p-2 border border-gray-600">
            <div className="text-yellow-400 font-mono">↑</div>
            <div className="text-gray-300">回転</div>
          </div>
          <div className="bg-gray-800 rounded p-2 border border-gray-600">
            <div className="text-yellow-400 font-mono">Space</div>
            <div className="text-gray-300">ドロップ</div>
          </div>
        </div>
        <div className="mt-3 text-center">
          <div className="bg-gray-800 rounded p-2 border border-gray-600 inline-block">
            <div className="text-yellow-400 font-mono">P / Esc</div>
            <div className="text-gray-300">一時停止</div>
          </div>
        </div>
        <div className="mt-3 text-xs text-gray-400 text-center border-t border-gray-600 pt-2">
          💡 キーの長押しで連続移動
        </div>
      </div>
    </div>
  );
}