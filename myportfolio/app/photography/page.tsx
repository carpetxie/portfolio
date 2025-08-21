"use client"

import { Github, Linkedin, Music, Twitter } from "lucide-react"
import Link from "next/link"
import MiniGraph from "@/components/mini-graph"
import { useNavigation } from "@/contexts/navigation-context"
import { useEffect } from "react"

export default function PhotographyPage() {
  const { setCurrentNode, showMiniGraph } = useNavigation()

  useEffect(() => {
    setCurrentNode("photography")
    showMiniGraph()
  }, []) // Empty dependency array - only run once on mount

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Mini Graph Component */}
      <MiniGraph />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/80 border-b border-border/50">
                  <div className="max-w-6xl ml-0 pl-6 pr-2 py-4">
          <nav className="flex items-center justify-between">
            <Link href="/" className="font-serif text-xl font-bold hover:text-muted-foreground transition-colors">
              Portfolio
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/blog" className="text-muted-foreground hover:text-foreground transition-colors">
                Blog
              </Link>
              <Link href="/photography" className="text-foreground font-medium">
                Photography
              </Link>
              <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                About
              </Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Photography Header */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6">Photography</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Capturing moments and emotions through the lens. A collection of my visual stories.
          </p>
        </div>
      </section>

      {/* Photography Gallery */}
      <section className="pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Featured Photo */}
          <div className="mb-16">
            <div className="aspect-[21/9] bg-muted rounded-lg overflow-hidden">
              <img
                src="/placeholder.svg?height=600&width=1400"
                alt="Featured Photography"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="mt-4 text-center">
              <h3 className="font-serif text-lg font-medium mb-1">Golden Hour Reflections</h3>
              <p className="text-sm text-muted-foreground">Captured at Lake Tahoe, California • 2024</p>
            </div>
          </div>

          {/* Main Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 24 }, (_, i) => {
              const categories = ["portrait", "landscape", "street", "architecture", "nature", "urban"]
              const category = categories[i % categories.length]
              const aspectRatios = ["aspect-square", "aspect-[4/5]", "aspect-[3/4]"]
              const aspectRatio = aspectRatios[i % aspectRatios.length]

              return (
                <div key={i + 1} className="group cursor-pointer">
                  <div className={`${aspectRatio} bg-muted rounded-lg overflow-hidden`}>
                    <img
                      src={`/placeholder.svg?height=400&width=400&query=minimalist ${category} photography ${i + 1}`}
                      alt={`Photography ${i + 1}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h4 className="font-serif text-sm font-medium capitalize">
                      {category} Study #{i + 1}
                    </h4>
                    <p className="text-xs text-muted-foreground">2024</p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Photography Categories */}
          <div className="mt-20 pt-16 border-t border-border">
            <h2 className="font-serif text-2xl font-bold mb-8 text-center">Categories</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { name: "Portraits", count: 8, image: "portrait photography collection" },
                { name: "Landscapes", count: 6, image: "landscape photography collection" },
                { name: "Street", count: 5, image: "street photography collection" },
                { name: "Architecture", count: 3, image: "architecture photography collection" },
                { name: "Nature", count: 4, image: "nature photography collection" },
                { name: "Urban", count: 2, image: "urban photography collection" },
              ].map((category, i) => (
                <div key={i} className="group cursor-pointer">
                  <div className="aspect-[4/3] bg-muted rounded-lg overflow-hidden mb-4">
                    <img
                      src={`/placeholder.svg?height=300&width=400&query=minimalist ${category.image}`}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <h3 className="font-serif text-lg font-semibold mb-1">{category.name}</h3>
                  <p className="text-sm text-muted-foreground">{category.count} photos</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center space-x-6 mb-8">
            <a
              href="#"
              className="w-12 h-12 bg-muted rounded-full flex items-center justify-center hover:bg-accent transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="w-12 h-12 bg-muted rounded-full flex items-center justify-center hover:bg-accent transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="w-12 h-12 bg-muted rounded-full flex items-center justify-center hover:bg-accent transition-colors"
              aria-label="Spotify"
            >
              <Music className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="w-12 h-12 bg-muted rounded-full flex items-center justify-center hover:bg-accent transition-colors"
              aria-label="X (Twitter)"
            >
              <Twitter className="w-5 h-5" />
            </a>
          </div>
          <p className="text-muted-foreground">© 2024 [Your Name]. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
