import type React from "react"
import type { Metadata } from "next"
import { Crimson_Text } from "next/font/google"
import "./globals.css"
import { NavigationProvider } from "@/contexts/navigation-context"

const crimsonText = Crimson_Text({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
  variable: "--font-crimson-text",
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
    <html lang="en" className={`${crimsonText.variable} antialiased`}>
      <body className="font-sans">
        <NavigationProvider>{children}</NavigationProvider>
      </body>
    </html>
  )
}
