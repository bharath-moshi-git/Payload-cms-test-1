import React from 'react'
import { Space_Grotesk, Cormorant_Garamond, JetBrains_Mono } from 'next/font/google'
import { Footer } from './components/Footer'
import './styles.css'

const sans = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const serif = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-serif',
  display: 'swap',
})

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata = {
  description: 'AARDE Projects — Awwwards Inspired Luxury Estate & Resort Experience',
  title: 'AARDE Projects | Architectural Sanctuary & Luxury Estate',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en" className={`${sans.variable} ${serif.variable} ${mono.variable} dark scroll-smooth`} data-scroll-behavior="smooth">
      <body className="flex flex-col min-h-screen bg-[#05070B] text-slate-100 font-sans antialiased selection:bg-[#E2C08D] selection:text-black">
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
