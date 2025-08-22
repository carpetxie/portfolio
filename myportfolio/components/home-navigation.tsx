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
        <nav className="flex items-center justify-between">
          <Link 
            href="/" 
            className="font-sans text-xl font-bold hover:text-primary transition-colors"
          >
            Portfolio
          </Link>
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/blog" 
              className={`transition-colors ${
                isActive("/blog") 
                  ? "text-foreground font-medium" 
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Blog
            </Link>
            <Link 
              href="/photography" 
              className={`transition-colors ${
                isActive("/photography") 
                  ? "text-foreground font-medium" 
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Photography
            </Link>
            <Link 
              href="/about" 
              className={`transition-colors ${
                isActive("/about") 
                  ? "text-foreground font-medium" 
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              About
            </Link>
          </div>
        </nav>
      </div>
    </header>
  )
}
