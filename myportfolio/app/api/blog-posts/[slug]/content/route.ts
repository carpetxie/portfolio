import { NextResponse } from 'next/server'
import { getBlogPostById } from '@/lib/blog-utils'

interface RouteParams {
  params: Promise<{ slug: string }>
}

export async function GET(
  request: Request,
  { params }: RouteParams
) {
  try {
    const { slug } = await params
    const blogPost = getBlogPostById(slug)
    
    if (!blogPost) {
      return NextResponse.json({ error: 'Content not found' }, { status: 404 })
    }
    
    return new NextResponse(blogPost.content, {
      headers: {
        'Content-Type': 'text/plain',
      },
    })
  } catch (error) {
    console.error('Error fetching blog post content:', error)
    return NextResponse.json({ error: 'Failed to fetch content' }, { status: 500 })
  }
}
