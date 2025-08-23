"use client"

import Image from "next/image"
import MiniGraph from "@/components/mini-graph"
import SharedNavigation from "@/components/shared-navigation"
import UniversalFooter from "@/components/universal-footer"
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
      <SharedNavigation />

      {/* Photography Header */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6">Photography</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Forgive the low HD until I save up for an actual camera please. 
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
                    <Image
                      src={photos[0].path}
                      alt="Featured photo"
                      width={1200}
                      height={514}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                </div>
              )}

              {/* Main Gallery Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {photos.map((photo) => (
                  <div key={photo.id} className="group cursor-pointer">
                    <div className="aspect-square bg-muted rounded-lg overflow-hidden">
                      <Image
                        src={photo.path}
                        alt=""
                        width={400}
                        height={400}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
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
                          <Image
                            src={samplePhoto?.path || `/placeholder.svg?height=300&width=400&query=${category}`}
                            alt={category}
                            width={400}
                            height={300}
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
      <UniversalFooter />
    </div>
  )
}
