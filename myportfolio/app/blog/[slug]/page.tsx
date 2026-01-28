import { notFound } from "next/navigation"
import Link from "next/link"
import ReactMarkdown from "react-markdown"
import { getBlogPostById } from "@/lib/blog-utils"

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = getBlogPostById(slug)

  if (!post) {
    notFound()
  }

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

        {/* Blog Post Content */}
        <article>
          {/* Back to Blog */}
          <div className="mb-8">
            <Link 
              href="/blog" 
              className="text-gray-600 hover:text-black transition-colors"
            >
              ← Back to Blog
            </Link>
          </div>

          {/* Post Header */}
          <header className="mb-8">
            <div className="flex items-center gap-3 mb-3 text-sm text-gray-500">
              <span>{post.date}</span>
              <span>•</span>
              <span>{post.readTime} min read</span>
            </div>
            <h1 className="text-4xl font-bold mb-4 leading-tight">
              {post.title}
            </h1>
            <p className="text-lg text-gray-700 leading-relaxed">
              {post.excerpt}
            </p>
          </header>

          {/* Post Content */}
          <div className="prose prose-lg max-w-none">
            <ReactMarkdown 
              components={{
                h1: ({children}) => (
                  <h1 className="text-3xl font-bold text-black mb-4 mt-8">
                    {children}
                  </h1>
                ),
                h2: ({children}) => (
                  <h2 className="text-2xl font-bold text-black mb-3 mt-6">
                    {children}
                  </h2>
                ),
                h3: ({children}) => (
                  <h3 className="text-xl font-bold text-black mb-2 mt-4">
                    {children}
                  </h3>
                ),
                p: ({children}) => (
                  <p className="text-gray-700 leading-relaxed mb-4">
                    {children}
                  </p>
                ),
                ul: ({children}) => (
                  <ul className="text-gray-700 mb-4 list-disc list-inside space-y-2">
                    {children}
                  </ul>
                ),
                li: ({children}) => (
                  <li className="text-gray-700">
                    {children}
                  </li>
                ),
                strong: ({children}) => (
                  <strong className="text-black font-semibold">
                    {children}
                  </strong>
                ),
                a: ({children, href}) => (
                  <a href={href} className="text-blue-600 underline hover:text-blue-800">
                    {children}
                  </a>
                )
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>
        </article>
      </div>
    </div>
  )
}
