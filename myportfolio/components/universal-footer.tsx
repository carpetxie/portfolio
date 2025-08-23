"use client"

import { Github, Linkedin, Music, Twitter } from "lucide-react"

export default function UniversalFooter() {
  return (
    <footer className="border-t border-border py-12 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <div className="flex justify-center space-x-6 mb-8">
          <a
            href="https://github.com/carpetxie"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 bg-muted rounded-full flex items-center justify-center hover:bg-accent transition-colors"
            aria-label="GitHub"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href="https://linkedin.com/in/jeffreyxiekl"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 bg-muted rounded-full flex items-center justify-center hover:bg-accent transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a
            href="https://open.spotify.com/user/3lw4wqaewiff6ouar8gzh0b41?si=94e290782d7e4c6f"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 bg-muted rounded-full flex items-center justify-center hover:bg-accent transition-colors"
            aria-label="Spotify"
          >
            <Music className="w-5 h-5" />
          </a>
          <a
            href="https://x.com/carpetxie"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 bg-muted rounded-full flex items-center justify-center hover:bg-accent transition-colors"
            aria-label="X (Twitter)"
          >
            <Twitter className="w-5 h-5" />
          </a>
        </div>
        <p className="text-muted-foreground">© 2025 Jeffrey Xie.</p>
      </div>
    </footer>
  )
}
