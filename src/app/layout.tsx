import './globals.scss'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Phillips TV Remote',
  description: 'A remote control for Phillips TVs (2016+) that use http requests to control the TV.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}  className={inter.className}>{children}</body>
    </html>
  )
}
