import type React from "react"
import type { Metadata } from "next"
import { Quicksand } from "next/font/google"
import "./globals.css"

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-quicksand",
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
    <html lang="en" className={`${quicksand.variable} antialiased`}>
      <body className="font-sans">
        {children}
      </body>
    </html>
  )
}
