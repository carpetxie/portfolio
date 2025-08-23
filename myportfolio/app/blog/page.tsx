"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import MiniGraph from "@/components/mini-graph"
import SharedNavigation from "@/components/shared-navigation"
import UniversalFooter from "@/components/universal-footer"
import { useNavigation } from "@/contexts/navigation-context"
import type { BlogPost } from "@/lib/blog-utils"

export default function BlogPage() {
  const { setCurrentNode, showMiniGraph } = useNavigation()
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setCurrentNode("blog")
    showMiniGraph()
  }, [setCurrentNode, showMiniGraph])

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
      {/* Mini Graph Component */}
      <MiniGraph />

      {/* Header */}
      <SharedNavigation />

      {/* Blog Header */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6">Blog</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Thoughts, insights, and stories from my journey in design and technology.
          </p>
        </div>
      </section>

      {/* All Blog Posts */}
      <section className="pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-muted-foreground">Loading blog posts...</p>
            </div>
          ) : blogPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No blog posts yet. Check back soon!</p>
            </div>
          ) : (
            <div className="space-y-8">
              {blogPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="block"
                >
                  <article
                    className="bg-card rounded-lg p-6 border border-border hover:shadow-lg transition-all duration-300 hover:border-primary/20 cursor-pointer group"
                  >
                    <div className="flex items-center gap-4 mb-3">
                      <span className="text-sm text-muted-foreground">{post.date}</span>
                      <span className="text-sm text-muted-foreground">•</span>
                      <span className="text-sm text-muted-foreground">{post.readTime} min read</span>
                    </div>
                    <h2 className="font-serif text-2xl font-semibold mb-4 group-hover:text-primary transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-primary font-medium group-hover:underline">
                        Read More
                      </span>
                      <span className="text-sm text-muted-foreground">→</span>
                    </div>
                  </article>
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
