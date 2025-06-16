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
      <div className="bg-gray-800 border-2 border-gray-600 p-4 rounded-lg">
        <h3 className="text-lg font-bold mb-3 text-center">次のピース</h3>
        <div className="flex justify-center">
          <div className="grid grid-cols-4 gap-px bg-gray-700 p-2 rounded">
            {Array(16).fill(0).map((_, index) => (
              <div
                key={index}
                className="w-4 h-4 border border-gray-600 rounded-sm bg-gray-900"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 border-2 border-gray-600 p-4 rounded-lg">
      <h3 className="text-lg font-bold mb-3 text-center">次のピース</h3>
      <div className="flex justify-center">
        <div className="grid grid-cols-4 gap-px bg-gray-700 p-2 rounded">
          {piece.shape.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`
                  w-4 h-4 border border-gray-600 rounded-sm transition-colors
                  ${getCellColor(cell, piece.type)}
                  ${cell !== 0 ? 'shadow-inner' : ''}
                `}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}