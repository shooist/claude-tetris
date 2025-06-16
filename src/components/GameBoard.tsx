interface GameBoardProps {
  board: number[][];
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
                w-6 h-6 border border-gray-600 rounded-sm
                ${cell === 0 ? 'bg-gray-900' : 'bg-blue-500'}
              `}
            />
          ))
        )}
      </div>
    </div>
  );
}