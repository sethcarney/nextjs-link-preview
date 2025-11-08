import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Next.js Link Preview Demo',
  description: 'Interactive demo for testing the Next.js Link Preview component',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
