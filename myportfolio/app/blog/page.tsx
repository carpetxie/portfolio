"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import type { BlogPost } from "@/lib/blog-utils"

export default function BlogPage() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
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

        {/* Blog Header */}
        <h1 className="text-3xl font-bold mb-6">Blog</h1>

        {/* Blog Posts */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-400 mx-auto"></div>
            <p className="mt-4 text-sm text-gray-600">Loading blog posts...</p>
          </div>
        ) : blogPosts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-sm text-gray-600">No blog posts yet. Check back soon!</p>
          </div>
        ) : (
          <div className="space-y-6">
            {blogPosts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="block hover:opacity-70 transition-opacity"
              >
                <div className="border-b border-gray-200 pb-6">
                  <div className="flex items-center gap-2 mb-2 text-xs text-gray-500">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime} min read</span>
                  </div>
                  <h2 className="text-xl font-bold mb-2">
                    {post.title}
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
