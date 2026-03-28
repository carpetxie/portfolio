import Link from "next/link"
import { getAllBlogPosts } from "@/lib/blog-utils"

export default function BlogPage() {
  const blogPosts = getAllBlogPosts()

  return (
    <div className="min-h-screen bg-[#f5f5f5] text-black">
      <div className="max-w-[45rem] mx-auto px-14 py-12">
        {/* Header with Navigation */}
        <nav className="mb-12">
          <div className="flex justify-center gap-8 text-sm text-gray-600">
            <Link href="/" className="font-bold hover:text-black transition-colors">Home</Link>
            <Link href="/blog" className="font-bold hover:text-black transition-colors">Blog</Link>
            <Link href="/photography" className="font-bold hover:text-black transition-colors">Photography</Link>
            <Link href="/readings" className="font-bold hover:text-black transition-colors">Readings</Link>
          </div>
        </nav>

        {/* Blog Header */}
        <h1 className="text-3xl font-bold mb-6">Blog</h1>

        {/* Blog Posts */}
        {blogPosts.length === 0 ? (
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
