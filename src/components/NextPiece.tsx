import { Tetromino } from '@/types/tetris';

interface NextPieceProps {
  piece: Tetromino | null;
}

// セルの色をテトロミノタイプに応じて決定する関数
function getCellColor(cellValue: number, tetrominoType?: string): string {
  if (cellValue === 0) return 'bg-gray-900';
  
  const colors: Record<string, string> = {
    'I': 'bg-cyan-400',
    'O': 'bg-yellow-400',
    'T': 'bg-purple-400',
    'S': 'bg-green-400',
    'Z': 'bg-red-400',
    'J': 'bg-blue-400',
    'L': 'bg-orange-400',
  };
  return colors[tetrominoType || ''] || 'bg-gray-500';
}

export default function NextPiece({ piece }: NextPieceProps) {
  if (!piece) {
    return (
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-gray-600 p-4 rounded-xl shadow-xl">
        <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white text-center py-2 px-4 rounded-lg mb-4">
          <h3 className="text-lg font-bold">次のピース</h3>
        </div>
        <div className="flex justify-center">
          <div className="grid grid-cols-4 gap-0.5 bg-black p-3 rounded-lg border border-gray-600">
            {Array(16).fill(0).map((_, index) => (
              <div
                key={index}
                className="w-5 h-5 border border-gray-700 rounded-sm bg-gray-900"
              />
            ))}
          </div>
        </div>
        <div className="text-center text-xs text-gray-400 mt-2">待機中...</div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-gray-600 p-4 rounded-xl shadow-xl">
      <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white text-center py-2 px-4 rounded-lg mb-4">
        <h3 className="text-lg font-bold">次のピース</h3>
      </div>
      <div className="flex justify-center">
        <div className="grid grid-cols-4 gap-0.5 bg-black p-3 rounded-lg border border-gray-600">
          {piece.shape.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`
                  w-5 h-5 border border-gray-700 transition-all duration-150
                  ${getCellColor(cell, piece.type)}
                  ${cell !== 0 ? 'shadow-lg shadow-black/50 border-opacity-80 rounded-sm' : 'border-opacity-30'}
                `}
                style={{
                  background: cell !== 0 ? `linear-gradient(135deg, ${getCellBrightColor(cell, piece.type)}, ${getCellDarkColor(cell, piece.type)})` : undefined,
                }}
              />
            ))
          )}
        </div>
      </div>
      <div className="text-center text-xs text-gray-400 mt-2">
        タイプ: <span className="font-mono text-white">{piece.type}</span>
      </div>
    </div>
  );
}

// より明るい色のバリエーション
function getCellBrightColor(cellValue: number, tetrominoType?: string): string {
  if (cellValue === 0) return '#1f2937';
  
  const colors: Record<string, string> = {
    'I': '#22d3ee',
    'O': '#fbbf24',
    'T': '#a855f7',
    'S': '#34d399',
    'Z': '#f87171',
    'J': '#60a5fa',
    'L': '#fb923c',
  };
  return colors[tetrominoType || ''] || '#6b7280';
}

// より暗い色のバリエーション
function getCellDarkColor(cellValue: number, tetrominoType?: string): string {
  if (cellValue === 0) return '#111827';
  
  const colors: Record<string, string> = {
    'I': '#0891b2',
    'O': '#d97706',
    'T': '#7c2d12',
    'S': '#047857',
    'Z': '#dc2626',
    'J': '#1d4ed8',
    'L': '#ea580c',
  };
  return colors[tetrominoType || ''] || '#374151';
}