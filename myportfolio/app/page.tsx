"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { Mail, Github, Linkedin, Globe } from "lucide-react"
import { experiences, projects, research, honors } from "@/lib/content-data"

const TYPING_TEXT = "I'm Jeffrey Xie."
const QUOTE_TEXT = "Language is a lossy compression of the mind-space."

export default function Portfolio() {
  const [typed, setTyped] = useState("")
  const [quoteTyped, setQuoteTyped] = useState("")
  const [showExperience, setShowExperience] = useState(false)
  const [showProjects, setShowProjects] = useState(false)
  const [showHonors, setShowHonors] = useState(false)
  const [showResearch, setShowResearch] = useState(false)

  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setTyped(TYPING_TEXT)
    const timer = setTimeout(() => {
      setQuoteTyped(QUOTE_TEXT)
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const sections = contentRef.current?.querySelectorAll('section, .fade-in-section')
    if (!sections) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen bg-[#f5f5f5] text-black relative">
      {/* Top penguin overlay behind content */}
      <div
        className="pointer-events-none hidden sm:block fixed left-0 top-0 w-[min(800px,64vw)] h-full z-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(to right, transparent 0%, transparent 20%, rgba(245,245,245,0.1) 40%, rgba(245,245,245,0.2) 50%, rgba(245,245,245,0.3) 60%, #f5f5f5 75%), url('/penguin_0.png')",
          backgroundSize: "100% 100%, contain",
          backgroundPosition: "0 0, left top",
          backgroundRepeat: "no-repeat",

          contain: "paint",
        }}
        aria-hidden
      />
      {/* Bottom penguin overlay */}
      <div
        className="pointer-events-none hidden sm:block fixed right-0 bottom-0 w-[min(800px,64vw)] h-[min(800px,64vh)] z-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(to left, transparent 0%, transparent 20%, rgba(245,245,245,0.1) 40%, rgba(245,245,245,0.2) 50%, rgba(245,245,245,0.3) 60%, #f5f5f5 75%), url('/penguin_1.png')",
          backgroundSize: "100% 100%, cover",
          backgroundPosition: "0 0, right bottom",
          backgroundRepeat: "no-repeat",

          contain: "paint",
        }}
        aria-hidden
      />
      {/* Top right penguin overlay */}
      <div
        className="pointer-events-none hidden sm:block fixed right-0 top-0 w-[min(800px,64vw)] h-[min(800px,64vh)] z-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(to left, transparent 0%, transparent 20%, rgba(245,245,245,0.1) 40%, rgba(245,245,245,0.2) 50%, rgba(245,245,245,0.3) 60%, #f5f5f5 75%), url('/penguin_1.png')",
          backgroundSize: "100% 100%, cover",
          backgroundPosition: "0 0, right top",
          backgroundRepeat: "no-repeat",

          contain: "paint",
        }}
        aria-hidden
      />
      {/* Middle penguin overlay */}
      <div
        className="pointer-events-none hidden sm:block fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(800px,64vw)] h-[min(800px,64vh)] z-0 opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(circle, transparent 0%, transparent 20%, rgba(245,245,245,0.1) 40%, rgba(245,245,245,0.2) 50%, rgba(245,245,245,0.3) 60%, #f5f5f5 75%), url('/penguin_2.png')",
          backgroundSize: "100% 100%, cover",
          backgroundPosition: "0 0, center center",
          backgroundRepeat: "no-repeat",

          contain: "paint",
        }}
        aria-hidden
      />
      {/* Sticky Header */}
      <nav className="sticky top-0 z-20 bg-[#e8e8e8] border-b border-gray-300">
        <div className="max-w-[50rem] mx-auto px-14 py-4 flex items-center justify-center gap-8 text-sm text-gray-600">
          <a href="#" className="font-bold hover:text-black transition-colors" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>Home</a>
          <Link href="/blog" className="font-bold hover:text-black transition-colors">Blog</Link>
          <Link href="/photography" className="font-bold hover:text-black transition-colors">Photography</Link>
        </div>
      </nav>

      <div ref={contentRef} className="relative z-10 max-w-[50rem] mx-auto px-14 py-12">

        {/* Name and Title Section with Photo */}
        <div className="flex gap-6 items-center mb-6">
          {/* Profile Photo — left */}
          <div className="w-48 h-48 rounded-lg overflow-hidden border border-gray-300 flex-shrink-0 bg-gray-200">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/profile.webp"
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


            I study math/cs at Dartmouth College. My research spans activation steering and information theory. I was formerly a research engineer at <a href= "https://www.adaptional.com/" className="italic underline">Adaptional (YC S25)</a> and a gardener at <a href = "https://www.jacqueminfarms.net/" className="italic underline">Jacquemin Farms</a>. Feel free to check out my <a href = "https://www.adaptional.com/blog/foundational-models-hit-94-on-insurance-docs" className= "italic underline">work.</a> </p>
            <p>
            My current focus is to find a “prime composition” of basis vectors that compose personality. I&apos;m also working on quantifying context value for AI agents with my dear friend <a href="https://praneelp.me/" target="_blank" rel="noopener noreferrer" className="italic underline">Praneel Patel</a>.
            </p>
            <p>
            In my free time,  I enjoy thinking and writing in my digital journal, distance running(17:29 5k many years ago), weightlifting, performing chamber violin music and minimalistic photography. 
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
                <p className="text-sm text-gray-600 mt-1">Dartmouth AI/ML Club Officer</p>
              </div>
              <div className="text-right">
              </div>
            </div>
            <div className="text-sm text-gray-600 mt-3">
              <p><span className="font-semibold">Relevant Coursework:</span> OOP, Linear Algebra, Linear Modeling, Graph Theory, Software Design, Discrete Math, Algorithms, Computational Cognitive Science, Evolutionary Game Theory, Operating Systems, Human Centered ML*, Math of ML*, Principles of ML*, Robust DL*.</p>
              <p className="text-gray-500 mt-0.5 italic">* graduate</p>
            </div>
          </div>
        </section>

        {/* Work Experience Section */}
        <section id="experience" className="mb-12 scroll-mt-20">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-3xl font-extrabold">Work Experience</h2>
            <button
              onClick={() => setShowExperience(!showExperience)}
              className="text-sm text-gray-500 hover:text-black transition-colors flex items-center gap-1"
            >
              {showExperience ? "Hide Details" : "Show Details"} <span className={`transition-transform ${showExperience ? "rotate-180" : ""}`}>&#8964;</span>
            </button>
          </div>
          <div className="space-y-2">
            {[...experiences]
              .sort((a, b) => {
                const order = ["Adaptional (YC S25)", "Founders, Inc.", "Grid", "Olive Theory Lab", "LISP Lab", "Cognitive Systems Engineering Lab", "Jacquemin Farms"]
                return (order.indexOf(a.company) >= 0 ? order.indexOf(a.company) : 99) - (order.indexOf(b.company) >= 0 ? order.indexOf(b.company) : 99)
              })
              .map((exp, i) => (
                <div key={i} className="border-b border-gray-200 pb-2 last:border-b-0">
                  <div className="flex justify-between items-start mb-1">
                    <div className="flex items-baseline gap-2">
                      <h3 className="text-xl font-extrabold">
                        {exp.link ? (
                          <a href={exp.link} target="_blank" rel="noopener noreferrer" className="text-black hover:underline">
                            {exp.company}
                          </a>
                        ) : (
                          exp.company
                        )}
                      </h3>
                      <p className="text-gray-700">{exp.title}</p>
                    </div>
                    <p className="text-gray-600 text-sm whitespace-nowrap">{exp.period}</p>
                  </div>
                  {showExperience && (
                    <p className="text-gray-700 mb-1">- {exp.description}</p>
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
              className="text-sm text-gray-500 hover:text-black transition-colors flex items-center gap-1"
            >
              {showProjects ? "Hide Details" : "Show Details"} <span className={`transition-transform ${showProjects ? "rotate-180" : ""}`}>&#8964;</span>
            </button>
          </div>
          <div className="space-y-2">
            {projects.map((project, i) => (
              <div key={i} className="border-b border-gray-200 pb-2 last:border-b-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <h3 className="text-xl font-extrabold">
                      {project.github || project.website ? (
                        <a href={project.github || project.website} target="_blank" rel="noopener noreferrer" className="text-black hover:underline">
                          {project.title}
                        </a>
                      ) : (
                        project.title
                      )}
                    </h3>
                    {showProjects && project.tags.length > 0 && (
                      <p className="text-sm italic text-gray-500">{project.tags.join(", ")}</p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-black transition-colors">
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                    {project.website && (
                      <a href={project.website} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-black transition-colors">
                        <Globe className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
                <p className="text-gray-700">- {showProjects ? project.description : project.preview}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Research Section */}
        <section id="research" className="mb-12 scroll-mt-20">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-3xl font-extrabold">Research</h2>
            <button
              onClick={() => setShowResearch(!showResearch)}
              className="text-sm text-gray-500 hover:text-black transition-colors flex items-center gap-1"
            >
              {showResearch ? "Hide Details" : "Show Details"} <span className={`transition-transform ${showResearch ? "rotate-180" : ""}`}>&#8964;</span>
            </button>
          </div>
          <div className="space-y-2">
            {research.map((item, i) => (
              <div key={i} className="border-b border-gray-200 pb-2 last:border-b-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <h3 className="text-xl font-extrabold">
                      {item.github || item.website ? (
                        <a href={item.github || item.website} target="_blank" rel="noopener noreferrer" className="text-black hover:underline">
                          {item.title}
                        </a>
                      ) : (
                        item.title
                      )}
                    </h3>
                    {showResearch && item.tags.length > 0 && (
                      <p className="text-sm italic text-gray-500">{item.tags.join(", ")}</p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    {item.github && (
                      <a href={item.github} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-black transition-colors">
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                    {item.website && (
                      <a href={item.website} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-black transition-colors">
                        <Globe className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
                <p className="text-gray-700">- {showResearch ? item.description : item.preview}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Honors Section */}
        <section id="honors" className="mb-12 scroll-mt-20">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-3xl font-extrabold">Honors</h2>
            <button
              onClick={() => setShowHonors(!showHonors)}
              className="text-sm text-gray-500 hover:text-black transition-colors flex items-center gap-1"
            >
              {showHonors ? "Hide Details" : "Show Details"} <span className={`transition-transform ${showHonors ? "rotate-180" : ""}`}>&#8964;</span>
            </button>
          </div>
          {!showHonors && (
            <p className="text-gray-700">Carnegie Hall Finalist &bull; YC Hackathon Top 6 &bull; 3x Hackathon Winner &bull; Full Tuition Scholar</p>
          )}
          {showHonors && (
            <div className="space-y-2">
              {honors.map((honor, i) => (
                <div key={i} className="border-b border-gray-200 pb-2 last:border-b-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-extrabold">
                      {honor.link ? (
                        <a href={honor.link} target="_blank" rel="noopener noreferrer" className="text-black hover:underline">
                          {honor.title}
                        </a>
                      ) : (
                        honor.title
                      )}
                    </h3>
                    <p className="text-gray-600 text-sm whitespace-nowrap">{honor.period}</p>
                  </div>
                  <p className="text-gray-700">- {honor.description}</p>
                </div>
              ))}
            </div>
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
