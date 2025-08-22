"use client"

import { Github, Linkedin, Music, Twitter } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import MiniGraph from "@/components/mini-graph"
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
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/80 border-b border-border/50">
        <div className="max-w-6xl ml-0 pl-6 pr-2 py-4">
          <nav className="flex items-center justify-between">
            <Link href="/" className="font-serif text-xl font-bold hover:text-muted-foreground transition-colors">
              Portfolio
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/blog" className="text-foreground font-medium">
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
                <article
                  key={post.id}
                  className="bg-card rounded-lg p-6 border border-border hover:shadow-lg transition-all duration-300 hover:border-primary/20"
                >
                  <div className="flex items-center gap-4 mb-3">
                    <span className="text-sm text-muted-foreground">{post.date}</span>
                    <span className="text-sm text-muted-foreground">•</span>
                    <span className="text-sm text-muted-foreground">{post.readTime} min read</span>
                  </div>
                  <h2 className="font-serif text-2xl font-semibold mb-4 hover:text-primary transition-colors cursor-pointer">
                    <Link href={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h2>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center gap-3">
                    <Link 
                      href={`/blog/${post.slug}`}
                      className="text-sm text-primary font-medium cursor-pointer hover:underline"
                    >
                      Read More
                    </Link>
                    <span className="text-sm text-muted-foreground">→</span>
                  </div>
                </article>
              ))}
            </div>
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
          <p className="text-muted-foreground">© 2024 Jeffrey Xie. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
