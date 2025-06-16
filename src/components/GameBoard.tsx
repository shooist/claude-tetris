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
    <div className="bg-gray-800 border-2 border-gray-600 p-2 rounded-lg">
      <div className="grid grid-cols-10 gap-px bg-gray-700 p-1">
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`
                w-6 h-6 border border-gray-600 rounded-sm transition-colors
                ${getCellColor(cell)}
                ${cell !== 0 ? 'shadow-inner' : ''}
              `}
            />
          ))
        )}
      </div>
    </div>
  );
}