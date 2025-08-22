"use client"

import { Github, Linkedin, Music, Twitter } from "lucide-react"
import Link from "next/link"
import MiniGraph from "@/components/mini-graph"
import { useNavigation } from "@/contexts/navigation-context"
import { useEffect, useState } from "react"

interface PhotoItem {
  id: string
  title: string
  category: string
  description?: string
  filename: string
  path: string
}

export default function PhotographyPage() {
  const { setCurrentNode, showMiniGraph } = useNavigation()
  const [photos, setPhotos] = useState<PhotoItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setCurrentNode("photography")
    showMiniGraph()
  }, [setCurrentNode, showMiniGraph])

  useEffect(() => {
    // Fetch photos from API
    fetch('/api/photos')
      .then(res => res.json())
      .then(data => {
        setPhotos(data)
        setLoading(false)
      })
      .catch(err => {
        console.error('Failed to fetch photos:', err)
        setLoading(false)
      })
  }, [])

  // Group photos by category
  const photosByCategory = photos.reduce((acc, photo) => {
    if (!acc[photo.category]) {
      acc[photo.category] = []
    }
    acc[photo.category].push(photo)
    return acc
  }, {} as Record<string, PhotoItem[]>)

  const categories = Object.keys(photosByCategory)

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
            Forgive the low HD until I save up for an actual camera pls. 
          </p>
        </div>
      </section>

      {/* Photography Gallery */}
      <section className="pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-muted-foreground">Loading photos...</p>
            </div>
          ) : photos.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No photos yet. Add some photos to the content/photos folder!</p>
            </div>
          ) : (
            <>
              {/* Featured Photo */}
              {photos.length > 0 && (
                <div className="mb-16">
                  <div className="aspect-[21/9] bg-muted rounded-lg overflow-hidden">
                    <img
                      src={photos[0].path}
                      alt={photos[0].title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="mt-4 text-center">
                    <h3 className="font-serif text-lg font-medium mb-1">{photos[0].title}</h3>
                    <p className="text-sm text-muted-foreground">{photos[0].category} • {photos[0].filename}</p>
                  </div>
                </div>
              )}

              {/* Main Gallery Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {photos.map((photo) => (
                  <div key={photo.id} className="group cursor-pointer">
                    <div className="aspect-square bg-muted rounded-lg overflow-hidden">
                      <img
                        src={photo.path}
                        alt={photo.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <h4 className="font-serif text-sm font-medium">
                        {photo.title}
                      </h4>
                      <p className="text-xs text-muted-foreground">{photo.category}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Photography Categories */}
              <div className="mt-20 pt-16 border-t border-border">
                <h2 className="font-serif text-2xl font-bold mb-8 text-center">Categories</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {categories.map((category) => {
                    const categoryPhotos = photosByCategory[category]
                    const samplePhoto = categoryPhotos[0]
                    
                    return (
                      <div key={category} className="group cursor-pointer">
                        <div className="aspect-[4/3] bg-muted rounded-lg overflow-hidden mb-4">
                          <img
                            src={samplePhoto?.path || `/placeholder.svg?height=300&width=400&query=${category}`}
                            alt={category}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <h3 className="font-serif text-lg font-semibold mb-1">{category}</h3>
                        <p className="text-sm text-muted-foreground">{categoryPhotos.length} photos</p>
                      </div>
                    )
                  })}
                </div>
              </div>
            </>
          )}
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
