import { NextResponse } from 'next/server'
import { getBlogPostContent } from '@/lib/blog-utils'

interface RouteParams {
  params: Promise<{ slug: string }>
}

export async function GET(
  request: Request,
  { params }: RouteParams
) {
  try {
    const { slug } = await params
    const content = await getBlogPostContent(slug)
    
    if (!content) {
      return NextResponse.json({ error: 'Content not found' }, { status: 404 })
    }
    
    return new NextResponse(content, {
      headers: {
        'Content-Type': 'text/html',
      },
    })
  } catch (error) {
    console.error('Error fetching blog post content:', error)
    return NextResponse.json({ error: 'Failed to fetch content' }, { status: 500 })
  }
}
