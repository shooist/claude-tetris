import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'テトリス',
  description: 'Next.jsで作ったテトリスゲーム',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className="bg-gray-900 text-white">{children}</body>
    </html>
  )
}