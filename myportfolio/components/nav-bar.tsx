"use client"

import Link from "next/link"

export default function NavBar() {
  return (
    <div className="flex justify-center gap-8 text-sm text-gray-600">
      <Link href="/" className="font-bold hover:text-black transition-colors">Home</Link>
      <Link href="/blog" className="font-bold hover:text-black transition-colors">Blog</Link>
      <Link href="/photography" className="font-bold hover:text-black transition-colors">Photography</Link>
      <Link href="/readings" className="font-bold hover:text-black transition-colors">Readings</Link>
    </div>
  )
}
