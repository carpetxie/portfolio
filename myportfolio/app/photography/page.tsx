"use client"

import Image from "next/image"
import Link from "next/link"
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
  const [photos, setPhotos] = useState<PhotoItem[]>([])
  const [loading, setLoading] = useState(true)

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
    <div className="min-h-screen bg-[#f5f5f5] text-black">
      <div className="max-w-[45rem] mx-auto px-14 py-12">
        {/* Header with Navigation */}
        <nav className="mb-12">
          <div className="flex justify-end gap-8 text-sm text-gray-600">
            <Link href="/#about" className="font-bold hover:text-black transition-colors">About</Link>
            <Link href="/#education" className="font-bold hover:text-black transition-colors">Education</Link>
            <Link href="/#experience" className="font-bold hover:text-black transition-colors">Experience</Link>
            <Link href="/#projects" className="font-bold hover:text-black transition-colors">Projects</Link>
            <Link href="/#honors" className="font-bold hover:text-black transition-colors">Honors</Link>
            <Link href="/#contact" className="font-bold hover:text-black transition-colors">Contact</Link>
            <Link href="/blog" className="font-bold hover:text-black transition-colors">Blog</Link>
            <Link href="/photography" className="font-bold hover:text-black transition-colors">Photography</Link>
          </div>
        </nav>

        {/* Photography Header */}
        <h1 className="text-3xl font-bold mb-2">Photography</h1>
        <p className="text-gray-600 mb-8">
          Forgive the low HD until I save up for an actual camera please.
        </p>

        {/* Photography Gallery */}
        <div>
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-400 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading photos...</p>
            </div>
          ) : photos.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">No photos yet. Add some photos to the content/photos folder!</p>
            </div>
          ) : (
            <>
              {/* Featured Photo */}
              {photos.length > 0 && (
                <div className="mb-8">
                  <div className="aspect-[21/9] bg-gray-200 rounded overflow-hidden">
                    <Image
                      src={photos[0].path}
                      alt="Featured photo"
                      width={1200}
                      height={514}
                      className="w-full h-full object-cover hover:opacity-90 transition-opacity"
                    />
                  </div>
                </div>
              )}

              {/* Main Gallery Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {photos.map((photo) => (
                  <div key={photo.id} className="cursor-pointer">
                    <div className="aspect-square bg-gray-200 rounded overflow-hidden">
                      <Image
                        src={photo.path}
                        alt=""
                        width={400}
                        height={400}
                        className="w-full h-full object-cover hover:opacity-90 transition-opacity"
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Photography Categories */}
              <div className="mt-12 pt-12 border-t border-gray-300">
                <h2 className="text-2xl font-bold mb-6">Categories</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {categories.map((category) => {
                    const categoryPhotos = photosByCategory[category]
                    const samplePhoto = categoryPhotos[0]
                    
                    return (
                      <div key={category} className="cursor-pointer">
                        <div className="aspect-[4/3] bg-gray-200 rounded overflow-hidden mb-3">
                          <Image
                            src={samplePhoto?.path || `/placeholder.svg?height=300&width=400&query=${category}`}
                            alt={category}
                            width={400}
                            height={300}
                            className="w-full h-full object-cover hover:opacity-90 transition-opacity"
                          />
                        </div>
                        <h3 className="text-lg font-bold mb-1">{category}</h3>
                        <p className="text-sm text-gray-600">{categoryPhotos.length} photos</p>
                      </div>
                    )
                  })}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
