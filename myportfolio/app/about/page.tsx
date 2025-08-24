"use client"

import { Github, Linkedin, Music, Twitter } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import MiniGraph from "@/components/mini-graph"
import { useNavigation } from "@/contexts/navigation-context"

export default function About() {
  const { setCurrentNode } = useNavigation()
  const [displayedText, setDisplayedText] = useState("")
  const [displayedParagraph, setDisplayedParagraph] = useState("")
  const fullText = "Jeffrey Xie"
  const fullParagraph =
    "Hi, my name is Jeffrey. I was born in New York and raised in Ohio. I'm a software engineer broadly interested in machine learning, full-stack and graphs."

  useEffect(() => {
    let headingIndex = 0
    let paragraphIndex = 0

    const headingInterval = setInterval(() => {
      if (headingIndex <= fullText.length) {
        setDisplayedText(fullText.slice(0, headingIndex))
        headingIndex++
      }
      
      if (headingIndex > fullText.length) {
        clearInterval(headingInterval)
      }
    }, 200) // Slower typing for heading

    const paragraphInterval = setInterval(() => {
      if (paragraphIndex <= fullParagraph.length) {
        setDisplayedParagraph(fullParagraph.slice(0, paragraphIndex))
        paragraphIndex++
      }
      
      if (paragraphIndex > fullParagraph.length) {
        clearInterval(paragraphInterval)
      }
    }, 15) // Much faster typing for paragraph

    return () => {
      clearInterval(headingInterval)
      clearInterval(paragraphInterval)
    }
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Mini Graph Component */}
      <MiniGraph />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/80 border-b border-border/50">
                  <div className="max-w-6xl ml-0 pl-6 pr-2 py-4">
          <nav className="flex items-center justify-between">
            <Link
              href="/"
              className="font-sans text-xl font-bold hover:text-primary transition-colors"
              onClick={() => setCurrentNode("home")}
            >
              Portfolio
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/blog" className="text-muted-foreground hover:text-foreground transition-colors">
                Blog
              </Link>
              <Link href="/photography" className="text-muted-foreground hover:text-foreground transition-colors">
                Photography
              </Link>
              <Link href="/about" className="text-foreground font-medium">
                About
              </Link>

            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-2 border-border">
              <Image
                src="/jeffrey.jpg"
                alt="Jeffrey Xie"
                width={128}
                height={128}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <h1 className="font-sans text-4xl md:text-6xl font-bold mb-6 leading-tight">
            {displayedText}
            <span className="animate-pulse">|</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            {displayedParagraph}
            {displayedParagraph.length < fullParagraph.length && <span className="animate-pulse">|</span>}
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center space-x-6 mb-8">
            <a
              href="https://github.com/carpetxie"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-muted rounded-full flex items-center justify-center hover:bg-accent transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com/in/jeffreyxiekl"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-muted rounded-full flex items-center justify-center hover:bg-accent transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="https://open.spotify.com/user/3lw4wqaewiff6ouar8gzh0b41?si=94e290782d7e4c6f"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-muted rounded-full flex items-center justify-center hover:bg-accent transition-colors"
              aria-label="Spotify"
            >
              <Music className="w-5 h-5" />
            </a>
            <a
              href="https://x.com/carpetxie"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-muted rounded-full flex items-center justify-center hover:bg-accent transition-colors"
              aria-label="X (Twitter)"
            >
              <Twitter className="w-5 h-5" />
            </a>
          </div>
          <p className="text-muted-foreground">© 2025 Jeffrey Xie. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
