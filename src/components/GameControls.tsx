interface GameControlsProps {
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  isPlaying: boolean;
  isPaused: boolean;
}

export default function GameControls({ onStart, onPause, onReset, isPlaying, isPaused }: GameControlsProps) {
  return (
    <div className="bg-gray-800 border-2 border-gray-600 p-4 rounded-lg">
      <h3 className="text-lg font-bold mb-3 text-center">ゲーム操作</h3>
      <div className="space-y-2">
        {!isPlaying ? (
          <button
            onClick={onStart}
            className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded font-semibold transition-colors"
          >
            スタート
          </button>
        ) : (
          <button
            onClick={onPause}
            className="w-full px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded font-semibold transition-colors"
          >
            {isPaused ? '再開' : '一時停止'}
          </button>
        )}
        <button
          onClick={onReset}
          className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded font-semibold transition-colors"
        >
          リセット
        </button>
      </div>
      <div className="mt-4 text-sm text-gray-400">
        <p className="mb-1">操作方法:</p>
        <ul className="space-y-1 text-xs">
          <li>← → : 左右移動</li>
          <li>↓ : 高速落下</li>
          <li>↑ : 回転</li>
          <li>Space : ハードドロップ</li>
        </ul>
      </div>
    </div>
  );
}