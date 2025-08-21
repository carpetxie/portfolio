"use client"

import { Github, Linkedin, Music, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState, useEffect, useMemo } from "react"
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
  
  const phrases = useMemo(() => [
    "I study mathematics.",
    "I study computer science.",
    "I am a researcher.",
    "I build software.",
    "I explore machine learning."
  ], [])
  
  useEffect(() => {
    let headingIndex = 0
    let currentPhraseIndex = 0
    let phraseIndex = 0
    let isDeleting = false

    const headingInterval = setInterval(() => {
      if (headingIndex <= fullText.length) {
        setDisplayedText(fullText.slice(0, headingIndex))
        headingIndex++
      }
      
      if (headingIndex > fullText.length) {
        clearInterval(headingInterval)
      }
    }, 200) // Slower typing for heading

    const phraseInterval = setInterval(() => {
      const currentPhrase = phrases[currentPhraseIndex]
      
      if (!isDeleting) {
        // Typing out the phrase
        if (phraseIndex <= currentPhrase.length) {
          setDisplayedParagraph(currentPhrase.slice(0, phraseIndex))
          phraseIndex++
        } else {
          // Wait a bit before deleting
          setTimeout(() => {
            isDeleting = true
          }, 2000)
        }
      } else {
        // Deleting the phrase
        if (phraseIndex > 0) {
          phraseIndex--
          setDisplayedParagraph(currentPhrase.slice(0, phraseIndex))
        } else {
          // Move to next phrase
          isDeleting = false
          phraseIndex = 0 // Reset phrase index for next phrase
          if (currentPhraseIndex < phrases.length - 1) {
            currentPhraseIndex++
            console.log('Moving to phrase:', currentPhraseIndex, 'which is:', phrases[currentPhraseIndex])
          } else {
            console.log('Reached last phrase, stopping')
            // Stop at the last phrase - don't cycle back, but keep it visible
            // Don't clear the interval, just keep the last phrase
          }
        }
      }
      
      // Debug: log what's actually being displayed
      console.log('Displayed text:', displayedParagraph, 'Current phrase:', currentPhrase, 'Phrase index:', phraseIndex, 'Is deleting:', isDeleting)
    }, 100) // Slower speed for phrase typing/deleting

    return () => {
      clearInterval(headingInterval)
      clearInterval(phraseInterval)
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
      <div className={`transition-opacity duration-500 ${showNodeGraph ? "opacity-0" : "opacity-100"}`}>
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/80 border-b border-border/50">
          <div className="max-w-6xl ml-0 pl-6 pr-2 py-4">
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
                <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                  About
                </Link>
              </div>
            </nav>
          </div>
        </header>

        {/* Hero Section */}
        <section className="pt-32 pb-20 px-6 bg-background">
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
                      <h1 className="font-sans text-6xl md:text-8xl font-bold mb-8 leading-tight">
            {displayedText}
            <span className="animate-pulse">|</span>
          </h1>
          <p className="text-2xl md:text-3xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed">
            {displayedParagraph}
            <span className="animate-pulse">|</span>
          </p>
          <div className="mb-20">
            <Link 
              href="/about" 
              className="inline-flex items-center gap-2 text-lg text-primary hover:text-primary/80 transition-colors duration-300 group"
            >
              <span className="relative">
                Learn more about me
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
              </span>
              <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
            </Link>
          </div>
          </div>
        </section>

        {/* Currently Working On section */}
        <section className="pt-48 pb-24 px-6 relative overflow-hidden bg-black">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-10 left-10 w-32 h-32 bg-blue-400/30 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute top-32 right-20 w-24 h-24 bg-purple-400/30 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
            <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-cyan-400/30 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
          </div>
          
          {/* Subtle Grid Pattern Overlay */}
          <div className="absolute inset-0 opacity-10">
            <div className="w-full h-full" style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.2) 1px, transparent 0)`,
              backgroundSize: '50px 50px'
            }}></div>
          </div>
          
          {/* Content */}
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <h2 className="font-sans text-3xl font-bold mb-8 text-white">Currently Working On</h2>
            <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-8 border border-white/25 hover:bg-white/20 hover:border-white/35 transition-all duration-500 hover:shadow-2xl hover:shadow-black/20">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <h3 className="font-sans text-xl font-semibold text-white">Research</h3>
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              <p className="text-gray-100 leading-relaxed max-w-2xl mx-auto text-lg">
                Will figure this out. 
              </p>
              <div className="mt-6 flex justify-center">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
            </div>
          </div>
        </section>



        {/* Experiences Section */}
        <section id="experiences" className="py-24 px-6 bg-background">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-sans text-3xl font-bold mb-12 text-center">Experiences</h2>
            <div className="space-y-8">
              {experiences.map((exp, i) => (
                <div key={i} className="group bg-card rounded-xl p-8 border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-3 h-3 bg-primary rounded-full"></div>
                        <h3 className="font-sans text-2xl font-bold text-foreground">{exp.title}</h3>
                      </div>
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-2 h-2 bg-muted-foreground rounded-full"></div>
                        <p className="text-primary font-semibold text-lg">{exp.company}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full border border-primary/20">
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                      <span className="text-primary font-medium text-sm">{exp.period}</span>
                    </div>
                  </div>
                  <div className="relative">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary/20 to-primary/60 rounded-full"></div>
                    <p className="text-muted-foreground leading-relaxed pl-6 text-base">{exp.description}</p>
                  </div>
                  <div className="mt-6 flex items-center gap-2">
                    <div className="flex-1 h-px bg-gradient-to-r from-primary/20 via-primary/40 to-transparent"></div>
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                  </div>
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
