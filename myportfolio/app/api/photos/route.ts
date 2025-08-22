import { NextResponse } from 'next/server'
import { getAllPhotos } from '@/lib/photo-utils'

export async function GET() {
  try {
    const photos = getAllPhotos()
    return NextResponse.json(photos)
  } catch (error) {
    console.error('Error fetching photos:', error)
    return NextResponse.json({ error: 'Failed to fetch photos' }, { status: 500 })
  }
}
