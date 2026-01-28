"use client"

import { Github, Linkedin, Music, Twitter } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function About() {
  return (
    <div className="min-h-screen bg-[#f5f5f5] text-black">
      <div className="max-w-[45rem] mx-auto px-14 py-12">
        {/* Header with Navigation */}
        <nav className="mb-12">
          <div className="flex justify-end gap-8 text-sm text-gray-600">
            <Link href="/#about" className="hover:text-black transition-colors">About</Link>
            <Link href="/#education" className="hover:text-black transition-colors">Education</Link>
            <Link href="/#experience" className="hover:text-black transition-colors">Experience</Link>
            <Link href="/#projects" className="hover:text-black transition-colors">Projects</Link>
            <Link href="/#honors" className="hover:text-black transition-colors">Honors</Link>
            <Link href="/#contact" className="hover:text-black transition-colors">Contact</Link>
            <Link href="/blog" className="hover:text-black transition-colors">Blog</Link>
            <Link href="/photography" className="hover:text-black transition-colors">Photography</Link>
          </div>
        </nav>

        {/* About Content */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-2 border-gray-300">
            <Image
              src="/jeffrey.jpg"
              alt="Jeffrey Xie"
              width={128}
              height={128}
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-4xl font-bold mb-6">Jeffrey Xie</h1>
          <p className="text-lg text-gray-700 mb-8 leading-relaxed">
            Hi, my name is Jeffrey. I was born in New York and raised in Ohio. I&apos;m a software engineer broadly interested in machine learning, full-stack and graphs.
          </p>
        </div>

        {/* Footer */}
        <footer className="border-t border-gray-300 pt-12 mt-20">
          <div className="text-center">
            <div className="flex justify-center space-x-6 mb-8">
              <a
                href="https://github.com/carpetxie"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center hover:bg-gray-400 transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com/in/jeffreyxiekl"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center hover:bg-gray-400 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://open.spotify.com/user/3lw4wqaewiff6ouar8gzh0b41?si=94e290782d7e4c6f"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center hover:bg-gray-400 transition-colors"
                aria-label="Spotify"
              >
                <Music className="w-5 h-5" />
              </a>
              <a
                href="https://x.com/carpetxie"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center hover:bg-gray-400 transition-colors"
                aria-label="X (Twitter)"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
            <p className="text-gray-600">© 2025 Jeffrey Xie. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  )
}
