import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    template: '%s | Servers World Network',
    default: 'Servers World Network — Architecting the Digital Future',
  },
  description:
    'High-density infrastructure and bespoke software solutions reinforced by traditional precision and modern scalability.',
  keywords: ['web development', 'AI solutions', 'cybersecurity', 'cloud infrastructure', 'digital transformation', 'Nigeria'],
  openGraph: {
    type: 'website',
    siteName: 'Servers World Network',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  )
}
