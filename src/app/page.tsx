export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <h1 className="text-4xl font-bold text-center">テトリス</h1>
      </div>
      <div className="mt-8 text-center">
        <p className="text-lg">Next.jsで作ったテトリスゲーム</p>
        <p className="text-sm text-gray-400 mt-2">開発中...</p>
      </div>
    </main>
  )
}