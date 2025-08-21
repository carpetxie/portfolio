"use client"

import { Github, Linkedin, Music, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState, useEffect } from "react"
import NodeGraph from "@/components/node-graph"
import MiniGraph from "@/components/mini-graph"
import { useNavigation } from "@/contexts/navigation-context"
import { experiences, randomItems } from "@/lib/content-data"

export default function Portfolio() {
  const [showNodeGraph, setShowNodeGraph] = useState(true)
  const { showMiniGraph, setCurrentNode, navigateToSection } = useNavigation()
  const [displayedText, setDisplayedText] = useState("")
  const [displayedParagraph, setDisplayedParagraph] = useState("")
  const fullText = "Jeffrey Xie"
  const fullParagraph =
    "Hi, my name is Jeffrey. I was born in New York and raised in Ohio. I'm a software engineer broadly interested in machine learning, full-stack and graphs. Check out my work below!"

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

  const handleMainNodeClick = () => {
    setShowNodeGraph(false)
    showMiniGraph()
    setCurrentNode("home")
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Node Graph Overlay */}
      {showNodeGraph && <NodeGraph onMainNodeClick={handleMainNodeClick} />}

      {/* Mini Graph Component */}
      <MiniGraph />

      {/* Main Content - faded when node graph is showing */}
      <div className={`transition-opacity duration-500 ${showNodeGraph ? "opacity-10" : "opacity-100"}`}>
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/80 border-b border-border/50">
          <div className="max-w-6xl mx-auto px-6 py-4">
            <nav className="flex items-center justify-between">
              <Link
                href="/"
                className="font-sans text-xl font-bold hover:text-primary transition-colors"
                onClick={() => {
                  // Reset to show node graph and scroll to top
                  setShowNodeGraph(true)
                  setCurrentNode("home")
                  window.scrollTo({ top: 0, behavior: "smooth" })
                }}
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
                <button 
                  onClick={() => navigateToSection("experiences")} 
                  className="text-muted-foreground hover:text-foreground transition-colors bg-transparent border-none cursor-pointer"
                >
                  Experiences
                </button>
                <button 
                  onClick={() => navigateToSection("random")} 
                  className="text-muted-foreground hover:text-foreground transition-colors bg-transparent border-none cursor-pointer"
                >
                  Random
                </button>
              </div>
            </nav>
          </div>
        </header>

        {/* Hero Section */}
        <section className="pt-32 pb-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-2 border-border">
                <img
                  src="/jeffrey.jpg"
                  alt="Jeffrey Xie"
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

        {/* Currently Working On section */}
        <section className="py-16 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-sans text-3xl font-bold mb-8">Currently Working On</h2>
            <div className="bg-card rounded-lg p-8 border border-border hover:shadow-sm transition-shadow">
                              <h3 className="font-sans text-xl font-semibold mb-4">STEALTH</h3>
              <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                Shhhhh...
              </p>
            </div>
          </div>
        </section>



        {/* Experiences Section */}
        <section id="experiences" className="py-16 px-6 bg-muted/30">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-sans text-3xl font-bold mb-12 text-center">Experiences</h2>
            <div className="space-y-8">
              {experiences.map((exp, i) => (
                <div key={i} className="bg-card rounded-lg p-6 border border-border">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <h3 className="font-sans text-xl font-semibold">{exp.title}</h3>
                    <span className="text-muted-foreground">{exp.period}</span>
                  </div>
                  <p className="text-primary font-medium mb-2">{exp.company}</p>
                  <p className="text-muted-foreground">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Random Section */}
        <section id="random" className="py-16 px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-sans text-3xl font-bold mb-12 text-center">Random</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {randomItems.map((item, i) => (
                <div key={i} className="bg-card rounded-lg p-6 border border-border">
                  <h3 className="font-sans text-xl font-semibold mb-4">{item.title}</h3>
                  <p className="text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
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
    </div>
  )
}
