"use client"

import { Github, Linkedin, Music, Twitter } from "lucide-react"
import Link from "next/link"
import { blogPosts } from "@/lib/content-data"
import MiniGraph from "@/components/mini-graph"
import { useNavigation } from "@/contexts/navigation-context"
import { useEffect } from "react"

export default function BlogPage() {
  const { setCurrentNode, showMiniGraph } = useNavigation()

  useEffect(() => {
    setCurrentNode("blog")
    showMiniGraph()
  }, [setCurrentNode, showMiniGraph])

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Mini Graph Component */}
      <MiniGraph />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/80 border-b border-border/50">
        <div className="max-w-6xl mx-auto px-6 py-4">
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
          <div className="space-y-8">
            {blogPosts.map((post) => (
              <article
                key={post.id}
                className="bg-card rounded-lg p-6 border border-border hover:shadow-sm transition-shadow"
              >
                <div className="flex items-center gap-4 mb-3">
                  <span className="text-sm text-muted-foreground">{post.date}</span>
                  <span className="text-sm text-muted-foreground">•</span>
                  <span className="text-sm text-muted-foreground">5 min read</span>
                </div>
                <h2 className="font-serif text-2xl font-semibold mb-4 hover:text-primary transition-colors cursor-pointer">
                  {post.title}
                </h2>
                <p className="text-muted-foreground mb-4">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-primary font-medium cursor-pointer hover:underline">Read More</span>
                  <span className="text-sm text-muted-foreground">→</span>
                </div>
              </article>
            ))}
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
