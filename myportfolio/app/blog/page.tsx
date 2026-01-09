"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import SharedNavigation from "@/components/shared-navigation"
import UniversalFooter from "@/components/universal-footer"
import type { BlogPost } from "@/lib/blog-utils"

export default function BlogPage() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch blog posts from the API
    fetch('/api/blog-posts')
      .then(res => res.json())
      .then(data => {
        setBlogPosts(data)
        setLoading(false)
      })
      .catch(error => {
        console.error('Error fetching blog posts:', error)
        setLoading(false)
      })
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <SharedNavigation />

      {/* Blog Header */}
      <section className="pt-24 pb-4 bg-background">
        <div className="max-w-2xl mx-auto px-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-primary/30"></div>
            <h1 className="font-sans text-2xl font-bold text-foreground">Blog</h1>
            <div className="h-px flex-1 bg-primary/30"></div>
          </div>
        </div>
      </section>

      {/* All Blog Posts */}
      <section className="pt-0 pb-12 bg-background">
        <div className="max-w-2xl mx-auto px-8">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-sm text-muted-foreground">Loading blog posts...</p>
            </div>
          ) : blogPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-sm text-muted-foreground">No blog posts yet. Check back soon!</p>
            </div>
          ) : (
            <div className="space-y-5">
              {blogPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="block group"
                >
                  <div className="relative pl-6 border-l-2 border-primary/20 hover:border-primary/40 transition-colors pb-5 last:pb-0">
                    <div className="absolute -left-[5px] top-0 w-2 h-2 rounded-full bg-primary/40 group-hover:bg-primary/60 transition-colors"></div>
                    <div className="flex items-center gap-2 mb-2 text-xs text-muted-foreground">
                      <span>{post.date}</span>
                      <span>•</span>
                      <span>{post.readTime} min read</span>
                    </div>
                    <h2 className="font-sans text-lg font-semibold text-foreground mb-2 group-hover:text-primary/90 transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <UniversalFooter />
    </div>
  )
}
