"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Mail, Github, Linkedin } from "lucide-react"
import { experiences, projects, honors } from "@/lib/content-data"

const TYPING_TEXT = "I'm Jeffrey Xie."
const QUOTE_TEXT = "Language is a lossy compression of the mind-space."

export default function Portfolio() {
  const [typed, setTyped] = useState("")
  const [quoteTyped, setQuoteTyped] = useState("")
  const [showProjects, setShowProjects] = useState(false)
  const [showHonors, setShowHonors] = useState(false)

  useEffect(() => {
    let id1: ReturnType<typeof setInterval> | null = null
    let id2: ReturnType<typeof setInterval> | null = null
    let i = 0
    id1 = setInterval(() => {
      if (i <= TYPING_TEXT.length) {
        setTyped(TYPING_TEXT.slice(0, i))
        i++
      } else {
        if (id1) clearInterval(id1)
        let j = 0
        id2 = setInterval(() => {
          if (j <= QUOTE_TEXT.length) {
            setQuoteTyped(QUOTE_TEXT.slice(0, j))
            j++
          } else if (id2) clearInterval(id2)
        }, 25)
      }
    }, 80)
    return () => {
      if (id1) clearInterval(id1)
      if (id2) clearInterval(id2)
    }
  }, [])

  return (
    <div className="min-h-screen bg-[#f5f5f5] text-black relative">
      {/* Top penguin overlay behind content */}
      <div
        className="pointer-events-none hidden sm:block absolute left-0 top-0 w-[min(800px,64vw)] h-full z-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(to right, transparent 0%, transparent 20%, rgba(245,245,245,0.1) 40%, rgba(245,245,245,0.2) 50%, rgba(245,245,245,0.3) 60%, #f5f5f5 75%), url('/penguin_0.png')",
          backgroundSize: "100% 100%, contain",
          backgroundPosition: "0 0, left top",
          backgroundRepeat: "no-repeat",
        }}
        aria-hidden
      />
      {/* Bottom penguin overlay */}
      <div
        className="pointer-events-none hidden sm:block absolute right-0 bottom-0 w-[min(800px,64vw)] h-[min(800px,64vh)] z-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(to left, transparent 0%, transparent 20%, rgba(245,245,245,0.1) 40%, rgba(245,245,245,0.2) 50%, rgba(245,245,245,0.3) 60%, #f5f5f5 75%), url('/penguin_1.png')",
          backgroundSize: "100% 100%, cover",
          backgroundPosition: "0 0, right bottom",
          backgroundRepeat: "no-repeat",
        }}
        aria-hidden
      />
      {/* Top right penguin overlay */}
      <div
        className="pointer-events-none hidden sm:block absolute right-0 top-0 w-[min(800px,64vw)] h-[min(800px,64vh)] z-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(to left, transparent 0%, transparent 20%, rgba(245,245,245,0.1) 40%, rgba(245,245,245,0.2) 50%, rgba(245,245,245,0.3) 60%, #f5f5f5 75%), url('/penguin_1.png')",
          backgroundSize: "100% 100%, cover",
          backgroundPosition: "0 0, right top",
          backgroundRepeat: "no-repeat",
        }}
        aria-hidden
      />
      {/* Middle penguin overlay */}
      <div
        className="pointer-events-none hidden sm:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(800px,64vw)] h-[min(800px,64vh)] z-0 opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(circle, transparent 0%, transparent 20%, rgba(245,245,245,0.1) 40%, rgba(245,245,245,0.2) 50%, rgba(245,245,245,0.3) 60%, #f5f5f5 75%), url('/penguin_2.png')",
          backgroundSize: "100% 100%, cover",
          backgroundPosition: "0 0, center center",
          backgroundRepeat: "no-repeat",
        }}
        aria-hidden
      />
      <div className="relative z-10 max-w-[45rem] mx-auto px-14 py-12">
        {/* Header with Navigation */}
        <nav className="mb-12 flex justify-end">
          <div className="flex gap-8 text-sm text-gray-600">
            <a href="#about" className="font-bold hover:text-black transition-colors">About</a>
            <a href="#education" className="font-bold hover:text-black transition-colors">Education</a>
            <a href="#experience" className="font-bold hover:text-black transition-colors">Experience</a>
            <a href="#projects" className="font-bold hover:text-black transition-colors">Projects</a>
            <a href="#honors" className="font-bold hover:text-black transition-colors">Honors</a>
            <a href="#contact" className="font-bold hover:text-black transition-colors">Contact</a>
            <Link href="/blog" className="font-bold hover:text-black transition-colors">Blog</Link>
            <Link href="/photography" className="font-bold hover:text-black transition-colors">Photography</Link>
          </div>
        </nav>

        {/* Name and Title Section with Photo */}
        <div className="flex gap-6 items-center mb-6">
          {/* Profile Photo — left */}
          <div className="w-48 h-48 rounded-lg overflow-hidden border border-gray-300 flex-shrink-0 bg-gray-200">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/20260126_155556.jpg"
              alt="Jeffrey Xie"
              className="w-full h-full object-cover object-[center_22%] scale-110"
            />
          </div>
          {/* Hi/ I'm Jeffrey — right, vertically centered with photo */}
          <div className="flex-1 flex flex-col justify-center">
            <h1 className="text-5xl font-extrabold mb-2">Hi</h1>
            <p className="text-lg min-h-[1.75rem]">
              {typed}
              <span className="animate-pulse">|</span>
            </p>
            <p className="text-base text-gray-600 italic mt-1 min-h-[1.5rem]">
              {quoteTyped}
              <span className="animate-pulse">|</span>
            </p>
          </div>
        </div>

        {/* About Section */}
        <section id="about" className="mb-12 scroll-mt-20">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-3xl font-extrabold">About</h2>
            <div className="flex gap-4">
              <a href="mailto:jeffrey.xie.28@dartmouth.edu" className="hover:opacity-70 transition-opacity" aria-label="Email">
                <Mail className="w-5 h-5" />
              </a>
              <a href="https://github.com/carpetxie" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity" aria-label="GitHub">
                <Github className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com/in/jeffreyxiekl" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity" aria-label="LinkedIn">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
          <div className="space-y-3 text-gray-700 leading-relaxed">
            <p>


              I&apos;m a Math/CS student at Dartmouth College. My work spans persona vectors and modeling world systems. I currently write research on evals / benchmarking for Adaptional (YC S25).</p>
            <p>
              My goal is to find a &ldquo;prime composition&rdquo; of basis vectors that compose personality. I&apos;m also working on embedding a world model into Kalshi with my dear friends <a href="https://praneelp.me/" target="_blank" rel="noopener noreferrer" className="italic underline">Praneel Patel</a> and <a href="https://www.linkedin.com/in/randylim06/" target="_blank" rel="noopener noreferrer" className="italic underline">Randy Lim</a>. 
            </p>
            <p>
              I enjoy gardening(particularly weeding), lifting, distance-running(17:29 5k), minimalistic photography and chamber music(violinist). 
            </p>
            <p>
              I live to increase the variance of my life. Be like the <a href="https://www.youtube.com/watch?v=mnTU_hJoByA" className="italic underline">penguin</a>.
            </p>
            <p>
              
            </p>
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className="mb-12 scroll-mt-20">
          <h2 className="text-3xl font-extrabold mb-4">Education</h2>
          <div>
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-xl font-extrabold">Dartmouth College</h3>
                <p className="text-gray-700">Bachelor of Arts in Math / CS</p>
                <p className="text-sm text-gray-600 mt-1"> Co-Founder of Dartmouth AI/ML Club | HackDartmouth Fundraising</p>
              </div>
              <div className="text-right">
              </div>
            </div>
            <div className="text-sm text-gray-600 mt-3">
              <p><span className="font-semibold">Relevant Coursework:</span> OOP, Linear Algebra, Linear Modeling, Graph Theory, Software Design, Discrete Math, Algorithms, Human Centered ML*, Math of ML*, Principles of ML*, Robust DL*.</p>
              <p className="text-gray-500 mt-0.5 italic">* graduate</p>
            </div>
          </div>
        </section>

        {/* Work Experience Section */}
        <section id="experience" className="mb-12 scroll-mt-20">
          <h2 className="text-3xl font-extrabold mb-4">Work Experience</h2>
          <div className="space-y-2">
            {[...experiences]
              .sort((a, b) => {
                const order = ["Adaptional (YC S25)", "Founders, Inc.", "Olive Theory Lab", "LISP Lab", "Cognitive Systems Engineering Lab", "Jacquemin Farms"]
                return (order.indexOf(a.company) >= 0 ? order.indexOf(a.company) : 99) - (order.indexOf(b.company) >= 0 ? order.indexOf(b.company) : 99)
              })
              .map((exp, i) => (
                <div key={i} className="border-b border-gray-200 pb-2 last:border-b-0">
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h3 className="text-xl font-extrabold">{exp.company}</h3>
                      <p className="text-gray-700">{exp.title}</p>
                    </div>
                    <p className="text-gray-600 text-sm whitespace-nowrap">{exp.period}</p>
                  </div>
                  <p className="text-gray-700 mb-1">{exp.description}</p>
                  {exp.tech && (
                    <p className="text-sm italic text-gray-500">{exp.tech}</p>
                  )}
                </div>
              ))}
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="mb-12 scroll-mt-20">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-3xl font-extrabold">Projects</h2>
            <button
              onClick={() => setShowProjects(!showProjects)}
              className="text-sm text-gray-600 hover:text-black transition-colors"
            >
              {showProjects ? "Hide" : "Show"}
            </button>
          </div>
          {showProjects && (
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              {projects.map((project, i) => (
                <li key={i}>
                  {project.link ? (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-black transition-colors"
                    >
                      {project.title} — {project.description}
                    </a>
                  ) : (
                    <>{project.title} — {project.description}</>
                  )}
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Honors Section */}
        <section id="honors" className="mb-12 scroll-mt-20">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-3xl font-extrabold">Honors</h2>
            <button
              onClick={() => setShowHonors(!showHonors)}
              className="text-sm text-gray-600 hover:text-black transition-colors"
            >
              {showHonors ? "Hide" : "Show"}
            </button>
          </div>
          {showHonors && (
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              {honors.map((honor, i) => (
                <li key={i}>{honor}</li>
              ))}
            </ul>
          )}
        </section>

        {/* Contact Section */}
        <section id="contact" className="mb-12 scroll-mt-20">
          <h2 className="text-3xl font-extrabold mb-4">Contact</h2>
          <p className="text-gray-700 leading-relaxed">
            I love meeting new people. I respond to all emails: jx.28 [at] dartmouth [dot] edu
          </p>
        </section>

        {/* Footer */}
        <footer className="border-t border-gray-300 pt-8 mt-12">
          <p className="text-gray-600 mb-2">© 2026 Jeffrey Xie. All rights reserved.</p>
        </footer>
      </div>
    </div>
  )
}
