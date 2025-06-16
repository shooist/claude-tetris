interface NextPieceProps {
  piece: number[][];
}

export default function NextPiece({ piece }: NextPieceProps) {
  return (
    <div className="bg-gray-800 border-2 border-gray-600 p-4 rounded-lg">
      <h3 className="text-lg font-bold mb-3 text-center">次のピース</h3>
      <div className="flex justify-center">
        <div className="grid grid-cols-4 gap-px bg-gray-700 p-2 rounded">
          {piece.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`
                  w-4 h-4 border border-gray-600 rounded-sm
                  ${cell === 0 ? 'bg-gray-900' : 'bg-blue-500'}
                `}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}