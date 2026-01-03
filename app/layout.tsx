import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'BestHair - Professional Hairdressing Gold Coast | Haircuts, Colour & Styling',
  description: 'Gold Coast's leading hairdressing salon. Expert women's & men's haircuts, colour, balayage, extensions, bridal hair & more. Book your appointment today!',
  keywords: 'hairdresser Gold Coast, hair salon Gold Coast, haircuts Gold Coast, hair colour, balayage, hair extensions, bridal hair',
  openGraph: {
    title: 'BestHair - Professional Hairdressing Gold Coast',
    description: 'Expert hairdressing services across Gold Coast. Haircuts, colour, styling & more.',
    type: 'website',
    locale: 'en_AU',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
