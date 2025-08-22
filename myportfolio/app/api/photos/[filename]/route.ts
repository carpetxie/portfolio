import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ filename: string }> }
) {
  try {
    const { filename } = await params
    const photoPath = path.join(process.cwd(), 'content/photos', filename)
    
    // Check if file exists
    if (!fs.existsSync(photoPath)) {
      return NextResponse.json({ error: 'Photo not found' }, { status: 404 })
    }
    
    // Read the file
    const photoBuffer = fs.readFileSync(photoPath)
    
    // Determine content type based on file extension
    const ext = path.extname(filename).toLowerCase()
    let contentType = 'image/jpeg' // default
    
    if (ext === '.png') contentType = 'image/png'
    else if (ext === '.gif') contentType = 'image/gif'
    else if (ext === '.webp') contentType = 'image/webp'
    else if (ext === '.svg') contentType = 'image/svg+xml'
    
    // Return the image with proper headers
    return new NextResponse(photoBuffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000', // Cache for 1 year
      },
    })
  } catch (error) {
    console.error('Error serving photo:', error)
    return NextResponse.json({ error: 'Failed to serve photo' }, { status: 500 })
  }
}
