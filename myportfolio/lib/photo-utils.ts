import fs from 'fs'
import path from 'path'

export interface PhotoItem {
  id: string
  title: string
  category: string
  description?: string
  filename: string
  path: string
  width?: number
  height?: number
}

const photosDirectory = path.join(process.cwd(), 'content/photos')

// Auto-generate title from filename (e.g., "sunset-over-mountains.jpg" -> "Sunset Over Mountains")
function generateTitle(filename: string): string {
  return filename
    .replace(/\.(jpg|jpeg|png|gif|webp)$/i, '')
    .split(/[-_]/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
}

// Auto-detect category from filename or folder structure
function detectCategory(filename: string, filePath: string): string {
  const name = filename.toLowerCase()
  
  // Check if it's in a category subfolder
  const relativePath = path.relative(photosDirectory, filePath)
  const folder = path.dirname(relativePath)
  
  if (folder !== '.') {
    return folder.charAt(0).toUpperCase() + folder.slice(1)
  }
  
  // Auto-detect from filename keywords
  if (name.includes('nature') || name.includes('landscape') || name.includes('mountain') || name.includes('sunset')) {
    return 'Nature'
  }
  if (name.includes('building') || name.includes('architecture') || name.includes('city')) {
    return 'Architecture'
  }
  if (name.includes('street') || name.includes('urban') || name.includes('people')) {
    return 'Street'
  }
  if (name.includes('portrait') || name.includes('face') || name.includes('person')) {
    return 'Portrait'
  }
  if (name.includes('abstract') || name.includes('pattern') || name.includes('texture')) {
    return 'Abstract'
  }
  
  return 'General'
}

export function getAllPhotos(): PhotoItem[] {
  if (!fs.existsSync(photosDirectory)) {
    return []
  }

  const photoFiles: PhotoItem[] = []
  const supportedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp']

  function scanDirectory(dir: string, relativePath: string = '') {
    const items = fs.readdirSync(dir)
    
    for (const item of items) {
      const fullPath = path.join(dir, item)
      const stat = fs.statSync(fullPath)
      
      if (stat.isDirectory()) {
        // Recursively scan subdirectories
        scanDirectory(fullPath, path.join(relativePath, item))
      } else if (stat.isFile()) {
        const ext = path.extname(item).toLowerCase()
        if (supportedExtensions.includes(ext)) {
          const filename = item
          const id = path.basename(item, ext)
          const title = generateTitle(filename)
          const category = detectCategory(filename, fullPath)
          
          photoFiles.push({
            id,
            title,
            category,
            filename,
            path: `/api/photos/${filename}`,
            description: undefined
          })
        }
      }
    }
  }

  scanDirectory(photosDirectory)
  
  // Sort by filename for consistent ordering
  return photoFiles.sort((a, b) => a.filename.localeCompare(b.filename))
}

export function getPhotosByCategory(category: string): PhotoItem[] {
  return getAllPhotos().filter(photo => photo.category === category)
}

export function getPhotoById(id: string): PhotoItem | null {
  return getAllPhotos().find(photo => photo.id === id) || null
}
