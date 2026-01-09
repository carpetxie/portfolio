import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display } from "next/font/google"
import "./globals.css"

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-playfair-display",
})

export const metadata: Metadata = {
  title: "Personal Portfolio",
  description: "Minimalistic personal portfolio showcasing work and experiences",
  generator: "v0.app",
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${playfairDisplay.variable} antialiased`}>
      <body className="font-serif">
        {children}
      </body>
    </html>
  )
}
