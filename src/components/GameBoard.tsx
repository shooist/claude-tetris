interface GameBoardProps {
  board: number[][];
}

// セルの色をテトロミノタイプに応じて決定する関数
function getCellColor(cellValue: number): string {
  const colors: Record<number, string> = {
    0: 'bg-gray-900',     // 空のセル
    1: 'bg-cyan-400',     // I ピース
    2: 'bg-yellow-400',   // O ピース
    3: 'bg-purple-400',   // T ピース
    4: 'bg-green-400',    // S ピース
    5: 'bg-red-400',      // Z ピース
    6: 'bg-blue-400',     // J ピース
    7: 'bg-orange-400',   // L ピース
  };
  return colors[cellValue] || 'bg-gray-500';
}

export default function GameBoard({ board }: GameBoardProps) {
  return (
    <div className="bg-gray-900 border-4 border-gray-700 rounded-xl shadow-2xl overflow-hidden">
      {/* ゲームボードヘッダー */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-700 px-4 py-2">
        <h2 className="text-lg font-bold text-center text-gray-200">ゲームボード</h2>
      </div>
      
      {/* メインゲーム領域 */}
      <div className="bg-black p-3">
        <div className="grid grid-cols-10 gap-0.5 bg-gray-800 p-2 rounded-lg">
          {board.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`
                  w-7 h-7 border border-gray-700 transition-all duration-150
                  ${getCellColor(cell)}
                  ${cell !== 0 ? 'shadow-lg shadow-black/50 border-opacity-80 transform scale-105' : 'border-opacity-30'}
                  ${cell !== 0 ? 'rounded-sm' : 'rounded-none'}
                `}
                style={{
                  background: cell !== 0 ? `linear-gradient(135deg, ${getCellBrightColor(cell)}, ${getCellDarkColor(cell)})` : undefined,
                }}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

// より明るい色のバリエーション
function getCellBrightColor(cellValue: number): string {
  const colors: Record<number, string> = {
    1: '#22d3ee', // I ピース - 明るいシアン
    2: '#fbbf24', // O ピース - 明るい黄色
    3: '#a855f7', // T ピース - 明るい紫
    4: '#34d399', // S ピース - 明るい緑
    5: '#f87171', // Z ピース - 明るい赤
    6: '#60a5fa', // J ピース - 明るい青
    7: '#fb923c', // L ピース - 明るいオレンジ
  };
  return colors[cellValue] || '#6b7280';
}

// より暗い色のバリエーション
function getCellDarkColor(cellValue: number): string {
  const colors: Record<number, string> = {
    1: '#0891b2', // I ピース - 暗いシアン
    2: '#d97706', // O ピース - 暗い黄色
    3: '#7c2d12', // T ピース - 暗い紫
    4: '#047857', // S ピース - 暗い緑
    5: '#dc2626', // Z ピース - 暗い赤
    6: '#1d4ed8', // J ピース - 暗い青
    7: '#ea580c', // L ピース - 暗いオレンジ
  };
  return colors[cellValue] || '#374151';
}