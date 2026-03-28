import Link from "next/link"

export default function ReadingsPage() {
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

        <h1 className="text-3xl font-bold mb-6">Readings</h1>
        <p className="text-gray-600">Coming soon.</p>
      </div>
    </div>
  )
}
