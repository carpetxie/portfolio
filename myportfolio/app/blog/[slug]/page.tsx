"use client"

import { notFound } from "next/navigation"
import Link from "next/link"
import { use } from "react"
import ReactMarkdown from "react-markdown"
import { useEffect, useState } from "react"
import MiniGraph from "@/components/mini-graph"
import SharedNavigation from "@/components/shared-navigation"
import { useNavigation } from "@/contexts/navigation-context"
import type { BlogPost } from "@/lib/blog-utils"

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const { setCurrentNode, showMiniGraph } = useNavigation()
  const { slug } = use(params)
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setCurrentNode("blog")
    showMiniGraph()
  }, [setCurrentNode, showMiniGraph])

  useEffect(() => {
    // Fetch the specific blog post
    fetch(`/api/blog-posts/${slug}`)
      .then(res => {
        if (!res.ok) {
          throw new Error('Post not found')
        }
        return res.json()
      })
      .then(data => {
        setPost(data)
        setLoading(false)
      })
      .catch(error => {
        console.error('Error fetching blog post:', error)
        setLoading(false)
      })
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <MiniGraph />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading blog post...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Mini Graph Component */}
      <MiniGraph />

      {/* Header */}
      <SharedNavigation />

      {/* Blog Post Content */}
      <article className="pt-32 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          {/* Back to Blog */}
          <div className="mb-8">
            <Link 
              href="/blog" 
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              ← Back to Blog
            </Link>
          </div>

          {/* Post Header */}
          <header className="mb-12">
            <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
              <span>{post.date}</span>
              <span>•</span>
              <span>{post.readTime} min read</span>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6 leading-tight">
              {post.title}
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {post.excerpt}
            </p>
          </header>

          {/* Post Content */}
          <div className="max-w-none">
            <ReactMarkdown 
              components={{
                h1: ({children}) => (
                  <h1 className="font-serif text-4xl font-semibold text-foreground mb-6 mt-8">
                    {children}
                  </h1>
                ),
                h2: ({children}) => (
                  <h2 className="font-serif text-3xl font-semibold text-foreground mb-4 mt-8">
                    {children}
                  </h2>
                ),
                h3: ({children}) => (
                  <h3 className="font-serif text-2xl font-semibold text-foreground mb-3 mt-6">
                    {children}
                  </h3>
                ),
                p: ({children}) => (
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {children}
                  </p>
                ),
                ul: ({children}) => (
                  <ul className="text-muted-foreground mb-4 list-disc list-inside space-y-2">
                    {children}
                  </ul>
                ),
                li: ({children}) => (
                  <li className="text-muted-foreground">
                    {children}
                  </li>
                ),
                strong: ({children}) => (
                  <strong className="text-foreground font-semibold">
                    {children}
                  </strong>
                ),
                a: ({children, href}) => (
                  <a href={href} className="text-primary border-b border-primary/30 hover:border-primary transition-colors">
                    {children}
                  </a>
                )
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>
        </div>
      </article>
    </div>
  )
}
