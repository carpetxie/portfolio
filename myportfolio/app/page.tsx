"use client"

import Image from "next/image"
import HomeNavigation from "@/components/home-navigation"
import UniversalFooter from "@/components/universal-footer"
import { experiences, randomItems } from "@/lib/content-data"

export default function Portfolio() {
  const fullText = "Jeffrey Xie"
  const paragraphText = "Language is a lossy compression of mind-space"
  const introText = "Hi! I'm Jeffrey, a math/cs at Dartmouth College. My current focus is on Representational Fine Tuning(ReFT) and system design. "

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Main Content */}
      <div>
        {/* Header */}
        <HomeNavigation />

        {/* Hero Section */}
        <section className="pt-24 pb-4 bg-background">
          <div className="max-w-2xl mx-auto px-8">
            <div className="flex items-start gap-6 mb-8">
              <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-primary/20 flex-shrink-0 ring-2 ring-primary/5">
                <Image
                  src="/jeffrey.jpg"
                  alt="Jeffrey Xie"
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h1 className="font-sans text-4xl font-bold mb-2 text-foreground">
                  {fullText}
                </h1>
                <p className="text-lg text-primary/80 mb-4 font-medium">
                  {paragraphText}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {introText}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Experiences Section */}
        <section id="experiences" className="pt-4 pb-12 bg-background">
          <div className="max-w-2xl mx-auto px-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px w-8 bg-primary/30"></div>
              <h2 className="font-sans text-2xl font-bold text-foreground">Experiences</h2>
              <div className="h-px flex-1 bg-primary/30"></div>
            </div>
            
            <div className="space-y-1">
              {experiences
                .sort((a, b) => {
                  // Custom sorting to ensure Early Engineer appears first (most recent)
                  if (a.title === "Early Engineer") return -1
                  if (b.title === "Early Engineer") return 1
                  
                  // Default date sorting for other experiences
                  const getDate = (period: string) => {
                    const startDate = period.split(' - ')[0]
                    const [month, year] = startDate.split(' ')
                    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                    return new Date(parseInt(year), months.indexOf(month))
                  }
                  return getDate(b.period).getTime() - getDate(a.period).getTime()
                })
                .map((exp, i) => (
                  <div key={i} className="group relative pl-6 border-l-2 border-primary/20 hover:border-primary/40 transition-colors pb-3 last:pb-0">
                    <div className="absolute -left-[5px] top-0 w-2 h-2 rounded-full bg-primary/40 group-hover:bg-primary/60 transition-colors"></div>
                    <div className="flex items-start justify-between gap-4 mb-1.5">
                      <div className="flex-1">
                        <h3 className="font-sans text-lg font-semibold text-foreground group-hover:text-primary/90 transition-colors">
                          {exp.title}
                        </h3>
                        <p className="text-sm text-primary/70 font-medium mt-0.5">
                          {exp.company}
                        </p>
                      </div>
                      <span className="text-xs text-muted-foreground whitespace-nowrap font-medium">
                        {exp.period}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed pl-0">
                      {exp.description}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        </section>

        {/* Random Section */}
        <section id="random" className="py-12">
          <div className="max-w-2xl mx-auto px-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px w-8 bg-primary/30"></div>
              <h2 className="font-sans text-2xl font-bold text-foreground">Random</h2>
              <div className="h-px flex-1 bg-primary/30"></div>
            </div>
            <div className="space-y-4">
              {randomItems.map((item, i) => (
                <div key={i} className="group pl-4 border-l-2 border-primary/20 hover:border-primary/40 transition-colors pb-4 last:pb-0">
                  <h3 className="font-sans text-base font-semibold mb-1.5 text-foreground group-hover:text-primary/90 transition-colors">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <UniversalFooter />
      </div>
    </div>
  )
}
