"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function HomeNavigation() {
  const pathname = usePathname()
  
  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true
    if (path !== "/" && pathname.startsWith(path)) return true
    return false
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/80 border-b border-border/50">
      <div className="max-w-6xl ml-0 pl-6 pr-2 py-4">
        <nav className="hidden md:flex items-center space-x-8">
          <Link
            href="/"
            className={`text-sm font-medium transition-colors duration-200 ${
              isActive("/") ? "text-primary" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Home
          </Link>
          <Link
            href="/blog"
            className={`text-sm font-medium transition-colors duration-200 ${
              isActive("/blog") ? "text-primary" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Blog
          </Link>
          <Link
            href="/photography"
            className={`text-sm font-medium transition-colors duration-200 ${
              isActive("/photography") ? "text-primary" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Photography
          </Link>
        </nav>
      </div>
    </header>
  )
}
