import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'FitTrack - Fitness Tracking Mobile App',
  description: 'Track your workouts, monitor progress, and achieve your fitness goals',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 text-gray-900`}>
        <div className="max-w-md mx-auto min-h-screen bg-gray-50 relative">
          {children}
        </div>
      </body>
    </html>
  )
}
